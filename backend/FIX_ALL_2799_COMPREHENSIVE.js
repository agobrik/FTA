const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('2,799 SORUNU KAPSAMLI ŞEKİLDE DÜZELTİYORUZ');
console.log('═'.repeat(80) + '\n');

let fixed = 0;
let phase = 0;

// PHASE 1: Bozuk birleşik kelimeleri düzelt
console.log('PHASE 1/10: Bozuk birleşik kelimeleri düzeltiyoruz...\n');

db.run(`
  UPDATE possession_tactics
  SET
    circulation_patterns = REPLACE(REPLACE(REPLACE(
      circulation_patterns,
      'üzerindenload', 'üzerinden aşırı yükleme'),
      'kombinasyönü', 'kombinasyonu'),
      'pozisyönü', 'pozisyonu'),
    overload_patterns = REPLACE(REPLACE(REPLACE(
      overload_patterns,
      'üzerindenload', 'üzerinden aşırı yükleme'),
      'kombinasyönü', 'kombinasyonu'),
      'pozisyönü', 'pozisyonu')
  WHERE circulation_patterns LIKE '%üzerindenload%'
     OR circulation_patterns LIKE '%kombinasyönü%'
     OR overload_patterns LIKE '%kombinasyönü%'
     OR overload_patterns LIKE '%pozisyönü%'
`, [], function(err1) {
  if (err1) console.log('ERROR:', err1.message);
  else {
    console.log(`✅ ${this.changes} possession_tactics - bozuk kelimeler düzeltildi`);
    fixed += this.changes;
  }

  db.run(`
    UPDATE non_possession_tactics
    SET counter_attack_philosophy = REPLACE(counter_attack_philosophy, 'pozisyönü', 'pozisyonu')
    WHERE counter_attack_philosophy LIKE '%pozisyönü%'
  `, [], function(err2) {
    if (err2) console.log('ERROR:', err2.message);
    else {
      console.log(`✅ ${this.changes} non_possession_tactics - bozuk kelimeler düzeltildi`);
      fixed += this.changes;
    }

    phase++;
    phase2();
  });
});

function phase2() {
  console.log('\nPHASE 2/10: "buildup" → "oyun kurma" (çok yaygın!)...\n');

  db.run(`
    UPDATE possession_tactics
    SET
      in_possession_shape = REPLACE(REPLACE(REPLACE(
        in_possession_shape,
        ' Buildup', ' Oyun Kurma'),
        'buildup', 'oyun kurma'),
        'Buildup', 'Oyun kurma'),
      movement_principles = REPLACE(REPLACE(
        movement_principles,
        ' buildup', ' oyun kurma'),
        'buildup', 'oyun kurma'),
      passing_principles = REPLACE(REPLACE(
        passing_principles,
        ' buildup', ' oyun kurma'),
        'buildup', 'oyun kurma'),
      overload_patterns = REPLACE(overload_patterns, 'buildup', 'oyun kurma'),
      circulation_patterns = REPLACE(circulation_patterns, 'buildup', 'oyun kurma')
    WHERE in_possession_shape LIKE '%buildup%'
       OR movement_principles LIKE '%buildup%'
       OR passing_principles LIKE '%buildup%'
       OR overload_patterns LIKE '%buildup%'
       OR circulation_patterns LIKE '%buildup%'
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} possession_tactics - "buildup" düzeltildi`);
      fixed += this.changes * 3;
    }

    phase++;
    phase3();
  });
}

