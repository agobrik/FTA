const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🔄 FORMATION TRANSITIONS EKLENİYOR...\n');

const transitions = [
  {
    from_formation: '4-3-3',
    to_formation: '3-2-4-1',
    transition_type: 'In Possession',
    description: 'One fullback inverts to midfield creating 3-2 buildup shape.',
    how_to_execute: 'Left fullback (Zinchenko) moves into midfield alongside DM. Right fullback stays wide. Creates 3-2-4-1 shape with ball.',
    player_movements: JSON.stringify(['LB inverts to midfield', 'Forms double pivot with DM', 'RB stays wide', 'Wingers become inside forwards', 'ST drops slightly']),
    difficulty: 8,
    effectiveness: 9,
    examples: JSON.stringify(['Arsenal Arteta 2024', 'Man City Guardiola', 'Inverted fullback revolution'])
  },

  {
    from_formation: '4-2-3-1',
    to_formation: '4-4-2',
    transition_type: 'Out of Possession',
    description: 'CAM drops beside DMs forming 4-4-2 defensive block.',
    how_to_execute: 'When ball lost, CAM immediately drops alongside two DMs forming midfield four. More compact defensively.',
    player_movements: JSON.stringify(['CAM drops to midfield line', 'Forms flat four midfield', 'Wingers track back', 'Compact 4-4-2 shape', 'Two banks of four']),
    difficulty: 5,
    effectiveness: 8,
    examples: JSON.stringify(['Common modern transition', 'Most 4-2-3-1 teams', 'Defensive solidity'])
  },

  {
    from_formation: '4-4-2',
    to_formation: '4-2-4',
    transition_type: 'In Transition Attack',
    description: 'Midfielders push forward on counter-attack creating 4-2-4.',
    how_to_execute: 'When winning ball, two CMs sprint forward joining attack. DM and fullback stay back (rest defense).',
    player_movements: JSON.stringify(['Two CMs sprint forward', 'Join strikers creating four', 'DM stays back', 'Quick transition', 'Overload attack']),
    difficulty: 6,
    effectiveness: 8,
    examples: JSON.stringify(['Leicester 2015-16 counters', 'Classic counter-attack', 'Quick transitions'])
  },

  {
    from_formation: '3-5-2',
    to_formation: '5-3-2',
    transition_type: 'Defensive Transition',
    description: 'Wing-backs drop back forming five-man defensive line.',
    how_to_execute: 'Wing-backs immediately drop back alongside three CBs when ball lost. Compact five-man defense.',
    player_movements: JSON.stringify(['Wing-backs drop to defensive line', 'Forms back five', 'Three midfielders compact', 'Two strikers stay high', 'Defensive solidity']),
    difficulty: 4,
    effectiveness: 9,
    examples: JSON.stringify(['Conte teams', 'Wing-back systems', 'Defensive transitions'])
  },

  {
    from_formation: '3-5-2',
    to_formation: '3-2-5',
    transition_type: 'Attacking Transition',
    description: 'Wing-backs push very high, midfielders join attack.',
    how_to_execute: 'Wing-backs sprint forward becoming wingers. One midfielder joins strikers. Creates 3-2-5 attacking shape.',
    player_movements: JSON.stringify(['Wing-backs very high', 'Become wingers', 'Midfielder advances', 'Three forwards line', 'Aggressive attacking']),
    difficulty: 7,
    effectiveness: 8,
    examples: JSON.stringify(['Conte attacking', 'Aggressive wing-back systems', 'All-out attack'])
  },

  {
    from_formation: '4-3-3',
    to_formation: '4-1-4-1',
    transition_type: 'Mid-Block Defense',
    description: 'Two CMs push wider, DM sits deep, creating 4-1-4-1 mid-block.',
    how_to_execute: 'Two CMs move wider almost like wide midfielders. DM sits very deep. Compact mid-block shape.',
    player_movements: JSON.stringify(['CMs push wider', 'DM sits deep alone', 'Forms 4-1-4-1', 'Mid-block shape', 'Compact horizontally']),
    difficulty: 6,
    effectiveness: 7,
    examples: JSON.stringify(['Modern mid-block', 'Defensive organization', 'Compact shape'])
  },

  {
    from_formation: '4-3-3',
    to_formation: '2-3-5',
    transition_type: 'Attacking Overload',
    description: 'Both fullbacks very high, creating 2-3-5 attacking shape.',
    how_to_execute: 'Both fullbacks push into final third. Two CBs stay back. Creates 2-3-5 ultra-attacking shape.',
    player_movements: JSON.stringify(['Both fullbacks very high', 'Two CBs back', 'DM covers', 'Five attackers', 'High risk high reward']),
    difficulty: 9,
    effectiveness: 8,
    examples: JSON.stringify(['Liverpool Klopp attacking', 'All-out attack', 'Fullback overloads'])
  },

  {
    from_formation: '4-2-3-1',
    to_formation: '4-1-3-2',
    transition_type: 'Attacking Adjustment',
    description: 'One DM drops, CAM and winger push up alongside striker.',
    how_to_execute: 'One DM drops very deep. CAM and one winger move up creating two strikers alongside main striker.',
    player_movements: JSON.stringify(['One DM drops deep', 'CAM pushes up', 'Winger becomes striker', 'Forms front three', 'More attacking threat']),
    difficulty: 7,
    effectiveness: 7,
    examples: JSON.stringify(['Flexible modern systems', 'Attacking variations', 'Tactical adjustments'])
  },

  {
    from_formation: '3-4-3',
    to_formation: '5-2-3',
    transition_type: 'Defensive Adjustment',
    description: 'Wide midfielders drop to wing-back, creating 5-2-3.',
    how_to_execute: 'Two wide midfielders in 3-4-3 drop deeper becoming wing-backs. More defensive solidity.',
    player_movements: JSON.stringify(['Wide midfielders drop', 'Become wing-backs', 'Back five formed', 'Two CMs remain', 'Three forwards stay']),
    difficulty: 5,
    effectiveness: 8,
    examples: JSON.stringify(['Chelsea Tuchel', 'Defensive solidity', 'Tactical flexibility'])
  },

  {
    from_formation: '4-4-2',
    to_formation: '4-4-1-1',
    transition_type: 'Defensive Compact',
    description: 'One striker drops behind, creating more compact 4-4-1-1.',
    how_to_execute: 'Second striker drops into #10 zone. Creates 4-4-1-1 with more midfield presence.',
    player_movements: JSON.stringify(['Second striker drops', 'Becomes CAM', 'More compact', 'Better midfield coverage', 'One striker stays high']),
    difficulty: 4,
    effectiveness: 7,
    examples: JSON.stringify(['Classic English football', 'Defensive adjustment', 'Compact shape'])
  },

  {
    from_formation: '4-3-3 False 9',
    to_formation: '4-6-0',
    transition_type: 'Extreme Possession',
    description: 'Striker drops very deep, wingers tuck in, creating 4-6-0.',
    how_to_execute: 'False 9 drops into midfield. Wingers tuck inside. Creates 4-6-0 with no traditional striker. Extreme possession focus.',
    player_movements: JSON.stringify(['False 9 drops very deep', 'Wingers tuck inside', 'Six midfielders', 'No striker', 'Possession extreme']),
    difficulty: 10,
    effectiveness: 7,
    examples: JSON.stringify(['Spain 2012 Euro Final', 'Guardiola experiments', 'Ultimate possession'])
  },

  {
    from_formation: '4-3-3',
    to_formation: '4-1-2-3',
    transition_type: 'Counter-Press Shape',
    description: 'CMs push higher, DM sits, creating aggressive 4-1-2-3.',
    how_to_execute: 'Two CMs push very high for pressing. DM sits deep alone. Aggressive 4-1-2-3 counter-pressing shape.',
    player_movements: JSON.stringify(['CMs very high', 'DM sits deep alone', 'Aggressive pressing', 'Three forwards press', 'High intensity']),
    difficulty: 8,
    effectiveness: 9,
    examples: JSON.stringify(['Klopp Liverpool pressing', 'High-intensity systems', 'Gegenpressing'])
  },

  {
    from_formation: '3-4-2-1',
    to_formation: '5-4-1',
    transition_type: 'Ultra-Defensive',
    description: 'Wing-backs drop, CAMs drop, ultra-defensive 5-4-1.',
    how_to_execute: 'Wing-backs become back five. Two CAMs drop to midfield four. One striker stays. Ultra-defensive.',
    player_movements: JSON.stringify(['Wing-backs drop to back five', 'CAMs drop to midfield', 'Five-four-one', 'Ultra-compact', 'Defensive masterclass']),
    difficulty: 5,
    effectiveness: 9,
    examples: JSON.stringify(['Mourinho bus', 'Defensive masterclasses', 'Holding leads'])
  },

  {
    from_formation: '4-2-3-1',
    to_formation: '2-4-3-1',
    transition_type: 'Aggressive Buildup',
    description: 'Fullbacks push into midfield line for buildup.',
    how_to_execute: 'Both fullbacks move into midfield line when building up. Creates 2-4-3-1 with six players in buildup.',
    player_movements: JSON.stringify(['Fullbacks into midfield', 'Two CBs wide', 'Six in buildup', 'Numerical superiority', 'Risky but effective']),
    difficulty: 9,
    effectiveness: 8,
    examples: JSON.stringify(['Guardiola Man City', 'Brighton De Zerbi', 'Modern buildup'])
  },

  {
    from_formation: '4-3-3',
    to_formation: '4-5-1',
    transition_type: 'Defensive Block',
    description: 'Wingers drop to midfield creating compact 4-5-1.',
    how_to_execute: 'Two wingers drop alongside three midfielders. Creates compact 4-5-1 defensive block.',
    player_movements: JSON.stringify(['Wingers drop to midfield', 'Five-man midfield line', 'Compact defensive block', 'One striker stays', 'Solid shape']),
    difficulty: 4,
    effectiveness: 8,
    examples: JSON.stringify(['Standard defensive transition', 'Compact blocks', 'Defensive football'])
  },

  {
    from_formation: '3-5-2',
    to_formation: '3-1-4-2',
    transition_type: 'Attacking Variation',
    description: 'One midfielder drops, two push forward.',
    how_to_execute: 'Central midfielder drops deeper. Two wide midfielders push forward. More attacking intent.',
    player_movements: JSON.stringify(['One midfielder drops', 'Two push forward', 'Four attackers', 'Attacking variation', 'Flexible shape']),
    difficulty: 6,
    effectiveness: 7,
    examples: JSON.stringify(['Flexible 3-5-2', 'Tactical variations', 'Attacking adjustments'])
  },

  {
    from_formation: '4-4-2',
    to_formation: '4-2-2-2',
    transition_type: 'Vertical Compactness',
    description: 'Wide midfielders tuck inside, creating narrow 4-2-2-2.',
    how_to_execute: 'Two wide midfielders move inside. Creates narrow, compact 4-2-2-2 shape.',
    player_movements: JSON.stringify(['Wide midfielders inside', 'Narrow shape', 'Vertical compactness', 'Deny space', 'Compact center']),
    difficulty: 5,
    effectiveness: 7,
    examples: JSON.stringify(['Compact defensive shapes', 'Narrow blocks', 'Space denial'])
  },

  {
    from_formation: '4-3-3',
    to_formation: '4-3-2-1',
    transition_type: 'Attacking Overload Center',
    description: 'Wingers tuck inside creating central overload.',
    how_to_execute: 'Both wingers move inside into half-spaces. Creates four central attackers.',
    player_movements: JSON.stringify(['Wingers tuck inside', 'Half-space occupation', 'Central overload', 'Four attackers central', 'Exploit center']),
    difficulty: 7,
    effectiveness: 8,
    examples: JSON.stringify(['Man City attacking', 'Half-space focus', 'Central domination'])
  },

  {
    from_formation: '3-4-3',
    to_formation: '3-4-1-2',
    transition_type: 'Striker Adjustment',
    description: 'One winger becomes striker, other drops to #10.',
    how_to_execute: 'One winger moves central becoming second striker. Other winger drops behind as #10.',
    player_movements: JSON.stringify(['Winger becomes striker', 'Other winger drops', 'Becomes CAM', 'Two strikers', 'More direct']),
    difficulty: 6,
    effectiveness: 7,
    examples: JSON.stringify(['Tactical flexibility', 'Formation fluidity', 'Adjustments'])
  },

  {
    from_formation: '4-2-3-1',
    to_formation: '3-4-3',
    transition_type: 'Possession Buildup',
    description: 'One fullback inverts, other stays wide, creating 3-4-3.',
    how_to_execute: 'Left fullback moves into midfield. Right fullback stays wide as wing-back. Creates asymmetric 3-4-3.',
    player_movements: JSON.stringify(['LB inverts', 'RB stays wide', 'Asymmetric shape', 'Three at back', 'Tactical flexibility']),
    difficulty: 8,
    effectiveness: 8,
    examples: JSON.stringify(['Arsenal asymmetric', 'Modern flexible systems', 'Arteta innovation'])
  }
];

console.log(`Toplam ${transitions.length} formation transition ekleniyor...\n`);

let completed = 0;
const stmt = db.prepare(`INSERT INTO formation_transitions (
  from_formation, to_formation, transition_type, description,
  how_to_execute, player_movements, difficulty, effectiveness, examples
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

transitions.forEach((t, i) => {
  stmt.run(
    t.from_formation,
    t.to_formation,
    t.transition_type,
    t.description,
    t.how_to_execute,
    t.player_movements,
    t.difficulty,
    t.effectiveness,
    t.examples,
    (err) => {
      if (err) {
        console.log(`❌ ${t.from_formation} → ${t.to_formation} - Error: ${err.message}`);
      } else {
        completed++;
        console.log(`✅ ${completed}/${transitions.length}: ${t.from_formation} → ${t.to_formation}`);
      }
    }
  );
});

stmt.finalize(() => {
  console.log(`\n🎯 ${completed}/${transitions.length} formation transition başarıyla eklendi!`);
  db.close();
});
