const db = require('./ultra_database');

console.log('📋 KALAN İNGİLİZCE SİSTEMLER:\n');

db.all('SELECT id, name, in_possession_shape, out_of_possession_shape FROM tactical_systems WHERE id > 16', [], (err, rows) => {
  if (err) {
    console.log('Hata:', err.message);
    return;
  }

  console.log(`Toplam ${rows.length} sistem bulundu:\n`);

  rows.forEach((r, index) => {
    console.log(`${index + 1}. [ID:${r.id}] ${r.name}`);
    console.log(`   ➤ Topa Sahip: ${r.in_possession_shape}`);
    console.log(`   ➤ Topsuz: ${r.out_of_possession_shape}\n`);
  });

  setTimeout(() => process.exit(0), 500);
});
