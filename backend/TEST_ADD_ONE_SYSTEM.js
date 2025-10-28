const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

const system = {
  name: "3-2-4-1 Arteta Arsenal 2024/25 TEST",
  formation: "3-2-4-1",
  category: "modern",
  style: "possession",
  era: "2024-2025",
  philosophy: `Test system for Arsenal inverted fullback innovation.`,
  key_principles: JSON.stringify(["Inverted fullback", "Double pivot", "Third-man runs"]),
  strengths: JSON.stringify(["Control", "Buildup", "Rest defense"]),
  weaknesses: JSON.stringify(["Vulnerable on wings", "Complex system"]),
  ideal_opposition: "Works vs high press",
  pressing_intensity: 9,
  defensive_line_height: 8,
  width: 6,
  tempo: 8,
  risk_level: 7,
  physicality_requirement: 7,
  technical_requirement: 9,
  tactical_complexity: 9,
  build_up_play: "short passing",
  passing_style: "possession",
  passing_directness: 7,
  defensive_approach: "high press",
  attacking_approach: "positional play",
  compactness: "balanced",
  defensive_width: "narrow",
  attacking_width: "wide",
  defensive_shape: "back three",
  required_player_profiles: JSON.stringify({GK: "Ball-playing", CB: "Fast"}),
  key_positions: JSON.stringify(["Inverted FB"]),
  famous_teams: JSON.stringify(["Arsenal 2024"]),
  famous_coaches: JSON.stringify(["Arteta"]),
  famous_matches: JSON.stringify(["Arsenal 3-1 Liverpool"]),
  variants: JSON.stringify(["Switch FB"]),
  in_possession_shape: "3-2-4-1",
  out_of_possession_shape: "4-3-3",
  transition_to_attack: "Quick vertical",
  transition_to_defense: "Counter-press",
  corner_attack_strategy: "Short corners",
  corner_defense_strategy: "Zonal",
  free_kick_strategy: "Creative",
  tactical_instructions: `Test instructions`,
  player_instructions_by_position: JSON.stringify({GK: "Play out"}),
  difficulty_to_implement: 9,
  effectiveness_rating: 9,
  popularity_current: 9,
  success_rate: 88
};

const stmt = db.prepare(`INSERT INTO tactical_systems (
  name, formation, category, style, era, philosophy,
  key_principles, strengths, weaknesses, ideal_opposition,
  pressing_intensity, defensive_line_height, width, tempo, risk_level,
  physicality_requirement, technical_requirement, tactical_complexity,
  build_up_play, passing_style, passing_directness,
  defensive_approach, attacking_approach, compactness,
  defensive_width, attacking_width, defensive_shape,
  required_player_profiles, key_positions,
  famous_teams, famous_coaches, famous_matches, variants,
  in_possession_shape, out_of_possession_shape,
  transition_to_attack, transition_to_defense,
  corner_attack_strategy, corner_defense_strategy, free_kick_strategy,
  tactical_instructions, player_instructions_by_position,
  difficulty_to_implement, effectiveness_rating, popularity_current, success_rate
) VALUES (${Array(45).fill('?').join(', ')})`);

try {
  stmt.run(
    system.name, system.formation, system.category, system.style, system.era, system.philosophy,
    system.key_principles, system.strengths, system.weaknesses, system.ideal_opposition,
    system.pressing_intensity, system.defensive_line_height, system.width, system.tempo, system.risk_level,
    system.physicality_requirement, system.technical_requirement, system.tactical_complexity,
    system.build_up_play, system.passing_style, system.passing_directness,
    system.defensive_approach, system.attacking_approach, system.compactness,
    system.defensive_width, system.attacking_width, system.defensive_shape,
    system.required_player_profiles, system.key_positions,
    system.famous_teams, system.famous_coaches, system.famous_matches, system.variants,
    system.in_possession_shape, system.out_of_possession_shape,
    system.transition_to_attack, system.transition_to_defense,
    system.corner_attack_strategy, system.corner_defense_strategy, system.free_kick_strategy,
    system.tactical_instructions, system.player_instructions_by_position,
    system.difficulty_to_implement, system.effectiveness_rating, system.popularity_current, system.success_rate
  );
  console.log('✅ Test system added successfully!');
} catch (err) {
  console.error('❌ Error:', err.message);
}

stmt.finalize();
db.close();
