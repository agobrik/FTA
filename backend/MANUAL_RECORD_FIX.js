const db = require('./ultra_database');

console.log('=== MANUEL KAYIT DÜZELTMELERİ ===\n');
console.log('Sorunlu kayıtlar TAMAMEN TÜRKÇE olarak yeniden yazılıyor...\n');

// WEAKNESS ID 10 - Mourinho Defensive
const weakness10 = {
  weakness_type: 'Yaratıcılık Eksikliği',
  weakness_description: '4-2-3-1 Mourinho Defensive defansif/kontra stili organize olmuş alçak bloklara karşı zorlanabilir.',
  how_to_exploit: 'Organize alçak blok savunma kur. Alan verme. Uzak şutları zorla. Sabırlı ol ve hataları bekle. Mourinho\'nun defansif yaklaşımını yansıt.'
};

// COUNTER TACTIC ID 3
const counter3 = {
  counter_name: 'Arkaya Toplar + Aşırı Hız',
  detailed_strategy: 'Basit ama son derece etkili. Tekrar tekrar uzun topları aşırı yüksek savunma hattının arkasına oyna. Hızlı forvetlerin sürekli koşular yapmasını sağla. Koşuları ofsayt tuzağını atlatmak için mükemmel zamanla. Çok yüksek başarı oranı.',
  when_to_apply: 'Rakip çok yüksek savunma hattı kullanırken'
};

// COUNTER TACTIC ID 1
const counter1 = {
  counter_name: 'Ultra-Kompakt Alçak Blok + Hızlı Kontra',
  detailed_strategy: 'Ultra kompakt 4-4-2 veya 5-4-1 ile otobüs koy. Tüm alanları kapat. Sürekli baskıyı em. Hız ile patlayıcı kontra atak yap. İnanılmaz disiplin gerektirir.',
  when_to_apply: 'Kalite olarak önemli ölçüde güç farkı varken. Büyük maçlarda elit sahiplik takımlarına karşı.'
};

// COUNTER TACTIC ID 2
const counter2 = {
  counter_name: 'Baskı Üzerinden Uzun Toplar + Hedef Adam',
  detailed_strategy: 'Yüksek baskıyı direkt uzun toplarla tamamen atla. Hedef adam topu tutar ve diğerlerini oyuna katar. Kaleci baskı altındayken asla kısa oynama.',
  when_to_apply: 'Yüksek baskı yapan takımlara karşı. Güçlü hedef adama sahipken.'
};

let totalUpdated = 0;

console.log('1. Weakness ID 10 düzeltiliyor...');

db.run(
  `UPDATE system_weaknesses
   SET weakness_type = ?,
       weakness_description = ?,
       how_to_exploit = ?
   WHERE id = 10`,
  [weakness10.weakness_type, weakness10.weakness_description, weakness10.how_to_exploit],
  function(err) {
    if (err) console.log('ERROR:', err.message);
    else {
      console.log(`✅ Weakness ID 10 güncellendi`);
      totalUpdated++;
    }

    console.log('\n2. Counter Tactics (ID 1, 2, 3) düzeltiliyor...');

    db.run(
      `UPDATE counter_tactics
       SET counter_name = ?,
           detailed_strategy = ?,
           when_to_apply = ?
       WHERE id = 1`,
      [counter1.counter_name, counter1.detailed_strategy, counter1.when_to_apply],
      function(err2) {
        if (err2) console.log('ERROR ID 1:', err2.message);
        else {
          console.log(`✅ Counter Tactic ID 1 güncellendi`);
          totalUpdated++;
        }

        db.run(
          `UPDATE counter_tactics
           SET counter_name = ?,
               detailed_strategy = ?,
               when_to_apply = ?
           WHERE id = 2`,
          [counter2.counter_name, counter2.detailed_strategy, counter2.when_to_apply],
          function(err3) {
            if (err3) console.log('ERROR ID 2:', err3.message);
            else {
              console.log(`✅ Counter Tactic ID 2 güncellendi`);
              totalUpdated++;
            }

            db.run(
              `UPDATE counter_tactics
               SET counter_name = ?,
                   detailed_strategy = ?,
                   when_to_apply = ?
               WHERE id = 3`,
              [counter3.counter_name, counter3.detailed_strategy, counter3.when_to_apply],
              function(err4) {
                if (err4) console.log('ERROR ID 3:', err4.message);
                else {
                  console.log(`✅ Counter Tactic ID 3 güncellendi`);
                  totalUpdated++;
                }

                // Tüm weaknesses'lerdeki "mourinho" kelimesini düzelt
                console.log('\n3. Tüm kayıtlardaki "mourinho" -> "Mourinho" düzeltiliyor...');

                db.run(
                  `UPDATE system_weaknesses
                   SET weakness_description = REPLACE(weakness_description, 'mourinho', 'Mourinho'),
                       how_to_exploit = REPLACE(how_to_exploit, 'mourinho', 'Mourinho')
                   WHERE weakness_description LIKE '%mourinho%' OR how_to_exploit LIKE '%mourinho%'`,
                  [],
                  function(err5) {
                    if (err5) console.log('ERROR:', err5.message);
                    else {
                      console.log(`✅ ${this.changes} kayıtta "Mourinho" düzeltildi`);
                      totalUpdated += this.changes;
                    }

                    // Diğer isim düzeltmeleri
                    db.run(
                      `UPDATE tactical_systems
                       SET in_possession_shape = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
                         in_possession_shape,
                         'guardiola', 'Guardiola'),
                         'klopp', 'Klopp'),
                         'conte', 'Conte'),
                         'mourinho', 'Mourinho'),
                         'ancelotti', 'Ancelotti'),
                         'arteta', 'Arteta')
                       WHERE in_possession_shape LIKE '%guardiola%'
                          OR in_possession_shape LIKE '%klopp%'
                          OR in_possession_shape LIKE '%mourinho%'`,
                      [],
                      function(err6) {
                        if (err6) console.log('ERROR:', err6.message);
                        else {
                          console.log(`✅ ${this.changes} tactical system'de isimler düzeltildi`);
                          totalUpdated += this.changes;
                        }

                        console.log('\n' + '═'.repeat(70));
                        console.log(`\n✅ TOPLAM ${totalUpdated} MANUEL DÜZELTME YAPILDI!\n`);
                        console.log('═'.repeat(70) + '\n');
                        process.exit(0);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);
