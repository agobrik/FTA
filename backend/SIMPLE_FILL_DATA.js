const db = require('./ultra_database');

console.log('\n🔄 VERİ DOLDURMA BAŞLIYOR...\n');

// Basit senkron yaklaşım
const systems = [
  {
    id: 1,
    possession: {
      possession_style: 'Pozisyonel Dominasyon',
      possession_target_percentage: 70,
      in_possession_shape: '2-3-2-3 Buildup Şekli',
      passing_principles: '["Sürekli üçgen oluşturma","Kısa-orta pas kombinasyonları","Pozisyonel rotasyonlar","Yarı alanlarda yoğunlaşma","Hasta regista ve pivot kullanımı"]',
      movement_principles: '["Sürekli hareket ve yer değiştirme","Boşluklara koşular","Lateral hareketler ile genişlik","False 9 düşüşleri","İçe kesen kanatlar"]',
      build_up_strategy: 'Kaleciden başlayan kısa pas oyunu. Bekler geniş açılır, pivot düşer. 3-2 buildup şekli oluşturur.',
      progression_methods: 'Hasta veya pivot üzerinden ilerleme. Yarı alanlarda overload. Ani tempo değişimleri.',
      key_players_positioning: 'Kaleci sweeper, bekler geniş, pivot düşük, 10 numara yarı alanda, false 9 mobil'
    },
    non_possession: {
      defensive_philosophy: 'Yoğun Karşı Baskı',
      pressing_philosophy: 'Top kaybından 6 saniye içinde geri kazanma',
      counter_attack_philosophy: 'Karşı atak yerine topu geri kazanıp hakimiyet',
      out_of_possession_shape: '4-1-4-1 Kompakt Blok',
      pressing_triggers: '["Rakip stoper kötü dokunuş","Rakip pivot geriye pas","Kanat beklere pas","Yan hatlarda tuzak"]',
      defensive_priorities: '["Merkezi kapatmak","Pressing koordinasyonu","Top kazanımı yüksek bölgede","Topu izole etmek","Sayısal üstünlük"]',
      regain_strategies: 'Gruplar halinde baskı. Topun etrafında koza. Yan hatlara zorlama ve tuzak kurma.',
      rest_defense: 'Her zaman en az 6 oyuncu savunmada kalır. Dengeli yapı.',
      counter_press_intensity: 'Çok Yüksek - 6 saniyelik kural'
    }
  }
];

// Possession update
db.run(`UPDATE possession_tactics SET
  possession_style = ?,
  possession_target_percentage = ?,
  in_possession_shape = ?,
  passing_principles = ?,
  movement_principles = ?,
  build_up_strategy = ?,
  progression_methods = ?,
  key_players_positioning = ?
  WHERE system_id = ?`,
[
  systems[0].possession.possession_style,
  systems[0].possession.possession_target_percentage,
  systems[0].possession.in_possession_shape,
  systems[0].possession.passing_principles,
  systems[0].possession.movement_principles,
  systems[0].possession.build_up_strategy,
  systems[0].possession.progression_methods,
  systems[0].possession.key_players_positioning,
  systems[0].id
], function(err) {
  if (err) {
    console.error('❌ Possession update hatası:', err);
  } else {
    console.log(`✅ Sistem ${systems[0].id} possession güncellendi (${this.changes} değişiklik)`);
  }

  // Non-possession update
  db.run(`UPDATE non_possession_tactics SET
    defensive_philosophy = ?,
    pressing_philosophy = ?,
    counter_attack_philosophy = ?,
    out_of_possession_shape = ?,
    pressing_triggers = ?,
    defensive_priorities = ?,
    regain_strategies = ?,
    rest_defense = ?,
    counter_press_intensity = ?
    WHERE system_id = ?`,
  [
    systems[0].non_possession.defensive_philosophy,
    systems[0].non_possession.pressing_philosophy,
    systems[0].non_possession.counter_attack_philosophy,
    systems[0].non_possession.out_of_possession_shape,
    systems[0].non_possession.pressing_triggers,
    systems[0].non_possession.defensive_priorities,
    systems[0].non_possession.regain_strategies,
    systems[0].non_possession.rest_defense,
    systems[0].non_possession.counter_press_intensity,
    systems[0].id
  ], function(err) {
    if (err) {
      console.error('❌ Non-possession update hatası:', err);
    } else {
      console.log(`✅ Sistem ${systems[0].id} non-possession güncellendi (${this.changes} değişiklik)`);
    }

    console.log('\n✅ Test tamamlandı!\n');
    db.close();
  });
});
