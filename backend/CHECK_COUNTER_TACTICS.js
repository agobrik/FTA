const db = require('./ultra_database');
console.log('Counter Tactics durumu:\n');
db.all('SELECT id, system_id, player_instructions FROM counter_tactics LIMIT 5', [], (err, rows) => {
  if (err) { console.log('ERROR:', err); process.exit(1); }
  console.log('Toplam kayıt:', rows.length);
  console.log('\nÖrnek player_instructions (ilk 3):');
  rows.slice(0, 3).forEach(r => {
    console.log(`\nID: ${r.id}`);
    console.log(`Instructions: ${r.player_instructions.substring(0, 200)}...`);
  });
  
  // Toplam sayı
  db.get('SELECT COUNT(*) as count FROM counter_tactics', [], (err2, row) => {
    console.log(`\n\nToplam Counter Tactics: ${row.count}`);
    
    // Tactical systems sayısı
    db.get('SELECT COUNT(*) as count FROM tactical_systems', [], (err3, row2) => {
      console.log(`Toplam Tactical Systems: ${row2.count}`);
      console.log(`\nHer sistem için counter tactic olması gerekir!`);
      process.exit(0);
    });
  });
});