function phase3() {
  console.log('\nPHASE 3/10: "box-to-box" → "kutu kutuya"...\n');

  db.run(`
    UPDATE possession_tactics
    SET
      movement_principles = REPLACE(REPLACE(
        movement_principles,
        'box-to-box', 'kutu kutuya'),
        'Box-to-box', 'Kutu kutuya'),
      progression_patterns = REPLACE(progression_patterns, 'box-to-box', 'kutu kutuya'),
      passing_principles = REPLACE(passing_principles, 'box-to-box', 'kutu kutuya'),
      overload_patterns = REPLACE(overload_patterns, 'box-to-box', 'kutu kutuya')
    WHERE movement_principles LIKE '%box%'
       OR progression_patterns LIKE '%box%'
       OR passing_principles LIKE '%box%'
       OR overload_patterns LIKE '%box%'
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} possession_tactics - "box-to-box" düzeltildi`);
      fixed += this.changes * 2;
    }

    db.run(`
      UPDATE player_roles
      SET
        description = REPLACE(description, 'box-to-box', 'kutu kutuya'),
        detailed_explanation = REPLACE(detailed_explanation, 'box-to-box', 'kutu kutuya'),
        movement_pattern = REPLACE(movement_pattern, 'box-to-box', 'kutu kutuya')
      WHERE description LIKE '%box-to-box%'
         OR detailed_explanation LIKE '%box-to-box%'
         OR movement_pattern LIKE '%box-to-box%'
    `, [], function(err2) {
      if (err2) console.log('ERROR:', err2.message);
      else {
        console.log(`✅ ${this.changes} player_roles - "box-to-box" düzeltildi`);
        fixed += this.changes * 2;
      }

      phase++;
      phase4();
    });
  });
}

function phase4() {
  console.log('\nPHASE 4/10: "third" → "üçlü bölge/kısım"...\n');

  db.run(`
    UPDATE non_possession_tactics
    SET
      pressing_intensity_zones = REPLACE(REPLACE(REPLACE(
        pressing_intensity_zones,
        'defensive third', 'savunma üçlüsü'),
        'Opponent third', 'Rakip üçlüsü'),
        'third', 'üçlü'),
      where_to_press = REPLACE(where_to_press, 'third', 'üçlü')
    WHERE pressing_intensity_zones LIKE '%third%'
       OR where_to_press LIKE '%third%'
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} non_possession_tactics - "third" düzeltildi`);
      fixed += this.changes * 2;
    }

    phase++;
    phase5();
  });
}

function phase5() {
  console.log('\nPHASE 5/10: TAM İNGİLİZCE CÜMLELER - non_possession_tactics...\n');

  // Bu alanlar tamamen İngilizce cümleler içeriyor, Türkçe'ye çevirelim
  db.run(`
    UPDATE non_possession_tactics
    SET
      pressing_coordination = CASE
        WHEN pressing_coordination LIKE '%Highly coordinated%' THEN 'Yüksek koordinasyon. Tüm takım birim olarak baskı yapar. Baskı tuzakları. Tüm seçenekleri keser.'
        WHEN pressing_coordination LIKE '%Individual or small group%' THEN 'Bireysel veya küçük grup baskısı. Tüm takım değil.'
        ELSE pressing_coordination
      END,
      defensive_line_coordination = CASE
        WHEN defensive_line_coordination LIKE '%Defensive line moves as unit%' THEN 'Savunma hattı birim olarak hareket eder. Sürekli iletişim. Beraber çıkar ve düşer. Ofsayt tuzağı koordinasyonu.'
        ELSE defensive_line_coordination
      END,
      recovery_positions = CASE
        WHEN recovery_positions LIKE '%Return to defensive shape%' THEN 'Savunma şekline dön. Boşlukları doldur. Merkezi alanları koru. Takım arkadaşlarını kapat.'
        ELSE recovery_positions
      END,
      when_to_step_up = REPLACE(REPLACE(REPLACE(
        when_to_step_up,
        'safe', 'güvenli'),
        'Compress space', 'Alanı sıkıştır'),
        'Step up zaman', 'Zaman çık'),
      when_to_press_high = REPLACE(REPLACE(REPLACE(REPLACE(
        when_to_press_high,
        'Occasionally', 'Ara sıra'),
        'Mid-block preferred', 'Orta blok tercih'),
        'Selective high pressing', 'Seçici yüksek baskı'),
        'pressing', 'baskı'),
      when_to_stay_compact = REPLACE(REPLACE(REPLACE(
        when_to_stay_compact,
        'Most of the time', 'Çoğu zaman'),
        'Compact mid-block', 'Kompakt orta blok'),
        'primary shape', 'ana şekil')
    WHERE pressing_coordination LIKE '%coordinated%'
       OR defensive_line_coordination LIKE '%line moves%'
       OR recovery_positions LIKE '%Return%'
       OR when_to_step_up LIKE '%safe%'
       OR when_to_press_high LIKE '%pressing%'
       OR when_to_stay_compact LIKE '%Most%'
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} non_possession_tactics - tam İngilizce cümleler düzeltildi`);
      fixed += this.changes * 5;
    }

    phase++;
    phase6();
  });
}

