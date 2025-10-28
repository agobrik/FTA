const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

console.log('🚀 40+ KAPSAMLI TAKTİK SİSTEM EKLENİYOR...\n');

const massiveTacticalSystems = [
  // === MOURINHO SİSTEMLERİ ===
  {
    name: '4-3-3 Mourinho Inter Treble',
    formation: '4-3-3',
    category: 'counter-attacking',
    style: 'pragmatic defensive',
    era: '2009-10',
    philosophy: 'Mourinho\'nun Inter ile Treble kazandığı sistem. Kompakt defans, Sneijder yaratıcılığı, Milito bitiricilik, Eto\'o fedakarlığı.',
    key_principles: JSON.stringify([
      'Kompakt 4-4-1-1 defansif şekil',
      'Sneijder serbest rol 10 numarada',
      'Milito hedef adam ve bitirici',
      'Eto\'o kanat forvet ve defansif destek',
      'Hızlı kontralar - direkt paslarla',
      'Cambiasso destroyer orta sahada'
    ]),
    strengths: JSON.stringify([
      'Çok solid defans',
      'Deadly kontralar',
      'Sneijder yaratıcılık',
      'Milito bitiricilik',
      'Takım ruhu mükemmel'
    ]),
    weaknesses: JSON.stringify([
      'Düşük top hakimiyeti',
      'Yaratıcılık Sneijder\'a bağımlı',
      'Fiziksel yorgunluk'
    ]),
    ideal_opposition: 'Barcelona, Real Madrid gibi hücum odaklı takımlar - kontraya alan bırakırlar',
    pressing_intensity: 6,
    defensive_line_height: 4,
    width: 7,
    tempo: 7,
    risk_level: 4,
    physicality_requirement: 9,
    technical_requirement: 7,
    tactical_complexity: 8,
    build_up_play: 'direct',
    passing_style: 'mixed',
    passing_directness: 8,
    defensive_approach: 'deep-block',
    attacking_approach: 'counter-attack',
    compactness: 'very compact',
    defensive_width: 'narrow',
    attacking_width: 'wide',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Julio Cesar tipi - refleksler mükemmel, komuta eder',
      DF: 'Fiziksel güçlü stoperler, organize bekler',
      MF: 'Cambiasso destroyer, Sneijder yaratıcı dehası, box-to-box destek',
      FW: 'Milito bitirici, Eto\'o fedakar hızlı forvet'
    }),
    key_positions: JSON.stringify(['Sneijder 10 role', 'Cambiasso destroyer', 'Milito target man']),
    famous_teams: JSON.stringify(['Inter Milan 2009-10 Treble']),
    famous_coaches: JSON.stringify(['Jose Mourinho']),
    famous_matches: JSON.stringify([
      'Inter 3-1 Barcelona (2010 CL Semi) - Mükemmel kontra örneği',
      'Bayern 0-2 Inter (2010 CL Final) - Solid defans ve kontra'
    ]),
    variants: JSON.stringify(['4-2-3-1 with Sneijder', '4-4-1-1 defensive shape']),
    in_possession_shape: '4-3-3 with Sneijder dropping',
    out_of_possession_shape: '4-4-1-1 compact deep block',
    transition_to_attack: 'Quick vertical ball to Milito or Eto\'o, Sneijder support',
    transition_to_defense: 'Immediate retreat to compact shape',
    corner_attack_strategy: 'Mix of near post flick and far post power headers',
    corner_defense_strategy: 'Zonal with man-marking key threats',
    free_kick_strategy: 'Sneijder direct shots or Milito target',
    tactical_instructions: 'Defans: Kompakt kal, boşluk verme. Orta saha: Cambiasso kazan, Sneijder yarat. Atak: Hızlı kontra, Milito bitir.',
    player_instructions_by_position: JSON.stringify({
      GK: 'Cesar - komuta et, hızlı dağıtım',
      DF: 'Lucio-Samuel güçlü, Maicon-Zanetti dengeli',
      MF: 'Cambiasso destroyer, Sneijder serbest, Motta destek',
      FW: 'Milito hedef-bitirici, Eto\'o fedakar-hızlı, Pandev destek'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 9,
    popularity_current: 6,
    success_rate: 88.5
  },

  // === SACCHI AC MILAN ===
  {
    name: '4-4-2 Sacchi Pressing Machine',
    formation: '4-4-2',
    category: 'pressing',
    style: 'high-tempo',
    era: '1988-91',
    philosophy: 'Arrigo Sacchi\'nin devrim yaratan AC Milan sistemi. Zonal marking, pressing, hat hizası, offsayt tuzağı. "Futbol bilim değil ama bilimsel prensiplerle oynanır."',
    key_principles: JSON.stringify([
      'Takım 25 metre içinde hareket eder',
      'Bölgesel savunma - man-marking yok',
      'Mükemmel hat hizası - dört hat senkronize',
      'Topa 3 saniyede 3 oyuncu',
      'Sürekli ofsayt tuzağı',
      'Toptan maksimum 10 metre mesafe',
      'Pressing tetikleyiciler belli',
      'Kolektif zeka bireysel yetenekten önemli'
    ]),
    strengths: JSON.stringify([
      'Rakibi boğar - çok yoğun baskı',
      'Çok az boşluk bırakır',
      'Takım olarak hareket mükemmel',
      'Ofsayt tuzağı çok etkili',
      'Üst düzey kondisyon',
      'Sistem bireyden büyük'
    ]),
    weaknesses: JSON.stringify([
      'Çok yoğun fiziksel talep',
      'Ofsayt hataları tehlikeli',
      'Hızlı forvetlere karşı risk',
      'Uygulaması çok zor',
      'Her oyuncu disiplinli olmalı'
    ]),
    ideal_opposition: 'Klasik 4-4-2 veya yavaş tempolu takımlar',
    pressing_intensity: 10,
    defensive_line_height: 9,
    width: 6,
    tempo: 9,
    risk_level: 8,
    physicality_requirement: 10,
    technical_requirement: 8,
    tactical_complexity: 10,
    build_up_play: 'short',
    passing_style: 'combination',
    passing_directness: 5,
    defensive_approach: 'ultra-high-press',
    attacking_approach: 'possession',
    compactness: 'ultra compact',
    defensive_width: 'narrow',
    attacking_width: 'balanced',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Sweeper keeper mutlaka - yüksek pozisyon',
      DF: 'Hızlı stoperler, mükemmel pozisyon alma, Baresi tipi liderlik',
      MF: 'Box-to-box runners, sürekli hareket, boşluk kapatma',
      FW: 'Pressing başlatıcılar, Van Basten bitirici, Gullit all-around'
    }),
    key_positions: JSON.stringify(['Baresi libero/stopper', 'Rijkaard box-to-box', 'Van Basten complete forward']),
    famous_teams: JSON.stringify(['AC Milan 1988-91', 'Italy 1994 World Cup']),
    famous_coaches: JSON.stringify(['Arrigo Sacchi']),
    famous_matches: JSON.stringify([
      'AC Milan 5-0 Real Madrid (1989) - Pressing masterclass',
      'AC Milan 4-0 Barcelona (1994 CL Final) - Mükemmel performans'
    ]),
    variants: JSON.stringify(['4-4-2 with Libero', '4-4-2 diamond orta saha']),
    in_possession_shape: '4-4-2 balanced compact',
    out_of_possession_shape: '4-4-2 ultra-high line compact',
    transition_to_attack: 'Quick combination play, third-man runs',
    transition_to_defense: 'Immediate pressing if high, retreat if deep',
    corner_attack_strategy: 'Many runners from deep, Van Basten target',
    corner_defense_strategy: 'Zonal marking with offside trap',
    free_kick_strategy: 'Combinations and set plays',
    tactical_instructions: 'Takım olarak hareket! 25 metre içinde kal. Topa yakın oyuncular hemen bas. Hat hizasını koru. Ofsayt tuzağı mükemmel zamanlama.',
    player_instructions_by_position: JSON.stringify({
      GK: 'Yüksek pozisyon, sürekli sweeping, ayak becerisi',
      DF: 'Baresi komuta, Maldini mükemmel timing, Costacurta destek, Tassotti disiplin',
      MF: 'Rijkaard destroyer ve playmaker, Ancelotti kontrol, Donadoni kanat, Colombo iş',
      FW: 'Van Basten bitirici, Gullit all-around'
    }),
    difficulty_to_implement: 10,
    effectiveness_rating: 10,
    popularity_current: 7,
    success_rate: 85.0
  },

  // === CRUYFF BARCELONA ===
  {
    name: '3-4-3 Cruyff Dream Team',
    formation: '3-4-3',
    category: 'total football',
    style: 'attacking possession',
    era: '1990-94',
    philosophy: 'Johan Cruyff\'un Barcelona Dream Team felsefesi. Total Football\'un İspanya uyarlaması. Pozisyon rotasyonları, teknik üstünlük, hücum odaklı.',
    key_principles: JSON.stringify([
      'Pozisyon rotasyonları sürekli',
      'Her oyuncu çok pozisyonda oynayabilir',
      '5 saniye kuralı - top kaybında anında bas',
      'Üçgenler sürekli oluştur',
      'Kanat bekler hücumda çok aktif',
      'Stojanović libero gibi',
      'Guardiola oyun kurucu',
      'Romario-Stoichkov ikılılı deadly'
    ]),
    strengths: JSON.stringify([
      'Çok yaratıcı ve eğlenceli futbol',
      'Teknik üstünlük',
      'Pozisyon rotasyonları rakibi şaşırtır',
      'Top hakimiyeti yüksek',
      'Çok sayıda gol'
    ]),
    weaknesses: JSON.stringify([
      'Defansif olarak riskli',
      'Üçlü defans boşluk verebilir',
      'Çok teknik oyuncu gerektirir',
      'Kontra savunması zayıf olabilir'
    ]),
    ideal_opposition: 'Klasik 4-4-2 - sayısal üstünlük yaratılır',
    pressing_intensity: 9,
    defensive_line_height: 8,
    width: 9,
    tempo: 8,
    risk_level: 8,
    physicality_requirement: 7,
    technical_requirement: 10,
    tactical_complexity: 10,
    build_up_play: 'short',
    passing_style: 'tiki-taka',
    passing_directness: 3,
    defensive_approach: 'high-press',
    attacking_approach: 'possession total-football',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'very wide',
    defensive_shape: 'asymmetric',
    required_player_profiles: JSON.stringify({
      GK: 'Zubizarreta - sweeper keeper, ayak becerisi',
      DF: 'Koeman libero, Ferrer-Sergi kanat bekler (hücumcu)',
      MF: 'Guardiola regista, Bakero box-to-box, Laudrup yaratıcı',
      FW: 'Stoichkov-Romario deadly ikili, teknik ve hızlı'
    }),
    key_positions: JSON.stringify(['Guardiola pivot', 'Koeman libero', 'Romario-Stoichkov ikili']),
    famous_teams: JSON.stringify(['Barcelona Dream Team 1990-94']),
    famous_coaches: JSON.stringify(['Johan Cruyff']),
    famous_matches: JSON.stringify([
      'Barcelona 1-0 Sampdoria (1992 CL Final) - İlk şampiyonluk',
      'Barcelona 5-0 Real Madrid (1994) - Romario hat-trick'
    ]),
    variants: JSON.stringify(['3-4-3 diamond orta saha', '3-5-2 savunmada']),
    in_possession_shape: '3-4-3 with rotating positions',
    out_of_possession_shape: '5-2-3 high press',
    transition_to_attack: '5 saniye kuralı sonrası hızlı kombinasyon',
    transition_to_defense: 'Anında pressing başlat',
    corner_attack_strategy: 'Koeman free-kick uzmanı, çok gol',
    corner_defense_strategy: 'Zonal marking',
    free_kick_strategy: 'Koeman legendary - 90+ gol kariyerinde',
    tactical_instructions: 'Sürekli hareket et! Pozisyon değiştir. Top kaybında 5 saniye bas. Üçgenler oluştur. Teknik üstünlük göster.',
    player_instructions_by_position: JSON.stringify({
      GK: 'Zubizarreta - sweeper, yapılanmada 11. oyuncu',
      DF: 'Koeman libero oyun kurar, kanat bekler çok ileri',
      MF: 'Guardiola pivot beyin, Bakero box-to-box, Laudrup yaratıcı',
      FW: 'Romario bitirici, Stoichkov güç ve hız, değişim yapın'
    }),
    difficulty_to_implement: 10,
    effectiveness_rating: 9,
    popularity_current: 8,
    success_rate: 82.0
  },

  // === VAN GAAL SISTEMLERI ===
  {
    name: '4-3-3 Van Gaal Ajax 1995',
    formation: '4-3-3',
    category: 'possession',
    style: 'positional play',
    era: '1994-95',
    philosophy: 'Louis van Gaal\'ın genç Ajax takımıyla Avrupa şampiyonluğu. Pozisyonel disiplin, üçgenler, total football modern versiyonu.',
    key_principles: JSON.stringify([
      'Pozisyonel disiplin çok önemli',
      'Her alanda sayısal üstünlük',
      'Üçgen formasyonlar sürekli',
      '4-3-3 ama çok disiplinli',
      'Genç oyunculara güven',
      'Teknik ve taktiksel eğitim mükemmel'
    ]),
    strengths: JSON.stringify([
      'Mükemmel pozisyonel oyun',
      'Genç yetenek gelişimi',
      'Top hakimiyeti yüksek',
      'Takım organizasyonu güçlü',
      'Teknik kalite üst düzey'
    ]),
    weaknesses: JSON.stringify([
      'Çok katı olabilir',
      'Yaratıcılık sınırlanabilir',
      'Genç takım deneyimsiz'
    ]),
    ideal_opposition: 'Fiziksel takımlar - teknik üstünlük gösterilir',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 8,
    tempo: 7,
    risk_level: 6,
    physicality_requirement: 6,
    technical_requirement: 10,
    tactical_complexity: 9,
    build_up_play: 'short',
    passing_style: 'positional',
    passing_directness: 4,
    defensive_approach: 'mid-block',
    attacking_approach: 'possession',
    compactness: 'compact',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Van der Sar - modern sweeper keeper',
      DF: 'Frank de Boer top sürme, Blind-Reiziger mobil',
      MF: 'Davids destroyer, Seedorf all-around, Litmanen 10',
      FW: 'Kluivert genç yetenek, Overmars hız, George kanat'
    }),
    key_positions: JSON.stringify(['Litmanen 10 role', 'Davids destroyer', 'Kluivert striker']),
    famous_teams: JSON.stringify(['Ajax 1994-95 Champions League Winners']),
    famous_coaches: JSON.stringify(['Louis van Gaal']),
    famous_matches: JSON.stringify([
      'Ajax 1-0 AC Milan (1995 CL Final) - Genç takım devleri yendi'
    ]),
    variants: JSON.stringify(['4-3-3 with Litmanen false 10', '4-4-2 diamond orta']),
    in_possession_shape: '4-3-3 positional control',
    out_of_possession_shape: '4-5-1 compact mid-block',
    transition_to_attack: 'Methodical build-up through thirds',
    transition_to_defense: 'Compact shape immediately',
    corner_attack_strategy: 'Many runners, good delivery',
    corner_defense_strategy: 'Zonal marking system',
    free_kick_strategy: 'Combinations and set plays',
    tactical_instructions: 'Pozisyonunu koru! Üçgenler oluştur. Sabırlı top sirkülasyonu. Riski minimize et. Disiplinli ol.',
    player_instructions_by_position: JSON.stringify({
      GK: 'Van der Sar sweeper keeper pioneer',
      DF: 'De Boer libero tipi, kanat bekler dengeli',
      MF: 'Davids destroyer, Seedorf box-to-box, Litmanen false 10',
      FW: 'Kluivert bitirici, kanatlar hızlı ve teknik'
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 9,
    popularity_current: 7,
    success_rate: 90.0
  },

  // === BIELSA SİSTEMLERİ ===
  {
    name: '3-3-1-3 Bielsa Chile',
    formation: '3-3-1-3',
    category: 'pressing',
    style: 'high-intensity',
    era: '2007-11',
    philosophy: 'Marcelo Bielsa\'nın Şili milli takımıyla oynadığı yoğun futbol. Man-marking tüm sahada, atletik üstünlük, sürekli baskı.',
    key_principles: JSON.stringify([
      'Man-to-man marking tüm sahada',
      'Yüksek tempo ve intensity',
      'Sürekli koşu ve baskı',
      '3-3-1-3 çok akışkan',
      'Kanat bekler wing-backs çok ileri',
      'Fiziksel dominant olma'
    ]),
    strengths: JSON.stringify([
      'Rakibi fiziksel ezme',
      'Yoğun baskı çok etkili',
      'Man-marking rakibi rahatsız eder',
      'Hızlı ve direkt oyun',
      'Takım ruhu güçlü'
    ]),
    weaknesses: JSON.stringify([
      'Çok yoğun fiziksel talep',
      'Sakatlık riski yüksek',
      'Uzun turnuvalarda yorgunluk',
      'Defansif boşluklar olabilir'
    ]),
    ideal_opposition: 'Top oynayan takımlar - man-marking onları durdurur',
    pressing_intensity: 10,
    defensive_line_height: 9,
    width: 9,
    tempo: 10,
    risk_level: 9,
    physicality_requirement: 10,
    technical_requirement: 6,
    tactical_complexity: 7,
    build_up_play: 'direct',
    passing_style: 'vertical',
    passing_directness: 9,
    defensive_approach: 'man-marking ultra-high',
    attacking_approach: 'direct vertical',
    compactness: 'spread',
    defensive_width: 'wide',
    attacking_width: 'very wide',
    defensive_shape: 'asymmetric',
    required_player_profiles: JSON.stringify({
      GK: 'Bravo - modern keeper, ayak becerisi',
      DF: 'Fiziksel güçlü stoperler, kanat bekler koşu makinesi',
      MF: 'Vidal box-to-box warrior, Aranguiz teknik, Diaz yaratıcı',
      FW: 'Sanchez hızlı kanatlar, Vargas mobil striker'
    }),
    key_positions: JSON.stringify(['Vidal box-to-box', 'Wing-backs', 'Sanchez']),
    famous_teams: JSON.stringify(['Chile 2007-11', 'Leeds United 2018-21', 'Athletic Bilbao 2011-13']),
    famous_coaches: JSON.stringify(['Marcelo Bielsa']),
    famous_matches: JSON.stringify([
      'Chile 2-1 Spain (2010 WC) - İspanya\'yı şok eden baskı'
    ]),
    variants: JSON.stringify(['3-4-3 daha dengeli', '5-3-2 defensive']),
    in_possession_shape: '3-3-1-3 wide with wing-backs high',
    out_of_possession_shape: '5-3-2 man-marking',
    transition_to_attack: 'Vertical balls immediately, runners everywhere',
    transition_to_defense: 'Man-marking assignments immediately',
    corner_attack_strategy: 'Power and runners from deep',
    corner_defense_strategy: 'Man-marking',
    free_kick_strategy: 'Direct shots or target man',
    tactical_instructions: 'Koş! Adam adama bas. Fiziksel baskın ol. Vertical paslar. Hızlı geçiş. Yorgunluğu gösterme!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Bravo modern keeper',
      DF: 'Medel savaşçı, Jara güçlü, wing-backs sürekli koş',
      MF: 'Vidal her yerde, sürekli bas',
      FW: 'Sanchez everywhere, Vargas target-mobile'
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 7,
    popularity_current: 6,
    success_rate: 68.0
  },

  // Daha fazla sistem eklenecek... dosya çok uzuyor, bölüm bölüm ekleyeceğim
];

