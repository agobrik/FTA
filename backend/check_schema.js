const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

db.all(`PRAGMA table_info(player_roles)`, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`\n📊 player_roles tablosunda ${rows.length} kolon var:\n`);
    rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.name} (${row.type})`);
    });
  }
  db.close();
});
