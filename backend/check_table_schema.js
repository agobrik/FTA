const db = require('./ultra_database');
console.log('player_roles tablosu şeması:\n');
db.all(`PRAGMA table_info(player_roles)`, [], (err, rows) => {
  if (err) { console.log('ERROR:', err.message); process.exit(1); }
  console.log('Mevcut sütunlar:\n');
  rows.forEach(col => {
    console.log(`  ${col.cid}. ${col.name} (${col.type}) - Null: ${col.notnull === 0 ? 'YES' : 'NO'}`);
  });
  process.exit(0);
});
