const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🎯 BATCH 2: 20+ EK TAKTİK KAVRAM EKLENİYOR...\n');

const concepts = [
  {
    concept_name: 'Low Block Defense',
    category: 'Defensive',
    importance: 8,
    description: 'Deep defensive line, compact shape. Deny space, absorb pressure.',
    detailed_explanation: 'Defensive line positioned deep (own third). Ultra-compact shape denying space between lines. Absorb pressure patiently. Counter-attack when ball won. Mourinho specialty. Frustrates possession teams.',
    principles: JSON.stringify(['Very deep defensive line', 'Compact horizontal and vertical', 'Deny space between lines', 'Patient defending', 'Counter when win ball']),
    how_to_implement: 'Position defensive line 25m from goal. Midfield drops deep. Everyone behind ball. Minimal space between lines. Discipline critical.',
    required_player_attributes: JSON.stringify(['Discipline', 'Concentration', 'Positioning', 'Patience', 'Stamina']),
    suitable_formations: JSON.stringify(['5-3-2', '4-5-1', '4-4-2 deep', '5-4-1']),
    real_world_examples: JSON.stringify(['Mourinho Chelsea bus', 'Atletico vs Barcelona', 'Burnley vs big teams', 'Greece Euro 2004']),
    famous_implementations: JSON.stringify(['Mourinho teams', 'Simeone Atletico', 'Defensive masterclasses']),
    related_concepts: JSON.stringify(['Compactness', 'Counter-attacking', 'Defensive organization']),
    opposing_concepts: JSON.stringify(['High line', 'High press', 'Possession play'])
  },

  {
    concept_name: 'Offside Trap',
    category: 'Defensive',
    importance: 7,
    description: 'High defensive line steps up simultaneously catching attackers offside.',
    detailed_explanation: 'Coordinated defensive line movement stepping up together. Catches attackers offside. Requires perfect timing and coordination. Risky but effective. Postecoglou uses extensively.',
    principles: JSON.stringify(['Coordinated line movement', 'Step up simultaneously', 'Catch attackers offside', 'Perfect timing required', 'Communication critical']),
    how_to_implement: 'Practice defensive line coordination. Designated caller (usually sweeper/CB). Step up together on trigger. High line essential.',
    required_player_attributes: JSON.stringify(['Pace', 'Positioning', 'Communication', 'Timing', 'Concentration']),
    suitable_formations: JSON.stringify(['High line systems', '4-3-3', '4-2-3-1', 'Postecoglou style']),
    real_world_examples: JSON.stringify(['Tottenham Postecoglou', 'Arsenal back 4', 'Ajax Total Football', 'Liverpool high line']),
    famous_implementations: JSON.stringify(['Sacchi Milan', 'Postecoglou Spurs', 'Arsenal Arteta']),
    related_concepts: JSON.stringify(['High line', 'Compactness', 'Coordination']),
    opposing_concepts: JSON.stringify(['Low block', 'Balls in behind'])
  },

  {
    concept_name: 'Width in Attack',
    category: 'Attacking',
    importance: 8,
    description: 'Stretch defense horizontally. Create space in center.',
    detailed_explanation: 'Use full width of pitch in attack. Stretch opponent defense. Creates space centrally to exploit. Wingers and fullbacks provide width. Essential attacking principle.',
    principles: JSON.stringify(['Use full pitch width', 'Stretch defense horizontally', 'Create central space', 'Wingers and FBs wide', 'Quick switches']),
    how_to_implement: 'Instruct wingers to stay wide. Fullbacks overlap. Stretch opponent. When stretched, exploit central space or switch play.',
    required_player_attributes: JSON.stringify(['Width maintenance', 'Crossing', 'Pace', 'Stamina']),
    suitable_formations: JSON.stringify(['4-3-3', '4-2-3-1', '3-5-2', 'Any attacking system']),
    real_world_examples: JSON.stringify(['Liverpool wing play', 'Man City width', 'Real Madrid crosses', 'Traditional English football']),
    famous_implementations: JSON.stringify(['Klopp Liverpool', 'Ferguson Man United', 'Traditional attacking']),
    related_concepts: JSON.stringify(['Overloads', 'Crossing', 'Stretching play']),
    opposing_concepts: JSON.stringify(['Narrow play', 'Central focus'])
  },

  {
    concept_name: 'Narrow Diamond Midfield',
    category: 'Shape',
    importance: 7,
    description: 'Four midfielders in diamond shape. Control center, overload midfield.',
    detailed_explanation: '4-4-2 or 4-3-1-2 diamond midfield. DM base, two CMs sides, CAM top. Dominates central areas. Overloads opponent midfield. Requires defensive width from fullbacks.',
    principles: JSON.stringify(['Four midfielders diamond', 'Central control', 'Numerical superiority midfield', 'FBs provide width', 'Compact center']),
    how_to_implement: 'Position DM deep, two CMs alongside, CAM advanced. Create diamond. Dominate center. Fullbacks must provide width.',
    required_player_attributes: JSON.stringify(['Passing', 'Positioning', 'Work-rate', 'Intelligence']),
    suitable_formations: JSON.stringify(['4-4-2 diamond', '4-3-1-2', '4-1-2-1-2']),
    real_world_examples: JSON.stringify(['Milan Ancelotti', 'Real Madrid', 'Italy NT historically', 'Central-focused teams']),
    famous_implementations: JSON.stringify(['Ancelotti Milan', 'Zidane Madrid', 'Traditional Italian']),
    related_concepts: JSON.stringify(['Triangles', 'Central control', 'Overloads']),
    opposing_concepts: JSON.stringify(['Wide formations', 'Wing focus'])
  },

  {
    concept_name: 'Inverted Fullbacks',
    category: 'Modern Innovation',
    importance: 10,
    description: 'Fullbacks move inside to midfield when in possession. 2024 revolution.',
    detailed_explanation: 'Revolutionary 2024 concept. Fullback(s) move from wide position into central midfield when team has ball. Creates numerical superiority in midfield. Arsenal Zinchenko iconic example. Changes 4-3-3 to 3-2-4-1.',
    principles: JSON.stringify(['FB moves central in possession', 'Creates midfield overload', 'Formation shifts (4-3-3 to 3-2-4-1)', 'Returns wide when ball lost', 'Requires intelligent player']),
    how_to_implement: 'Select technically gifted FB. Instruct to move inside when possession. Form double pivot or arrive in midfield. Return immediately when possession lost.',
    required_player_attributes: JSON.stringify(['Intelligence', 'Passing', 'Positioning', 'Tactical flexibility', 'Discipline']),
    suitable_formations: JSON.stringify(['4-3-3', '4-2-3-1', '3-2-4-1']),
    real_world_examples: JSON.stringify(['Zinchenko Arsenal', 'Lewis-Skelly Arsenal', 'Cancelo Man City', 'Stones RB Man City', 'Kimmich Bayern']),
    famous_implementations: JSON.stringify(['Arteta Arsenal 2024', 'Guardiola Man City', 'Modern innovation']),
    related_concepts: JSON.stringify(['Positional play', 'Overloads', 'Tactical flexibility']),
    opposing_concepts: JSON.stringify(['Traditional fullback', 'Wide play'])
  },

  {
    concept_name: 'False 9',
    category: 'Attacking Role',
    importance: 9,
    description: 'Striker drops deep into midfield. Creates confusion, space for runners.',
    detailed_explanation: 'Striker drops into midfield zones instead of staying high. CBs confused: follow and leave space, or stay and give time on ball. Creates space for inside forwards to run into. Messi iconic false 9.',
    principles: JSON.stringify(['Striker drops deep', 'Confuses CBs', 'Creates space behind', 'Midfield overload', 'Inside forwards exploit space']),
    how_to_implement: 'Instruct striker to drop into #10 zone. Inside forwards make runs behind. Exploit CB confusion.',
    required_player_attributes: JSON.stringify(['Intelligence', 'Passing', 'Dribbling', 'Vision', 'Link-up play']),
    suitable_formations: JSON.stringify(['4-3-3 false 9', '4-2-3-1 false 9', 'Flexible systems']),
    real_world_examples: JSON.stringify(['Messi Barcelona 2010-2015', 'Firmino Liverpool', 'Fabregas Spain', 'Totti Roma']),
    famous_implementations: JSON.stringify(['Guardiola Barcelona Messi', 'Spain 2012', 'Liverpool Firmino']),
    related_concepts: JSON.stringify(['Inside forwards', 'Dropping deep', 'Space creation']),
    opposing_concepts: JSON.stringify(['Traditional #9', 'Target man'])
  },

  {
    concept_name: 'Build-up Play',
    category: 'Possession',
    importance: 9,
    description: 'Controlled progression from defense through midfield to attack.',
    detailed_explanation: 'Patient ball progression from own half. GK to CBs to midfielders to attackers. Controlled, possession-based. Opposite of direct play. Requires technical quality throughout team.',
    principles: JSON.stringify(['Patient progression', 'GK involved', 'CBs comfortable on ball', 'Midfield links', 'Controlled not rushed']),
    how_to_implement: 'Train GK distribution. CBs split wide. DM drops between CBs. Create passing triangles. Progress patiently.',
    required_player_attributes: JSON.stringify(['Passing', 'Composure', 'First touch', 'Vision', 'Patience']),
    suitable_formations: JSON.stringify(['All modern systems', 'Especially 4-3-3', '3-2-4-1']),
    real_world_examples: JSON.stringify(['Man City buildup', 'Barcelona famous', 'Arsenal Arteta', 'Brighton De Zerbi']),
    famous_implementations: JSON.stringify(['Guardiola teams', 'Barcelona golden era', 'Modern possession football']),
    related_concepts: JSON.stringify(['Positional play', 'Triangles', 'Patience']),
    opposing_concepts: JSON.stringify(['Long ball', 'Direct play', 'Route one'])
  },

  {
    concept_name: 'Zonal Marking',
    category: 'Defensive',
    importance: 8,
    description: 'Defend spaces/zones not individual players. Modern defensive principle.',
    detailed_explanation: 'Players assigned zones to defend rather than marking specific opponents. Maintain team shape. Opponents who enter your zone become your responsibility. More flexible than man-marking.',
    principles: JSON.stringify(['Defend zones not players', 'Maintain team shape', 'Pick up players in zone', 'Flexible coverage', 'Team organization key']),
    how_to_implement: 'Assign each player a zone. Whoever enters their zone, they mark. Maintain distances and shape.',
    required_player_attributes: JSON.stringify(['Positioning', 'Awareness', 'Communication', 'Discipline', 'Intelligence']),
    suitable_formations: JSON.stringify(['All formations', 'Modern defensive standard']),
    real_world_examples: JSON.stringify(['Most modern teams', 'Guardiola defense', 'Zonal marking standard', 'Set-pieces often zonal']),
    famous_implementations: JSON.stringify(['Modern football standard', 'Most top teams', 'Tactical evolution']),
    related_concepts: JSON.stringify(['Compactness', 'Team shape', 'Organization']),
    opposing_concepts: JSON.stringify(['Man-marking', 'Personal assignments'])
  },

  {
    concept_name: 'Man-Marking',
    category: 'Defensive',
    importance: 7,
    description: 'Assign each defender to mark specific opponent. Follow everywhere.',
    detailed_explanation: 'Each defender assigned to specific opponent. Follow them everywhere. Tight marking. Effective against key players but risks leaving shape. Less common in modern football.',
    principles: JSON.stringify(['Assigned opponent', 'Follow everywhere', 'Tight marking', 'Deny time and space', 'Personal duel']),
    how_to_implement: 'Assign specific player to opponent (often star player). Follow closely. Deny time on ball.',
    required_player_attributes: JSON.stringify(['Concentration', 'Stamina', 'Physicality', 'Discipline', 'Aggression']),
    suitable_formations: JSON.stringify(['Any formation', 'Less common modern', 'Situational use']),
    real_world_examples: JSON.stringify(['Pepe on Messi', 'Man-marking key player', 'Historical Italian football', 'Special assignments']),
    famous_implementations: JSON.stringify(['Italian Catenaccio', 'Special tactical plans', 'Big game assignments']),
    related_concepts: JSON.stringify(['Tight marking', 'Individual battles']),
    opposing_concepts: JSON.stringify(['Zonal marking', 'Team shape focus'])
  },

  {
    concept_name: 'Transition Moments',
    category: 'Transition',
    importance: 10,
    description: 'Critical moments changing from attack to defense or vice versa.',
    detailed_explanation: 'Most important tactical moments. When possession changes: attack to defense (negative transition) or defense to attack (positive transition). Most goals scored/conceded. Requires different mindsets.',
    principles: JSON.stringify(['Attack to defense transition', 'Defense to attack transition', 'Most critical moments', 'Different mindset required', 'Quick decision making']),
    how_to_implement: 'Train transitions specifically. When ball lost: immediate decision (press or drop). When won: immediate decision (counter or control).',
    required_player_attributes: JSON.stringify(['Decision making', 'Speed of thought', 'Stamina', 'Intensity', 'Awareness']),
    suitable_formations: JSON.stringify(['All formations', 'Universal principle']),
    real_world_examples: JSON.stringify(['Klopp transitions', 'Counter-attacking teams', 'Modern football focus', 'Every match']),
    famous_implementations: JSON.stringify(['All modern teams', 'Klopp specialty', 'Modern tactical focus']),
    related_concepts: JSON.stringify(['Gegenpressing', 'Counter-attacking', 'Decision making']),
    opposing_concepts: JSON.stringify(['Static play', 'Slow transitions'])
  },

  {
    concept_name: 'Rest Defense',
    category: 'Defensive',
    importance: 8,
    description: 'Players staying back when team attacks. Insurance against counters.',
    detailed_explanation: 'When attacking, certain players stay deeper providing defensive cover. Usually DM and CBs. Prevents exposure to counters. Balance between attack and defense.',
    principles: JSON.stringify(['Players stay back when attacking', 'Usually DM + CBs', 'Counter-attack insurance', 'Defensive balance', '3-2 rest defense common']),
    how_to_implement: 'Assign specific players to stay back. Usually DM plus two CBs. Others can commit forward. Maintain defensive balance.',
    required_player_attributes: JSON.stringify(['Discipline', 'Positioning', 'Awareness', 'Recovery speed']),
    suitable_formations: JSON.stringify(['All formations', 'Especially important for attacking teams']),
    real_world_examples: JSON.stringify(['Busquets Barcelona', 'Rodri Man City', 'Modern possession teams', 'Attacking teams need rest defense']),
    famous_implementations: JSON.stringify(['Guardiola teams', 'Barcelona', 'Modern attacking football']),
    related_concepts: JSON.stringify(['Defensive balance', 'Transition defense', 'Positional discipline']),
    opposing_concepts: JSON.stringify(['All-out attack', 'No defensive cover'])
  },

  {
    concept_name: 'Crossing and Cutbacks',
    category: 'Attacking',
    importance: 7,
    description: 'Delivering ball into box from wide areas or byline.',
    detailed_explanation: 'Traditional attacking method. Cross from wide positions into penalty area for strikers to finish. Modern variation: cutback from byline (more dangerous). Still highly effective.',
    principles: JSON.stringify(['Wide delivery', 'Target attackers in box', 'Cutbacks from byline better', 'Multiple runners', 'Far post crosses dangerous']),
    how_to_implement: 'Get wide players to byline. Deliver low cutback crosses. Multiple attackers attack box. Practice timing.',
    required_player_attributes: JSON.stringify(['Crossing ability', 'Heading', 'Movement', 'Finishing', 'Timing']),
    suitable_formations: JSON.stringify(['All formations', 'Especially wide formations', 'Traditional systems']),
    real_world_examples: JSON.stringify(['Liverpool crossing', 'Man United Ferguson era', 'Traditional English football', 'Cutbacks modern evolution']),
    famous_implementations: JSON.stringify(['Ferguson teams', 'Liverpool Klopp', 'Traditional football']),
    related_concepts: JSON.stringify(['Width', 'Aerial threat', 'Target man']),
    opposing_concepts: JSON.stringify(['Central play', 'Through balls'])
  },

  {
    concept_name: 'Through Balls and Penetration',
    category: 'Passing',
    importance: 9,
    description: 'Passes splitting defense for runner to exploit.',
    detailed_explanation: 'Penetrating pass between/over defensive line for teammate running behind. Most dangerous passes. Require perfect timing and vision. Break defensive lines instantly.',
    principles: JSON.stringify(['Split defensive line', 'Runner times run', 'Perfect weight required', 'Beat offside trap', 'Instant penetration']),
    how_to_implement: 'Train timing between passer and runner. Weight of pass critical. Runner must time run to beat offside.',
    required_player_attributes: JSON.stringify(['Vision', 'Passing accuracy', 'Timing', 'Through ball technique', 'Anticipation']),
    suitable_formations: JSON.stringify(['All attacking formations', 'Especially space behind']),
    real_world_examples: JSON.stringify(['De Bruyne through balls', 'Ozil vision', 'Fabregas', 'Classic playmakers']),
    famous_implementations: JSON.stringify(['Playmaker systems', 'Counter-attacking', 'Fast attacks']),
    related_concepts: JSON.stringify(['Vertical passing', 'Line-breaking', 'Vision']),
    opposing_concepts: JSON.stringify(['Safe passing', 'Possession retention'])
  },

  {
    concept_name: 'Pressing Triggers',
    category: 'Defensive',
    importance: 8,
    description: 'Specific situations that trigger team pressing. Coordinated press activation.',
    detailed_explanation: 'Pre-determined situations that activate team press. Examples: back-pass to GK, poor first touch, pass to weak player, ball to touchline. Everyone recognizes trigger and presses.',
    principles: JSON.stringify(['Pre-determined situations', 'Everyone recognizes', 'Coordinated press activation', 'Common triggers identified', 'Automatic response']),
    how_to_implement: 'Define specific triggers (back-pass, poor touch, etc). Train team to recognize and respond. Automatic coordinated press.',
    required_player_attributes: JSON.stringify(['Recognition', 'Coordination', 'Intensity', 'Discipline', 'Teamwork']),
    suitable_formations: JSON.stringify(['All pressing systems', '4-3-3', '4-2-3-1', 'High press']),
    real_world_examples: JSON.stringify(['Klopp pressing triggers', 'Bielsa Leeds', 'RB Leipzig', 'Modern pressing teams']),
    famous_implementations: JSON.stringify(['Klopp philosophy', 'Bielsa system', 'Rangnick school']),
    related_concepts: JSON.stringify(['Gegenpressing', 'High press', 'Coordination']),
    opposing_concepts: JSON.stringify(['Passive defending', 'Low block'])
  },

  {
    concept_name: 'Channel Play',
    category: 'Attacking',
    importance: 7,
    description: 'Attacking down specific channels (wide corridors) of pitch.',
    detailed_explanation: 'Using wide channels between fullback and winger. Creating 2v1 situations in channels. Overload specific channel repeatedly. Can isolate weak defender.',
    principles: JSON.stringify(['Focus on specific channel', 'Create 2v1 or 3v2', 'Isolate weak defender', 'Repeated attacks', 'Exploit space']),
    how_to_implement: 'Identify weak defender. Overload that channel with winger + fullback + midfielder. Attack repeatedly.',
    required_player_attributes: JSON.stringify(['Dribbling', 'Combinations', 'Width', 'Pace', 'Crossing']),
    suitable_formations: JSON.stringify(['All formations', 'Wide attacking systems']),
    real_world_examples: JSON.stringify(['Target weak fullback', 'Overload channel', 'Traditional wing play', 'Modern overlaps']),
    famous_implementations: JSON.stringify(['Traditional tactics', 'Exploiting weakness', 'Wing play']),
    related_concepts: JSON.stringify(['Width', 'Overloads', 'Isolations']),
    opposing_concepts: JSON.stringify(['Central focus', 'Balanced attack'])
  },

  {
    concept_name: 'Defensive Line Height',
    category: 'Defensive',
    importance: 9,
    description: 'How high or low defensive line is positioned.',
    detailed_explanation: 'Critical tactical decision. High line: compress space, risk balls behind. Low line: safety, give space. Determines entire defensive approach. Modern trend toward higher lines.',
    principles: JSON.stringify(['High line: risk/compression', 'Low line: safety/space', 'Determines approach', 'Coordinate with midfield', 'Entire team affected']),
    how_to_implement: 'Coach decides philosophy. High line requires pace and organization. Low line requires discipline. Entire team must coordinate.',
    required_player_attributes: JSON.stringify(['Pace (high line)', 'Positioning', 'Coordination', 'Recovery', 'Discipline']),
    suitable_formations: JSON.stringify(['All formations', 'Line height varies by philosophy']),
    real_world_examples: JSON.stringify(['Postecoglou ultra-high line', 'Mourinho low block', 'Guardiola high line', 'Varies by approach']),
    famous_implementations: JSON.stringify(['Postecoglou Spurs highest', 'Mourinho lowest', 'Philosophy dependent']),
    related_concepts: JSON.stringify(['Offside trap', 'Compactness', 'Pressing']),
    opposing_concepts: JSON.stringify(['High vs Low mutually exclusive'])
  },

  {
    concept_name: 'Dynamic Rotations',
    category: 'Movement',
    importance: 8,
    description: 'Players rotating positions during play. Fluid positional changes.',
    detailed_explanation: 'Players swap positions during play. Winger moves inside, fullback overlaps. Midfielder drops, forward comes short. Creates confusion, space, mismatches. Requires understanding.',
    principles: JSON.stringify(['Fluid position swaps', 'Create confusion', 'Exploit mismatches', 'Requires coordination', 'Pre-planned or spontaneous']),
    how_to_implement: 'Practice specific rotations. Common: winger inside + FB overlap, or ST drops + CM advances. Timing and communication key.',
    required_player_attributes: JSON.stringify(['Intelligence', 'Versatility', 'Communication', 'Spatial awareness', 'Tactical flexibility']),
    suitable_formations: JSON.stringify(['Fluid systems', '4-3-3', 'Total Football', 'Modern systems']),
    real_world_examples: JSON.stringify(['Man City rotations', 'Ajax Total Football', 'Liverpool front 3 rotations', 'Modern fluidity']),
    famous_implementations: JSON.stringify(['Guardiola systems', 'Ajax Cruyff', 'Total Football']),
    related_concepts: JSON.stringify(['Fluidity', 'Positional flexibility', 'Tactical understanding']),
    opposing_concepts: JSON.stringify(['Fixed positions', 'Rigid systems'])
  },

  {
    concept_name: 'Set-Piece Routines',
    category: 'Set-Pieces',
    importance: 9,
    description: 'Practiced patterns for corners, free-kicks, throw-ins.',
    detailed_explanation: '25-35% of goals from set-pieces. Must be practiced extensively. Variety of routines for different situations. Can be difference between success and failure. Often overlooked.',
    principles: JSON.stringify(['Practice extensively', 'Multiple variations', 'Exploit patterns', 'Target weak defenders', 'Crucial goal source']),
    how_to_implement: 'Dedicate training time. Develop multiple routines. Practice delivery and movement. Assign roles clearly.',
    required_player_attributes: JSON.stringify(['Delivery quality', 'Aerial ability', 'Movement', 'Timing', 'Coordination']),
    suitable_formations: JSON.stringify(['All teams', 'Universal requirement']),
    real_world_examples: JSON.stringify(['Arsenal 2024 corners deadly', 'Stoke traditional', 'Set-piece specialists', 'Modern focus increasing']),
    famous_implementations: JSON.stringify(['Arsenal Arteta era', 'Pulis teams', 'Modern coaching focus']),
    related_concepts: JSON.stringify(['Aerial threat', 'Routines', 'Practice']),
    opposing_concepts: JSON.stringify(['Open play only focus'])
  },

  {
    concept_name: 'Defensive Cover and Balance',
    category: 'Defensive',
    importance: 8,
    description: 'Maintaining defensive equilibrium. Cover behind teammates.',
    detailed_explanation: 'Always maintain defensive balance. When one player presses, another covers behind. Never leave gaps. If player beaten, teammate covers. Fundamental defensive principle.',
    principles: JSON.stringify(['Always cover behind', 'Maintain balance', 'No gaps exposed', 'Teammate coverage', 'Defensive insurance']),
    how_to_implement: 'Train understanding. When pressing, someone covers. When one beaten, next defender steps. Always balance.',
    required_player_attributes: JSON.stringify(['Positioning', 'Awareness', 'Communication', 'Teamwork', 'Discipline']),
    suitable_formations: JSON.stringify(['All formations', 'Universal defensive principle']),
    real_world_examples: JSON.stringify(['All good defenses', 'Liverpool defensive unit', 'Well-organized teams', 'Fundamental principle']),
    famous_implementations: JSON.stringify(['Universal principle', 'All top defenses', 'Coaching fundamental']),
    related_concepts: JSON.stringify(['Rest defense', 'Compactness', 'Organization']),
    opposing_concepts: JSON.stringify(['Individual defending', 'No support'])
  },

  {
    concept_name: 'Vertical Compactness',
    category: 'Defensive',
    importance: 8,
    description: 'Short distance between defensive line and forwards. Team compressed vertically.',
    detailed_explanation: 'Distance from defensive line to forwards minimized (35-40m max). Team compressed vertically. Reduces space between lines. Harder for opponent to penetrate. Modern pressing requirement.',
    principles: JSON.stringify(['Short vertical distance', '35-40m max', 'Team compressed', 'Reduce between-line space', 'Enable pressing']),
    how_to_implement: 'Defensive line pushes up. Forwards stay relatively deeper when defending. Team moves as unit. Maintain short distances.',
    required_player_attributes: JSON.stringify(['Coordination', 'Fitness', 'Positioning', 'Teamwork', 'Discipline']),
    suitable_formations: JSON.stringify(['All modern systems', 'Pressing systems essential']),
    real_world_examples: JSON.stringify(['Klopp teams', 'Guardiola systems', 'Modern pressing teams', 'High-intensity football']),
    famous_implementations: JSON.stringify(['Liverpool Klopp', 'Modern pressing football', 'High-intensity systems']),
    related_concepts: JSON.stringify(['Compactness', 'High line', 'Pressing']),
    opposing_concepts: JSON.stringify(['Stretched team', 'Deep block with high forwards'])
  }
];

