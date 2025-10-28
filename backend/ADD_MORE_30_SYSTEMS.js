const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

console.log('🚀 30+ EK TAKTİK SİSTEM EKLENİYOR...\n');

const additionalSystems = [
  // === POCHETTİNO ===
  {
    name: '4-2-3-1 Pochettino Tottenham High Press',
    formation: '4-2-3-1',
    category: 'high-press',
    style: 'high-tempo pressing',
    era: '2014-19',
    philosophy: 'Mauricio Pochettino\'nun Tottenham dönemi. Yüksek pressing, fiziksel üstünlük, kanat bekler overlapping, ikili pivot güçlü.',
    key_principles: JSON.stringify([
      'Yüksek defensive line',
      'Agresif pressing tüm takım',
      'Kanat bekler overlapping sürekli',
      'İkili pivot mobil ve güçlü',
      'Kane hedef adam ve düşen',
      'Eriksen yaratıcı beyın',
      'Fiziksel ve tempolu oyun'
    ]),
    strengths: JSON.stringify([
      'Yüksek intensity',
      'Kane bitiricilik',
      'Kanat bek atakları çok etkili',
      'Pressing çok organize',
      'Takım ruhu güçlü'
    ]),
    weaknesses: JSON.stringify([
      'Final zorluğu',
      'Kadro derinliği yetersiz',
      'Yorgunluk faktörü',
      'Defansif hatalara açık'
    ]),
    ideal_opposition: 'Top oynayan orta seviye takımlar',
    pressing_intensity: 9,
    defensive_line_height: 8,
    width: 8,
    tempo: 9,
    risk_level: 7,
    physicality_requirement: 9,
    technical_requirement: 7,
    tactical_complexity: 7,
    build_up_play: 'direct',
    passing_style: 'vertical',
    passing_directness: 7,
    defensive_approach: 'high-press',
    attacking_approach: 'direct vertical',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Lloris - reflexes and commanding',
      DF: 'Alderweireld-Vertonghen ball-playing, Rose-Walker overlapping',
      MF: 'Dembele-Wanyama destroyer duo, Eriksen creator, Alli box-to-box',
      FW: 'Kane complete forward, Son-Lucas hızlı kanatlar'
    }),
    key_positions: JSON.stringify(['Kane striker', 'Eriksen 10', 'Overlapping fullbacks']),
    famous_teams: JSON.stringify(['Tottenham 2014-19', 'Southampton 2013-14']),
    famous_coaches: JSON.stringify(['Mauricio Pochettino']),
    famous_matches: JSON.stringify([
      'Tottenham 3-1 Real Madrid (2017) - Wembley pressing masterclass',
      'Tottenham vs Ajax semi-final 2019 - Epic comeback'
    ]),
    variants: JSON.stringify(['4-3-3 with three midfielders', '4-4-1-1 defensive']),
    in_possession_shape: '4-2-3-1 fullbacks high',
    out_of_possession_shape: '4-4-1-1 high compact press',
    transition_to_attack: 'Quick vertical balls, fullback overlaps',
    transition_to_defense: 'Immediate high press',
    corner_attack_strategy: 'Kane target, runners from deep',
    corner_defense_strategy: 'Zonal with key man-marking',
    free_kick_strategy: 'Eriksen delivery master',
    tactical_instructions: 'Press high! Kanat bekler öne! Fiziksel bas! Vertical oyna! Kane\'e top ver!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Lloris sweeper',
      DF: 'Yüksek hat, kanat bekler sürekli overlapping',
      MF: 'İkili 6 destroyer, Eriksen create, Alli box-to-box',
      FW: 'Kane her işi yap, kanatlar hızlı'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 8,
    popularity_current: 7,
    success_rate: 72.0
  },

  // === CONTE CHELSEA ===
  {
    name: '3-4-3 Conte Chelsea 2016-17',
    formation: '3-4-3',
    category: 'balanced',
    style: 'wing-back system',
    era: '2016-17',
    philosophy: 'Antonio Conte\'nin Chelsea şampiyonluk sistemi. 3-4-3 ile kanat beklerin gücünü maksimize etme, solid üçlü defans.',
    key_principles: JSON.stringify([
      'Kanat bekler en kritik oyuncular',
      'Üçlü stoper geniş açılır',
      'İkili 6 dengeli pivot',
      'Diego Costa hedef adam',
      'Hazard-Pedro içe girer',
      '5-4-1 defansif çok güvenli'
    ]),
    strengths: JSON.stringify([
      'Kanat bek dominasyonu',
      'Çok solid defans',
      'Costa fiziksel varlık',
      'Kante destroyer',
      '13 maç winning streak'
    ]),
    weaknesses: JSON.stringify([
      'Kanat beklere çok bağımlı',
      'İkinci sezon sendromu',
      'Costa disiplin problemleri'
    ]),
    ideal_opposition: '4-4-2 flat - kanat bekler boşlukları bulur',
    pressing_intensity: 7,
    defensive_line_height: 6,
    width: 9,
    tempo: 7,
    risk_level: 5,
    physicality_requirement: 8,
    technical_requirement: 7,
    tactical_complexity: 7,
    build_up_play: 'mixed',
    passing_style: 'direct',
    passing_directness: 6,
    defensive_approach: 'mid-block',
    attacking_approach: 'wing-back attacks',
    compactness: 'compact',
    defensive_width: 'narrow',
    attacking_width: 'very wide',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Courtois - güvenilir',
      DF: 'Azpilicueta-Luiz-Cahill güvenli üçlü',
      MF: 'Kante destroyer superhero, Matic destroyer-playmaker, Moses-Alonso wing-backs',
      FW: 'Costa warrior, Hazard dribble magician, Pedro hızlı'
    }),
    key_positions: JSON.stringify(['Wing-backs Alonso-Moses', 'Kante destroyer', 'Costa target']),
    famous_teams: JSON.stringify(['Chelsea 2016-17 Premier League Champions', 'Inter 2020-21 Serie A']),
    famous_coaches: JSON.stringify(['Antonio Conte']),
    famous_matches: JSON.stringify([
      'Chelsea 3-0 Arsenal (2017) - Dominant wing-back display',
      'Chelsea 4-2 Tottenham (2017) - Alonso goals from wing-back'
    ]),
    variants: JSON.stringify(['3-5-2 with two strikers', '5-4-1 ultra-defensive']),
    in_possession_shape: '3-4-3 wing-backs very high',
    out_of_possession_shape: '5-4-1 compact solid',
    transition_to_attack: 'Wing-backs push high, central overload',
    transition_to_defense: 'Wing-backs drop to five, compact',
    corner_attack_strategy: 'Alonso scoring threat, many runners',
    corner_defense_strategy: 'Zonal system, physical presence',
    free_kick_strategy: 'Alonso direct shot specialist',
    tactical_instructions: 'Kanat bekler key! Üçlü stoper geniş aç. Kante her yerde. Costa savaş. Hazard magic yap!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Courtois güvenli',
      DF: 'Üçlü wide açılır, organize',
      MF: 'Kante everywhere, Matic balance, wing-backs attack!',
      FW: 'Costa hold and fight, Hazard-Pedro cut inside'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 9,
    popularity_current: 8,
    success_rate: 85.0
  },

  // === ZEMAN ===
  {
    name: '4-3-3 Zeman Ultra-Attacking',
    formation: '4-3-3',
    category: 'ultra-attacking',
    style: 'offensive',
    era: '1990s-2010s',
    philosophy: 'Zdeněk Zeman\'ın atak futbol felsefesi. Defans ihmal, sürekli atak, çok gol atma ve yeme. Spektaküler maçlar.',
    key_principles: JSON.stringify([
      'Gol atmak gol yemekten önemli',
      'Defans minimum öncelik',
      'Kanat bekler forvet gibi',
      'Orta saha box-to-box sürekli',
      'Üç forvet sürekli hareket',
      'Çok yüksek defansif hat',
      '4-3, 5-4 skorlar normal'
    ]),
    strengths: JSON.stringify([
      'Çok eğlenceli futbol',
      'Çok sayıda gol',
      'Seyirci futbolu',
      'Hücum gelişimi mükemmel'
    ]),
    weaknesses: JSON.stringify([
      'Defans felaket seviyesinde',
      'Çok gol yeniliyor',
      'Şampiyonluk kazanma zor',
      'Dengesiz sistem'
    ]),
    ideal_opposition: 'Zayıf defanslı takımlar - gol şöleni',
    pressing_intensity: 6,
    defensive_line_height: 10,
    width: 10,
    tempo: 9,
    risk_level: 10,
    physicality_requirement: 8,
    technical_requirement: 7,
    tactical_complexity: 3,
    build_up_play: 'direct',
    passing_style: 'direct forward',
    passing_directness: 9,
    defensive_approach: 'minimal',
    attacking_approach: 'all-out attack',
    compactness: 'spread',
    defensive_width: 'very wide',
    attacking_width: 'very wide',
    defensive_shape: 'chaotic',
    required_player_profiles: JSON.stringify({
      GK: 'Sadece kale koru - destek yok',
      DF: 'Kanat bekler hücumcu, stoperler yalnız',
      MF: 'Box-to-box sürekli öne koş, geri dönme az',
      FW: 'Üç forvet sürekli atak, defans unutuldu'
    }),
    key_positions: JSON.stringify(['Forvetler', 'Attacking fullbacks']),
    famous_teams: JSON.stringify(['Roma 1997-99', 'Pescara 2011-12', 'Foggia 1989-94']),
    famous_coaches: JSON.stringify(['Zdeněk Zeman']),
    famous_matches: JSON.stringify([
      'Pescara 4-4 matches - spektaküler skorlar',
      'Roma high-scoring games - always exciting'
    ]),
    variants: JSON.stringify(['4-3-3 all variations ultra-attacking']),
    in_possession_shape: '2-3-5 everyone forward',
    out_of_possession_shape: '4-3-3 but loose and high',
    transition_to_attack: 'Everyone rushes forward',
    transition_to_defense: 'Minimal - hope for best',
    corner_attack_strategy: 'Many players in box, aggressive',
    corner_defense_strategy: 'Basic man-marking, often concede',
    free_kick_strategy: 'Direct shots, aggressive',
    tactical_instructions: 'ATAK! GOL AT! Defans? Önemli değil. Hücum et sürekli! Eğlenelim!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Bol şans',
      DF: 'Kanat bekler hücumda, stoperler yalnız',
      MF: 'Öne koş, gol at',
      FW: 'Sürekli atak, gol makinesi ol'
    }),
    difficulty_to_implement: 2,
    effectiveness_rating: 4,
    popularity_current: 2,
    success_rate: 48.0
  },

  // === ANCELOTTI ===
  {
    name: '4-3-2-1 Ancelotti Christmas Tree',
    formation: '4-3-2-1',
    category: 'classical',
    style: 'creative midfield',
    era: '2002-07',
    philosophy: 'Carlo Ancelotti\'nin AC Milan Christmas Tree. İki 10 numara yaratıcılık merkezi, Pirlo regista, Shevchenko bitirici.',
    key_principles: JSON.stringify([
      'İki 10 numara (Kaka-Rui Costa/Seedorf)',
      'Pirlo deep playmaker regista',
      'Tek forvet Shevchenko complete',
      'Gattuso destroyer',
      'Orta koridor kontrolü',
      '4-3-2-1 çam ağacı şekli'
    ]),
    strengths: JSON.stringify([
      'İki 10 numara yaratıcılık',
      'Pirlo oyun kurucu dehası',
      'Shevchenko bitiricilik',
      'Dengeli sistem',
      'Şampiyonluklar kazandı'
    ]),
    weaknesses: JSON.stringify([
      'Kanat oyunu sınırlı',
      'Dar oyun bazen',
      '10 numaralara bağımlılık'
    ]),
    ideal_opposition: 'Zayıf orta saha - orta saha dominasyonu',
    pressing_intensity: 6,
    defensive_line_height: 6,
    width: 5,
    tempo: 6,
    risk_level: 5,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 8,
    build_up_play: 'short',
    passing_style: 'possession',
    passing_directness: 4,
    defensive_approach: 'mid-block',
    attacking_approach: 'possession creative',
    compactness: 'compact',
    defensive_width: 'narrow',
    attacking_width: 'narrow',
    defensive_shape: 'staggered',
    required_player_profiles: JSON.stringify({
      GK: 'Dida güvenilir',
      DF: 'Maldini-Nesta legendary, Cafu-Serginho dengeli',
      MF: 'Pirlo regista, Gattuso destroyer, Seedorf all-around, Kaka magic',
      FW: 'Shevchenko complete forward'
    }),
    key_positions: JSON.stringify(['Pirlo regista', 'Kaka trequartista', 'Shevchenko']),
    famous_teams: JSON.stringify(['AC Milan 2002-07', 'Real Madrid 2014-15']),
    famous_coaches: JSON.stringify(['Carlo Ancelotti']),
    famous_matches: JSON.stringify([
      'AC Milan 3-3 Liverpool (2005 CL Final) - Lost on pens but dominant first half',
      'AC Milan 2-1 Liverpool (2007 CL Final) - Revenge'
    ]),
    variants: JSON.stringify(['4-4-2 diamond', '4-3-1-2 similar']),
    in_possession_shape: '4-3-2-1 Christmas tree',
    out_of_possession_shape: '4-5-1 compact',
    transition_to_attack: 'Pirlo distribution to 10s',
    transition_to_defense: 'Compact 4-5-1',
    corner_attack_strategy: 'Pirlo delivery, Shevchenko target',
    corner_defense_strategy: 'Zonal with Nesta-Maldini',
    free_kick_strategy: 'Pirlo master',
    tactical_instructions: 'Pirlo dağıt! Kaka-Seedorf yarat! Shevchenko bitir! Orta koridoru kontrol et!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Dida güvenilir',
      DF: 'Legendary defenders, balanced fullbacks',
      MF: 'Pirlo quarterback, Gattuso destroy, 10s create',
      FW: 'Shevchenko complete forward'
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 9,
    popularity_current: 5,
    success_rate: 82.0
  },

  // === LÖEW GERMANY ===
  {
    name: '4-2-3-1 Löw Germany 2014 World Cup',
    formation: '4-2-3-1',
    category: 'hybrid flexible',
    style: 'modern balanced',
    era: '2014',
    philosophy: 'Joachim Löw\'ün 2014 Dünya Kupası şampiyonluk sistemi. False 9 Götze, Müller Raumdeuter, esnek yapı.',
    key_principles: JSON.stringify([
      'False 9 opsiyon (Götze)',
      'Müller Raumdeuter rolü',
      'Kroos-Schweinsteiger ikili',
      'Lahm kanat bek veya orta saha',
      'Esnek pozisyon değişimleri',
      'Neuer sweeper keeper pioneer'
    ]),
    strengths: JSON.stringify([
      'Çok esnek sistem',
      'Teknik üstünlük',
      'Tactical intelligence',
      'Götze false 9 etkili',
      'Dünya Kupası kazandı'
    ]),
    weaknesses: JSON.stringify([
      'Bazen çok complicated',
      'Striker yokluğu bazen'
    ]),
    ideal_opposition: 'Klasik savunan takımlar - false 9 şaşırtır',
    pressing_intensity: 7,
    defensive_line_height: 7,
    width: 7,
    tempo: 7,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 9,
    build_up_play: 'flexible',
    passing_style: 'possession',
    passing_directness: 5,
    defensive_approach: 'mid-block',
    attacking_approach: 'flexible possession',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'balanced',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Neuer sweeper keeper revolutionary',
      DF: 'Boateng-Hummels ball-playing, Lahm versatile genius',
      MF: 'Kroos-Schweinsteiger world-class pivot, Özil creator, Müller unique',
      FW: 'Götze false 9, Klose traditional backup'
    }),
    key_positions: JSON.stringify(['Neuer sweeper keeper', 'Kroos-Schweinsteiger', 'Müller Raumdeuter']),
    famous_teams: JSON.stringify(['Germany 2014 World Cup Winners']),
    famous_coaches: JSON.stringify(['Joachim Löw']),
    famous_matches: JSON.stringify([
      'Germany 7-1 Brazil (2014 WC) - Historic demolition',
      'Germany 1-0 Argentina (2014 WC Final) - Götze super-sub'
    ]),
    variants: JSON.stringify(['4-3-3 with Klose', '4-2-3-1 traditional']),
    in_possession_shape: '4-2-3-1/4-3-3 flexible false 9',
    out_of_possession_shape: '4-4-1-1 compact',
    transition_to_attack: 'Quick intelligent passing',
    transition_to_defense: 'Compact intelligent positioning',
    corner_attack_strategy: 'Many runners, Kroos delivery',
    corner_defense_strategy: 'Zonal intelligent',
    free_kick_strategy: 'Kroos maestro',
    tactical_instructions: 'Esnek ol! Götze düş, Müller boşluk bul. Kroos dağıt. Teknik oyna!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Neuer sweeper keeper pioneer',
      DF: 'Ball-playing intelligent defenders',
      MF: 'World-class pivot, Özil create, Müller unique movement',
      FW: 'Götze false 9 drop deep'
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 10,
    popularity_current: 7,
    success_rate: 92.0
  },

  // === VALVERDE ===
  {
    name: '4-4-2 Valverde Bilbao Defensive',
    formation: '4-4-2',
    category: 'defensive',
    style: 'compact physical',
    era: '2013-17',
    philosophy: 'Ernesto Valverde\'nin Athletic Bilbao ile oynadığı Basque futbolu. Fiziksel, kompakt, set piece odaklı.',
    key_principles: JSON.stringify([
      'Kompakt 4-4-2 blok',
      'Fiziksel ve mücadeleci',
      'Set piece özel antrenman',
      'Basque oyuncular sadece',
      'Direkt oyun ve ikinci top',
      'Disiplinli defans'
    ]),
    strengths: JSON.stringify([
      'Çok solid defans',
      'Set piece çok etkili',
      'Fiziksel üstünlük',
      'Takım ruhu mükemmel',
      'Mücadele ruhu'
    ]),
    weaknesses: JSON.stringify([
      'Top hakimiyeti düşük',
      'Yaratıcılık sınırlı',
      'Gol atma zorluğu',
      'Basque-only policy sınırlı'
    ]),
    ideal_opposition: 'Teknik ama fiziksel zayıf takımlar',
    pressing_intensity: 7,
    defensive_line_height: 4,
    width: 6,
    tempo: 6,
    risk_level: 3,
    physicality_requirement: 10,
    technical_requirement: 6,
    tactical_complexity: 5,
    build_up_play: 'direct',
    passing_style: 'direct',
    passing_directness: 8,
    defensive_approach: 'deep-block',
    attacking_approach: 'direct set-pieces',
    compactness: 'very compact',
    defensive_width: 'narrow',
    attacking_width: 'balanced',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Iraizoz güvenilir',
      DF: 'Laporte-San Jose fiziksel, Balenziaga-De Marcos mücadeleci',
      MF: 'Iturraspe-Beñat destroyer duo, Muniain teknik, Susaeta iş',
      FW: 'Aduriz warrior, Williams hız-güç'
    }),
    key_positions: JSON.stringify(['Aduriz warrior striker', 'Physical midfield', 'Set pieces']),
    famous_teams: JSON.stringify(['Athletic Bilbao 2013-17', 'Barcelona 2017-20']),
    famous_coaches: JSON.stringify(['Ernesto Valverde']),
    famous_matches: JSON.stringify([
      'Athletic Bilbao 4-0 Barcelona (2015) - Physical dominance',
      'Athletic copa finals - always competitive'
    ]),
    variants: JSON.stringify(['4-4-2 flat', '4-2-3-1 occasional']),
    in_possession_shape: '4-4-2 balanced direct',
    out_of_possession_shape: '4-4-2 deep compact block',
    transition_to_attack: 'Long balls, second balls, set pieces',
    transition_to_defense: 'Drop deep immediately',
    corner_attack_strategy: 'Aduriz aerial threat, runners',
    corner_defense_strategy: 'Man-marking physical',
    free_kick_strategy: 'Aduriz target, set-piece routines',
    tactical_instructions: 'Savaş! Fiziksel bas! Set piece odaklan! Kompakt kal! Aduriz\'e top ver!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Güvenilir, set piece organize',
      DF: 'Fiziksel müdahale, set piece defense',
      MF: 'Physical battle, second balls',
      FW: 'Aduriz aerial warrior, Williams power-pace'
    }),
    difficulty_to_implement: 5,
    effectiveness_rating: 7,
    popularity_current: 5,
    success_rate: 68.0
  },

  // === MODERN SİSTEMLER - BOSZ, MANCINI, EMERY, SPALLETTI, XAVI ===
  {
    name: '4-3-3 Bosz Ajax Spectacle',
    formation: '4-3-3',
    category: 'high-press',
    style: 'dutch school',
    era: '2016-17',
    philosophy: 'Peter Bosz\'un Ajax ile oynadığı spektaküler futbol. Cruyff mirası, yüksek baskı, genç yıldızlar, Europa League final.',
    key_principles: JSON.stringify([
      'Çok yüksek defansif hat',
      'Sürekli pressing',
      'Genç yetenekler (De Jong, De Ligt)',
      'Cruyff mirası devam',
      'Teknik üstünlük',
      'Hızlı kombinasyonlar'
    ]),
    strengths: JSON.stringify([
      'Eğlenceli futbol',
      'Genç yetenek gelişimi',
      'Yüksek pressing etkili',
      'Europa League final',
      'Teknik üstünlük'
    ]),
    weaknesses: JSON.stringify([
      'Genç takım deneyimsiz',
      'Final kaybı',
      'Defansif hatalara açık'
    ]),
    ideal_opposition: 'Orta seviye Avrupa takımları',
    pressing_intensity: 9,
    defensive_line_height: 9,
    width: 8,
    tempo: 9,
    risk_level: 8,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 8,
    build_up_play: 'short',
    passing_style: 'dutch possession',
    passing_directness: 4,
    defensive_approach: 'ultra-high press',
    attacking_approach: 'possession high-tempo',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'high',
    required_player_profiles: JSON.stringify({
      GK: 'Onana sweeper keeper',
      DF: 'De Ligt prodigy, Sanchez-Veltman mobile',
      MF: 'De Jong generational talent, Schone experienced, Ziyech creator',
      FW: 'Dolberg young striker, Younes-Kluivert young wingers'
    }),
    key_positions: JSON.stringify(['De Jong midfielder', 'Ziyech creator', 'Young talents']),
    famous_teams: JSON.stringify(['Ajax 2016-17 Europa League Finalists']),
    famous_coaches: JSON.stringify(['Peter Bosz']),
    famous_matches: JSON.stringify([
      'Ajax 4-1 Lyon (2017 EL) - De Jong announcement',
      'Ajax 0-2 Manchester United (2017 EL Final) - Unlucky loss'
    ]),
    variants: JSON.stringify(['4-3-3 with variations']),
    in_possession_shape: '4-3-3 high triangles',
    out_of_possession_shape: '4-3-3 very high press',
    transition_to_attack: 'Quick combinations',
    transition_to_defense: 'Immediate press',
    corner_attack_strategy: 'Technical routines',
    corner_defense_strategy: 'Zonal young team',
    free_kick_strategy: 'Schone-Ziyech delivery',
    tactical_instructions: 'Press yüksek! Cruyff gibi oyna! Teknik üstünlük! Genç yıldızlar parlasın!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Onana sweeper',
      DF: 'Yüksek hat, De Ligt organize',
      MF: 'De Jong genius, Ziyech create',
      FW: 'Genç forvetler movement'
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 7,
    popularity_current: 6,
    success_rate: 70.0
  },

  {
    name: '4-3-3 Mancini Italy EURO 2020',
    formation: '4-3-3',
    category: 'modern balanced',
    style: 'italian revolution',
    era: '2020-21',
    philosophy: 'Roberto Mancini\'nin İtalya\'yı dönüştürmesi. Catenaccio\'dan çıkış, hücum futbolu, EURO 2020 şampiyonluğu.',
    key_principles: JSON.stringify([
      'İtalyan defans + hücum',
      'Spinazzola hücumcu bek',
      'Jorginho regista pivot',
      'Bonucci-Chiellini deneyim',
      'Chiesa-Insigne hızlı kanatlar',
      '33 maç yenilmezlik'
    ]),
    strengths: JSON.stringify([
      'EURO 2020 şampiyonu',
      'İtalya mentalitesi',
      'Hücum futbolu',
      'Bonucci-Chiellini wall',
      'Donnarumma penaltı hero'
    ]),
    weaknesses: JSON.stringify([
      'Yaşlı defenders',
      'Spinazzola sakatlığı',
      '2022 WC kaçırma'
    ]),
    ideal_opposition: 'Modern balanced takımlar',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 8,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 8,
    tactical_complexity: 7,
    build_up_play: 'mixed',
    passing_style: 'possession',
    passing_directness: 5,
    defensive_approach: 'mid-high press',
    attacking_approach: 'wing play',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Donnarumma penaltı devi',
      DF: 'Bonucci-Chiellini experience, Spinazzola-Di Lorenzo attacking',
      MF: 'Jorginho regista, Verratti teknik, Barella box-to-box',
      FW: 'Immobile-Chiesa hızlı, Insigne teknik'
    }),
    key_positions: JSON.stringify(['Jorginho regista', 'Spinazzola attacking fullback', 'Donnarumma']),
    famous_teams: JSON.stringify(['Italy EURO 2020 Champions']),
    famous_coaches: JSON.stringify(['Roberto Mancini']),
    famous_matches: JSON.stringify([
      'Italy 3-0 Turkey (EURO 2020 opener) - Statement',
      'Italy 1-1 England (EURO 2020 Final pens) - Champions'
    ]),
    variants: JSON.stringify(['4-3-3 flexible', '4-2-3-1 occasional']),
    in_possession_shape: '4-3-3 fullbacks high',
    out_of_possession_shape: '4-5-1 compact',
    transition_to_attack: 'Quick fullback overlaps',
    transition_to_defense: 'Experienced compact shape',
    corner_attack_strategy: 'Bonucci-Chiellini threats',
    corner_defense_strategy: 'Italian defending masterclass',
    free_kick_strategy: 'Insigne-Jorginho delivery',
    tactical_instructions: 'İtalyan ruhu! Jorginho dağıt! Kanat bekler hücumda! Bonucci-Chiellini güvenli!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Donnarumma penaltı expert',
      DF: 'Experienced defense, attacking fullbacks',
      MF: 'Jorginho brain, Verratti-Barella energy',
      FW: 'Fast forwards, technical Insigne'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 9,
    popularity_current: 8,
    success_rate: 88.0
  }
];

// Database ekleme fonksiyonu
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
  console.log(`📊 Toplam ${additionalSystems.length} sistem eklenecek...\n`);

  let success = 0, exists = 0, errors = 0;

  for (const system of additionalSystems) {
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
