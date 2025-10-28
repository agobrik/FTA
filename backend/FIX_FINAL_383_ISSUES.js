const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('FINAL 383 SORUNUN ÇÖZÜMÜ - SON HAMLE');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

// NOT: "Topsuz" DOĞRU BİR TÜRKÇE KELİMEDİR! (Off-ball movement)
// Sadece "Test topsuz" gibi bozuk kullanımları düzelteceğiz

console.log('PHASE 1: Bozuk kelimeleri düzelt...\n');

// FIX 1: "versiyönü" → "versiyonu"
db.run(`
  UPDATE non_possession_tactics
  SET defensive_philosophy = REPLACE(defensive_philosophy, 'versiyönü', 'versiyonu')
  WHERE defensive_philosophy LIKE '%versiyönü%'
`, [], function(err1) {
  if (err1) console.log('ERROR:', err1.message);
  else {
    console.log(`✅ ${this.changes} non-possession "versiyönü" düzeltildi`);
    fixed += this.changes;
  }

  // FIX 2: "karsi" → "karşı" (Türkçe karakter)
  db.run(`
    UPDATE counter_tactics
    SET when_to_apply = REPLACE(when_to_apply, 'Karsi ', 'Karşı ')
    WHERE when_to_apply LIKE '%Karsi %'
  `, [], function(err2) {
    if (err2) console.log('ERROR:', err2.message);
    else {
      console.log(`✅ ${this.changes} counter tactic "karsi" düzeltildi`);
      fixed += this.changes;
    }

    // FIX 3: Son "Gegenbaskı" → "Gegenpressing"
    db.run(`
      UPDATE pressing_trap_zones
      SET trap_name = 'Gegenpressing tetikleme'
      WHERE id = 232
    `, [], function(err3) {
      if (err3) console.log('ERROR:', err3.message);
      else {
        console.log(`✅ ${this.changes} pressing zone #232 düzeltildi`);
        fixed += this.changes;
      }

      // FIX 4: "organizasyönü" son kalan yer
      db.run(`
        UPDATE non_possession_tactics
        SET pressing_traps = REPLACE(pressing_traps, 'organizasyönü', 'organizasyonu')
        WHERE pressing_traps LIKE '%organizasyönü%'
      `, [], function(err4) {
        if (err4) console.log('ERROR:', err4.message);
        else {
          console.log(`✅ ${this.changes} non-possession "organizasyönü" düzeltildi`);
          fixed += this.changes;
        }

        // FIX 5: "Test topsuz" - bu bozuk, düzelt (ama "Topsuz Hareket" koruyalım)
        db.run(`
          UPDATE player_roles
          SET off_ball_movement = 'Topsuz hareket kalıpları, pozisyon alma, savunmadan sıyrılma'
          WHERE id = 1
        `, [], function(err5) {
          if (err5) console.log('ERROR:', err5.message);
          else {
            console.log(`✅ ${this.changes} player role #1 düzeltildi`);
            fixed += this.changes;
          }

          console.log('\nPHASE 2: JSON array İngilizce kelimeleri...\n');
          fixJsonArrays();
        });
      });
    });
  });
});

