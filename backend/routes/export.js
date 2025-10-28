const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const db = require('../database');

// Export players to CSV
router.get('/players/csv', (req, res) => {
  const sql = 'SELECT * FROM players ORDER BY name';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    try {
      const fields = [
        'id',
        'name',
        'position',
        'age',
        'jersey_number',
        'height',
        'weight',
        'nationality',
        'preferred_foot',
        'rating'
      ];

      const parser = new Parser({ fields });
      const csv = parser.parse(rows);

      res.header('Content-Type', 'text/csv; charset=utf-8');
      res.attachment(`oyuncular_${new Date().toISOString().split('T')[0]}.csv`);
      res.send('\uFEFF' + csv); // Add BOM for Turkish characters
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// Export matches to CSV
router.get('/matches/csv', (req, res) => {
  const sql = `
    SELECT
      m.*,
      mp.possession,
      mp.shots,
      mp.shots_on_target,
      mp.pass_accuracy
    FROM matches m
    LEFT JOIN match_performance mp ON m.id = mp.match_id
    ORDER BY m.match_date DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    try {
      const fields = [
        'id',
        'opponent',
        'match_date',
        'location',
        'home_away',
        'score_home',
        'score_away',
        'formation',
        'result',
        'possession',
        'shots',
        'shots_on_target',
        'pass_accuracy'
      ];

      const parser = new Parser({ fields });
      const csv = parser.parse(rows);

      res.header('Content-Type', 'text/csv; charset=utf-8');
      res.attachment(`maclar_${new Date().toISOString().split('T')[0]}.csv`);
      res.send('\uFEFF' + csv);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// Export player stats to CSV
router.get('/player-stats/csv', (req, res) => {
  const sql = `
    SELECT
      p.name as player_name,
      p.position,
      ps.*
    FROM player_stats ps
    JOIN players p ON ps.player_id = p.id
    ORDER BY ps.season DESC, p.name
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    try {
      const fields = [
        'player_name',
        'position',
        'season',
        'matches_played',
        'goals',
        'assists',
        'yellow_cards',
        'red_cards',
        'minutes_played',
        'pass_accuracy',
        'shots',
        'tackles',
        'interceptions'
      ];

      const parser = new Parser({ fields });
      const csv = parser.parse(rows);

      res.header('Content-Type', 'text/csv; charset=utf-8');
      res.attachment(`oyuncu_istatistikleri_${new Date().toISOString().split('T')[0]}.csv`);
      res.send('\uFEFF' + csv);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// Export all data as JSON (for backup)
router.get('/backup/json', async (req, res) => {
  try {
    const backup = {};

    // Helper function to promisify db.all
    const getAllData = (sql) => {
      return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    };

    // Export all tables
    backup.players = await getAllData('SELECT * FROM players');
    backup.player_stats = await getAllData('SELECT * FROM player_stats');
    backup.matches = await getAllData('SELECT * FROM matches');
    backup.match_performance = await getAllData('SELECT * FROM match_performance');
    backup.match_player_performance = await getAllData('SELECT * FROM match_player_performance');
    backup.tactics = await getAllData('SELECT * FROM tactics');
    backup.opponents = await getAllData('SELECT * FROM opponents');
    backup.training_templates = await getAllData('SELECT * FROM training_templates');
    backup.training_plans = await getAllData('SELECT * FROM training_plans');

    backup.export_date = new Date().toISOString();
    backup.version = '1.0.0';

    res.header('Content-Type', 'application/json');
    res.attachment(`fta_backup_${new Date().toISOString().split('T')[0]}.json`);
    res.json(backup);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get export stats
router.get('/stats', (req, res) => {
  const queries = [
    'SELECT COUNT(*) as count FROM players',
    'SELECT COUNT(*) as count FROM matches',
    'SELECT COUNT(*) as count FROM tactics',
    'SELECT COUNT(*) as count FROM opponents',
    'SELECT COUNT(*) as count FROM training_templates'
  ];

  Promise.all(
    queries.map(sql => new Promise((resolve, reject) => {
      db.get(sql, [], (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    }))
  ).then(([players, matches, tactics, opponents, training]) => {
    res.json({
      success: true,
      data: {
        players,
        matches,
        tactics,
        opponents,
        training_templates: training,
        total_records: players + matches + tactics + opponents + training
      }
    });
  }).catch(error => {
    res.status(500).json({ success: false, error: error.message });
  });
});

module.exports = router;
