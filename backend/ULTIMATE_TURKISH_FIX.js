const db = require('./ultra_database');

console.log('=== ULTIMATE TURKISH FIX BAŞLIYOR ===\n');

// PHASE 1: SYSTEM WEAKNESSES - TAM DUZELTME
console.log('PHASE 1: System Weaknesses tamamen duzeltiliyor...\n');

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
    let approach = row.required_approach || '';
    let examples = row.examples || '';

    // FIX 1: Eksik Turkce karakterler
    [desc, exploit, approach, examples].forEach((field, idx) => {
      let text = field;
      text = text.replace(/karsi/gi, 'karşı');
      text = text.replace(/ozellikle/gi, 'özellikle');
      text = text.replace(/degisimleri/gi, 'değişimleri');
      text = text.replace(/degisimi/gi, 'değişimi');
      text = text.replace(/alanlari/gi, 'alanları');
      text = text.replace(/atlatilabilir/gi, 'atlatılabilir');
      text = text.replace(/sabır li/gi, 'sabırlı');
      text = text.replace(/kullanir/gi, 'kullanır');
      text = text.replace(/asiri/gi, 'aşırı');
      text = text.replace(/savunmasiz/gi, 'savunmasız');
      text = text.replace(/yikici/gi, 'yıkıcı');
      text = text.replace(/hizli/gi, 'hızlı');
      text = text.replace(/oyuncuşu/gi, 'oyuncusu');
      text = text.replace(/baskirali/gi, 'baskı');

      if (idx === 0) desc = text;
      else if (idx === 1) exploit = text;
      else if (idx === 2) approach = text;
      else examples = text;
    });

    // FIX 2: Ingilizce-Turkce karisik cumleler
    desc = desc.replace(/using 4-2-3-1 can be savunmasız/gi, '4-2-3-1 kullanırken savunmasız olabilir');
    desc = desc.replace(/using .+ can be savunmasız/gi, 'kullanırken savunmasız olabilir');
    desc = desc.replace(/can be savunmasız in kanat alanları/gi, 'kanat alanlarında savunmasız olabilir');
    desc = desc.replace(/atlatılabilir ile direkt oyun/gi, 'direkt oyunla atlatılabilir');
    desc = desc.replace(/through press/gi, 'baskıdan geçerek');

    // FIX 3: Exploit alanindaki hatalar
    exploit = exploit.replace(/Time runs to beat offside trap/gi, 'Ofsayt tuzağını atlatacak zamanlı koşular');
    exploit = exploit.replace(/Basit ama yıkıcı/gi, 'Basit ama yıkıcı');
    exploit = exploit.replace(/Hedef al man/gi, 'Hedef adam');
    exploit = exploit.replace(/baskı yap/gi, 'baskıyı');
    exploit = exploit.replace(/bypassing baskı entirely/gi, 'baskıyı tamamen atlayarak');
    exploit = exploit.replace(/Technical quality to play through baskı/gi, 'Teknik kalite ile baskıdan geçme');
    exploit = exploit.replace(/ile quick combinations/gi, 'ile hızlı kombinasyonlarla');
    exploit = exploit.replace(/aşırı yükle wings ile winger \+ fullback/gi, 'kanatları aşırı yükle, kanat + bek ile');
    exploit = exploit.replace(/creating 2v1 vs wing-back/gi, 'beke karşı 2v1 yaratarak');
    exploit = exploit.replace(/Quick switches to isolated areas/gi, 'İzole alanlara hızlı taraf değişimleri');

    // FIX 4: Diger karisik ifadeler
    desc = desc.replace(/\(1\)/g, '(1)');
    desc = desc.replace(/\(2\)/g, '(2)');
    exploit = exploit.replace(/Either:/gi, 'Ya:');
    exploit = exploit.replace(/OR \(2\)/gi, 'YA DA (2)');

    // FIX 5: Gereksiz bosluklar ve "the" temizle
    desc = desc.replace(/\bthe\b/gi, '').replace(/\s+/g, ' ').trim();
    exploit = exploit.replace(/\bthe\b/gi, '').replace(/\s+/g, ' ').trim();

    // JSON alanlari duzelt
    if (approach && approach.startsWith('[')) {
      try {
        let arr = JSON.parse(approach);
        arr = arr.map(item => {
          item = item.replace(/karsi/gi, 'karşı');
          item = item.replace(/hizli/gi, 'hızlı');
          return item;
        });
        approach = JSON.stringify(arr);
      } catch (e) {}
    }

    if (examples && examples.startsWith('[')) {
      try {
        let arr = JSON.parse(examples);
        arr = arr.map(item => {
          item = item.replace(/karsi/gi, 'karşı');
          return item;
        });
        examples = JSON.stringify(arr);
      } catch (e) {}
    }

    db.run(
      `UPDATE system_weaknesses
       SET weakness_description = ?,
           how_to_exploit = ?,
           required_approach = ?,
           examples = ?
       WHERE id = ?`,
      [desc, exploit, approach, examples, row.id],
      function(err) {
        if (err) {
          console.log(`  ERROR [${row.id}]:`, err.message);
        } else if (this.changes > 0) {
          updated++;
        }

        processed++;
        if (processed === rows.length) {
          console.log(`✅ System Weaknesses: ${updated}/${rows.length} kayıt güncellendi\n`);
          fixPressingTrapZones();
        }
      }
    );
  });
});

