const express = require('express');
const router = express.Router();
const db = require('../database');

// Tüm rakip takımları getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM opponents ORDER BY name';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tek rakip takım getir
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM opponents WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Rakip takım bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Rakip takıma karşı oynanan maçları getir
router.get('/:id/matches', (req, res) => {
  const sql = 'SELECT * FROM matches WHERE opponent = ? ORDER BY match_date DESC';

  // Önce rakip takım adını al
  db.get('SELECT name FROM opponents WHERE id = ?', [req.params.id], (err, opponent) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!opponent) {
      res.status(404).json({ error: 'Rakip takım bulunamadı' });
      return;
    }

    db.all(sql, [opponent.name], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ data: rows });
    });
  });
});

// Yeni rakip takım ekle
router.post('/', (req, res) => {
  const { name, league, typical_formation, playing_style, strengths, weaknesses, key_players, notes } = req.body;

  const sql = `INSERT INTO opponents (name, league, typical_formation, playing_style, strengths, weaknesses, key_players, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [name, league, typical_formation, playing_style, strengths, weaknesses, key_players, notes], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Rakip takım başarıyla eklendi',
      id: this.lastID
    });
  });
});

// Rakip takım güncelle
router.put('/:id', (req, res) => {
  const { name, league, typical_formation, playing_style, strengths, weaknesses, key_players, notes } = req.body;

  const sql = `UPDATE opponents
               SET name = ?, league = ?, typical_formation = ?, playing_style = ?,
                   strengths = ?, weaknesses = ?, key_players = ?, notes = ?
               WHERE id = ?`;

  db.run(sql, [name, league, typical_formation, playing_style, strengths, weaknesses, key_players, notes, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Rakip takım bulunamadı' });
      return;
    }
    res.json({ message: 'Rakip takım başarıyla güncellendi' });
  });
});

// Rakip takım sil
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM opponents WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Rakip takım bulunamadı' });
      return;
    }
    res.json({ message: 'Rakip takım başarıyla silindi' });
  });
});

module.exports = router;
