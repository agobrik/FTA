const db = require('./ultra_database');

console.log('=== SON 4 INGILIZCE KAYDI DUZELTILIYOR ===\n');

// Counter Tactics ID 4 - TAMAMEN TURKCE
const counter4 = {
  counter_name: 'Geniş Alanları İstismar Et + Hızlı Taraf Değişimi',
  detailed_strategy: 'YENİ KONTRA 2024. Bek orta sahaya girdiğinde, o kanatta devasa alan açılır. O alanı hızlı kanat oyuncusu artı örtüşen bek ile aşırı yükle (stoper karşı 2v1). İzole kanada hızlı taraf değişimleri yap. Son derece etkili.',
  when_to_apply: 'Karşı 3-2 oyun kurma kullandığında ve bekler dar konumlandığında'
};

// Counter Tactics ID 6 - TAMAMEN TURKCE
const counter6 = {
  counter_name: 'Kanatları Aşırı Yükle 2v1 + İçe',
  detailed_strategy: 'Bek sistemleri geçişlerde kanatlarda savunmasız. 2v1 aşırı yüklenmesi yarat: senin kanat oyuncun + bekin onların bekine karşı. Ayrıca bekler öne çıktığında iç koridorları istismar et.',
  when_to_apply: '3-5-2, 3-4-3 veya 5-3-2 gibi bek sistemlerine karşı'
};

// Non-Possession Tactics - "Park The Bus" düzeltmesi
console.log('1. Counter Tactics ID 4 ve 6 duzeltiliyor...');

db.run(
  `UPDATE counter_tactics
   SET counter_name = ?,
       detailed_strategy = ?,
       when_to_apply = ?
   WHERE id = 4`,
  [counter4.counter_name, counter4.detailed_strategy, counter4.when_to_apply],
  function(err) {
    if (err) console.log('  ERROR ID 4:', err.message);
    else console.log('  ✅ Counter Tactic ID 4 guncellendi');

    db.run(
      `UPDATE counter_tactics
       SET counter_name = ?,
           detailed_strategy = ?,
           when_to_apply = ?
       WHERE id = 6`,
      [counter6.counter_name, counter6.detailed_strategy, counter6.when_to_apply],
      function(err) {
        if (err) console.log('  ERROR ID 6:', err.message);
        else console.log('  ✅ Counter Tactic ID 6 guncellendi');

        console.log('\n2. Non-Possession Tactics "Park The Bus" duzeltiliyor...');

        db.run(
          `UPDATE non_possession_tactics
           SET defensive_philosophy = REPLACE(defensive_philosophy, 'Park The Bus', 'Otobüs Koy')
           WHERE defensive_philosophy LIKE '%Park The Bus%'`,
          [],
          function(err) {
            if (err) console.log('  ERROR:', err.message);
            else console.log(`  ✅ ${this.changes} kayit guncellendi`);

            console.log('\n=== ✅ TÜM İNGİLİZCE KAYITLAR TEMİZLENDİ! ===\n');
            process.exit(0);
          }
        );
      }
    );
  }
);
