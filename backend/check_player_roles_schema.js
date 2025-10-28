const ultraDb = require('./ultra_database');

console.log('📋 PLAYER_ROLES TABLO ŞEMASI\n');

ultraDb.all("PRAGMA table_info(player_roles)", [], (err, columns) => {
  if (err) {
    console.error('Hata:', err);
    ultraDb.close();
    return;
  }

  console.log('PLAYER_ROLES KOLONLARI:\n');
  columns.forEach(col => {
    console.log(`  - ${col.name} (${col.type})`);
  });

  ultraDb.close();
});
