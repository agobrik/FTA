const db = require('./ultra_database');

console.log('\nRASTGELE SİSTEM KONTROL - SON DURUM\n');
console.log('═'.repeat(80) + '\n');

db.all('SELECT id, name, SUBSTR(philosophy,1,150) as phil, key_principles FROM tactical_systems WHERE id IN (1,10,25,40,55)', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  rows.forEach(r => {
    console.log(`[${r.id}] ${r.name}`);
    console.log(`Filosofi: ${r.phil}...`);

    // Key principles ilk 2 öğe
    try {
      const principles = JSON.parse(r.key_principles);
      console.log(`İlk prensipler: ${principles.slice(0, 2).join(', ')}`);
    } catch (e) {
      console.log(`İlk prensipler: ${r.key_principles.substring(0, 100)}...`);
    }
    console.log();
  });

  console.log('═'.repeat(80));
  console.log('\n✅ Hepsi Türkçe mi? Yarım yamalak var mı?');
  console.log('Kullanıcı feedback bekleniyor...\n');
  process.exit(0);
});
