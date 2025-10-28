const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('👥 TACTICAL PARTNERSHIPS BATCH 2 EKLENİYOR...\n');

// Get all roles
db.all('SELECT id, role_name, position FROM player_roles ORDER BY position, role_name', (err, roles) => {
  if (err) {
    console.log('❌ Error:', err.message);
    db.close();
    return;
  }

  console.log(`📊 ${roles.length} rol bulundu, daha fazla ortaklık oluşturuluyor...\n`);

  const partnerships = [];

  // More specific partnerships to reach 40+ total

  // DEFENSIVE UNITS
  partnerships.push({
    partnership_type: 'Defensive Partnership',
    partnership_name: 'Full-Back Pair - Balanced Defense',
    role_1_id: roles.find(r => r.position === 'DF')?.id || 1,
    role_2_id: roles.filter(r => r.position === 'DF')[1]?.id || 2,
    spatial_arrangement: 'Two full-backs on opposite flanks providing width and defensive cover',
    zone_coverage: 'Both flanks, defending wide areas and supporting center',
    function_description: 'Balanced full-back pairing. Both provide defensive solidity and attacking support.',
    key_principles: JSON.stringify(['Flank defense', 'Width in attack', 'Balanced support', 'Defensive cover', 'Transition awareness']),
    movement_patterns: JSON.stringify(['One attacks, one stays', 'Cover central spaces', 'Overlap when safe', 'Track wide threats']),
    passing_patterns: JSON.stringify(['Switches of play', 'Building from back', 'Supporting CBs', 'Wide distribution']),
    best_against: JSON.stringify(['Wide attacks', 'Wing-based teams', 'Crossing teams']),
    weak_against: JSON.stringify(['Central overloads', 'Quick transitions', 'Isolated 1v1s']),
    famous_examples: JSON.stringify(['Walker + Zinchenko City', 'White + Zinchenko Arsenal', 'Alexander-Arnold + Robertson Liverpool'])
  });

  partnerships.push({
    partnership_type: 'Defensive Unit',
    partnership_name: 'Three Centre-Backs - Defensive Wall',
    role_1_id: roles.filter(r => r.position === 'DF')[0]?.id || 1,
    role_2_id: roles.filter(r => r.position === 'DF')[1]?.id || 2,
    role_3_id: roles.filter(r => r.position === 'DF')[2]?.id || 3,
    spatial_arrangement: 'Three CBs side-by-side covering central zones',
    zone_coverage: 'Central defensive third, wide coverage with three defenders',
    function_description: 'Solid three-man defense. Central CB covers, wide CBs handle channels.',
    key_principles: JSON.stringify(['Central dominance', 'Wide coverage', 'Aerial strength', 'Communication', 'Cover shadow']),
    movement_patterns: JSON.stringify(['Central CB holds', 'Wide CBs press channels', 'Step-up coordination', 'Cover each other']),
    passing_patterns: JSON.stringify(['Three-man build-up', 'Width in possession', 'Safe passing', 'Progressive options']),
    best_against: JSON.stringify(['Two strikers', 'Aerial attacks', 'Central threats']),
    weak_against: JSON.stringify(['Wide overloads', 'Pace in wide areas', 'Isolated against three attackers']),
    famous_examples: JSON.stringify(['Azpilicueta + Silva + Rudiger Chelsea', 'Bonucci + Barzagli + Chiellini Juventus'])
  });

  // MIDFIELD PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Midfield Partnership',
    partnership_name: 'Dual Playmakers - Creative Midfield',
    role_1_id: roles.filter(r => r.position === 'MF')[0]?.id || 10,
    role_2_id: roles.filter(r => r.position === 'MF')[1]?.id || 11,
    spatial_arrangement: 'Two creative midfielders in central areas',
    zone_coverage: 'Central midfield, both with creative freedom',
    function_description: 'Two playmakers controlling midfield. Requires freedom from defensive duties.',
    key_principles: JSON.stringify(['Creative freedom', 'Technical quality', 'Possession dominance', 'Passing combinations']),
    movement_patterns: JSON.stringify(['Fluid positioning', 'Interchanging', 'Supporting angles', 'Between lines']),
    passing_patterns: JSON.stringify(['Quick combinations', 'Triangle passing', 'Through balls', 'Vision and creativity']),
    best_against: JSON.stringify(['Physical teams', 'Low-block defenses', 'Teams allowing space']),
    weak_against: JSON.stringify(['High-press teams', 'Physical battles', 'Counter-attacks']),
    famous_examples: JSON.stringify(['Xavi + Iniesta Barcelona', 'Modric + Kroos Madrid', 'Silva + De Bruyne City'])
  });

  partnerships.push({
    partnership_type: 'Midfield Partnership',
    partnership_name: 'Destroyer + Creator - Balance',
    role_1_id: roles.filter(r => r.position === 'MF')[2]?.id || 12,
    role_2_id: roles.filter(r => r.position === 'MF')[3]?.id || 13,
    spatial_arrangement: 'Defensive midfielder behind creative player',
    zone_coverage: 'Full central midfield, destroyer deep, creator ahead',
    function_description: 'Perfect balance: destroyer wins ball, creator uses it.',
    key_principles: JSON.stringify(['Defensive cover', 'Creative freedom', 'Ball winning', 'Distribution', 'Balance']),
    movement_patterns: JSON.stringify(['Destroyer sits deep', 'Creator roams', 'Vertical partnership', 'Complementary movement']),
    passing_patterns: JSON.stringify(['Destroyer to creator', 'Quick recycling', 'Safe to creative', 'Transition passing']),
    best_against: JSON.stringify(['Counter-attacking teams', 'Physical battles', 'Mixed threats']),
    weak_against: JSON.stringify(['Numerical overloads', 'High technical teams', 'Quick passing']),
    famous_examples: JSON.stringify(['Makelele + Lampard Chelsea', 'Kante + Fabregas Chelsea', 'Fernandinho + Silva City'])
  });

  partnerships.push({
    partnership_type: 'Midfield Unit',
    partnership_name: 'Three Midfield Runners - Energy',
    role_1_id: roles.filter(r => r.position === 'MF')[4]?.id || 14,
    role_2_id: roles.filter(r => r.position === 'MF')[5]?.id || 15,
    role_3_id: roles.filter(r => r.position === 'MF')[6]?.id || 16,
    spatial_arrangement: 'Three energetic midfielders covering all zones',
    zone_coverage: 'Complete midfield coverage with energy and running',
    function_description: 'High-energy midfield three. Constant running, pressing, box-to-box contributions.',
    key_principles: JSON.stringify(['High energy', 'Box-to-box', 'Pressing', 'Running power', 'All-round game']),
    movement_patterns: JSON.stringify(['Constant movement', 'Forward runs', 'Defensive recovery', 'Coverage', 'Rotation']),
    passing_patterns: JSON.stringify(['Quick passing', 'Forward drives', 'Transitions', 'Support play']),
    best_against: JSON.stringify(['Physical teams', 'Midfield battles', 'Teams needing to be outworked']),
    weak_against: JSON.stringify(['Technical overloads', 'Quick passing teams', 'Possession masters']),
    famous_examples: JSON.stringify(['Henderson + Wijnaldum + Milner Liverpool', 'Vidal + Marchisio + Pogba Juventus'])
  });

  // ATTACKING PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Attack Partnership',
    partnership_name: 'Fluid Front Three - Interchange',
    role_1_id: roles.filter(r => r.position === 'FW')[0]?.id || 25,
    role_2_id: roles.filter(r => r.position === 'FW')[1]?.id || 26,
    role_3_id: roles.filter(r => r.position === 'FW')[2]?.id || 27,
    spatial_arrangement: 'Three forwards constantly interchanging positions',
    zone_coverage: 'Full attacking third, fluid movement across front line',
    function_description: 'Modern fluid attack. Three forwards interchange, no fixed positions.',
    key_principles: JSON.stringify(['Position fluidity', 'Constant interchange', 'Unpredictable movement', 'All-round threat']),
    movement_patterns: JSON.stringify(['Position rotation', 'Width to center', 'Dropping deep', 'Running behind', 'Unpredictable']),
    passing_patterns: JSON.stringify(['Quick combinations', 'One-touch', 'Through balls', 'Lay-offs', 'Third man runs']),
    best_against: JSON.stringify(['Man-marking defenses', 'Rigid systems', 'Slower defenses']),
    weak_against: JSON.stringify(['Disciplined zonal defenses', 'Ultra-compact blocks', 'Physical dominance']),
    famous_examples: JSON.stringify(['Mane + Firmino + Salah Liverpool', 'Benzema + Vinicius + Rodrygo Madrid'])
  });

  partnerships.push({
    partnership_type: 'Attack Partnership',
    partnership_name: 'Striker + Playmaker - Support Striker',
    role_1_id: roles.filter(r => r.position === 'FW')[0]?.id || 25,
    role_2_id: roles.filter(r => r.position === 'MF').slice(-1)[0]?.id || 20,
    spatial_arrangement: 'Striker high, playmaker supporting from behind',
    zone_coverage: 'Central attacking zones, striker in box, playmaker edge',
    function_description: 'Classic support striker setup. Playmaker feeds lone striker.',
    key_principles: JSON.stringify(['Striker focal point', 'Playmaker support', 'Link play', 'Goal threat', 'Combinations']),
    movement_patterns: JSON.stringify(['Striker holds position', 'Playmaker between lines', 'Support runs', 'Dropping movements']),
    passing_patterns: JSON.stringify(['Playmaker to striker', 'Flick-ons', 'Lay-offs', 'Through balls', 'Support passing']),
    best_against: JSON.stringify(['Deep blocks', 'Physical defenses', 'Set-piece situations']),
    weak_against: JSON.stringify(['High pressing', 'Isolated striker', 'Lack of width']),
    famous_examples: JSON.stringify(['Kane + Eriksen Spurs', 'Benzema + Ozil Madrid', 'Lewandowski + Muller Bayern'])
  });

  partnerships.push({
    partnership_type: 'Wing Partnership',
    partnership_name: 'Wide Forwards - Dual Threat',
    role_1_id: roles.filter(r => r.position === 'FW')[1]?.id || 26,
    role_2_id: roles.filter(r => r.position === 'FW')[2]?.id || 27,
    spatial_arrangement: 'Two wide forwards on opposite flanks',
    zone_coverage: 'Both wings, cutting inside to create central overloads',
    function_description: 'Modern wide forwards on both sides. Both cut inside, both score.',
    key_principles: JSON.stringify(['Inside movement', 'Goal threat', 'Width initially', 'Central finishing', 'Inverted wingers']),
    movement_patterns: JSON.stringify(['Wide starting positions', 'Inside cuts', 'Goal-scoring runs', 'Interchanging sides']),
    passing_patterns: JSON.stringify(['Cut inside shots', 'Crosses to far post', 'Combinations', 'Switches']),
    best_against: JSON.stringify(['Narrow defenses', 'Slow full-backs', 'High lines']),
    weak_against: JSON.stringify(['Disciplined wide defenses', 'Deep blocks', 'Tracking runners']),
    famous_examples: JSON.stringify(['Ronaldo + Bale Madrid', 'Sterling + Sane City', 'Salah + Mane Liverpool'])
  });

  // HYBRID PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Hybrid Partnership',
    partnership_name: 'Deep Midfielder + Overlapping Full-Backs',
    role_1_id: roles.filter(r => r.position === 'MF')[0]?.id || 10,
    role_2_id: roles.filter(r => r.position === 'DF')[3]?.id || 4,
    role_3_id: roles.filter(r => r.position === 'DF')[4]?.id || 5,
    spatial_arrangement: 'Midfielder sits deep, full-backs push very high',
    zone_coverage: 'Midfielder covers center, full-backs provide width high up',
    function_description: 'Modern system: defensive midfielder allows full-backs to bomb forward.',
    key_principles: JSON.stringify(['Defensive cover', 'Width from full-backs', 'Overlaps', 'Transitions', 'Balance']),
    movement_patterns: JSON.stringify(['Midfielder sits', 'Full-backs attack', 'Coordinated pushes', 'One at a time']),
    passing_patterns: JSON.stringify(['Switches to full-backs', 'Through center', 'Wide crosses', 'Central recycling']),
    best_against: JSON.stringify(['Narrow formations', 'Central defenses', 'Slow wide players']),
    weak_against: JSON.stringify(['Quick wide counters', 'Overlapping threats', 'Transition moments']),
    famous_examples: JSON.stringify(['Fernandinho + Walker + Mendy City', 'Fabinho + TAA + Robertson Liverpool'])
  });

  partnerships.push({
    partnership_type: 'Vertical Partnership',
    partnership_name: 'CB + DM + CAM - Vertical Line',
    role_1_id: roles.filter(r => r.position === 'DF')[0]?.id || 1,
    role_2_id: roles.filter(r => r.position === 'MF')[0]?.id || 10,
    role_3_id: roles.filter(r => r.position === 'MF').slice(-1)[0]?.id || 20,
    spatial_arrangement: 'Vertical line: CB -> DM -> CAM down spine',
    zone_coverage: 'Central spine from defense to attack',
    function_description: 'Spine of team. CB builds, DM distributes, CAM creates.',
    key_principles: JSON.stringify(['Central control', 'Vertical progression', 'Spine dominance', 'Build-up', 'Creation']),
    movement_patterns: JSON.stringify(['Vertical passing lanes', 'Progressive movement', 'Supporting angles', 'Spine coverage']),
    passing_patterns: JSON.stringify(['CB to DM to CAM', 'Progressive passing', 'Central build-up', 'Through spine']),
    best_against: JSON.stringify(['Wide pressing', 'Midfield pressure', 'Teams leaving spine open']),
    weak_against: JSON.stringify(['Central pressing', 'Spine pressure', 'Physical midfields']),
    famous_examples: JSON.stringify(['Ramos + Casemiro + Modric Madrid', 'Van Dijk + Fabinho + Firmino Liverpool'])
  });

  partnerships.push({
    partnership_type: 'Asymmetric Partnership',
    partnership_name: 'Inverted FB + Overlapping FB - Asymmetric',
    role_1_id: roles.filter(r => r.position === 'DF')[3]?.id || 4,
    role_2_id: roles.filter(r => r.position === 'DF')[4]?.id || 5,
    spatial_arrangement: 'One FB inverts, opposite FB overlaps creating asymmetry',
    zone_coverage: 'Asymmetric flank coverage, different roles on each side',
    function_description: 'Modern tactical innovation. Different FB roles on each side.',
    key_principles: JSON.stringify(['Asymmetry', 'Unpredictability', 'Midfield overload', 'Width maintained', 'Balance']),
    movement_patterns: JSON.stringify(['Left inverts', 'Right overlaps', 'Tactical asymmetry', 'Unpredictable']),
    passing_patterns: JSON.stringify(['Switches between asymmetric sides', 'Varied patterns', 'Unpredictable']),
    best_against: JSON.stringify(['Predictable defenses', 'Mirror formations', 'Traditional systems']),
    weak_against: JSON.stringify(['Disciplined tracking', 'Flexible systems', 'Quick transitions']),
    famous_examples: JSON.stringify(['Zinchenko + White Arsenal', 'Cancelo + Walker City'])
  });

  // PRESSING PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Pressing Partnership',
    partnership_name: 'Forward Press + Midfield Press - High Press',
    role_1_id: roles.filter(r => r.position === 'FW')[0]?.id || 25,
    role_2_id: roles.filter(r => r.position === 'MF')[1]?.id || 11,
    role_3_id: roles.filter(r => r.position === 'MF')[2]?.id || 12,
    spatial_arrangement: 'Forwards press high, midfielders support press behind',
    zone_coverage: 'High press coordination, forwards and midfielders together',
    function_description: 'Coordinated high press. Forwards trigger, midfielders cut lanes.',
    key_principles: JSON.stringify(['Press triggers', 'Coordination', 'Cutting lanes', 'Intensity', 'Timing']),
    movement_patterns: JSON.stringify(['Forward press trigger', 'Midfielder support', 'Coordinated movement', 'Pressing traps']),
    passing_patterns: JSON.stringify(['Quick transitions after win', 'Direct attacks', 'Counter-press']),
    best_against: JSON.stringify(['Poor buildup teams', 'Weak technical teams', 'Nervous defenses']),
    weak_against: JSON.stringify(['Elite buildup', 'Technical quality', 'Long ball teams']),
    famous_examples: JSON.stringify(['Firmino + Henderson + Wijnaldum Liverpool press', 'Jesus + Rodri + Gundogan City'])
  });

  partnerships.push({
    partnership_type: 'Counter-Press Partnership',
    partnership_name: 'Immediate Counter-Press Unit',
    role_1_id: roles.filter(r => r.position === 'MF')[3]?.id || 13,
    role_2_id: roles.filter(r => r.position === 'MF')[4]?.id || 14,
    role_3_id: roles.filter(r => r.position === 'FW')[0]?.id || 25,
    spatial_arrangement: 'Nearest players immediately press after losing ball',
    zone_coverage: 'Immediate area around ball loss, 3+ players pressing',
    function_description: 'Gegenpressing unit. Immediate high-intensity press after ball loss.',
    key_principles: JSON.stringify(['Immediate press', '6-second rule', 'High intensity', 'Win ball back', 'Counter-press']),
    movement_patterns: JSON.stringify(['Immediate reaction', 'Surround ball', 'Cut passing lanes', 'Aggressive']),
    passing_patterns: JSON.stringify(['Quick attack after winning', 'Direct', 'Transitions']),
    best_against: JSON.stringify(['Slow transitions', 'Poor decision makers', 'Disorganized teams']),
    weak_against: JSON.stringify(['Direct long balls', 'Quick counters', 'Elite ball retention']),
    famous_examples: JSON.stringify(['Liverpool Klopp gegenpressing', 'Bayern Hansi Flick', 'RB Leipzig'])
  });

  // TRANSITION PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Transition Partnership',
    partnership_name: 'Counter-Attack Triangle',
    role_1_id: roles.filter(r => r.position === 'FW')[0]?.id || 25,
    role_2_id: roles.filter(r => r.position === 'FW')[1]?.id || 26,
    role_3_id: roles.filter(r => r.position === 'MF').slice(-1)[0]?.id || 20,
    spatial_arrangement: 'Pacy forwards stay high, midfielder breaks forward',
    zone_coverage: 'Front three ready for transitions, quick breaks',
    function_description: 'Counter-attack specialists. Stay high, break quickly on transitions.',
    key_principles: JSON.stringify(['Stay high', 'Quick transitions', 'Pace', 'Direct running', 'Clinical finishing']),
    movement_patterns: JSON.stringify(['Forwards positioned high', 'Breaking runs', 'Direct sprints', 'Stretching defense']),
    passing_patterns: JSON.stringify(['Direct passes', 'Long balls', 'Through balls', 'Minimal touches']),
    best_against: JSON.stringify(['High lines', 'Possession teams', 'Teams committing forward']),
    weak_against: JSON.stringify(['Deep blocks', 'Compact defenses', 'Low possession games']),
    famous_examples: JSON.stringify(['Vardy + Mahrez + Albrighton Leicester', 'Son + Kane + Bale Spurs'])
  });

  partnerships.push({
    partnership_type: 'Build-Up Unit',
    partnership_name: 'Back Five Build-Up',
    role_1_id: roles.find(r => r.position === 'GK')?.id || 29,
    role_2_id: roles.filter(r => r.position === 'DF')[0]?.id || 1,
    role_3_id: roles.filter(r => r.position === 'DF')[1]?.id || 2,
    spatial_arrangement: 'GK + 2 CBs + 2 FBs wide creating back five build-up',
    zone_coverage: 'Complete defensive third, numerical superiority in build-up',
    function_description: 'Modern build-up shape. Back five creates numerical advantage.',
    key_principles: JSON.stringify(['Numerical superiority', 'Patient buildup', 'GK involvement', 'Width from FBs']),
    movement_patterns: JSON.stringify(['CBs split wide', 'FBs very wide', 'GK drops', 'Triangles']),
    passing_patterns: JSON.stringify(['Short combinations', 'Wide build-up', 'Patient progression']),
    best_against: JSON.stringify(['Two-man press', 'High pressure', 'Aggressive forwards']),
    weak_against: JSON.stringify(['Ultra-high press', 'Three-man press', 'Physical pressing']),
    famous_examples: JSON.stringify(['Man City build-up', 'Brighton De Zerbi', 'Arsenal build-up'])
  });

  // SET-PIECE PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Set-Piece Partnership',
    partnership_name: 'Corner Takers + Aerial Threats',
    role_1_id: roles.filter(r => r.position === 'MF')[0]?.id || 10,
    role_2_id: roles.filter(r => r.position === 'DF')[0]?.id || 1,
    role_3_id: roles.filter(r => r.position === 'FW')[0]?.id || 25,
    spatial_arrangement: 'Corner taker + tall defenders and forwards in box',
    zone_coverage: 'Set-piece situations, aerial dominance in box',
    function_description: 'Set-piece specialists. Quality delivery meets aerial power.',
    key_principles: JSON.stringify(['Quality delivery', 'Aerial dominance', 'Movement', 'Timing', 'Finishing']),
    movement_patterns: JSON.stringify(['Runners from deep', 'Near post flicks', 'Far post headers', 'Blocking runs']),
    passing_patterns: JSON.stringify(['Varied deliveries', 'In-swinging', 'Out-swinging', 'Short corners']),
    best_against: JSON.stringify(['Smaller defenses', 'Zonal marking', 'Weak aerial teams']),
    weak_against: JSON.stringify(['Physical defenses', 'Man-marking', 'GK dominance']),
    famous_examples: JSON.stringify(['Arsenal 2024 set-pieces', 'Stoke under Pulis', 'Atletico corners'])
  });

  partnerships.push({
    partnership_type: 'Set-Piece Partnership',
    partnership_name: 'Free-Kick Specialists',
    role_1_id: roles.filter(r => r.position === 'MF')[1]?.id || 11,
    role_2_id: roles.filter(r => r.position === 'FW')[1]?.id || 26,
    spatial_arrangement: 'Multiple free-kick takers creating uncertainty',
    zone_coverage: 'Free-kick situations, different specialists',
    function_description: 'Free-kick partnership. Multiple takers, different techniques.',
    key_principles: JSON.stringify(['Technique variety', 'Uncertainty', 'Quality striking', 'Options']),
    movement_patterns: JSON.stringify(['Dummy runs', 'Multiple takers', 'Confusing defense']),
    passing_patterns: JSON.stringify(['Direct shots', 'Lay-offs', 'Clever routines']),
    best_against: JSON.stringify(['Standard walls', 'Predictable defenses', 'Free-kick situations']),
    weak_against: JSON.stringify(['Elite goalkeepers', 'Disciplined walls', 'Quick transitions']),
    famous_examples: JSON.stringify(['Ronaldo + Bale Madrid', 'Messi + Suarez Barcelona', 'Beckham + Giggs United'])
  });

  // VERSATILE PARTNERSHIPS
  partnerships.push({
    partnership_type: 'Versatile Partnership',
    partnership_name: 'Multi-Functional Players',
    role_1_id: roles.filter(r => r.position === 'MF')[5]?.id || 15,
    role_2_id: roles.filter(r => r.position === 'MF')[6]?.id || 16,
    role_3_id: roles.filter(r => r.position === 'FW')[2]?.id || 27,
    spatial_arrangement: 'Players capable of multiple positions, fluid system',
    zone_coverage: 'Flexible coverage, players rotating positions',
    function_description: 'Versatile players constantly changing positions. Total football approach.',
    key_principles: JSON.stringify(['Versatility', 'Position fluidity', 'Intelligence', 'Adaptability', 'Unpredictability']),
    movement_patterns: JSON.stringify(['Constant rotation', 'Position changes', 'Fluid movement', 'Unpredictable']),
    passing_patterns: JSON.stringify(['Quick combinations', 'Understanding', 'Intuitive passing']),
    best_against: JSON.stringify(['Rigid systems', 'Man-marking', 'Predictable defenses']),
    weak_against: JSON.stringify(['Disciplined zonal systems', 'Physical dominance', 'Structure']),
    famous_examples: JSON.stringify(['Ajax total football', 'Man City Pep', 'Barcelona Cruyff'])
  });

  partnerships.push({
    partnership_type: 'Width Partnership',
    partnership_name: 'Wide Overload - Wing Dominance',
    role_1_id: roles.filter(r => r.position === 'DF')[3]?.id || 4,
    role_2_id: roles.filter(r => r.position === 'MF')[3]?.id || 13,
    role_3_id: roles.filter(r => r.position === 'FW')[1]?.id || 26,
    spatial_arrangement: 'Three players dominating one flank creating overload',
    zone_coverage: 'One flank heavily overloaded, creating numerical advantage',
    function_description: 'Tactical overload on one side. Three players overwhelming one flank.',
    key_principles: JSON.stringify(['Numerical superiority', 'Flank dominance', 'Overload creation', 'Width', 'Crossing']),
    movement_patterns: JSON.stringify(['Overlapping runs', 'Underlapping', 'Triangles', 'Rotations']),
    passing_patterns: JSON.stringify(['Combinations', 'Quick passing', 'Crosses', 'Cut-backs']),
    best_against: JSON.stringify(['Weak full-backs', 'Isolated defenders', 'Narrow formations']),
    weak_against: JSON.stringify(['Overload other side', 'Compact defenses', 'Switching play']),
    famous_examples: JSON.stringify(['Liverpool left side TAA overload', 'Man City right side', 'Arsenal left side'])
  });

  partnerships.push({
    partnership_type: 'Recovery Partnership',
    partnership_name: 'Defensive Recovery Unit',
    role_1_id: roles.filter(r => r.position === 'DF')[0]?.id || 1,
    role_2_id: roles.filter(r => r.position === 'DF')[1]?.id || 2,
    role_3_id: roles.filter(r => r.position === 'MF')[0]?.id || 10,
    spatial_arrangement: 'Quick defenders and midfielder covering defensive transitions',
    zone_coverage: 'Defensive coverage on transitions, rapid recovery',
    function_description: 'Recovery specialists. Fast players covering defensive transitions.',
    key_principles: JSON.stringify(['Recovery runs', 'Speed', 'Covering', 'Transition defense', 'Awareness']),
    movement_patterns: JSON.stringify(['Tracking back', 'Recovery sprints', 'Covering runs', 'Defensive transitions']),
    passing_patterns: JSON.stringify(['Safe clearances', 'Recycling', 'Defensive passes']),
    best_against: JSON.stringify(['Counter-attacks', 'Fast transitions', 'Direct attacks']),
    weak_against: JSON.stringify(['Ultra-fast counters', 'Multiple runners', 'Overloads']),
    famous_examples: JSON.stringify(['Walker + Stones recovery', 'Van Dijk + Gomez', 'Pace at back'])
  });

  partnerships.push({
    partnership_type: 'Possession Partnership',
    partnership_name: 'Possession Triangle - Keep Ball',
    role_1_id: roles.filter(r => r.position === 'MF')[0]?.id || 10,
    role_2_id: roles.filter(r => r.position === 'MF')[1]?.id || 11,
    role_3_id: roles.filter(r => r.position === 'MF')[2]?.id || 12,
    spatial_arrangement: 'Three technical midfielders forming triangles',
    zone_coverage: 'Central midfield, constant triangles and passing options',
    function_description: 'Possession masters. Three technical players dominating midfield.',
    key_principles: JSON.stringify(['Technical quality', 'Triangles', 'Possession', 'Passing', 'Control']),
    movement_patterns: JSON.stringify(['Constant support angles', 'Triangles everywhere', 'Rondos', 'Movement']),
    passing_patterns: JSON.stringify(['Short passing', 'Quick combinations', 'Tiki-taka', 'One-touch']),
    best_against: JSON.stringify(['Physical teams', 'Direct teams', 'Low technical teams']),
    weak_against: JSON.stringify(['Ultra-high press', 'Physical pressing', 'Athletic teams']),
    famous_examples: JSON.stringify(['Barcelona Xavi-Iniesta-Busquets', 'Spain 2008-2012', 'Man City technical midfield'])
  });

  console.log(`💡 Batch 2: ${partnerships.length} ek ortaklık oluşturuldu, ekleniyor...\n`);

  let completed = 0;
  const stmt = db.prepare(`INSERT INTO tactical_partnerships (
    partnership_type, partnership_name, role_1_id, role_2_id, role_3_id,
    spatial_arrangement, zone_coverage, function_description,
    key_principles, movement_patterns, passing_patterns,
    best_against, weak_against, famous_examples
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  partnerships.forEach((p, i) => {
    stmt.run(
      p.partnership_type, p.partnership_name, p.role_1_id, p.role_2_id, p.role_3_id || null,
      p.spatial_arrangement, p.zone_coverage, p.function_description,
      p.key_principles, p.movement_patterns, p.passing_patterns,
      p.best_against, p.weak_against, p.famous_examples,
      (err) => {
        if (err) {
          console.log(`❌ Error: ${err.message}`);
        } else {
          completed++;
          if (completed % 5 === 0 || completed === partnerships.length) {
            console.log(`✅ ${completed}/${partnerships.length} eklendi...`);
          }
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 Batch 2: ${completed}/${partnerships.length} ortaklık başarıyla eklendi!`);
    console.log(`📊 Toplam: 24 (batch 1) + ${completed} (batch 2) = ${24 + completed} tactical partnerships!`);
    db.close();
  });
});
