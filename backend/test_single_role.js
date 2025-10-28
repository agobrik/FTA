const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

// Test için tek rol
const testRole = {
  role_name: 'Test Mezzala',
  position: 'MF',
  sub_position: 'CM',
  mentality: 'support',
  description: 'Test description',
  detailed_explanation: 'Test detailed',
  tactical_purpose: 'Test purpose',
  movement_pattern: 'Test movement',
  positioning: 'Test positioning',
  off_ball_movement: 'Test off ball',
  on_ball_behavior: 'Test on ball',
  primary_duties: JSON.stringify(['Duty 1']),
  secondary_duties: JSON.stringify(['Duty 2']),
  defensive_duties: JSON.stringify(['Defensive']),
  attacking_duties: JSON.stringify(['Attacking']),
  pace_importance: 7,
  stamina_importance: 8,
  strength_importance: 6,
  agility_importance: 7,
  jumping_importance: 5,
  passing_importance: 9,
  dribbling_importance: 7,
  shooting_importance: 8,
  crossing_importance: 6,
  tackling_importance: 6,
  marking_importance: 5,
  positioning_importance: 8,
  vision_importance: 9,
  decision_importance: 8,
  concentration_importance: 7,
  work_rate_importance: 9,
  teamwork_importance: 8,
  leadership_importance: 6,
  ideal_player_traits: JSON.stringify(['Trait 1']),
  preferred_foot: 'either',
  height_requirement: 'average',
  age_profile: 'peak',
  real_world_examples: JSON.stringify(['Player 1']),
  historical_examples: JSON.stringify(['Historical 1']),
  synergizes_with: JSON.stringify(['Role 1']),
  conflicts_with: JSON.stringify(['Role 2']),
  complementary_roles: JSON.stringify(['Role 3']),
  requires_support_from: JSON.stringify(['Role 4']),
  best_in_formations: JSON.stringify(['4-3-3']),
  tactical_systems_compatibility: JSON.stringify(['System 1']),
  versatility_score: 7,
  difficulty_to_play: 8,
  impact_on_team: 8,
  specific_instructions: 'Test instructions',
  in_possession_role: 'Test in possession',
  out_of_possession_role: 'Test out of possession',
  transition_role: 'Test transition',
  role_variants: JSON.stringify(['Variant 1']),
  modern_adaptations: JSON.stringify(['Adaptation 1'])
};

// Tüm properties'i kontrol et
console.log('Rol nesnesinde kaç property var:', Object.keys(testRole).length);
console.log('\nProperties:');
Object.keys(testRole).forEach((key, index) => {
  console.log(`${index + 1}. ${key}`);
});

// INSERT dene - schema kolonlarıyla tam eşleşmeli (id ve created_at hariç)
const sql = `INSERT INTO player_roles (
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

const values = Object.values(testRole);

console.log(`\n\nINSERT SQL'de kaç kolon var: ${(sql.match(/\?/g) || []).length}`);
console.log(`Values array'de kaç değer var: ${values.length}\n`);

db.run(sql, values, function(err) {
  if (err) {
    console.error('❌ HATA:', err.message);
  } else {
    console.log('✅ Başarıyla eklendi! ID:', this.lastID);
  }
  db.close();
});
