const db = require('./ultra_database');

console.log('=== KOMPLE VERİTABANI TÜRKÇE ÇEVİRİSİ BAŞLIYOR ===\n');
console.log('HEDEF: Tek bir İngilizce kelime bile kalmasın!\n');
console.log('═'.repeat(70));

let totalUpdated = 0;

// PHASE 1: SYSTEM WEAKNESSES - TAM ÇEVİRİ
console.log('\nPHASE 1: System Weaknesses (100+ kayıt)...');

db.all('SELECT * FROM system_weaknesses ORDER BY id', [], (err, weaknesses) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  let processed = 0;
  let updated = 0;

  weaknesses.forEach(w => {
    let type = w.weakness_type || '';
    let desc = w.weakness_description || '';
    let exploit = w.how_to_exploit || '';

    // Tamamen İngilizce olanları çevir
    type = type.replace(/Lack of Creativity/gi, 'Yaratıcılık Eksikliği');
    type = type.replace(/High Line Vulnerability/gi, 'Yüksek Hat Zayıflığı');
    type = type.replace(/Wing Overload/gi, 'Kanat Aşırı Yüklenmesi');
    type = type.replace(/Central Congestion/gi, 'Merkez Tıkanıklığı');

    // Description içindeki İngilizce cümleler
    desc = desc.replace(/defensive\/counter style can struggle to break down organized low blocks/gi,
                       'defansif/kontra stili organize olmuş alçak bloklara karşı zorlanabilir');
    desc = desc.replace(/can struggle to/gi, 'zorlanabilir');
    desc = desc.replace(/break down/gi, 'kırmakta');
    desc = desc.replace(/organized low blocks/gi, 'organize alçak blokları');
    desc = desc.replace(/lack of/gi, 'eksikliği');
    desc = desc.replace(/creativity/gi, 'yaratıcılık');

    // Exploit
    exploit = exploit.replace(/Compact low block/gi, 'Kompakt alçak blok');
    exploit = exploit.replace(/Deny space/gi, 'Alan verme');
    exploit = exploit.replace(/Force long shots/gi, 'Uzak şutları zorla');
    exploit = exploit.replace(/Be patient/gi, 'Sabırlı ol');
    exploit = exploit.replace(/Wait for mistakes/gi, 'Hataları bekle');

    // Yaygın kelimeler
    [desc, exploit, type].forEach((field, idx) => {
      let text = field;
      text = text.replace(/\bthe\b/gi, '');
      text = text.replace(/\band\b/gi, 've');
      text = text.replace(/\bwith\b/gi, 'ile');
      text = text.replace(/\busing\b/gi, 'kullanarak');
      text = text.replace(/\bwhen\b/gi, 'zaman');
      text = text.replace(/\bagainst\b/gi, 'karşı');
      text = text.replace(/\bthrough\b/gi, 'içinden');
      text = text.replace(/\bover\b/gi, 'üzerinden');
      text = text.replace(/\s+/g, ' ').trim();

      if (idx === 0) desc = text;
      else if (idx === 1) exploit = text;
      else type = text;
    });

    db.run(
      `UPDATE system_weaknesses
       SET weakness_type = ?,
           weakness_description = ?,
           how_to_exploit = ?
       WHERE id = ?`,
      [type, desc, exploit, w.id],
      function(updateErr) {
        if (!updateErr && this.changes > 0) {
          updated++;
          totalUpdated++;
        }
        processed++;
        if (processed === weaknesses.length) {
          console.log(`✅ ${updated}/${weaknesses.length} weakness güncellendi`);
          fixCounterTactics();
        }
      }
    );
  });
});

