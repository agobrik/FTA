const db = require('./ultra_database');

console.log('\n📊 TAKTİK SİSTEM VERİLERİNİ KONTROL EDİYORUZ...\n');

// 1. Tüm sistemleri getir
db.all('SELECT id, name, formation FROM tactical_systems ORDER BY id', [], (err, systems) => {
  if (err) {
    console.error('Hata:', err);
    db.close();
    return;
  }

  console.log(`✅ Toplam ${systems.length} taktik sistem bulundu.\n`);

  let completed = 0;

  systems.forEach(system => {
    // Her sistem için verileri kontrol et
    Promise.all([
      new Promise(resolve => {
        db.all('SELECT * FROM system_weaknesses WHERE system_id = ?', [system.id], (err, rows) => {
          resolve({ table: 'weaknesses', count: rows ? rows.length : 0, data: rows });
        });
      }),
      new Promise(resolve => {
        db.all('SELECT * FROM pressing_trap_zones WHERE system_id = ?', [system.id], (err, rows) => {
          resolve({ table: 'pressing_zones', count: rows ? rows.length : 0, data: rows });
        });
      }),
      new Promise(resolve => {
        db.get('SELECT * FROM possession_tactics WHERE system_id = ?', [system.id], (err, row) => {
          resolve({ table: 'possession', count: row ? 1 : 0, data: row });
        });
      }),
      new Promise(resolve => {
        db.get('SELECT * FROM non_possession_tactics WHERE system_id = ?', [system.id], (err, row) => {
          resolve({ table: 'non_possession', count: row ? 1 : 0, data: row });
        });
      })
    ]).then(results => {
      const weaknesses = results[0];
      const pressing = results[1];
      const possession = results[2];
      const nonPossession = results[3];

      const hasIssues =
        weaknesses.count === 0 ||
        pressing.count === 0 ||
        possession.count === 0 ||
        nonPossession.count === 0;

      if (hasIssues) {
        console.log(`⚠️  ${system.name} (${system.formation}) - ID: ${system.id}`);
        if (weaknesses.count === 0) console.log(`   - Zayıf Noktalar: ❌ BOŞ`);
        else console.log(`   - Zayıf Noktalar: ✅ ${weaknesses.count} kayıt`);

        if (pressing.count === 0) console.log(`   - Pressing Bölgeleri: ❌ BOŞ`);
        else console.log(`   - Pressing Bölgeleri: ✅ ${pressing.count} kayıt`);

        if (possession.count === 0) console.log(`   - Top Hakimiyeti: ❌ BOŞ`);
        else {
          // Check if data is in English
          const hasEnglish =
            (possession.data.possession_style && /^[A-Z]/.test(possession.data.possession_style)) ||
            (possession.data.in_possession_shape && /back|forward|wing/.test(possession.data.in_possession_shape));

          if (hasEnglish) {
            console.log(`   - Top Hakimiyeti: ⚠️  İNGİLİZCE`);
          } else {
            console.log(`   - Top Hakimiyeti: ✅ Var`);
          }
        }

        if (nonPossession.count === 0) console.log(`   - Topsuz Faz: ❌ BOŞ`);
        else {
          // Check if data is in English
          const hasEnglish =
            (nonPossession.data.defensive_philosophy && /pressing|block|deep/.test(nonPossession.data.defensive_philosophy)) ||
            (nonPossession.data.out_of_possession_shape && /back|compact/.test(nonPossession.data.out_of_possession_shape));

          if (hasEnglish) {
            console.log(`   - Topsuz Faz: ⚠️  İNGİLİZCE`);
          } else {
            console.log(`   - Topsuz Faz: ✅ Var`);
          }
        }
        console.log('');
      }

      completed++;
      if (completed === systems.length) {
        console.log('\n✅ Kontrol tamamlandı!\n');
        db.close();
      }
    });
  });
});
