const express = require('express');
const router = express.Router();
const db = require('../database');

// Tüm antrenman şablonlarını getir
router.get('/templates', (req, res) => {
  const sql = 'SELECT * FROM training_templates ORDER BY name';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tek antrenman şablonu getir
router.get('/templates/:id', (req, res) => {
  const sql = 'SELECT * FROM training_templates WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Antrenman şablonu bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Kategoriye göre şablonları getir
router.get('/templates/category/:category', (req, res) => {
  const sql = 'SELECT * FROM training_templates WHERE category = ? ORDER BY name';
  db.all(sql, [req.params.category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Yeni antrenman şablonu ekle
router.post('/templates', (req, res) => {
  const { name, category, duration, description, objectives, equipment, exercises, difficulty } = req.body;

  const sql = `INSERT INTO training_templates (name, category, duration, description, objectives, equipment, exercises, difficulty)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [name, category, duration, description, objectives, equipment, exercises, difficulty], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Antrenman şablonu başarıyla eklendi',
      id: this.lastID
    });
  });
});

// Antrenman şablonu güncelle
router.put('/templates/:id', (req, res) => {
  const { name, category, duration, description, objectives, equipment, exercises, difficulty } = req.body;

  const sql = `UPDATE training_templates
               SET name = ?, category = ?, duration = ?, description = ?,
                   objectives = ?, equipment = ?, exercises = ?, difficulty = ?
               WHERE id = ?`;

  db.run(sql, [name, category, duration, description, objectives, equipment, exercises, difficulty, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Antrenman şablonu bulunamadı' });
      return;
    }
    res.json({ message: 'Antrenman şablonu başarıyla güncellendi' });
  });
});

// Antrenman şablonu sil
router.delete('/templates/:id', (req, res) => {
  const sql = 'DELETE FROM training_templates WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Antrenman şablonu bulunamadı' });
      return;
    }
    res.json({ message: 'Antrenman şablonu başarıyla silindi' });
  });
});

// Tüm antrenman planlarını getir
router.get('/plans', (req, res) => {
  const sql = `
    SELECT tp.*, tt.name as template_name, tt.category, tt.duration
    FROM training_plans tp
    LEFT JOIN training_templates tt ON tp.template_id = tt.id
    ORDER BY tp.date DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tek antrenman planı getir
router.get('/plans/:id', (req, res) => {
  const sql = `
    SELECT tp.*, tt.name as template_name, tt.category, tt.duration, tt.description,
           tt.objectives, tt.equipment, tt.exercises, tt.difficulty
    FROM training_plans tp
    LEFT JOIN training_templates tt ON tp.template_id = tt.id
    WHERE tp.id = ?
  `;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Antrenman planı bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Yeni antrenman planı ekle
router.post('/plans', (req, res) => {
  const { date, template_id, notes, completed } = req.body;

  const sql = `INSERT INTO training_plans (date, template_id, notes, completed)
               VALUES (?, ?, ?, ?)`;

  db.run(sql, [date, template_id, notes, completed || 0], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Antrenman planı başarıyla eklendi',
      id: this.lastID
    });
  });
});

// Antrenman planı güncelle
router.put('/plans/:id', (req, res) => {
  const { date, template_id, notes, completed } = req.body;

  const sql = `UPDATE training_plans
               SET date = ?, template_id = ?, notes = ?, completed = ?
               WHERE id = ?`;

  db.run(sql, [date, template_id, notes, completed, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Antrenman planı bulunamadı' });
      return;
    }
    res.json({ message: 'Antrenman planı başarıyla güncellendi' });
  });
});

// Antrenman planı sil
router.delete('/plans/:id', (req, res) => {
  const sql = 'DELETE FROM training_plans WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Antrenman planı bulunamadı' });
      return;
    }
    res.json({ message: 'Antrenman planı başarıyla silindi' });
  });
});

module.exports = router;
