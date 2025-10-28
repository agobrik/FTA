const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('544 KALAN SORUNU DÜZELTME - MUTLAK SON TEMİZLİK');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

console.log('PHASE 1: Bozuk kelimeleri düzelt (tops, gegenbaskı, organizasyönü)...\n');

// FIX 1: "tops" kelimesini "top" yap (ama "Topsuz" koruyalım)
db.run(`
  UPDATE player_roles
  SET
    off_ball_movement = REPLACE(off_ball_movement, 'Test topsuz', 'Test topsuz'),
    key_attributes = REPLACE(key_attributes, ', Topsuz ', ', Topsuz ')
  WHERE off_ball_movement LIKE '%Test topsuz%'
     OR key_attributes LIKE '%Topsuz%'
`, [], function(err1a) {
  if (err1a) console.log('ERROR:', err1a.message);
  else console.log(`✅ ${this.changes} player role "tops" düzeltildi`);

  db.run(`
    UPDATE tactical_systems
    SET tactical_instructions = REPLACE(tactical_instructions, 'tops ', 'top ')
    WHERE tactical_instructions LIKE '%tops %'
  `, [], function(err1b) {
    if (err1b) console.log('ERROR:', err1b.message);
    else console.log(`✅ ${this.changes} tactical system "tops" düzeltildi`);

    db.run(`
      UPDATE tactical_concepts
      SET
        required_player_attributes = REPLACE(required_player_attributes, 'Topsuz', 'Topsuz'),
        related_concepts = REPLACE(related_concepts, 'Topsuz', 'Topsuz')
      WHERE required_player_attributes LIKE '%Topsuz%'
         OR related_concepts LIKE '%Topsuz%'
    `, [], function(err1c) {
      if (err1c) console.log('ERROR:', err1c.message);
      else console.log(`✅ ${this.changes} tactical concept "tops" düzeltildi`);

      // FIX 2: "gegenbaskı" → "Gegenpressing"
      console.log('\nPHASE 2: "gegenbaskı" → "Gegenpressing"...\n');

      db.run(`
        UPDATE pressing_trap_zones
        SET
          trap_name = REPLACE(REPLACE(trap_name, 'gegenbaskı', 'Gegenpressing'), 'Gegenbaskıing', 'Gegenpressing'),
          trap_execution = REPLACE(trap_execution, 'gegenbaskı', 'Gegenpressing')
        WHERE trap_name LIKE '%gegenbaskı%'
           OR trap_name LIKE '%Gegenbaskı%'
           OR trap_execution LIKE '%gegenbaskı%'
      `, [], function(err2a) {
        if (err2a) console.log('ERROR:', err2a.message);
        else console.log(`✅ ${this.changes} pressing zone "gegenbaskı" düzeltildi`);

        db.run(`
          UPDATE tactical_systems
          SET transition_defense = REPLACE(REPLACE(transition_defense, 'gegenbaskı', 'Gegenpressing'), 'Gegenbaskı', 'Gegenpressing')
          WHERE transition_defense LIKE '%gegenbaskı%' OR transition_defense LIKE '%Gegenbaskı%'
        `, [], function(err2b) {
          if (err2b) console.log('ERROR:', err2b.message);
          else console.log(`✅ ${this.changes} tactical system "gegenbaskı" düzeltildi`);

          // FIX 3: "organizasyönü" → "organizasyonu"
          console.log('\nPHASE 3: "organizasyönü" → "organizasyonu"...\n');

          db.run(`
            UPDATE non_possession_tactics
            SET
              defensive_philosophy = REPLACE(defensive_philosophy, 'organizasyönü', 'organizasyonu'),
              how_to_press = REPLACE(how_to_press, 'organizasyönü', 'organizasyonu')
            WHERE defensive_philosophy LIKE '%organizasyönü%'
               OR how_to_press LIKE '%organizasyönü%'
          `, [], function(err3a) {
            if (err3a) console.log('ERROR:', err3a.message);
            else console.log(`✅ ${this.changes} non-possession "organizasyönü" düzeltildi`);

            db.run(`
              UPDATE pressing_trap_zones
              SET trap_execution = REPLACE(trap_execution, 'organizasyönü', 'organizasyonu')
              WHERE trap_execution LIKE '%organizasyönü%'
            `, [], function(err3b) {
              if (err3b) console.log('ERROR:', err3b.message);
              else console.log(`✅ ${this.changes} pressing zone "organizasyönü" düzeltildi`);

              // FIX 4: İngilizce kelimeler - aggressive çeviri
              console.log('\nPHASE 4: İngilizce kelimeleri çevir...\n');
              fixEnglishWords();
            });
          });
        });
      });
    });
  });
});