// İKİNCİ GRUP SİSTEMLER
const moreSystems = [
  // === RANGNICK / NAGELSMANN ===
  {
    name: '4-2-2-2 Rangnick RB Leipzig',
    formation: '4-2-2-2',
    category: 'gegenpressing',
    style: 'vertical direct',
    era: '2015-16',
    philosophy: 'Ralf Rangnick\'ın Red Bull felsefesi. Gegenpressing 2.0, vertikal hızlı oyun, kompakt blok, 8 saniye kuralı.',
    key_principles: JSON.stringify([
      '8 saniye kuralı - top kaybında anında bas',
      'Kompakt dar blok (20 metre)',
      'Vertical direkt paslar',
      '4-2-2-2 with two striker partnership',
      'Pressing triggers belli',
      'High tempo non-stop'
    ]),
    strengths: JSON.stringify([
      'Çok etkili pressing',
      'Hızlı goller',
      'Vertical paslar tehlikeli',
      'Genç oyuncu gelişimi',
      'Sistem çok net'
    ]),
    weaknesses: JSON.stringify([
      'Fiziksel talep yüksek',
      'Top hakimiyeti düşük',
      'Teknik takımlara karşı zorlanabilir'
    ]),
    ideal_opposition: 'Top oynayan takımlar - pressing çok etkili',
    pressing_intensity: 10,
    defensive_line_height: 8,
    width: 5,
    tempo: 9,
    risk_level: 7,
    physicality_requirement: 9,
    technical_requirement: 7,
    tactical_complexity: 7,
    build_up_play: 'direct',
    passing_style: 'vertical',
    passing_directness: 9,
    defensive_approach: 'high-press counter-press',
    attacking_approach: 'vertical direct',
    compactness: 'very compact',
    defensive_width: 'narrow',
    attacking_width: 'narrow',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Gulacsi sweeper keeper',
      DF: 'Hızlı stoperler, agresif bekler',
      MF: 'Destroyer + playmaker ikili, 10\'lar teknik',
      FW: 'İkili striker partnership, Werner hız, Poulsen güç'
    }),
    key_positions: JSON.stringify(['Double pivot', 'Twin strikers', 'Pressing forwards']),
    famous_teams: JSON.stringify(['RB Leipzig 2015-19', 'Hoffenheim 2006-11', 'RB Salzburg']),
    famous_coaches: JSON.stringify(['Ralf Rangnick', 'Julian Nagelsmann', 'Jesse Marsch']),
    famous_matches: JSON.stringify([
      'RB Leipzig 4-5 Bayern (2017) - Spektaküler attacking game'
    ]),
    variants: JSON.stringify(['4-4-2 classic shape', '4-2-3-1 variation']),
    in_possession_shape: '4-2-2-2 narrow corridors',
    out_of_possession_shape: '4-4-2 compact high press',
    transition_to_attack: 'Win ball → vertical pass immediately',
    transition_to_defense: '8 second rule - press instantly',
    corner_attack_strategy: 'Power headers and near post flicks',
    corner_defense_strategy: 'Zonal with quick transitions',
    free_kick_strategy: 'Direct vertical balls',
    tactical_instructions: '8 saniye kuralı! Top kaybında 3 oyuncu hemen bas. Kazanınca vertical pas. Kompakt kal. Hızlı oyna!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Sürekli sweeping',
      DF: 'Yüksek hat, agresif',
      MF: 'İkili pivot top kazan ve ver, 10\'lar destek',
      FW: 'Pressing tetikle, vertical runs'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 8,
    popularity_current: 8,
    success_rate: 72.0
  },

  {
    name: '3-4-2-1 Nagelsmann Asymmetric',
    formation: '3-4-2-1',
    category: 'hybrid modern',
    style: 'data-driven flexible',
    era: '2019-present',
    philosophy: 'Julian Nagelsmann\'ın veri analitiği bazlı asimetrik sistem. Bir taraf yüksek bir taraf pivot, yarı boşluklarda aşırı yük.',
    key_principles: JSON.stringify([
      'Asimetrik kanat bekler (biri iç, biri dış)',
      'Yarı boşluklarda overload',
      'Veri bazlı taktik kararlar',
      '3-2-5 hücumda, 5-4-1 savunmada',
      'Dinamik rotasyonlar',
      'False 9 veya target man esnek'
    ]),
    strengths: JSON.stringify([
      'Çok unpredictable',
      'Yarı boşluk dominasyonu',
      'Esnek ve adaptive',
      'Modern ve yenilikçi',
      'Veri kullanımı üst düzey'
    ]),
    weaknesses: JSON.stringify([
      'Çok karmaşık',
      'Oyuncular adaptasyon gerektirir',
      'Bazen too complicated'
    ]),
    ideal_opposition: 'Klasik sistemler - asimetri şaşırtır',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 8,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 10,
    build_up_play: 'flexible',
    passing_style: 'mixed',
    passing_directness: 6,
    defensive_approach: 'situational pressing',
    attacking_approach: 'asymmetric overload',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'asymmetric',
    defensive_shape: 'asymmetric',
    required_player_profiles: JSON.stringify({
      GK: 'Neuer/Sommer sweeper keeper',
      DF: 'Geniş stoperler, asimetrik wing-backs',
      MF: 'Bir taraf yüksek bir taraf pivot, 10\'lar yarı boşluk',
      FW: 'Lewandowski target veya false 9 esnek'
    }),
    key_positions: JSON.stringify(['Asimetrik wing-backs', 'Half-space 10s', 'Flexible 9']),
    famous_teams: JSON.stringify(['RB Leipzig 2019-21', 'Bayern Munich 2021-23', 'Hoffenheim 2016-19']),
    famous_coaches: JSON.stringify(['Julian Nagelsmann']),
    famous_matches: JSON.stringify([
      'Bayern 8-2 Barcelona (2020) - Tactical masterclass (Flick ama Nagelsmann influence)'
    ]),
    variants: JSON.stringify(['3-2-5 attacking', '5-4-1 defensive', '3-1-4-2 hybrid']),
    in_possession_shape: '3-2-5 asymmetric overload',
    out_of_possession_shape: '5-4-1 balanced',
    transition_to_attack: 'Quick asymmetric overload in half-spaces',
    transition_to_defense: 'Wing-back drops, compact shape',
    corner_attack_strategy: 'Many variations, data-driven',
    corner_defense_strategy: 'Mixed zonal and man-marking',
    free_kick_strategy: 'Kimmich delivery, many variations',
    tactical_instructions: 'Asimetrik yapı! Yarı boşluklarda overload. Dinamik rotasyon. Veri kullan. Flexible ol!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Modern sweeper keeper',
      DF: 'Geniş stoperler, bir wing-back iç bir dış',
      MF: 'Asimetrik pivot, yarı boşluk 10\'lar',
      FW: 'Esnek 9 - false veya target'
    }),
    difficulty_to_implement: 10,
    effectiveness_rating: 9,
    popularity_current: 9,
    success_rate: 78.0
  }
];

