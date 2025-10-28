const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('FORMASYON VE POZİSYON KATEGORİLERİ KONTROL');
console.log('═'.repeat(80) + '\n');

// 1. Tüm formasyonları grupla
console.log('[1/2] Formasyonları back line sayısına göre grupluyoruz...\n');

db.all(`
  SELECT DISTINCT formation
  FROM tactical_systems
  ORDER BY formation
`, [], (err, formations) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  console.log(`Toplam ${formations.length} farklı formasyon bulundu:\n`);

  // Back line sayısına göre kategorize et
  const formationsByBackLine = {
    '2li': [],
    '3lu': [],
    '4lu': [],
    '5li': [],
    'diger': []
  };

  formations.forEach(f => {
    const formation = f.formation;

    // İlk rakamı al (back line sayısı)
    const firstNum = formation.charAt(0);

    if (firstNum === '2') {
      formationsByBackLine['2li'].push(formation);
    } else if (firstNum === '3') {
      formationsByBackLine['3lu'].push(formation);
    } else if (firstNum === '4') {
      formationsByBackLine['4lu'].push(formation);
    } else if (firstNum === '5') {
      formationsByBackLine['5li'].push(formation);
    } else {
      formationsByBackLine['diger'].push(formation);
    }
  });

  console.log('📊 FORMASYON KATEGORİZASYONU:\n');

  Object.keys(formationsByBackLine).forEach(category => {
    if (formationsByBackLine[category].length > 0) {
      console.log(`${category.toUpperCase()} SAVUNMA HATTI (${formationsByBackLine[category].length} formasyon):`);
      formationsByBackLine[category].forEach(f => {
        console.log(`  - ${f}`);
      });
      console.log();
    }
  });

  // Her kategoride kaç sistem var?
  console.log('\n📈 KATEGORİ BAŞINA SİSTEM SAYILARI:\n');

  Object.keys(formationsByBackLine).forEach(category => {
    if (formationsByBackLine[category].length > 0) {
      const formations = formationsByBackLine[category];

      formations.forEach(formation => {
        db.get(`SELECT COUNT(*) as count FROM tactical_systems WHERE formation = ?`, [formation], (err, row) => {
          if (!err) {
            console.log(`  ${formation}: ${row.count} sistem`);
          }
        });
      });
    }
  });

  setTimeout(() => {
    checkPositions();
  }, 1000);
});

function checkPositions() {
  console.log('\n' + '═'.repeat(80));
  console.log('[2/2] Oyuncu rolleri pozisyon kategorileri...\n');

  db.all(`
    SELECT DISTINCT position
    FROM player_roles
    ORDER BY position
  `, [], (err, positions) => {
    if (err) {
      console.log('ERROR:', err);
      process.exit(1);
    }

    console.log(`Toplam ${positions.length} farklı pozisyon bulundu:\n`);

    positions.forEach(p => {
      console.log(`  - ${p.position}`);
    });

    // Her pozisyonda kaç rol var?
    console.log('\n📊 POZİSYON BAŞINA ROL SAYILARI:\n');

    positions.forEach(p => {
      db.get(`
        SELECT COUNT(*) as count
        FROM player_roles
        WHERE position = ?
      `, [p.position], (err, row) => {
        if (!err) {
          console.log(`  ${p.position}: ${row.count} rol`);
        }
      });
    });

    // Rolleri listele
    setTimeout(() => {
      console.log('\n📋 POZİSYONLARA GÖRE ROLLER:\n');

      positions.forEach(p => {
        db.all(`
          SELECT role_name, role_type
          FROM player_roles
          WHERE position = ?
          ORDER BY role_name
        `, [p.position], (err, roles) => {
          if (!err && roles.length > 0) {
            console.log(`\n${p.position.toUpperCase()}:`);
            roles.forEach(r => {
              console.log(`  - ${r.role_name} (${r.role_type})`);
            });
          }
        });
      });

      setTimeout(() => {
        console.log('\n' + '═'.repeat(80));
        console.log('✅ KONTROL TAMAMLANDI');
        console.log('═'.repeat(80) + '\n');
        process.exit(0);
      }, 2000);
    }, 1000);
  });
}
