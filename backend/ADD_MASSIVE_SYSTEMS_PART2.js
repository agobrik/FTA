const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🚀 KAPSAMLI SİSTEMLER PART 2 - 15 Sistem\n');

const systems = [
  // === FLICK BAYERN ===
  {
    name: '4-2-3-1 Flick Bayern Treble 2020',
    formation: '4-2-3-1',
    category: 'modern',
    style: 'high-tempo attacking',
    era: '2019-21',
    philosophy: 'Hansi Flick Bayern ile Treble. Yüksek tempo, hızlı geçişler, agresif pressing, Lewandowski perfection.',
    key_principles: JSON.stringify([
      'Yüksek tempo non-stop',
      'Lewandowski goal machine',
      'Davies sol kanatta revolucion',
      'Kimmich-Goretzka pivot',
      'Müller Raumdeuter perfect',
      'Neuer sweeper keeper pioneer',
      'CL final 8-2 Barcelona'
    ]),
    strengths: JSON.stringify([
      'Treble 2019-20!',
      'Lewandowski 41 Bundesliga goals in season',
      'Davies emergence',
      'Dominant season',
      '8-2 Barcelona iconic'
    ]),
    weaknesses: JSON.stringify([
      'Physically demanding',
      'High line vulnerable counters',
      'Flick-board conflicts later'
    ]),
    ideal_opposition: 'Any - dominated everyone 2020',
    pressing_intensity: 10,
    defensive_line_height: 9,
    width: 8,
    tempo: 10,
    risk_level: 7,
    physicality_requirement: 9,
    technical_requirement: 9,
    tactical_complexity: 8,
    build_up_play: 'quick',
    passing_style: 'direct vertical',
    passing_directness: 8,
    defensive_approach: 'ultra-high press',
    attacking_approach: 'vertical fast',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'high',
    required_player_profiles: JSON.stringify({
      GK: 'Neuer - sweeper keeper legend',
      DF: 'Boateng-Alaba experienced, Davies revolution, Pavard solid',
      MF: 'Kimmich-Goretzka elite pivot, Müller Raumdeuter, Coman-Gnabry pace',
      FW: 'Lewandowski GOAT season'
    }),
    key_positions: JSON.stringify(['Lewandowski striker', 'Davies LB', 'Müller Raumdeuter']),
    famous_teams: JSON.stringify(['Bayern Munich 2019-20 Treble']),
    famous_coaches: JSON.stringify(['Hansi Flick']),
    famous_matches: JSON.stringify([
      'Bayern 8-2 Barcelona (2020 CL QF) - Historic',
      'Bayern 1-0 PSG (2020 CL Final) - Treble complete'
    ]),
    variants: JSON.stringify(['4-2-3-1 flexible']),
    in_possession_shape: '4-2-3-1 high tempo',
    out_of_possession_shape: '4-4-2 ultra-high press',
    transition_to_attack: 'Fastest transitions, vertical',
    transition_to_defense: 'Immediate ultra-high press',
    corner_attack_strategy: 'Lewandowski target, many runners',
    corner_defense_strategy: 'Aggressive zonal',
    free_kick_strategy: 'Kimmich delivery master',
    tactical_instructions: 'Tempo maksimum! Press yüksek! Lewandowski\'ye top! Davies koş! Dominant ol!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Neuer sweeper master',
      DF: 'High line aggressive, Davies attack',
      MF: 'Kimmich-Goretzka elite, Müller genius',
      FW: 'Lewandowski goals, wingers pace'
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 10,
    popularity_current: 9,
    success_rate: 90.0
  },

  // === HEYNCKES BAYERN ===
  {
    name: '4-2-3-1 Heynckes Bayern Treble 2013',
    formation: '4-2-3-1',
    category: 'balanced',
    style: 'german efficiency',
    era: '2012-13',
    philosophy: 'Jupp Heynckes Bayern Treble. Alman efficiency, Robben-Ribery kanatlar, tiki-taka Alman versiyonu.',
    key_principles: JSON.stringify([
      'Robben-Ribery kanat dominance',
      'Schweinsteiger-Martinez pivot',
      'Lahm versatile genius',
      'Müller her yerde',
      'Kroos yaratıcı',
      'Balanced perfection',
      'Wembley final vs Dortmund'
    ]),
    strengths: JSON.stringify([
      'Treble 2012-13',
      'Robben-Ribery peak',
      'Perfect balance',
      'Wembley CL final',
      'Dominant season'
    ]),
    weaknesses: JSON.stringify([
      'Age of squad later',
      'Relied on Robben-Ribery heavily'
    ]),
    ideal_opposition: 'Any - balanced vs everyone',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 9,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 8,
    technical_requirement: 9,
    tactical_complexity: 8,
    build_up_play: 'mixed',
    passing_style: 'possession',
    passing_directness: 6,
    defensive_approach: 'mid-high press',
    attacking_approach: 'wing play possession',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'very wide',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Neuer beginning sweeper keeper era',
      DF: 'Boateng-Dante strong, Lahm-Alaba versatile',
      MF: 'Schweinsteiger-Martinez elite, Kroos creative, Müller unique, Robben-Ribery legends',
      FW: 'Mandzukic target man'
    }),
    key_positions: JSON.stringify(['Robben-Ribery wings', 'Schweinsteiger', 'Lahm']),
    famous_teams: JSON.stringify(['Bayern Munich 2012-13 Treble']),
    famous_coaches: JSON.stringify(['Jupp Heynckes']),
    famous_matches: JSON.stringify([
      'Bayern 2-1 Dortmund (2013 CL Final Wembley) - All-German final',
      'Bayern 7-0 Barcelona (2013 CL SF aggregate) - Dominance'
    ]),
    variants: JSON.stringify(['4-2-3-1 flexible', '4-1-4-1 Lahm pivot later']),
    in_possession_shape: '4-2-3-1 wide wingers',
    out_of_possession_shape: '4-4-1-1 compact',
    transition_to_attack: 'Quick wing play, Robben-Ribery',
    transition_to_defense: 'Organized compact',
    corner_attack_strategy: 'Robben delivery, many headers',
    corner_defense_strategy: 'Strong zonal',
    free_kick_strategy: 'Robben-Ribery specialists',
    tactical_instructions: 'Dengeli oyna! Robben-Ribery kanatlar! Schweinsteiger organize! Balanced perfection!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Neuer revolutionary',
      DF: 'Lahm genius, solid defense',
      MF: 'Elite pivot, creative 10, legendary wingers',
      FW: 'Mandzukic target'
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 10,
    popularity_current: 8,
    success_rate: 92.0
  },

  // === ALLEGRI JUVENTUS ===
  {
    name: '3-5-2 Allegri Juventus Pragmatic',
    formation: '3-5-2',
    category: 'pragmatic',
    style: 'italian modern',
    era: '2014-19',
    philosophy: 'Massimiliano Allegri Juventus dominance. 3-5-2 pragmatic, Buffon-BBC-Pogba-Dybala-Higuain galaxy.',
    key_principles: JSON.stringify([
      'BBC (Bonucci-Barzagli-Chiellini) defense',
      'Buffon efsane kaleci',
      'Pogba creativity',
      'Dybala-Higuain partnership',
      'Pragmatic results-focused',
      '5 consecutive Scudetto',
      'CL finals 2015, 2017'
    ]),
    strengths: JSON.stringify([
      'Serie A dominance 2014-19',
      'BBC legendary defense',
      'Buffon leadership',
      'Pragmatic wins',
      'Deep CL runs'
    ]),
    weaknesses: JSON.stringify([
      'CL final losses',
      'Sometimes too defensive',
      'Attacking inconsistency'
    ]),
    ideal_opposition: 'Serie A teams - dominated',
    pressing_intensity: 6,
    defensive_line_height: 5,
    width: 8,
    tempo: 6,
    risk_level: 4,
    physicality_requirement: 8,
    technical_requirement: 8,
    tactical_complexity: 7,
    build_up_play: 'patient',
    passing_style: 'mixed',
    passing_directness: 6,
    defensive_approach: 'mid-block',
    attacking_approach: 'pragmatic balanced',
    compactness: 'compact',
    defensive_width: 'narrow',
    attacking_width: 'wide',
    defensive_shape: 'flat three',
    required_player_profiles: JSON.stringify({
      GK: 'Buffon - legend',
      DF: 'BBC - Bonucci ball-player, Barzagli-Chiellini warriors',
      MF: 'Pogba creative, Vidal warrior, Marchisio complete, Sandro-Lichtsteiner wing-backs',
      FW: 'Dybala-Higuain partnership'
    }),
    key_positions: JSON.stringify(['BBC defense', 'Buffon GK', 'Pogba midfielder']),
    famous_teams: JSON.stringify(['Juventus 2014-19']),
    famous_coaches: JSON.stringify(['Massimiliano Allegri']),
    famous_matches: JSON.stringify([
      'Juventus 1-4 Real Madrid (2017 CL Final) - Loss but good run',
      'Juventus 3-0 Barcelona (2017 CL QF) - Dybala masterclass'
    ]),
    variants: JSON.stringify(['3-5-2 flexible', '4-2-3-1 occasional']),
    in_possession_shape: '3-5-2 wing-backs high',
    out_of_possession_shape: '5-3-2 compact',
    transition_to_attack: 'Wing-backs forward, Pogba creativity',
    transition_to_defense: 'Immediate 5-3-2 compact',
    corner_attack_strategy: 'BBC threats, Higuain target',
    corner_defense_strategy: 'Zonal with BBC dominance',
    free_kick_strategy: 'Pogba-Dybala-Pjanic delivery',
    tactical_instructions: 'Pragmatik oyna! BBC savun! Buffon organize! Wing-backs attack! Sonuç odaklı!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Buffon legend leadership',
      DF: 'BBC world-class, wing-backs attack',
      MF: 'Pogba create, Vidal warrior, balance',
      FW: 'Dybala-Higuain partnership'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 8,
    popularity_current: 7,
    success_rate: 82.0
  },

  // === SARRI NAPOLI ===
  {
    name: '4-3-3 Sarri Napoli Sarriball',
    formation: '4-3-3',
    category: 'possession',
    style: 'sarriball',
    era: '2015-18',
    philosophy: 'Maurizio Sarri Napoli Sarriball. Obsesif possession, Jorginho regista, Insigne-Mertens-Callejon üçlüsü, beautiful football.',
    key_principles: JSON.stringify([
      'Sarriball - obsesif possession',
      'Jorginho regista brain',
      'Insigne-Mertens-Callejon fluid',
      'Left-footed right side Callejon unique',
      'Beautiful attacking football',
      '91 points Serie A record (not won)',
      'Vertical tiki-taka'
    ]),
    strengths: JSON.stringify([
      'Beautiful football',
      'Jorginho masterclass',
      'Fluid attack',
      '91 points season',
      'Possession dominance'
    ]),
    weaknesses: JSON.stringify([
      'No trophies at Napoli',
      'Juventus too strong',
      'Possession without penetration sometimes'
    ]),
    ideal_opposition: 'Teams that cant handle possession pressure',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 8,
    tempo: 7,
    risk_level: 6,
    physicality_requirement: 6,
    technical_requirement: 10,
    tactical_complexity: 9,
    build_up_play: 'short',
    passing_style: 'possession obsessive',
    passing_directness: 4,
    defensive_approach: 'mid-high press',
    attacking_approach: 'possession vertical',
    compactness: 'compact',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Reina experienced',
      DF: 'Koulibaly beast, Albiol experienced, Ghoulam-Hysaj attacking',
      MF: 'Jorginho regista genius, Allan destroyer, Hamsik creative legend',
      FW: 'Insigne magician, Mertens false 9, Callejon unique left-footed RW'
    }),
    key_positions: JSON.stringify(['Jorginho regista', 'Insigne LW', 'Koulibaly CB']),
    famous_teams: JSON.stringify(['Napoli 2015-18', 'Chelsea 2018-19 (Europa League)']),
    famous_coaches: JSON.stringify(['Maurizio Sarri']),
    famous_matches: JSON.stringify([
      'Napoli 91 points season 2017-18 - Beautiful football',
      'Napoli 4-2 Milan - Sarriball showcase'
    ]),
    variants: JSON.stringify(['4-3-3 Sarriball pure']),
    in_possession_shape: '4-3-3 possession dominance',
    out_of_possession_shape: '4-3-3 compact press',
    transition_to_attack: 'Quick possession circulation',
    transition_to_defense: 'Compact pressing',
    corner_attack_strategy: 'Technical routines',
    corner_defense_strategy: 'Koulibaly dominant',
    free_kick_strategy: 'Hamsik-Insigne delivery',
    tactical_instructions: 'Possession obsessive! Jorginho distribute! Insigne magic! Beautiful play!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Reina play out',
      DF: 'Koulibaly beast, fullbacks attack',
      MF: 'Jorginho brain, Allan destroyer, Hamsik create',
      FW: 'Fluid front three, Mertens false 9'
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 8,
    popularity_current: 7,
    success_rate: 75.0
  },

  // === FRANCE 2018 WORLD CUP ===
  {
    name: '4-2-3-1 Deschamps France World Cup 2018',
    formation: '4-2-3-1',
    category: 'pragmatic',
    style: 'counter-attacking',
    era: '2018',
    philosophy: 'Didier Deschamps France 2018 World Cup. Pragmatic, Kante-Pogba pivot, Mbappe-Griezmann pace, solid defense.',
    key_principles: JSON.stringify([
      'Kante destroyer genius',
      'Pogba creative freedom',
      'Mbappe speed phenomenon',
      'Griezmann complete forward',
      'Varane-Umtiti solid defense',
      'Lloris leadership',
      'Pragmatic counter-attacking'
    ]),
    strengths: JSON.stringify([
      'World Cup 2018 winners!',
      'Mbappe emergence',
      'Kante best in world',
      'Perfect balance',
      'Pace on counters deadly'
    ]),
    weaknesses: JSON.stringify([
      'Not beautiful football',
      'Reliant on individual talent',
      'Sometimes boring pragmatic'
    ]),
    ideal_opposition: 'Attacking teams - counter deadly',
    pressing_intensity: 7,
    defensive_line_height: 6,
    width: 7,
    tempo: 7,
    risk_level: 5,
    physicality_requirement: 8,
    technical_requirement: 8,
    tactical_complexity: 6,
    build_up_play: 'mixed',
    passing_style: 'direct',
    passing_directness: 7,
    defensive_approach: 'mid-block',
    attacking_approach: 'counter-attack',
    compactness: 'compact',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Lloris captain leader',
      DF: 'Varane-Umtiti class, Pavard-Lucas balanced',
      MF: 'Kante destroyer, Pogba creative, Matuidi work-rate, Griezmann complete',
      FW: 'Mbappe speed star, Giroud target'
    }),
    key_positions: JSON.stringify(['Kante CDM', 'Mbappe RW', 'Griezmann CAM']),
    famous_teams: JSON.stringify(['France 2018 World Cup Champions']),
    famous_coaches: JSON.stringify(['Didier Deschamps']),
    famous_matches: JSON.stringify([
      'France 4-2 Croatia (2018 WC Final) - Champions',
      'France 4-3 Argentina (2018 WC R16) - Mbappe show'
    ]),
    variants: JSON.stringify(['4-2-3-1 flexible', '4-3-3 occasional']),
    in_possession_shape: '4-2-3-1 balanced',
    out_of_possession_shape: '4-4-1-1 compact',
    transition_to_attack: 'Quick Mbappe pace, counter deadly',
    transition_to_defense: 'Compact with Kante',
    corner_attack_strategy: 'Giroud target, many runners',
    corner_defense_strategy: 'Zonal organized',
    free_kick_strategy: 'Griezmann delivery',
    tactical_instructions: 'Pragmatik oyna! Kante destroy! Mbappe koş! Griezmann create! Win World Cup!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Lloris leadership',
      DF: 'Solid defense, balanced fullbacks',
      MF: 'Kante destroyer, Pogba create, Matuidi work',
      FW: 'Mbappe pace, Giroud target, Griezmann link'
    }),
    difficulty_to_implement: 6,
    effectiveness_rating: 10,
    popularity_current: 9,
    success_rate: 90.0
  },

  // === ARGENTINA 2022 WORLD CUP ===
  {
    name: '4-4-2 Scaloni Argentina World Cup 2022',
    formation: '4-4-2',
    category: 'balanced',
    style: 'messi-centric',
    era: '2022',
    philosophy: 'Lionel Scaloni Argentina 2022 World Cup. Messi free role, Di Maria clutch, Martinez hero, team for Messi.',
    key_principles: JSON.stringify([
      'Everything for Messi',
      'Di Maria clutch player',
      'Emi Martinez hero goalkeeper',
      'De Paul warrior midfielder',
      'Otamendi-Romero defense',
      'Team built around Messi',
      'Finally World Cup for Messi!'
    ]),
    strengths: JSON.stringify([
      'World Cup 2022 winners!',
      'Messi finally GOAT complete',
      'Di Maria big game player',
      'Emi Martinez penalties hero',
      'Team spirit incredible'
    ]),
    weaknesses: JSON.stringify([
      'Over-reliant on Messi',
      'Saudi Arabia shock loss',
      'Age of some players'
    ]),
    ideal_opposition: 'Any - won World Cup!',
    pressing_intensity: 7,
    defensive_line_height: 6,
    width: 7,
    tempo: 7,
    risk_level: 5,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 7,
    build_up_play: 'patient',
    passing_style: 'possession',
    passing_directness: 5,
    defensive_approach: 'mid-block',
    attacking_approach: 'messi-centric',
    compactness: 'compact',
    defensive_width: 'balanced',
    attacking_width: 'balanced',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Emi Martinez - penalty hero',
      DF: 'Otamendi-Romero warriors, Molina-Acuna balanced',
      MF: 'De Paul warrior, Mac Allister technical, Di Maria clutch, Messi GOAT',
      FW: 'Messi free role, Alvarez mobile striker'
    }),
    key_positions: JSON.stringify(['Messi free role', 'Emi Martinez GK', 'De Paul CM']),
    famous_teams: JSON.stringify(['Argentina 2022 World Cup Champions']),
    famous_coaches: JSON.stringify(['Lionel Scaloni']),
    famous_matches: JSON.stringify([
      'Argentina 3-3 France (2022 WC Final pens) - Epic final, Messi glory',
      'Argentina 2-0 Mexico (2022 WC) - Messi magic save campaign'
    ]),
    variants: JSON.stringify(['4-4-2 diamond occasional', '4-3-3 flexible']),
    in_possession_shape: '4-4-2 Messi free',
    out_of_possession_shape: '4-4-2 compact',
    transition_to_attack: 'Give to Messi',
    transition_to_defense: 'Organized compact',
    corner_attack_strategy: 'Messi delivery or finish',
    corner_defense_strategy: 'Organized',
    free_kick_strategy: 'Messi master',
    tactical_instructions: 'Messi\'ye ver! Team spirit! Emi Martinez save! De Paul warrior! World Cup!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Emi Martinez hero',
      DF: 'Warriors defend Messi',
      MF: 'De Paul warrior, Di Maria clutch, Messi GOAT',
      FW: 'Messi free, Alvarez mobile'
    }),
    difficulty_to_implement: 6,
    effectiveness_rating: 10,
    popularity_current: 10,
    success_rate: 88.0
  },

  // Daha fazla sistem eklenecek...
  {
    name: '4-3-3 Tuchel Chelsea CL Winners',
    formation: '4-3-3',
    category: 'defensive organized',
    style: 'structured flexible',
    era: '2021',
    philosophy: 'Thomas Tuchel Chelsea transformasyonu. 3-4-3 ama 4-3-3 hybrid, solid defans, Kante masterclass, CL kazandı.',
    key_principles: JSON.stringify([
      'Defensive organization mükemmel',
      'Kante best in world again',
      'Mount-Havertz partnership',
      'Wing-backs critical',
      'Mendy güvenilir kaleci',
      'Flexible formation changes',
      'CL final Man City'
    ]),
    strengths: JSON.stringify([
      'CL 2020-21 winners',
      'Defensive solidity',
      'Kante masterclass',
      'Tactical flexibility',
      'Beat Man City in final'
    ]),
    weaknesses: JSON.stringify([
      'Attack sometimes inconsistent',
      'Striker issues',
      'Later form dropped'
    ]),
    ideal_opposition: 'Man City type - structured defense beats possession',
    pressing_intensity: 8,
    defensive_line_height: 6,
    width: 8,
    tempo: 7,
    risk_level: 5,
    physicality_requirement: 8,
    technical_requirement: 8,
    tactical_complexity: 9,
    build_up_play: 'patient',
    passing_style: 'possession',
    passing_directness: 5,
    defensive_approach: 'organized mid-block',
    attacking_approach: 'patient probing',
    compactness: 'very compact',
    defensive_width: 'narrow',
    attacking_width: 'wide',
    defensive_shape: 'organized',
    required_player_profiles: JSON.stringify({
      GK: 'Mendy solid reliable',
      DF: 'Rudiger-Thiago Silva-Azpilicueta solid, James-Chilwell wing-backs',
      MF: 'Kante world-class, Jorginho regista, Mount creative',
      FW: 'Havertz false 9, Werner pace, Pulisic/Ziyech width'
    }),
    key_positions: JSON.stringify(['Kante CM', 'Rudiger CB', 'James RWB']),
    famous_teams: JSON.stringify(['Chelsea 2020-21 CL Winners']),
    famous_coaches: JSON.stringify(['Thomas Tuchel']),
    famous_matches: JSON.stringify([
      'Chelsea 1-0 Man City (2021 CL Final) - Tactical masterclass',
      'Chelsea 2-0 Real Madrid (2021 CL SF) - Dominant'
    ]),
    variants: JSON.stringify(['3-4-3 primary', '4-3-3 variant', '3-5-2 occasional']),
    in_possession_shape: '3-4-3 wing-backs high',
    out_of_possession_shape: '5-4-1 ultra-compact',
    transition_to_attack: 'Patient probing, wing-backs',
    transition_to_defense: 'Immediate compact shape',
    corner_attack_strategy: 'Rudiger-Thiago Silva threats',
    corner_defense_strategy: 'Zonal dominant',
    free_kick_strategy: 'Mount-James delivery',
    tactical_instructions: 'Organize defans! Kante dominant! Wing-backs key! Flexible shape! Beat City!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Mendy reliable',
      DF: 'Three CBs solid, wing-backs attack',
      MF: 'Kante everywhere, Jorginho organize, Mount create',
      FW: 'Havertz false 9, flexible front'
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 9,
    popularity_current: 9,
    success_rate: 85.0
  }
];

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
          console.log(`⚠️  ${system.name}`);
          resolve({ success: false, exists: true });
        } else {
          console.error(`❌ ${system.name}:`, err.message);
          reject(err);
        }
      } else {
        console.log(`✅ ${system.name}`);
        resolve({ success: true, id: this.lastID });
      }
    });
  });
}

async function main() {
  let success = 0, exists = 0, errors = 0;

  for (const system of systems) {
    try {
      const result = await insertSystem(system);
      if (result.success) success++;
      else if (result.exists) exists++;
    } catch (err) {
      errors++;
    }
  }

  console.log(`\n📊 Yeni: ${success} | Mevcut: ${exists} | Hata: ${errors}`);

  db.get('SELECT COUNT(*) as total FROM tactical_systems', (err, row) => {
    if (!err) console.log(`🎯 TOPLAM SİSTEM: ${row.total}\n`);
    db.close();
  });
}

main().catch(console.error);