console.log(`Toplam ${concepts.length} ek taktik kavram ekleniyor...\n`);

let completed = 0;
const stmt = db.prepare(`INSERT INTO tactical_concepts (
  concept_name, category, importance, description, detailed_explanation,
  principles, how_to_implement, required_player_attributes, suitable_formations,
  real_world_examples, famous_implementations, related_concepts, opposing_concepts
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

concepts.forEach((concept, i) => {
  stmt.run(
    concept.concept_name,
    concept.category,
    concept.importance,
    concept.description,
    concept.detailed_explanation,
    concept.principles,
    concept.how_to_implement,
    concept.required_player_attributes,
    concept.suitable_formations,
    concept.real_world_examples,
    concept.famous_implementations,
    concept.related_concepts,
    concept.opposing_concepts,
    (err) => {
      if (err) {
        console.log(`❌ ${concept.concept_name} - Error: ${err.message}`);
      } else {
        completed++;
        console.log(`✅ ${completed}/${concepts.length}: ${concept.concept_name}`);
      }
    }
  );
});

stmt.finalize(() => {
  console.log(`\n🎯 ${completed}/${concepts.length} ek taktik kavram başarıyla eklendi!`);
  console.log(`📊 Toplam tactical_concepts: ${11 + completed}`);
  db.close();
});
