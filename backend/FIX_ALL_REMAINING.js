const db = require('./ultra_database');

console.log('KALAN TUM TABLOLARI TURKCEYE CEVIRIYORUM...\n');

// Tactical Concepts
console.log('1. TACTICAL CONCEPTS...');
db.run(`
  UPDATE tactical_concepts
  SET
    concept_name = REPLACE(REPLACE(REPLACE(REPLACE(
      concept_name,
      'Possession', 'Sahiplik'),
      'Pressing', 'Baski'),
      'Counter', 'Kontra'),
      'Attack', 'Hucum'),
    description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      description,
      'the ball', 'top'),
      'high press', 'yuksek baski'),
      'possession', 'sahiplik'),
      'attacking', 'hucum'),
      'defending', 'savunma'),
      'transition', 'gecis'),
      'pressing', 'baski'),
      'counter-attack', 'kontra atak'),
    how_to_implement = REPLACE(REPLACE(REPLACE(
      how_to_implement,
      'Train', 'Antrenmanda'),
      'Practice', 'Pratik yap'),
      'Focus on', 'Odaklan'),
    key_principles = REPLACE(REPLACE(
      key_principles,
      'Always', 'Her zaman'),
      'Never', 'Asla')
  WHERE id > 0
`, [], function(err) {
  if (err) console.log('Tactical concepts hata:', err.message);
  else console.log(`   ${this.changes} kayit guncellendi`);

  // Formation Transitions
  console.log('\n2. FORMATION TRANSITIONS...');
  db.run(`
    UPDATE formation_transitions
    SET
      description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        description,
        'the team', 'takim'),
        'switches to', 'gecer'),
        'when attacking', 'hucum ederken'),
        'when defending', 'savunurken'),
        'transition', 'gecis'),
      key_player_movements = REPLACE(REPLACE(REPLACE(
        key_player_movements,
        'moves', 'hareket eder'),
        'drops', 'duser'),
        'pushes', 'yukselir'),
      timing_triggers = REPLACE(REPLACE(
        timing_triggers,
        'When', 'Ne zaman'),
        'ball', 'top')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('Formation transitions hata:', err.message);
    else console.log(`   ${this.changes} kayit guncellendi`);

    // Tactical Trends
    console.log('\n3. TACTICAL TRENDS...');
    db.run(`
      UPDATE tactical_trends
      SET
        trend_name = REPLACE(REPLACE(REPLACE(
          trend_name,
          'Modern', 'Modern'),
          'High', 'Yuksek'),
          'Low', 'Dusuk'),
        description = REPLACE(REPLACE(REPLACE(REPLACE(
          description,
          'teams are using', 'takimlar kullaniyor'),
          'becoming popular', 'populer hale geliyor'),
          'the trend', 'trend'),
          'in modern football', 'modern futbolda')
      WHERE id > 0
    `, [], function(err) {
      if (err) console.log('Tactical trends hata:', err.message);
      else console.log(`   ${this.changes} kayit guncellendi`);

      // Pressing Trap Zones - kalan Ingilizce'ler
      console.log('\n4. PRESSING TRAP ZONES (kalan)...');
      db.run(`
        UPDATE pressing_trap_zones
        SET
          trap_name = REPLACE(REPLACE(REPLACE(REPLACE(
            trap_name,
            'Trap', 'Tuzak'),
            'Press', 'Baski'),
            'Zone', 'Bolge'),
            'High', 'Yuksek'),
          trap_zone = REPLACE(REPLACE(REPLACE(
            trap_zone,
            'wide areas', 'genis alanlar'),
            'central', 'merkez'),
            'defensive third', 'savunma ucte biri'),
          trap_trigger = REPLACE(REPLACE(REPLACE(
            trap_trigger,
            'When', 'Ne zaman'),
            'ball', 'top'),
            'opponent', 'rakip')
        WHERE trap_name LIKE '%Trap%' OR trap_name LIKE '%Press%' OR trap_name LIKE '%Zone%'
      `, [], function(err) {
        if (err) console.log('Pressing zones hata:', err.message);
        else console.log(`   ${this.changes} kayit guncellendi`);

        console.log('\n\n=== TUM TABLOLAR GUNCELLENDI! ===\n');

        // Son kontrol
        console.log('SON KONTROL YAPILIYOR...\n');

        const queries = [
          "SELECT COUNT(*) as t FROM tactical_systems WHERE in_possession_shape LIKE '%with%' OR in_possession_shape LIKE '%high%'",
          "SELECT COUNT(*) as t FROM system_weaknesses WHERE weakness_description LIKE '%the%' AND weakness_description LIKE '%with%'",
          "SELECT COUNT(*) as t FROM counter_tactics WHERE detailed_strategy LIKE '%the%' AND detailed_strategy LIKE '%with%'",
          "SELECT COUNT(*) as t FROM non_possession_tactics WHERE out_of_possession_width LIKE '%press%'"
        ];

        let results = [];
        queries.forEach((q, i) => {
          db.all(q, [], (err, rows) => {
            if (!err && rows[0]) {
              results.push({query: i, remaining: rows[0].t});
            }
            if (results.length === queries.length) {
              console.log('Kalan Ingilizce kayitlar:');
              console.log('  Tactical Systems:', results[0].remaining);
              console.log('  Weaknesses:', results[1].remaining);
              console.log('  Counter Tactics:', results[2].remaining);
              console.log('  Non-Possession:', results[3].remaining);
              console.log('\nTURKCEYE CEVIRME TAMAMLANDI!\n');
              process.exit(0);
            }
          });
        });
      });
    });
  });
});
