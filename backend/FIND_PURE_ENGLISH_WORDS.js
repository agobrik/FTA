const db = require('./ultra_database');

console.log('SAFI İNGİLİZCE KELİMELERİ BULMA\n');
console.log('Sadece tam İngilizce kelimeleri arıyoruz (overload, crossing, etc.)...\n');

const issues = [];

// Yaygın İngilizce kelimeler ki Türkçe'de olmamalı
const englishWords = [
  'overload', 'crossing', 'spacing', 'timing', 'pressing', 'building',
  'marking', 'tracking', 'switching', 'overlapping', 'creating', 'finishing',
  'running', 'passing', 'defending', 'attacking', 'blocking', 'covering',
  'supporting', 'positioning', 'rotating', 'dropping', 'pushing', 'pulling',
  'holding', 'winning', 'losing', 'counter', 'target', 'direct', 'quick',
  'slow', 'wide', 'narrow', 'deep', 'high', 'low', 'central', 'wide',
  'lateral', 'vertical', 'diagonal', 'horizontal', 'aggressive', 'passive',
  'active', 'reactive', 'compact', 'stretched', 'fluid', 'rigid', 'flexible'
];

// Ama bunlar geçerli futbol terimleri
const validTerms = [
  'Gegenpressing', 'Possession', 'Wing-Back', 'Inverted', 'Defensive',
  'Balanced', 'Diamond', 'Compact', 'pressing', 'Guardiola', 'Klopp',
  'Mourinho', 'Conte', 'Ancelotti', 'False', 'Bus', 'counter-press',
  'Gegenpressing', 'counter-attack'
];

db.all('SELECT * FROM possession_tactics', [], (err1, poss) => {
  if (!err1) {
    poss.forEach(row => {
      ['overload_patterns', 'passing_principles', 'movement_principles', 'spacing_principles', 'timing_principles', 'circulation_patterns'].forEach(field => {
        const text = row[field];
        if (text && typeof text === 'string') {
          englishWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            if (regex.test(text)) {
              // Geçerli terim mi kontrol et
              let isValid = false;
              validTerms.forEach(term => {
                if (text.toLowerCase().includes(term.toLowerCase())) {
                  if (text.toLowerCase().indexOf(term.toLowerCase()) <= text.toLowerCase().indexOf(word) &&
                      text.toLowerCase().indexOf(term.toLowerCase()) + term.length >= text.toLowerCase().indexOf(word)) {
                    isValid = true;
                  }
                }
              });

              if (!isValid) {
                issues.push({
                  table: 'possession_tactics',
                  id: row.id,
                  field: field,
                  word: word,
                  context: text.substring(0, 150)
                });
              }
            }
          });
        }
      });
    });
  }

  db.all('SELECT * FROM non_possession_tactics', [], (err2, nonposs) => {
    if (!err2) {
      nonposs.forEach(row => {
        ['defensive_philosophy', 'pressing_philosophy', 'how_to_press', 'pressing_traps'].forEach(field => {
          const text = row[field];
          if (text && typeof text === 'string') {
            englishWords.forEach(word => {
              const regex = new RegExp(`\\b${word}\\b`, 'i');
              if (regex.test(text)) {
                let isValid = false;
                validTerms.forEach(term => {
                  if (text.toLowerCase().includes(term.toLowerCase())) {
                    if (text.toLowerCase().indexOf(term.toLowerCase()) <= text.toLowerCase().indexOf(word) &&
                        text.toLowerCase().indexOf(term.toLowerCase()) + term.length >= text.toLowerCase().indexOf(word)) {
                      isValid = true;
                    }
                  }
                });

                if (!isValid) {
                  issues.push({
                    table: 'non_possession_tactics',
                    id: row.id,
                    field: field,
                    word: word,
                    context: text.substring(0, 150)
                  });
                }
              }
            });
          }
        });
      });
    }

    showResults();
  });
});

function showResults() {
  console.log('═'.repeat(80));
  console.log('SAF İNGİLİZCE KELİME TARAMASI TAMAMLANDI');
  console.log('═'.repeat(80) + '\n');

  if (issues.length === 0) {
    console.log('✅ Saf İngilizce kelime bulunamadı!');
  } else {
    console.log(`❌ ${issues.length} SAF İNGİLİZCE KELİME BULUNDU:\n`);

    // Kelimeye göre grupla
    const byWord = {};
    issues.forEach(issue => {
      if (!byWord[issue.word]) byWord[issue.word] = [];
      byWord[issue.word].push(issue);
    });

    Object.keys(byWord).sort((a, b) => byWord[b].length - byWord[a].length).forEach(word => {
      console.log(`\n"${word}": ${byWord[word].length} kullanım\n`);
      byWord[word].slice(0, 3).forEach((issue, idx) => {
        console.log(`  ${idx + 1}. [${issue.table} #${issue.id}] ${issue.field}`);
        console.log(`     "${issue.context}..."`);
      });
      if (byWord[word].length > 3) {
        console.log(`     ... ve ${byWord[word].length - 3} yer daha`);
      }
    });
  }

  console.log('\n' + '═'.repeat(80) + '\n');
  process.exit(0);
}
