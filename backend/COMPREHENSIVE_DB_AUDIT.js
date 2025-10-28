const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('KAPSAMLI VERİTABANI DENETİMİ');
console.log('Her sistem, her kayıt, her alan kontrol ediliyor...');
console.log('═'.repeat(80) + '\n');

const issues = [];
let totalRecordsChecked = 0;

// İngilizce kelime tespiti (futbol terimleri hariç)
const englishWords = [
  'the', 'and', 'with', 'when', 'this', 'that', 'from', 'ball', 'player',
  'make', 'play', 'time', 'very', 'can', 'will', 'about', 'into', 'your',
  'half', 'line', 'rate', 'success', 'constant', 'mirror', 'approach',
  'struggle', 'lack', 'force', 'create', 'exploit', 'exploiting'
];

// Geçerli futbol terimleri
const validTerms = [
  'Gegenpressing', 'Possession', 'Wing-Back', 'wing-back', 'Inverted',
  'Defensive', 'Balanced', 'Compact', 'Diamond', 'Bus', 'False 9'
];

// Özel isimler
const properNames = [
  'Guardiola', 'Klopp', 'Mourinho', 'Conte', 'Ancelotti', 'Tuchel',
  'Arteta', 'Ten Hag', 'Simeone', 'Gasperini', 'Ranieri', 'Zidane',
  'Inzaghi', 'Flick', 'Sacchi', 'Cruyff', 'Van Gaal', 'Bielsa',
  'Rangnick', 'Nagelsmann', 'Chapman', 'Pochettino', 'Zeman', 'Löw',
  'Valverde', 'Bosz', 'Mancini', 'Emery', 'Spalletti', 'Xavi',
  'Luis Enrique', 'Heynckes', 'Allegri', 'Sarri', 'Deschamps', 'Scaloni',
  'Slot', 'Iraola', 'Postecoglou', 'De Zerbi', 'Xabi Alonso', 'Kompany',
  'Barcelona', 'Manchester City', 'Real Madrid', 'Bayern', 'Liverpool',
  'Chelsea', 'Arsenal', 'Tottenham', 'Inter', 'Milan', 'Juventus',
  'Napoli', 'Ajax', 'RB Leipzig', 'Atletico'
];

function hasIssues(text, context) {
  if (!text) return null;

  const problems = [];
  const lowerText = text.toLowerCase();

  // İngilizce kelime kontrolü
  englishWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText)) {
      // Geçerli terim veya özel isim mi kontrol et
      let isValid = false;
      validTerms.forEach(term => {
        if (text.includes(term)) isValid = true;
      });
      properNames.forEach(name => {
        if (text.includes(name)) isValid = true;
      });

      if (!isValid) {
        problems.push(`İngilizce kelime: "${word}"`);
      }
    }
  });

  // Bozuk çeviriler
  if (text.match(/\b(tops|agresifly|zamany|inir|alalçak|mirrorir)\b/i)) {
    problems.push('Bozuk çeviri tespit edildi');
  }

  // Yanlış Türkçe karakterler
  if (text.match(/\b(karsi|ozellikle|yuksek|baski|hatti|bolge)\b/)) {
    problems.push('Türkçe karakter eksik');
  }

  // Anlamsız ifadeler
  if (text.match(/(eting|zorlans|zorlad|gegenbaskı)\b/i)) {
    problems.push('Anlamsız/yanlış kelime');
  }

  return problems.length > 0 ? problems : null;
}

console.log('PHASE 1: Tüm Taktik Sistemleri Kontrol Ediliyor...\n');