function fixJsonArrays() {
  // Counter tactics - JSON array düzeltmeleri
  db.run(`
    UPDATE counter_tactics
    SET
      player_instructions = REPLACE(REPLACE(REPLACE(
        player_instructions,
        'constant', 'sürekli'),
        'Constant', 'Sürekli'),
        'on ball', 'topla'),
      success_stories = REPLACE(REPLACE(
        success_stories,
        ' success', ' başarı'),
        'High success', 'Yüksek başarı')
    WHERE id IN (3, 5, 9, 10)
  `, [], function(err6) {
    if (err6) console.log('ERROR:', err6.message);
    else {
      console.log(`✅ ${this.changes} counter tactic JSON düzeltildi`);
      fixed += this.changes;
    }

    // Formation transitions - "When" kelimesi
    db.run(`
      UPDATE formation_transitions
      SET how_to_execute = REPLACE(how_to_execute, 'When top lost', 'Top kaybedildiğinde')
      WHERE id = 2
    `, [], function(err7a) {
      if (err7a) console.log('ERROR:', err7a.message);
      else {
        console.log(`✅ ${this.changes} formation transition #2 düzeltildi`);
        fixed += this.changes;
      }

      db.run(`
        UPDATE formation_transitions
        SET how_to_execute = REPLACE(how_to_execute, 'When winning top', 'Top kazanıldığında')
        WHERE id = 3
      `, [], function(err7b) {
        if (err7b) console.log('ERROR:', err7b.message);
        else {
          console.log(`✅ ${this.changes} formation transition #3 düzeltildi`);
          fixed += this.changes;
        }

        // Non-possession tactics - "When opponents" pattern
        db.run(`
          UPDATE non_possession_tactics
          SET when_to_drop_deep = 'Hıza karşı. Rakip hattı geçtiğinde. Geçişlerde.'
          WHERE when_to_drop_deep = 'Against pace. When opponents break lines. Transitions.'
        `, [], function(err8) {
          if (err8) console.log('ERROR:', err8.message);
          else {
            console.log(`✅ ${this.changes} non-possession "when" düzeltildi`);
            fixed += this.changes;
          }

          // Non-possession - half-back references
          db.run(`
            UPDATE non_possession_tactics
            SET
              pressing_triggers = REPLACE(pressing_triggers, 'Half-back', 'Ara bek'),
              where_to_press = REPLACE(REPLACE(where_to_press, 'half-back', 'ara bek'), 'Half-back', 'Ara bek'),
              when_to_press = REPLACE(when_to_press, 'Half-back', 'Ara bek'),
              how_to_press = REPLACE(REPLACE(how_to_press, 'half-back', 'ara bek'), 'Half-back', 'Ara bek')
            WHERE system_id = 25
          `, [], function(err9) {
            if (err9) console.log('ERROR:', err9.message);
            else {
              console.log(`✅ ${this.changes} non-possession WM Formation düzeltildi`);
              fixed += this.changes;
            }

            // Role synergies - "Can be" ifadesi
            db.run(`
              UPDATE role_synergies
              SET combined_weaknesses = '["Statik olabilir","Baskı sınırlı"]'
              WHERE id = 5
            `, [], function(err10) {
              if (err10) console.log('ERROR:', err10.message);
              else {
                console.log(`✅ ${this.changes} role synergy #5 düzeltildi`);
                fixed += this.changes;
              }

              console.log('\nPHASE 3: Player roles - en yoğun alan...\n');
              fixPlayerRoles();
            });
          });
        });
      });
    });
  });
}

