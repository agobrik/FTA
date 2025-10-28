const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

console.log('🏗️  ULTRA DATABASE OLUŞTURULUYOR - EKSİKSİZ ŞEMA\n');

db.serialize(() => {
  // 1. TAKTİK SİSTEMLER TABLOSU - Her detayı içeren
  db.run(`CREATE TABLE IF NOT EXISTS tactical_systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    formation TEXT NOT NULL,
    category TEXT NOT NULL, -- modern, classic, specialized, hybrid
    style TEXT NOT NULL, -- attacking, defensive, balanced, counter-attacking
    era TEXT, -- historical period or "modern"
    philosophy TEXT NOT NULL, -- detailed tactical philosophy

    -- Temel Özellikler
    key_principles TEXT NOT NULL, -- JSON array
    strengths TEXT NOT NULL, -- JSON array
    weaknesses TEXT NOT NULL, -- JSON array
    ideal_opposition TEXT, -- hangi sistemlere karşı etkili

    -- Metriks (1-10 skala)
    pressing_intensity INTEGER DEFAULT 5,
    defensive_line_height INTEGER DEFAULT 5, -- 1=çok düşük, 10=çok yüksek
    width INTEGER DEFAULT 5, -- 1=çok dar, 10=çok geniş
    tempo INTEGER DEFAULT 5,
    risk_level INTEGER DEFAULT 5, -- 1=güvenli, 10=riskli
    physicality_requirement INTEGER DEFAULT 5,
    technical_requirement INTEGER DEFAULT 5,
    tactical_complexity INTEGER DEFAULT 5,

    -- Oyun Stili Detayları
    build_up_play TEXT NOT NULL, -- short/mixed/long/direct
    passing_style TEXT, -- tiki-taka, direct, mixed
    passing_directness INTEGER DEFAULT 5,
    defensive_approach TEXT, -- high-press, mid-block, low-block, counter-press
    attacking_approach TEXT, -- possession, counter-attack, direct, hybrid

    -- Pozisyonel Detaylar
    compactness TEXT, -- compact, balanced, spread
    defensive_width TEXT, -- narrow, balanced, wide
    attacking_width TEXT, -- narrow, balanced, wide
    defensive_shape TEXT, -- flat, staggered, asymmetric

    -- Oyuncu Gereksinimleri
    required_player_profiles TEXT NOT NULL, -- JSON: her pozisyon için ideal profil
    key_positions TEXT NOT NULL, -- JSON: kritik pozisyonlar

    -- Gerçek Dünya Örnekleri
    famous_teams TEXT, -- JSON array: bu sistemi kullanan ünlü takımlar
    famous_coaches TEXT, -- JSON array: bu sistemi kullanan koçlar
    famous_matches TEXT, -- JSON: tarihi maçlar

    -- Varyantlar ve Adaptasyonlar
    variants TEXT, -- JSON: sistem varyantları
    in_possession_shape TEXT, -- Topa sahipken şekil
    out_of_possession_shape TEXT, -- Topsuz şekil
    transition_to_attack TEXT, -- Hücuma geçiş şekli
    transition_to_defense TEXT, -- Savunmaya geçiş şekli

    -- Set Piece Stratejileri
    corner_attack_strategy TEXT,
    corner_defense_strategy TEXT,
    free_kick_strategy TEXT,

    -- Detaylı Talimatlar
    tactical_instructions TEXT NOT NULL, -- Detaylı takti k talimatlar
    player_instructions_by_position TEXT NOT NULL, -- JSON: pozisyona göre talimatlar

    -- Meta
    difficulty_to_implement INTEGER DEFAULT 5, -- 1=kolay, 10=zor
    effectiveness_rating INTEGER DEFAULT 5,
    popularity_current INTEGER DEFAULT 5, -- güncel popülarite
    success_rate REAL, -- başarı oranı yüzdesi

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2. OYUNCU ROLLERİ TABLOSU - Detaylı
  db.run(`CREATE TABLE IF NOT EXISTS player_roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL, -- GK, DF, MF, FW
    sub_position TEXT NOT NULL, -- GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST vb.
    mentality TEXT NOT NULL, -- attack, support, defend, automatic

    -- Rol Açıklaması
    description TEXT NOT NULL,
    detailed_explanation TEXT NOT NULL,
    tactical_purpose TEXT NOT NULL,

    -- Oyun Stili
    movement_pattern TEXT NOT NULL, -- hareket deseni detaylı
    positioning TEXT NOT NULL, -- pozisyon alma şekli
    off_ball_movement TEXT NOT NULL, -- topsuz hareket
    on_ball_behavior TEXT NOT NULL, -- toplu davranış

    -- Sorumluluklar
    primary_duties TEXT NOT NULL, -- JSON array
    secondary_duties TEXT, -- JSON array
    defensive_duties TEXT NOT NULL, -- JSON array
    attacking_duties TEXT NOT NULL, -- JSON array

    -- Fiziksel Gereksinimler
    pace_importance INTEGER DEFAULT 5,
    stamina_importance INTEGER DEFAULT 5,
    strength_importance INTEGER DEFAULT 5,
    agility_importance INTEGER DEFAULT 5,
    jumping_importance INTEGER DEFAULT 5,

    -- Teknik Gereksinimler
    passing_importance INTEGER DEFAULT 5,
    dribbling_importance INTEGER DEFAULT 5,
    shooting_importance INTEGER DEFAULT 5,
    crossing_importance INTEGER DEFAULT 5,
    tackling_importance INTEGER DEFAULT 5,
    marking_importance INTEGER DEFAULT 5,
    positioning_importance INTEGER DEFAULT 5,

    -- Zihinsel Gereksinimler
    vision_importance INTEGER DEFAULT 5,
    decision_importance INTEGER DEFAULT 5,
    concentration_importance INTEGER DEFAULT 5,
    work_rate_importance INTEGER DEFAULT 5,
    teamwork_importance INTEGER DEFAULT 5,
    leadership_importance INTEGER DEFAULT 5,

    -- Oyuncu Özellikleri ve Özellikler
    ideal_player_traits TEXT NOT NULL, -- JSON array
    preferred_foot TEXT, -- left, right, either
    height_requirement TEXT, -- tall, average, short, any
    age_profile TEXT, -- young, peak, experienced, any

    -- Gerçek Dünya Örnekleri
    real_world_examples TEXT NOT NULL, -- JSON: gerçek oyuncular
    historical_examples TEXT, -- JSON: tarihi örnekler

    -- Rol İlişkileri
    synergizes_with TEXT, -- JSON: uyumlu roller
    conflicts_with TEXT, -- JSON: çakışan roller
    complementary_roles TEXT, -- JSON: tamamlayıcı roller
    requires_support_from TEXT, -- JSON: destek gereken roller

    -- Sistemlerle Uyumluluk
    best_in_formations TEXT NOT NULL, -- JSON: en uygun formasyonlar
    tactical_systems_compatibility TEXT, -- JSON: uyumlu sistemler

    -- Performans Metrikleri
    versatility_score INTEGER DEFAULT 5, -- çok yönlülük
    difficulty_to_play INTEGER DEFAULT 5, -- oynama zorluğu
    impact_on_team INTEGER DEFAULT 5, -- takıma etkisi

    -- Detaylı Talimatlar
    specific_instructions TEXT NOT NULL,
    in_possession_role TEXT NOT NULL,
    out_of_possession_role TEXT NOT NULL,
    transition_role TEXT NOT NULL,

    -- Varyasyonlar
    role_variants TEXT, -- JSON: rol varyantları
    modern_adaptations TEXT, -- JSON: modern adaptasyonlar

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 3. COUNTER TACTICS TABLOSU - Karşı Taktikler
  db.run(`CREATE TABLE IF NOT EXISTS counter_tactics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    system_id INTEGER NOT NULL,
    counter_system_id INTEGER, -- hangi sistemle karşı konur
    counter_name TEXT NOT NULL,
    effectiveness_rating INTEGER DEFAULT 5, -- 1-10

    -- Strateji Detayları
    strategy_type TEXT NOT NULL, -- formation-change, tactical-adjustment, player-role-change
    detailed_strategy TEXT NOT NULL,
    key_adjustments TEXT NOT NULL, -- JSON array

    -- Uygulama Detayları
    when_to_apply TEXT NOT NULL, -- hangi durumlarda
    risk_level INTEGER DEFAULT 5,
    difficulty INTEGER DEFAULT 5,

    -- Oyuncu Talima tları
    player_instructions TEXT NOT NULL, -- JSON
    formation_adjustment TEXT,
    positional_changes TEXT, -- JSON

    -- Gerçek Örnekler
    real_world_examples TEXT, -- JSON: gerçek maç örnekleri
    success_stories TEXT, -- JSON: başarı hikayeleri

    -- Meta
    priority_order INTEGER, -- uygulama önceliği
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (system_id) REFERENCES tactical_systems(id) ON DELETE CASCADE,
    FOREIGN KEY (counter_system_id) REFERENCES tactical_systems(id) ON DELETE SET NULL
  )`);

  // 4. ROL SİNERJİLERİ TABLOSU - Rol Uyumları
  db.run(`CREATE TABLE IF NOT EXISTS role_synergies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_1_id INTEGER NOT NULL,
    role_2_id INTEGER NOT NULL,
    synergy_score INTEGER NOT NULL, -- -10 (çok kötü) to +10 (mükemmel)
    synergy_type TEXT NOT NULL, -- complementary, compatible, neutral, conflicting

    -- Sinerji Açıklaması
    explanation TEXT NOT NULL,
    why_it_works TEXT, -- neden çalışır
    potential_issues TEXT, -- potansiyel sorunlar

    -- Pozisyonel İlişki
    spatial_relationship TEXT, -- near, adjacent, distant
    functional_relationship TEXT, -- supports, enables, conflicts

    -- Oyun Fazları
    in_possession_synergy INTEGER DEFAULT 5,
    out_of_possession_synergy INTEGER DEFAULT 5,
    transition_synergy INTEGER DEFAULT 5,

    -- Örnekler
    famous_partnerships TEXT, -- JSON: ünlü oyuncu ikilileri
    tactical_examples TEXT, -- JSON: taktiksel örnekler

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_1_id) REFERENCES player_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (role_2_id) REFERENCES player_roles(id) ON DELETE CASCADE,
    UNIQUE(role_1_id, role_2_id)
  )`);

  // 5. TAKTİKSEL KAVRAMLAR TABLOSU - Taktik Konseptler
  db.run(`CREATE TABLE IF NOT EXISTS tactical_concepts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    concept_name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- attacking, defensive, transition, set-piece
    importance INTEGER DEFAULT 5,

    description TEXT NOT NULL,
    detailed_explanation TEXT NOT NULL,
    principles TEXT NOT NULL, -- JSON array

    -- Uygulama
    how_to_implement TEXT NOT NULL,
    required_player_attributes TEXT, -- JSON
    suitable_formations TEXT, -- JSON

    -- Örnekler
    real_world_examples TEXT NOT NULL, -- JSON
    famous_implementations TEXT, -- JSON

    -- İlişkiler
    related_concepts TEXT, -- JSON: ilişkili konseptler
    opposing_concepts TEXT, -- JSON: karşıt konseptler

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 6. FORMATION TRANSITIONS TABLOSU - Formasyon Geçişleri
  db.run(`CREATE TABLE IF NOT EXISTS formation_transitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_formation TEXT NOT NULL,
    to_formation TEXT NOT NULL,
    transition_type TEXT NOT NULL, -- in-possession, out-of-possession, defensive, attacking

    description TEXT NOT NULL,
    how_to_execute TEXT NOT NULL,
    player_movements TEXT NOT NULL, -- JSON: oyuncu hareketleri

    difficulty INTEGER DEFAULT 5,
    effectiveness INTEGER DEFAULT 5,

    examples TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 7. TAKTİKSEL TRENDLERİ TABLOSU - Modern Trendler
  db.run(`CREATE TABLE IF NOT EXISTS tactical_trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trend_name TEXT NOT NULL,
    season TEXT NOT NULL, -- 2024/25 vb.
    category TEXT NOT NULL,

    description TEXT NOT NULL,
    prevalence INTEGER DEFAULT 5, -- yaygınlık

    key_teams TEXT, -- JSON
    key_coaches TEXT, -- JSON
    statistical_evidence TEXT, -- JSON: istatistiksel kanıt

    future_projection TEXT, -- gelecek tahmini
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 8. SİSTEM WEAKNESS_EXPLOIT TABLOSU - Zayıflık İstismarı
  db.run(`CREATE TABLE IF NOT EXISTS system_weaknesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    system_id INTEGER NOT NULL,
    weakness_type TEXT NOT NULL,
    weakness_description TEXT NOT NULL,

    how_to_exploit TEXT NOT NULL,
    required_approach TEXT NOT NULL,

    severity INTEGER DEFAULT 5,
    frequency INTEGER DEFAULT 5, -- ne sıklıkla ortaya çıkar

    examples TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (system_id) REFERENCES tactical_systems(id) ON DELETE CASCADE
  )`);

  console.log('✅ Tüm tablolar oluşturuldu!\n');
  console.log('📊 Tablolar:');
  console.log('   1. tactical_systems - Taktik sistemler (100+ sistem)');
  console.log('   2. player_roles - Oyuncu rolleri (150+ rol)');
  console.log('   3. counter_tactics - Karşı taktikler');
  console.log('   4. role_synergies - Rol sinerjileri');
  console.log('   5. tactical_concepts - Taktik konseptler');
  console.log('   6. formation_transitions - Formasyon geçişleri');
  console.log('   7. tactical_trends - Taktiksel trendler');
  console.log('   8. system_weaknesses - Sistem zayıflıkları');
  console.log('\n🎯 Database hazır - Şimdi veri ekleme zamanı!\n');

  db.close();
});
