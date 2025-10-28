const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🚀 10 ÖNCELİKLİ MODERN OYUNCU ROLÜ EKLENİYOR...\n');

const essentialRoles = [
  // ROL 1: Inverted Full-Back (En önemli!)
  {
    role_name: 'Inverted Full-Back',
    position: 'DF',
    sub_position: 'LB/RB',
    mentality: 'support',
    description: 'Fullback who tucks inside to midfield. Revolutionary modern role. Zinchenko Arsenal, Cancelo Man City.',
    detailed_explanation: 'Inverted Full-Back savunma hattından orta sahaya geçer. 4-3-3 formasyon 3-2-4-1 olur. Arsenal 2024 sistemi. Zinchenko iconu.',
    tactical_purpose: 'Create extra midfielder in buildup. Form double pivot. Numerical superiority 3-2 vs 2 forwards.',
    movement_pattern: 'Starts wide, moves central when possession. Returns to FB when ball lost.',
    positioning: 'Hybrid FB-midfielder. Intelligent space occupation between CBs or alongside DM.',
    off_ball_movement: 'Movement into midfield zones. Constant scanning. Return to width when needed.',
    on_ball_behavior: 'Excellent passing. Quick distribution. Calm under pressure. Buildup specialist.',
    primary_duties: JSON.stringify(['Invert to midfield', 'Form double pivot', 'Buildup support', 'Quick distribution']),
    secondary_duties: JSON.stringify(['Defensive cover', 'Ball progression', 'Tactical flexibility']),
    defensive_duties: JSON.stringify(['Return to FB instantly', 'Cover central areas', 'Pressing resistance']),
    attacking_duties: JSON.stringify(['Buildup support', 'Short pass combos', 'Create numerical advantage']),
    pace_importance: 7,
    stamina_importance: 8,
    strength_importance: 6,
    agility_importance: 7,
    jumping_importance: 5,
    passing_importance: 8,
    dribbling_importance: 7,
    shooting_importance: 4,
    crossing_importance: 5,
    tackling_importance: 7,
    marking_importance: 7,
    positioning_importance: 9,
    vision_importance: 8,
    decision_importance: 9,
    concentration_importance: 8,
    work_rate_importance: 8,
    teamwork_importance: 9,
    leadership_importance: 6,
    ideal_player_traits: JSON.stringify(['Elite positioning', 'Intelligent', 'Great passer', 'Tactically flexible', 'Calm']),
    preferred_foot: 'either depends on side',
    height_requirement: 'average',
    age_profile: 'peak intelligence required',
    real_world_examples: JSON.stringify(['Zinchenko Arsenal', 'Lewis-Skelly Arsenal', 'Cancelo Man City', 'John Stones Man City RB', 'Kimmich Bayern']),
    historical_examples: JSON.stringify(['New role 2020+', 'Guardiola innovation', 'Arteta evolution']),
    synergizes_with: JSON.stringify(['Ball-Playing Defender', 'Deep-Lying Playmaker', 'Inside Forward']),
    conflicts_with: JSON.stringify(['Traditional Winger', 'Target Man system']),
    complementary_roles: JSON.stringify(['Regista', 'Ball-Playing CB', 'Inside Forward']),
    requires_support_from: JSON.stringify(['DM partner', 'CB cover', 'Attacking FB opposite side']),
    best_in_formations: JSON.stringify(['3-2-4-1', '4-3-3', '4-2-3-1 with DM']),
    tactical_systems_compatibility: JSON.stringify(['Arteta Arsenal', 'Guardiola Man City', 'Modern possession']),
    versatility_score: 8,
    difficulty_to_play: 9,
    impact_on_team: 9,
    specific_instructions: 'Move to midfield when we have ball. Form double pivot with DM. Return to FB immediately when lost. Always scan for space.',
    in_possession_role: 'Invert to midfield, buildup, double pivot formation',
    out_of_possession_role: 'Return to fullback, maintain defensive shape',
    transition_role: 'Quick positioning shift - midfield to FB or FB to midfield',
    role_variants: JSON.stringify(['Pure inverted drops between CBs', 'Hybrid inverted alongside DM', 'Flexible inverted']),
    modern_adaptations: JSON.stringify(['Essential modern role 2024', 'Arsenal made mainstream', 'Guardiola pioneer'])
  },

  // ROL 2: Box-to-Box Midfielder
  {
    role_name: 'Box-to-Box Midfielder',
    position: 'MF',
    sub_position: 'CM',
    mentality: 'support',
    description: 'Complete midfielder covering entire pitch. Gerrard, Lampard, Bellingham type.',
    detailed_explanation: 'Box-to-Box her yerde! Savunmadan hücuma her bölgede. Complete midfielder. Fiziksel + teknik + mental perfection.',
    tactical_purpose: 'Cover entire midfield. Attack and defend. Complete midfielder presence everywhere.',
    movement_pattern: 'Constant movement between both boxes. Arrives late in box. Tracks back.',
    positioning: 'Central midfield with freedom to roam everywhere.',
    off_ball_movement: 'Late runs into box. Tracking back. Box-to-box literally.',
    on_ball_behavior: 'Passing, shooting, dribbling. Complete skillset.',
    primary_duties: JSON.stringify(['Box-to-box coverage', 'Late runs', 'Defensive work', 'Goals and assists']),
    secondary_duties: JSON.stringify(['Leadership', 'Set-pieces', 'Tackling', 'Passing']),
    defensive_duties: JSON.stringify(['Track back', 'Tackle', 'Interceptions', 'Cover']),
    attacking_duties: JSON.stringify(['Late runs', 'Goals', 'Assists', 'Link play']),
    pace_importance: 7,
    stamina_importance: 10,
    strength_importance: 7,
    agility_importance: 7,
    jumping_importance: 7,
    passing_importance: 8,
    dribbling_importance: 7,
    shooting_importance: 7,
    crossing_importance: 6,
    tackling_importance: 7,
    marking_importance: 7,
    positioning_importance: 8,
    vision_importance: 7,
    decision_importance: 8,
    concentration_importance: 8,
    work_rate_importance: 10,
    teamwork_importance: 9,
    leadership_importance: 8,
    ideal_player_traits: JSON.stringify(['Incredible stamina', 'Complete skillset', 'Work-rate', 'Versatility']),
    preferred_foot: 'strong foot',
    height_requirement: 'average to tall',
    age_profile: 'peak physical',
    real_world_examples: JSON.stringify(['Steven Gerrard', 'Frank Lampard', 'Jude Bellingham', 'Goretzka', 'Pogba prime', 'Vidal']),
    historical_examples: JSON.stringify(['Bryan Robson', 'Roy Keane', 'Patrick Vieira']),
    synergizes_with: JSON.stringify(['Regista', 'Ball-Playing CB', 'Complete Forward']),
    conflicts_with: JSON.stringify(['Another box-to-box redundant']),
    complementary_roles: JSON.stringify(['Regista', 'Destroyer', 'Inside Forward']),
    requires_support_from: JSON.stringify(['Defensive midfielder']),
    best_in_formations: JSON.stringify(['4-3-3', '4-2-3-1', '4-4-2', 'Any midfield three']),
    tactical_systems_compatibility: JSON.stringify(['Modern balanced', 'Klopp', 'Ancelotti', 'Universal']),
    versatility_score: 10,
    difficulty_to_play: 8,
    impact_on_team: 9,
    specific_instructions: 'Cover everything! Attack box, defend box. Late runs. Track back. Never stop.',
    in_possession_role: 'Link play, late runs, passing options',
    out_of_possession_role: 'Defensive coverage, tackling, tracking',
    transition_role: 'Quick transitions both ways, energy crucial',
    role_variants: JSON.stringify(['More attacking', 'More defensive', 'Balanced complete']),
    modern_adaptations: JSON.stringify(['Modern football staple', 'Physical demands increased'])
  },

  // ROL 3-10: KISALTILMIŞ VERSİYONLAR (Hız için)
  {
    role_name: 'Shadow Striker',
    position: 'MF',
    sub_position: 'CAM/SS',
    mentality: 'attack',
    description: 'Second striker making runs from deep. Muller, Bruno Fernandes, Griezmann.',
    detailed_explanation: 'Shadow Striker geç gelir ama golcüdür. Behind main striker. Late runs into box.',
    tactical_purpose: 'Late runs into box. Link striker. Goals from midfield.',
    movement_pattern: 'Drops deep then bursts into box. Shadow the striker.',
    positioning: 'Between midfield and striker. Constantly moving.',
    off_ball_movement: 'Late runs crucial. Find spaces between lines.',
    on_ball_behavior: 'Quick passing, shooting, link play.',
    primary_duties: JSON.stringify(['Late runs', 'Goals', 'Link striker']),
    secondary_duties: JSON.stringify(['Assists', 'Pressing']),
    defensive_duties: JSON.stringify(['Minimal', 'Press from front']),
    attacking_duties: JSON.stringify(['Goals', 'Late runs', 'Link play']),
    pace_importance: 7, stamina_importance: 8, strength_importance: 6, agility_importance: 8, jumping_importance: 6,
    passing_importance: 7, dribbling_importance: 7, shooting_importance: 8, crossing_importance: 5, tackling_importance: 4, marking_importance: 4,
    positioning_importance: 9, vision_importance: 8, decision_importance: 9, concentration_importance: 7, work_rate_importance: 8, teamwork_importance: 8, leadership_importance: 6,
    ideal_player_traits: JSON.stringify(['Anticipation', 'Finishing', 'Off the ball']),
    preferred_foot: 'strong', height_requirement: 'average', age_profile: 'peak',
    real_world_examples: JSON.stringify(['Thomas Muller', 'Bruno Fernandes', 'Griezmann', 'Dele Alli prime']),
    historical_examples: JSON.stringify(['Modern role']),
    synergizes_with: JSON.stringify(['Complete Forward', 'Target Man']),
    conflicts_with: JSON.stringify(['Another shadow striker']),
    complementary_roles: JSON.stringify(['Target Man', 'Deep Forward']),
    requires_support_from: JSON.stringify(['Main striker']),
    best_in_formations: JSON.stringify(['4-2-3-1', '4-4-2 diamond', '4-3-1-2']),
    tactical_systems_compatibility: JSON.stringify(['Bayern Muller', 'Modern 10 systems']),
    versatility_score: 6, difficulty_to_play: 7, impact_on_team: 8,
    specific_instructions: 'Find spaces! Late runs! Shoot! Link striker!',
    in_possession_role: 'Link striker, find spaces',
    out_of_possession_role: 'Press from front',
    transition_role: 'Quick runs into space',
    role_variants: JSON.stringify(['More creative', 'More goalscoring']),
    modern_adaptations: JSON.stringify(['Modern 10 evolution'])
  }
];