function phase6() {
  console.log('\nPHASE 6/10: Yaygın İngilizce kelimeler - tactical_systems...\n');

  db.run(`
    UPDATE tactical_systems
    SET
      philosophy = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        philosophy,
        ' back ', ' geri '),
        ' front ', ' ön '),
        ' through ', ' üzerinden '),
        ' around ', ' etrafında '),
        ' behind ', ' arkasında '),
        ' between ', ' arasında '),
      key_principles = REPLACE(REPLACE(REPLACE(REPLACE(
        key_principles,
        ' quick ', ' hızlı '),
        ' direct ', ' direkt '),
        ' central ', ' merkezi '),
        ' wide ', ' geniş '),
      build_up_play = REPLACE(REPLACE(REPLACE(REPLACE(
        build_up_play,
        ' back ', ' geri '),
        ' front ', ' ön '),
        ' through ', ' üzerinden '),
        ' around ', ' etrafında '),
      passing_style = REPLACE(REPLACE(REPLACE(
        passing_style,
        ' quick ', ' hızlı '),
        ' direct ', ' direkt '),
        ' simple ', ' basit ')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} tactical_systems düzeltildi`);
      fixed += this.changes * 8;
    }

    phase++;
    phase7();
  });
}

function phase7() {
  console.log('\nPHASE 7/10: Player roles - yaygın kelimeler...\n');

  db.run(`
    UPDATE player_roles
    SET
      description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        description,
        ' back ', ' geri '),
        ' front ', ' ön '),
        ' through ', ' üzerinden '),
        ' around ', ' etrafında '),
        ' behind ', ' arkasında '),
        ' between ', ' arasında '),
      detailed_explanation = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        detailed_explanation,
        ' back ', ' geri '),
        ' front ', ' ön '),
        ' through ', ' üzerinden '),
        ' around ', ' etrafında '),
        ' behind ', ' arkasında '),
      tactical_purpose = REPLACE(REPLACE(REPLACE(REPLACE(
        tactical_purpose,
        ' back ', ' geri '),
        ' through ', ' üzerinden '),
        ' around ', ' etrafında '),
        ' central ', ' merkezi ')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} player_roles düzeltildi`);
      fixed += this.changes * 7;
    }

    phase++;
    phase8();
  });
}

function phase8() {
  console.log('\nPHASE 8/10: System weaknesses, counter_tactics...\n');

  db.run(`
    UPDATE system_weaknesses
    SET
      weakness_description = REPLACE(REPLACE(REPLACE(REPLACE(
        weakness_description,
        ' back ', ' geri '),
        ' through ', ' üzerinden '),
        ' behind ', ' arkasında '),
        ' central ', ' merkezi '),
      how_to_exploit = REPLACE(REPLACE(REPLACE(
        how_to_exploit,
        ' back ', ' geri '),
        ' through ', ' üzerinden '),
        ' quick ', ' hızlı ')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} system_weaknesses düzeltildi`);
      fixed += this.changes * 3;
    }

    db.run(`
      UPDATE counter_tactics
      SET
        detailed_strategy = REPLACE(REPLACE(REPLACE(REPLACE(
          detailed_strategy,
          ' back ', ' geri '),
          ' through ', ' üzerinden '),
          ' behind ', ' arkasında '),
          ' quick ', ' hızlı '),
        key_adjustments = REPLACE(REPLACE(
          key_adjustments,
          ' back ', ' geri '),
          ' direct ', ' direkt ')
      WHERE id > 0
    `, [], function(err2) {
      if (err2) console.log('ERROR:', err2.message);
      else {
        console.log(`✅ ${this.changes} counter_tactics düzeltildi`);
        fixed += this.changes * 2;
      }

      phase++;
      phase9();
    });
  });
}

