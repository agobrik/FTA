const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('\n🔍 VERİTABANI KONTROL EDİLİYOR...\n');

db.all('SELECT name, formation, era, effectiveness_rating FROM tactical_systems WHERE era = "2024-2025" ORDER BY name', (err, rows) => {
  if (err) {
    console.log('❌ Hata:', err.message);
    db.close();
    return;
  }

  console.log('📊 2024-2025 MODERN SİSTEMLER:\n');
  rows.forEach((row, index) => {
    console.log(`${index + 1}. ${row.name}`);
    console.log(`   Formasyon: ${row.formation} | Etkinlik: ${row.effectiveness_rating}/10\n`);
  });
  console.log(`✅ Toplam ${rows.length} modern sistem veritabanında!`);

  db.all('SELECT COUNT(*) as total FROM tactical_systems', (err2, rows2) => {
    if (!err2) {
      console.log(`\n📈 TÜM SİSTEMLER: ${rows2[0].total} toplam taktik sistem\n`);
    }
    db.close();
  });
});