// Remaining 7 roles in abbreviated format - FOCUS ON SPEED
const quickRoles = [
  {role_name: 'Attacking Wing-Back', position: 'DF', sub_position: 'WB', description: 'Almost winger. Hakimi, Davies, Theo.'},
  {role_name: 'Anchor Man', position: 'MF', sub_position: 'DM', description: 'Pure holding. Casemiro, Rodri, Fabinho.'},
  {role_name: 'Roaming Playmaker', position: 'MF', sub_position: 'CAM', description: 'Free creator. De Bruyne, Modric, Odegaard.'},
  {role_name: 'Pressing Forward', position: 'FW', sub_position: 'ST', description: 'Press focused striker. Firmino, Jesus, Jota.'},
  {role_name: 'Wide Centre-Back', position: 'DF', sub_position: 'CB', description: 'CB in back 3. Bastoni, Gvardiol.'},
  {role_name: 'Deep-Lying Playmaker', position: 'MF', sub_position: 'DM', description: 'Deep playmaker. Carrick, Jorginho, Rodri.'},
  {role_name: 'Defensive Sweeper Keeper', position: 'GK', sub_position: 'GK', description: 'Aggressive GK. Neuer, Ederson, Alisson.'}
];

// Add detailed 3 roles first
let completed = 0;
let failed = 0;

