const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🛡️  KARŞI TAKTİKLER EKLENİYOR...\n');

// First get some system IDs to link counter-tactics
db.all('SELECT id, name FROM tactical_systems WHERE name LIKE "%Guardiola%" OR name LIKE "%Klopp%" OR name LIKE "%Mourinho%" OR name LIKE "%Arsenal%" OR name LIKE "%Tottenham%" LIMIT 10', (err, systems) => {
  if (err) {
    console.log('❌ Sistem IDs alınamadı:', err.message);
    db.close();
    return;
  }

  const counterTactics = [
    // Counter 1: vs Guardiola Possession
    {
      target_system_id: systems.find(s => s.name.includes('Guardiola'))?.id || 1,
      counter_system_name: 'Ultra-Compact Low Block + Counter',
      strategy_type: 'Formation Change',
      detailed_strategy: 'Park the bus with ultra-compact 4-4-2 or 5-3-2. Deny space between lines. Absorb pressure and counter-attack with pace. Requires incredible discipline.',
      key_adjustments: JSON.stringify(['Ultra-low defensive block', 'Very narrow shape', 'No high pressing', 'Quick counters', 'Pacy forwards for breaks']),
      when_to_apply: 'When significantly outmatched in quality. In big matches vs elite possession teams.',
      risk_level: 'High (requires perfect discipline)',
      player_instructions: JSON.stringify({Defense: 'Hold shape very compact', Midfield: 'Sit deep deny space', Forwards: 'Stay high for counters'}),
      real_world_examples: JSON.stringify(['Inter vs Barcelona 3-1 (2010 Mourinho masterclass)', 'Man United vs Barcelona 1-0 (2008)', 'Chelsea vs Barcelona (Mourinho buses)']),
      success_stories: JSON.stringify(['Mourinho Inter 2010 ultimate anti-Guardiola', 'Chelsea eliminated Barcelona multiple times'])
    },

    // Counter 2: vs Gegenpressing (Klopp)
    {
      target_system_id: systems.find(s => s.name.includes('Klopp'))?.id || 2,
      counter_system_name: 'Long Balls Over Press + Target Man',
      strategy_type: 'Tactical Adjustment',
      detailed_strategy: 'Bypass high press with long balls to target man. Patient possession outside pressing zones. Avoid quick short passes that trigger pressing traps.',
      key_adjustments: JSON.stringify(['Add extra DM', 'Drop defensive line deeper', 'GK long distribution', 'Target man outlet', 'Patient possession outside danger']),
      when_to_apply: 'When struggling with high press. Against Liverpool/gegenpress teams.',
      risk_level: 'Medium',
      player_instructions: JSON.stringify({GK: 'Long distribution avoid short', CBs: 'Direct passing no dribbling', DM: 'Safe passes recycle outside press', ST: 'Hold-up play win aerials'}),
      real_world_examples: JSON.stringify(['Real Madrid vs Liverpool (2023 CL) - Ancelotti masterclass', 'Burnley frustrating Liverpool', 'West Ham vs Liverpool']),
      success_stories: JSON.stringify(['Real Madrid eliminated Liverpool multiple times', 'Patient approach works with discipline'])
    },

    // Counter 3: vs High Defensive Line (Postecoglou)
    {
      target_system_id: systems.find(s => s.name.includes('Tottenham') || s.name.includes('Postecoglou'))?.id || 3,
      counter_system_name: 'Long Balls In Behind + Pace',
      strategy_type: 'Exploit Weakness',
      detailed_strategy: 'Simple but devastating. Long balls in behind extremely high defensive line. Pacy forwards run in behind repeatedly. Very effective.',
      key_adjustments: JSON.stringify(['Pacy forwards essential', 'Direct passing', 'Minimal buildup go direct', 'GK long kicks', 'Time runs beat offside']),
      when_to_apply: 'Always effective vs high lines. Especially on counter-attacks.',
      risk_level: 'Low (high success rate)',
      player_instructions: JSON.stringify({GK: 'Long distribution to forwards', Midfield: 'Direct passes in behind', Forwards: 'Runs in behind constantly time runs', Wingers: 'Sprint in behind on turnover'}),
      real_world_examples: JSON.stringify(['Chelsea 4-1 Tottenham (Nov 2024) - Palmer exploited high line', 'Various teams vs Postecoglou Spurs', 'Most goals conceded in top 8']),
      success_stories: JSON.stringify(['Tottenham concedes many from balls in behind', 'Extremely high success rate', 'Almost guaranteed chances'])
    },

    // Counter 4: vs Inverted Full-Backs (Arsenal 3-2-4-1)
    {
      target_system_id: systems.find(s => s.name.includes('Arsenal') && s.name.includes('2024'))?.id || 4,
      counter_system_name: 'Exploit Wide Spaces + Quick Switches',
      strategy_type: 'Exploit Weakness',
      detailed_strategy: 'NEW TACTIC 2024. When fullback inverts centrally, massive space opens on flanks. Overload with pacy winger and quick switches.',
      key_adjustments: JSON.stringify(['Identify which FB inverts (usually left)', 'Overload flank with winger + attacking FB (2v1)', 'Quick switches to isolated winger vs CB', 'Pacy winger essential', 'Force inverted FB choice: stay central or cover width']),
      when_to_apply: 'Immediately when identifying inverted FB system. On transitions when FB caught central.',
      risk_level: 'Medium-High',
      player_instructions: JSON.stringify({Wingers: 'Target space behind inverted FB', Midfield: 'Quick switches to isolated winger', Overall: 'Exploit transitions when FB out of position'}),
      real_world_examples: JSON.stringify(['Still developing (new 2024 tactic)', 'Teams learning to exploit', 'Bournemouth Brighton showed glimpses']),
      success_stories: JSON.stringify(['TBD (new tactic)', 'Logical weakness', 'Requires pace and timing'])
    },

    // Counter 5: vs Low Block/Parked Bus
    {
      target_system_id: systems.find(s => s.name.includes('Mourinho') && s.name.includes('Bus'))?.id || 5,
      counter_system_name: 'Width + Crossing + Patience',
      strategy_type: 'Tactical + Patience',
      detailed_strategy: 'Patient possession 60%+. Wide play with fullbacks and wingers. Cross into box. Win second balls. Set-pieces crucial. Can take 60+ minutes.',
      key_adjustments: JSON.stringify(['Patient possession', 'Width use full pitch', 'Crossing from wide', 'Target man in box', 'Fullbacks very high', 'Overload wings 2v1', 'Set-pieces practiced', 'Quick switches wing to wing']),
      when_to_apply: 'Against ultra-defensive teams. When opponent parking bus. When heavily favored.',
      risk_level: 'Low',
      player_instructions: JSON.stringify({Wingers: 'Stay wide cross frequently', Fullbacks: 'Very high provide width', Midfielders: 'Outside box for second balls', Striker: 'Target man for crosses'}),
      real_world_examples: JSON.stringify(['Man City vs Chelsea breaking Tuchel/Conte blocks', 'Liverpool vs Burnley defensive teams', 'Barcelona vs small teams', 'Crossing and set-pieces decide games']),
      success_stories: JSON.stringify(['Man City eventually breaks most low blocks', 'Requires patience 60+ mins', 'Set-pieces crucial', 'Width is key'])
    }
  ];

  let completed = 0;
  const stmt = db.prepare(`INSERT INTO counter_tactics (
    target_system_id, counter_system_name, strategy_type, detailed_strategy,
    key_adjustments, when_to_apply, risk_level, player_instructions,
    real_world_examples, success_stories
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  counterTactics.forEach((ct, index) => {
    stmt.run(
      ct.target_system_id,
      ct.counter_system_name,
      ct.strategy_type,
      ct.detailed_strategy,
      ct.key_adjustments,
      ct.when_to_apply,
      ct.risk_level,
      ct.player_instructions,
      ct.real_world_examples,
      ct.success_stories,
      (err) => {
        if (err) {
          console.log(`❌ ${ct.counter_system_name} - Hata: ${err.message}`);
        } else {
          completed++;
          console.log(`✅ ${completed}/5: ${ct.counter_system_name} eklendi!`);
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 ${completed}/5 karşı taktik eklendi!`);
    db.close();
  });
});
