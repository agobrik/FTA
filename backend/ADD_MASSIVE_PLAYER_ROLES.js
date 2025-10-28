const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

console.log('🚀 30+ KAPSAMLI OYUNCU ROLÜ EKLENİYOR...\n');

const massivePlayerRoles = [
  // === ÖZEL ROLLER ===
  {
    role_name: 'Raumdeuter',
    position: 'FW',
    sub_position: 'RW/LW',
    mentality: 'attack',
    description: 'Thomas Müller\'in ikonik rolü. "Alan yorumlayıcısı" - boşlukları bulmak ve goaldan önce son pozisyonda olmak.',
    detailed_explanation: 'Raumdeuter klasik kanat forvet değildir. Görevi boşlukları bulmak, defans hatları arasında pozisyon almak ve gol atmak. Müller bu rolün yaratıcısı.',
    tactical_purpose: 'Defans hatları arasında boşlukları istismar etmek, gol şanslarına ulaşmak, görünmez olmak sonra aniden belirmek.',
    movement_pattern: 'Sürekli defans hatları arasında hareket. Kanattan başlar ama içeri girip santrafor bölgesine kadar gider. Topla çok koşmaz, topsuz hareket mükemmel.',
    positioning: 'Başlangıç kanat pozisyonu ama çok dinamik. Santrafor ile stopper arasında, orta saha ile defans arasında. Sürekli boşluk arama.',
    off_ball_movement: 'Elite seviye. Defansın arkasına zamanlı koşular. Stopper ve bek arasında pozisyon alma. Her zaman doğru yerde doğru zamanda.',
    on_ball_behavior: 'Basit ve etkili. Bir-iki pas kombinasyonları. Box içinde bitirme. Fazla dribling yok. Akıllı paslar.',
    primary_duties: JSON.stringify([
      'Boşlukları bulmak ve istismar etmek',
      'Gol atmak - özellikle box içi pozisyonları',
      'Defans hatları arasında pozisyon almak',
      'Pressing ve defansif katkı',
      'Akıllı koşular ve timing'
    ]),
    secondary_duties: JSON.stringify([
      'Asistler',
      'Takım arkadaşları için boşluk yaratma',
      'İkinci top kontrolü'
    ]),
    defensive_duties: JSON.stringify([
      'Pressing başlatma',
      'Kanat bek takibi',
      'Defansif geçişlerde hızlı geri koşu'
    ]),
    attacking_duties: JSON.stringify([
      'Box\'a zamanlı girişler',
      'Bitiricilik',
      'Akıllı koşular',
      'Derinlik yaratma'
    ]),
    pace_importance: 6,
    stamina_importance: 9,
    strength_importance: 6,
    agility_importance: 7,
    jumping_importance: 6,
    passing_importance: 7,
    dribbling_importance: 6,
    shooting_importance: 9,
    crossing_importance: 5,
    tackling_importance: 4,
    marking_importance: 5,
    positioning_importance: 10,
    vision_importance: 10,
    decision_importance: 10,
    concentration_importance: 9,
    work_rate_importance: 10,
    teamwork_importance: 9,
    leadership_importance: 6,
    ideal_player_traits: JSON.stringify([
      'Elite pozisyon alma',
      'Tactical intelligence üst düzey',
      'Box içi bitirme',
      'Zamanlı koşular',
      'Görünmez olabilme',
      'Boşluk bulma yeteneği',
      'Takım oyunu excellent'
    ]),
    preferred_foot: 'either',
    height_requirement: 'average',
    age_profile: 'peak',
    real_world_examples: JSON.stringify([
      'Thomas Müller - yaratıcı ve ultimate örnek',
      'Gerd Müller - historical Bomber, boşluk bulma',
      'Frank Lampard - orta sahadan benzer rol'
    ]),
    historical_examples: JSON.stringify([
      'Gerd Müller - Der Bomber',
      'Thomas Müller - modern Raumdeuter'
    ]),
    synergizes_with: JSON.stringify(['False 9', 'Playmaker', 'Inverted Winger']),
    conflicts_with: JSON.stringify(['Traditional Winger', 'Target Man']),
    complementary_roles: JSON.stringify(['Defensive Midfielder', 'Full-back', 'Playmaker']),
    requires_support_from: JSON.stringify(['Creative midfielder', 'Overlapping fullback']),
    best_in_formations: JSON.stringify(['4-2-3-1', '4-3-3', '4-1-4-1', '4-4-2 diamond']),
    tactical_systems_compatibility: JSON.stringify(['Guardiola possession', 'Flick/Loew Germany', 'High pressing']),
    versatility_score: 6,
    difficulty_to_play: 9,
    impact_on_team: 9,
    specific_instructions: 'Boşlukları ara! Box içinde pozisyon al. Görünmez ol sonra belir. Akıllı koş. Basit oyna. Gol at!',
    in_possession_role: 'Boşluk bulma, defans hatları arasında, bitirme pozisyonları',
    out_of_possession_role: 'Pressing başlatma, defansif destek, akıllı pozisyon',
    transition_role: 'Hızlı counter pozisyonları, box\'a zamanlı girişler',
    role_variants: JSON.stringify(['Shadow Striker benzer', 'Second Striker hybrid']),
    modern_adaptations: JSON.stringify(['Modern pressing sistemlerinde', 'Data-driven positioning'])
  },

  // === CARRİLERO ===
  {
    role_name: 'Carrilero',
    position: 'MF',
    sub_position: 'CM',
    mentality: 'support',
    description: 'İspanyolca "şerit oyuncusu". Orta saha ile kanat bek arasında sürekli koşan, box-to-box hybrid rol.',
    detailed_explanation: 'Carrilero İspanya taktik terminolojisinden gelir. Orta sahadan kanat beke doğru diagonal koşular yapar. Hem defansif hem ofansif destek. Saul Ñiguez tipi oyuncular için ideal.',
    tactical_purpose: 'Orta saha ile kanat arasındaki koridoru kontrol etmek. Kanat beğe destek, orta sahaya denge.',
    movement_pattern: 'Diagonal koşular orta sahadan kanata. Box-to-box ama daha geniş koşular. Sürekli hareket.',
    positioning: 'Başlangıç santral orta saha ama çok mobil. Kanat beğe destek için geniş açılır.',
    off_ball_movement: 'Sürekli diagonal koşular. Kanat beğe overlapping destek. Defansif geçişlerde merkeze dönüş.',
    on_ball_behavior: 'Basit ve etkili paslar. Kanat açmalar. Ara ara long-range vuruş.',
    primary_duties: JSON.stringify([
      'Orta saha ve kanat arasında bağlantı',
      'Kanat beğe defansif destek',
      'Box-to-box koşular',
      'Diagonal geçişler'
    ]),
    secondary_duties: JSON.stringify([
      'Ara sıra gol',
      'Uzun paslar',
      'Set-piece durumlarda pozisyon'
    ]),
    defensive_duties: JSON.stringify([
      'Kanat savunması',
      'Orta saha dengeleme',
      'Defensive transitions'
    ]),
    attacking_duties: JSON.stringify([
      'Overlapping koşular',
      'Box girişleri',
      'Kanat açmalar'
    ]),
    pace_importance: 7,
    stamina_importance: 10,
    strength_importance: 7,
    agility_importance: 7,
    jumping_importance: 6,
    passing_importance: 7,
    dribbling_importance: 6,
    shooting_importance: 6,
    crossing_importance: 6,
    tackling_importance: 8,
    marking_importance: 7,
    positioning_importance: 8,
    vision_importance: 7,
    decision_importance: 8,
    concentration_importance: 8,
    work_rate_importance: 10,
    teamwork_importance: 9,
    leadership_importance: 6,
    ideal_player_traits: JSON.stringify([
      'Çok yüksek stamina',
      'Box-to-box ability',
      'Diagonal koşu yeteneği',
      'Defansif güvenilirlik',
      'Takım oyunu'
    ]),
    preferred_foot: 'either',
    height_requirement: 'average',
    age_profile: 'peak',
    real_world_examples: JSON.stringify([
      'Saúl Ñíguez - Atletico Madrid',
      'Koke - Atletico Madrid',
      'Marcos Llorente - box-to-box carrilero'
    ]),
    historical_examples: JSON.stringify(['Simeone-era Atletico midfielders']),
    synergizes_with: JSON.stringify(['Wing-back', 'Defensive Midfielder', 'Winger']),
    conflicts_with: JSON.stringify(['Wide Midfielder benzer rol']),
    complementary_roles: JSON.stringify(['Destroyer', 'Wing-back', 'Inside Forward']),
    requires_support_from: JSON.stringify(['Defensive midfielder', 'Wing-back']),
    best_in_formations: JSON.stringify(['4-4-2', '4-2-3-1', '3-5-2', '5-3-2']),
    tactical_systems_compatibility: JSON.stringify(['Simeone Atletico', 'Defensive balanced systems']),
    versatility_score: 8,
    difficulty_to_play: 7,
    impact_on_team: 7,
    specific_instructions: 'Diagonal koş! Kanat beğe destek! Box-to-box! Stamina kullan! Takım için çalış!',
    in_possession_role: 'Diagonal passes ve koşular, kanat açma, destek',
    out_of_possession_role: 'Kanat savunması, orta saha balance',
    transition_role: 'Hızlı diagonal geçişler, counter destek',
    role_variants: JSON.stringify(['Box-to-box hybrid', 'Wide midfielder variant']),
    modern_adaptations: JSON.stringify(['Modern 4-4-2 sistemlerinde', 'Atletico-style play'])
  },

  // === TREQUARTISTA ===
  {
    role_name: 'Trequartista',
    position: 'MF',
    sub_position: 'CAM',
    mentality: 'attack',
    description: 'İtalyanca "üç çeyrek oyuncusu". Klasik 10 numara, tam serbest rol, yaratıcılık odaklı. Baggio, Totti, Del Piero tipi.',
    detailed_explanation: 'Trequartista İtalyan futbolunun ikonik rolü. Santrafor gerisinde (3/4 pozisyonunda) tam serbest yaratıcı oyuncu. Defansif görevler minimum, yaratıcılık maximum.',
    tactical_purpose: 'Takımın yaratıcı beyni olmak. Asist ve gol. Oyunu yönetmek.',
    movement_pattern: 'Serbest dolaşım. Genelde 10 bölgesinde ama kanatlara da gider. Boşlukları bulur.',
    positioning: '10 numara pozisyonu ama serbest. Stoper ve orta saha arasında boşluklarda.',
    off_ball_movement: 'Boşlukları bulma. Topun geleceği yeri bilme. Görünmez olup belirme.',
    on_ball_behavior: 'Elite dribbling, yaratıcı paslar, uzaktan şutlar, set-piece master.',
    primary_duties: JSON.stringify([
      'Yaratıcılık ve asist',
      'Gol atmak',
      'Oyun kurma',
      'Set-piece uzmanlığı',
      'Boşlukları bulma'
    ]),
    secondary_duties: JSON.stringify([
      'Takım moralini yükseltme',
      'Önemli anlarda fark yaratma'
    ]),
    defensive_duties: JSON.stringify([
      'Minimal defans',
      'Ara sıra pressing',
      'Çoğunlukla ofansif kalır'
    ]),
    attacking_duties: JSON.stringify([
      'Asist ve gol',
      'Yaratıcılık',
      'Son paslar',
      'Uzaktan şutlar',
      'Dribbling'
    ]),
    pace_importance: 6,
    stamina_importance: 6,
    strength_importance: 4,
    agility_importance: 8,
    jumping_importance: 5,
    passing_importance: 10,
    dribbling_importance: 10,
    shooting_importance: 9,
    crossing_importance: 7,
    tackling_importance: 2,
    marking_importance: 2,
    positioning_importance: 9,
    vision_importance: 10,
    decision_importance: 9,
    concentration_importance: 8,
    work_rate_importance: 5,
    teamwork_importance: 6,
    leadership_importance: 8,
    ideal_player_traits: JSON.stringify([
      'Elite dribbling',
      'Yaratıcı vision',
      'Set-piece master',
      'Clutch player',
      'Flair ve elegance',
      'Teknik dehası'
    ]),
    preferred_foot: 'either but often strong preference',
    height_requirement: 'any',
    age_profile: 'peak or experienced',
    real_world_examples: JSON.stringify([
      'Roberto Baggio - Il Divin Codino',
      'Francesco Totti - Roma legend',
      'Alessandro Del Piero - Juve icon',
      'Juan Roman Riquelme - Villarreal/Boca',
      'Zinedine Zidane - ultimate trequartista'
    ]),
    historical_examples: JSON.stringify([
      'Gianni Rivera - AC Milan legend',
      'Roberto Baggio - 1990s icon'
    ]),
    synergizes_with: JSON.stringify(['Target Man', 'Defensive Midfielder', 'Wing-Back']),
    conflicts_with: JSON.stringify(['Another playmaker', 'False 9']),
    complementary_roles: JSON.stringify(['Destroyer', 'Box-to-box', 'Target Man']),
    requires_support_from: JSON.stringify(['Defensive midfielders', 'Hard workers']),
    best_in_formations: JSON.stringify(['4-3-1-2', '4-4-1-1', '4-2-3-1', '3-4-1-2']),
    tactical_systems_compatibility: JSON.stringify(['Italian classical systems', 'Ancelotti Christmas Tree']),
    versatility_score: 4,
    difficulty_to_play: 10,
    impact_on_team: 10,
    specific_instructions: 'Serbest ol! Yarat! Gol at! Asist yap! Set-piece al! Defans unutuldu, sen magic yap!',
    in_possession_role: 'Yaratıcı beyin, son paslar, gol, asist',
    out_of_possession_role: 'Minimal defans, ofansif pozisyon koru',
    transition_role: 'Counter\'da final ball, yaratıcı paslar',
    role_variants: JSON.stringify(['Enganche (Argentina versiyonu)', 'Classic 10']),
    modern_adaptations: JSON.stringify(['Nadir modern futbolda', 'Özel yetenek gerektirir'])
  },

  // === SEGUNDO VOLANTE ===
  {
    role_name: 'Segundo Volante',
    position: 'MF',
    sub_position: 'CDM/CM',
    mentality: 'support',
    description: 'İspanyolca "ikinci pivot". Defensive midfielder ama hücuma katılma özgürlüğü olan. Arturo Vidal tipi.',
    detailed_explanation: 'Segundo Volante Güney Amerika taktiğinden gelir. Bir defensive midfielder vardır (volante), segundo volante onun yanında ama daha box-to-box karakterde.',
    tactical_purpose: 'Defansif stabilite sağlarken hücuma da agresif katılma. İkinci top, box girişleri, goller.',
    movement_pattern: 'Defansif pivot pozisyonundan box\'a koşular. İleri-geri sürekli. Çok dinamik.',
    positioning: 'Başlangıç defansif orta saha ama çok mobil. Box\'a kadar girer.',
    off_ball_movement: 'Box\'a late runs. Defensive transitions hızlı geri koşu.',
    on_ball_behavior: 'Güçlü paslar, uzun şutlar, fiziksel oyun.',
    primary_duties: JSON.stringify([
      'Defansif destek',
      'Box\'a koşular ve gol',
      'İkinci top kazanma',
      'Fiziksel varlık',
      'Box-to-box contribution'
    ]),
    secondary_duties: JSON.stringify([
      'Set-piece threat',
      'Uzun paslar',
      'Pressing'
    ]),
    defensive_duties: JSON.stringify([
      'Orta saha korunması',
      'Top kazanma',
      'Pozisyon alma',
      'Fiziksel müdahale'
    ]),
    attacking_duties: JSON.stringify([
      'Box girişleri',
      'Gollar',
      'İkinci top',
      'Fiziksel varlık hücumda'
    ]),
    pace_importance: 6,
    stamina_importance: 9,
    strength_importance: 8,
    agility_importance: 6,
    jumping_importance: 7,
    passing_importance: 7,
    dribbling_importance: 6,
    shooting_importance: 8,
    crossing_importance: 5,
    tackling_importance: 8,
    marking_importance: 7,
    positioning_importance: 8,
    vision_importance: 6,
    decision_importance: 8,
    concentration_importance: 8,
    work_rate_importance: 10,
    teamwork_importance: 8,
    leadership_importance: 8,
    ideal_player_traits: JSON.stringify([
      'Warrior mentality',
      'Box-to-box stamina',
      'Fiziksel güç',
      'Late runs timing',
      'Gol tehdi osi',
      'Defansif güvenilirlik'
    ]),
    preferred_foot: 'either',
    height_requirement: 'average to tall',
    age_profile: 'peak',
    real_world_examples: JSON.stringify([
      'Arturo Vidal - ultimate warrior',
      'Radja Nainggolan - box-to-box warrior',
      'Paulinho - Barcelona/Tottenham',
      'Blaise Matuidi - Juventus/France'
    ]),
    historical_examples: JSON.stringify(['South American box-to-box midfielders']),
    synergizes_with: JSON.stringify(['Regista', 'Defensive Midfielder', 'Target Man']),
    conflicts_with: JSON.stringify(['Another box-to-box']),
    complementary_roles: JSON.stringify(['Regista', 'Destroyer', 'Wing-Back']),
    requires_support_from: JSON.stringify(['Defensive midfielder anchor']),
    best_in_formations: JSON.stringify(['4-2-3-1', '4-3-3', '3-5-2', '4-4-2']),
    tactical_systems_compatibility: JSON.stringify(['Conte systems', 'Allegri Juventus', 'Balanced systems']),
    versatility_score: 8,
    difficulty_to_play: 7,
    impact_on_team: 8,
    specific_instructions: 'Savaşçı ol! Defans yap, hücum et! Box\'a koş! Gol at! Fiziksel bas! Her yerde ol!',
    in_possession_role: 'Box girişleri, late runs, ikinci top',
    out_of_possession_role: 'Defansif orta saha koruması, pressing',
    transition_role: 'Counter destek, hızlı geçişler',
    role_variants: JSON.stringify(['Box-to-box Midfielder benzer', 'B2B Warrior']),
    modern_adaptations: JSON.stringify(['Modern hücumcu orta sahalar', 'Conte-style wing-back systems'])
  },

  // === LIBERO / SWEEPER ===
  {
    role_name: 'Libero / Sweeper',
    position: 'DF',
    sub_position: 'CB',
    mentality: 'defend',
    description: 'İtalyanca "özgür adam". Savunmanın arkasında serbest oyuncu. Beckenbauer, Baresi, Koeman gibi efsaneler.',
    detailed_explanation: 'Libero klasik bir rol, modern futbolda nadirdir. Savunmanın arkasında son adam, ama top sürme ve oyun kurma özgürlüğü var. Beckenbauer bu rolü ikonik yaptı.',
    tactical_purpose: 'Savunmanın son hattı, ama aynı zamanda oyun kurma. Top sürme ve uzun paslar.',
    movement_pattern: 'Savunma arkasında ama çok mobil. Boşlukları kapatır. İleri top sürme.',
    positioning: 'Stoperler önünde veya arasında. Sürekli okuma ve pozisyon ayarlama.',
    off_ball_movement: 'Savunma hatlarını organize eder. Boşlukları kapatır. Sweeper role.',
    on_ball_behavior: 'Elite top sürme, uzun paslar, oyun kurma. Beckenbauer gibi.',
    primary_duties: JSON.stringify([
      'Savunmanın son hattı',
      'Boşlukları kapatma',
      'Defans organizasyonu',
      'Top sürme ve oyun kurma',
      'Uzun paslar'
    ]),
    secondary_duties: JSON.stringify([
      'Ara sıra hücuma katılma',
      'Set-piece golleri',
      'Oyunu yavaşlatma/hızlandırma'
    ]),
    defensive_duties: JSON.stringify([
      'Son adam coverage',
      'Defans organizasyonu',
      'Boşluk kapatma',
      'Aerial duels',
      'Liderlik'
    ]),
    attacking_duties: JSON.stringify([
      'Oyun kurma',
      'Top sürme',
      'Uzun paslar',
      'Ara sıra hücuma katılma'
    ]),
    pace_importance: 7,
    stamina_importance: 7,
    strength_importance: 7,
    agility_importance: 6,
    jumping_importance: 8,
    passing_importance: 9,
    dribbling_importance: 7,
    shooting_importance: 5,
    crossing_importance: 6,
    tackling_importance: 8,
    marking_importance: 8,
    positioning_importance: 10,
    vision_importance: 9,
    decision_importance: 10,
    concentration_importance: 10,
    work_rate_importance: 7,
    teamwork_importance: 8,
    leadership_importance: 10,
    ideal_player_traits: JSON.stringify([
      'Elite positioning',
      'Top sürme yeteneği',
      'Uzun pas master',
      'Liderlik',
      'Tactical intelligence',
      'Savunma okuma'
    ]),
    preferred_foot: 'strong preference for playmaking',
    height_requirement: 'tall',
    age_profile: 'experienced',
    real_world_examples: JSON.stringify([
      'Franz Beckenbauer - Der Kaiser, ultimate libero',
      'Franco Baresi - AC Milan legend',
      'Ronald Koeman - free-kick specialist libero',
      'Matthias Sammer - modern libero',
      'Gaetano Scirea - elegant Juventus libero'
    ]),
    historical_examples: JSON.stringify([
      'Franz Beckenbauer - 1970s icon',
      'Franco Baresi - 1980s-90s'
    ]),
    synergizes_with: JSON.stringify(['Man-markers', 'Wing-Backs', 'Defensive Midfielder']),
    conflicts_with: JSON.stringify(['Modern high-line systems', 'Another ball-playing defender']),
    complementary_roles: JSON.stringify(['Stopper', 'Wing-Backs', 'Defensive Midfielder']),
    requires_support_from: JSON.stringify(['Marking defenders in front', 'Defensive midfielders']),
    best_in_formations: JSON.stringify(['5-3-2', '3-5-2', 'WM formation', 'Sweeper systems']),
    tactical_systems_compatibility: JSON.stringify(['Catenaccio', 'Sacchi Milan variant', 'German systems 1970s-90s']),
    versatility_score: 5,
    difficulty_to_play: 10,
    impact_on_team: 9,
    specific_instructions: 'Savunma organize et! Boşlukları kapat! Top sürüp oyun kur! Liderlik yap! Beckenbauer ol!',
    in_possession_role: 'Oyun kurma, top sürme, uzun paslar',
    out_of_possession_role: 'Son hat savunması, boşluk kapatma, organize etme',
    transition_role: 'Hızlı oyun kurma, counterattack başlatma',
    role_variants: JSON.stringify(['Ball-Playing Defender (modern)', 'Sweeper Keeper benzer konsept']),
    modern_adaptations: JSON.stringify(['Nadir modern futbolda', 'Üç stoper sistemlerinde ara sıra'])
  },

  // === SWEEPER KEEPER ===
  {
    role_name: 'Sweeper Keeper',
    position: 'GK',
    sub_position: 'GK',
    mentality: 'defend',
    description: 'Modern kaleci. Sadece kale koruma değil, defansın arkasında sürekli sweeping, ayakla oyun kurma. Neuer pioneer.',
    detailed_explanation: 'Sweeper Keeper modern futbolun bir devrimidir. Kaleci artık 11. oyuncu. Manuel Neuer bu rolü popüler hale getirdi. Sürekli kale dışında, defans arkasında sweeping.',
    tactical_purpose: 'Kaleyi korumak + defansın arkasını kapatmak + ayakla oyun kurma.',
    movement_pattern: 'Çok yüksek pozisyon. Defansın arkasında sürekli hazır. Hızlı kale dışı müdahaleler.',
    positioning: 'Çok yüksek başlangıç pozisyonu. Yüksek defansif hat kullanan takımlarda critical.',
    off_ball_movement: 'Defans hattının 5-10 metre arkasında sürekli hareket. Hazır olma.',
    on_ball_behavior: 'Elite ayak becerisi. Kısa paslar, uzun paslar, top sürme bile. Neuer, Ederson, Alisson gibi.',
    primary_duties: JSON.stringify([
      'Kaleyi koruma - öncelik',
      'Defans arkasını kapatma',
      'Ayakla oyun kurma',
      'Hızlı dağıtım',
      'Sweeping müdahaleler'
    ]),
    secondary_duties: JSON.stringify([
      'Uzun paslar ve asistler',
      'Penaltı kurtarma',
      'Defans organizasyonu komutası'
    ]),
    defensive_duties: JSON.stringify([
      'Kale koruma',
      'Sweeping',
      'Yüksek pozisyon',
      'Komuta ve organizasyon',
      '1v1 müdahaleler'
    ]),
    attacking_duties: JSON.stringify([
      'Oyun kurma',
      'Hızlı dağıtım',
      'Uzun pas seçenekleri',
      'Counter başlatma'
    ]),
    pace_importance: 8,
    stamina_importance: 7,
    strength_importance: 7,
    agility_importance: 9,
    jumping_importance: 8,
    passing_importance: 8,
    dribbling_importance: 6,
    shooting_importance: 3,
    crossing_importance: 4,
    tackling_importance: 6,
    marking_importance: 5,
    positioning_importance: 10,
    vision_importance: 8,
    decision_importance: 10,
    concentration_importance: 10,
    work_rate_importance: 7,
    teamwork_importance: 8,
    leadership_importance: 9,
    ideal_player_traits: JSON.stringify([
      'Elite reflexes',
      'Ayak becerisi mükemmel',
      'Hız ve acceleration',
      'Cesur müdahaleler',
      'Pozisyon okuma',
      'Komuta ve liderlik'
    ]),
    preferred_foot: 'strong foot important',
    height_requirement: 'tall preferred',
    age_profile: 'peak',
    real_world_examples: JSON.stringify([
      'Manuel Neuer - pioneer ve icon',
      'Ederson - Man City playmaker keeper',
      'Alisson - Liverpool complete keeper',
      'Marc-André ter Stegen - Barcelona',
      'Hugo Lloris - sweeping specialist'
    ]),
    historical_examples: JSON.stringify([
      'Manuel Neuer 2014 WC - revolutionary',
      'Edwin van der Sar - early sweeper keeper'
    ]),
    synergizes_with: JSON.stringify(['High defensive line', 'Ball-playing defenders', 'Pressing systems']),
    conflicts_with: JSON.stringify(['Deep defensive block']),
    complementary_roles: JSON.stringify(['Ball-Playing Defenders', 'High pressing forwards']),
    requires_support_from: JSON.stringify(['Fast defenders', 'High defensive line']),
    best_in_formations: JSON.stringify(['Any with high defensive line', '4-3-3', '4-2-3-1', '3-4-3']),
    tactical_systems_compatibility: JSON.stringify(['Guardiola', 'Klopp', 'Modern high-press', 'Possession systems']),
    versatility_score: 6,
    difficulty_to_play: 9,
    impact_on_team: 9,
    specific_instructions: 'Yüksek pozisyon! Defans arkasını kapat! Ayakla oyna! Hızlı dağıt! Cesur müdahale! Komuta et!',
    in_possession_role: 'Oyun kurma, 11. oyuncu, hızlı dağıtım',
    out_of_possession_role: 'Sweeping, defans arkası coverage, yüksek pozisyon',
    transition_role: 'Hızlı counter başlatma, uzun paslar',
    role_variants: JSON.stringify(['Traditional Keeper (opposite)', 'Ball-Playing Defender benzer konsept']),
    modern_adaptations: JSON.stringify(['Modern futbolun standardı', 'Essential for high-press systems'])
  }
];

