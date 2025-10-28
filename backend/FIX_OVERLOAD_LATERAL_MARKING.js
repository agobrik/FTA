const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('SON 69 SAF İNGİLİZCE KELİMEYİ DÜZELTİYORUZ');
console.log('overload (65), lateral (2), marking (2)');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

// FIX 1: "overload" → "aşırı yükleme" veya "yoğunlaştırma" bağlama göre
console.log('1/3: "overload" kelimesini düzeltiyoruz...\n');

db.run(`
  UPDATE possession_tactics
  SET
    overload_patterns = REPLACE(REPLACE(REPLACE(
      overload_patterns,
      'geniş overload', 'geniş aşırı yükleme'),
      'kanat overload', 'kanat aşırı yüklemesi'),
      'overload', 'aşırı yükleme'),
    passing_principles = REPLACE(REPLACE(
      passing_principles,
      'Overload ile', 'Aşırı yükleme ile'),
      'overload', 'aşırı yükleme'),
    movement_principles = REPLACE(movement_principles, 'overload', 'aşırı yükleme'),
    spacing_principles = REPLACE(spacing_principles, 'overload', 'aşırı yükleme'),
    timing_principles = REPLACE(timing_principles, 'overload', 'aşırı yükleme'),
    rotation_patterns = REPLACE(rotation_patterns, 'overload', 'aşırı yükleme'),
    progression_patterns = REPLACE(progression_patterns, 'overload', 'aşırı yükleme'),
    circulation_patterns = REPLACE(circulation_patterns, 'overload', 'aşırı yükleme')
  WHERE overload_patterns LIKE '%overload%'
     OR passing_principles LIKE '%overload%'
     OR movement_principles LIKE '%overload%'
     OR spacing_principles LIKE '%overload%'
     OR timing_principles LIKE '%overload%'
     OR rotation_patterns LIKE '%overload%'
     OR progression_patterns LIKE '%overload%'
     OR circulation_patterns LIKE '%overload%'
`, [], function(err1) {
  if (err1) console.log('ERROR:', err1.message);
  else {
    console.log(`✅ ${this.changes} possession tactic kaydı - "overload" düzeltildi`);
    fixed += this.changes;
  }

  // FIX 2: "lateral" → "yan" veya "yanal"
  console.log('\n2/3: "lateral" kelimesini düzeltiyoruz...\n');

  db.run(`
    UPDATE possession_tactics
    SET
      movement_principles = REPLACE(REPLACE(
        movement_principles,
        'Lateral hareketler', 'Yanal hareketler'),
        'lateral', 'yanal')
    WHERE movement_principles LIKE '%lateral%' OR movement_principles LIKE '%Lateral%'
  `, [], function(err2) {
    if (err2) console.log('ERROR:', err2.message);
    else {
      console.log(`✅ ${this.changes} possession tactic kaydı - "lateral" düzeltildi`);
      fixed += this.changes;
    }

    // FIX 3: "marking" → "markaj"
    console.log('\n3/3: "marking" kelimesini düzeltiyoruz...\n');

    db.run(`
      UPDATE non_possession_tactics
      SET
        how_to_press = REPLACE(REPLACE(
          how_to_press,
          'Adam adama marking', 'Adam adama markaj'),
          'marking', 'markaj')
      WHERE how_to_press LIKE '%marking%'
    `, [], function(err3) {
      if (err3) console.log('ERROR:', err3.message);
      else {
        console.log(`✅ ${this.changes} non-possession tactic kaydı - "marking" düzeltildi`);
        fixed += this.changes;
      }

      console.log('\n' + '═'.repeat(80));
      console.log(`✅ TOPLAM ${fixed} KAYIT DÜZELTİLDİ!`);
      console.log('\nŞimdi tekrar kontrol edelim...');
      console.log('═'.repeat(80) + '\n');
      process.exit(0);
    });
  });
});
