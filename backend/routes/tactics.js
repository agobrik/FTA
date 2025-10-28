const express = require('express');
const router = express.Router();
const db = require('../database');

// Tüm taktikleri getir
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tactics ORDER BY name';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tek taktik getir
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM tactics WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Taktik bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Formasyona göre taktikleri getir
router.get('/formation/:formation', (req, res) => {
  const sql = 'SELECT * FROM tactics WHERE formation = ? ORDER BY name';
  db.all(sql, [req.params.formation], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Yeni taktik ekle
router.post('/', (req, res) => {
  const { name, formation, description, style, positions, instructions } = req.body;

  const sql = `INSERT INTO tactics (name, formation, description, style, positions, instructions)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(sql, [name, formation, description, style, positions, instructions], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Taktik başarıyla eklendi',
      id: this.lastID
    });
  });
});

// Taktik güncelle
router.put('/:id', (req, res) => {
  const { name, formation, description, style, positions, instructions } = req.body;

  const sql = `UPDATE tactics
               SET name = ?, formation = ?, description = ?, style = ?,
                   positions = ?, instructions = ?
               WHERE id = ?`;

  db.run(sql, [name, formation, description, style, positions, instructions, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Taktik bulunamadı' });
      return;
    }
    res.json({ message: 'Taktik başarıyla güncellendi' });
  });
});

// Taktik sil
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM tactics WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Taktik bulunamadı' });
      return;
    }
    res.json({ message: 'Taktik başarıyla silindi' });
  });
});

module.exports = router;
