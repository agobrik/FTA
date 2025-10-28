const db = require('./ultra_database');

console.log('=== FUTBOL TERİMLERİNİ VE ÖZEL İSİMLERİ DÜZELT ===\n');

// Futbol terimleri ve özel isimler - BUNLAR DEĞİŞMEMELİ
const properTerms = [
  // Sistem isimleri
  { wrong: 'guardiola sahiplik', correct: 'Guardiola Possession' },
  { wrong: 'guardiola possession', correct: 'Guardiola Possession' },
  { wrong: 'klopp gegenbaskı', correct: 'Klopp Gegenpressing' },
  { wrong: 'klopp gegenpressing', correct: 'Klopp Gegenpressing' },
  { wrong: 'conte wing-back', correct: 'Conte Wing-Back' },
  { wrong: 'mourinho defensive', correct: 'Mourinho Defensive' },
  { wrong: 'mourinho bus', correct: 'Mourinho Bus' },
  { wrong: 'ancelotti balanced', correct: 'Ancelotti Balanced' },
  { wrong: 'arteta inverted', correct: 'Arteta Inverted' },

  // Futbol terimleri
  { wrong: 'gegenbaskı', correct: 'Gegenpressing' },
  { wrong: 'gegenpress', correct: 'Gegenpressing' },
  { wrong: 'wing-back', correct: 'wing-back' },
  { wrong: 'kanat-back', correct: 'wing-back' },

  // Yaygın bozuk terimler
  { wrong: 'sahiplik', correct: 'Possession' }, // Sistem isimlerinde
  { wrong: 'defansif', correct: 'Defensive' }, // Sistem isimlerinde
];

let totalUpdated = 0;

console.log('1. System Weaknesses - özel isimler düzeltiliyor...\n');

db.all('SELECT * FROM system_weaknesses', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  let processed = 0;
  let updated = 0;

  rows.forEach(row => {
    let desc = row.weakness_description || '';
    let exploit = row.how_to_exploit || '';
    let type = row.weakness_type || '';

    // Özel isimleri düzelt
    desc = desc.replace(/4-2-3-1 guardiola sahiplik/gi, '4-2-3-1 Guardiola Possession');
    desc = desc.replace(/4-3-3 klopp gegenbaskı/gi, '4-3-3 Klopp Gegenpressing');
    desc = desc.replace(/3-5-2 conte wing-back/gi, '3-5-2 Conte Wing-Back');
    desc = desc.replace(/4-2-3-1 mourinho defensive/gi, '4-2-3-1 Mourinho Defensive');
    desc = desc.replace(/5-3-2 mourinho bus/gi, '5-3-2 Mourinho Bus');
    desc = desc.replace(/4-3-3 ancelotti balanced/gi, '4-3-3 Ancelotti Balanced');

    exploit = exploit.replace(/guardiola/gi, 'Guardiola');
    exploit = exploit.replace(/mourinho/gi, 'Mourinho');
    exploit = exploit.replace(/klopp/gi, 'Klopp');
    exploit = exploit.replace(/conte/gi, 'Conte');

    db.run(
      `UPDATE system_weaknesses
       SET weakness_type = ?,
           weakness_description = ?,
           how_to_exploit = ?
       WHERE id = ?`,
      [type, desc, exploit, row.id],
      function(err) {
        if (!err && this.changes > 0) {
          updated++;
          totalUpdated++;
        }
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${updated}/${rows.length} weakness güncellendi`);
          fixTacticalSystems();
        }
      }
    );
  });
});

function fixTacticalSystems() {
  console.log('\n2. Tactical Systems - açıklamalardaki terimler düzeltiliyor...\n');

  db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
    if (err) {
      fixPressingZones();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let in_poss = row.in_possession_shape || '';
      let out_poss = row.out_of_possession_shape || '';

      // "wing-back" terimini koru
      in_poss = in_poss.replace(/kanat-back/gi, 'wing-back');
      out_poss = out_poss.replace(/kanat-back/gi, 'wing-back');

      db.run(
        `UPDATE tactical_systems
         SET in_possession_shape = ?,
             out_of_possession_shape = ?
         WHERE id = ?`,
        [in_poss, out_poss, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} tactical system güncellendi`);
            fixPressingZones();
          }
        }
      );
    });
  });
}

function fixPressingZones() {
  console.log('\n3. Pressing Trap Zones - terimler düzeltiliyor...\n');

  db.all('SELECT * FROM pressing_trap_zones', [], (err, rows) => {
    if (err) {
      fixPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let name = row.trap_name || '';
      let exec = row.trap_execution || '';

      // Gereksiz lowercase düzeltmeleri
      name = name.replace(/\bi̇çi\b/gi, 'İçi');
      name = name.replace(/\biçi\b/gi, 'İçi');

      db.run(
        `UPDATE pressing_trap_zones
         SET trap_name = ?,
             trap_execution = ?
         WHERE id = ?`,
        [name, exec, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} pressing zone güncellendi`);
            fixPossessionTactics();
          }
        }
      );
    });
  });
}

function fixPossessionTactics() {
  console.log('\n4. Possession Tactics - terimler düzeltiliyor...\n');

  db.all('SELECT * FROM possession_tactics', [], (err, rows) => {
    if (err) {
      fixNonPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let circ = row.circulation_patterns || '';
      let prog = row.progression_patterns || '';

      // "kanat" yerine bazen yanlış yazılmış "wing" düzeltmeleri
      // Ama "wing-back" terimi korunmalı

      db.run(
        `UPDATE possession_tactics
         SET circulation_patterns = ?,
             progression_patterns = ?
         WHERE id = ?`,
        [circ, prog, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} possession tactic güncellendi`);
            fixNonPossessionTactics();
          }
        }
      );
    });
  });
}

function fixNonPossessionTactics() {
  console.log('\n5. Non-Possession Tactics - terimler düzeltiliyor...\n');

  db.all('SELECT * FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      fixCounterTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let def = row.defensive_philosophy || '';
      let press = row.pressing_philosophy || '';

      // Büyük harf düzeltmeleri
      def = def.replace(/\bagresif\b/gi, 'Agresif');
      def = def.replace(/\bkompakt\b/gi, 'Kompakt');
      press = press.replace(/\byoğun\b/gi, 'Yoğun');

      db.run(
        `UPDATE non_possession_tactics
         SET defensive_philosophy = ?,
             pressing_philosophy = ?
         WHERE id = ?`,
        [def, press, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} non-possession tactic güncellendi`);
            fixCounterTactics();
          }
        }
      );
    });
  });
}

function fixCounterTactics() {
  console.log('\n6. Counter Tactics - son kontroller...\n');

  db.all('SELECT * FROM counter_tactics', [], (err, rows) => {
    if (err) {
      finishUp();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let name = row.counter_name || '';
      let strategy = row.detailed_strategy || '';

      // Özel isim düzeltmeleri
      name = name.replace(/\barkaya toplar\b/gi, 'Arkaya Toplar');
      name = name.replace(/\başırı hız\b/gi, 'Aşırı Hız');

      db.run(
        `UPDATE counter_tactics
         SET counter_name = ?,
             detailed_strategy = ?
         WHERE id = ?`,
        [name, strategy, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} counter tactic güncellendi`);
            finishUp();
          }
        }
      );
    });
  });
}

function finishUp() {
  console.log('\n' + '═'.repeat(70));
  console.log(`\n✅ TOPLAM ${totalUpdated} KAYIT DÜZELTİLDİ!\n`);
  console.log('Futbol terimleri ve özel isimler orijinal hallerine getirildi.\n');
  console.log('═'.repeat(70) + '\n');
  process.exit(0);
}
