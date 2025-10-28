const express = require('express');
const router = express.Router();
const db = require('../database');

// Dashboard istatistiklerini getir
router.get('/stats', (req, res) => {
  const stats = {};

  // Toplam oyuncu sayısı
  db.get('SELECT COUNT(*) as count FROM players', [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    stats.totalPlayers = row.count;

    // Toplam maç sayısı
    db.get('SELECT COUNT(*) as count FROM matches', [], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      stats.totalMatches = row.count;

      // Kazanılan maçlar
      db.get('SELECT COUNT(*) as count FROM matches WHERE result = "Galibiyet"', [], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        stats.wins = row.count;

        // Beraberlikler
        db.get('SELECT COUNT(*) as count FROM matches WHERE result = "Beraberlik"', [], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          stats.draws = row.count;

          // Kayıplar
          db.get('SELECT COUNT(*) as count FROM matches WHERE result = "Mağlubiyet"', [], (err, row) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            stats.losses = row.count;

            // Toplam gol
            db.get('SELECT SUM(score_home) as total FROM matches WHERE home_away = "İç Saha"', [], (err, row) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              const homeGoals = row.total || 0;

              db.get('SELECT SUM(score_away) as total FROM matches WHERE home_away = "Deplasman"', [], (err, row) => {
                if (err) {
                  res.status(500).json({ error: err.message });
                  return;
                }
                const awayGoals = row.total || 0;
                stats.totalGoals = homeGoals + awayGoals;

                // Toplam taktik sayısı
                db.get('SELECT COUNT(*) as count FROM tactics', [], (err, row) => {
                  if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                  }
                  stats.totalTactics = row.count;

                  // Toplam antrenman şablonu sayısı
                  db.get('SELECT COUNT(*) as count FROM training_templates', [], (err, row) => {
                    if (err) {
                      res.status(500).json({ error: err.message });
                      return;
                    }
                    stats.totalTrainingTemplates = row.count;

                    // Toplam rakip takım sayısı
                    db.get('SELECT COUNT(*) as count FROM opponents', [], (err, row) => {
                      if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                      }
                      stats.totalOpponents = row.count;

                      res.json({ data: stats });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// Son maçları getir
router.get('/recent-matches', (req, res) => {
  const limit = req.query.limit || 5;
  const sql = 'SELECT * FROM matches ORDER BY match_date DESC LIMIT ?';

  db.all(sql, [limit], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Yaklaşan antrenmanları getir
router.get('/upcoming-training', (req, res) => {
  const limit = req.query.limit || 5;
  const sql = `
    SELECT tp.*, tt.name as template_name, tt.category, tt.duration
    FROM training_plans tp
    LEFT JOIN training_templates tt ON tp.template_id = tt.id
    WHERE tp.date >= date('now') AND tp.completed = 0
    ORDER BY tp.date ASC
    LIMIT ?
  `;

  db.all(sql, [limit], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// En iyi performans gösteren oyuncuları getir
router.get('/top-players', (req, res) => {
  const limit = req.query.limit || 5;
  const sql = `
    SELECT p.*, ps.goals, ps.assists, ps.matches_played
    FROM players p
    LEFT JOIN player_stats ps ON p.id = ps.player_id
    WHERE ps.season = ?
    ORDER BY (ps.goals + ps.assists) DESC
    LIMIT ?
  `;

  db.all(sql, [new Date().getFullYear(), limit], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Maç sonuç dağılımı
router.get('/match-results', (req, res) => {
  const sql = `
    SELECT result, COUNT(*) as count
    FROM matches
    GROUP BY result
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Pozisyona göre oyuncu dağılımı
router.get('/player-positions', (req, res) => {
  const sql = `
    SELECT position, COUNT(*) as count
    FROM players
    GROUP BY position
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

module.exports = router;
