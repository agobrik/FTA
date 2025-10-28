const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('SON 81 SORUNU AKILLI DÜZELTelse - %97+ HEDEFİ');
console.log('═'.repeat(80) + '\n');

let totalFixed = 0;

// Akıllı çeviri fonksiyonu
function smartTranslate(text) {
  if (!text) return text;

  // 1. "back" düzeltmeleri (wing-back hariç)
  // "three back", "two back", "Üçüncü back", "İki back" → "bek"
  text = text.replace(/\bthree back\b/gi, 'üç bek');
  text = text.replace(/\btwo back\b/gi, 'iki bek');
  text = text.replace(/\bÜçüncü back\b/g, 'Üçüncü bek');
  text = text.replace(/\bİki back\b/g, 'İki bek');
  text = text.replace(/\bDört back\b/g, 'Dört bek');
  text = text.replace(/\bBeş back\b/g, 'Beş bek');

  // 2. "and" → "ve" (ama "and the" gibi kalıplar önce)
  text = text.replace(/\band the\b/gi, 've');
  text = text.replace(/\bspeed and power\b/gi, 'hız ve güç');
  text = text.replace(/\bgoals and assists\b/gi, 'gol ve asist');
  text = text.replace(/\, and\b/gi, ', ve');

  // 3. "the" temizliği (Parking the Bus hariç)
  if (!text.includes('Parking the Bus')) {
    text = text.replace(/\bthe \b/gi, '');
  }

  // 4. "counter" düzeltmeleri (counter-attack, counter-press hariç)
  // Önce korumalıları işaretle
  text = text.replace(/counter-attack/gi, '§COUNTERATTACK§');
  text = text.replace(/counter-press/gi, '§COUNTERPRESS§');
  // Şimdi tek "counter" düzelt
  text = text.replace(/\bcounter\b/gi, 'karşı');
  // İşaretlileri geri getir
  text = text.replace(/§COUNTERATTACK§/gi, 'counter-attack');
  text = text.replace(/§COUNTERPRESS§/gi, 'counter-press');

  // 5. "box" düzeltmeleri (box-to-box hariç)
  text = text.replace(/box-to-box/gi, '§BOXTOBOX§');
  text = text.replace(/\bbox\b/gi, 'kutu');
  text = text.replace(/§BOXTOBOX§/gi, 'box-to-box');

  // 6. "high", "low", "deep" düzeltmeleri (eğer tek başına değilse)
  text = text.replace(/\bhigh line\b/gi, 'yüksek hat');
  text = text.replace(/\blow block\b/gi, 'alçak blok');
  text = text.replace(/\bdeep runs\b/gi, 'derin koşular');
  text = text.replace(/\bhigh press\b/gi, 'yüksek baskı');

  // 7. "third" → "üçlü bölge"
  text = text.replace(/\bthird-man\b/gi, 'üçüncü adam');
  text = text.replace(/\bfinal third\b/gi, 'son üçlü');
  text = text.replace(/\bdefensive third\b/gi, 'savunma üçlüsü');

  // 8. "buildup" → "oyun kurma"
  text = text.replace(/\bbuildup\b/gi, 'oyun kurma');
  text = text.replace(/\bbuild-up\b/gi, 'oyun kurma');

  // 9. "into" → "içine"
  text = text.replace(/\bdrop into\b/gi, 'düşer');
  text = text.replace(/\bmove into\b/gi, 'hareket eder');
  text = text.replace(/\brun into\b/gi, 'koşar');

  // 10. "wide", "narrow" düzeltmeleri
  text = text.replace(/\bstay wide\b/gi, 'geniş kal');
  text = text.replace(/\bvery narrow\b/gi, 'çok dar');

  // 11. "space" düzeltmeleri
  text = text.replace(/\bhalf-space\b/gi, 'yarı alan');
  text = text.replace(/\bhalf space\b/gi, 'yarı alan');
  text = text.replace(/\bHalf-space\b/g, 'Yarı alan');
  text = text.replace(/\bHalf-alan\b/g, 'Yarı alan');

  // 12. "between", "around", "when" gibi edatlar
  text = text.replace(/\bbetween lines\b/gi, 'hatlar arası');
  text = text.replace(/\baround the\b/gi, 'etrafında');
  text = text.replace(/\bwhen in possession\b/gi, 'sahipken');

  // 13. "target" → "hedef"
  text = text.replace(/\btarget man\b/gi, 'hedef adam');
  text = text.replace(/\btarget forward\b/gi, 'hedef forvet');

  return text;
}

console.log('[1/7] tactical_systems akıllı düzeltme...\n');

