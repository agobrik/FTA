const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('46 SORUNLU KAYDI DÜZELTME');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

// FIX 1: Corner stratejilerindeki İngilizce edatlar
console.log('1/5: Corner stratejilerindeki İngilizce edatları düzelt...\n');

db.run(`
  UPDATE tactical_systems
  SET
    corner_attack_strategy = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      corner_attack_strategy,
      ' and ', ' ve '),
      ' into ', ' içine '),
      ' from ', ' den '),
      'runners from deep', 'derinlerden koşanlar'),
      'Mix of ', 'Karışım: '),
    corner_defense_strategy = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      corner_defense_strategy,
      ' with ', ' ile '),
      ' and ', ' ve '),
      'Zonal with', 'Alan ile'),
      'man-marking', 'adam adama'),
      'organized', 'organize')
  WHERE corner_attack_strategy LIKE '%and%'
     OR corner_attack_strategy LIKE '%into%'
     OR corner_attack_strategy LIKE '%from%'
     OR corner_defense_strategy LIKE '%with%'
     OR corner_defense_strategy LIKE '%and%'
`, [], function(err) {
  if (err) console.log('ERROR:', err.message);
  else {
    console.log(`✅ ${this.changes} corner strategy düzeltildi`);
    fixed += this.changes;
  }

  // FIX 2: "gegenbaskıing" bozuk kelimesini düzelt
  console.log('\n2/5: "gegenbaskıing" bozuk kelimesini düzelt...\n');

  db.run(`
    UPDATE non_possession_tactics
    SET
      defensive_philosophy = REPLACE(defensive_philosophy, 'gegenbaskıing', 'Gegenpressing'),
      pressing_philosophy = REPLACE(pressing_philosophy, 'gegenbaskıing', 'Gegenpressing')
    WHERE defensive_philosophy LIKE '%gegenbaskıing%'
       OR pressing_philosophy LIKE '%gegenbaskıing%'
  `, [], function(err2) {
    if (err2) console.log('ERROR:', err2.message);
    else {
      console.log(`✅ ${this.changes} non-possession tactic düzeltildi`);
      fixed += this.changes;
    }

    // FIX 3: System Weaknesses'teki "eting" gibi bozuk kelimeleri düzelt
    console.log('\n3/5: System Weaknesses sorunlarını düzelt...\n');

    // ID 13, 23, 86, 118 - Manuel düzelt
    const weaknessFixes = [
      {
        id: 13,
        type: 'Yaratıcılık Eksikliği',
        desc: '5-3-2 Mourinho Bus defansif/kontra stili organize olmuş alçak bloklara karşı zorlanabilir.',
        exploit: 'Organize alçak blok savunma kur. Alan verme. Uzak şutları zorla. Sabırlı ol ve hataları bekle.'
      },
      {
        id: 23,
        type: 'Yaratıcılık Eksikliği',
        desc: '4-1-4-1 Simeone Defensive defansif/kontra stili organize olmuş alçak bloklara karşı zorlanabilir.',
        exploit: 'Organize alçak blok savunma kur. Sabırlı olarak maçı kontrol et. Uzak şutları zorla. Hataları bekle.'
      },
      {
        id: 86,
        type: 'Yaratıcılık Eksikliği',
        desc: '4-2-3-1 Deschamps France World Cup 2018 defansif/kontra stili organize olmuş alçak bloklara karşı zorlanabilir.',
        exploit: 'Organize alçak blok savunma kur. Alan verme. Sabırlı oyun oyna. Uzak şutları zorla.'
      },
      {
        id: 118,
        type: 'Yaratıcılık Eksikliği',
        desc: '4-4-2 Simeone Atletico Modern 2024 defansif/kontra stili organize olmuş alçak bloklara karşı zorlanabilir.',
        exploit: 'Organize alçak blok savunma kur. Alan verme. Uzak şutları zorla. Sabırlı ol ve hataları bekle.'
      }
    ];

    let weaknessProcessed = 0;
    weaknessFixes.forEach(w => {
      db.run(
        `UPDATE system_weaknesses
         SET weakness_type = ?,
             weakness_description = ?,
             how_to_exploit = ?
         WHERE id = ?`,
        [w.type, w.desc, w.exploit, w.id],
        function(err3) {
          if (!err3 && this.changes > 0) {
            fixed++;
          }
          weaknessProcessed++;
          if (weaknessProcessed === weaknessFixes.length) {
            console.log(`✅ ${weaknessFixes.length} weakness düzeltildi`);

            // FIX 4: WM Formation kayıtlarındaki "half-back", "inside forvet" terimlerini düzelt
            console.log('\n4/5: WM Formation terimlerini düzelt...\n');

            // "half-back" ve "inside forvet" spesifik WM Formation terimleridir, Türkçeye uyarlanabilir
            db.run(`
              UPDATE pressing_trap_zones
              SET
                trap_name = REPLACE(trap_name, 'Half-back', 'Ara bek'),
                trap_execution = REPLACE(REPLACE(REPLACE(
                  trap_execution,
                  'Half-back', 'Ara bek'),
                  'half-back', 'ara bek'),
                  'Inside forvet', 'İç forvet')
              WHERE system_id = 25
            `, [], function(err4) {
              if (err4) console.log('ERROR:', err4.message);
              else {
                console.log(`✅ ${this.changes} pressing zone düzeltildi`);
                fixed += this.changes;
              }

              db.run(`
                UPDATE possession_tactics
                SET
                  circulation_patterns = REPLACE(REPLACE(
                    circulation_patterns,
                    'half-back', 'ara bek'),
                    'inside forvet', 'iç forvet')
                WHERE system_id = 25
              `, [], function(err5) {
                if (err5) console.log('ERROR:', err5.message);
                else {
                  console.log(`✅ ${this.changes} possession tactic düzeltildi`);
                  fixed += this.changes;
                }

                db.run(`
                  UPDATE non_possession_tactics
                  SET defensive_philosophy = REPLACE(defensive_philosophy, 'half', 'yarı')
                  WHERE system_id = 25 AND defensive_philosophy LIKE '%half%'
                `, [], function(err6) {
                  if (err6) console.log('ERROR:', err6.message);
                  else {
                    console.log(`✅ ${this.changes} non-possession tactic düzeltildi`);
                    fixed += this.changes;
                  }

                  // FIX 5: Counter Tactic #5 - Tam yeniden yaz
                  console.log('\n5/5: Counter Tactic #5 tamamen yeniden yazılıyor...\n');

                  const counter5 = {
                    counter_name: 'Genişlik + Orta + Sabır',
                    detailed_strategy: 'Sabırlı sahiplik %60+. Sahanın tüm genişliğini kullan, bekler ve kanatlar çok geniş açılsın. Sürekli orta yap, hedef adam ve ikinci top için saldırganlar kutuda olsun. Hasta ol, anlamsız topları kaybet.',
                    when_to_apply: 'Derin savunan takımlara karşı. Bekler saldırıya katılabilen takımlar için.'
                  };

                  db.run(
                    `UPDATE counter_tactics
                     SET counter_name = ?,
                         detailed_strategy = ?,
                         when_to_apply = ?
                     WHERE id = 5`,
                    [counter5.counter_name, counter5.detailed_strategy, counter5.when_to_apply],
                    function(err7) {
                      if (err7) console.log('ERROR:', err7.message);
                      else {
                        console.log(`✅ Counter tactic #5 düzeltildi`);
                        fixed++;
                      }

                      // FINAL
                      console.log('\n' + '═'.repeat(80));
                      console.log(`\n✅ TOPLAM ${fixed} DÜZELTME YAPILDI!\n`);
                      console.log('═'.repeat(80) + '\n');
                      process.exit(0);
                    }
                  );
                });
              });
            });
          }
        }
      );
    });
  });
});
