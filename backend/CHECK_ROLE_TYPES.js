const db = require('./ultra_database');

console.log('Role types kontrol ediliyor...\n');

db.all(`
  SELECT position, role_type, COUNT(*) as count
  FROM player_roles
  WHERE position = 'GK'
  GROUP BY role_type
  ORDER BY role_type
`, [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err.message);
    process.exit(1);
  }

  console.log('GK pozisyonu için role_type\'lar:\n');

  if (!rows || rows.length === 0) {
    console.log('❌ Hiç kayıt bulunamadı!');
  } else {
    rows.forEach(r => {
      console.log(`  role_type: "${r.role_type}" - ${r.count} adet`);
    });
  }

  // Tüm role_type değerlerini kontrol et
  console.log('\n\nTüm player_roles tablosu role_type\'ları:\n');

  db.all(`
    SELECT DISTINCT role_type, COUNT(*) as count
    FROM player_roles
    GROUP BY role_type
    ORDER BY role_type
  `, [], (err2, rows2) => {
    if (err2) {
      console.log('ERROR:', err2.message);
      process.exit(1);
    }

    rows2.forEach(r => {
      const displayType = r.role_type === null ? 'NULL' : r.role_type === '' ? 'EMPTY STRING' : r.role_type;
      console.log(`  "${displayType}": ${r.count} adet`);
    });

    // Sample kayıt
    console.log('\n\nGK pozisyonundan 3 örnek kayıt:\n');
    db.all(`SELECT id, role_name, position, role_type FROM player_roles WHERE position = 'GK' LIMIT 3`, [], (err3, rows3) => {
      if (!err3 && rows3) {
        rows3.forEach(r => {
          console.log(`  ID: ${r.id}, Name: ${r.role_name}, Position: ${r.position}, Type: "${r.role_type || 'NULL'}"`);
        });
      }
      process.exit(0);
    });
  });
});
