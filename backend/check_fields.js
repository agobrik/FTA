const db = require('./database.js');

db.all('PRAGMA table_info(possession_tactics)', (err, rows) => {
  const fields = rows.map(r => r.name);
  const needed = ['build_up_strategy', 'progression_methods', 'key_players_positioning'];
  console.log('Missing from possession_tactics:');
  needed.forEach(f => {
    if(!fields.includes(f)) console.log('- ' + f);
  });

  db.all('PRAGMA table_info(non_possession_tactics)', (err2, rows2) => {
    const fields2 = rows2.map(r => r.name);
    const needed2 = ['regain_strategies', 'rest_defense', 'defensive_priorities'];
    console.log('\nMissing from non_possession_tactics:');
    needed2.forEach(f => {
      if(!fields2.includes(f)) console.log('- ' + f);
    });
    db.close();
  });
});
