const db = require('./ultra_database');

console.log('SYSTEM WEAKNESSES TAMAMEN TURKCEYE CEVRILIYOR...\n');

// Tum kayitlari cek ve tek tek cevir
db.all('SELECT * FROM system_weaknesses ORDER BY id', [], (err, rows) => {
  if (err) {
    console.log('HATA:', err.message);
    process.exit(1);
  }

  console.log(`Toplam ${rows.length} kayit bulundu.\n`);

  let processed = 0;
  let updated = 0;

  rows.forEach((row, index) => {
    // Eger zaten Turkce ise atla
    if (!row.weakness_description.includes('the') &&
        !row.weakness_description.includes('with') &&
        !row.weakness_description.includes('high') &&
        !row.weakness_description.includes('can be') &&
        !row.weakness_description.includes('will')) {
      processed++;
      if (processed === rows.length) {
        console.log(`\n\nTOPLAM ${updated} kayit guncellendi!`);
        console.log('SYSTEM WEAKNESSES TAMAMEN TURKCE!\n');
        process.exit(0);
      }
      return;
    }

    // Manuel ceviriler - detayli
    let desc = row.weakness_description || '';
    let exploit = row.how_to_exploit || '';
    let approach = row.required_approach || '';

    // Temel cumle yapilari
    desc = desc.replace(/uses very high defensive line/gi, 'cok yuksek savunma hatti kullanir');
    desc = desc.replace(/extremely vulnerable to/gi, 'karsi son derece savunmasiz');
    desc = desc.replace(/can be bypassed/gi, 'atlatilabilir');
    desc = desc.replace(/is vulnerable in/gi, 'savunmasizdir');
    desc = desc.replace(/can be exploited/gi, 'istismar edilebilir');
    desc = desc.replace(/leaves space/gi, 'alan birakir');
    desc = desc.replace(/struggles against/gi, 'zorlanir');
    desc = desc.replace(/weak against/gi, 'karsi zayif');
    desc = desc.replace(/especially vs/gi, 'ozellikle karsi');
    desc = desc.replace(/when facing/gi, 'karsilasildiginda');

    // Kelime cevirileri
    desc = desc.replace(/\bthe\b/gi, '');
    desc = desc.replace(/\band\b/gi, 've');
    desc = desc.replace(/\bor\b/gi, 'veya');
    desc = desc.replace(/\bwith\b/gi, 'ile');
    desc = desc.replace(/\bhigh line\b/gi, 'yuksek hat');
    desc = desc.replace(/\bhigh press\b/gi, 'yuksek baski');
    desc = desc.replace(/\blong balls\b/gi, 'uzun toplar');
    desc = desc.replace(/\bpace in behind\b/gi, 'arkadaki hiz');
    desc = desc.replace(/\bdirect play\b/gi, 'direkt oyun');
    desc = desc.replace(/\bwide areas\b/gi, 'kanat alanlari');
    desc = desc.replace(/\bquick switches\b/gi, 'hizli taraf degisimleri');
    desc = desc.replace(/\bcounter-attack\b/gi, 'kontra atak');
    desc = desc.replace(/\bwing overloads\b/gi, 'kanat asiri yuklenmesi');
    desc = desc.replace(/\bcentral areas\b/gi, 'merkez alanlar');
    desc = desc.replace(/\bdefensive shape\b/gi, 'savunma sekli');
    desc = desc.replace(/\bcompact block\b/gi, 'kompakt blok');
    desc = desc.replace(/\bpressing traps\b/gi, 'baski tuzaklari');
    desc = desc.replace(/\bset pieces\b/gi, 'duran toplar');
    desc = desc.replace(/\baerial balls\b/gi, 'hava toplari');
    desc = desc.replace(/\bphysical teams\b/gi, 'fiziksel takimlar');
    desc = desc.replace(/\btransition\b/gi, 'gecis');
    desc = desc.replace(/\bvulnerable\b/gi, 'savunmasiz');
    desc = desc.replace(/\bweakness\b/gi, 'zayiflik');
    desc = desc.replace(/\bexploit\b/gi, 'istismar et');
    desc = desc.replace(/\btarget\b/gi, 'hedef al');
    desc = desc.replace(/\bforce\b/gi, 'zorla');

    // how_to_exploit
    exploit = exploit.replace(/Play long balls/gi, 'Uzun toplar oyna');
    exploit = exploit.replace(/Use pace/gi, 'Hiz kullan');
    exploit = exploit.replace(/Target/gi, 'Hedef al');
    exploit = exploit.replace(/Exploit/gi, 'Istismar et');
    exploit = exploit.replace(/Force/gi, 'Zorla');
    exploit = exploit.replace(/Attack/gi, 'Saldiri yap');
    exploit = exploit.replace(/Press/gi, 'Baski yap');
    exploit = exploit.replace(/Overload/gi, 'Asiri yukle');
    exploit = exploit.replace(/Switch play/gi, 'Taraf degistir');
    exploit = exploit.replace(/Quick counters/gi, 'Hizli kontralar');
    exploit = exploit.replace(/Direct balls/gi, 'Direkt toplar');
    exploit = exploit.replace(/Wide play/gi, 'Kanat oyunu');
    exploit = exploit.replace(/\bthe\b/gi, '');
    exploit = exploit.replace(/\bwith\b/gi, 'ile');
    exploit = exploit.replace(/\band\b/gi, 've');

    // Gereksiz bosluklari temizle
    desc = desc.replace(/\s+/g, ' ').trim();
    exploit = exploit.replace(/\s+/g, ' ').trim();

    // Guncelle
    db.run(
      `UPDATE system_weaknesses
       SET weakness_description = ?,
           how_to_exploit = ?
       WHERE id = ?`,
      [desc, exploit, row.id],
      function(err) {
        if (err) {
          console.log(`HATA [${row.id}]:`, err.message);
        } else if (this.changes > 0) {
          updated++;
          if (updated % 10 === 0) {
            console.log(`${updated} kayit guncellendi...`);
          }
        }

        processed++;
        if (processed === rows.length) {
          console.log(`\n\nTOPLAM ${updated} kayit guncellendi!`);
          console.log('SYSTEM WEAKNESSES TAMAMEN TURKCE!\n');
          process.exit(0);
        }
      }
    );
  });
});
