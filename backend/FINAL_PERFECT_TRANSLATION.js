const db = require('./ultra_database');

console.log('=== TAM VE DOGRU TURKCE CEVIRISI BASLIYOR ===\n');

// 1. SYSTEM WEAKNESSES - HER AYRINTI
console.log('1. SYSTEM WEAKNESSES duzeltiliyor...\n');

db.all('SELECT * FROM system_weaknesses ORDER BY id', [], (err, weaknesses) => {
  if (err) {
    console.log('HATA:', err.message);
    process.exit(1);
  }

  let processed = 0;
  let updated = 0;

  weaknesses.forEach(w => {
    let desc = w.weakness_description || '';
    let exploit = w.how_to_exploit || '';
    let approach = w.required_approach || '';
    let examples = w.examples || '';

    // ===== DESCRIPTION TAM CEVIRISI =====
    // Yarim yamalak cevirileri duzelt
    desc = desc.replace(/uses/gi, 'kullanir');
    desc = desc.replace(/extremely/gi, 'asiri derece');
    desc = desc.replace(/to uzun toplar/gi, 'uzun toplara karsi');
    desc = desc.replace(/and arkadaki hiz/gi, 've arkadaki hiza karsi');
    desc = desc.replace(/cok yuksek/gi, 'çok yüksek');
    desc = desc.replace(/savunmasiz/gi, 'savunmasız');
    desc = desc.replace(/savunma hatti/gi, 'savunma hattı');

    // Tum cumleleri tam cevir
    desc = desc.replace(/can be bypassed with direct play or patient buildup through press/gi, 'direkt oyun veya baskıdan geçen sabırlı oyun kurma ile atlatılabilir');
    desc = desc.replace(/using .+ can be vulnerable in wide areas/gi, 'kanat alanlarında savunmasız olabilir');
    desc = desc.replace(/especially vs quick switches and wing overloads/gi, 'özellikle hızlı taraf değişimleri ve kanat aşırı yüklenmelerine karşı');
    desc = desc.replace(/intense high pressing/gi, 'yoğun yüksek baskı');
    desc = desc.replace(/vulnerable to/gi, 'karşı savunmasız');
    desc = desc.replace(/pace in behind/gi, 'arkadaki hız');
    desc = desc.replace(/long balls/gi, 'uzun toplar');

    // ===== HOW_TO_EXPLOIT TAM CEVIRISI =====
    exploit = exploit.replace(/Play direct balls over high line/gi, 'Yüksek hattan uzun toplar oyna');
    exploit = exploit.replace(/Use pacy forwards making runs in behind/gi, 'Arkaya koşan hızlı forvetler kullan');
    exploit = exploit.replace(/Time runs perfectly/gi, 'Koşuları mükemmel zamanla');
    exploit = exploit.replace(/Simple but devastating/gi, 'Basit ama yıkıcı');
    exploit = exploit.replace(/Exploit transitions/gi, 'Geçişleri istismar et');
    exploit = exploit.replace(/Target weak/gi, 'Zayıf noktayı hedefle');
    exploit = exploit.replace(/Switch play quickly/gi, 'Hızlı taraf değiştir');
    exploit = exploit.replace(/Overload/gi, 'Aşırı yükle');
    exploit = exploit.replace(/Attack/gi, 'Saldır');
    exploit = exploit.replace(/counter-attack/gi, 'kontra atak');
    exploit = exploit.replace(/Press high/gi, 'Yüksek bas');
    exploit = exploit.replace(/Force errors/gi, 'Hata zorla');

    // ===== REQUIRED_APPROACH JSON CEVIRISI =====
    if (approach && approach.startsWith('[')) {
      try {
        let arr = JSON.parse(approach);
        arr = arr.map(item => {
          item = item.replace(/Pacy forwards essential/gi, 'Hızlı forvetler şart');
          item = item.replace(/Direct passing/gi, 'Direkt paslaşma');
          item = item.replace(/Time runs perfectly/gi, 'Koşuları mükemmel zamanla');
          item = item.replace(/Exploit transitions/gi, 'Geçişleri istismar et');
          item = item.replace(/Quick switches/gi, 'Hızlı taraf değişimi');
          item = item.replace(/Wide play/gi, 'Kanat oyunu');
          item = item.replace(/Target man/gi, 'Hedef adam');
          item = item.replace(/Physical presence/gi, 'Fiziksel varlık');
          item = item.replace(/High press/gi, 'Yüksek baskı');
          item = item.replace(/Compact block/gi, 'Kompakt blok');
          item = item.replace(/essential/gi, 'gerekli');
          item = item.replace(/required/gi, 'gerekli');
          return item;
        });
        approach = JSON.stringify(arr);
      } catch (e) {}
    }

    // ===== EXAMPLES JSON CEVIRISI =====
    if (examples && examples.startsWith('[')) {
      try {
        let arr = JSON.parse(examples);
        arr = arr.map(item => {
          item = item.replace(/Most teams exploit this/gi, 'Çoğu takım bunu istismar eder');
          item = item.replace(/High success rate/gi, 'Yüksek başarı oranı');
          item = item.replace(/Obvious weakness/gi, 'Açık zayıflık');
          item = item.replace(/Common tactic/gi, 'Yaygın taktik');
          item = item.replace(/Proven effective/gi, 'Kanıtlanmış etkili');
          return item;
        });
        examples = JSON.stringify(arr);
      } catch (e) {}
    }

    // Guncelle
    db.run(
      `UPDATE system_weaknesses
       SET weakness_description = ?,
           how_to_exploit = ?,
           required_approach = ?,
           examples = ?
       WHERE id = ?`,
      [desc, exploit, approach, examples, w.id],
      function(err) {
        if (err) {
          console.log(`  HATA [${w.id}]:`, err.message);
        } else if (this.changes > 0) {
          updated++;
          if (updated % 20 === 0) {
            console.log(`  ${updated} weakness guncellendi...`);
          }
        }

        processed++;
        if (processed === weaknesses.length) {
          console.log(`  TOPLAM: ${updated}/${weaknesses.length} weakness guncellendi!\n`);

          // 2. POSSESSION TACTICS JSON ARRAYLERI
          console.log('2. POSSESSION TACTICS JSON arrayleri duzeltiliyor...\n');
          fixPossessionTactics();
        }
      }
    );
  });
});

