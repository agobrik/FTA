const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🛡️  KARŞI TAKTİKLER EKLENİYOR...\n');

// First get some system IDs
db.all('SELECT id, name FROM tactical_systems WHERE name LIKE "%Guardiola%" OR name LIKE "%Klopp%" OR name LIKE "%Mourinho%" OR name LIKE "%Arsenal%" OR name LIKE "%Tottenham%" OR name LIKE "%Postecoglou%" OR name LIKE "%Possession%" LIMIT 15', (err, systems) => {
  if (err) {
    console.log('❌ Sistem IDs alınamadı:', err.message);
    db.close();
    return;
  }

  console.log(`📊 ${systems.length} sistem bulundu, counter-tactics ekleniyor...\n`);

  const counterTactics = [
    // Counter 1: vs Possession/Guardiola Style
    {
      system_id: systems.find(s => s.name.includes('Guardiola') || s.name.includes('Possession'))?.id || 1,
      counter_system_id: null,
      counter_name: 'Ultra-Compact Low Block + Quick Counter',
      effectiveness_rating: 8,
      strategy_type: 'Defensive Counter',
      detailed_strategy: 'Park the bus with ultra-compact 4-4-2 or 5-3-2. Deny all space between lines with extreme discipline. Absorb sustained pressure patiently. Counter-attack explosively with pace when ball won. Requires incredible discipline and organization.',
      key_adjustments: JSON.stringify(['Ultra-low defensive block 25m from goal', 'Very narrow shape deny central space', 'No high pressing waste energy', 'Pacy forwards stay high for instant counters', 'GK long distribution bypass press', 'Extreme discipline required']),
      when_to_apply: 'When significantly outmatched in quality. Big matches vs elite possession teams. When needing just one goal.',
      risk_level: 8,
      difficulty: 9,
      player_instructions: JSON.stringify({
        Defense: 'Hold ultra-compact shape. Never break lines. Discipline critical.',
        Midfield: 'Sit very deep. Deny space between lines. Quick release on turnover.',
        Forwards: 'Stay high on halfway line. Sprint on counter. Pace critical.',
        Overall: 'Extreme patience required. One mistake fatal.'
      }),
      formation_adjustment: 'Switch to 5-3-2 or 4-4-2 ultra-deep',
      positional_changes: 'Wingers become wide midfielders. FBs become back 5. Ultra-compact.',
      real_world_examples: JSON.stringify(['Inter Milan vs Barcelona 3-1 (2010 Mourinho masterclass)', 'Chelsea vs Barcelona multiple (Mourinho buses)', 'Man United vs Barcelona 1-0 (2008 semi-final)', 'Atletico vs Barcelona/Madrid counters']),
      success_stories: JSON.stringify(['Mourinho Inter 2010 - Ultimate anti-tiki-taka', 'Chelsea eliminated Barcelona multiple times', 'Works when perfectly executed', 'One of most effective counters to possession']),
      priority_order: 1
    },

    // Counter 2: vs Gegenpressing/High Press
    {
      system_id: systems.find(s => s.name.includes('Klopp') || s.name.includes('Press'))?.id || 2,
      counter_system_id: null,
      counter_name: 'Long Balls Over Press + Target Man',
      effectiveness_rating: 8,
      strategy_type: 'Tactical Bypass',
      detailed_strategy: 'Completely bypass high press with direct long balls to target man. Patient possession in safe zones outside pressing triggers. Never play short out from back when pressed. Use GK long distribution. Target man holds up and brings others in.',
      key_adjustments: JSON.stringify(['Add target man striker essential', 'GK instructed long distribution only', 'CBs go direct no dribbling', 'Avoid short passes in danger zones', 'Patient possession in safe areas', 'Extra DM for ball recovery']),
      when_to_apply: 'Against Klopp-style gegenpressing. When struggling to play out from back. Liverpool, RB Leipzig type systems.',
      risk_level: 5,
      difficulty: 6,
      player_instructions: JSON.stringify({
        GK: 'Long distribution to target man. Never play short when pressed.',
        CBs: 'Direct passing. No risky dribbles. Safety first.',
        DM: 'Deep to receive in safe zones only. Quick passes.',
        TargetMan: 'Hold-up play. Win aerials. Bring others into play.',
        Overall: 'Bypass the press. Patient when safe.'
      }),
      formation_adjustment: 'Add extra DM. Target man mandatory up front.',
      positional_changes: 'Drop midfield deeper. Target man stays high.',
      real_world_examples: JSON.stringify(['Real Madrid vs Liverpool (2023) - Ancelotti bypassed press', 'Burnley frustrating Liverpool with direct play', 'West Ham vs Liverpool long ball success', 'Atletico vs Liverpool (2020) - Direct approach worked']),
      success_stories: JSON.stringify(['Real Madrid eliminated Liverpool multiple times', 'Direct play works vs high press', 'Burnley/West Ham showed blueprint', 'Patient approach with discipline effective']),
      priority_order: 2
    },

    // Counter 3: vs High Defensive Line
    {
      system_id: systems.find(s => s.name.includes('Postecoglou') || s.name.includes('Tottenham') || s.name.includes('High Line'))?.id || 3,
      counter_system_id: null,
      counter_name: 'Balls In Behind + Extreme Pace',
      effectiveness_rating: 9,
      strategy_type: 'Exploit Weakness',
      detailed_strategy: 'Simple but devastatingly effective. Repeatedly play long balls in behind extremely high defensive line. Pacy forwards make constant runs. Time runs to beat offside. Very high success rate.',
      key_adjustments: JSON.stringify(['Pacy forwards absolutely essential', 'Direct passing encouraged', 'Minimal buildup - go direct immediately', 'GK instructed long kicks in behind', 'Forwards time runs perfectly beat offside', 'Wingers sprint in behind on every turnover']),
      when_to_apply: 'Always effective vs high lines. Especially devastating against Postecoglou Spurs, Guardiola high lines, modern high defensive lines.',
      risk_level: 3,
      difficulty: 4,
      player_instructions: JSON.stringify({
        GK: 'Long distribution directly to forwards in space behind.',
        CBs: 'Direct passes in behind. No buildup needed.',
        Midfield: 'Through balls in behind at every opportunity.',
        Forwards: 'Constant runs in behind. Time perfectly. Elite pace required.',
        Wingers: 'Sprint in behind on turnovers immediately.'
      }),
      formation_adjustment: 'Ensure pace in attack. Counter-attacking setup.',
      positional_changes: 'Forwards stay high. No defensive duties.',
      real_world_examples: JSON.stringify(['Chelsea 4-1 Tottenham (Nov 2024) - Palmer exploited perfectly', 'Most teams vs Postecoglou Spurs - balls in behind', 'Newcastle vs Spurs 4-1 - pace behind', 'Various teams consistently exploit Spurs high line']),
      success_stories: JSON.stringify(['Tottenham concedes many goals from balls in behind', 'Extremely high success rate 9/10', 'Almost guaranteed chances every game', 'One of easiest counters to execute', 'Palmer showed blueprint vs Spurs']),
      priority_order: 3
    },

    // Counter 4: vs Inverted Full-Backs (Arsenal 2024)
    {
      system_id: systems.find(s => s.name.includes('Arsenal') && s.name.includes('2024'))?.id || 4,
      counter_system_id: null,
      counter_name: 'Exploit Wide Spaces + Quick Switches',
      effectiveness_rating: 7,
      strategy_type: 'Exploit Space',
      detailed_strategy: 'NEW COUNTER 2024. When fullback inverts to central midfield, massive space opens on that flank. Overload that space with pacy winger plus overlapping fullback (2v1 vs CB). Quick switches to isolated winger.',
      key_adjustments: JSON.stringify(['Identify which FB inverts (usually left)', 'Overload that flank - winger + FB attack (2v1)', 'Quick switch passes to isolated winger vs CB', 'Pacy winger absolutely essential', 'Force choice: inverted FB stay central OR cover width', 'Exploit transitions when FB caught central']),
      when_to_apply: 'Immediately when identifying inverted FB system. Arsenal, Man City when using inverted fullbacks. Most effective on transitions.',
      risk_level: 6,
      difficulty: 7,
      player_instructions: JSON.stringify({
        Wingers: 'Target space behind inverted fullback relentlessly.',
        OppositeFB: 'Overlap constantly when inverted FB central.',
        Midfield: 'Quick switch passes to isolated winger.',
        Overall: 'Exploit transitions when FB out of position. Quick execution.'
      }),
      formation_adjustment: 'Overload wing with winger + FB vs isolated CB.',
      positional_changes: 'Winger stays very wide. FB overlaps constantly.',
      real_world_examples: JSON.stringify(['Still developing (new 2024 system)', 'Some teams learning to exploit Arsenal', 'Bournemouth showed glimpses', 'Brighton exploited spaces']),
      success_stories: JSON.stringify(['TBD - new tactical innovation 2024', 'Logical weakness in system', 'Requires pace + timing + quick switches', 'High potential when perfected']),
      priority_order: 4
    },

    // Counter 5: vs Low Block/Parked Bus
    {
      system_id: systems.find(s => s.name.includes('Mourinho') && (s.name.includes('Bus') || s.name.includes('Low')))?.id || 5,
      counter_system_id: null,
      counter_name: 'Width + Crossing + Patience',
      effectiveness_rating: 7,
      strategy_type: 'Patience Attack',
      detailed_strategy: 'Patient possession 60%+. Use full width of pitch with fullbacks and wingers very wide. Repeated crossing into box. Win second balls. Set-pieces crucial. Can take 60+ minutes to break down.',
      key_adjustments: JSON.stringify(['Patient possession essential', 'Width - use full pitch touchline to touchline', 'Repeated crossing from wide areas', 'Target man in box for headers', 'Fullbacks push very high for overloads', 'Overload wings create 2v1', 'Set-pieces extensively practiced', 'Quick wing-to-wing switches']),
      when_to_apply: 'Against ultra-defensive teams parking bus. When heavily favored. When opponent just defending.',
      risk_level: 4,
      difficulty: 6,
      player_instructions: JSON.stringify({
        Wingers: 'Stay very wide. Cross frequently from byline.',
        Fullbacks: 'Push very high. Provide width overlaps.',
        Midfielders: 'Position outside box for second balls.',
        Striker: 'Target man role. Attack crosses.',
        Overall: 'Patience required. 60+ minutes often needed.'
      }),
      formation_adjustment: 'Width emphasized. Fullbacks as wide as wingers.',
      positional_changes: 'Fullbacks very high almost wingers. Central dominance.',
      real_world_examples: JSON.stringify(['Man City vs Chelsea breaking blocks', 'Liverpool vs Burnley and defensive teams', 'Barcelona vs small teams historically', 'Arsenal vs deep blocks 2024']),
      success_stories: JSON.stringify(['Man City eventually breaks most blocks', 'Requires patience often 60+ mins', 'Set-pieces decide many games', 'Width is key to success', 'City 70% success rate vs low blocks']),
      priority_order: 5
    },

    // Counter 6: vs Wing-Back Systems (Conte 3-5-2)
    {
      system_id: systems.find(s => (s.name.includes('3-5-2') || s.name.includes('Conte') || s.name.includes('Wing-Back')))?.id || 6,
      counter_system_id: null,
      counter_name: 'Overload Wings 2v1 + Inside',
      effectiveness_rating: 8,
      strategy_type: 'Numerical Superiority',
      detailed_strategy: 'Wing-back systems vulnerable on flanks during transitions. Create 2v1 overloads: your winger + fullback vs their wing-back. Also exploit inside channels where wing-backs push forward.',
      key_adjustments: JSON.stringify(['Wingers stay wide force WB back', 'Fullback overlaps create 2v1', 'Transition speed critical catch WB high', 'Inside forwards exploit channels WB vacates', 'Quick switches exploit space', 'Central overload when WBs pushed up']),
      when_to_apply: 'Against 3-5-2, 3-4-3, 5-3-2 systems. Conte teams. When wing-backs push high.',
      risk_level: 5,
      difficulty: 6,
      player_instructions: JSON.stringify({
        Wingers: 'Pin wing-backs. Create 2v1 with fullback.',
        Fullbacks: 'Overlap constantly when WB caught high.',
        InsideForwards: 'Exploit channels WB leaves behind.',
        Midfield: 'Quick switches to overload.',
        Overall: 'Transition speed key. Catch WBs high.'
      }),
      formation_adjustment: 'Emphasize width. Quick transitions.',
      positional_changes: 'Wingers very wide. Inside forwards in channels.',
      real_world_examples: JSON.stringify(['Man City vs Conte Chelsea/Tottenham', 'Liverpool overloading wings vs 3-5-2', 'Bayern vs Inter CL', 'Arsenal vs Conte Spurs wing overloads']),
      success_stories: JSON.stringify(['Effective when executed with pace', 'Guardiola teams excel at this', 'Liverpool wing overloads successful', '2v1 situations high success rate']),
      priority_order: 6
    },

    // Counter 7: vs False 9 System
    {
      system_id: systems.find(s => s.name.includes('False 9'))?.id || 7,
      counter_system_id: null,
      counter_name: 'Man-Mark False 9 with DM',
      effectiveness_rating: 7,
      strategy_type: 'Man-Marking',
      detailed_strategy: 'False 9 drops deep creating confusion for CBs. Solution: defensive midfielder man-marks False 9 wherever they go. Denies space and time. CBs stay in position.',
      key_adjustments: JSON.stringify(['DM assigned man-mark False 9', 'Follow everywhere no space', 'CBs hold position dont follow', 'Physical DM ideal', 'Deny time on ball', 'Disrupt link play']),
      when_to_apply: 'Against Messi False 9 (historical), modern False 9 systems, when striker dropping deep causing problems.',
      risk_level: 6,
      difficulty: 8,
      player_instructions: JSON.stringify({
        DM: 'Man-mark False 9. Follow everywhere. Physical.',
        CBs: 'Hold position. Do not follow False 9.',
        Midfield: 'Cover DM space when tracking.',
        Overall: 'Discipline required. Communication key.'
      }),
      formation_adjustment: 'DM becomes man-marker. Midfield covers.',
      positional_changes: 'DM follows False 9. Others cover space.',
      real_world_examples: JSON.stringify(['Pepe man-marked Messi (Real vs Barca)', 'Chelsea vs Barcelona Ramires on Messi', 'Man-marking historically effective', 'Requires physical DM']),
      success_stories: JSON.stringify(['Real Madrid reduced Messi effectiveness', 'Physical approach works', 'Risky but effective when disciplined', 'Can frustrate False 9 completely']),
      priority_order: 7
    },

    // Counter 8: vs Tiki-Taka Possession
    {
      system_id: systems.find(s => s.name.includes('Tiki-Taka') || (s.name.includes('Guardiola') && s.name.includes('Possession')))?.id || 8,
      counter_system_id: null,
      counter_name: 'Mid-Block Press + Vertical Counter',
      effectiveness_rating: 8,
      strategy_type: 'Mid-Block Counter',
      detailed_strategy: 'Allow safe possession in their half. Mid-block at halfway line. Press aggressively when they enter your half. Win ball in middle third, counter vertically at speed.',
      key_adjustments: JSON.stringify(['Mid-block defensive line at halfway', 'Allow safe possession deep', 'Aggressive press when they advance', 'Compact 4-4-2 or 4-5-1 shape', 'Vertical counters when ball won', 'Pacy forwards for counter']),
      when_to_apply: 'Vs extreme possession teams. Barcelona, Man City tiki-taka style.',
      risk_level: 5,
      difficulty: 7,
      player_instructions: JSON.stringify({
        Defense: 'Mid-block at halfway. Compact.',
        Midfield: 'Press triggers when ball enters your half.',
        Forwards: 'Stay high for vertical counters.',
        Overall: 'Patience. Let them have safe ball. Strike on transition.'
      }),
      formation_adjustment: '4-4-2 or 4-5-1 mid-block',
      positional_changes: 'Compact mid-block. Forwards high.',
      real_world_examples: JSON.stringify(['Atletico vs Barcelona/Real Madrid', 'Leicester counter-attacking 2015-16', 'Mourinho Madrid vs Guardiola Barca', 'Vertical counter approach']),
      success_stories: JSON.stringify(['Atletico frustrated Barca for years', 'Leicester won league with this', 'Effective with discipline', 'Mourinho Madrid had success']),
      priority_order: 8
    },

    // Counter 9: vs Aggressive High Press
    {
      system_id: systems.find(s => s.name.toLowerCase().includes('press') && s.name.toLowerCase().includes('high'))?.id || 9,
      counter_system_id: null,
      counter_name: 'Draw Press + Play Through',
      effectiveness_rating: 7,
      strategy_type: 'Technical Solution',
      detailed_strategy: 'Draw press forward with patient short passes. When press commits, play through with technical quality. Third man runs, quick combos, overloads. Requires technical players.',
      key_adjustments: JSON.stringify(['Technical players essential', 'Patient short passing draws press', 'Third man runs behind press', 'Quick combination play', 'Numerical overloads in buildup', 'Calm under pressure required']),
      when_to_apply: 'When you have technical quality to match press. Vs aggressive high press.',
      risk_level: 7,
      difficulty: 9,
      player_instructions: JSON.stringify({
        CBs: 'Calm on ball. Draw press.',
        Midfield: 'Constant movement. Third man runs.',
        Overall: 'Technical quality. Quick combos. Confidence required.'
      }),
      formation_adjustment: 'Buildup overloads. Extra man in buildup.',
      positional_changes: 'Fluid movement. Overloads in buildup.',
      real_world_examples: JSON.stringify(['Man City vs Liverpool high press', 'Barcelona vs aggressive press', 'Arsenal buildup vs press 2024', 'Technical teams playing through']),
      success_stories: JSON.stringify(['Man City plays through most presses', 'Requires elite technical level', 'Beautiful when successful', 'High risk high reward']),
      priority_order: 9
    },

    // Counter 10: vs 4-4-2 Traditional
    {
      system_id: systems.find(s => s.name.includes('4-4-2'))?.id || 10,
      counter_system_id: null,
      counter_name: 'Overload Midfield 3v2',
      effectiveness_rating: 8,
      strategy_type: 'Numerical Advantage',
      detailed_strategy: 'Traditional 4-4-2 has only 2 central midfielders. Use 3 central midfielders to dominate possession. Control game through midfield superiority.',
      key_adjustments: JSON.stringify(['3 central midfielders vs their 2', 'Dominate possession through middle', 'Patient buildup through midfield', 'Force their wingers to help (creates space)', 'Control tempo completely']),
      when_to_apply: 'Against traditional 4-4-2 systems. Burnley, classic English setups.',
      risk_level: 3,
      difficulty: 5,
      player_instructions: JSON.stringify({
        Midfield: 'Dominate possession. Control tempo. 3v2 advantage.',
        Overall: 'Patient. Use midfield superiority. Control game.'
      }),
      formation_adjustment: '4-3-3 or 4-2-3-1 with 3 CMs',
      positional_changes: 'Midfield triangle dominates their 2.',
      real_world_examples: JSON.stringify(['Guardiola teams vs 4-4-2', 'Barcelona vs traditional teams', 'Modern 4-3-3 vs 4-4-2', 'Midfield domination']),
      success_stories: JSON.stringify(['Highly effective', 'Simple numerical advantage', 'Dominates possession easily', 'Low risk high success']),
      priority_order: 10
    }
  ];

  let completed = 0;
  const stmt = db.prepare(`INSERT INTO counter_tactics (
    system_id, counter_system_id, counter_name, effectiveness_rating, strategy_type,
    detailed_strategy, key_adjustments, when_to_apply, risk_level, difficulty,
    player_instructions, formation_adjustment, positional_changes,
    real_world_examples, success_stories, priority_order
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  counterTactics.forEach((ct, index) => {
    stmt.run(
      ct.system_id,
      ct.counter_system_id,
      ct.counter_name,
      ct.effectiveness_rating,
      ct.strategy_type,
      ct.detailed_strategy,
      ct.key_adjustments,
      ct.when_to_apply,
      ct.risk_level,
      ct.difficulty,
      ct.player_instructions,
      ct.formation_adjustment,
      ct.positional_changes,
      ct.real_world_examples,
      ct.success_stories,
      ct.priority_order,
      (err) => {
        if (err) {
          console.log(`❌ ${ct.counter_name} - Hata: ${err.message}`);
        } else {
          completed++;
          console.log(`✅ ${completed}/10: ${ct.counter_name} eklendi!`);
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 ${completed}/10 karşı taktik başarıyla eklendi!`);
    console.log(`\n🛡️  Sistem artık counter-tactics ile tam donanımlı!`);
    db.close();
  });
});
