const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🔍 CHECKING REMAINING TABLE SCHEMAS...\n');

db.all('PRAGMA table_info(tactical_partnerships)', (e, r) => {
  console.log('📋 tactical_partnerships columns:');
  r.forEach(c => console.log(`  - ${c.name} (${c.type})`));

  db.all('PRAGMA table_info(non_possession_tactics)', (e2, r2) => {
    console.log('\n📋 non_possession_tactics columns:');
    r2.forEach(c => console.log(`  - ${c.name} (${c.type})`));

    db.close();
  });
});
