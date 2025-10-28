const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🛡️ NON-POSSESSION TACTICS EKLENİYOR...\n');

// Get all systems
db.all('SELECT id, name, formation, pressing_intensity, defensive_line_height, style FROM tactical_systems ORDER BY id', (err, systems) => {
  if (err) {
    console.log('❌ Error:', err.message);
    db.close();
    return;
  }

  console.log(`📊 ${systems.length} sistem bulundu, topsuz oyun taktikleri oluşturuluyor...\n`);

  const tactics = [];

  systems.forEach((sys, i) => {
    // Only add for first 30 systems to keep it manageable
    if (i >= 30) return;

    // Determine defensive philosophy based on system characteristics
    let defensivePhilosophy = '';
    let pressingPhilosophy = '';
    let counterAttackPhilosophy = '';
    let outOfPossessionShape = '';
    let whereToPress = '';
    let whenToPress = '';
    let howToPress = '';

    // High pressing systems
    if (sys.pressing_intensity >= 8) {
      defensivePhilosophy = 'Aggressive high pressing to win ball early and launch immediate attacks.';
      pressingPhilosophy = 'Ultra-high intensity pressing. Win ball in opponent half.';
      counterAttackPhilosophy = 'Quick transitions after winning ball high. Direct attacks.';
      outOfPossessionShape = `${sys.formation} compact high block with aggressive pressing`;
      whereToPress = 'Opponent half, especially defensive third and midfield';
      whenToPress = 'Immediately. Triggers: poor touch, back pass, wide areas';
      howToPress = 'Coordinated team press. Cut passing lanes. Force errors.';
    }
    // Medium pressing
    else if (sys.pressing_intensity >= 5) {
      defensivePhilosophy = 'Balanced pressing approach. Press in certain zones, compact in others.';
      pressingPhilosophy = 'Selective pressing. Choose moments carefully.';
      counterAttackPhilosophy = 'Organized transitions. Balance between safety and attacking.';
      outOfPossessionShape = `${sys.formation} mid-block with selective pressing`;
      whereToPress = 'Midfield and final third. Protect central areas.';
      whenToPress = 'Specific triggers: poor passes, isolated players, wide areas';
      howToPress = 'Selective pressing. Not full team. Midfield and forwards mainly.';
    }
    // Low block / defensive
    else {
      defensivePhilosophy = 'Defensive solidity first. Compact low block. Counter when winning ball.';
      pressingPhilosophy = 'Minimal pressing. Stay compact and organized.';
      counterAttackPhilosophy = 'Direct counter-attacks. Fast transitions. Exploit space.';
      outOfPossessionShape = `${sys.formation} deep compact block`;
      whereToPress = 'Final third only. Protect box.';
      whenToPress = 'Rarely. Only when opponents in final third.';
      howToPress = 'Minimal pressing. Stay compact. Force long shots.';
    }

    // High defensive line
    let whenToStepUp, whenToDropDeep, whenToPressHigh, whenToStayCompact;
    if (sys.defensive_line_height >= 8) {
      whenToStepUp = 'Constantly. Maintain high line. Squeeze space. Offside trap ready.';
      whenToDropDeep = 'Rarely. Only when facing pace directly or on transitions.';
      whenToPressHigh = 'Always. High line enables high press. Compress space.';
      whenToStayCompact = 'When ball wide. Shift as unit. Maintain compactness.';
    } else if (sys.defensive_line_height >= 5) {
      whenToStepUp = 'Selectively. Step up when safe. Compress space in midfield.';
      whenToDropDeep = 'Against pace. When opponents break lines. Transitions.';
      whenToPressHigh = 'Occasionally. Mid-block preferred. Selective high pressing.';
      whenToStayCompact = 'Most of the time. Compact mid-block primary shape.';
    } else {
      whenToStepUp = 'Rarely. Deep block mentality. Safety first.';
      whenToDropDeep = 'Frequently. Protect box. Deep defensive line.';
      whenToPressHigh = 'Never. Low block system. No high pressing.';
      whenToStayCompact = 'Always. Ultra-compact defensive block. Deny space.';
    }

    tactics.push({
      system_id: sys.id,
      defensive_philosophy: defensivePhilosophy,
      pressing_philosophy: pressingPhilosophy,
      counter_attack_philosophy: counterAttackPhilosophy,

      out_of_possession_shape: outOfPossessionShape,
      out_of_possession_width: sys.pressing_intensity >= 7 ? 'Narrow to press' : (sys.pressing_intensity >= 4 ? 'Balanced width' : 'Compact and narrow'),
      out_of_possession_depth: sys.defensive_line_height >= 7 ? 'High and compressed' : (sys.defensive_line_height >= 4 ? 'Medium depth' : 'Deep and compact'),
      out_of_possession_compactness: sys.pressing_intensity >= 6 ? 'Very compact horizontally and vertically' : 'Ultra-compact defensive block',

      out_of_possession_gk_role: sys.defensive_line_height >= 7 ? 'Sweeper-keeper. High starting position. Covers space behind.' : 'Traditional goalkeeper. Shot-stopping focus.',
      out_of_possession_defender_roles: JSON.stringify(
        sys.defensive_line_height >= 7
          ? ['High defensive line', 'Step up together', 'Play offside trap', 'Aggressive defending']
          : ['Deep defending', 'Protect box', 'Block shots', 'Physical defending']
      ),
      out_of_possession_midfielder_roles: JSON.stringify(
        sys.pressing_intensity >= 7
          ? ['Aggressive pressing', 'Cut passing lanes', 'Win ball early', 'High energy']
          : ['Protect defense', 'Stay compact', 'Cover space', 'Defensive duties']
      ),
      out_of_possession_attacker_roles: JSON.stringify(
        sys.pressing_intensity >= 7
          ? ['Lead press', 'Trigger pressing', 'Force errors', 'High work-rate']
          : ['Stay forward', 'Minimal defending', 'Counter-attack outlet', 'Conserve energy']
      ),

      pressing_triggers: sys.pressing_intensity >= 7
        ? 'Back pass, poor touch, wide areas, isolated player, passing to weaker foot'
        : (sys.pressing_intensity >= 4 ? 'Poor pass, isolated player, specific zones' : 'Minimal triggers. Rarely press.'),

      pressing_intensity_zones: sys.pressing_intensity >= 7
        ? JSON.stringify(['Opponent defensive third: 10/10', 'Midfield: 9/10', 'Own half: 7/10'])
        : (sys.pressing_intensity >= 4
          ? JSON.stringify(['Opponent third: 6/10', 'Midfield: 7/10', 'Own half: 5/10'])
          : JSON.stringify(['Opponent third: 2/10', 'Midfield: 3/10', 'Own half: 1/10'])),

      pressing_coordination: sys.pressing_intensity >= 7
        ? 'Highly coordinated. Whole team presses as unit. Pressing traps. Cut all options.'
        : 'Individual or small group pressing. Not whole team.',

      defensive_line_coordination: 'Defensive line moves as unit. Constant communication. Step up and drop together. Offside trap coordination.',

      where_to_press: whereToPress,
      when_to_press: whenToPress,
      how_to_press: howToPress,

      pressing_traps: sys.pressing_intensity >= 7
        ? JSON.stringify(['Touchline traps', 'Corner flag press', 'Force to weaker foot', 'GK short pass trap'])
        : JSON.stringify(['Minimal traps', 'Occasional wide press']),

      counter_press_zones: sys.pressing_intensity >= 8
        ? JSON.stringify(['Immediate area around ball loss', '10-yard radius', '3+ players', 'Everywhere on pitch'])
        : (sys.pressing_intensity >= 5
          ? JSON.stringify(['Attacking third mainly', 'Selective counter-press'])
          : JSON.stringify(['Rarely counter-press', 'Organized transition back'])),

      counter_press_duration: sys.pressing_intensity >= 8 ? '6 seconds maximum. Intense gegenpressing.' : (sys.pressing_intensity >= 5 ? '3-4 seconds selective' : 'No counter-press'),
      counter_press_intensity: sys.pressing_intensity >= 8 ? '10/10 - Maximum intensity' : (sys.pressing_intensity >= 5 ? '6/10 - Moderate' : '1/10 - Minimal'),

      recovery_run_priorities: JSON.stringify(['Central areas first', 'Protect box', 'Track runners', 'Cover wide areas', 'Defensive shape']),
      recovery_speed: sys.pressing_intensity >= 6 ? 'High-speed recovery. Immediate sprints.' : 'Organized recovery. Controlled dropping.',
      recovery_positions: 'Return to defensive shape. Fill gaps. Protect central areas. Cover teammates.',

      when_to_drop_deep: whenToDropDeep,
      when_to_step_up: whenToStepUp,
      when_to_press_high: whenToPressHigh,
      when_to_stay_compact: whenToStayCompact
    });
  });

  console.log(`💡 ${tactics.length} topsuz oyun taktiği oluşturuldu, ekleniyor...\n`);

  let completed = 0;
  const stmt = db.prepare(`INSERT INTO non_possession_tactics (
    system_id, defensive_philosophy, pressing_philosophy, counter_attack_philosophy,
    out_of_possession_shape, out_of_possession_width, out_of_possession_depth, out_of_possession_compactness,
    out_of_possession_gk_role, out_of_possession_defender_roles, out_of_possession_midfielder_roles, out_of_possession_attacker_roles,
    pressing_triggers, pressing_intensity_zones, pressing_coordination, defensive_line_coordination,
    where_to_press, when_to_press, how_to_press,
    pressing_traps, counter_press_zones, counter_press_duration, counter_press_intensity,
    recovery_run_priorities, recovery_speed, recovery_positions,
    when_to_drop_deep, when_to_step_up, when_to_press_high, when_to_stay_compact
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  tactics.forEach((t, i) => {
    stmt.run(
      t.system_id, t.defensive_philosophy, t.pressing_philosophy, t.counter_attack_philosophy,
      t.out_of_possession_shape, t.out_of_possession_width, t.out_of_possession_depth, t.out_of_possession_compactness,
      t.out_of_possession_gk_role, t.out_of_possession_defender_roles, t.out_of_possession_midfielder_roles, t.out_of_possession_attacker_roles,
      t.pressing_triggers, t.pressing_intensity_zones, t.pressing_coordination, t.defensive_line_coordination,
      t.where_to_press, t.when_to_press, t.how_to_press,
      t.pressing_traps, t.counter_press_zones, t.counter_press_duration, t.counter_press_intensity,
      t.recovery_run_priorities, t.recovery_speed, t.recovery_positions,
      t.when_to_drop_deep, t.when_to_step_up, t.when_to_press_high, t.when_to_stay_compact,
      (err) => {
        if (err) {
          console.log(`❌ Error: ${err.message}`);
        } else {
          completed++;
          if (completed % 5 === 0 || completed === tactics.length) {
            console.log(`✅ ${completed}/${tactics.length} taktik eklendi...`);
          }
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 ${completed}/${tactics.length} topsuz oyun taktiği başarıyla eklendi!`);
    db.close();
  });
});