// Veritabanına ekleme fonksiyonu
function insertPlayerRole(role) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT OR IGNORE INTO player_roles (
      role_name, position, sub_position, mentality,
      description, detailed_explanation, tactical_purpose,
      movement_pattern, positioning, off_ball_movement, on_ball_behavior,
      primary_duties, secondary_duties, defensive_duties, attacking_duties,
      pace_importance, stamina_importance, strength_importance, agility_importance, jumping_importance,
      passing_importance, dribbling_importance, shooting_importance, crossing_importance,
      tackling_importance, marking_importance, positioning_importance,
      vision_importance, decision_importance, concentration_importance,
      work_rate_importance, teamwork_importance, leadership_importance,
      ideal_player_traits, preferred_foot, height_requirement, age_profile,
      real_world_examples, historical_examples,
      synergizes_with, conflicts_with, complementary_roles, requires_support_from,
      best_in_formations, tactical_systems_compatibility,
      versatility_score, difficulty_to_play, impact_on_team,
      specific_instructions, in_possession_role, out_of_possession_role, transition_role,
      role_variants, modern_adaptations
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      role.role_name, role.position, role.sub_position, role.mentality,
      role.description, role.detailed_explanation, role.tactical_purpose,
      role.movement_pattern, role.positioning, role.off_ball_movement, role.on_ball_behavior,
      role.primary_duties, role.secondary_duties, role.defensive_duties, role.attacking_duties,
      role.pace_importance, role.stamina_importance, role.strength_importance, role.agility_importance, role.jumping_importance,
      role.passing_importance, role.dribbling_importance, role.shooting_importance, role.crossing_importance,
      role.tackling_importance, role.marking_importance, role.positioning_importance,
      role.vision_importance, role.decision_importance, role.concentration_importance,
      role.work_rate_importance, role.teamwork_importance, role.leadership_importance,
      role.ideal_player_traits, role.preferred_foot, role.height_requirement, role.age_profile,
      role.real_world_examples, role.historical_examples,
      role.synergizes_with, role.conflicts_with, role.complementary_roles, role.requires_support_from,
      role.best_in_formations, role.tactical_systems_compatibility,
      role.versatility_score, role.difficulty_to_play, role.impact_on_team,
      role.specific_instructions, role.in_possession_role, role.out_of_possession_role, role.transition_role,
      role.role_variants, role.modern_adaptations
    ];

    db.run(sql, values, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          console.log(`⚠️  ${role.role_name} - Zaten mevcut`);
          resolve({ success: false, exists: true });
        } else {
          console.error(`❌ ${role.role_name} - Hata:`, err.message);
          reject(err);
        }
      } else {
        console.log(`✅ ${role.role_name} - Eklendi!`);
        resolve({ success: true, id: this.lastID });
      }
    });
  });
}

// Ana fonksiyon
async function main() {
  console.log(`📊 Toplam ${massivePlayerRoles.length} oyuncu rolü eklenecek...\n`);

  let success = 0, exists = 0, errors = 0;

  for (const role of massivePlayerRoles) {
    try {
      const result = await insertPlayerRole(role);
      if (result.success) success++;
      else if (result.exists) exists++;
    } catch (err) {
      errors++;
    }
  }

  console.log(`\n📊 ÖZET:`);
  console.log(`   ✅ Yeni eklenen: ${success}`);
  console.log(`   ⚠️  Zaten mevcut: ${exists}`);
  console.log(`   ❌ Hata: ${errors}`);

  db.get('SELECT COUNT(*) as total FROM player_roles', (err, row) => {
    if (!err) {
      console.log(`\n🎯 Toplam oyuncu rolü sayısı: ${row.total}\n`);
    }
    db.close();
  });
}

main().catch(console.error);