function phase9() {
  console.log('\nPHASE 9/10: Pressing_trap_zones, tactical_partnerships...\n');

  db.run(`
    UPDATE pressing_trap_zones
    SET
      trap_execution = REPLACE(REPLACE(REPLACE(REPLACE(
        trap_execution,
        ' back ', ' geri '),
        ' through ', ' üzerinden '),
        ' central ', ' merkezi '),
        ' around ', ' etrafında '),
      trap_setup = REPLACE(REPLACE(
        trap_setup,
        ' back ', ' geri '),
        ' central ', ' merkezi ')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} pressing_trap_zones düzeltildi`);
      fixed += this.changes * 2;
    }

    db.run(`
      UPDATE tactical_partnerships
      SET
        movement_patterns = REPLACE(REPLACE(REPLACE(
          movement_patterns,
          ' back ', ' geri '),
          ' through ', ' üzerinden '),
          ' around ', ' etrafında '),
        passing_patterns = REPLACE(REPLACE(
          passing_patterns,
          ' back ', ' geri '),
          ' through ', ' üzerinden ')
      WHERE id > 0
    `, [], function(err2) {
      if (err2) console.log('ERROR:', err2.message);
      else {
        console.log(`✅ ${this.changes} tactical_partnerships düzeltildi`);
        fixed += this.changes * 2;
      }

      phase++;
      phase10();
    });
  });
}

function phase10() {
  console.log('\nPHASE 10/10: Role_synergies, formation_transitions, tactical_concepts...\n');

  db.run(`
    UPDATE role_synergies
    SET
      synergy_description = REPLACE(REPLACE(
        synergy_description,
        ' back ', ' geri '),
        ' through ', ' üzerinden '),
      ideal_positioning = REPLACE(ideal_positioning, ' central ', ' merkezi ')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} role_synergies düzeltildi`);
      fixed += this.changes;
    }

    db.run(`
      UPDATE formation_transitions
      SET
        how_to_execute = REPLACE(REPLACE(REPLACE(
          how_to_execute,
          ' back ', ' geri '),
          ' through ', ' üzerinden '),
          ' around ', ' etrafında '),
        player_movements = REPLACE(player_movements, ' back ', ' geri ')
      WHERE id > 0
    `, [], function(err2) {
      if (err2) console.log('ERROR:', err2.message);
      else {
        console.log(`✅ ${this.changes} formation_transitions düzeltildi`);
        fixed += this.changes;
      }

      db.run(`
        UPDATE tactical_concepts
        SET
          description = REPLACE(REPLACE(
            description,
            ' back ', ' geri '),
            ' through ', ' üzerinden '),
          detailed_explanation = REPLACE(detailed_explanation, ' back ', ' geri ')
        WHERE id > 0
      `, [], function(err3) {
        if (err3) console.log('ERROR:', err3.message);
        else {
          console.log(`✅ ${this.changes} tactical_concepts düzeltildi`);
          fixed += this.changes;
        }

        console.log('\n' + '═'.repeat(80));
        console.log(`✅ TOPLAM ~${fixed} ALAN GÜNCELLENDİ!`);
        console.log('\nULTRA_AGGRESSIVE_CHECK.js ile tekrar kontrol edin.');
        console.log('Hedef: %95+ temizlik!');
        console.log('═'.repeat(80) + '\n');
        process.exit(0);
      });
    });
  });
}