db.all('SELECT * FROM tactical_systems ORDER BY id', [], (err, systems) => {
  if (err) {
    console.log('HATA:', err);
    process.exit(1);
  }

  console.log(`Toplam ${systems.length} sistem bulundu.\n`);

  let systemIndex = 0;

  function checkNextSystem() {
    if (systemIndex >= systems.length) {
      console.log('\n' + '═'.repeat(80));
      console.log(`\nPHASE 1 TAMAMLANDI: ${systems.length} sistem kontrol edildi\n`);
      checkAllWeaknesses();
      return;
    }

    const system = systems[systemIndex];
    console.log(`[${systemIndex + 1}/${systems.length}] ${system.name} kontrol ediliyor...`);

    // Sistem alanlarını kontrol et
    const fields = [
      { name: 'in_possession_shape', value: system.in_possession_shape },
      { name: 'out_of_possession_shape', value: system.out_of_possession_shape },
      { name: 'transition_attack', value: system.transition_attack },
      { name: 'transition_defense', value: system.transition_defense },
      { name: 'corner_attack_strategy', value: system.corner_attack_strategy },
      { name: 'corner_defense_strategy', value: system.corner_defense_strategy }
    ];

    fields.forEach(field => {
      if (field.value) {
        totalRecordsChecked++;
        const problems = hasIssues(field.value, `System ${system.id} - ${field.name}`);
        if (problems) {
          issues.push({
            table: 'tactical_systems',
            id: system.id,
            name: system.name,
            field: field.name,
            problems: problems,
            sample: field.value.substring(0, 100)
          });
          console.log(`  ❌ ${field.name}: ${problems.join(', ')}`);
        }
      }
    });

    // Bu sistem için weaknesses kontrol et
    db.all('SELECT * FROM system_weaknesses WHERE system_id = ?', [system.id], (err2, weaknesses) => {
      if (!err2) {
        weaknesses.forEach(w => {
          totalRecordsChecked++;
          const descProblems = hasIssues(w.weakness_description, `Weakness ${w.id}`);
          const exploitProblems = hasIssues(w.how_to_exploit, `Weakness ${w.id}`);

          if (descProblems || exploitProblems) {
            issues.push({
              table: 'system_weaknesses',
              system_id: system.id,
              system_name: system.name,
              id: w.id,
              type: w.weakness_type,
              problems: [...(descProblems || []), ...(exploitProblems || [])],
              sample: w.weakness_description ? w.weakness_description.substring(0, 80) : ''
            });
            console.log(`  ❌ Weakness ${w.id}: ${w.weakness_type}`);
          }
        });
      }

      // Bu sistem için pressing zones kontrol et
      db.all('SELECT * FROM pressing_trap_zones WHERE system_id = ?', [system.id], (err3, zones) => {
        if (!err3) {
          zones.forEach(z => {
            totalRecordsChecked++;
            const execProblems = hasIssues(z.trap_execution, `Pressing Zone ${z.id}`);

            if (execProblems) {
              issues.push({
                table: 'pressing_trap_zones',
                system_id: system.id,
                system_name: system.name,
                id: z.id,
                name: z.trap_name,
                problems: execProblems,
                sample: z.trap_execution ? z.trap_execution.substring(0, 80) : ''
              });
              console.log(`  ❌ Pressing Zone ${z.id}: ${z.trap_name}`);
            }
          });
        }

        // Bu sistem için possession tactics kontrol et
        db.all('SELECT * FROM possession_tactics WHERE system_id = ?', [system.id], (err4, poss) => {
          if (!err4) {
            poss.forEach(p => {
              totalRecordsChecked++;
              const circProblems = hasIssues(p.circulation_patterns, `Possession ${p.id}`);
              const progProblems = hasIssues(p.progression_patterns, `Possession ${p.id}`);

              if (circProblems || progProblems) {
                issues.push({
                  table: 'possession_tactics',
                  system_id: system.id,
                  system_name: system.name,
                  id: p.id,
                  problems: [...(circProblems || []), ...(progProblems || [])],
                  sample: p.circulation_patterns ? p.circulation_patterns.substring(0, 80) : ''
                });
                console.log(`  ❌ Possession ${p.id}`);
              }
            });
          }

          // Bu sistem için non-possession tactics kontrol et
          db.all('SELECT * FROM non_possession_tactics WHERE system_id = ?', [system.id], (err5, nonposs) => {
            if (!err5) {
              nonposs.forEach(n => {
                totalRecordsChecked++;
                const defProblems = hasIssues(n.defensive_philosophy, `Non-Possession ${n.id}`);
                const pressProblems = hasIssues(n.pressing_philosophy, `Non-Possession ${n.id}`);

                if (defProblems || pressProblems) {
                  issues.push({
                    table: 'non_possession_tactics',
                    system_id: system.id,
                    system_name: system.name,
                    id: n.id,
                    problems: [...(defProblems || []), ...(pressProblems || [])],
                    sample: n.defensive_philosophy ? n.defensive_philosophy.substring(0, 80) : ''
                  });
                  console.log(`  ❌ Non-Possession ${n.id}`);
                }
              });
            }

            if (issues.filter(i => i.system_id === system.id || (i.table === 'tactical_systems' && i.id === system.id)).length === 0) {
              console.log(`  ✅ Tüm alanlar temiz`);
            }

            systemIndex++;
            setTimeout(checkNextSystem, 10); // Async işlemler için kısa bekleme
          });
        });
      });
    });
  }

  checkNextSystem();
});

