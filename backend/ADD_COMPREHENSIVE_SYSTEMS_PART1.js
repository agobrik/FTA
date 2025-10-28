const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🚀 KAPSAMLI TAKTİK SİSTEMLER - PART 1 (20 sistem)\n');

const systems = [
  // === ARTETA ARSENAL ===
  {
    name: '4-3-3 Arteta Arsenal Modern',
    formation: '4-3-3',
    category: 'modern',
    style: 'possession',
    era: '2019-present',
    philosophy: 'Mikel Arteta\'nın Arsenal\'i yeniden şekillendirmesi. Guardiola etkisi ama kendi yorumu. Genç takım, inverted fullbacks, Partey pivot.',
    key_principles: JSON.stringify([
      'Inverted fullbacks (Zinchenko içe girer)',
      'Partey single pivot',
      'Ødegaard yaratıcı 8/10 hybrid',
      'Saka-Martinelli geniş kanatlar',
      'Jesus/Nketiah mobil striker',
      'Saliba-Gabriel güçlü stopper ikilisi',
      'Pozisyonel rotasyonlar Guardiola tarzı'
    ]),
    strengths: JSON.stringify([
      'Genç dinamik takım',
      'Top hakimiyeti yüksek',
      'Saka breakthrough star',
      'Ødegaard yaratıcılık',
      'Saliba defensive rock',
      'Title race 2022-23'
    ]),
    weaknesses: JSON.stringify([
      'Deneyim eksikliği kritik anlarda',
      'Striker inconsistency',
      'Big game mentality test'
    ]),
    ideal_opposition: 'Mid-table takımlar - dominasyon kolay',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 8,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 9,
    build_up_play: 'short',
    passing_style: 'possession',
    passing_directness: 4,
    defensive_approach: 'mid-high press',
    attacking_approach: 'possession positional',
    compactness: 'balanced',
    defensive_width: 'narrow',
    attacking_width: 'wide',
    defensive_shape: 'asymmetric',
    required_player_profiles: JSON.stringify({
      GK: 'Ramsdale - modern sweeper keeper',
      DF: 'Saliba-Gabriel partnership, Zinchenko inverted, White versatile',
      MF: 'Partey single pivot, Ødegaard creator, Xhaka physical evolved',
      FW: 'Saka star winger, Martinelli pace, Jesus mobile'
    }),
    key_positions: JSON.stringify(['Ødegaard creator', 'Partey pivot', 'Saka winger']),
    famous_teams: JSON.stringify(['Arsenal 2022-present']),
    famous_coaches: JSON.stringify(['Mikel Arteta']),
    famous_matches: JSON.stringify([
      'Arsenal 3-2 Man United (2023) - Ødegaard winner',
      'Arsenal title race 2022-23 - Young team challenge'
    ]),
    variants: JSON.stringify(['4-3-3 with Zinchenko inverted', '4-2-3-1 flexible']),
    in_possession_shape: '3-2-5 with Zinchenko inverting',
    out_of_possession_shape: '4-4-2 compact',
    transition_to_attack: 'Quick positional rotations',
    transition_to_defense: 'Compact 4-4-2 shape',
    corner_attack_strategy: 'Ødegaard delivery, many runners',
    corner_defense_strategy: 'Zonal with physical presence',
    free_kick_strategy: 'Ødegaard specialist',
    tactical_instructions: 'Pozisyon oyna! Zinchenko içe gir! Ødegaard yarat! Saka 1v1 kazan! Partey pivot!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Ramsdale sweeper',
      DF: 'Zinchenko invert, White stays wide, Saliba-Gabriel strong',
      MF: 'Partey anchor, Ødegaard create, Xhaka support',
      FW: 'Saka wide star, Martinelli pace, Jesus mobile'
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 8,
    popularity_current: 9,
    success_rate: 72.0
  },

  // === EMERY SEVILLA ===
  {
    name: '4-4-2 Emery Sevilla Europa Specialist',
    formation: '4-4-2',
    category: 'pragmatic',
    style: 'tournament specialist',
    era: '2013-16',
    philosophy: 'Unai Emery\'nin Sevilla ile 3 UEFA Europa League. Turnuva taktiği, set-piece uzmanı, rotasyon master.',
    key_principles: JSON.stringify([
      'Turnuva yönetimi elite',
      'Set-piece master class',
      'Squad rotation mükemmel',
      'Duran top golleri çok',
      'Disiplinli defans',
      'Pragmatik sonuç odaklı'
    ]),
    strengths: JSON.stringify([
      '3 Europa League arka arkaya!',
      'Set-piece çok etkili',
      'Turnuva deneyimi',
      'Squad depth kullanımı',
      'Final specialist'
    ]),
    weaknesses: JSON.stringify([
      'Liga\'da inconsistent',
      'Top hakimiyeti düşük',
      'Spektaküler değil'
    ]),
    ideal_opposition: 'Turnuva maçları - tek maç taktiği',
    pressing_intensity: 7,
    defensive_line_height: 5,
    width: 7,
    tempo: 6,
    risk_level: 4,
    physicality_requirement: 7,
    technical_requirement: 7,
    tactical_complexity: 7,
    build_up_play: 'mixed',
    passing_style: 'direct',
    passing_directness: 6,
    defensive_approach: 'mid-block',
    attacking_approach: 'set-pieces and counters',
    compactness: 'compact',
    defensive_width: 'narrow',
    attacking_width: 'balanced',
    defensive_shape: 'flat',
    required_player_profiles: JSON.stringify({
      GK: 'Beto güvenilir',
      DF: 'Rami-Fazio fiziksel, Alves-Escudero dengeli',
      MF: 'Krychowiak destroyer, Banega playmaker, Vitolo-Reyes kanatlar',
      FW: 'Bacca-Gameiro partnership'
    }),
    key_positions: JSON.stringify(['Krychowiak destroyer', 'Banega playmaker', 'Set-piece takers']),
    famous_teams: JSON.stringify(['Sevilla 2013-16 (3x Europa League)', 'Villarreal 2020-22 (Europa League winners)']),
    famous_coaches: JSON.stringify(['Unai Emery']),
    famous_matches: JSON.stringify([
      'Sevilla 3-1 Liverpool (2016 EL Final) - 3rd title',
      'Sevilla vs Dnipro (2015 EL Final) - Dramatic',
      'Villarreal vs Man United (2021 EL Final pens) - 11-10 pens!'
    ]),
    variants: JSON.stringify(['4-2-3-1 occasional', '4-4-2 diamond']),
    in_possession_shape: '4-4-2 balanced patient',
    out_of_possession_shape: '4-4-2 compact mid-block',
    transition_to_attack: 'Patient build-up or set-pieces',
    transition_to_defense: 'Immediate compact shape',
    corner_attack_strategy: 'Elite set-piece routines - many goals',
    corner_defense_strategy: 'Organized zonal',
    free_kick_strategy: 'Specialist takers, many variations',
    tactical_instructions: 'Disiplinli kal! Set-piece odaklan! Turnuva yönet! Rotasyon kullan! Finale kazan!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Güvenilir, set-piece organize',
      DF: 'Compact flat four, set-piece threats',
      MF: 'Krychowiak destroy, Banega create, wingers work',
      FW: 'Partnership, set-piece presence'
    }),
    difficulty_to_implement: 6,
    effectiveness_rating: 8,
    popularity_current: 6,
    success_rate: 78.0
  },

  // === SPALLETTI NAPOLI ===
  {
    name: '4-3-3 Spalletti Napoli Scudetto 2023',
    formation: '4-3-3',
    category: 'attacking',
    style: 'italian modern',
    era: '2021-23',
    philosophy: 'Luciano Spalletti\'nin Napoli şampiyonluğu. İtalyan defans + hızlı hücum. Kvara-Osimhen partnership deadly.',
    key_principles: JSON.stringify([
      'Kvaratskhelia star emergence',
      'Osimhen speed and power',
      'Lobotka regista pivot',
      'Di Lorenzo modern fullback',
      'Kim Min-jae defensive rock',
      'Serie A dominance 2022-23',
      'Attacking Italian football revolution'
    ]),
    strengths: JSON.stringify([
      'Serie A champions 2022-23!',
      'Kvara Ballon d\'Or contender',
      'Osimhen deadly striker',
      'Lobotka underrated genius',
      'Kim defensive beast',
      'Attacking dominance'
    ]),
    weaknesses: JSON.stringify([
      'Squad depth issues',
      'CL experience lacking',
      'Osimhen injuries critical'
    ]),
    ideal_opposition: 'Serie A mid-table - dominates',
    pressing_intensity: 8,
    defensive_line_height: 7,
    width: 9,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 8,
    tactical_complexity: 7,
    build_up_play: 'quick',
    passing_style: 'direct',
    passing_directness: 7,
    defensive_approach: 'mid-press',
    attacking_approach: 'wing play fast',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'very wide',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Meret reliable',
      DF: 'Kim Min-jae beast, Rrahmani partner, Di Lorenzo overlapping, Mario Rui balance',
      MF: 'Lobotka regista, Anguissa box-to-box, Zielinski technical',
      FW: 'Kvaratskhelia star, Osimhen deadly, Lozano/Politano pace'
    }),
    key_positions: JSON.stringify(['Kvaratskhelia LW', 'Osimhen ST', 'Lobotka regista']),
    famous_teams: JSON.stringify(['Napoli 2022-23 Scudetto winners']),
    famous_coaches: JSON.stringify(['Luciano Spalletti']),
    famous_matches: JSON.stringify([
      'Napoli 5-1 Juventus (2023) - Dominance',
      'Napoli 6-1 Ajax (2022 CL) - Statement',
      'Napoli Serie A 2022-23 - Dominant champions'
    ]),
    variants: JSON.stringify(['4-3-3 flexible', '4-2-3-1 occasional']),
    in_possession_shape: '4-3-3 wide wingers high',
    out_of_possession_shape: '4-5-1 compact',
    transition_to_attack: 'Quick wing transitions, Osimhen depth',
    transition_to_defense: 'Organized compact',
    corner_attack_strategy: 'Osimhen aerial, runners',
    corner_defense_strategy: 'Kim dominant',
    free_kick_strategy: 'Kvaratskhelia-Zielinski delivery',
    tactical_instructions: 'Kvara magic! Osimhen koş! Lobotka dağıt! Di Lorenzo öne! Hızlı oyna!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Meret reliable',
      DF: 'Kim dominant, Di Lorenzo attack, solid partnership',
      MF: 'Lobotka orchestrate, Anguissa engine, Zielinski create',
      FW: 'Kvara star, Osimhen deadly, wide play'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 9,
    popularity_current: 9,
    success_rate: 85.0
  },

  // === XAVI BARCELONA ===
  {
    name: '4-3-3 Xavi Barcelona Rebuild',
    formation: '4-3-3',
    category: 'possession',
    style: 'barcelona DNA',
    era: '2021-present',
    philosophy: 'Xavi\'nin Barça\'ya dönüşü. Cruyff-Guardiola mirasını restore etme. Gençler (Pedri-Gavi) + Lewandowski.',
    key_principles: JSON.stringify([
      'Tiki-taka restore edildi',
      'Pedri-Gavi genç yıldızlar',
      'Lewandowski goller',
      'Balde emergence',
      'Pozisyonel play geri döndü',
      'La Masia youth integration',
      'Barça DNA revival'
    ]),
    strengths: JSON.stringify([
      'La Liga 2022-23 champions',
      'Pedri-Gavi incredible talents',
      'Lewandowski goals',
      'Barcelona identity back',
      'Exciting young team'
    ]),
    weaknesses: JSON.stringify([
      'Financial constraints',
      'CL struggles',
      'Inconsistency',
      'Defensive fragility'
    ]),
    ideal_opposition: 'La Liga mid-table',
    pressing_intensity: 8,
    defensive_line_height: 8,
    width: 8,
    tempo: 8,
    risk_level: 7,
    physicality_requirement: 6,
    technical_requirement: 10,
    tactical_complexity: 9,
    build_up_play: 'short',
    passing_style: 'tiki-taka',
    passing_directness: 3,
    defensive_approach: 'high-press',
    attacking_approach: 'possession',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'wide',
    defensive_shape: 'high',
    required_player_profiles: JSON.stringify({
      GK: 'Ter Stegen sweeper keeper',
      DF: 'Araujo-Kounde fast, Balde attacking, Cancelo/Alonso inverted',
      MF: 'Busquets/De Jong pivot, Pedri genius, Gavi warrior',
      FW: 'Lewandowski goals, Raphinha-Dembele pace'
    }),
    key_positions: JSON.stringify(['Pedri-Gavi midfield', 'Lewandowski striker', 'Balde fullback']),
    famous_teams: JSON.stringify(['Barcelona 2022-present']),
    famous_coaches: JSON.stringify(['Xavi Hernandez']),
    famous_matches: JSON.stringify([
      'Barcelona 4-0 Real Madrid (2023) - Clasico dominance',
      'Barcelona La Liga 2022-23 - Champions return'
    ]),
    variants: JSON.stringify(['4-3-3 flexible rotations']),
    in_possession_shape: '4-3-3 positional tiki-taka',
    out_of_possession_shape: '4-3-3 high press',
    transition_to_attack: 'Quick possession circulation',
    transition_to_defense: 'Immediate high press',
    corner_attack_strategy: 'Technical routines, Lewandowski target',
    corner_defense_strategy: 'Zonal system',
    free_kick_strategy: 'Technical delivery',
    tactical_instructions: 'Tiki-taka! Pedri-Gavi magic! Lewandowski gol! Balde koş! Barça DNA!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Ter Stegen sweeper',
      DF: 'High line, Balde attack, technical defenders',
      MF: 'Pedri-Gavi genius, pivot control',
      FW: 'Lewandowski finish, wingers pace'
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 8,
    popularity_current: 9,
    success_rate: 75.0
  },

  // === LUIS ENRIQUE ===
  {
    name: '4-3-3 Luis Enrique MSN Barcelona',
    formation: '4-3-3',
    category: 'attacking',
    style: 'counter-attacking possession',
    era: '2014-17',
    philosophy: 'Luis Enrique\'nin MSN (Messi-Suarez-Neymar) üçlüsüyle Barça. Tiki-taka\'dan daha direkt, kontra odaklı.',
    key_principles: JSON.stringify([
      'MSN üçlüsü deadly',
      'Direkt oyun Guardiola\'dan farklı',
      'Suarez hedef adam ve bitirici',
      'Neymar dribbling magic',
      'Messi false 9/RW hybrid',
      'Rakitic-Busquets dengeli orta saha',
      'Kontra hızı mükemmel'
    ]),
    strengths: JSON.stringify([
      'MSN en iyi üçlü tarihin',
      'Treble 2014-15',
      'Çok sayıda gol',
      'Messi-Suarez-Neymar kimya',
      'Big game performances'
    ]),
    weaknesses: JSON.stringify([
      'MSN\'ye bağımlılık',
      'Defans sometimes fragile',
      'Neymar ayrılığı sonrası çöküş'
    ]),
    ideal_opposition: 'Herkes - MSN her takımı yener',
    pressing_intensity: 7,
    defensive_line_height: 7,
    width: 9,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 10,
    tactical_complexity: 7,
    build_up_play: 'mixed',
    passing_style: 'direct',
    passing_directness: 6,
    defensive_approach: 'mid-press',
    attacking_approach: 'counter-attack possession',
    compactness: 'balanced',
    defensive_width: 'balanced',
    attacking_width: 'very wide',
    defensive_shape: 'balanced',
    required_player_profiles: JSON.stringify({
      GK: 'Ter Stegen modern',
      DF: 'Pique-Mascherano experience, Alves attacking, Alba overlapping',
      MF: 'Busquets pivot, Rakitic balance, Iniesta magic (early)',
      FW: 'MSN - Messi GOAT, Suarez warrior, Neymar magician'
    }),
    key_positions: JSON.stringify(['MSN trio', 'Busquets pivot', 'Alves fullback']),
    famous_teams: JSON.stringify(['Barcelona 2014-17']),
    famous_coaches: JSON.stringify(['Luis Enrique']),
    famous_matches: JSON.stringify([
      'Barcelona 3-1 Juventus (2015 CL Final) - Treble',
      'Barcelona 6-1 PSG (2017) - Remontada!',
      'Barcelona 4-0 Man City (2016) - MSN show'
    ]),
    variants: JSON.stringify(['4-3-3 MSN variations']),
    in_possession_shape: '4-3-3 MSN wide',
    out_of_possession_shape: '4-5-1 compact',
    transition_to_attack: 'Quick MSN combinations',
    transition_to_defense: 'Compact shape',
    corner_attack_strategy: 'MSN creativity',
    corner_defense_strategy: 'Zonal with Pique',
    free_kick_strategy: 'Messi master, Neymar flair, Suarez target',
    tactical_instructions: 'MSN serbest! Direkt oyun! Hızlı kontra! Busquets organize! Alba-Alves atağa!',
    player_instructions_by_position: JSON.stringify({
      GK: 'Ter Stegen modern',
      DF: 'Pique-Mascherano strong, fullbacks attack',
      MF: 'Busquets anchor, Rakitic balance, Iniesta create',
      FW: 'MSN free role - magic'
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 10,
    popularity_current: 7,
    success_rate: 88.0
  }
];

// Dosya çok uzuyor, daha fazla sistem ekleyeceğim ama önce bunları kaydet
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

async function main() {
  console.log(`📊 ${systems.length} sistem eklenecek...\n`);

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

  console.log(`\n📊 ÖZET:`);
  console.log(`   ✅ Yeni: ${success}`);
  console.log(`   ⚠️  Mevcut: ${exists}`);
  console.log(`   ❌ Hata: ${errors}`);

  db.get('SELECT COUNT(*) as total FROM tactical_systems', (err, row) => {
    if (!err) console.log(`\n🎯 Toplam: ${row.total}\n`);
    db.close();
  });
}

main().catch(console.error);