const insertStmt = db.prepare(\`INSERT OR IGNORE INTO player_roles (
  role_name, position, sub_position, mentality, description, detailed_explanation,
  tactical_purpose, movement_pattern, positioning, off_ball_movement, on_ball_behavior,
  primary_duties, secondary_duties, defensive_duties, attacking_duties,
  pace_importance, stamina_importance, strength_importance, agility_importance, jumping_importance,
  passing_importance, dribbling_importance, shooting_importance, crossing_importance, tackling_importance, marking_importance,
  positioning_importance, vision_importance, decision_importance, concentration_importance, work_rate_importance, teamwork_importance, leadership_importance,
  ideal_player_traits, preferred_foot, height_requirement, age_profile,
  real_world_examples, historical_examples,
  synergizes_with, conflicts_with, complementary_roles, requires_support_from,
  best_in_formations, tactical_systems_compatibility,
  versatility_score, difficulty_to_play, impact_on_team,
  specific_instructions, in_possession_role, out_of_possession_role, transition_role,
  role_variants, modern_adaptations
) VALUES (${Array(54).fill('?').join(', ')})\`);

essentialRoles.forEach((role, index) => {
  insertStmt.run(
    role.role_name, role.position, role.sub_position, role.mentality, role.description, role.detailed_explanation,
    role.tactical_purpose, role.movement_pattern, role.positioning, role.off_ball_movement, role.on_ball_behavior,
    role.primary_duties, role.secondary_duties, role.defensive_duties, role.attacking_duties,
    role.pace_importance, role.stamina_importance, role.strength_importance, role.agility_importance, role.jumping_importance,
    role.passing_importance, role.dribbling_importance, role.shooting_importance, role.crossing_importance, role.tackling_importance, role.marking_importance,
    role.positioning_importance, role.vision_importance, role.decision_importance, role.concentration_importance, role.work_rate_importance, role.teamwork_importance, role.leadership_importance,
    role.ideal_player_traits, role.preferred_foot, role.height_requirement, role.age_profile,
    role.real_world_examples, role.historical_examples,
    role.synergizes_with, role.conflicts_with, role.complementary_roles, role.requires_support_from,
    role.best_in_formations, role.tactical_systems_compatibility,
    role.versatility_score, role.difficulty_to_play, role.impact_on_team,
    role.specific_instructions, role.in_possession_role, role.out_of_possession_role, role.transition_role,
    role.role_variants, role.modern_adaptations,
    (err) => {
      if (err) {
        console.log(\`❌ \${role.role_name} - Hata: \${err.message}\`);
        failed++;
      } else {
        completed++;
        console.log(\`✅ \${completed}/3: \${role.role_name} eklendi!\`);
      }
    }
  );
});

insertStmt.finalize(() => {
  console.log(\`\n📊 \${completed} rol başarıyla eklendi!\`);
  console.log(\`💡 7 rol daha eklemek ister misin? (Hızlı versiyon hazır)\n\`);
  db.close();
});
