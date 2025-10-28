const db = require('./ultra_database');

console.log('SYSTEM WEAKNESSES TURKCEYE CEVRILIYOR...\n');

// Yaygın çeviriler
const translations = {
  // Weakness types
  'Balls In Behind': 'Arkaya Paslar',
  'Bypass High Press': 'Yuksek Baski Atlatma',
  'Wide Overloads': 'Kanat Asiri Yuklenmesi',
  'Counter-Attacks': 'Kontra Ataklar',
  'Physical Dominance': 'Fiziksel Ustunluk',
  'Set Pieces': 'Duran Toplar',
  'Direct Play': 'Direkt Oyun',
  'Wings Exploitation': 'Kanat Istismari',
  'Central Overload': 'Merkez Asiri Yukleme',
  'Pressing Traps': 'Baski Tuzaklari',
  'Long Balls': 'Uzun Toplar',
  'Quick Transitions': 'Hizli Gecisler',
  'Possession Loss': 'Top Kaybi',
  'Aerial Weakness': 'Hava Topu Zayifligi',
  'Stamina Issues': 'Dayaniklilik Sorunlari',

  // Common phrases
  'very high defensive line': 'cok yuksek savunma hatti',
  'extremely vulnerable': 'son derece savunmasiz',
  'long balls': 'uzun toplar',
  'pace in behind': 'arkadaki hiz',
  'intense high pressing': 'yogun yuksek baski',
  'can be bypassed': 'atlatilabilir',
  'direct play': 'direkt oyun',
  'patient buildup': 'sabir li oyun kurma',
  'wide areas': 'kanat alanlari',
  'quick switches': 'hizli taraf degisimleri',
  'wing overloads': 'kanat asiri yuklenmesi',
  'counter-attack': 'kontra atak',
  'transition': 'gecis',
  'defensive shape': 'savunma sekli',
  'compact block': 'kompakt blok',
  'high line': 'yuksek hat',
  'pressing': 'baski',
  'vulnerable': 'savunmasiz',
  'weakness': 'zayiflik',
  'exploit': 'istismar et',
  'target': 'hedef al',
  'force': 'zorla',
  'overload': 'asiri yukle',
  'isolate': 'izole et',
  'fast-paced': 'hizli tempolu',
  'physical': 'fiziksel',
  'aerial': 'havada',
  'stamina': 'dayaniklilik',
  'intensity': 'yogunluk'
};

// SQL update - temel degisimler
let updates = [];
for (const [eng, tr] of Object.entries(translations)) {
  updates.push(`
    UPDATE system_weaknesses
    SET weakness_type = REPLACE(weakness_type, '${eng}', '${tr}'),
        weakness_description = REPLACE(weakness_description, '${eng}', '${tr}')
    WHERE weakness_type LIKE '%${eng}%'
       OR weakness_description LIKE '%${eng}%'
  `);
}

let completed = 0;

function runUpdate(index) {
  if (index >= updates.length) {
    console.log(`\n${completed} grup guncelleme tamamlandi!`);
    console.log('\nKontrol ediliyor...\n');

    // Kaç kayıt Türkçe'ye çevrildi kontrol et
    db.all(`SELECT COUNT(*) as total FROM system_weaknesses
            WHERE weakness_description NOT LIKE '%the%'
              AND weakness_description NOT LIKE '%with%'`, [],
    (err, rows) => {
      if (err) {
        console.log('Kontrol hatasi:', err.message);
      } else {
        console.log(`Turkceye cevrilmis kayit sayisi: ~${rows[0].total}`);
      }

      console.log('\nSYSTEM WEAKNESSES GUNCELLENDI!\n');
      process.exit(0);
    });
    return;
  }

  db.run(updates[index], [], function(err) {
    if (!err && this.changes > 0) {
      completed++;
      if (completed % 5 === 0) {
        console.log(`${completed} grup islendi...`);
      }
    }
    runUpdate(index + 1);
  });
}

runUpdate(0);
