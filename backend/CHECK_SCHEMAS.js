const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('📋 TABLO ŞEMALARI\n');

const tables = [
  'tactical_concepts',
  'formation_transitions',
  'system_weaknesses',
  'role_synergies',
  'set_piece_strategies'
];

let idx = 0;

function checkNext() {
  if (idx >= tables.length) {
    db.close();
    return;
  }

  const table = tables[idx];
  console.log('\n🔍 TABLE:', table);
  console.log('─'.repeat(50));

  db.all(`PRAGMA table_info(${table})`, (err, cols) => {
    if (err) {
      console.log('  ❌ Error:', err.message);
    } else if (!cols || cols.length === 0) {
      console.log('  ❌ Table does not exist');
    } else {
      console.log('  Columns:');
      cols.forEach(c => {
        console.log(`    - ${c.name} (${c.type})`);
      });
    }

    idx++;
    checkNext();
  });
}

checkNext();
