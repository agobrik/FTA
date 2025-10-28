const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('KALAN 135 SORUNU DÜZELTİYORUZ - GERÇEKÇİ YAKLAŞIM');
console.log('═'.repeat(80) + '\n');

// Tüm tabloları okuyup JS ile düzeltelim
let totalFixed = 0;

const translations = [
  // Önce kesin çeviriler
  { from: /\bpressing\b/gi, to: 'baskı', except: ['Gegenpressing', 'gegenpressing', 'pressing trap', 'pressing zone'] },
  { from: /\bVertical\b/g, to: 'Dikey', except: [] },
  { from: /\bvertical\b/g, to: 'dikey', except: [] },
  { from: /\bhorizontal\b/gi, to: 'yatay', except: [] },
  { from: /\btwo backs\b/gi, to: 'iki bek', except: [] },
  { from: /\bthree backs\b/gi, to: 'üç bek', except: [] },
  { from: /\bfour backs\b/gi, to: 'dört bek', except: [] },
  { from: /\bwith two\b/gi, to: 'iki', except: [] },
  { from: /\bwith three\b/gi, to: 'üç', except: [] },
  { from: /\band the\b/gi, to: 've', except: [] },
  { from: /\b, and\b/gi, to: ', ve', except: [] },
  { from: /\bcounter-attack\b/gi, to: 'karşı atak', except: [] },
  { from: /\btarget man\b/gi, to: 'hedef adam', except: [] },
  { from: /\baggressive\b/gi, to: 'agresif', except: [] },
  { from: /\bcentral\b/gi, to: 'merkezi', except: [] },
  { from: /\bbehind\b/gi, to: 'arkasında', except: [] },
  { from: /\bquick\b/gi, to: 'hızlı', except: [] }
];

function translateText(text, exceptions = []) {
  if (!text) return text;

  translations.forEach(rule => {
    // Exception kontrolü
    let hasException = false;
    [...rule.except, ...exceptions].forEach(ex => {
      if (text.includes(ex)) hasException = true;
    });

    if (!hasException) {
      text = text.replace(rule.from, rule.to);
    }
  });

  return text;
}

console.log('[1/7] tactical_systems işleniyor...\n');

db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process2();
    return;
  }

  let processed = 0;
  rows.forEach(row => {
    const exceptions = ['Gegenpressing', 'Wing-Back', 'Parking the Bus'];

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
        translateText(row.philosophy, exceptions),
        translateText(row.key_principles, exceptions),
        translateText(row.strengths, exceptions),
        translateText(row.weaknesses, exceptions),
        translateText(row.build_up_play, exceptions),
        translateText(row.passing_style, exceptions),
        translateText(row.defensive_approach, exceptions),
        translateText(row.attacking_approach, exceptions),
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
  console.log('[2/7] player_roles işleniyor...\n');

  db.all('SELECT * FROM player_roles', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process3();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const exceptions = ['Wing-Back', 'box-to-box'];

      db.run(
        `UPDATE player_roles SET
           description=?,
           detailed_explanation=?,
           tactical_purpose=?,
           movement_pattern=?,
           positioning=?,
           primary_duties=?,
           secondary_duties=?
         WHERE id=?`,
        [
          translateText(row.description, exceptions),
          translateText(row.detailed_explanation, exceptions),
          translateText(row.tactical_purpose, exceptions),
          translateText(row.movement_pattern, exceptions),
          translateText(row.positioning, exceptions),
          translateText(row.primary_duties, exceptions),
          translateText(row.secondary_duties, exceptions),
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
  console.log('[3/7] non_possession_tactics işleniyor...\n');

  db.all('SELECT * FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process4();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const exceptions = ['Gegenpressing', 'pressing trap', 'pressing zone'];

      db.run(
        `UPDATE non_possession_tactics SET
           defensive_philosophy=?,
           pressing_philosophy=?,
           how_to_press=?,
           where_to_press=?,
           when_to_press=?
         WHERE id=?`,
        [
          translateText(row.defensive_philosophy, exceptions),
          translateText(row.pressing_philosophy, exceptions),
          translateText(row.how_to_press, exceptions),
          translateText(row.where_to_press, exceptions),
          translateText(row.when_to_press, exceptions),
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
  console.log('[4/7] possession_tactics işleniyor...\n');

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
           movement_principles=?
         WHERE id=?`,
        [
          translateText(row.progression_patterns, []),
          translateText(row.passing_principles, []),
          translateText(row.movement_principles, []),
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
  console.log('[5/7] system_weaknesses işleniyor...\n');

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
          translateText(row.weakness_description, []),
          translateText(row.how_to_exploit, []),
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
  console.log('[6/7] pressing_trap_zones işleniyor...\n');

  db.all('SELECT * FROM pressing_trap_zones', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process7();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const exceptions = ['Gegenpressing', 'pressing trap'];

      db.run(
        `UPDATE pressing_trap_zones SET
           trap_execution=?,
           trap_setup=?
         WHERE id=?`,
        [
          translateText(row.trap_execution, exceptions),
          translateText(row.trap_setup, exceptions),
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
  console.log('[7/7] counter_tactics işleniyor...\n');

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
           detailed_strategy=?
         WHERE id=?`,
        [
          translateText(row.detailed_strategy, ['counter-attack', 'counter-press']),
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
  console.log('\nDETAILED_QUALITY_CHECK.js ile tekrar kontrol edin.');
  console.log('Hedef: %95+ temizlik!');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
