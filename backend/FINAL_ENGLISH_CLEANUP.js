const db = require('./ultra_database');

console.log('=== SON INGILIZCE TEMIZLIGI ===\n');

db.all('SELECT * FROM system_weaknesses ORDER BY id', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  let processed = 0;
  let updated = 0;

  rows.forEach(row => {
    let desc = row.weakness_description || '';
    let exploit = row.how_to_exploit || '';
    let originalDesc = desc;
    let originalExploit = exploit;

    // TAMAMEN INGILIZCE KALAN CUMLELER
    exploit = exploit.replace(/Long balls to Hedef adam/gi, 'Hedef adama uzun toplar');
    exploit = exploit.replace(/bypassing baskıyı entirely/gi, 'baskıyı tamamen atlayarak');
    exploit = exploit.replace(/baskıyı tamamen atlayarak, YA DA/gi, 'baskıyı tamamen atlayarak, YA DA');
    exploit = exploit.replace(/Teknik kalite ile baskıdan geçmeyı ile/gi, 'Teknik kalite ile baskıdan geçme');
    exploit = exploit.replace(/geçmeyı/gi, 'geçme');

    // DESC alani
    desc = desc.replace(/ in kanat alanları/gi, ' kanat alanlarında');
    desc = desc.replace(/savunmasız olabilir in/gi, 'savunmasız olabilir');
    desc = desc.replace(/can be savunmasız/gi, 'savunmasız olabilir');
    desc = desc.replace(/using /gi, '');

    // Baska karisik ifadeler
    exploit = exploit.replace(/to beat/gi, 'atlatmak için');
    exploit = exploit.replace(/vs /gi, 'karşı ');
    exploit = exploit.replace(/creating /gi, 'yaratarak');
    exploit = exploit.replace(/with /gi, 'ile ');

    // "either" ve "or" kaliplari
    exploit = exploit.replace(/Ya: \(1\)/gi, 'Ya (1)');
    exploit = exploit.replace(/YA DA \(2\)/gi, 'ya da (2)');

    // Son temizlik
    desc = desc.replace(/\s+/g, ' ').trim();
    exploit = exploit.replace(/\s+/g, ' ').trim();

    if (desc !== originalDesc || exploit !== originalExploit) {
      db.run(
        `UPDATE system_weaknesses
         SET weakness_description = ?,
             how_to_exploit = ?
         WHERE id = ?`,
        [desc, exploit, row.id],
        function(err) {
          if (err) {
            console.log(`  ERROR [${row.id}]:`, err.message);
          } else if (this.changes > 0) {
            updated++;
            if (updated % 10 === 0) {
              console.log(`  ${updated} kayıt güncellendi...`);
            }
          }

          processed++;
          if (processed === rows.length) {
            console.log(`\n✅ TOPLAM: ${updated}/${rows.length} weakness temizlendi\n`);
            cleanOtherTables();
          }
        }
      );
    } else {
      processed++;
      if (processed === rows.length) {
        console.log(`\n✅ TOPLAM: ${updated}/${rows.length} weakness temizlendi\n`);
        cleanOtherTables();
      }
    }
  });
});

function cleanOtherTables() {
  console.log('Diger tablolardaki kalan Ingilizce ifadeleri temizliyorum...\n');

  // POSSESSION TACTICS'deki "buildup" gibi terimler
  db.run(`
    UPDATE possession_tactics
    SET
      progression_patterns = REPLACE(progression_patterns, 'buildup', 'oyun kurma'),
      circulation_patterns = REPLACE(circulation_patterns, 'vs ', 'karşı ')
    WHERE progression_patterns LIKE '%buildup%' OR circulation_patterns LIKE '%vs %'
  `, [], function(err) {
    if (err) console.log('Possession error:', err.message);
    else console.log(`✅ Possession tactics: ${this.changes} kayıt temizlendi`);

    // PRESSING TRAP ZONES
    db.run(`
      UPDATE pressing_trap_zones
      SET
        trap_execution = REPLACE(REPLACE(REPLACE(
          trap_execution,
          'vs ', 'karşı '),
          'with ', 'ile '),
          'creating ', 'yaratarak ')
      WHERE trap_execution LIKE '%vs %' OR trap_execution LIKE '%with %' OR trap_execution LIKE '%creating %'
    `, [], function(err) {
      if (err) console.log('Pressing error:', err.message);
      else console.log(`✅ Pressing zones: ${this.changes} kayıt temizlendi`);

      // NON-POSSESSION TACTICS
      db.run(`
        UPDATE non_possession_tactics
        SET
          defensive_philosophy = REPLACE(defensive_philosophy, 'vs ', 'karşı '),
          pressing_philosophy = REPLACE(pressing_philosophy, 'vs ', 'karşı ')
        WHERE defensive_philosophy LIKE '%vs %' OR pressing_philosophy LIKE '%vs %'
      `, [], function(err) {
        if (err) console.log('Non-possession error:', err.message);
        else console.log(`✅ Non-possession tactics: ${this.changes} kayıt temizlendi`);

        console.log('\n=== ✅ SON INGILIZCE TEMIZLIGI TAMAMLANDI! ===\n');
        process.exit(0);
      });
    });
  });
}
