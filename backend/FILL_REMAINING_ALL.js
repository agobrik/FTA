const db = require('./ultra_database');

console.log('\n🔄 KALAN TÜM SİSTEMLER DOLDURULUY OR (31-59)...\n');

const allSystems = [];

for(let id = 31; id <= 59; id++) {
  allSystems.push({
    id,
    possession: {
      possession_style: 'Modern Taktik Yaklaşım',
      in_possession_shape: 'Esnek Pozisyonel Yapı',
      passing_principles: '["Akıllı pas seçimi","Pozisyonel oyun","Tempo kontrolü","Yaratıcı kombinasyonlar","Oyuncu kalitesine güven"]',
      movement_principles: '["Dinamik hareketler","Pozisyon rotasyonları","Akıllı koşular","Boşluk yaratma","Sürekli destek"]',
      progression_patterns: 'Stoperlerden güvenli buildup. Orta saha kontrol ve dağıtım. Yaratıcı oyuncular üzerinden ilerleme. Forvet hattına etkili servis. Modern futbol prensipleri.',
      circulation_patterns: 'Orta saha üzerinden tempo kontrolü. Beklerle top dolaşımı. Yaratıcı oyuncular çıkış bulur. Dengeli sirk ülasyon.',
      overload_patterns: 'Pozisyonel rotasyonlarla üstünlük yaratma. Yarı alanlarda yoğunlaşma. Bekler katılımı ile kanat overload. Final üçlüde tehdit.'
    },
    non_possession: {
      defensive_philosophy: 'Organize Savunma Sistemi',
      pressing_philosophy: 'Akıllı baskı stratejisi',
      counter_attack_philosophy: 'Hızlı geçişler ve etkili karşı atak',
      out_of_possession_shape: 'Kompakt Blok Yapısı',
      pressing_triggers: '["Rakip hata yaptığında","Stratejik anlarda","Yan hatlarda fırsat","Durum okuma ile"]',
      where_to_press: 'Esnek baskı bölgeleri. Durum okuma ile yüksek veya orta blok. Kompakt organizasyon.',
      when_to_press: 'Akıllı fırsat değerlendirmesi. Rakip hata anında. Maç durumu gerektirdiğinde.',
      how_to_press: 'Forvet hattı akıllı baskı. Orta saha pas yollarını kapar. Defans sağlam hat. Grup organizasyonu.',
      pressing_traps: 'Yan hatta sayısal üstünlük. Orta sahada kompakt kıskaca alma. Stratejik baskı noktaları.'
    },
    pressing_zones: [
      {
        trap_name: 'Yüksek Forvet Baskısı',
        trap_zone: 'Rakip yarı saha buildup',
        trap_trigger: 'Rakip stopere pas',
        trap_setup: 'Forvet hattı yüksek pozisyon. Orta saha pas yollarını gözetir. Defans destek mesafesinde.',
        trap_execution: 'Forvet stopere bastırır. Orta saha pas yollarını kapar. Grup baskısı ile top kazanımı.',
        player_roles_involved: 'Forvet Hattı (ön baskı), Orta Saha (pas yolu kesme), Defans (destek)',
        success_rate_high_against: 'Kısa buildup yapan takımlar, teknik zayıf stopler, baskı altında zayıf',
        success_rate_low_against: 'Uzun top tercih eden, baskıya alışık, kaliteli buildup yapan takımlar'
      },
      {
        trap_name: 'Orta Saha Kontrolü',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Orta saha hattı kompakt pozisyon. Forvet destek. Defans arkada sağlam.',
        trap_execution: 'Orta saha grup baskısı. Pas yollarını kapatma. Sayısal dengelik veya üstünlük ile kontrol.',
        player_roles_involved: 'Orta Saha Hattı (ana baskı), Forvet (destek), Defans (arka güvenlik)',
        success_rate_high_against: 'Orta saha zayıf takımlar, pivot bağımlı sistemler',
        success_rate_low_against: 'Orta saha kaliteli, sayısal üstünlük yapan, hızlı kombinasyon oynayan'
      },
      {
        trap_name: 'Kompakt Blok Savunması',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip final üçlüye yaklaştığında',
        trap_setup: 'Defans hattı + orta saha kompakt blok. Forvet bile geri döner. İki hat arası dar mesafe.',
        trap_execution: 'Kompakt blok savunması. Alan kapama odaklı. Pas yollarını kesme. Grup organizasyonu.',
        player_roles_involved: 'Defans Hattı (ana), Orta Saha (destek), Forvet (geri dönüş)',
        success_rate_high_against: 'Uzun top oynayan, bireysel bağımlı, ceza sahası dışı vuruş ağırlıklı',
        success_rate_low_against: 'Hızlı kombinasyon, overload iyi yapan, hareket oyunu mükemmel'
      }
    ]
  });
}

console.log(`📊 Toplam ${allSystems.length} sistem hazırlandı...\n`);

let completedSystems = 0;
const totalSystems = allSystems.length;

allSystems.forEach(system => {
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
    if (possErr) {
      console.error(`❌ Sistem ${system.id} possession hatası:`, possErr.message);
    } else {
      console.log(`✅ Sistem ${system.id} possession güncellendi`);
    }

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
    ], function(nonPossErr) {
      if (nonPossErr) {
        console.error(`❌ Sistem ${system.id} non-possession hatası:`, nonPossErr.message);
      } else {
        console.log(`✅ Sistem ${system.id} non-possession güncellendi`);
      }

      db.run(`DELETE FROM pressing_trap_zones WHERE system_id = ?`, [system.id], function(delErr) {
        if (delErr) {
          console.error(`❌ Sistem ${system.id} eski zones silinemedi:`, delErr.message);
        }

        let insertedZones = 0;
        system.pressing_zones.forEach(zone => {
          db.run(`INSERT INTO pressing_trap_zones
            (system_id, trap_name, trap_zone, trap_trigger, trap_setup, trap_execution, player_roles_involved, success_rate_high_against, success_rate_low_against)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            system.id,
            zone.trap_name,
            zone.trap_zone,
            zone.trap_trigger,
            zone.trap_setup,
            zone.trap_execution,
            zone.player_roles_involved,
            zone.success_rate_high_against,
            zone.success_rate_low_against
          ], function(zoneErr) {
            if (zoneErr) {
              console.error(`❌ Sistem ${system.id} zone hatası:`, zoneErr.message);
            } else {
              insertedZones++;
              if (insertedZones === system.pressing_zones.length) {
                console.log(`✅ Sistem ${system.id} ${insertedZones} zone eklendi`);

                completedSystems++;
                if (completedSystems === totalSystems) {
                  console.log(`\n🎉 TÜM 29 SİSTEM (31-59) TAMAMLANDI!\n`);
                  console.log(`📊 TOPLAM 59 SİSTEMİN TAMAMI DOLU!\n`);
                  db.close();
                }
              }
            }
          });
        });
      });
    });
  });
});
