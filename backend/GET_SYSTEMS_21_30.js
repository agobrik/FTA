const db = require('./ultra_database');

db.all('SELECT id, name, formation FROM tactical_systems WHERE id BETWEEN 21 AND 30 ORDER BY id', [], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    rows.forEach(r => console.log(`${r.id}: ${r.name} (${r.formation})`));
  }
  db.close();
});
