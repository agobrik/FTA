const db = require('./ultra_database');

console.log('=== BÜYÜK/KÜÇÜK HARF KORUYAN TÜRKÇE ÇEVİRİ ===\n');

// Case-sensitive çeviri fonksiyonu
function smartTranslate(text) {
  if (!text) return text;

  // Her kelimeyi ayrı ayrı çevir, büyük/küçük harf koru
  const replacements = [
    // Tam kelime eşleşmeleri (kelime sınırlarıyla)
    { pattern: /\blong balls\b/gi, turkish: 'uzun toplar' },
    { pattern: /\bdirect balls\b/gi, turkish: 'direkt toplar' },
    { pattern: /\bhigh press\b/gi, turkish: 'yüksek baskı' },
    { pattern: /\blow block\b/gi, turkish: 'alçak blok' },
    { pattern: /\bhigh line\b/gi, turkish: 'yüksek hat' },
    { pattern: /\btarget man\b/gi, turkish: 'hedef adam' },
    { pattern: /\bwing-back\b/gi, turkish: 'kanat bek' },
    { pattern: /\bwing back\b/gi, turkish: 'kanat bek' },
    { pattern: /\boffside trap\b/gi, turkish: 'ofsayt tuzağı' },
    { pattern: /\bcounter-attack\b/gi, turkish: 'kontra atak' },
    { pattern: /\bcounter press\b/gi, turkish: 'karşı baskı' },
    { pattern: /\bgegenpress\b/gi, turkish: 'karşı baskı' },
    { pattern: /\bpassing lanes\b/gi, turkish: 'pas yolları' },

    // Tekli kelimeler
    { pattern: /\brepeatedly\b/gi, turkish: 'tekrar tekrar' },
    { pattern: /\bmake\b/gi, turkish: 'yap' },
    { pattern: /\btime\b/gi, turkish: 'zamanla' },
    { pattern: /\bbeat\b/gi, turkish: 'atla' },
    { pattern: /\boffside\b/gi, turkish: 'ofsayt' },
    { pattern: /\bvery\b/gi, turkish: 'çok' },
    { pattern: /\bsuccess rate\b/gi, turkish: 'başarı oranı' },
    { pattern: /\bconstant\b/gi, turkish: 'sürekli' },
    { pattern: /\bmirror\b/gi, turkish: 'yansıt' },
    { pattern: /\bapproach\b/gi, turkish: 'yaklaşım' },
    { pattern: /\bstruggle\b/gi, turkish: 'zorlan' },
    { pattern: /\bstruggles\b/gi, turkish: 'zorlanır' },
    { pattern: /\bstruggled\b/gi, turkish: 'zorlandı' },
    { pattern: /\bwhen\b/gi, turkish: 'zaman' },
    { pattern: /\bforced\b/gi, turkish: 'zorlandı' },
    { pattern: /\bdeep block\b/gi, turkish: 'derin blok' },
    { pattern: /\babout\b/gi, turkish: 'hakkında' },
    { pattern: /\bthis\b/gi, turkish: 'bu' },
    { pattern: /\bsystem\b/gi, turkish: 'sistem' },
    { pattern: /\bexploit\b/gi, turkish: 'istismar et' },
    { pattern: /\bexploiting\b/gi, turkish: 'istismar etme' },
    { pattern: /\bexploited\b/gi, turkish: 'istismar edildi' },

    // Sık geçen fiiller
    { pattern: /\bplay\b/gi, turkish: 'oyna' },
    { pattern: /\bplays\b/gi, turkish: 'oynar' },
    { pattern: /\bplayed\b/gi, turkish: 'oynadı' },
    { pattern: /\bplaying\b/gi, turkish: 'oynama' },
    { pattern: /\battack\b/gi, turkish: 'hücum et' },
    { pattern: /\battacking\b/gi, turkish: 'hücum' },
    { pattern: /\bdefend\b/gi, turkish: 'savun' },
    { pattern: /\bdefending\b/gi, turkish: 'savunma' },

    // "the", "and", "with" vb.
    { pattern: /\bthe\s+/gi, turkish: '' },
    { pattern: /\s+the\b/gi, turkish: '' },
    { pattern: /\band\b/gi, turkish: 've' },
    { pattern: /\bwith\b/gi, turkish: 'ile' },
    { pattern: /\bor\b/gi, turkish: 'veya' },
    { pattern: /\bto\b/gi, turkish: '' }, // genellikle gereksiz
    { pattern: /\bin\b/gi, turkish: '' },
    { pattern: /\bat\b/gi, turkish: '' },
  ];

  let result = text;

  replacements.forEach(({ pattern, turkish }) => {
    result = result.replace(pattern, turkish);
  });

  // Çoklu boşlukları temizle
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

let totalUpdated = 0;

console.log('1. System Weaknesses düzeltiliyor...');

db.all('SELECT * FROM system_weaknesses ORDER BY id', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  let processed = 0;
  let updated = 0;

  rows.forEach(row => {
    const type = smartTranslate(row.weakness_type);
    const desc = smartTranslate(row.weakness_description);
    const exploit = smartTranslate(row.how_to_exploit);

    db.run(
      `UPDATE system_weaknesses
       SET weakness_type = ?,
           weakness_description = ?,
           how_to_exploit = ?
       WHERE id = ?`,
      [type, desc, exploit, row.id],
      function(updateErr) {
        if (!updateErr && this.changes > 0) {
          updated++;
          totalUpdated++;
        }
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${updated}/${rows.length} weakness düzeltildi`);
          fixCounterTactics();
        }
      }
    );
  });
});

function fixCounterTactics() {
  console.log('\n2. Counter Tactics düzeltiliyor...');

  db.all('SELECT * FROM counter_tactics ORDER BY id', [], (err, rows) => {
    if (err) {
      fixTacticalSystems();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const name = smartTranslate(row.counter_name);
      const strategy = smartTranslate(row.detailed_strategy);
      const when = smartTranslate(row.when_to_apply);

      db.run(
        `UPDATE counter_tactics
         SET counter_name = ?,
             detailed_strategy = ?,
             when_to_apply = ?
         WHERE id = ?`,
        [name, strategy, when, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} counter tactic düzeltildi`);
            fixTacticalSystems();
          }
        }
      );
    });
  });
}

