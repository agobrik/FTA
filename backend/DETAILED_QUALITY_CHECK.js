const db = require('./ultra_database');

console.log('═'.repeat(100));
console.log('DETAYLI KALİTE KONTROLÜ - GERÇEK ÖRNEKLERLE');
console.log('═'.repeat(100) + '\n');

const issues = {
  clearEnglish: [],      // Açık İngilizce kelimeler
  mixedSentences: [],    // Karma İngilizce-Türkçe cümleler
  brokenWords: [],       // Bozuk kelimeler
  acceptable: []         // Kabul edilebilir futbol terimleri
};

// Kabul edilebilir futbol terimleri
const acceptableTerms = [
  'Gegenpressing', 'Possession', 'Wing-Back', 'False', 'Bus', 'Tiki-taka',
  'Guardiola', 'Klopp', 'Mourinho', 'Total Football', 'Treble', 'Christmas Tree'
];

// Kabul EDİLEMEZ genel İngilizce kelimeler
const unacceptableWords = [
  'pressing', 'high', 'low', 'block', 'deep', 'line', 'space', 'narrow',
  'wide', 'zone', 'area', 'channel', 'flank', 'edge', 'box', 'third',
  'the', 'and', 'with', 'when', 'from', 'into', 'back', 'front',
  'through', 'around', 'behind', 'between', 'quick', 'slow', 'direct',
  'central', 'lateral', 'vertical', 'aggressive', 'compact', 'stretched',
  'dropping', 'pushing', 'pulling', 'holding', 'covering', 'tracking',
  'counter', 'target', 'buildup', 'build-up'
];

let totalChecked = 0;

// Her tablo için detaylı örnekler topla
function checkTable(tableName, fields, callback) {
  db.all(`SELECT * FROM ${tableName} LIMIT 200`, [], (err, rows) => {
    if (err || !rows || rows.length === 0) {
      callback();
      return;
    }

    console.log(`\n[${tableName.toUpperCase()}] ${rows.length} kayıt kontrol ediliyor...`);

    rows.forEach(row => {
      fields.forEach(field => {
        const text = row[field];
        if (text && typeof text === 'string') {
          totalChecked++;

          // Kabul edilemez İngilizce kelimeleri ara
          unacceptableWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            if (regex.test(text)) {
              // Kabul edilebilir terim içinde mi kontrol et
              let inAcceptableTerm = false;
              acceptableTerms.forEach(term => {
                if (text.toLowerCase().includes(word.toLowerCase()) &&
                    text.includes(term)) {
                  const termIndex = text.indexOf(term);
                  const wordIndex = text.toLowerCase().indexOf(word.toLowerCase());
                  if (wordIndex >= termIndex && wordIndex < termIndex + term.length) {
                    inAcceptableTerm = true;
                  }
                }
              });

              if (!inAcceptableTerm) {
                issues.clearEnglish.push({
                  table: tableName,
                  id: row.id,
                  field: field,
                  word: word,
                  sample: text.substring(0, 100)
                });
              }
            }
          });

          // Uzun İngilizce cümle kontrolü (5+ art arda İngilizce kelime)
          const words = text.toLowerCase().split(/\s+/);
          let englishStreak = 0;
          words.forEach(w => {
            if (unacceptableWords.includes(w.replace(/[,.!?]/g, ''))) {
              englishStreak++;
              if (englishStreak >= 3) {
                issues.mixedSentences.push({
                  table: tableName,
                  id: row.id,
                  field: field,
                  sample: text.substring(0, 120)
                });
                englishStreak = 0; // Sadece bir kez ekle
              }
            } else {
              englishStreak = 0;
            }
          });
        }
      });
    });

    callback();
  });
}

// Sırayla tabloları kontrol et
checkTable('tactical_systems', ['philosophy', 'key_principles', 'strengths', 'weaknesses'], () => {
  checkTable('player_roles', ['description', 'detailed_explanation', 'tactical_purpose'], () => {
    checkTable('non_possession_tactics', ['defensive_philosophy', 'pressing_philosophy', 'how_to_press'], () => {
      checkTable('possession_tactics', ['progression_patterns', 'passing_principles', 'movement_principles'], () => {
        checkTable('system_weaknesses', ['weakness_description', 'how_to_exploit'], () => {
          checkTable('pressing_trap_zones', ['trap_execution'], () => {
            checkTable('counter_tactics', ['detailed_strategy'], () => {
              showResults();
            });
          });
        });
      });
    });
  });
});

function showResults() {
  console.log('\n' + '═'.repeat(100));
  console.log('DETAYLI KALİTE KONTROLÜ SONUÇLARI');
  console.log('═'.repeat(100) + '\n');

  console.log(`📊 Kontrol edilen alan: ${totalChecked}`);
  console.log(`❌ Kabul edilemez İngilizce: ${issues.clearEnglish.length} adet`);
  console.log(`❌ Karma cümleler: ${issues.mixedSentences.length} adet\n`);

  // En yaygın sorunlu kelimeler
  const wordCounts = {};
  issues.clearEnglish.forEach(issue => {
    wordCounts[issue.word] = (wordCounts[issue.word] || 0) + 1;
  });

  console.log('EN YAYGIN SORUNLU KELİMELER:\n');
  Object.keys(wordCounts)
    .sort((a, b) => wordCounts[b] - wordCounts[a])
    .slice(0, 20)
    .forEach(word => {
      console.log(`  "${word}": ${wordCounts[word]} kullanım`);
    });

  // Gerçek örnekler göster
  console.log('\n\nGERÇEK SORUN ÖRNEKLERİ (İlk 20):\n');
  console.log('═'.repeat(100) + '\n');

  issues.clearEnglish.slice(0, 20).forEach((issue, idx) => {
    console.log(`${idx + 1}. [${issue.table} #${issue.id}] ${issue.field}`);
    console.log(`   Sorunlu kelime: "${issue.word}"`);
    console.log(`   Örnek: "${issue.sample}..."`);
    console.log();
  });

  if (issues.mixedSentences.length > 0) {
    console.log('\nKARMA CÜMLE ÖRNEKLERİ (İlk 10):\n');
    issues.mixedSentences.slice(0, 10).forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.table} #${issue.id}] ${issue.field}`);
      console.log(`   "${issue.sample}..."`);
      console.log();
    });
  }

  // Final değerlendirme
  console.log('═'.repeat(100));
  console.log('\nFİNAL DEĞERLENDİRME:\n');

  const totalIssues = issues.clearEnglish.length + issues.mixedSentences.length;
  const cleanRate = ((totalChecked - totalIssues) / totalChecked * 100).toFixed(2);

  if (totalIssues === 0) {
    console.log('✅✅✅ MÜKEMMEL! Kabul edilemez İngilizce kelime YOK!');
  } else if (totalIssues < 100) {
    console.log(`⚠️  ${totalIssues} kabul edilemez İngilizce kullanım var`);
    console.log(`   Temizlik oranı: %${cleanRate}`);
    console.log('   → Küçük düzeltmeler yapılabilir');
  } else if (totalIssues < 500) {
    console.log(`❌ ${totalIssues} kabul edilemez İngilizce kullanım var`);
    console.log(`   Temizlik oranı: %${cleanRate}`);
    console.log('   → Orta seviye düzeltme gerekli');
  } else {
    console.log(`❌❌ ${totalIssues} kabul edilemez İngilizce kullanım var`);
    console.log(`   Temizlik oranı: %${cleanRate}`);
    console.log('   → KAPSAMLI düzeltme gerekli!');
  }

  console.log('\n' + '═'.repeat(100) + '\n');
  process.exit(0);
}
