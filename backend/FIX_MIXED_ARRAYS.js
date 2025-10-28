const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('KARMA JSON ARRAY TEMİZLİĞİ');
console.log('"İngilizce - Türkçe" formatını temizliyoruz');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

// Tüm tabloları ve JSON içeren alanları tara
db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  console.log(`${rows.length} tactical_system kaydı işleniyor...\n`);

  let processed = 0;
  rows.forEach(row => {
    // key_principles JSON array'i "English - Turkish" formatında
    let keyPrinciples = row.key_principles;

    if (keyPrinciples && keyPrinciples.includes(' - ')) {
      try {
        const parsed = JSON.parse(keyPrinciples);
        const cleaned = parsed.map(item => {
          // "English - Turkish" formatını temizle
          if (typeof item === 'string' && item.includes(' - ')) {
            const parts = item.split(' - ');
            // Eğer 2 parça varsa ve ilk parça İngilizce görünüyorsa, sadece Türkçe kısmını al
            if (parts.length === 2) {
              // İkinci kısım Türkçe gibi görünüyor mu? (Türkçe karakter veya daha uzun)
              const turkish = parts[1].trim();
              if (turkish.length > 5 || turkish.match(/[ığüşöçİĞÜŞÖÇ]/)) {
                return turkish;
              }
            }
          }
          return item;
        });

        keyPrinciples = JSON.stringify(cleaned, null, 0);
      } catch (e) {
        // JSON parse hatası, dokunma
      }
    }

    // Benzer şekilde diğer JSON alanları
    let strengths = row.strengths;
    if (strengths && strengths.includes(' - ')) {
      try {
        const parsed = JSON.parse(strengths);
        const cleaned = parsed.map(item => {
          if (typeof item === 'string' && item.includes(' - ')) {
            const parts = item.split(' - ');
            if (parts.length === 2) {
              const turkish = parts[1].trim();
              if (turkish.length > 5 || turkish.match(/[ığüşöçİĞÜŞÖÇ]/)) {
                return turkish;
              }
            }
          }
          return item;
        });
        strengths = JSON.stringify(cleaned, null, 0);
      } catch (e) {}
    }

    let weaknesses = row.weaknesses;
    if (weaknesses && weaknesses.includes(' - ')) {
      try {
        const parsed = JSON.parse(weaknesses);
        const cleaned = parsed.map(item => {
          if (typeof item === 'string' && item.includes(' - ')) {
            const parts = item.split(' - ');
            if (parts.length === 2) {
              const turkish = parts[1].trim();
              if (turkish.length > 5 || turkish.match(/[ığüşöçİĞÜŞÖÇ]/)) {
                return turkish;
              }
            }
          }
          return item;
        });
        weaknesses = JSON.stringify(cleaned, null, 0);
      } catch (e) {}
    }

    // Güncelle
    db.run(
      `UPDATE tactical_systems SET key_principles=?, strengths=?, weaknesses=? WHERE id=?`,
      [keyPrinciples, strengths, weaknesses, row.id],
      (err2) => {
        if (!err2) fixed++;
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${fixed} tactical_system kaydı güncellendi`);
          processPlayerRoles();
        }
      }
    );
  });
});

function processPlayerRoles() {
  console.log('\nPlayer roles işleniyor...\n');

  db.all('SELECT * FROM player_roles', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      finish();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      // primary_duties, secondary_duties, etc. JSON arrays
      const fields = ['primary_duties', 'secondary_duties', 'defensive_duties', 'attacking_duties'];
      const updates = {};

      fields.forEach(field => {
        let value = row[field];
        if (value && value.includes(' - ')) {
          try {
            const parsed = JSON.parse(value);
            const cleaned = parsed.map(item => {
              if (typeof item === 'string' && item.includes(' - ')) {
                const parts = item.split(' - ');
                if (parts.length === 2) {
                  const turkish = parts[1].trim();
                  if (turkish.length > 5 || turkish.match(/[ığüşöçİĞÜŞÖÇ]/)) {
                    return turkish;
                  }
                }
              }
              return item;
            });
            value = JSON.stringify(cleaned, null, 0);
          } catch (e) {}
        }
        updates[field] = value;
      });

      db.run(
        `UPDATE player_roles SET primary_duties=?, secondary_duties=?, defensive_duties=?, attacking_duties=? WHERE id=?`,
        [updates.primary_duties, updates.secondary_duties, updates.defensive_duties, updates.attacking_duties, row.id],
        (err2) => {
          if (!err2) fixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${fixed} toplam (player_roles dahil)`);
            finish();
          }
        }
      );
    });
  });
}

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${fixed} KAYIT TEMİZLENDİ!`);
  console.log('\nŞimdi rastgele bir sistem tekrar kontrol edelim:');
  console.log('═'.repeat(80) + '\n');

  db.get('SELECT name, key_principles FROM tactical_systems WHERE id=5', [], (_, r) => {
    console.log(`Sistem: ${r.name}`);
    console.log(`Prensipler: ${r.key_principles.substring(0, 200)}...`);
    console.log('\n✅ Artık tamamen Türkçe olmalı!\n');
    process.exit(0);
  });
}
