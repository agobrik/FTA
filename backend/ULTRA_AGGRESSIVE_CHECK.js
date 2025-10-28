const db = require('./ultra_database');

console.log('═'.repeat(100));
console.log('ULTRA AGRESİF VERİTABANI TARAMASI');
console.log('HER İNGİLİZCE KELİME, HER BOZUK ÇEVİRİ, HER KARMA CÜMLE');
console.log('═'.repeat(100) + '\n');

const issues = [];
let totalChecked = 0;

// KAPSAMLI İngilizce kelime listesi
const englishWords = [
  // Temel kelimeler
  'the', 'and', 'with', 'when', 'from', 'into', 'this', 'that', 'ball', 'player',
  'make', 'very', 'can', 'will', 'about', 'half', 'success', 'rate', 'constant',
  'mirror', 'approach', 'struggle', 'lack', 'force', 'create', 'exploit',

  // Futbol eylemleri (-ing formları DAHİL)
  'crossing', 'spacing', 'timing', 'pressing', 'building', 'marking', 'tracking',
  'switching', 'overlapping', 'creating', 'finishing', 'running', 'passing',
  'defending', 'attacking', 'blocking', 'covering', 'supporting', 'positioning',
  'rotating', 'dropping', 'pushing', 'pulling', 'holding', 'winning', 'losing',
  'creating', 'exploiting', 'forcing', 'struggling', 'lacking', 'making',

  // Sıfatlar
  'quick', 'slow', 'wide', 'narrow', 'deep', 'high', 'low', 'central', 'lateral',
  'vertical', 'diagonal', 'horizontal', 'aggressive', 'passive', 'active',
  'reactive', 'compact', 'stretched', 'fluid', 'rigid', 'flexible', 'direct',
  'indirect', 'simple', 'complex', 'strong', 'weak', 'fast', 'slow',

  // Futbol terimleri (Türkçeye çevrilmeli)
  'overload', 'counter', 'target', 'build-up', 'buildup', 'press', 'block',
  'line', 'zone', 'area', 'space', 'channel', 'flank', 'wing', 'box',
  'third', 'middle', 'back', 'front', 'behind', 'ahead', 'around', 'between',

  // Diğer yaygın kelimeler
  'against', 'through', 'over', 'under', 'before', 'after', 'during', 'while',
  'until', 'since', 'because', 'if', 'then', 'than', 'more', 'less', 'most',
  'least', 'some', 'any', 'all', 'both', 'either', 'neither', 'each', 'every',
  'other', 'another', 'such', 'own', 'same', 'different', 'new', 'old', 'good',
  'bad', 'better', 'worse', 'best', 'worst', 'much', 'many', 'few', 'little',
  'long', 'short', 'near', 'far', 'early', 'late', 'hard', 'easy', 'right',
  'wrong', 'left', 'full', 'empty', 'clean', 'dirty', 'safe', 'dangerous'
];

// GEÇERLİ futbol terimleri ve özel isimler (bunlar İngilizce kalabilir)
const validTerms = [
  'Gegenpressing', 'Possession', 'Wing-Back', 'wing-back', 'Inverted', 'False',
  'Defensive', 'Balanced', 'Compact', 'Diamond', 'Bus', 'False 9', 'Tiki-taka',
  'Guardiola', 'Klopp', 'Mourinho', 'Conte', 'Ancelotti', 'Tuchel', 'Arteta',
  'Ten Hag', 'Simeone', 'Gasperini', 'Ranieri', 'Zidane', 'Inzaghi', 'Flick',
  'Sacchi', 'Cruyff', 'Van Gaal', 'Bielsa', 'Rangnick', 'Nagelsmann', 'Chapman',
  'Pochettino', 'Zeman', 'Löw', 'Valverde', 'Bosz', 'Mancini', 'Emery',
  'Spalletti', 'Xavi', 'Luis Enrique', 'Heynckes', 'Allegri', 'Sarri',
  'Deschamps', 'Scaloni', 'Slot', 'Iraola', 'Postecoglou', 'De Zerbi',
  'Xabi Alonso', 'Kompany', 'Barcelona', 'Manchester City', 'Real Madrid',
  'Bayern', 'Liverpool', 'Chelsea', 'Arsenal', 'Tottenham', 'Inter', 'Milan',
  'Juventus', 'Napoli', 'Ajax', 'RB Leipzig', 'Atletico', 'Christmas Tree',
  'WM Formation', 'Piramit'
];

// BOZUK KELİMELER
const brokenWords = [
  'eting', 'zorlans', 'zorlad', 'agresifly', 'zamany', 'inir', 'alalçak',
  'mirrorir', 'gegenbaskı', 'kanaters', 'versiyönü', 'organizasyönü',
  'pozisyönü', 'kombinasyönü', 'üzerindenload', 'loadüzerinden'
];

