const express = require('express');
const router = express.Router();
const db = require('../database');

// Tüm maçları getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM matches ORDER BY match_date DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tek maç getir
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM matches WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Maç bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Maç performans metriklerini getir
router.get('/:id/performance', (req, res) => {
  const sql = 'SELECT * FROM match_performance WHERE match_id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row || {} });
  });
});

// Maç oyuncu performanslarını getir
router.get('/:id/players', (req, res) => {
  const sql = `
    SELECT mpp.*, p.name, p.position, p.jersey_number
    FROM match_player_performance mpp
    JOIN players p ON mpp.player_id = p.id
    WHERE mpp.match_id = ?
    ORDER BY mpp.minutes_played DESC
  `;
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Yeni maç ekle
router.post('/', (req, res) => {
  const { opponent, match_date, location, home_away, score_home, score_away, formation, result, notes } = req.body;

  const sql = `INSERT INTO matches (opponent, match_date, location, home_away, score_home, score_away, formation, result, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [opponent, match_date, location, home_away, score_home, score_away, formation, result, notes], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Maç başarıyla eklendi',
      id: this.lastID
    });
  });
});

// Maç güncelle
router.put('/:id', (req, res) => {
  const { opponent, match_date, location, home_away, score_home, score_away, formation, result, notes } = req.body;

  const sql = `UPDATE matches
               SET opponent = ?, match_date = ?, location = ?, home_away = ?,
                   score_home = ?, score_away = ?, formation = ?, result = ?, notes = ?
               WHERE id = ?`;

  db.run(sql, [opponent, match_date, location, home_away, score_home, score_away, formation, result, notes, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Maç bulunamadı' });
      return;
    }
    res.json({ message: 'Maç başarıyla güncellendi' });
  });
});

// Maç sil
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM matches WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Maç bulunamadı' });
      return;
    }
    res.json({ message: 'Maç başarıyla silindi' });
  });
});

// Maç performans metrikleri ekle/güncelle
router.post('/:id/performance', (req, res) => {
  const { possession, shots, shots_on_target, corners, fouls, offsides, passes, pass_accuracy, tackles, saves } = req.body;

  // Önce mevcut kayıt var mı kontrol et
  const checkSql = 'SELECT id FROM match_performance WHERE match_id = ?';
  db.get(checkSql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      // Güncelle
      const sql = `UPDATE match_performance
                   SET possession = ?, shots = ?, shots_on_target = ?, corners = ?,
                       fouls = ?, offsides = ?, passes = ?, pass_accuracy = ?,
                       tackles = ?, saves = ?
                   WHERE match_id = ?`;

      db.run(sql, [possession, shots, shots_on_target, corners, fouls, offsides, passes, pass_accuracy, tackles, saves, req.params.id], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Performans metrikleri güncellendi' });
      });
    } else {
      // Yeni kayıt oluştur
      const sql = `INSERT INTO match_performance
                   (match_id, possession, shots, shots_on_target, corners, fouls, offsides, passes, pass_accuracy, tackles, saves)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(sql, [req.params.id, possession, shots, shots_on_target, corners, fouls, offsides, passes, pass_accuracy, tackles, saves], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Performans metrikleri oluşturuldu' });
      });
    }
  });
});

// Maça oyuncu performansı ekle
router.post('/:id/players', (req, res) => {
  const { player_id, minutes_played, goals, assists, yellow_card, red_card, rating, notes } = req.body;

  const sql = `INSERT INTO match_player_performance
               (match_id, player_id, minutes_played, goals, assists, yellow_card, red_card, rating, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [req.params.id, player_id, minutes_played, goals, assists, yellow_card, red_card, rating, notes], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Oyuncu performansı eklendi',
      id: this.lastID
    });
  });
});

// Oyuncu performansını güncelle
router.put('/:matchId/players/:playerId', (req, res) => {
  const { minutes_played, goals, assists, yellow_card, red_card, rating, notes } = req.body;

  const sql = `UPDATE match_player_performance
               SET minutes_played = ?, goals = ?, assists = ?, yellow_card = ?,
                   red_card = ?, rating = ?, notes = ?
               WHERE match_id = ? AND player_id = ?`;

  db.run(sql, [minutes_played, goals, assists, yellow_card, red_card, rating, notes, req.params.matchId, req.params.playerId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Oyuncu performansı bulunamadı' });
      return;
    }
    res.json({ message: 'Oyuncu performansı güncellendi' });
  });
});

module.exports = router;
