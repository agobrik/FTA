const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const db = require('../database');

// Tüm oyuncuları getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM players ORDER BY name';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tek oyuncu getir
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM players WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Oyuncu bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Oyuncu istatistiklerini getir
router.get('/:id/stats', (req, res) => {
  const sql = 'SELECT * FROM player_stats WHERE player_id = ?';
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Yeni oyuncu ekle
router.post('/',
  [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter olmalı'),
    body('position').isIn(['Kaleci', 'Defans', 'Orta Saha', 'Forvet']).withMessage('Geçerli bir pozisyon seçin'),
    body('age').optional().isInt({ min: 15, max: 50 }).withMessage('Yaş 15-50 arasında olmalı'),
    body('jersey_number').optional().isInt({ min: 1, max: 99 }).withMessage('Forma numarası 1-99 arasında olmalı'),
    body('height').optional().isInt({ min: 150, max: 220 }).withMessage('Boy 150-220 cm arasında olmalı'),
    body('weight').optional().isInt({ min: 50, max: 120 }).withMessage('Kilo 50-120 kg arasında olmalı'),
    body('nationality').optional().trim().isLength({ max: 50 }),
    body('preferred_foot').optional().isIn(['Sağ', 'Sol', 'Her İkisi']).withMessage('Geçerli bir ayak seçin'),
    body('rating').optional().isInt({ min: 0, max: 100 }).withMessage('Rating 0-100 arasında olmalı')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { name, position, age, jersey_number, height, weight, nationality, preferred_foot, rating } = req.body;

    const sql = `INSERT INTO players (name, position, age, jersey_number, height, weight, nationality, preferred_foot, rating)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [name, position, age, jersey_number, height, weight, nationality, preferred_foot, rating || 0], function(err) {
      if (err) {
        res.status(500).json({ success: false, error: err.message });
        return;
      }

      // Yeni oyuncu için istatistik kaydı oluştur
      const statsSql = 'INSERT INTO player_stats (player_id, season) VALUES (?, ?)';
      db.run(statsSql, [this.lastID, new Date().getFullYear()], (err) => {
        if (err) {
          console.error('İstatistik oluşturulamadı:', err);
        }
      });

      res.json({
        success: true,
        message: 'Oyuncu başarıyla eklendi',
        data: { id: this.lastID }
      });
    });
  }
);

// Oyuncu güncelle
router.put('/:id',
  [
    param('id').isInt().withMessage('Geçersiz oyuncu ID'),
    body('name').optional().trim().isLength({ min: 2, max: 100 }),
    body('position').optional().isIn(['Kaleci', 'Defans', 'Orta Saha', 'Forvet']),
    body('age').optional().isInt({ min: 15, max: 50 }),
    body('jersey_number').optional().isInt({ min: 1, max: 99 }),
    body('height').optional().isInt({ min: 150, max: 220 }),
    body('weight').optional().isInt({ min: 50, max: 120 }),
    body('rating').optional().isInt({ min: 0, max: 100 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { name, position, age, jersey_number, height, weight, nationality, preferred_foot, rating } = req.body;

    const sql = `UPDATE players
                 SET name = ?, position = ?, age = ?, jersey_number = ?, height = ?,
                     weight = ?, nationality = ?, preferred_foot = ?, rating = ?
                 WHERE id = ?`;

    db.run(sql, [name, position, age, jersey_number, height, weight, nationality, preferred_foot, rating, req.params.id], function(err) {
      if (err) {
        res.status(500).json({ success: false, error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ success: false, error: 'Oyuncu bulunamadı' });
        return;
      }
      res.json({ success: true, message: 'Oyuncu başarıyla güncellendi' });
    });
  }
);

// Oyuncu sil
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM players WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Oyuncu bulunamadı' });
      return;
    }
    res.json({ message: 'Oyuncu başarıyla silindi' });
  });
});

// Oyuncu istatistiklerini güncelle
router.put('/:id/stats', (req, res) => {
  const { matches_played, goals, assists, yellow_cards, red_cards, minutes_played,
          pass_accuracy, shots, tackles, interceptions, season } = req.body;

  // Önce mevcut istatistik var mı kontrol et
  const checkSql = 'SELECT id FROM player_stats WHERE player_id = ? AND season = ?';
  db.get(checkSql, [req.params.id, season], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      // Güncelle
      const sql = `UPDATE player_stats
                   SET matches_played = ?, goals = ?, assists = ?, yellow_cards = ?,
                       red_cards = ?, minutes_played = ?, pass_accuracy = ?, shots = ?,
                       tackles = ?, interceptions = ?
                   WHERE player_id = ? AND season = ?`;

      db.run(sql, [matches_played, goals, assists, yellow_cards, red_cards, minutes_played,
                   pass_accuracy, shots, tackles, interceptions, req.params.id, season], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'İstatistikler güncellendi' });
      });
    } else {
      // Yeni kayıt oluştur
      const sql = `INSERT INTO player_stats
                   (player_id, matches_played, goals, assists, yellow_cards, red_cards,
                    minutes_played, pass_accuracy, shots, tackles, interceptions, season)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(sql, [req.params.id, matches_played, goals, assists, yellow_cards, red_cards,
                   minutes_played, pass_accuracy, shots, tackles, interceptions, season], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'İstatistikler oluşturuldu' });
      });
    }
  });
});

module.exports = router;
