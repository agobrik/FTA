const db = require('./ultra_database');

console.log('BOZUK BİRLEŞİK KELİMELERİ BULMA\n');
console.log('Latin harflerle (a-z) biten veya başlayan Türkçe kelimeleri arıyoruz...\n');

const issues = [];

// Tüm text içerikli alanları tara
const queries = [
  { table: 'possession_tactics', fields: ['overload_patterns', 'passing_principles', 'movement_principles', 'circulation_patterns'] },
  { table: 'non_possession_tactics', fields: ['defensive_philosophy', 'pressing_philosophy', 'how_to_press'] },
  { table: 'tactical_systems', fields: ['philosophy', 'tactical_instructions', 'key_principles'] },
  { table: 'player_roles', fields: ['description', 'detailed_explanation', 'tactical_purpose'] }
];

let processed = 0;

function checkNextTable(index) {
  if (index >= queries.length) {
    showResults();
    return;
  }

  const q = queries[index];
  db.all(`SELECT id, ${q.fields.join(', ')} FROM ${q.table}`, [], (err, rows) => {
    if (err) {
      console.log(`ERROR in ${q.table}:`, err.message);
      processed++;
      checkNextTable(index + 1);
      return;
    }

    rows.forEach(row => {
      q.fields.forEach(field => {
        const text = row[field];
        if (text && typeof text === 'string') {
          // Bozuk birleşik kelimeleri ara
          const patterns = [
            /[ığüşöçİĞÜŞÖÇ][a-z]{3,}/g,  // Türkçe harf + Latin harfler (üzerindenload gibi)
            /[a-z]{3,}[ığüşöçİĞÜŞÖÇ]/g,  // Latin harfler + Türkçe harf (loadüzerinden gibi)
            /\b[a-z]+load\b/gi,           // ...load
            /\bover[a-z]+\b/gi,           // over...
            /\b[a-z]+ing\b/gi             // ...ing biten kelimeler
          ];

          patterns.forEach((pattern, idx) => {
            const matches = text.match(pattern);
            if (matches) {
              matches.forEach(match => {
                // Geçerli futbol terimlerini ve özel isimleri atla
                if (match.match(/Gegenpressing|Possession|Wing|Inverted|Balanced|Defensive|Diamond|Guardiola|Klopp|Mourinho/i)) {
                  return;
                }

                // Geçerli Türkçe kelimeleri atla
                if (match.match(/^(ile|den|içine|zaman|çok|için)$/i)) {
                  return;
                }

                issues.push({
                  table: q.table,
                  id: row.id,
                  field: field,
                  broken: match,
                  context: text.substring(Math.max(0, text.indexOf(match) - 30), text.indexOf(match) + match.length + 30)
                });
              });
            }
          });
        }
      });
    });

    processed++;
    checkNextTable(index + 1);
  });
}

function showResults() {
  console.log('\n' + '═'.repeat(80));
  console.log(`BOZUK BİRLEŞİK KELİME TARAMASI TAMAMLANDI`);
  console.log('═'.repeat(80) + '\n');

  if (issues.length === 0) {
    console.log('✅ Bozuk birleşik kelime bulunamadı!');
  } else {
    console.log(`❌ ${issues.length} BOZUK BİRLEŞİK KELİME BULUNDU:\n`);

    // Tabloya göre grupla
    const byTable = {};
    issues.forEach(issue => {
      if (!byTable[issue.table]) byTable[issue.table] = [];
      byTable[issue.table].push(issue);
    });

    Object.keys(byTable).forEach(table => {
      console.log(`\n📋 ${table.toUpperCase()}: ${byTable[table].length} sorun\n`);
      byTable[table].slice(0, 10).forEach((issue, idx) => {
        console.log(`${idx + 1}. ID: ${issue.id}, Alan: ${issue.field}`);
        console.log(`   Bozuk: "${issue.broken}"`);
        console.log(`   Bağlam: "...${issue.context}..."`);
        console.log();
      });

      if (byTable[table].length > 10) {
        console.log(`   ... ve ${byTable[table].length - 10} sorun daha\n`);
      }
    });
  }

  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}

checkNextTable(0);
