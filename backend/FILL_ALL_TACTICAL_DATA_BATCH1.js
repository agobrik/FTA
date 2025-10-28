const db = require('./ultra_database');

console.log('\n🔄 TAKTİK VERİLERİ DOLDURMA - BATCH 1 (İLK 10 SİSTEM)...\n');

// İlk 10 popüler sistem için tam veri doldurma
const systemsData = [
  {
    // ID 1: Guardiola Possession
    id: 1,
    possession: {
      possession_style: 'Pozisyonel Dominasyon',
      possession_target_percentage: 70,
      in_possession_shape: '2-3-2-3 Buildup Şekli',
      passing_principles: JSON.stringify([
        'Sürekli üçgen oluşturma',
        'Kısa-orta pas kombinasyonları',
        'Pozisyonel rotasyonlar',
        'Yarı alanlarda yoğunlaşma',
        'Hasta regista ve pivot kullanımı'
      ]),
      movement_principles: JSON.stringify([
        'Sürekli hareket ve yer değiştirme',
        'Boşluklara koşular',
        'Lateral hareketler ile genişlik',
        'False 9 düşüşleri',
        'İçe kesen kanatlar'
      ]),
      build_up_strategy: 'Kaleciden başlayan kısa pas oyunu. Bekler geniş açılır, pivot düşer. 3-2 buildup şekli oluşturur.',
      progression_methods: 'Hasta veya pivot üzerinden ilerleme. Yarı alanlarda overload. Ani tempo değişimleri.',
      key_players_positioning: 'Kaleci sweeper, bekler geniş, pivot düşük, 10 numara yarı alanda, false 9 mobil'
    },
    non_possession: {
      defensive_philosophy: 'Yoğun Karşı Baskı',
      pressing_philosophy: 'Top kaybından 6 saniye içinde geri kazanma',
      counter_attack_philosophy: 'Karşı atak yerine topu geri kazanıp hakimiyet',
      out_of_possession_shape: '4-1-4-1 Kompakt Blok',
      pressing_triggers: JSON.stringify([
        'Rakip stoper kötü dokunuş',
        'Rakip pivot geriye pas',
        'Kanat beklere pas',
        'Yan hatlarda tuzak'
      ]),
      defensive_priorities: JSON.stringify([
        'Merkezi kapatmak',
        'Pressing koordinasyonu',
        'Top kazanımı yüksek bölgede',
        'Topu izole etmek',
        'Sayısal üstünlük'
      ]),
      regain_strategies: 'Gruplar halinde baskı. Topun etrafında koza. Yan hatlara zorlama ve tuzak kurma.',
      rest_defense: 'Her zaman en az 6 oyuncu savunmada kalır. Dengeli yapı.',
      counter_press_intensity: 'Çok Yüksek - 6 saniyelik kural'
    },
    pressing_zones: [
      {
        zone_name: 'Rakip Kaleci Baskısı',
        zone_type: 'Yüksek Baskı',
        description: 'Rakip kaleciye kadar baskı. Kısa pas zorla.',
        intensity: 'Çok Yüksek',
        trigger_conditions: 'Kaleciye geri pas. Forvet anında bas.',
        player_responsibilities: 'Forvet kaleciye, kanatlar beklere, orta saha merkezî kapatır',
        success_metrics: 'Top kazanımı ceza sahası civarında',
        common_mistakes: 'Takım uzamaz ise forvet izole kalır'
      },
      {
        zone_name: 'Stoper Baskı Tuzağı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Stoperlere pas geldiğinde ani baskı',
        intensity: 'Yüksek',
        trigger_conditions: 'Stoper topa sahip. Pivot pas yolunu kapatır, forvet bas.',
        player_responsibilities: 'Forvet stoper baskısı, kanatlar kanat bekleri kapat, orta saha pivot önler',
        success_metrics: 'Stoperde top kaybı veya uzun top zorla',
        common_mistakes: 'Orta saha pivot pas yolunu kapatmazsa etkisiz'
      },
      {
        zone_name: 'Yarı Alan Tuzağı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Yarı alanlarda sayısal üstünlük ile tuzak',
        intensity: 'Yüksek',
        trigger_conditions: 'Rakip kanat bek veya orta saha yarı alanda top',
        player_responsibilities: '3-4 oyuncu yarı alanda çember, diğerleri çıkış pas yolları kapat',
        success_metrics: 'Yarı alanda top kazanımı',
        common_mistakes: 'Çember gevşekse rakip sıyrılır'
      },
      {
        zone_name: 'Kanat Baskısı',
        zone_type: 'Kanat Baskısı',
        description: 'Rakibi kanatlara zorla, orada kalabalığa al',
        intensity: 'Yüksek',
        trigger_conditions: 'Rakip top kanatta. Merkezi kapat, kanata zorla.',
        player_responsibilities: 'Kanat oyuncu bas, bek destek, orta saha içe kay',
        success_metrics: 'Kanatta top kazanımı veya aut',
        common_mistakes: 'Orta saha içe kaymazsa geri pas yolu açık'
      }
    ]
  },
  {
    // ID 2: Klopp Gegenpressing
    id: 2,
    possession: {
      possession_style: 'Dikey Hızlı Oyun',
      possession_target_percentage: 55,
      in_possession_shape: '4-3-3 Asimetrik',
      passing_principles: JSON.stringify([
        'Dikey paslar öncelikli',
        'Hızlı tempo',
        'Risk alma cesareti',
        'Az dokunuş',
        'Direk ilerleme'
      ]),
      movement_principles: JSON.stringify([
        'Derinliğe sürekli koşular',
        'Arkaya koşular',
        'Fullback overlapping',
        'Kanat içe kesme',
        'Mobil forvet hareketleri'
      ]),
      build_up_strategy: 'Kaleciden hızlı ve direkt. Orta sahayı atla. Forvet hattına erken top.',
      progression_methods: 'Dikey paslar, fullback koşuları, derinlik pasları. Az pas ile hızlı ilerleme.',
      key_players_positioning: 'Fullback yüksek, kanatlar geniş, 8\'ler box-to-box, forvet mobil'
    },
    non_possession: {
      defensive_philosophy: 'Yoğun Gegenpressing',
      pressing_philosophy: 'Top kaybı anında ani ve yoğun baskı - 8 saniyelik kural',
      counter_attack_philosophy: 'Hızlı vertikal kontra - az pas maksimum hız',
      out_of_possession_shape: '4-3-3 Yüksek Kompakt',
      pressing_triggers: JSON.stringify([
        'Top kaybından hemen sonra',
        'Rakip kötü ilk dokunuş',
        'Geriye pas',
        'Kanat bölgelerinde top'
      ]),
      defensive_priorities: JSON.stringify([
        'Top kazanımı 8 saniyede',
        'Yüksek bölgede kazanma',
        'Rakibi hataya zorla',
        'Yoğun grup baskısı',
        'Hızlı geçiş'
      ]),
      regain_strategies: 'Topu kaybeden etrafında 4-5 oyuncu hemen çember oluşturur. Yoğun grup baskısı.',
      rest_defense: 'Yüksek hat, kompakt yapı. Savunma ile hücum arası 30-40m.',
      counter_press_intensity: 'Maksimum - Gegenpressing'
    },
    pressing_zones: [
      {
        zone_name: 'Hemen Gegenpressing',
        zone_type: 'Karşı Baskı',
        description: 'Top kaybından sonraki ilk 8 saniye - maksimum yoğunluk',
        intensity: 'Maksimum',
        trigger_conditions: 'Top kaybı anı. Tüm yakın oyuncular bas.',
        player_responsibilities: 'Top kaybı civarındaki 4-5 oyuncu anında çember, diğerleri pas yolları kapat',
        success_metrics: '8 saniyede top geri kazanma veya rakip baskı altında hata',
        common_mistakes: 'Herkes basarsa arka boşluklar açılır'
      },
      {
        zone_name: 'Yüksek Hat Baskısı',
        zone_type: 'Yüksek Baskı',
        description: 'Rakip stoperlere yüksek hat baskısı',
        intensity: 'Çok Yüksek',
        trigger_conditions: 'Rakip stoper topa sahip. Forvet hattı anında bas.',
        player_responsibilities: 'Forvet üçlüsü stoperlere ve pivota bas, orta saha kanat bekler kapat',
        success_metrics: 'Yüksek bölgede top kazanımı',
        common_mistakes: 'Savunma hattı takip etmezse uzun toplarla arkası boşalır'
      },
      {
        zone_name: 'Kanat Tuzağı',
        zone_type: 'Kanat Baskısı',
        description: 'Rakibi kanatlara zorla ve orada yoğun bas',
        intensity: 'Yüksek',
        trigger_conditions: 'Top kanatta. Fullback ve kanat oyuncu birlikte bas.',
        player_responsibilities: 'Kanat ve fullback sandwich, 8 numara destek, diğerleri içe',
        success_metrics: 'Kanatta top kazanımı',
        common_mistakes: 'Sandwich zamanlaması kötüyse rakip sıyrılır'
      },
      {
        zone_name: 'Orta Saha İkileme',
        zone_type: 'Orta Saha Baskısı',
        description: 'Rakip orta sahaya çift adam',
        intensity: 'Yüksek',
        trigger_conditions: 'Rakip orta saha oyuncusu topa sahip',
        player_responsibilities: '8 numaralar agresif bas, 6 numara destek',
        success_metrics: 'Orta sahada sayısal üstünlük ve top kazanımı',
        common_mistakes: '8\'ler çok ileri giderse 6 numara izole kalır'
      }
    ]
  },
  {
    // ID 7: Tuchel Compact
    id: 7,
    possession: {
      possession_style: 'Kontrollü Sabırlı',
      possession_target_percentage: 58,
      in_possession_shape: '3-4-2-1 Geniş Wing-back',
      passing_principles: JSON.stringify([
        'Sabırlı buildup',
        'Güvenli pas seçenekleri',
        'Minimal risk',
        'Yan ve geri paslar kabul edilebilir',
        'Ani tempo değişimi'
      ]),
      movement_principles: JSON.stringify([
        'Wing-backler genişlik sağlar',
        'İki 10 numara boşluklarda',
        'Forvet mobil düşüşler',
        'Stoperlerin topla ilerlemesi',
        'Simetrik yapı'
      ]),
      build_up_strategy: 'Üçlü savunmadan sabırlı buildup. Wing-backler genişlik, iki 10 numara ara bölgede.',
      progression_methods: 'Sabırlı paslaşma, wing-back koşuları, ani tempo değişimi, 10 numaralardan ara paslar.',
      key_players_positioning: 'Üçlü stoper geniş, wing-backler yan hatlarda, iki 10 ara bölgede, tek forvet'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt Orta Blok',
      pressing_philosophy: 'Seçici pressing - tuzak kurma',
      counter_attack_philosophy: 'Kontrollü geçiş - wing-backler kritik',
      out_of_possession_shape: '5-4-1 Ultra Kompakt',
      pressing_triggers: JSON.stringify([
        'Rakip kanatlarda',
        'Rakip pivot geriye pas',
        'Wing-backlere pas',
        'Zayıf ayak kullanımı'
      ]),
      defensive_priorities: JSON.stringify([
        'Kompaktlık korumak',
        'Merkezi kapatmak',
        'Rakibi kanatlara zorlamak',
        'Sayısal üstünlük yaratmak',
        'Organize blok'
      ]),
      regain_strategies: 'Rakibi kanatlara zorla, orada kalabalık oluştur, pas yollarını kes.',
      rest_defense: '5-4-1 kompakt blok. Hatlar arası minimum mesafe.',
      counter_press_intensity: 'Orta - Seçici'
    },
    pressing_zones: [
      {
        zone_name: 'Orta Blok Kompakt',
        zone_type: 'Orta Saha Blok',
        description: 'Merkezi kapalı kompakt blok, rakibi kanatlara zorla',
        intensity: 'Orta',
        trigger_conditions: 'Rakip orta sahanın kendi yarısında',
        player_responsibilities: '5-4-1 kompakt, merkezi kapat, kanata zorla',
        success_metrics: 'Rakip merkez geçemiyor, kanatlara zorlanıyor',
        common_mistakes: 'Çok derin durulursa rakip rahat buildup yapar'
      },
      {
        zone_name: 'Kanat Tuzağı',
        zone_type: 'Kanat Baskısı',
        description: 'Rakip kanatlara geldiğinde ani kalabalık',
        intensity: 'Yüksek',
        trigger_conditions: 'Top kanatta. Wing-back ve kanat baskı.',
        player_responsibilities: 'Wing-back bas, kanat yardım, stoper destek, merkez kapalı kal',
        success_metrics: 'Kanatta top kazanımı veya geri pas zorla',
        common_mistakes: 'Diğer taraf wing-back çok ileriyse karşı kanat boş'
      }
    ]
  },
  {
    // ID 9: Arteta Inverted FB
    id: 9,
    possession: {
      possession_style: 'Pozisyonel Kontrol',
      possession_target_percentage: 65,
      in_possession_shape: '3-2-5 Inverted FB Yapısı',
      passing_principles: JSON.stringify([
        'Üçgen ve elmas oluşturma',
        'Inverted bek pivot oluşturur',
        'Yarı alanlarda aşırı yükleme',
        'Kısa-orta kombinasyonlar',
        'Ani tempo değişimleri'
      ]),
      movement_principles: JSON.stringify([
        'Inverted bek merkeze kayar',
        'Kanat bekler yüksek ve geniş',
        'İçe kesen kanatlar',
        'Üçüncü adam koşuları',
        'Rotasyonel hareketler'
      ]),
      build_up_strategy: 'Inverted bek düşerek 3-2 buildup oluşturur. Sayısal üstünlük ile ilerleme.',
      progression_methods: 'Üçüncü adam pasları, yarı alanlarda overload, sudden vertical pas, kanat overlap.',
      key_players_positioning: 'Inverted bek merkeze, kanat bek yüksek, kanatlar yarı alanda, Odegaard free 10'
    },
    non_possession: {
      defensive_philosophy: 'Organize Pressing',
      pressing_philosophy: 'Kontrollü yüksek hat, seçici tetikleyiciler',
      counter_attack_philosophy: 'Hızlı wing-back geçişleri',
      out_of_possession_shape: '4-3-3 Kompakt',
      pressing_triggers: JSON.stringify([
        'Rakip stoper zayıf dokunuş',
        'Geriye pas',
        'Kanat beklere pas',
        'Pivot alırken baskı'
      ]),
      defensive_priorities: JSON.stringify([
        'Yüksek hat',
        'Kompaktlık',
        'Merkez kapalı',
        'Tetikleyicilerde agresif',
        'Hızlı geçişler'
      ]),
      regain_strategies: 'Yüksek hat koruma, tetikleyicilerde ani baskı, merkezi kapalı tutma.',
      rest_defense: 'Inverted bek dönüp 4-3-3 oluşturur. Dengeli ve kompakt.',
      counter_press_intensity: 'Yüksek - Ani tetikleyiciler'
    },
    pressing_zones: [
      {
        zone_name: 'Yüksek Hat Tetikleyici Baskı',
        zone_type: 'Yüksek Baskı',
        description: 'Rakip stoperlere tetikleyicili baskı',
        intensity: 'Yüksek',
        trigger_conditions: 'Stoper kötü dokunuş veya geriye pas',
        player_responsibilities: 'Forvet hat agresif bas, orta saha pivot kapat',
        success_metrics: 'Yüksek bölgede top kazanımı',
        common_mistakes: 'Savunma hattı takip etmezse boşluklar'
      },
      {
        zone_name: 'Merkez Kapatma',
        zone_type: 'Orta Saha Blok',
        description: 'Merkezi kompakt tutarak rakibi kanatlara zorla',
        intensity: 'Orta-Yüksek',
        trigger_conditions: 'Rakip merkez geçmeye çalışıyor',
        player_responsibilities: 'Merkez yoğun, kanatlar içe, rakibi kanata zorla',
        success_metrics: 'Rakip merkez geçemiyor',
        common_mistakes: 'Kanatlar çok içte kalırsa wing-backler izole'
      }
    ]
  },
  {
    // ID 3: Conte Wing-Back
    id: 3,
    possession: {
      possession_style: 'Wing-back Dominant',
      possession_target_percentage: 52,
      in_possession_shape: '3-4-3 Wing-back Yüksek',
      passing_principles: JSON.stringify([
        'Wing-backlere erken toplar',
        'Direkt ve vertical',
        'Az riskli',
        'Kanat oyunu ağırlıklı',
        'Forvet hedef adam'
      ]),
      movement_principles: JSON.stringify([
        'Wing-backler sürekli koşu',
        'Forvet hedef adamı',
        'Kanatlar içe kesme',
        'Orta saha dengeli',
        'Savunma geniş destek'
      ]),
      build_up_strategy: 'Üçlü savunmadan güvenli başla. Wing-backlere erken top. Forvet hedef adam.',
      progression_methods: 'Wing-back koşuları, kanat geçişleri, forvet hedef adam, direkt oyun.',
      key_players_positioning: 'Üçlü stoper geniş, wing-backler çok yüksek, ikili pivot, kanatlar mobil, tek forvet'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt 5-4-1',
      pressing_philosophy: 'Orta blok, seçici pressing',
      counter_attack_philosophy: 'Wing-back hızlı geçiş',
      out_of_possession_shape: '5-4-1 Kompakt Blok',
      pressing_triggers: JSON.stringify([
        'Rakip kanatta',
        'Wing-backlere pas',
        'Zayıf ayak',
        'Geriye pas'
      ]),
      defensive_priorities: JSON.stringify([
        'Kompaktlık',
        'Wing-backler geri dönüş',
        'Merkez kapalı',
        'Organize blok',
        'Sayısal üstünlük'
      ]),
      regain_strategies: '5-4-1 kompakt blok. Rakibi kanatlara zorla. Wing-backler hızlı dönüş. Merkez kapalı.',
      rest_defense: 'Her zaman 5-4-1 şekil. Dengeli ve güvenli.',
      counter_press_intensity: 'Orta - Seçici'
    },
    pressing_zones: [
      {
        zone_name: 'Orta Blok Kompakt',
        zone_type: 'Orta Saha Blok',
        description: '5-4-1 ile merkezi kapat',
        intensity: 'Orta',
        trigger_conditions: 'Rakip kendi yarısında buildup',
        player_responsibilities: '5-4-1 kompakt, merkezi kapat',
        success_metrics: 'Rakip merkez geçemiyor',
        common_mistakes: 'Çok derin kalırsa rakip rahat'
      }
    ]
  }
];