// ÜÇÜNCÜ GRUP - KLASİK VE TARİHSEL SİSTEMLER
const classicSystems = [
  // === TARİHSEL FORMASYONLAR ===
  {
    name: '2-3-5 Piramit - WM Öncesi',
    formation: '2-3-5',
    category: 'historical',
    style: 'classical attacking',
    era: '1880s-1925',
    philosophy: 'Futbolun ilk dönemleri dominant formasyon. Beş forvet, üç orta saha, iki bek. Ultra-attacking yaklaşım.',
    key_principles: JSON.stringify([
      '5 forvet - sürekli atak',
      'Orta saha üçgeni',
      'İki back sadece',
      'Çok basit organizasyon',
      'Skor odaklı futbol'
    ]),
    strengths: JSON.stringify([
      'Çok sayıda gol',
      'Sürekli atak baskısı',
      'Basit ve anlaşılır'
    ]),
    weaknesses: JSON.stringify([
      'Defans çok zayıf',
      'Modern takımlara karşı işlemez',
      'Kontra savunması yok',
      'Çok dengesiz'
    ]),
    ideal_opposition: 'O dönem için diğer 2-3-5 takımlar',
    pressing_intensity: 3,
    defensive_line_height: 5,
    width: 8,
    tempo: 6,
    risk_level: 10,
    physicality_requirement: 5,
    technical_requirement: 5,
    tactical_complexity: 2,
    build_up_play: 'direct',
    passing_style: 'direct',
    passing_directness: 8,
    defensive_approach: 'minimal',
    attacking_approach: 'all-out attack',
    compactness: 'spread',
    defensive_width: 'very wide',
    attacking_width: 'very wide',
    defensive_shape: 'minimal',
    required_player_profiles: JSON.stringify({
      GK: 'Kaleci - sadece kale koruma',
      DF: 'İki back - fiziksel güçlü',
      MF: 'Üç half-back - dengeli oyuncular',
      FW: 'Beş forvet - gol odaklı'
    }),
    key_positions: JSON.stringify(['Centre-forward', 'Half-backs']),
    famous_teams: JSON.stringify(['Most teams 1880s-1920s', 'Preston North End 1889']),
    famous_coaches: JSON.stringify(['Coaches of early football era']),
    famous_matches: JSON.stringify(['High-scoring matches common in this era']),
    variants: JSON.stringify(['2-3-5 slight variations']),
    in_possession_shape: '2-3-5 spread out',
    out_of_possession_shape: '2-3-5 minimal defensive org',
    transition_to_attack: 'Forward ball to strikers',
    transition_to_defense: 'Very little - hope for the best',
    corner_attack_strategy: 'Mass in the box',
    corner_defense_strategy: 'All hands on deck',
    free_kick_strategy: 'Direct to forwards',
    tactical_instructions: 'Atağa git! Gol at! Defans... şans işi.',
    player_instructions_by_position: JSON.stringify({
      GK: 'Kaleyi koru',
      DF: 'Fiziksel müdahale',
      MF: 'Orta saha dengesi',
      FW: 'Gol at!'
    }),
    difficulty_to_implement: 1,
    effectiveness_rating: 2,
    popularity_current: 1,
    success_rate: 45.0
  },

  {
    name: 'WM Formation - Chapman Arsenal',
    formation: 'WM (3-2-2-3)',
    category: 'historical',
    style: 'tactical innovation',
    era: '1925-1950',
    philosophy: 'Herbert Chapman\'ın devrim yaratın WM sistemi. Offside kuralı değişikliğine tepki. Üçüncü back, iki inside forward geri çekme.',
    key_principles: JSON.stringify([
      'Üç back sistemi (stopper + two backs)',
      'İki inside forward geri çekili',
      'WM harfi şekli oluşturur',
      'Counter-attacking konsepti',
      'Offside trap kullanımı',
      'Stopper merkezi organize eder'
    ]),
    strengths: JSON.stringify([
      'Zamanının en modern sistemi',
      'Defansif organizasyon gelişmiş',
      'Counter-attack efekt if',
      'Taktiksel yenilik'
    ]),
    weaknesses: JSON.stringify([
      'Modern takımlara karşı yetersiz',
      'Orta saha sayısal az',
      'Kanat oyunu sınırlı'
    ]),
    ideal_opposition: '2-3-5 gibi eski formasyonlar',
    pressing_intensity: 4,
    defensive_line_height: 5,
    width: 7,
    tempo: 6,
    risk_level: 5,
    physicality_requirement: 6,
    technical_requirement: 6,
    tactical_complexity: 5,
    build_up_play: 'mixed',
    passing_style: 'direct',
    passing_directness: 7,
    defensive_approach: 'organized defense',
    attacking_approach: 'counter-attack',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'WM shape',
    required_player_profiles: JSON.stringify({
      GK: 'Traditional keeper',
      DF: 'Stopper lider + two full backs',
      MF: 'Two defensive half-backs, two inside forwards',
      FW: 'Centre-forward + two wingers'
    }),
    key_positions: JSON.stringify(['Stopper centre-half', 'Inside forwards']),
    famous_teams: JSON.stringify(['Arsenal 1930s (Chapman)', 'Many teams 1930s-50s']),
    famous_coaches: JSON.stringify(['Herbert Chapman', 'Many 1930s-50s coaches']),
    famous_matches: JSON.stringify(['Arsenal dominance 1930s']),
    variants: JSON.stringify(['Slight WM variations', '3-2-2-3 interpretations']),
    in_possession_shape: 'WM - W forward, M midfield',
    out_of_possession_shape: 'WM compact',
    transition_to_attack: 'Inside forwards link play to wingers',
    transition_to_defense: 'Stopper organizes, offside trap',
    corner_attack_strategy: 'Centre-forward target',
    corner_defense_strategy: 'Man-marking',
    free_kick_strategy: 'Direct to centre-forward',
    tactical_instructions: 'WM şeklini koru. Stopper organize et. Inside forwards link. Wingers genişlik.',
    player_instructions_by_position: JSON.stringify({
      GK: 'Traditional keeper',
      DF: 'Stopper liderlik, backs covering',
      MF: 'Defensive halves protect, inside forwards create',
      FW: 'Centre-forward target, wingers wide'
    }),
    difficulty_to_implement: 5,
    effectiveness_rating: 5,
    popularity_current: 1,
    success_rate: 65.0
  }
];

