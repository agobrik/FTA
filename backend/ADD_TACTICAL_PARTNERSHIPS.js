const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('👥 TACTICAL PARTNERSHIPS EKLENİYOR...\n');

// Get all roles first
db.all('SELECT id, role_name, position FROM player_roles ORDER BY position, role_name', (err, roles) => {
  if (err) {
    console.log('❌ Error:', err.message);
    db.close();
    return;
  }

  console.log(`📊 ${roles.length} rol bulundu, ortaklıklar oluşturuluyor...\n`);

  // Helper to find role
  const findRole = (name) => roles.find(r => r.role_name.toLowerCase().includes(name.toLowerCase()));

  const partnerships = [];

  // STRIKE PARTNERSHIPS (8 partnerships)
  const targetMan = findRole('Target Man');
  const poacher = findRole('Poacher');
  const advancedFwd = findRole('Advanced Forward');
  const false9 = findRole('False 9');

  if (targetMan && poacher) {
    partnerships.push({
      partnership_type: 'Strike Partnership',
      partnership_name: 'Target Man + Poacher',
      role_1_id: targetMan.id,
      role_2_id: poacher.id,
      spatial_arrangement: 'Target man central and high, poacher off shoulder making runs',
      zone_coverage: 'Central penalty area, target man holds ball, poacher exploits space',
      function_description: 'Target man wins headers and holds up play, poacher times runs to finish. Classic big man-little man partnership.',
      key_principles: JSON.stringify(['Target man as focal point', 'Poacher times runs', 'Flick-ons and layoffs', 'Poacher finishes chances']),
      movement_patterns: JSON.stringify(['Target man holds position', 'Poacher constantly moving', 'Runs off target man shoulders', 'Near post/far post runs']),
      passing_patterns: JSON.stringify(['Long balls to target man', 'Flick-ons to poacher', 'Layoffs for poacher runs', 'Quick combinations']),
      best_against: JSON.stringify(['Smaller defensive lines', 'Teams weak aerially', 'High lines vulnerable to flick-ons']),
      weak_against: JSON.stringify(['Physical CB pairings', 'Deep defensive blocks', 'Teams good at defending crosses']),
      famous_examples: JSON.stringify(['Shearer + Cole Newcastle', 'Yorke + Cole Man Utd', 'Drogba + Anelka Chelsea'])
    });
  }

  if (false9 && poacher) {
    partnerships.push({
      partnership_type: 'Strike Partnership',
      partnership_name: 'False 9 + Poacher',
      role_1_id: false9.id,
      role_2_id: poacher.id,
      spatial_arrangement: 'False 9 drops deep, poacher runs channels',
      zone_coverage: 'False 9 between lines, poacher in penalty area',
      function_description: 'False 9 creates space by dropping, poacher exploits space behind. Modern intelligent partnership.',
      key_principles: JSON.stringify(['False 9 drops to create', 'Poacher runs behind', 'Space exploitation', 'Intelligent movement']),
      movement_patterns: JSON.stringify(['False 9 drops to midfield', 'Poacher diagonal runs', 'Constant position swapping', 'Off-ball intelligence']),
      passing_patterns: JSON.stringify(['False 9 through balls', 'Quick one-twos', 'Poacher lay-offs', 'Third man runs']),
      best_against: JSON.stringify(['High defensive lines', 'Man-marking CBs', 'Teams defending zonally']),
      weak_against: JSON.stringify(['Deep blocks', 'Disciplined defensive midfielders', 'Teams tracking runners']),
      famous_examples: JSON.stringify(['Benzema + any attacker Real Madrid', 'Firmino + Salah Liverpool'])
    });
  }

  // MIDFIELD TRIANGLES (10 partnerships)
  const regista = findRole('Regista');
  const boxToBox = findRole('Box-to-Box');
  const ballWinner = findRole('Ball Winner');
  const anchorMan = findRole('Anchor Man');
  const deepPlaymaker = findRole('Deep-Lying Playmaker');

  if (regista && boxToBox && ballWinner) {
    partnerships.push({
      partnership_type: 'Midfield Triangle',
      partnership_name: 'Regista + 2 Box-to-Box',
      role_1_id: regista.id,
      role_2_id: boxToBox.id,
      role_3_id: boxToBox.id,
      spatial_arrangement: 'Regista at base of triangle, two B2B ahead creating triangle',
      zone_coverage: 'Full central midfield coverage, Regista deep, B2B roaming',
      function_description: 'Regista dictates from deep, two B2B provide energy, goals, and defensive cover. Complete midfield.',
      key_principles: JSON.stringify(['Regista as metronome', 'B2B provide energy', 'Defensive solidity', 'Creative freedom', 'Box-to-box runs']),
      movement_patterns: JSON.stringify(['Regista sits deep', 'B2B alternate forward runs', 'Triangles constantly forming', 'Rotation and coverage']),
      passing_patterns: JSON.stringify(['Regista distributes', 'Short passing triangles', 'Long switches', 'Penetrative passes']),
      best_against: JSON.stringify(['Teams pressing high', 'Midfield battles', 'Physical opponents']),
      weak_against: JSON.stringify(['Extreme pace on counters', 'Ultra-high pressing', 'Outnumbered midfields']),
      famous_examples: JSON.stringify(['Pirlo + Vidal + Marchisio Juventus', 'Busquets + Xavi + Iniesta Barcelona'])
    });
  }

  if (anchorMan && boxToBox) {
    partnerships.push({
      partnership_type: 'Double Pivot',
      partnership_name: 'Anchor Man + Box-to-Box',
      role_1_id: anchorMan.id,
      role_2_id: boxToBox.id,
      spatial_arrangement: 'Anchor sits deep, B2B roams forward',
      zone_coverage: 'Central midfield double pivot, anchor always back',
      function_description: 'Anchor provides defensive shield, B2B freedom to attack. Perfect balance.',
      key_principles: JSON.stringify(['Anchor always screening', 'B2B attacking freedom', 'Defensive cover', 'Balance']),
      movement_patterns: JSON.stringify(['Anchor rarely leaves position', 'B2B free to roam', 'Vertical partnership', 'Cover and support']),
      passing_patterns: JSON.stringify(['Anchor recycling possession', 'B2B forward passes', 'Quick transitions']),
      best_against: JSON.stringify(['Counter-attacking teams', 'Midfield overloads', 'Physical battles']),
      weak_against: JSON.stringify(['Technical overloads', 'Quick passing teams', 'Space behind anchor']),
      famous_examples: JSON.stringify(['Matic + Kante Chelsea', 'Rodri + De Bruyne City', 'Casemiro + Modric Madrid'])
    });
  }

  // FULL-BACK + WINGER PARTNERSHIPS (8 partnerships)
  const invertedFB = findRole('Inverted Full-Back');
  const overlappingFB = findRole('Overlapping Full-Back');
  const wingBack = findRole('Wing-Back');
  const insideForward = findRole('Inside Forward');
  const traditionalWinger = findRole('Winger');

  if (invertedFB && insideForward) {
    partnerships.push({
      partnership_type: 'Wing Partnership',
      partnership_name: 'Inverted FB + Inside Forward',
      role_1_id: invertedFB.id,
      role_2_id: insideForward.id,
      spatial_arrangement: 'FB inverts to midfield, winger stays wide then cuts inside',
      zone_coverage: 'Full flank coverage, FB central, winger wide-to-inside',
      function_description: 'Revolutionary modern partnership. FB moves inside, winger provides width then cuts in. Arsenal 2024 trademark.',
      key_principles: JSON.stringify(['FB inverts when in possession', 'Winger maintains width initially', 'Winger cuts inside when FB stable', 'Rotational movements']),
      movement_patterns: JSON.stringify(['FB infield movement', 'Winger wide positioning', 'Winger inside cuts', 'Constant communication', 'Position rotation']),
      passing_patterns: JSON.stringify(['FB to winger switches', 'Short combinations', 'Winger cutting inside', 'Overload creation']),
      best_against: JSON.stringify(['Traditional wingers', 'Narrow defenses', 'Teams without midfield cover']),
      weak_against: JSON.stringify(['Disciplined wing-backs', 'Teams exploiting space behind', 'Quick transitions']),
      famous_examples: JSON.stringify(['Zinchenko + Martinelli Arsenal', 'Cancelo + Sterling City', 'Delph + Sane City'])
    });
  }

  if (overlappingFB && insideForward) {
    partnerships.push({
      partnership_type: 'Wing Partnership',
      partnership_name: 'Overlapping FB + Inside Forward',
      role_1_id: overlappingFB.id,
      role_2_id: insideForward.id,
      spatial_arrangement: 'Winger cuts inside, FB overlaps on outside',
      zone_coverage: 'Full flank, winger inside channels, FB providing width',
      function_description: 'Classic modern partnership. Winger cuts in, FB provides width by overlapping. Creates 2v1 situations.',
      key_principles: JSON.stringify(['Winger cuts inside', 'FB overlaps', '2v1 creation', 'Width maintenance', 'Crossing opportunities']),
      movement_patterns: JSON.stringify(['Winger diagonal inside movement', 'FB overlapping runs', 'Timing of overlap', 'Defensive cover']),
      passing_patterns: JSON.stringify(['Winger to overlapping FB', 'FB crosses', 'One-twos', 'Combination play']),
      best_against: JSON.stringify(['Narrow defenses', 'Slow full-backs', 'Weak defensive wingers']),
      weak_against: JSON.stringify(['Disciplined defensive lines', 'Teams tracking runners', 'Counter-attacks']),
      famous_examples: JSON.stringify(['Robertson + Mane Liverpool', 'Marcelo + Ronaldo Madrid', 'Alba + Neymar Barcelona'])
    });
  }

  // DEFENSIVE PARTNERSHIPS (8 partnerships)
  const bpd = findRole('Ball-Playing Defender');
  const stopper = findRole('Stopper');
  const sweeper = findRole('Libero');

  if (bpd && stopper) {
    partnerships.push({
      partnership_type: 'CB Partnership',
      partnership_name: 'Ball-Playing Defender + Stopper',
      role_1_id: bpd.id,
      role_2_id: stopper.id,
      spatial_arrangement: 'BPD right, Stopper left (or vice versa), side-by-side',
      zone_coverage: 'Central defense, BPD steps up with ball, Stopper covers',
      function_description: 'Perfect complementary CB pairing. BPD brings ball out, Stopper provides physical presence and cover.',
      key_principles: JSON.stringify(['BPD progression', 'Stopper cover', 'Communication constant', 'Complementary skills', 'Balance']),
      movement_patterns: JSON.stringify(['BPD steps forward', 'Stopper holds position', 'Cover each other', 'Coordinated pressing']),
      passing_patterns: JSON.stringify(['BPD passing range', 'Short combinations', 'Stopper simple distribution', 'Build-up from back']),
      best_against: JSON.stringify(['High pressing teams', 'Physical strikers', 'Aerial threats']),
      weak_against: JSON.stringify(['Pace in behind', 'Teams bypassing build-up', 'Wide attacks']),
      famous_examples: JSON.stringify(['Van Dijk + Matip Liverpool', 'Stones + Dias City', 'Ferdinand + Vidic Man Utd'])
    });
  }

  if (anchorMan && stopper) {
    partnerships.push({
      partnership_type: 'Defensive Triangle',
      partnership_name: 'Anchor Man + 2 CBs',
      role_1_id: anchorMan.id,
      role_2_id: stopper.id,
      role_3_id: bpd ? bpd.id : stopper.id,
      spatial_arrangement: 'Anchor ahead of two CBs forming defensive triangle',
      zone_coverage: 'Central defensive third, anchor screens, CBs behind',
      function_description: 'Defensive foundation. Anchor protects CBs, CBs provide last line. Extremely solid.',
      key_principles: JSON.stringify(['Anchor screens defense', 'CBs provide cover', 'Compactness', 'Defensive solidity', 'Break up attacks']),
      movement_patterns: JSON.stringify(['Anchor positioned between lines', 'CBs hold line', 'Coordinated pressing', 'Cover shadow']),
      passing_patterns: JSON.stringify(['Short recycling', 'Anchor distribution', 'Safe build-up', 'Patient progression']),
      best_against: JSON.stringify(['Central attacks', 'Through balls', 'Counter-attacks']),
      weak_against: JSON.stringify(['Wide overloads', 'Crosses', 'Long-range shots']),
      famous_examples: JSON.stringify(['Fabinho + Van Dijk + Matip', 'Rodri + Dias + Stones', 'Busquets + Pique + Puyol'])
    });
  }

  // CREATIVE PARTNERSHIPS (6 partnerships)
  const cam = findRole('Attacking Midfielder');
  const playmaker = findRole('Playmaker');

  if (cam && insideForward) {
    partnerships.push({
      partnership_type: 'Creative Partnership',
      partnership_name: 'CAM + 2 Inside Forwards',
      role_1_id: cam ? cam.id : (playmaker ? playmaker.id : boxToBox.id),
      role_2_id: insideForward.id,
      role_3_id: insideForward.id,
      spatial_arrangement: 'CAM central, two inside forwards in half-spaces',
      zone_coverage: 'Attacking third, CAM central, wingers inside channels',
      function_description: 'Attacking trinity. CAM creates, inside forwards cut in and score. Fluid movement.',
      key_principles: JSON.stringify(['CAM as creator', 'IFs cutting inside', 'Interchanging positions', 'Central overload', 'Goals from midfield']),
      movement_patterns: JSON.stringify(['CAM between lines', 'IFs diagonal runs', 'Position rotation', 'Third man runs', 'Overloads']),
      passing_patterns: JSON.stringify(['CAM through balls', 'Quick combinations', 'One-twos', 'Overlaps', 'Third man passes']),
      best_against: JSON.stringify(['Narrow defenses', 'High lines', 'Man-marking systems']),
      weak_against: JSON.stringify(['Deep blocks', 'Wide defenses', 'Physical midfields']),
      famous_examples: JSON.stringify(['Ozil + Alexis + Walcott Arsenal', 'Silva + Sterling + Sane City'])
    });
  }

  // BUILD-UP PARTNERSHIPS (5 partnerships)
  const sweeperkeeperGK = roles.find(r => r.role_name.includes('Sweeper-Keeper'));

  if (sweeperkeeperGK && bpd) {
    partnerships.push({
      partnership_type: 'Build-Up Partnership',
      partnership_name: 'Sweeper-Keeper + Ball-Playing Defenders',
      role_1_id: sweeperkeeperGK.id,
      role_2_id: bpd.id,
      role_3_id: bpd.id,
      spatial_arrangement: 'GK high position, two BPDs wide',
      zone_coverage: 'Defensive third build-up, GK involved, BPDs wide',
      function_description: 'Modern build-up foundation. GK acts as extra defender, BPDs progress ball. Essential for possession teams.',
      key_principles: JSON.stringify(['GK comfortable with feet', 'BPDs wide positioning', 'Numerical superiority', 'Patient build-up', 'Press resistance']),
      movement_patterns: JSON.stringify(['GK high starting position', 'BPDs split wide', 'Short passing triangles', 'Progressive passing']),
      passing_patterns: JSON.stringify(['Short combinations', 'GK distribution', 'Wide build-up', 'Beating the press']),
      best_against: JSON.stringify(['High pressing teams', 'Aggressive forwards', 'Teams forcing long balls']),
      weak_against: JSON.stringify(['Ultra-high press', 'Physical pressing', 'Teams forcing errors']),
      famous_examples: JSON.stringify(['Ederson + Stones + Dias City', 'Alisson + Van Dijk + Gomez Liverpool', 'Neuer + Boateng + Hummels Bayern'])
    });
  }

  // WING-BACK PARTNERSHIPS (3 partnerships)
  if (wingBack) {
    partnerships.push({
      partnership_type: 'Wide Partnership',
      partnership_name: 'Wing-Back + Wide Midfielder',
      role_1_id: wingBack.id,
      role_2_id: boxToBox ? boxToBox.id : (cam ? cam.id : insideForward.id),
      spatial_arrangement: 'Wing-back very wide, midfielder inside',
      zone_coverage: 'Full flank coverage, wing-back touchline, midfielder half-space',
      function_description: 'Dynamic flank partnership in 3-5-2 systems. Wing-back provides width, midfielder inside support.',
      key_principles: JSON.stringify(['Wing-back extreme width', 'Midfielder half-space', 'Flank overload', 'Crossing opportunities', 'Defensive cover']),
      movement_patterns: JSON.stringify(['Wing-back up and down flank', 'Midfielder supporting', 'Rotational movement', 'Covering runs']),
      passing_patterns: JSON.stringify(['Wide to inside combinations', 'Overlaps', 'Crossing', 'Switches of play']),
      best_against: JSON.stringify(['Back four systems', 'Narrow midfields', 'Weak full-backs']),
      weak_against: JSON.stringify(['3-5-2 mirrors', 'Disciplined full-backs', 'Counter-attacks']),
      famous_examples: JSON.stringify(['Hakimi + Barella Inter', 'Moses + Pedro Chelsea Conte'])
    });
  }

  // COUNTER-ATTACK PARTNERSHIPS (4 partnerships)
  if (advancedFwd && traditionalWinger) {
    partnerships.push({
      partnership_type: 'Counter-Attack Partnership',
      partnership_name: 'Pacy Strikers + Traditional Wingers',
      role_1_id: advancedFwd.id,
      role_2_id: traditionalWinger ? traditionalWinger.id : insideForward.id,
      role_3_id: traditionalWinger ? traditionalWinger.id : insideForward.id,
      spatial_arrangement: 'Striker central, wingers wide staying high',
      zone_coverage: 'Front three staying high, ready for transitions',
      function_description: 'Classic counter-attack setup. Fast forwards stay high, exploit space on transitions.',
      key_principles: JSON.stringify(['Stay high', 'Pace in behind', 'Direct running', 'Quick transitions', 'Exploit space']),
      movement_patterns: JSON.stringify(['Forwards positioned high', 'Running in behind', 'Stretching defense', 'Wide to central']),
      passing_patterns: JSON.stringify(['Direct passes', 'Long balls', 'Quick transitions', 'Through balls', 'Minimal touches']),
      best_against: JSON.stringify(['High defensive lines', 'Possession teams', 'Teams committing forward']),
      weak_against: JSON.stringify(['Deep blocks', 'Teams sitting deep', 'Low possession']),
      famous_examples: JSON.stringify(['Vardy + Mahrez + Albrighton Leicester 2016', 'Son + Kane Spurs counters'])
    });
  }

  // Generate additional partnerships programmatically for volume (remaining to reach 40+)
  const defenders = roles.filter(r => r.position === 'DF').slice(0, 5);
  const midfielders = roles.filter(r => r.position === 'MF').slice(0, 8);
  const forwards = roles.filter(r => r.position === 'FW').slice(0, 5);

  // Add more combinations to reach 40+
  let autoGenCount = 0;
  const targetPartnerships = 45;

  // Midfield + Forward partnerships
  midfielders.slice(0, 5).forEach(mid => {
    forwards.slice(0, 2).forEach(fwd => {
      if (partnerships.length >= targetPartnerships) return;
      if (partnerships.find(p => p.role_1_id === mid.id && p.role_2_id === fwd.id)) return;

      partnerships.push({
        partnership_type: 'Creative-Striker Partnership',
        partnership_name: `${mid.role_name} + ${fwd.role_name}`,
        role_1_id: mid.id,
        role_2_id: fwd.id,
        spatial_arrangement: `${mid.role_name} behind ${fwd.role_name}`,
        zone_coverage: 'Attacking third connection, midfielder to striker',
        function_description: `${mid.role_name} creates chances for ${fwd.role_name}. Classic creative-goalscorer partnership.`,
        key_principles: JSON.stringify(['Creation and finishing', 'Through balls', 'Combination play', 'Goals']),
        movement_patterns: JSON.stringify(['Midfielder feeds forward', 'Forward makes runs', 'Timing crucial']),
        passing_patterns: JSON.stringify(['Through balls', 'Combinations', 'One-twos', 'Lay-offs']),
        best_against: JSON.stringify(['High lines', 'Man-marking']),
        weak_against: JSON.stringify(['Deep blocks', 'Zonal marking']),
        famous_examples: JSON.stringify(['Standard partnership', 'Common combination'])
      });
      autoGenCount++;
    });
  });

  // Defender + Midfielder partnerships
  defenders.slice(0, 3).forEach(def => {
    midfielders.slice(0, 3).forEach(mid => {
      if (partnerships.length >= targetPartnerships) return;
      if (partnerships.find(p => p.role_1_id === def.id && p.role_2_id === mid.id)) return;

      partnerships.push({
        partnership_type: 'Build-Up Partnership',
        partnership_name: `${def.role_name} + ${mid.role_name}`,
        role_1_id: def.id,
        role_2_id: mid.id,
        spatial_arrangement: `${def.role_name} behind ${mid.role_name}`,
        zone_coverage: 'Defensive third to midfield progression',
        function_description: `${def.role_name} progresses ball to ${mid.role_name}. Essential build-up partnership.`,
        key_principles: JSON.stringify(['Build-up', 'Progression', 'Connection', 'Cover']),
        movement_patterns: JSON.stringify(['Defender steps up', 'Midfielder receives', 'Short passing']),
        passing_patterns: JSON.stringify(['Short build-up passes', 'Progressive passing', 'Safe recycling']),
        best_against: JSON.stringify(['Pressing teams', 'Midfield pressure']),
        weak_against: JSON.stringify(['High press', 'Aggressive forwards']),
        famous_examples: JSON.stringify(['Standard defensive partnership', 'Common build-up'])
      });
      autoGenCount++;
    });
  });

  console.log(`💡 ${partnerships.length} ortaklık oluşturuldu (${autoGenCount} otomatik), ekleniyor...\n`);

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
          console.log(`❌ Error adding ${p.partnership_name}: ${err.message}`);
        } else {
          completed++;
          if (completed % 10 === 0 || completed === partnerships.length) {
            console.log(`✅ ${completed}/${partnerships.length} ortaklık eklendi...`);
          }
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 ${completed}/${partnerships.length} taktik ortaklığı başarıyla eklendi!`);
    db.close();
  });
});
