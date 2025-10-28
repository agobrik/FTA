const db = require('./ultra_database');

db.all('SELECT id, role_name, position, role_type FROM player_roles ORDER BY id', [], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    rows.forEach(r => {
      console.log(`${r.id}. ${r.role_name} (${r.position}) - ${r.role_type}`);
    });
  }
  db.close();
});