// Tüm tabloları ve alanlarını tara
db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", [], (err, tables) => {
  if (err) {
    console.log('HATA:', err);
    process.exit(1);
  }

  console.log(`📋 ${tables.length} tablo taranacak\n`);

  let tableIndex = 0;

  function checkNextTable() {
    if (tableIndex >= tables.length) {
      showResults();
      return;
    }

    const tableName = tables[tableIndex].name;
    console.log(`[${tableIndex + 1}/${tables.length}] ${tableName} taranıyor...`);

    db.all(`PRAGMA table_info(${tableName})`, [], (err2, columns) => {
      if (err2) {
        tableIndex++;
        checkNextTable();
        return;
      }

      const textColumns = columns.filter(c =>
        c.type.toLowerCase().includes('text') ||
        c.type.toLowerCase().includes('varchar') ||
        c.type === ''
      );

      if (textColumns.length === 0) {
        tableIndex++;
        checkNextTable();
        return;
      }

      db.all(`SELECT * FROM ${tableName}`, [], (err3, rows) => {
        if (err3) {
          tableIndex++;
          checkNextTable();
          return;
        }

        rows.forEach((row, idx) => {
          textColumns.forEach(col => {
            const value = row[col.name];
            if (value && typeof value === 'string') {
              totalChecked++;
              const problems = aggressiveCheck(value);

              if (problems.length > 0) {
                issues.push({
                  table: tableName,
                  id: row.id || idx,
                  column: col.name,
                  problems: problems,
                  sample: value.substring(0, 120)
                });
              }
            }
          });
        });

        tableIndex++;
        setTimeout(checkNextTable, 5);
      });
    });
  }

  checkNextTable();
});

function aggressiveCheck(text) {
  const problems = [];
  const lowerText = text.toLowerCase();

  // Geçerli terim mi?
  let isValidContext = false;
  validTerms.forEach(term => {
    if (text.includes(term)) isValidContext = true;
  });

  // 1. Bozuk kelimeleri kontrol et
  brokenWords.forEach(broken => {
    if (lowerText.includes(broken)) {
      problems.push(`BOZUK: "${broken}"`);
    }
  });

  // 2. İngilizce kelimeleri kontrol et (kelime sınırlarıyla)
  englishWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText)) {
      // Geçerli terim içinde mi kontrol et
      if (!isValidContext) {
        problems.push(`İNG: "${word}"`);
      } else {
        // Geçerli terimin tam içinde mi yoksa yanında mı?
        let inValidTerm = false;
        validTerms.forEach(term => {
          const termIndex = lowerText.indexOf(term.toLowerCase());
          const wordIndex = lowerText.indexOf(word.toLowerCase());
          if (termIndex >= 0 && wordIndex >= termIndex && wordIndex < termIndex + term.length) {
            inValidTerm = true;
          }
        });
        if (!inValidTerm) {
          problems.push(`İNG: "${word}"`);
        }
      }
    }
  });

  // 3. Uzun İngilizce cümle kalıpları
  if (text.match(/\b[a-z]+\s+[a-z]+\s+[a-z]+\s+[a-z]+\s+[a-z]+/i) && !isValidContext) {
    const englishCount = englishWords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lowerText)).length;
    if (englishCount >= 3) {
      problems.push('KARMA CÜMLE (3+ İngilizce kelime)');
    }
  }

  return [...new Set(problems)];
}

function showResults() {
  console.log('\n' + '═'.repeat(100));
  console.log('ULTRA AGRESİF TARAMA TAMAMLANDI!');
  console.log('═'.repeat(100) + '\n');

  console.log(`📊 İSTATİSTİKLER:`);
  console.log(`   Kontrol edilen alan: ${totalChecked}`);
  console.log(`   Sorunlu alan: ${issues.length}`);
  console.log(`   Temiz alan: ${totalChecked - issues.length}`);
  console.log(`   Başarı oranı: ${((totalChecked - issues.length) / totalChecked * 100).toFixed(2)}%\n`);

  if (issues.length === 0) {
    console.log('✅✅✅ MÜKEMMEL! HİÇBİR SORUN YOK! ✅✅✅\n');
  } else {
    console.log(`❌ ${issues.length} SORUNLU ALAN BULUNDU\n`);

    // Tabloya göre grupla
    const byTable = {};
    issues.forEach(issue => {
      if (!byTable[issue.table]) byTable[issue.table] = [];
      byTable[issue.table].push(issue);
    });

    console.log('TABLO BAZINDA DAĞILIM:\n');
    Object.keys(byTable).sort((a, b) => byTable[b].length - byTable[a].length).forEach(table => {
      console.log(`📋 ${table}: ${byTable[table].length} sorun`);
    });

    console.log('\n\nİLK 50 SORUN DETAYLI:\n');
    issues.slice(0, 50).forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.table} #${issue.id}] ${issue.column}`);
      console.log(`   Sorunlar: ${issue.problems.join(', ')}`);
      console.log(`   Örnek: "${issue.sample}..."`);
      console.log();
    });

    if (issues.length > 50) {
      console.log(`\n... ve ${issues.length - 50} sorun daha\n`);
    }
  }

  console.log('═'.repeat(100) + '\n');
  process.exit(0);
}