function fixPossessionTactics() {
  db.all('SELECT * FROM possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('HATA:', err.message);
      finishUp();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(p => {
      let zones = p.possession_zones || '[]';
      let passing = p.passing_principles || '[]';
      let movement = p.movement_principles || '[]';

      // JSON array cevirileri
      try {
        if (zones.startsWith('[')) {
          let arr = JSON.parse(zones);
          arr = arr.map(z => {
            z = z.replace(/All zones/gi, 'Tüm bölgeler');
            z = z.replace(/Build from back/gi, 'Arkadan kur');
            z = z.replace(/Progress patiently/gi, 'Sabırlı ilerle');
            z = z.replace(/Final third/gi, 'Son üçte bir');
            z = z.replace(/Wide areas/gi, 'Kanat alanları');
            z = z.replace(/Central zones/gi, 'Merkez bölgeler');
            return z;
          });
          zones = JSON.stringify(arr);
        }

        if (passing.startsWith('[')) {
          let arr = JSON.parse(passing);
          arr = arr.map(p => {
            p = p.replace(/Sürekli üçgen oluşturma/gi, 'Sürekli üçgen oluşturma'); // zaten turkce
            p = p.replace(/Always/gi, 'Her zaman');
            p = p.replace(/Never/gi, 'Asla');
            p = p.replace(/Quick/gi, 'Hızlı');
            p = p.replace(/Patient/gi, 'Sabırlı');
            return p;
          });
          passing = JSON.stringify(arr);
        }

        if (movement.startsWith('[')) {
          let arr = JSON.parse(movement);
          arr = arr.map(m => {
            m = m.replace(/Sürekli hareket/gi, 'Sürekli hareket'); // zaten turkce
            m = m.replace(/Constant/gi, 'Sürekli');
            m = m.replace(/Movement/gi, 'Hareket');
            m = m.replace(/Runs/gi, 'Koşular');
            return m;
          });
          movement = JSON.stringify(arr);
        }
      } catch (e) {}

      db.run(
        `UPDATE possession_tactics
         SET possession_zones = ?,
             passing_principles = ?,
             movement_principles = ?
         WHERE id = ?`,
        [zones, passing, movement, p.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
          }

          processed++;
          if (processed === rows.length) {
            console.log(`  TOPLAM: ${updated}/${rows.length} possession tactic guncellendi!\n`);

            // 3. NON-POSSESSION TACTICS JSON ARRAYLERI
            fixNonPossessionTactics();
          }
        }
      );
    });
  });
}