// Tüm sistemleri birleştir
const allSystems = [...massiveTacticalSystems, ...moreSystems, ...classicSystems];

// Database'e ekleme fonksiyonu
function insertSystem(system) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT OR IGNORE INTO tactical_systems (
      name, formation, category, style, era, philosophy,
      key_principles, strengths, weaknesses, ideal_opposition,
      pressing_intensity, defensive_line_height, width, tempo,
      risk_level, physicality_requirement, technical_requirement, tactical_complexity,
      build_up_play, passing_style, passing_directness,
      defensive_approach, attacking_approach,
      compactness, defensive_width, attacking_width, defensive_shape,
      required_player_profiles, key_positions,
      famous_teams, famous_coaches, famous_matches,
      variants, in_possession_shape, out_of_possession_shape,
      transition_to_attack, transition_to_defense,
      corner_attack_strategy, corner_defense_strategy, free_kick_strategy,
      tactical_instructions, player_instructions_by_position,
      difficulty_to_implement, effectiveness_rating, popularity_current, success_rate
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
      system.name, system.formation, system.category, system.style, system.era, system.philosophy,
      system.key_principles, system.strengths, system.weaknesses, system.ideal_opposition,
      system.pressing_intensity, system.defensive_line_height, system.width, system.tempo,
      system.risk_level, system.physicality_requirement, system.technical_requirement, system.tactical_complexity,
      system.build_up_play, system.passing_style, system.passing_directness,
      system.defensive_approach, system.attacking_approach,
      system.compactness, system.defensive_width, system.attacking_width, system.defensive_shape,
      system.required_player_profiles, system.key_positions,
      system.famous_teams, system.famous_coaches, system.famous_matches,
      system.variants, system.in_possession_shape, system.out_of_possession_shape,
      system.transition_to_attack, system.transition_to_defense,
      system.corner_attack_strategy, system.corner_defense_strategy, system.free_kick_strategy,
      system.tactical_instructions, system.player_instructions_by_position,
      system.difficulty_to_implement, system.effectiveness_rating, system.popularity_current, system.success_rate
    ];

    db.run(sql, values, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          console.log(`⚠️  ${system.name} - Zaten mevcut`);
          resolve({ success: false, exists: true });
        } else {
          console.error(`❌ ${system.name} - Hata:`, err.message);
          reject(err);
        }
      } else {
        console.log(`✅ ${system.name} - Eklendi!`);
        resolve({ success: true, id: this.lastID });
      }
    });
  });
}

// Ana fonksiyon
async function main() {
  console.log(`📊 Toplam ${allSystems.length} sistem eklenecek...\n`);

  let success = 0, exists = 0, errors = 0;

  for (const system of allSystems) {
    try {
      const result = await insertSystem(system);
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

  db.get('SELECT COUNT(*) as total FROM tactical_systems', (err, row) => {
    if (!err) {
      console.log(`\n🎯 Toplam sistem sayısı: ${row.total}\n`);
    }
    db.close();
  });
}

main().catch(console.error);
