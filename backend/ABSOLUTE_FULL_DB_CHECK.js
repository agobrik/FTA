const db = require('./ultra_database');

console.log('═'.repeat(100));
console.log('MUTLAK KAPSAMLI VERİTABANI KONTROLÜ');
console.log('HER TABLO, HER ALAN, HER KAYIT TEK TEK KONTROL EDİLİYOR');
console.log('═'.repeat(100) + '\n');

const issues = [];
let totalFields = 0;
let checkedFields = 0;

// Tüm tabloları al
db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name", [], (err, tables) => {
  if (err) {
    console.log('HATA:', err);
    process.exit(1);
  }

  console.log(`📋 Bulunan Tablolar: ${tables.length}\n`);
  tables.forEach(t => console.log(`   • ${t.name}`));
  console.log('\n' + '═'.repeat(100) + '\n');

  let tableIndex = 0;

  function checkNextTable() {
    if (tableIndex >= tables.length) {
      finishCheck();
      return;
    }

    const tableName = tables[tableIndex].name;
    console.log(`\n[${tableIndex + 1}/${tables.length}] ${tableName.toUpperCase()} TABLOSU KONTROL EDİLİYOR...\n`);

    // Tablo yapısını al
    db.all(`PRAGMA table_info(${tableName})`, [], (err2, columns) => {
      if (err2) {
        console.log(`   HATA: ${err2.message}`);
        tableIndex++;
        checkNextTable();
        return;
      }

      // Text tipindeki kolonları bul
      const textColumns = columns.filter(c =>
        c.type.toLowerCase().includes('text') ||
        c.type.toLowerCase().includes('varchar') ||
        c.type === ''
      );

      console.log(`   Kolonlar: ${columns.length} toplam, ${textColumns.length} text kolonu`);
      textColumns.forEach(c => console.log(`      • ${c.name} (${c.type || 'TEXT'})`));

      if (textColumns.length === 0) {
        console.log(`   ⏭️  Kontrol edilecek text kolonu yok, atlıyorum.`);
        tableIndex++;
        checkNextTable();
        return;
      }

      // Tüm kayıtları al
      db.all(`SELECT * FROM ${tableName}`, [], (err3, rows) => {
        if (err3) {
          console.log(`   HATA: ${err3.message}`);
          tableIndex++;
          checkNextTable();
          return;
        }

        console.log(`   Kayıtlar: ${rows.length}\n`);

        let problemCount = 0;

        rows.forEach((row, idx) => {
          textColumns.forEach(col => {
            const value = row[col.name];
            if (value && typeof value === 'string') {
              totalFields++;
              checkedFields++;

              // Kontroller
              const problems = checkText(value, tableName, row.id || idx, col.name);
              if (problems.length > 0) {
                problemCount++;
                issues.push({
                  table: tableName,
                  id: row.id || idx,
                  column: col.name,
                  problems: problems,
                  sample: value.substring(0, 100)
                });

                if (problemCount <= 10) { // İlk 10 sorunu göster
                  console.log(`   ❌ [${tableName} #${row.id || idx}] ${col.name}:`);
                  console.log(`      Sorunlar: ${problems.join(', ')}`);
                  console.log(`      Örnek: "${value.substring(0, 80)}..."\n`);
                }
              }
            }
          });
        });

        if (problemCount === 0) {
          console.log(`   ✅ ${rows.length} kayıt temiz!`);
        } else {
          console.log(`   ❌ ${problemCount} kayıtta sorun bulundu!`);
          if (problemCount > 10) {
            console.log(`      (Sadece ilk 10 sorun gösterildi, ${problemCount - 10} sorun daha var)`);
          }
        }

        tableIndex++;
        setTimeout(checkNextTable, 10);
      });
    });
  }

  checkNextTable();
});