function fixNonPossessionTactics() {
  console.log('3. NON-POSSESSION TACTICS JSON arrayleri duzeltiliyor...\n');

  db.all('SELECT * FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('HATA:', err.message);
      finishUp();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(n => {
      let triggers = n.pressing_triggers || '[]';
      let defender = n.out_of_possession_defender_roles || '[]';
      let midfielder = n.out_of_possession_midfielder_roles || '[]';
      let attacker = n.out_of_possession_attacker_roles || '[]';

      try {
        // Pressing triggers
        if (triggers.startsWith('[')) {
          let arr = JSON.parse(triggers);
          arr = arr.map(t => {
            t = t.replace(/Rakip stoper kötü dokunuş/gi, 'Rakip stoper kötü dokunuş'); // kontrol
            t = t.replace(/Bad touch/gi, 'Kötü dokunuş');
            t = t.replace(/Back pass/gi, 'Geriye pas');
            t = t.replace(/Wide areas/gi, 'Kanat alanları');
            return t;
          });
          triggers = JSON.stringify(arr);
        }

        // Roller - Zaten Turkce ama kontrol
        [defender, midfielder, attacker].forEach((role, idx) => {
          if (role && role.startsWith('[')) {
            try {
              let arr = JSON.parse(role);
              arr = arr.map(r => {
                r = r.replace(/High defensive line/gi, 'Yüksek savunma hattı');
                r = r.replace(/Step up together/gi, 'Birlikte yüksel');
                r = r.replace(/Play offside trap/gi, 'Ofsayt tuzağı oyna');
                r = r.replace(/Aggressive defending/gi, 'Agresif savunma');
                r = r.replace(/Aggressive pressing/gi, 'Agresif baskı');
                r = r.replace(/Cut passing lanes/gi, 'Pas yollarını kes');
                r = r.replace(/Win ball early/gi, 'Topu erken kazan');
                r = r.replace(/High energy/gi, 'Yüksek enerji');
                r = r.replace(/Lead press/gi, 'Baskıya ön ayak ol');
                r = r.replace(/Trigger pressing/gi, 'Baskı tetikle');
                r = r.replace(/Force errors/gi, 'Hata zorla');
                r = r.replace(/High work-rate/gi, 'Yüksek çalışma oranı');
                return r;
              });

              if (idx === 0) defender = JSON.stringify(arr);
              else if (idx === 1) midfielder = JSON.stringify(arr);
              else attacker = JSON.stringify(arr);
            } catch (e) {}
          }
        });
      } catch (e) {}

      db.run(
        `UPDATE non_possession_tactics
         SET pressing_triggers = ?,
             out_of_possession_defender_roles = ?,
             out_of_possession_midfielder_roles = ?,
             out_of_possession_attacker_roles = ?
         WHERE id = ?`,
        [triggers, defender, midfielder, attacker, n.id],
        function(err) {
          if (!err && this.changes > 0) {
            updated++;
          }

          processed++;
          if (processed === rows.length) {
            console.log(`  TOPLAM: ${updated}/${rows.length} non-possession tactic guncellendi!\n`);
            finishUp();
          }
        }
      );
    });
  });
}

function finishUp() {
  console.log('\n=== TAM VE DOGRU TURKCE CEVIRISI TAMAMLANDI! ===\n');
  process.exit(0);
}
