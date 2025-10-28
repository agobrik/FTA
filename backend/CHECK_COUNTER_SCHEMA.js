const db = require('./ultra_database');
db.all(\, [], (err, rows) => {
  if (err) { console.log('ERROR:', err); process.exit(1); }
  console.log('counter_tactics tablosu sütunları:\n');
  rows.forEach(col => {
    console.log(\);
  });
  process.exit(0);
});
