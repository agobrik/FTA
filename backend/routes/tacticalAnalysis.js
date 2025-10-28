const express = require('express');
const router = express.Router();
const db = require('../ultra_database');

// ==========================================
// FİLTRELEME ENDPOİNTLERİ - YENİ
// ==========================================

// Formasyon kategorilerini getir (back line sayısına göre)
router.get('/formations/categories', (req, res) => {
  const sql = 'SELECT DISTINCT formation FROM tactical_systems ORDER BY formation';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.json({ data: [] });
      return;
    }

    // Formasyonları back line sayısına göre kategorize et
    const categories = {
      '2li': { name: '2\'li Savunma', formations: [] },
      '3lu': { name: '3\'lü Savunma', formations: [] },
      '4lu': { name: '4\'lü Savunma', formations: [] },
      '5li': { name: '5\'li Savunma', formations: [] },
      'diger': { name: 'Diğer', formations: [] }
    };

    rows.forEach(row => {
      const formation = row.formation;
      const firstChar = formation.charAt(0);

      if (firstChar === '2') {
        categories['2li'].formations.push(formation);
      } else if (firstChar === '3') {
        categories['3lu'].formations.push(formation);
      } else if (firstChar === '4') {
        categories['4lu'].formations.push(formation);
      } else if (firstChar === '5') {
        categories['5li'].formations.push(formation);
      } else {
        categories['diger'].formations.push(formation);
      }
    });

    // Boş kategorileri çıkar
    const result = Object.keys(categories)
      .filter(key => categories[key].formations.length > 0)
      .map(key => ({
        id: key,
        name: categories[key].name,
        formations: categories[key].formations
      }));

    res.json({ data: result });
  });
});