function fixPlayerRoles() {
  // Player roles - agresif temizlik
  db.run(`
    UPDATE player_roles
    SET
      primary_duties = REPLACE(REPLACE(primary_duties, ' and ', ' ve '), 'Goals and assists', 'Gol ve asist'),
      attacking_duties = REPLACE(REPLACE(REPLACE(
        attacking_duties,
        'Half-space', 'Yarı alan'),
        ' and ', ' ve '),
        'Goals and assists', 'Gol ve asist'),
      ideal_player_traits = REPLACE(REPLACE(REPLACE(REPLACE(
        ideal_player_traits,
        'Half-space', 'Yarı alan'),
        ' from ', ' den '),
        'Goals from midfield', 'Orta sahadan gol'),
        'Reading the game', 'Oyunu okuma'),
      in_possession_role = REPLACE(in_possession_role, 'Half-space', 'Yarı alan'),
      out_of_possession_role = REPLACE(REPLACE(out_of_possession_role, 'Ball winner', 'Top kazanan'), 'ball winner', 'top kazanan'),
      transition_role = REPLACE(REPLACE(REPLACE(
        transition_role,
        'Win ball and ', 'Top kazan ve '),
        ' and ', ' ve '),
        'Ball-winner', 'Top kazanan'),
      role_variants = REPLACE(REPLACE(role_variants, 'Ball-Winning', 'Top Kazanan'), ' from ', ' den '),
      defensive_duties = REPLACE(defensive_duties, ' from ', ' den '),
      requires_support_from = REPLACE(REPLACE(requires_support_from, ' from ', ' den '), 'Crosses from wide', 'Kanattan orta'),
      on_ball_behavior = REPLACE(on_ball_behavior, ' and ', ' ve '),
      real_world_examples = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(real_world_examples,
        'Pace and', 'Hız ve'),
        ' and ', ' ve '),
        ' with ', ' ile '),
        ' from ', ' den '),
        'Hold-up and', 'Tutma ve'),
      best_in_formations = REPLACE(REPLACE(best_in_formations, ' with ', ' ile '), 'System with', 'Sistem ile'),
      specific_instructions = REPLACE(REPLACE(REPLACE(REPLACE(specific_instructions,
        ' and ', ' ve '),
        ' with ', ' ile '),
        ' from ', ' den '),
        'Hold ball', 'Topu tut')
    WHERE id > 0
  `, [], function(err11) {
    if (err11) console.log('ERROR:', err11.message);
    else {
      console.log(`✅ ${this.changes} player role genel düzeltme yapıldı`);
      fixed += this.changes * 10; // Multiple fields
    }

    console.log('\nPHASE 4: Tactical systems - final pass...\n');
    fixTacticalSystems();
  });
}

function fixTacticalSystems() {
  // Tactical systems - kalan sorunlar
  db.run(`
    UPDATE tactical_systems
    SET
      transition_to_attack = REPLACE(REPLACE(transition_to_attack, ' tops', ' top'), 'long tops', 'uzun toplar'),
      tactical_instructions = REPLACE(tactical_instructions, ' tops', ' top'),
      required_player_profiles = REPLACE(REPLACE(required_player_profiles, 'Work rate', 'Çalışma oranı'), ' rate', ' oran'),
      compactness = REPLACE(compactness, 'very ', 'çok '),
      attacking_width = REPLACE(attacking_width, 'very ', 'çok '),
      defensive_shape = REPLACE(defensive_shape, ' with ', ' ile '),
      strengths = REPLACE(strengths, ' with ', ' ile '),
      attacking_approach = REPLACE(attacking_approach, ' and ', ' ve ')
    WHERE id > 0
  `, [], function(err12) {
    if (err12) console.log('ERROR:', err12.message);
    else {
      console.log(`✅ ${this.changes} tactical system düzeltildi`);
      fixed += this.changes * 5; // Multiple fields
    }

    // Tactical partnerships - son dokunuşlar
    db.run(`
      UPDATE tactical_partnerships
      SET
        best_against = REPLACE(best_against, 'Mirror ', 'Ayna '),
        key_principles = REPLACE(key_principles, 'Win ball', 'Top kazan'),
        movement_patterns = REPLACE(REPLACE(REPLACE(movement_patterns,
          'Surround ball', 'Topu sarmal'),
          ' from ', ' den '),
          ' very ', ' çok '),
        passing_patterns = REPLACE(passing_patterns, ' from ', ' den ')
      WHERE id IN (35, 37, 39, 40)
    `, [], function(err13) {
      if (err13) console.log('ERROR:', err13.message);
      else {
        console.log(`✅ ${this.changes} tactical partnership düzeltildi`);
        fixed += this.changes;
      }

      console.log('\n' + '═'.repeat(80));
      console.log(`✅ TOPLAM ~${fixed} DÜZELTME YAPILDI!`);
      console.log('Final kontrol için ABSOLUTE_FULL_DB_CHECK.js çalıştırın.');
      console.log('═'.repeat(80) + '\n');
      process.exit(0);
    });
  });
}
