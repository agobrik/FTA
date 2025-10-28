const db = require('./ultra_database');

console.log('\n🔄 SİSTEM 79-88 İÇİN VERİ DOLDURMA...\n');

const systems = [];
for(let id = 79; id <= 88; id++) {
  systems.push({
    id,
    possession: {
      possession_style: 'Modern Taktik Sistemi',
      in_possession_shape: 'Esnek Pozisyonel Yapı',
      passing_principles: '["Akıllı pas seçimi","Pozisyonel oyun","Tempo kontrolü","Yaratıcı kombinasyonlar","Modern futbol"]',
      movement_principles: '["Dinamik hareketler","Pozisyon rotasyonları","Boşluk yaratma","Akıllı koşular","Sürekli destek"]',
      progression_patterns: 'Modern buildup. Orta saha kontrol. Yaratıcı ilerleme. Forvet hattına etkili servis. Güncel taktik prensipler.',
      circulation_patterns: 'Tempo kontrolü orta sahadan. Beklerle top dolaşımı. Yaratıcı çıkışlar. Dengeli sirk ülasyon.',
      overload_patterns: 'Pozisyonel üstünlükler. Yarı alan yoğunlaşması. Kanat beklerle overload. Final üçlü tehdit.'
    },
    non_possession: {
      defensive_philosophy: 'Organize Modern Savunma',
      pressing_philosophy: 'Akıllı baskı yaklaşımı',
      counter_attack_philosophy: 'Hızlı geçiş ve etkili karşı atak',
      out_of_possession_shape: 'Kompakt Blok',
      pressing_triggers: '["Rakip hata","Stratejik anlar","Yan hatta fırsat","Durum okuma"]',
      where_to_press: 'Esnek baskı bölgeleri. Yüksek veya orta blok. Kompakt organizasyon.',
      when_to_press: 'Akıllı fırsat değerlendirme. Hata anında. Maç durumuna göre.',
      how_to_press: 'Forvet akıllı baskı. Orta saha pas yolu kesme. Defans sağlam. Grup organizasyonu.',
      pressing_traps: 'Yan hatta üstünlük. Orta saha kıskacı. Stratejik baskı noktaları.'
    },
    pressing_zones: [
      {
        trap_name: 'Yüksek Baskı',
        trap_zone: 'Rakip yarı saha',
        trap_trigger: 'Rakip stopere pas',
        trap_setup: 'Forvet yüksek. Orta saha pas yolları. Defans destek.',
        trap_execution: 'Forvet bastırır. Orta saha pas yolu keser. Grup baskısı top kazanımı.',
        player_roles_involved: 'Forvet (ön baskı), Orta Saha (pas yolu), Defans (destek)',
        success_rate_high_against: 'Kısa buildup yapan, teknik zayıf, baskı altında zayıf',
        success_rate_low_against: 'Uzun top oynayan, baskıya alışık, kaliteli buildup'
      },
      {
        trap_name: 'Orta Saha Kontrolü',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Orta saha kompakt. Forvet destek. Defans arkada.',
        trap_execution: 'Orta saha grup baskısı. Pas yolu kapama. Sayısal denge kontrol.',
        player_roles_involved: 'Orta Saha (ana baskı), Forvet (destek), Defans (arka)',
        success_rate_high_against: 'Orta saha zayıf, pivot bağımlı sistemler',
        success_rate_low_against: 'Orta saha kaliteli, sayısal üstünlük yapan'
      },
      {
        trap_name: 'Kompakt Blok',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip final üçlüye yaklaştığında',
        trap_setup: 'Defans + orta saha kompakt. Forvet geri döner. İki hat dar.',
        trap_execution: 'Kompakt blok savunması. Alan kapama. Pas yolu kesme. Grup organizasyon.',
        player_roles_involved: 'Defans (ana), Orta Saha (destek), Forvet (geri dönüş)',
        success_rate_high_against: 'Uzun top, bireysel bağımlı, ceza sahası dışı vuruş',
        success_rate_low_against: 'Hızlı kombinasyon, overload iyi, hareket oyunu mükemmel'
      }
    ]
  });
}

let completed = 0;

systems.forEach(system => {
  db.run(`UPDATE possession_tactics SET
    possession_style = ?,
    in_possession_shape = ?,
    passing_principles = ?,
    movement_principles = ?,
    progression_patterns = ?,
    circulation_patterns = ?,
    overload_patterns = ?
    WHERE system_id = ?`,
  [
    system.possession.possession_style,
    system.possession.in_possession_shape,
    system.possession.passing_principles,
    system.possession.movement_principles,
    system.possession.progression_patterns,
    system.possession.circulation_patterns,
    system.possession.overload_patterns,
    system.id
  ], function(possErr) {
    if (possErr) console.error(`❌ ${system.id} possession:`, possErr.message);
    else console.log(`✅ Sistem ${system.id} possession güncellendi`);

    db.run(`UPDATE non_possession_tactics SET
      defensive_philosophy = ?,
      pressing_philosophy = ?,
      counter_attack_philosophy = ?,
      out_of_possession_shape = ?,
      pressing_triggers = ?,
      where_to_press = ?,
      when_to_press = ?,
      how_to_press = ?,
      pressing_traps = ?
      WHERE system_id = ?`,
    [
      system.non_possession.defensive_philosophy,
      system.non_possession.pressing_philosophy,
      system.non_possession.counter_attack_philosophy,
      system.non_possession.out_of_possession_shape,
      system.non_possession.pressing_triggers,
      system.non_possession.where_to_press,
      system.non_possession.when_to_press,
      system.non_possession.how_to_press,
      system.non_possession.pressing_traps,
      system.id
    ], function(nonErr) {
      if (nonErr) console.error(`❌ ${system.id} non-possession:`, nonErr.message);
      else console.log(`✅ Sistem ${system.id} non-possession güncellendi`);

      db.run(`DELETE FROM pressing_trap_zones WHERE system_id = ?`, [system.id], function() {
        let insertedZones = 0;
        system.pressing_zones.forEach(zone => {
          db.run(`INSERT INTO pressing_trap_zones
            (system_id, trap_name, trap_zone, trap_trigger, trap_setup, trap_execution, player_roles_involved, success_rate_high_against, success_rate_low_against)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            system.id, zone.trap_name, zone.trap_zone, zone.trap_trigger, zone.trap_setup,
            zone.trap_execution, zone.player_roles_involved, zone.success_rate_high_against,
            zone.success_rate_low_against
          ], function() {
            insertedZones++;
            if (insertedZones === system.pressing_zones.length) {
              console.log(`✅ Sistem ${system.id} ${insertedZones} zone eklendi`);
              completed++;
              if (completed === systems.length) {
                console.log(`\n🎉 TÜM EK SİSTEMLER (79-88) TAMAMLANDI!\n`);
                db.close();
              }
            }
          });
        });
      });
    });
  });
});