function checkAllWeaknesses() {
  console.log('\nPHASE 2: Tüm System Weaknesses Kontrol Ediliyor...\n');

  db.all('SELECT COUNT(*) as total FROM system_weaknesses', [], (err, result) => {
    console.log(`Toplam ${result[0].total} weakness kaydı kontrol edildi.`);
    checkCounterTactics();
  });
}

function checkCounterTactics() {
  console.log('\nPHASE 3: Counter Tactics Kontrol Ediliyor...\n');

  db.all('SELECT * FROM counter_tactics ORDER BY id', [], (err, counters) => {
    if (err) {
      finishAudit();
      return;
    }

    counters.forEach(c => {
      totalRecordsChecked++;
      const nameProblems = hasIssues(c.counter_name, `Counter ${c.id}`);
      const stratProblems = hasIssues(c.detailed_strategy, `Counter ${c.id}`);

      if (nameProblems || stratProblems) {
        issues.push({
          table: 'counter_tactics',
          id: c.id,
          name: c.counter_name,
          problems: [...(nameProblems || []), ...(stratProblems || [])],
          sample: c.detailed_strategy ? c.detailed_strategy.substring(0, 80) : ''
        });
        console.log(`❌ Counter ${c.id}: ${c.counter_name} - ${[...(nameProblems || []), ...(stratProblems || [])].join(', ')}`);
      } else {
        console.log(`✅ Counter ${c.id}: ${c.counter_name}`);
      }
    });

    console.log(`\nToplam ${counters.length} counter tactic kontrol edildi.`);
    finishAudit();
  });
}

function finishAudit() {
  console.log('\n' + '═'.repeat(80));
  console.log('KAPSAMLI DENETİM TAMAMLANDI!');
  console.log('═'.repeat(80) + '\n');

  console.log(`📊 İSTATİSTİKLER:`);
  console.log(`   Toplam kontrol edilen kayıt: ${totalRecordsChecked}`);
  console.log(`   Sorunlu kayıt sayısı: ${issues.length}`);
  console.log(`   Temiz kayıt sayısı: ${totalRecordsChecked - issues.length}`);
  console.log(`   Başarı oranı: ${((totalRecordsChecked - issues.length) / totalRecordsChecked * 100).toFixed(2)}%\n`);

  if (issues.length === 0) {
    console.log('✅✅✅ TÜM VERİTABANI MÜKEMMEL DURUMDA! ✅✅✅');
    console.log('Hiçbir sorun bulunamadı.\n');
  } else {
    console.log(`❌ ${issues.length} SORUNLU KAYIT BULUNDU:\n`);

    // Tabloya göre grupla
    const byTable = {};
    issues.forEach(issue => {
      if (!byTable[issue.table]) byTable[issue.table] = [];
      byTable[issue.table].push(issue);
    });

    Object.keys(byTable).forEach(table => {
      console.log(`\n📋 ${table.toUpperCase()}: ${byTable[table].length} sorunlu kayıt`);
      byTable[table].forEach((issue, idx) => {
        console.log(`\n  ${idx + 1}. Kayıt ID: ${issue.id}`);
        if (issue.system_name) console.log(`     Sistem: ${issue.system_name}`);
        if (issue.name) console.log(`     İsim: ${issue.name}`);
        if (issue.field) console.log(`     Alan: ${issue.field}`);
        console.log(`     Sorunlar: ${issue.problems.join(', ')}`);
        console.log(`     Örnek: "${issue.sample}..."`);
      });
    });

    console.log('\n\nDÜZELTİLMESİ GEREKEN KAYITLARIN LİSTESİ HAZIR.');
  }

  console.log('\n' + '═'.repeat(80) + '\n');
  process.exit(0);
}