function fixTacticalSystems() {
  console.log('\n3. Tactical Systems düzeltiliyor...');

  db.all('SELECT * FROM tactical_systems ORDER BY id', [], (err, rows) => {
    if (err) {
      fixPressingZones();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const in_poss = smartTranslate(row.in_possession_shape);
      const out_poss = smartTranslate(row.out_of_possession_shape);

      db.run(
        `UPDATE tactical_systems
         SET in_possession_shape = ?,
             out_of_possession_shape = ?
         WHERE id = ?`,
        [in_poss, out_poss, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} tactical system düzeltildi`);
            fixPressingZones();
          }
        }
      );
    });
  });
}

function fixPressingZones() {
  console.log('\n4. Pressing Trap Zones düzeltiliyor...');

  db.all('SELECT * FROM pressing_trap_zones ORDER BY id', [], (err, rows) => {
    if (err) {
      fixPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const exec = smartTranslate(row.trap_execution);

      db.run(
        `UPDATE pressing_trap_zones
         SET trap_execution = ?
         WHERE id = ?`,
        [exec, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} pressing zone düzeltildi`);
            fixPossessionTactics();
          }
        }
      );
    });
  });
}

function fixPossessionTactics() {
  console.log('\n5. Possession Tactics düzeltiliyor...');

  db.all('SELECT * FROM possession_tactics ORDER BY id', [], (err, rows) => {
    if (err) {
      fixNonPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const circ = smartTranslate(row.circulation_patterns);
      const prog = smartTranslate(row.progression_patterns);

      db.run(
        `UPDATE possession_tactics
         SET circulation_patterns = ?,
             progression_patterns = ?
         WHERE id = ?`,
        [circ, prog, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} possession tactic düzeltildi`);
            fixNonPossessionTactics();
          }
        }
      );
    });
  });
}

function fixNonPossessionTactics() {
  console.log('\n6. Non-Possession Tactics düzeltiliyor...');

  db.all('SELECT * FROM non_possession_tactics ORDER BY id', [], (err, rows) => {
    if (err) {
      finishUp();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const def = smartTranslate(row.defensive_philosophy);
      const press = smartTranslate(row.pressing_philosophy);

      db.run(
        `UPDATE non_possession_tactics
         SET defensive_philosophy = ?,
             pressing_philosophy = ?
         WHERE id = ?`,
        [def, press, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} non-possession tactic düzeltildi`);
            finishUp();
          }
        }
      );
    });
  });
}

function finishUp() {
  console.log('\n' + '═'.repeat(70));
  console.log(`\n✅ TOPLAM ${totalUpdated} KAYIT DÜZGÜN ŞEKİLDE DÜZELTİLDİ!\n`);
  console.log('Büyük/küçük harf korundu, sadece İngilizce kelimeler çevrildi.\n');
  console.log('═'.repeat(70) + '\n');
  process.exit(0);
}