db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process2();
    return;
  }

  let processed = 0;
  rows.forEach(row => {
    db.run(
      `UPDATE tactical_systems SET
         philosophy=?,
         key_principles=?,
         strengths=?,
         weaknesses=?,
         build_up_play=?,
         passing_style=?,
         defensive_approach=?,
         attacking_approach=?
       WHERE id=?`,
      [
        smartTranslate(row.philosophy),
        smartTranslate(row.key_principles),
        smartTranslate(row.strengths),
        smartTranslate(row.weaknesses),
        smartTranslate(row.build_up_play),
        smartTranslate(row.passing_style),
        smartTranslate(row.defensive_approach),
        smartTranslate(row.attacking_approach),
        row.id
      ],
      (err2) => {
        if (!err2) totalFixed++;
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${totalFixed} tactical_systems güncellendi`);
          process2();
        }
      }
    );
  });
});

function process2() {
  console.log('[2/7] player_roles akıllı düzeltme...\n');

  db.all('SELECT * FROM player_roles', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process3();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      db.run(
        `UPDATE player_roles SET
           description=?,
           detailed_explanation=?,
           tactical_purpose=?,
           movement_pattern=?,
           positioning=?,
           primary_duties=?,
           secondary_duties=?,
           attacking_duties=?,
           ideal_player_traits=?
         WHERE id=?`,
        [
          smartTranslate(row.description),
          smartTranslate(row.detailed_explanation),
          smartTranslate(row.tactical_purpose),
          smartTranslate(row.movement_pattern),
          smartTranslate(row.positioning),
          smartTranslate(row.primary_duties),
          smartTranslate(row.secondary_duties),
          smartTranslate(row.attacking_duties),
          smartTranslate(row.ideal_player_traits),
          row.id
        ],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (player_roles dahil)`);
            process3();
          }
        }
      );
    });
  });
}

function process3() {
  console.log('[3/7] non_possession_tactics akıllı düzeltme...\n');

  db.all('SELECT * FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process4();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      db.run(
        `UPDATE non_possession_tactics SET
           defensive_philosophy=?,
           pressing_philosophy=?,
           how_to_press=?,
           where_to_press=?,
           when_to_press=?
         WHERE id=?`,
        [
          smartTranslate(row.defensive_philosophy),
          smartTranslate(row.pressing_philosophy),
          smartTranslate(row.how_to_press),
          smartTranslate(row.where_to_press),
          smartTranslate(row.when_to_press),
          row.id
        ],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (non_possession dahil)`);
            process4();
          }
        }
      );
    });
  });
}

function process4() {
  console.log('[4/7] possession_tactics akıllı düzeltme...\n');

  db.all('SELECT * FROM possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process5();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      db.run(
        `UPDATE possession_tactics SET
           progression_patterns=?,
           passing_principles=?,
           movement_principles=?,
           spacing_principles=?
         WHERE id=?`,
        [
          smartTranslate(row.progression_patterns),
          smartTranslate(row.passing_principles),
          smartTranslate(row.movement_principles),
          smartTranslate(row.spacing_principles),
          row.id
        ],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (possession dahil)`);
            process5();
          }
        }
      );
    });
  });
}

function process5() {
  console.log('[5/7] system_weaknesses akıllı düzeltme...\n');

  db.all('SELECT * FROM system_weaknesses', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process6();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      db.run(
        `UPDATE system_weaknesses SET
           weakness_description=?,
           how_to_exploit=?
         WHERE id=?`,
        [
          smartTranslate(row.weakness_description),
          smartTranslate(row.how_to_exploit),
          row.id
        ],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (weaknesses dahil)`);
            process6();
          }
        }
      );
    });
  });
}

function process6() {
  console.log('[6/7] pressing_trap_zones akıllı düzeltme...\n');

  db.all('SELECT * FROM pressing_trap_zones', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process7();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      db.run(
        `UPDATE pressing_trap_zones SET
           trap_execution=?,
           trap_setup=?
         WHERE id=?`,
        [
          smartTranslate(row.trap_execution),
          smartTranslate(row.trap_setup),
          row.id
        ],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (pressing zones dahil)`);
            process7();
          }
        }
      );
    });
  });
}

function process7() {
  console.log('[7/7] counter_tactics akıllı düzeltme...\n');

  db.all('SELECT * FROM counter_tactics', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      finish();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      db.run(
        `UPDATE counter_tactics SET
           detailed_strategy=?,
           key_adjustments=?
         WHERE id=?`,
        [
          smartTranslate(row.detailed_strategy),
          smartTranslate(row.key_adjustments),
          row.id
        ],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (counter dahil)`);
            finish();
          }
        }
      );
    });
  });
}

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${totalFixed} KAYIT GÜNCELLENDİ!`);
  console.log('\nDETAILED_QUALITY_CHECK.js ile son kontrol yapın.');
  console.log('Hedef: %97+ temizlik!');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