function checkText(text, table, id, column) {
  const problems = [];

  // Geçerli futbol terimleri ve özel isimler
  const validTerms = [
    'Gegenpressing', 'Possession', 'Wing-Back', 'wing-back', 'Inverted',
    'Defensive', 'Balanced', 'Compact', 'Diamond', 'Bus', 'False 9',
    'Guardiola', 'Klopp', 'Mourinho', 'Conte', 'Ancelotti', 'Tuchel',
    'Arteta', 'Ten Hag', 'Simeone', 'Gasperini', 'Ranieri', 'Zidane',
    'Inzaghi', 'Flick', 'Sacchi', 'Cruyff', 'Van Gaal', 'Bielsa',
    'Rangnick', 'Nagelsmann', 'Chapman', 'Pochettino', 'Zeman', 'Löw',
    'Barcelona', 'Manchester City', 'Real Madrid', 'Bayern', 'Liverpool',
    'Christmas Tree', 'False', 'WM Formation', 'Piramit'
  ];

  // Bu terimlerin içinde geçmesine izin ver
  let isValidContext = false;
  validTerms.forEach(term => {
    if (text.includes(term)) isValidContext = true;
  });

  // Basit İngilizce kelimeler (futbol terimleri hariç)
  const commonEnglish = [
    'the', 'and', 'with', 'when', 'from', 'into', 'this', 'that',
    'ball', 'player', 'make', 'very', 'can', 'will', 'about',
    'half', 'success', 'rate', 'constant', 'mirror'
  ];

  const lowerText = text.toLowerCase();

  // İngilizce kelime kontrolü
  commonEnglish.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText) && !isValidContext) {
      // Özel durumlar için ekstra kontrol
      if (word === 'half' && text.includes('halfway')) return; // "halfway line" futbol terimi
      problems.push(`İngilizce: "${word}"`);
    }
  });

  // Bozuk çeviriler
  const brokenWords = [
    'eting', 'zorlans', 'zorlad', 'agresifly', 'zamany',
    'alalçak', 'mirrorir', 'gegenbaskı', 'kanaters',
    'versiyönü', 'organizasyönü'
  ];

  brokenWords.forEach(broken => {
    if (lowerText.includes(broken)) {
      problems.push(`Bozuk kelime: "${broken}"`);
    }
  });

  // "tops" kelimesini kontrol et AMA "Topsuz", "topsuz", "topla", "topa", "top " gibi geçerli Türkçe kelimeleri hariç tut
  if (lowerText.includes('tops') &&
      !text.includes('Topsuz') && !text.includes('topsuz') &&
      !text.includes('topla') && !text.includes('topa') &&
      !text.includes('TOPA') && !text.includes('top ')) {
    problems.push(`Bozuk kelime: "tops"`);
  }

  // Eksik Türkçe karakterler (ama kelime tam olarak eşleşmeli)
  const wrongChars = [
    { wrong: 'karsi', correct: 'karşı' },
    { wrong: 'ozellikle', correct: 'özellikle' },
    { wrong: 'baski', correct: 'baskı' },
    { wrong: 'hatti', correct: 'hattı' },
    { wrong: 'bolge', correct: 'bölge' }
  ];

  wrongChars.forEach(item => {
    const regex = new RegExp(`\\b${item.wrong}\\b`, 'i');
    if (regex.test(lowerText)) {
      problems.push(`Türkçe karakter eksik: "${item.wrong}" → "${item.correct}"`);
    }
  });

  // Çok uzun İngilizce cümle kontrolü (5+ İngilizce kelime art arda)
  const englishSentencePattern = /\b(the|and|with|when|from|into|this|that|ball|player|make)\s+(the|and|with|when|from|into|this|that|ball|player|make)\s+(the|and|with|when|from|into|this|that|ball|player|make)/i;
  if (englishSentencePattern.test(text) && !isValidContext) {
    problems.push('Uzun İngilizce cümle');
  }

  return [...new Set(problems)]; // Tekrarları kaldır
}

function finishCheck() {
  console.log('\n' + '═'.repeat(100));
  console.log('MUTLAK KAPSAMLI KONTROL TAMAMLANDI!');
  console.log('═'.repeat(100) + '\n');

  console.log(`📊 İSTATİSTİKLER:`);
  console.log(`   Kontrol edilen alan sayısı: ${checkedFields}`);
  console.log(`   Sorunlu kayıt sayısı: ${issues.length}`);
  console.log(`   Temiz kayıt sayısı: ${checkedFields - issues.length}`);
  console.log(`   Başarı oranı: ${((checkedFields - issues.length) / checkedFields * 100).toFixed(2)}%\n`);

  if (issues.length === 0) {
    console.log('✅✅✅ TÜM VERİTABANI MÜKEMMEL! ✅✅✅');
    console.log('Hiçbir sorun bulunamadı.\n');
  } else {
    console.log(`❌ ${issues.length} SORUNLU ALAN BULUNDU:\n`);

    // Tabloya göre grupla
    const byTable = {};
    issues.forEach(issue => {
      if (!byTable[issue.table]) byTable[issue.table] = [];
      byTable[issue.table].push(issue);
    });

    console.log('TABLO BAZINDA SORUN DAĞILIMI:\n');
    Object.keys(byTable).sort().forEach(table => {
      console.log(`📋 ${table}: ${byTable[table].length} sorunlu alan`);
    });

    console.log('\n\nDETAYLI SORUN LİSTESİ:\n');
    Object.keys(byTable).sort().forEach(table => {
      const tableIssues = byTable[table];
      console.log(`\n${'═'.repeat(80)}`);
      console.log(`${table.toUpperCase()} - ${tableIssues.length} SORUNLU ALAN`);
      console.log('═'.repeat(80));

      tableIssues.slice(0, 20).forEach((issue, idx) => {
        console.log(`\n${idx + 1}. ID: ${issue.id}, Kolon: ${issue.column}`);
        console.log(`   Sorunlar: ${issue.problems.join(', ')}`);
        console.log(`   Örnek: "${issue.sample}..."`);
      });

      if (tableIssues.length > 20) {
        console.log(`\n   ... ve ${tableIssues.length - 20} sorun daha`);
      }
    });
  }

  console.log('\n' + '═'.repeat(100) + '\n');
  process.exit(0);
}