// PHASE 2: PRESSING TRAP ZONES
function fixPressingTrapZones() {
  console.log('PHASE 2: Pressing Trap Zones duzeltiliyor...\n');

  db.all('SELECT * FROM pressing_trap_zones ORDER BY id', [], (err, rows) => {
    if (err) {
      fixPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let name = row.trap_name || '';
      let zone = row.trap_zone || '';
      let trigger = row.trap_trigger || '';
      let setup = row.trap_setup || '';
      let exec = row.trap_execution || '';

      [name, zone, trigger, setup, exec].forEach((field, idx) => {
        let text = field;
        text = text.replace(/oyuncuşu/gi, 'oyuncusu');
        text = text.replace(/bastırır/gi, 'bastırır');
        text = text.replace(/kanatlar/gi, 'kanatlar');
        text = text.replace(/beklere/gi, 'beklere');
        text = text.replace(/zorlar/gi, 'zorlar');
        text = text.replace(/yaptırır/gi, 'yaptırır');
        text = text.replace(/gelince/gi, 'gelince');
        text = text.replace(/karşı/gi, 'karşı');

        if (idx === 0) name = text;
        else if (idx === 1) zone = text;
        else if (idx === 2) trigger = text;
        else if (idx === 3) setup = text;
        else exec = text;
      });

      db.run(
        `UPDATE pressing_trap_zones
         SET trap_name = ?,
             trap_zone = ?,
             trap_trigger = ?,
             trap_setup = ?,
             trap_execution = ?
         WHERE id = ?`,
        [name, zone, trigger, setup, exec, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
          }

          processed++;
          if (processed === rows.length) {
            console.log(`✅ Pressing Trap Zones: ${updated}/${rows.length} kayıt güncellendi\n`);
            fixPossessionTactics();
          }
        }
      );
    });
  });
}

// PHASE 3: POSSESSION TACTICS
function fixPossessionTactics() {
  console.log('PHASE 3: Possession Tactics duzeltiliyor...\n');

  db.all('SELECT * FROM possession_tactics ORDER BY id', [], (err, rows) => {
    if (err) {
      fixNonPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let circ = row.circulation_patterns || '';
      let prog = row.progression_patterns || '';
      let over = row.overload_patterns || '';

      // Fix "Hasta" kelimesi - muhtemelen "pivot" demek istenmis
      circ = circ.replace(/Hasta veya pivot/gi, 'Pivot veya 8 numara');
      prog = prog.replace(/Hasta veya pivot/gi, 'Pivot veya 8 numara');
      prog = prog.replace(/Hasta/gi, 'Pivot');

      // Diger karakterler
      [circ, prog, over].forEach((field, idx) => {
        let text = field;
        text = text.replace(/dolaşımı/gi, 'dolaşımı');
        text = text.replace(/değişimleri/gi, 'değişimleri');
        text = text.replace(/oluşturur/gi, 'oluşturur');
        text = text.replace(/sağlanır/gi, 'sağlanır');

        if (idx === 0) circ = text;
        else if (idx === 1) prog = text;
        else over = text;
      });

      db.run(
        `UPDATE possession_tactics
         SET circulation_patterns = ?,
             progression_patterns = ?,
             overload_patterns = ?
         WHERE id = ?`,
        [circ, prog, over, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
          }

          processed++;
          if (processed === rows.length) {
            console.log(`✅ Possession Tactics: ${updated}/${rows.length} kayıt güncellendi\n`);
            fixNonPossessionTactics();
          }
        }
      );
    });
  });
}

// PHASE 4: NON-POSSESSION TACTICS
function fixNonPossessionTactics() {
  console.log('PHASE 4: Non-Possession Tactics duzeltiliyor...\n');

  db.all('SELECT * FROM non_possession_tactics ORDER BY id', [], (err, rows) => {
    if (err) {
      finishUp();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      let def = row.defensive_philosophy || '';
      let press = row.pressing_philosophy || '';
      let counter = row.counter_attack_philosophy || '';

      [def, press, counter].forEach((field, idx) => {
        let text = field;
        text = text.replace(/Yoğun Karşı Baskı/gi, 'Yoğun Karşı Baskı');
        text = text.replace(/içinde/gi, 'içinde');
        text = text.replace(/kazanma/gi, 'kazanma');

        if (idx === 0) def = text;
        else if (idx === 1) press = text;
        else counter = text;
      });

      db.run(
        `UPDATE non_possession_tactics
         SET defensive_philosophy = ?,
             pressing_philosophy = ?,
             counter_attack_philosophy = ?
         WHERE id = ?`,
        [def, press, counter, row.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
          }

          processed++;
          if (processed === rows.length) {
            console.log(`✅ Non-Possession Tactics: ${updated}/${rows.length} kayıt güncellendi\n`);
            finishUp();
          }
        }
      );
    });
  });
}

function finishUp() {
  console.log('\n=== ✅ ULTIMATE TURKISH FIX TAMAMLANDI! ===\n');
  process.exit(0);
}