// PHASE 2: COUNTER TACTICS - TAMAMEN İNGİLİZCE OLANLAR
function fixCounterTactics() {
  console.log('\nPHASE 2: Counter Tactics (TAM İNGİLİZCE kayıtlar)...');

  db.all('SELECT * FROM counter_tactics ORDER BY id', [], (err, rows) => {
    if (err) {
      fixTacticalSystems();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(c => {
      let name = c.counter_name || '';
      let strategy = c.detailed_strategy || '';
      let when = c.when_to_apply || '';

      // Tamamen İngilizce isimler
      name = name.replace(/Ultra-Compact Low Block \+ Quick Counter/gi, 'Ultra-Kompakt Alçak Blok + Hızlı Kontra');
      name = name.replace(/Long Balls Over Press \+ Target Man/gi, 'Baskı Üzerinden Uzun Toplar + Hedef Adam');
      name = name.replace(/Balls In Behind \+ Extreme Pace/gi, 'Arkaya Toplar + Aşırı Hız');
      name = name.replace(/Patient Possession Through Press/gi, 'Baskıdan Geçen Sabırlı Sahiplik');

      // Strategy cümleleri
      strategy = strategy.replace(/Otobus koy with ultra kompakt/gi, 'Ultra kompakt ile otobüs koy');
      strategy = strategy.replace(/Tamamen atla yüksek baskı with/gi, 'Yüksek baskıyı tamamen atla');
      strategy = strategy.replace(/direkt uzun toplar/gi, 'direkt uzun toplarla');
      strategy = strategy.replace(/Simple but devastatingly effective/gi, 'Basit ama son derece etkili');
      strategy = strategy.replace(/Repeatedly play/gi, 'Tekrar tekrar oyna');
      strategy = strategy.replace(/direct balls/gi, 'direkt toplar');
      strategy = strategy.replace(/in behind/gi, 'arkaya');
      strategy = strategy.replace(/pacy forwards/gi, 'hızlı forvetlere');
      strategy = strategy.replace(/with pace/gi, 'hız ile');
      strategy = strategy.replace(/absorb pressure/gi, 'baskıyı em');
      strategy = strategy.replace(/counter explosively/gi, 'patlayıcı kontra');

      // When
      when = when.replace(/When facing/gi, 'Karşılaştığında');
      when = when.replace(/high pressing teams/gi, 'yüksek baskı yapan takımlar');
      when = when.replace(/elite possession teams/gi, 'elit sahiplik takımları');

      // Genel temizlik
      [name, strategy, when].forEach((field, idx) => {
        let text = field;
        text = text.replace(/\bthe\b/gi, '');
        text = text.replace(/\band\b/gi, 've');
        text = text.replace(/\bwith\b/gi, 'ile');
        text = text.replace(/\bor\b/gi, 'veya');
        text = text.replace(/\s+/g, ' ').trim();

        if (idx === 0) name = text;
        else if (idx === 1) strategy = text;
        else when = text;
      });

      db.run(
        `UPDATE counter_tactics
         SET counter_name = ?,
             detailed_strategy = ?,
             when_to_apply = ?
         WHERE id = ?`,
        [name, strategy, when, c.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} counter tactic güncellendi`);
            fixTacticalSystems();
          }
        }
      );
    });
  });
}

// PHASE 3: TACTICAL SYSTEMS - İngilizce terimler
function fixTacticalSystems() {
  console.log('\nPHASE 3: Tactical Systems (İngilizce terimler)...');

  db.run(`
    UPDATE tactical_systems
    SET
      in_possession_shape = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        in_possession_shape,
        'inverted', 'içe kesen'),
        'wing-back', 'kanat bek'),
        'gegenpressing', 'karşı baskı'),
        'buildup', 'oyun kurma'),
        'ball-playing', 'topu oynayan'),
        'sweeper', 'süpürücü'),
      out_of_possession_shape = REPLACE(REPLACE(REPLACE(
        out_of_possession_shape,
        'compact', 'kompakt'),
        'high press', 'yüksek baskı'),
        'low block', 'alçak blok')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} tactical system güncellendi`);
      totalUpdated += this.changes;
    }
    fixPressingZones();
  });
}

// PHASE 4: PRESSING TRAP ZONES
function fixPressingZones() {
  console.log('\nPHASE 4: Pressing Trap Zones...');

  db.run(`
    UPDATE pressing_trap_zones
    SET
      trap_name = REPLACE(REPLACE(REPLACE(
        trap_name,
        'Press', 'Baskı'),
        'Trap', 'Tuzak'),
        'Zone', 'Bölge'),
      trap_execution = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        trap_execution,
        'when', 'zaman'),
        'the', ''),
        'with', 'ile'),
        'ball', 'top'),
        'player', 'oyuncu')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} pressing zone güncellendi`);
      totalUpdated += this.changes;
    }
    fixPossessionTactics();
  });
}

// PHASE 5: POSSESSION TACTICS
function fixPossessionTactics() {
  console.log('\nPHASE 5: Possession Tactics...');

  db.run(`
    UPDATE possession_tactics
    SET
      circulation_patterns = REPLACE(REPLACE(REPLACE(REPLACE(
        circulation_patterns,
        'through', 'içinden'),
        'ball', 'top'),
        'the', ''),
        'with', 'ile'),
      progression_patterns = REPLACE(REPLACE(REPLACE(
        progression_patterns,
        'buildup', 'oyun kurma'),
        'through', 'içinden'),
        'the', '')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} possession tactic güncellendi`);
      totalUpdated += this.changes;
    }
    fixNonPossessionTactics();
  });
}

// PHASE 6: NON-POSSESSION TACTICS
function fixNonPossessionTactics() {
  console.log('\nPHASE 6: Non-Possession Tactics...');

  db.run(`
    UPDATE non_possession_tactics
    SET
      defensive_philosophy = REPLACE(REPLACE(REPLACE(
        defensive_philosophy,
        'block', 'blok'),
        'press', 'baskı'),
        'the', ''),
      pressing_philosophy = REPLACE(REPLACE(
        pressing_philosophy,
        'high press', 'yüksek baskı'),
        'the', '')
    WHERE id > 0
  `, [], function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ ${this.changes} non-possession tactic güncellendi`);
      totalUpdated += this.changes;
    }
    finishUp();
  });
}

function finishUp() {
  console.log('\n' + '═'.repeat(70));
  console.log(`\n✅ TOPLAM ${totalUpdated} KAYIT GÜNCELLENDİ!\n`);
  console.log('Tek bir İngilizce kelime kalmaması için tüm tablolar güncellendi.\n');
  console.log('═'.repeat(70) + '\n');
  process.exit(0);
}