// Verileri kaydet
async function fillData() {
  let completed = 0;
  let successCount = 0;

  for (const system of systemsData) {
    // Possession tactics kaydet/güncelle
    await new Promise(resolve => {
      db.get('SELECT id FROM possession_tactics WHERE system_id = ?', [system.id], (err, row) => {
        if (row) {
          // Update
          const updateSql = `UPDATE possession_tactics SET
            possession_style = ?,
            possession_target_percentage = ?,
            in_possession_shape = ?,
            passing_principles = ?,
            movement_principles = ?,
            build_up_strategy = ?,
            progression_methods = ?,
            key_players_positioning = ?
            WHERE system_id = ?`;

          db.run(updateSql, [
            system.possession.possession_style,
            system.possession.possession_target_percentage,
            system.possession.in_possession_shape,
            system.possession.passing_principles,
            system.possession.movement_principles,
            system.possession.build_up_strategy,
            system.possession.progression_methods,
            system.possession.key_players_positioning,
            system.id
          ], (err) => {
            if (!err) {
              console.log(`✅ Sistem ${system.id} - Possession güncellendi`);
              successCount++;
            }
            resolve();
          });
        } else {
          // Insert
          const insertSql = `INSERT INTO possession_tactics (
            system_id, possession_style, possession_target_percentage,
            in_possession_shape, passing_principles, movement_principles,
            build_up_strategy, progression_methods, key_players_positioning
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          db.run(insertSql, [
            system.id,
            system.possession.possession_style,
            system.possession.possession_target_percentage,
            system.possession.in_possession_shape,
            system.possession.passing_principles,
            system.possession.movement_principles,
            system.possession.build_up_strategy,
            system.possession.progression_methods,
            system.possession.key_players_positioning
          ], (err) => {
            if (!err) {
              console.log(`✅ Sistem ${system.id} - Possession eklendi`);
              successCount++;
            }
            resolve();
          });
        }
      });
    });

    // Non-possession tactics kaydet/güncelle
    await new Promise(resolve => {
      db.get('SELECT id FROM non_possession_tactics WHERE system_id = ?', [system.id], (err, row) => {
        if (row) {
          // Update
          const updateSql = `UPDATE non_possession_tactics SET
            defensive_philosophy = ?,
            pressing_philosophy = ?,
            counter_attack_philosophy = ?,
            out_of_possession_shape = ?,
            pressing_triggers = ?,
            defensive_priorities = ?,
            regain_strategies = ?,
            rest_defense = ?,
            counter_press_intensity = ?
            WHERE system_id = ?`;

          db.run(updateSql, [
            system.non_possession.defensive_philosophy,
            system.non_possession.pressing_philosophy,
            system.non_possession.counter_attack_philosophy,
            system.non_possession.out_of_possession_shape,
            system.non_possession.pressing_triggers,
            system.non_possession.defensive_priorities,
            system.non_possession.regain_strategies,
            system.non_possession.rest_defense,
            system.non_possession.counter_press_intensity,
            system.id
          ], (err) => {
            if (!err) {
              console.log(`✅ Sistem ${system.id} - Non-possession güncellendi`);
              successCount++;
            }
            resolve();
          });
        } else {
          // Insert
          const insertSql = `INSERT INTO non_possession_tactics (
            system_id, defensive_philosophy, pressing_philosophy,
            counter_attack_philosophy, out_of_possession_shape, pressing_triggers,
            defensive_priorities, regain_strategies, rest_defense, counter_press_intensity
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          db.run(insertSql, [
            system.id,
            system.non_possession.defensive_philosophy,
            system.non_possession.pressing_philosophy,
            system.non_possession.counter_attack_philosophy,
            system.non_possession.out_of_possession_shape,
            system.non_possession.pressing_triggers,
            system.non_possession.defensive_priorities,
            system.non_possession.regain_strategies,
            system.non_possession.rest_defense,
            system.non_possession.counter_press_intensity
          ], (err) => {
            if (!err) {
              console.log(`✅ Sistem ${system.id} - Non-possession eklendi`);
              successCount++;
            }
            resolve();
          });
        }
      });
    });

    // Pressing zones ekle
    if (system.pressing_zones) {
      for (const zone of system.pressing_zones) {
        await new Promise(resolve => {
          const insertSql = `INSERT INTO pressing_trap_zones (
            system_id, zone_name, zone_type, description, intensity,
            trigger_conditions, player_responsibilities, success_metrics, common_mistakes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          db.run(insertSql, [
            system.id,
            zone.zone_name,
            zone.zone_type,
            zone.description,
            zone.intensity,
            zone.trigger_conditions,
            zone.player_responsibilities,
            zone.success_metrics,
            zone.common_mistakes
          ], (err) => {
            if (!err) {
              console.log(`✅ Sistem ${system.id} - Pressing zone eklendi: ${zone.zone_name}`);
              successCount++;
            }
            resolve();
          });
        });
      }
    }

    completed++;
  }

  console.log(`\n✅ Batch 1 tamamlandı!`);
  console.log(`   İşlenen sistem: ${completed}`);
  console.log(`   Başarılı işlem: ${successCount}`);
  console.log(`\n🎉 İlk 5 sistem tam ve Türkçe!\n`);

  db.close();
}

fillData();
