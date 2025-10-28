const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('SON KALAN SORUNLARI DÜZELTİYORUZ - %99.5+ HEDEF');
console.log('═'.repeat(80) + '\n');

let totalFixed = 0;

// 1. "yarı-back" ve "kanat-back" düzeltmeleri
console.log('[1/4] non_possession_tactics düzeltiliyor...\n');

db.all('SELECT * FROM non_possession_tactics WHERE id IN (25, 55)', [], (err, rows) => {
  if (err || !rows) {
    fixPossessionTactics();
    return;
  }

  let processed = 0;
  rows.forEach(row => {
    const fixed = row.pressing_philosophy.replace(/yarı-back/g, 'yarı bek');

    db.run(
      'UPDATE non_possession_tactics SET pressing_philosophy=? WHERE id=?',
      [fixed, row.id],
      (err2) => {
        if (!err2) {
          totalFixed++;
          console.log(`✅ non_possession_tactics #${row.id} güncellendi`);
        }
        processed++;
        if (processed === rows.length) {
          fixPossessionTactics();
        }
      }
    );
  });
});

function fixPossessionTactics() {
  console.log('\n[2/4] possession_tactics düzeltiliyor...\n');

  db.get('SELECT * FROM possession_tactics WHERE id=39', [], (err, row) => {
    if (err || !row) {
      fixSystemWeaknesses();
      return;
    }

    const fixed = row.progression_patterns.replace(/yarı-back/g, 'yarı bek');

    db.run(
      'UPDATE possession_tactics SET progression_patterns=? WHERE id=39',
      [fixed],
      (err2) => {
        if (!err2) {
          totalFixed++;
          console.log(`✅ possession_tactics #39 güncellendi`);
        }
        fixSystemWeaknesses();
      }
    );
  });
}

function fixSystemWeaknesses() {
  console.log('\n[3/4] system_weaknesses düzeltiliyor...\n');

  db.get('SELECT * FROM system_weaknesses WHERE id=7', [], (err, row) => {
    if (err || !row) {
      fixPlayerRoleAndCounter();
      return;
    }

    const fixed = row.weakness_description.replace(/kanat-back/g, 'kanat bek');

    db.run(
      'UPDATE system_weaknesses SET weakness_description=? WHERE id=7',
      [fixed],
      (err2) => {
        if (!err2) {
          totalFixed++;
          console.log(`✅ system_weaknesses #7 güncellendi`);
        }
        fixPlayerRoleAndCounter();
      }
    );
  });
}

function fixPlayerRoleAndCounter() {
  console.log('\n[4/4] player_roles ve counter_tactics düzeltiliyor...\n');

  const fixes = [
    {
      table: 'player_roles',
      id: 45,
      field: 'tactical_purpose',
      value: 'Oyunu bağla. Derine düş. Alan yarat. Pas ve gol.'
    },
    {
      table: 'counter_tactics',
      id: 9,
      field: 'detailed_strategy',
      value: 'Forvette sabırlı kısa paslarla baskıyı çek. Baskı taahhüt ettiğinde, teknik kalite ile içeriden oyna. Son üçlüde hız.'
    }
  ];

  let processed = 0;
  fixes.forEach(fix => {
    db.run(
      `UPDATE ${fix.table} SET ${fix.field}=? WHERE id=?`,
      [fix.value, fix.id],
      (err) => {
        if (!err) {
          totalFixed++;
          console.log(`✅ ${fix.table} #${fix.id} güncellendi`);
        }
        processed++;
        if (processed === fixes.length) {
          finish();
        }
      }
    );
  });
}

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${totalFixed} KAYIT GÜNCELLENDİ!`);
  console.log('\nDETAILED_QUALITY_CHECK.js ile final kontrol yapın.');
  console.log('Hedef: %99.5+ temizlik!');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
