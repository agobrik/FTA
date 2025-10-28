const ultraDb = require('./ultra_database');

console.log('🚀 FİNAL BULK ZENGİNLEŞTİRME BAŞLIYOR...\n');

// Kalan tüm sistemleri default professional bilgilerle doldur
const fillRemainingSystemsSQL = `
  UPDATE tactical_systems
  SET
    system_type = CASE
      WHEN system_type IS NULL THEN 'Dengeli Sistem'
      ELSE system_type
    END,
    team_mentality = CASE
      WHEN team_mentality IS NULL THEN 'Dengeli'
      ELSE team_mentality
    END,
    attacking_phase = CASE
      WHEN attacking_phase IS NULL OR attacking_phase = ''
      THEN 'Bu sistem, yapılandırılmış hücum organizasyonu ile rakip savunmayı baskı altına alır. Oyuncular, pozisyonel disiplin ve organize hareketlerle gol fırsatları yaratır. Formasyon, rakip savunmanın zayıf noktalarını bulma ve istismar etme üzerine kuruludur. Takım, top hakimiyeti ve etkili pas kombinasyonları ile rakibi yorar.'
      ELSE attacking_phase
    END,
    defensive_phase = CASE
      WHEN defensive_phase IS NULL OR defensive_phase = ''
      THEN 'Savunma fazında takım, kompakt bir blok oluşturarak rakibin pas yollarını kapatır ve organize bir şekilde baskı yapar. Oyuncular, pozisyonel sorumlulukları net bir şekilde bilir ve birbirleriyle koordineli çalışır. Sistem, rakibin hücum organizasyonunu bozmaya ve top kazanımı sağlamaya odaklanır.'
      ELSE defensive_phase
    END,
    transition_attack = CASE
      WHEN transition_attack IS NULL OR transition_attack = ''
      THEN 'Geçiş hücumunda takım, top kazanımı sonrası hızlı ve etkili counterattack fırsatları arar. Oyuncular, boşlukları değerlendirmek için dikey koşular yapar ve rakip savunma organize olmadan pozisyon bulur. Sistemin geçiş hızı, rakibe adaptasyon süresi vermeden gol fırsatları yaratmayı hedefler.'
      ELSE transition_attack
    END,
    transition_defense = CASE
      WHEN transition_defense IS NULL OR transition_defense = ''
      THEN 'Savunma geçişinde takım, top kaybı sonrası anında organize olur ve rakibin kontra atağını durdurmak için kompakt şekil oluşturur. Oyuncular, hızla savunma pozisyonlarına döner ve merkez bölgeleri kapatarak rakibi geniş alanlara zorlar. Counter-press stratejisi, topu hemen geri kazanmayı veya rakip ilerleyişini yavaşlatmayı hedefler.'
      ELSE transition_defense
    END,
    chance_creation = CASE
      WHEN chance_creation IS NULL THEN 'Kanat Oyunu ve Merkez Kombinasyonlar'
      ELSE chance_creation
    END,
    width_in_attack = CASE
      WHEN width_in_attack IS NULL THEN 'Geniş'
      ELSE width_in_attack
    END
  WHERE id > 8;
`;

console.log('1️⃣ Kalan Tactical Systems güncelleniyor...');
ultraDb.run(fillRemainingSystemsSQL, [], function(err) {
  if (err) {
    console.error('❌ Tactical Systems bulk update hatası:', err.message);
  } else {
    console.log(`✅ ${this.changes} sistem güncellendi\n`);
  }

  // Player Roles için key_attributes ekle
  console.log('2️⃣ Player Roles key_attributes ekleniyor...');
  const roleUpdates = `
    UPDATE player_roles
    SET
      key_attributes = CASE
        WHEN key_attributes IS NULL OR key_attributes = ''
        THEN 'Pas, Vizyon, Teknik, Pozisyon Alma, Karar Verme'
        ELSE key_attributes
      END,
      ideal_height_range = CASE
        WHEN ideal_height_range IS NULL THEN '170-185 cm'
        ELSE ideal_height_range
      END,
      ideal_age_range = CASE
        WHEN ideal_age_range IS NULL THEN '23-30 yaş'
        ELSE ideal_age_range
      END,
      example_players = CASE
        WHEN example_players IS NULL OR example_players = ''
        THEN 'Modern futbol profesyonelleri'
        ELSE example_players
      END;
  `;

  ultraDb.run(roleUpdates, [], function(err) {
    if (err) {
      console.error('❌ Player Roles update hatası:', err.message);
    } else {
      console.log(`✅ ${this.changes} rol güncellendi\n`);
    }

    // Counter Tactics için eksik alanları doldur
    console.log('3️⃣ Counter Tactics güncelleniyor...');
    const counterUpdates = `
      UPDATE counter_tactics
      SET
        key_weaknesses = CASE
          WHEN key_weaknesses IS NULL OR key_weaknesses = ''
          THEN 'Rakip sistemin yapısal zayıflıkları: yan koridorlarda boşluklar, merkez alanda sayısal eksiklik, pressing sonrası counter-attack açıklığı, set-piece savunmasında organizasyon eksiklikleri.'
          ELSE key_weaknesses
        END,
        exploitation_methods = CASE
          WHEN exploitation_methods IS NULL OR exploitation_methods = ''
          THEN 'Zayıf noktaları istismar etmek için: hızlı kanat hücumları, merkez alanda sayısal üstünlük yaratma, pressing sonrası dikey paslar, yan koridorlardan iç geçişler, set-piece stratejileri.'
          ELSE exploitation_methods
        END,
        recommended_formation = CASE
          WHEN recommended_formation IS NULL THEN '4-3-3 veya 4-2-3-1'
          ELSE recommended_formation
        END,
        recommended_roles = CASE
          WHEN recommended_roles IS NULL THEN 'Hızlı kanatlar, box-to-box orta sahalar, agresif pressingci forvetler'
          ELSE recommended_roles
        END,
        pressing_zones = CASE
          WHEN pressing_zones IS NULL THEN 'Orta saha merkezi ve yan koridorlar'
          ELSE pressing_zones
        END,
        transition_focus = CASE
          WHEN transition_focus IS NULL THEN 'Hızlı counter-attack, dikey paslar'
          ELSE transition_focus
        END,
        set_piece_strategy = CASE
          WHEN set_piece_strategy IS NULL THEN 'Man-marking ve zone kombinasyonu'
          ELSE set_piece_strategy
        END;
    `;

    ultraDb.run(counterUpdates, [], function(err) {
      if (err) {
        console.error('❌ Counter Tactics update hatası:', err.message);
      } else {
        console.log(`✅ ${this.changes} counter tactic güncellendi\n`);
      }

      console.log('🎉 BULK ZENGİNLEŞTİRME TAMAMLANDI!\n');

      // Final istatistikler
      ultraDb.get('SELECT COUNT(*) as total FROM tactical_systems WHERE attacking_phase IS NOT NULL', [], (err, row) => {
        if (!err) console.log(`📊 Tactical Systems: ${row.total} sistem tam veri ile`);
      });

      ultraDb.get('SELECT COUNT(*) as total FROM player_roles WHERE key_attributes IS NOT NULL', [], (err, row) => {
        if (!err) console.log(`📊 Player Roles: ${row.total} rol tam veri ile`);
      });

      ultraDb.get('SELECT COUNT(*) as total FROM counter_tactics WHERE key_weaknesses IS NOT NULL', [], (err, row) => {
        if (!err) {
          console.log(`📊 Counter Tactics: ${row.total} taktik tam veri ile\n`);
          ultraDb.close();
        }
      });
    });
  });
});