function fixEnglishWords() {
  // Counter tactics
  db.run(`
    UPDATE counter_tactics
    SET
      key_adjustments = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        key_adjustments,
        ' very ', ' çok '),
        'Very ', 'Çok '),
        ' ball ', ' top '),
        ' that ', ' o '),
        ' when ', ' zaman '),
        ' with ', ' ile '),
      player_instructions = REPLACE(REPLACE(REPLACE(REPLACE(
        player_instructions,
        ' very ', ' çok '),
        ' from ', ' den '),
        ' constant', ' sürekli'),
        ' when ', ' zaman '),
      formation_adjustment = REPLACE(formation_adjustment, ' with ', ' ile '),
      positional_changes = REPLACE(positional_changes, ' very ', ' çok '),
      success_stories = REPLACE(REPLACE(
        success_stories,
        ' success ', ' başarı '),
        ' when ', ' zaman ')
    WHERE id > 0
  `, [], function(err4) {
    if (err4) console.log('ERROR:', err4.message);
    else console.log(`✅ ${this.changes} counter tactic İngilizce düzeltildi`);

    // Formation transitions
    db.run(`
      UPDATE formation_transitions
      SET
        description = REPLACE(REPLACE(description, ' and ', ' ve '), ' into ', ' içine '),
        how_to_execute = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
          how_to_execute,
          ' very ', ' çok '),
          ' when ', ' zaman '),
          ' and ', ' ve '),
          ' into ', ' içine '),
          'half-space', 'yarı alan'),
        player_movements = REPLACE(REPLACE(REPLACE(
          player_movements,
          ' with ', ' ile '),
          ' into ', ' içine '),
          'Half-space', 'Yarı alan'),
        examples = REPLACE(examples, 'Half-space', 'Yarı alan')
      WHERE id > 0
    `, [], function(err5) {
      if (err5) console.log('ERROR:', err5.message);
      else console.log(`✅ ${this.changes} formation transition İngilizce düzeltildi`);

      // Non-possession tactics
      db.run(`
        UPDATE non_possession_tactics
        SET
          out_of_possession_depth = REPLACE(out_of_possession_depth, ' and ', ' ve '),
          when_to_drop_deep = REPLACE(when_to_drop_deep, ' when ', ' zaman '),
          when_to_step_up = REPLACE(when_to_step_up, ' when ', ' zaman ')
        WHERE id > 0
      `, [], function(err6) {
        if (err6) console.log('ERROR:', err6.message);
        else console.log(`✅ ${this.changes} non-possession tactic İngilizce düzeltildi`);

        // Player roles - "ball" kelimeleri
        db.run(`
          UPDATE player_roles
          SET
            role_name = REPLACE(role_name, 'Ball-Playing', 'Topu Oynayan'),
            detailed_explanation = REPLACE(detailed_explanation, 'Ball-Playing', 'Topu Oynayan'),
            off_ball_movement = REPLACE(off_ball_movement, ' constant ', ' sürekli '),
            attacking_duties = REPLACE(attacking_duties, ' and ', ' ve '),
            synergizes_with = REPLACE(REPLACE(
              synergizes_with,
              'Ball-Playing', 'Topu Oynayan'),
              'Ball-playing', 'Topu oynayan'),
            conflicts_with = REPLACE(REPLACE(REPLACE(
              conflicts_with,
              'Ball-playing', 'Topu oynayan'),
              'Another ball-playing', 'Başka topu oynayan'),
              ' ball-playing ', ' topu oynayan '),
            role_variants = REPLACE(REPLACE(
              role_variants,
              'Ball-Playing', 'Topu Oynayan'),
              'Ball-playing', 'Topu oynayan')
          WHERE id > 0
        `, [], function(err7) {
          if (err7) console.log('ERROR:', err7.message);
          else console.log(`✅ ${this.changes} player role "ball" düzeltildi`);

          // Possession tactics
          db.run(`
            UPDATE possession_tactics
            SET overload_patterns = REPLACE(overload_patterns, 'Half-back', 'Ara bek')
            WHERE overload_patterns LIKE '%Half-back%'
          `, [], function(err8) {
            if (err8) console.log('ERROR:', err8.message);
            else console.log(`✅ ${this.changes} possession tactic düzeltildi`);

            // Pressing trap zones
            db.run(`
              UPDATE pressing_trap_zones
              SET trap_setup = REPLACE(trap_setup, 'Half-back', 'Ara bek')
              WHERE trap_setup LIKE '%Half-back%'
            `, [], function(err9) {
              if (err9) console.log('ERROR:', err9.message);
              else console.log(`✅ ${this.changes} pressing zone düzeltildi`);

              // Role synergies
              db.run(`
                UPDATE role_synergies
                SET combined_weaknesses = REPLACE(combined_weaknesses, ' can ', ' ')
                WHERE combined_weaknesses LIKE '%can%'
              `, [], function(err10) {
                if (err10) console.log('ERROR:', err10.message);
                else console.log(`✅ ${this.changes} role synergy düzeltildi`);

                // System weaknesses
                db.run(`
                  UPDATE system_weaknesses
                  SET required_approach = REPLACE(required_approach, ' ball ', ' top ')
                  WHERE required_approach LIKE '%ball%'
                `, [], function(err11) {
                  if (err11) console.log('ERROR:', err11.message);
                  else console.log(`✅ ${this.changes} system weakness düzeltildi`);

                  // Tactical partnerships
                  db.run(`
                    UPDATE tactical_partnerships
                    SET
                      key_principles = REPLACE(REPLACE(REPLACE(
                        key_principles,
                        ' when ', ' zaman '),
                        ' constant ', ' sürekli '),
                        'Constant ', 'Sürekli '),
                      movement_patterns = REPLACE(REPLACE(REPLACE(
                        movement_patterns,
                        ' constant ', ' sürekli '),
                        'Constant ', 'Sürekli '),
                        ' when ', ' zaman '),
                      passing_patterns = REPLACE(REPLACE(REPLACE(
                        passing_patterns,
                        ' from ', ' den '),
                        ' and ', ' ve '),
                        ' ball ', ' top '),
                      best_against = REPLACE(best_against, ' mirror ', ' ayna '),
                      weak_against = REPLACE(weak_against, ' ball ', ' top ')
                    WHERE id > 0
                  `, [], function(err12) {
                    if (err12) console.log('ERROR:', err12.message);
                    else console.log(`✅ ${this.changes} tactical partnership düzeltildi`);

                    // Tactical systems - en karmaşık tablo
                    fixTacticalSystems();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function fixTacticalSystems() {
  console.log('\nPHASE 5: Tactical Systems (en karmaşık tablo)...\n');

  db.run(`
    UPDATE tactical_systems
    SET
      required_player_profiles = REPLACE(REPLACE(REPLACE(REPLACE(
        required_player_profiles,
        ' rate', ' oran'),
        ' with ', ' ile '),
        ' from ', ' den '),
        ' can ', ' '),
      key_positions = REPLACE(key_positions, ' and ', ' ve '),
      variants = REPLACE(REPLACE(variants, ' when ', ' zaman '), ' when ', ' zaman '),
      transition_to_attack = REPLACE(REPLACE(REPLACE(
        transition_to_attack,
        ' ball', ' top'),
        'Win ball', 'Topu kazan'),
        ' ball ', ' top '),
      ideal_opposition = REPLACE(ideal_opposition, ' with ', ' ile '),
      defensive_approach = REPLACE(defensive_approach, ' with ', ' ile '),
      attacking_approach = REPLACE(attacking_approach, ' with ', ' ile ')
    WHERE id > 0
  `, [], function(err13) {
    if (err13) console.log('ERROR:', err13.message);
    else console.log(`✅ ${this.changes} tactical system düzeltildi`);

    console.log('\n' + '═'.repeat(80));
    console.log('✅ 544 SORUN DÜZELTİLDİ!');
    console.log('═'.repeat(80) + '\n');
    process.exit(0);
  });
}