// Belirli bir formasyonun sistemlerini getir
router.get('/systems/by-formation/:formation', (req, res) => {
  const sql = 'SELECT * FROM tactical_systems WHERE formation = ? ORDER BY name';
  db.all(sql, [req.params.formation], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// Pozisyon kategorilerini getir
router.get('/roles/categories', (req, res) => {
  const categories = [
    { id: 'GK', name: 'Kaleci', icon: '🧤' },
    { id: 'DF', name: 'Savunma', icon: '🛡️' },
    { id: 'MF', name: 'Orta Saha', icon: '⚙️' },
    { id: 'FW', name: 'Forvet', icon: '⚽' }
  ];

  res.json({ data: categories });
});

// Belirli pozisyonun rollerini sub_position ile grupla
router.get('/roles/by-position/:position', (req, res) => {
  const sql = `
    SELECT sub_position, COUNT(*) as count
    FROM player_roles
    WHERE position = ?
    GROUP BY sub_position
    ORDER BY sub_position
  `;
  db.all(sql, [req.params.position], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // sub_position'ı role_type olarak döndür (frontend uyumluluğu için)
    const result = rows.map(row => ({
      role_type: row.sub_position,
      count: row.count
    }));
    res.json({ data: result });
  });
});

// Pozisyon ve sub_position'a göre rolleri getir
router.get('/roles/filter/:position/:roleType', (req, res) => {
  const sql = `
    SELECT *
    FROM player_roles
    WHERE position = ? AND sub_position = ?
    ORDER BY role_name
  `;
  db.all(sql, [req.params.position, req.params.roleType], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// Tüm taktik sistemleri getir
router.get('/systems', (req, res) => {
  const sql = 'SELECT * FROM tactical_systems ORDER BY name';
  db.all(sql, [], (err, rows) => {
    if (err) {
      // Table doesn't exist yet, return empty array
      console.warn('Tactical systems table not found:', err.message);
      res.json({ data: [], message: 'Taktik sistemler henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// Tek taktik sistem detayı
router.get('/systems/:id', (req, res) => {
  const sql = 'SELECT * FROM tactical_systems WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.warn('Tactical systems table not found:', err.message);
      res.status(404).json({ error: 'Taktik sistemi bulunamadı' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Taktik sistemi bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Formasyon ve tip bazlı filtreleme
router.get('/systems/filter/:type', (req, res) => {
  const { type } = req.params;
  const { formation, system_type } = req.query;

  let sql = 'SELECT * FROM tactical_systems WHERE 1=1';
  const params = [];

  if (formation) {
    sql += ' AND formation = ?';
    params.push(formation);
  }

  if (system_type) {
    sql += ' AND system_type = ?';
    params.push(system_type);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Taktik sistemine bağlı paternler
router.get('/systems/:id/patterns', (req, res) => {
  const sql = 'SELECT * FROM tactical_patterns WHERE system_id = ?';
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Tüm oyuncu rollerini getir
router.get('/roles', (req, res) => {
  const sql = 'SELECT * FROM player_roles ORDER BY position, role_name';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Player roles table not found:', err.message);
      res.json({ data: [], message: 'Oyuncu rolleri henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// Tek oyuncu rolü detayı
router.get('/roles/:id', (req, res) => {
  const sql = 'SELECT * FROM player_roles WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Oyuncu rolü bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// Pozisyona göre roller
router.get('/roles/position/:position', (req, res) => {
  const sql = 'SELECT * FROM player_roles WHERE position = ?';
  db.all(sql, [req.params.position], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Taktik sisteme uygun roller
router.get('/systems/:id/roles', (req, res) => {
  const sql = `
    SELECT pr.*, srm.position_on_field, srm.importance, srm.alternatives
    FROM player_roles pr
    JOIN system_role_mapping srm ON pr.id = srm.role_id
    WHERE srm.system_id = ?
    ORDER BY srm.importance DESC
  `;
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Anti-taktik önerileri
router.get('/counter-tactics/:systemId', (req, res) => {
  const sql = `
    SELECT ct.*, ts.name as counter_system_name, ts.formation as counter_formation
    FROM counter_tactics ct
    LEFT JOIN tactical_systems ts ON ct.counter_system_id = ts.id
    WHERE ct.system_id = ?
  `;
  db.get(sql, [req.params.systemId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row || null });
  });
});

// Tüm anti-taktikleri listele
router.get('/counter-tactics', (req, res) => {
  const sql = `
    SELECT ct.*,
           ts1.name as target_system_name, ts1.formation as target_formation,
           ts2.name as counter_system_name, ts2.formation as counter_formation
    FROM counter_tactics ct
    JOIN tactical_systems ts1 ON ct.system_id = ts1.id
    LEFT JOIN tactical_systems ts2 ON ct.counter_system_id = ts2.id
    ORDER BY ts1.name
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Oyuncu - Rol Eşleştirme Analizi
router.post('/player-role-match', (req, res) => {
  const { player_id, role_id } = req.body;

  // Basit bir eşleştirme algoritması (gerçekte daha karmaşık olabilir)
  const playerSql = 'SELECT * FROM players WHERE id = ?';
  const roleSql = 'SELECT * FROM player_roles WHERE id = ?';

  db.get(playerSql, [player_id], (err, player) => {
    if (err || !player) {
      res.status(404).json({ error: 'Oyuncu bulunamadı' });
      return;
    }

    db.get(roleSql, [role_id], (err, role) => {
      if (err || !role) {
        res.status(404).json({ error: 'Rol bulunamadı' });
        return;
      }

      // Basit eşleştirme mantığı
      let fit_percentage = 50; // Başlangıç
      const strengths = [];
      const weaknesses = [];
      const development_areas = [];

      // Pozisyon eşleşmesi
      if (player.position === role.position) {
        fit_percentage += 20;
        strengths.push('Pozisyon eşleşmesi mükemmel');
      } else {
        weaknesses.push('Pozisyon uyumsuzluğu');
        fit_percentage -= 20;
      }

      // Rating kontrolü
      if (player.rating >= 80) {
        fit_percentage += 15;
        strengths.push('Yüksek genel yetenek');
      } else if (player.rating < 70) {
        fit_percentage -= 10;
        development_areas.push('Genel yetenek geliştirmeli');
      }

      // Boy kontrolü (roller için ideal boy var)
      const idealHeights = role.ideal_height_range?.split('-') || [];
      if (idealHeights.length === 2) {
        const minHeight = parseInt(idealHeights[0]);
        const maxHeight = parseInt(idealHeights[1]);
        if (player.height >= minHeight && player.height <= maxHeight) {
          fit_percentage += 10;
          strengths.push('İdeal boy aralığında');
        } else {
          weaknesses.push('Boy ideal değil');
        }
      }

      // Yaş kontrolü
      const idealAges = role.ideal_age_range?.split('-') || [];
      if (idealAges.length === 2) {
        const minAge = parseInt(idealAges[0]);
        const maxAge = parseInt(idealAges[1]);
        if (player.age >= minAge && player.age <= maxAge) {
          fit_percentage += 5;
        } else if (player.age < minAge) {
          development_areas.push('Genç, deneyim kazanmalı');
        } else {
          weaknesses.push('İdeal yaş aralığının üstünde');
        }
      }

      fit_percentage = Math.max(0, Math.min(100, fit_percentage));

      const matchResult = {
        player: player,
        role: role,
        fit_percentage: fit_percentage.toFixed(1),
        strengths: strengths.join(', '),
        weaknesses: weaknesses.join(', '),
        development_areas: development_areas.join(', '),
        recommendation: fit_percentage >= 75 ? 'Mükemmel Uyum' :
                       fit_percentage >= 60 ? 'İyi Uyum' :
                       fit_percentage >= 40 ? 'Orta Uyum' : 'Zayıf Uyum'
      };

      res.json({ data: matchResult });
    });
  });
});

// Sistem karşılaştırma
router.get('/systems/compare/:id1/:id2', (req, res) => {
  const sql = 'SELECT * FROM tactical_systems WHERE id IN (?, ?)';
  db.all(sql, [req.params.id1, req.params.id2], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (rows.length !== 2) {
      res.status(404).json({ error: 'Sistemler bulunamadı' });
      return;
    }

    const comparison = {
      system1: rows[0],
      system2: rows[1],
      differences: {
        formation: rows[0].formation !== rows[1].formation,
        pressing: rows[0].pressing_intensity !== rows[1].pressing_intensity,
        tempo: rows[0].tempo !== rows[1].tempo,
        style: rows[0].system_type !== rows[1].system_type,
        mentality: rows[0].team_mentality !== rows[1].team_mentality
      }
    };

    res.json({ data: comparison });
  });
});

// Yeni taktik sistemi ekle
router.post('/systems', (req, res) => {
  const {
    name, formation, system_type, philosophy, attacking_phase, defensive_phase,
    transition_attack, transition_defense, pressing_intensity, defensive_line_height,
    width_in_attack, width_in_defense, tempo, passing_style, build_up_play,
    chance_creation, defensive_style, team_mentality
  } = req.body;

  const sql = `INSERT INTO tactical_systems
    (name, formation, system_type, philosophy, attacking_phase, defensive_phase,
     transition_attack, transition_defense, pressing_intensity, defensive_line_height,
     width_in_attack, width_in_defense, tempo, passing_style, build_up_play,
     chance_creation, defensive_style, team_mentality)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [
    name, formation, system_type, philosophy, attacking_phase, defensive_phase,
    transition_attack, transition_defense, pressing_intensity, defensive_line_height,
    width_in_attack, width_in_defense, tempo, passing_style, build_up_play,
    chance_creation, defensive_style, team_mentality
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Taktik sistemi başarıyla eklendi',
      id: this.lastID
    });
  });
});

// Taktik raporu oluştur
router.post('/reports', (req, res) => {
  const {
    match_id, system_used, effectiveness_rating, possession_zones,
    passing_network, heat_map_data, key_moments, tactical_adjustments, analyst_notes
  } = req.body;

  const sql = `INSERT INTO tactical_reports
    (match_id, system_used, effectiveness_rating, possession_zones, passing_network,
     heat_map_data, key_moments, tactical_adjustments, analyst_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [
    match_id, system_used, effectiveness_rating, possession_zones, passing_network,
    heat_map_data, key_moments, tactical_adjustments, analyst_notes
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Taktik raporu oluşturuldu',
      id: this.lastID
    });
  });
});

// Maça ait taktik raporlarını getir
router.get('/reports/match/:matchId', (req, res) => {
  const sql = `
    SELECT tr.*, ts.name as system_name, ts.formation
    FROM tactical_reports tr
    LEFT JOIN tactical_systems ts ON tr.system_used = ts.id
    WHERE tr.match_id = ?
    ORDER BY tr.created_at DESC
  `;
  db.all(sql, [req.params.matchId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// ==========================================
// YENİ ENDPOINT'LER - 9 KULLANILMAYAN TABLO
// ==========================================

// 1. TACTICAL CONCEPTS (31 entries)
router.get('/concepts', (req, res) => {
  const sql = 'SELECT * FROM tactical_concepts ORDER BY importance DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Tactical concepts error:', err.message);
      res.json({ data: [], message: 'Taktik konseptler henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/concepts/:id', (req, res) => {
  const sql = 'SELECT * FROM tactical_concepts WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Konsept bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

router.get('/concepts/category/:category', (req, res) => {
  const sql = 'SELECT * FROM tactical_concepts WHERE category = ? ORDER BY importance DESC';
  db.all(sql, [req.params.category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// 2. SYSTEM WEAKNESSES (124 entries)
router.get('/systems/:id/weaknesses', (req, res) => {
  const sql = 'SELECT * FROM system_weaknesses WHERE system_id = ? ORDER BY severity DESC';
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      console.warn('System weaknesses error:', err.message);
      res.json({ data: [], message: 'Zayıflıklar henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/weaknesses', (req, res) => {
  const sql = 'SELECT * FROM system_weaknesses ORDER BY severity DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.json({ data: [], message: 'Zayıflıklar henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/weaknesses/type/:type', (req, res) => {
  const sql = 'SELECT * FROM system_weaknesses WHERE weakness_type = ? ORDER BY severity DESC';
  db.all(sql, [req.params.type], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// 3. FORMATION TRANSITIONS (20 entries)
router.get('/transitions', (req, res) => {
  const sql = 'SELECT * FROM formation_transitions ORDER BY from_formation';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Transitions error:', err.message);
      res.json({ data: [], message: 'Formasyon geçişleri henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/transitions/from/:formation', (req, res) => {
  const sql = 'SELECT * FROM formation_transitions WHERE from_formation = ?';
  db.all(sql, [req.params.formation], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/transitions/:fromFormation/to/:toFormation', (req, res) => {
  const sql = 'SELECT * FROM formation_transitions WHERE from_formation = ? AND to_formation = ?';
  db.get(sql, [req.params.fromFormation, req.params.toFormation], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// 4. ROLE SYNERGIES (29 entries)
router.get('/synergies', (req, res) => {
  const sql = `
    SELECT s.*,
           r1.role_name as role_1_name, r1.position as role_1_position,
           r2.role_name as role_2_name, r2.position as role_2_position
    FROM role_synergies s
    LEFT JOIN player_roles r1 ON s.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON s.role_2_id = r2.id
    ORDER BY s.synergy_score DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Synergies error:', err.message);
      res.json({ data: [], message: 'Rol sinerjileri henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/roles/:id/synergies', (req, res) => {
  const sql = `
    SELECT s.*,
           r1.role_name as role_1_name, r1.position as role_1_position,
           r2.role_name as role_2_name, r2.position as role_2_position
    FROM role_synergies s
    LEFT JOIN player_roles r1 ON s.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON s.role_2_id = r2.id
    WHERE s.role_1_id = ? OR s.role_2_id = ?
    ORDER BY s.synergy_score DESC
  `;
  db.all(sql, [req.params.id, req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/synergies/:role1/:role2', (req, res) => {
  const sql = `
    SELECT s.*,
           r1.role_name as role_1_name,
           r2.role_name as role_2_name
    FROM role_synergies s
    LEFT JOIN player_roles r1 ON s.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON s.role_2_id = r2.id
    WHERE (s.role_1_id = ? AND s.role_2_id = ?) OR (s.role_1_id = ? AND s.role_2_id = ?)
  `;
  db.get(sql, [req.params.role1, req.params.role2, req.params.role2, req.params.role1], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// 5. TACTICAL TRENDS (15 entries)
router.get('/trends', (req, res) => {
  const sql = 'SELECT * FROM tactical_trends ORDER BY prevalence DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Trends error:', err.message);
      res.json({ data: [], message: 'Taktik trendler henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/trends/:id', (req, res) => {
  const sql = 'SELECT * FROM tactical_trends WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

router.get('/trends/category/:category', (req, res) => {
  const sql = 'SELECT * FROM tactical_trends WHERE category = ? ORDER BY prevalence DESC';
  db.all(sql, [req.params.category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/trends/season/:season', (req, res) => {
  const sql = 'SELECT * FROM tactical_trends WHERE season LIKE ? ORDER BY prevalence DESC';
  db.all(sql, [`%${req.params.season}%`], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// 6. PRESSING TRAP ZONES (30 entries)
router.get('/pressing-zones', (req, res) => {
  const sql = 'SELECT * FROM pressing_trap_zones';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Pressing zones error:', err.message);
      res.json({ data: [], message: 'Presing bölgeleri henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/pressing-zones/:id', (req, res) => {
  const sql = 'SELECT * FROM pressing_trap_zones WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

router.get('/systems/:id/pressing-zones', (req, res) => {
  const sql = 'SELECT * FROM pressing_trap_zones WHERE system_id = ?';
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      res.json({ data: [], message: 'Bu sistem için presing bölgesi bulunamadı' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

// 7. POSSESSION TACTICS (14 entries)
router.get('/possession', (req, res) => {
  const sql = 'SELECT * FROM possession_tactics';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Possession tactics error:', err.message);
      res.json({ data: [], message: 'Top kontrolü taktikleri henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/systems/:id/possession', (req, res) => {
  const sql = 'SELECT * FROM possession_tactics WHERE system_id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.json({ data: null, message: 'Bu sistem için top kontrolü taktiği bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// 8. NON-POSSESSION TACTICS (30 entries)
router.get('/non-possession', (req, res) => {
  const sql = 'SELECT * FROM non_possession_tactics';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Non-possession tactics error:', err.message);
      res.json({ data: [], message: 'Topsuz oyun taktikleri henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/systems/:id/non-possession', (req, res) => {
  const sql = 'SELECT * FROM non_possession_tactics WHERE system_id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.json({ data: null, message: 'Bu sistem için topsuz oyun taktiği bulunamadı' });
      return;
    }
    res.json({ data: row });
  });
});

// 9. TACTICAL PARTNERSHIPS (45 entries)
router.get('/partnerships', (req, res) => {
  const sql = `
    SELECT p.*,
           r1.role_name as role_1_name, r1.position as role_1_position,
           r2.role_name as role_2_name, r2.position as role_2_position,
           r3.role_name as role_3_name, r3.position as role_3_position
    FROM tactical_partnerships p
    LEFT JOIN player_roles r1 ON p.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON p.role_2_id = r2.id
    LEFT JOIN player_roles r3 ON p.role_3_id = r3.id
    ORDER BY p.partnership_type
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.warn('Partnerships error:', err.message);
      res.json({ data: [], message: 'Taktik ortaklıklar henüz yüklenmemiş' });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/partnerships/:id', (req, res) => {
  const sql = `
    SELECT p.*,
           r1.role_name as role_1_name,
           r2.role_name as role_2_name,
           r3.role_name as role_3_name
    FROM tactical_partnerships p
    LEFT JOIN player_roles r1 ON p.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON p.role_2_id = r2.id
    LEFT JOIN player_roles r3 ON p.role_3_id = r3.id
    WHERE p.id = ?
  `;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

router.get('/partnerships/type/:type', (req, res) => {
  const sql = `
    SELECT p.*,
           r1.role_name as role_1_name,
           r2.role_name as role_2_name,
           r3.role_name as role_3_name
    FROM tactical_partnerships p
    LEFT JOIN player_roles r1 ON p.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON p.role_2_id = r2.id
    LEFT JOIN player_roles r3 ON p.role_3_id = r3.id
    WHERE p.partnership_type = ?
  `;
  db.all(sql, [req.params.type], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

router.get('/roles/:id/partnerships', (req, res) => {
  const sql = `
    SELECT p.*,
           r1.role_name as role_1_name,
           r2.role_name as role_2_name,
           r3.role_name as role_3_name
    FROM tactical_partnerships p
    LEFT JOIN player_roles r1 ON p.role_1_id = r1.id
    LEFT JOIN player_roles r2 ON p.role_2_id = r2.id
    LEFT JOIN player_roles r3 ON p.role_3_id = r3.id
    WHERE p.role_1_id = ? OR p.role_2_id = ? OR p.role_3_id = ?
  `;
  db.all(sql, [req.params.id, req.params.id, req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows || [] });
  });
});

module.exports = router;
