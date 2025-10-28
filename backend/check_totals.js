const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('\n📊 VERİTABANI DURUM RAPORU\n');
console.log('='.repeat(50) + '\n');

db.get('SELECT COUNT(*) as total FROM tactical_systems', (err, row) => {
  if (!err) {
    console.log(`🎯 TAKTİK SİSTEMLER: ${row.total} toplam sistem`);

    db.get('SELECT COUNT(*) as modern FROM tactical_systems WHERE era = "2024-2025"', (err2, row2) => {
      if (!err2) console.log(`   └─ Modern (2024-2025): ${row2.modern} sistem`);
    });

    db.get('SELECT COUNT(*) as classic FROM tactical_systems WHERE category = "historical"', (err3, row3) => {
      if (!err3) console.log(`   └─ Klasik/Historical: ${row3.classic} sistem`);
    });
  }

  setTimeout(() => {
    db.get('SELECT COUNT(*) as total FROM player_roles', (err, row) => {
      if (!err) {
        console.log(`\n⚽ OYUNCU ROLLERİ: ${row.total} toplam rol`);

        db.get('SELECT COUNT(*) as defense FROM player_roles WHERE position = "DF"', (err2, row2) => {
          if (!err2) console.log(`   └─ Savunma: ${row2.defense} rol`);
        });

        db.get('SELECT COUNT(*) as midfield FROM player_roles WHERE position = "MF"', (err3, row3) => {
          if (!err3) console.log(`   └─ Orta Saha: ${row3.midfield} rol`);
        });

        db.get('SELECT COUNT(*) as forward FROM player_roles WHERE position = "FW"', (err4, row4) => {
          if (!err4) console.log(`   └─ Forvet: ${row4.forward} rol`);
        });
      }

      setTimeout(() => {
        db.get('SELECT COUNT(*) as total FROM counter_tactics', (err, row) => {
          if (!err) {
            console.log(`\n🛡️  KARŞI TAKTİKLER: ${row.total} toplam`);
          }

          console.log('\n' + '='.repeat(50));
          console.log('✅ Veritabanı kontrol tamamlandı!\n');
          db.close();
        });
      }, 200);
    });
  }, 200);
});
