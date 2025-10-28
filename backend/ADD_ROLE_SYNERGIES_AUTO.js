const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🤝 ROLE SYNERGIES OTOMATIK OLUŞTURULUYOR...\n');

// Get all roles first
db.all('SELECT id, role_name, position FROM player_roles ORDER BY position, role_name', (err, roles) => {
  if (err) {
    console.log('❌ Error:', err.message);
    db.close();
    return;
  }

  console.log(`📊 ${roles.length} rol bulundu, sinerjiler oluşturuluyor...\n`);

  // Define powerful synergies manually for quality
  const synergies = [];

  // Helper function to find role by name
  const findRole = (name) => roles.find(r => r.role_name.toLowerCase().includes(name.toLowerCase()));

  // SYNERGY 1: Inverted Full-Back + Inside Forward
  const invertedFB = findRole('Inverted Full-Back');
  const insideForward = findRole('Inside Forward');
  if (invertedFB && insideForward) {
    synergies.push({
      role_1_id: invertedFB.id,
      role_2_id: insideForward.id,
      synergy_type: 'Spatial Complementarity',
      synergy_score: 10,
      tactical_compatibility: 'Perfect complement. FB moves inside, winger stays wide then cuts in.',
      spatial_compatibility: 'Winger occupies wide space FB vacates. No overlap, perfect spacing.',
      functional_compatibility: 'FB creates in midfield, winger attacks space. Complementary roles.',
      combined_strengths: JSON.stringify(['Midfield overload', 'Width maintained', 'Central creation', 'Wide threat']),
      combined_weaknesses: JSON.stringify(['Requires discipline', 'Transition vulnerability']),
      synergy_description: 'Arsenal 2024 masterclass. Zinchenko inverts, Martinelli/Saka wide then cut inside. Perfect synergy.',
      ideal_positioning: 'FB central when possession, winger wide. Winger cuts inside when FB returns wide.',
      movement_coordination: 'Constant communication. FB inverts = winger wide. FB wide = winger inside.',
      passing_relationships: 'FB to winger switches. Winger to FB short combinations.',
      famous_partnerships: JSON.stringify(['Zinchenko + Martinelli Arsenal', 'Cancelo + Sterling City'])
    });
  }

  // SYNERGY 2: Regista + Box-to-Box
  const regista = findRole('Regista');
  const boxToBox = findRole('Box-to-Box');
  if (regista && boxToBox) {
    synergies.push({
      role_1_id: regista.id,
      role_2_id: boxToBox.id,
      synergy_type: 'Functional Complementarity',
      synergy_score: 9,
      tactical_compatibility: 'Perfect midfield partnership. Deep playmaker + complete midfielder.',
      spatial_compatibility: 'Regista deep, B2B roams. Cover each other perfectly.',
      functional_compatibility: 'Regista creates, B2B runs and defends. Ideal combination.',
      combined_strengths: JSON.stringify(['Deep creation', 'Box-to-box coverage', 'Passing quality', 'Goals from midfield']),
      combined_weaknesses: JSON.stringify(['Pace can be issue', 'Defensive vulnerability sometimes']),
      synergy_description: 'Classic midfield partnership. Pirlo + Vidal, Jorginho + Kante type.',
      ideal_positioning: 'Regista sits deep, B2B free to roam. Vertical partnership.',
      movement_coordination: 'B2B covers for Regista defensively. Regista feeds B2B runs.',
      passing_relationships: 'Regista to B2B constant. Quick give-and-go combinations.',
      famous_partnerships: JSON.stringify(['Pirlo + Vidal Juventus', 'Jorginho + Kante Chelsea', 'Modric + Kroos Madrid'])
    });
  }

  // SYNERGY 3: False 9 + Inside Forwards
  const false9 = findRole('False 9');
  if (false9 && insideForward) {
    synergies.push({
      role_1_id: false9.id,
      role_2_id: insideForward.id,
      synergy_type: 'Spatial Exploitation',
      synergy_score: 10,
      tactical_compatibility: 'Revolutionary combination. False 9 drops, inside forwards run behind.',
      spatial_compatibility: 'False 9 creates space, inside forwards exploit it. Perfect.',
      functional_compatibility: 'F9 playmaker, IFs goalscorers. Roles complement perfectly.',
      combined_strengths: JSON.stringify(['Space creation', 'Goal threat', 'CB confusion', 'Overload attack']),
      combined_weaknesses: JSON.stringify(['No physical presence', 'Requires elite players']),
      synergy_description: 'Barcelona 2010-2015 Messi false 9 with Villa/Pedro. Historic synergy.',
      ideal_positioning: 'F9 drops to midfield, IFs run channels behind. Constant movement.',
      movement_coordination: 'When F9 drops, IFs must attack space. Timing critical.',
      passing_relationships: 'F9 to IFs through balls. IFs lay off to F9.',
      famous_partnerships: JSON.stringify(['Messi + Villa + Pedro Barcelona', 'Firmino + Salah + Mane Liverpool'])
    });
  }

  // SYNERGY 4: Ball-Playing Defender + Anchor Man
  const bpd = findRole('Ball-Playing Defender');
  const anchorMan = findRole('Anchor Man');
  if (bpd && anchorMan) {
    synergies.push({
      role_1_id: bpd.id,
      role_2_id: anchorMan.id,
      synergy_type: 'Buildup Partnership',
      synergy_score: 9,
      tactical_compatibility: 'Essential modern partnership. BPD progresses, Anchor protects.',
      spatial_compatibility: 'BPD steps forward, Anchor sits deep covering. Safe progression.',
      functional_compatibility: 'BPD creativity, Anchor safety. Balanced perfectly.',
      combined_strengths: JSON.stringify(['Safe buildup', 'Passing quality', 'Defensive cover', 'Progression']),
      combined_weaknesses: JSON.stringify(['Pace lacking', 'Vulnerable to press']),
      synergy_description: 'Modern buildup foundation. Van Dijk + Fabinho, Stones + Rodri.',
      ideal_positioning: 'BPD can step up, Anchor always deep. Vertical partnership.',
      movement_coordination: 'Anchor covers when BPD advances. Communication key.',
      passing_relationships: 'Short passing combinations. Safety first.',
      famous_partnerships: JSON.stringify(['Van Dijk + Fabinho Liverpool', 'Stones + Rodri City'])
    });
  }

  // SYNERGY 5: Target Man + Advanced Forward
  const targetMan = findRole('Target Man');
  const advancedFwd = findRole('Advanced Forward');
  if (targetMan && advancedFwd) {
    synergies.push({
      role_1_id: targetMan.id,
      role_2_id: advancedFwd.id,
      synergy_type: 'Strike Partnership',
      synergy_score: 8,
      tactical_compatibility: 'Classic strike partnership. Target holds, AF runs.',
      spatial_compatibility: 'Target man high and central, AF makes runs off him.',
      functional_compatibility: 'Target man link play, AF finishing. Perfect roles.',
      combined_strengths: JSON.stringify(['Physical presence', 'Clinical finishing', 'Link play', 'Aerial threat']),
      combined_weaknesses: JSON.stringify(['Can be static', 'Pressing limited']),
      synergy_description: 'Traditional partnership. Drogba + Anelka, Kane + Son type.',
      ideal_positioning: 'Target man central, AF off shoulder. Close proximity.',
      movement_coordination: 'AF times runs when TM holds. Flick-ons critical.',
      passing_relationships: 'TM to AF flicks and layoffs. Simple but effective.',
      famous_partnerships: JSON.stringify(['Drogba + Anelka Chelsea', 'Kane + Son Spurs', 'Dzeko + Aguero City'])
    });
  }

  // Continue with more synergies programmatically
  // Generate synergies for common role combinations

  // Defenders with Midfielders (10 more)
  const defenders = roles.filter(r => r.position === 'DF');
  const midfielders = roles.filter(r => r.position === 'MF');

  defenders.slice(0, 3).forEach(def => {
    midfielders.slice(0, 3).forEach(mid => {
      if (synergies.find(s => (s.role_1_id === def.id && s.role_2_id === mid.id) ||
                               (s.role_1_id === mid.id && s.role_2_id === def.id))) {
        return; // Skip if already added
      }
      synergies.push({
        role_1_id: def.id,
        role_2_id: mid.id,
        synergy_type: 'Defensive-Midfield Link',
        synergy_score: 7,
        tactical_compatibility: `${def.role_name} and ${mid.role_name} provide defensive stability and buildup.`,
        spatial_compatibility: 'Defender deep, midfielder ahead. Vertical link.',
        functional_compatibility: 'Defender builds, midfielder distributes or defends.',
        combined_strengths: JSON.stringify(['Defensive solidity', 'Buildup', 'Coverage']),
        combined_weaknesses: JSON.stringify(['Attacking contribution limited']),
        synergy_description: `Standard partnership between ${def.role_name} and ${mid.role_name}.`,
        ideal_positioning: 'Defender behind midfielder. Short passing distance.',
        movement_coordination: 'Defender passes to midfielder. Midfielder covers.',
        passing_relationships: 'Short buildup passes.',
        famous_partnerships: JSON.stringify(['Common partnership', 'Standard combination'])
      });
    });
  });

  // Midfielders with Forwards (15 more)
  const forwards = roles.filter(r => r.position === 'FW');

  midfielders.slice(0, 5).forEach(mid => {
    forwards.slice(0, 3).forEach(fwd => {
      if (synergies.find(s => (s.role_1_id === mid.id && s.role_2_id === fwd.id) ||
                               (s.role_1_id === fwd.id && s.role_2_id === mid.id))) {
        return;
      }
      synergies.push({
        role_1_id: mid.id,
        role_2_id: fwd.id,
        synergy_type: 'Creative-Goalscoring Link',
        synergy_score: 8,
        tactical_compatibility: `${mid.role_name} creates for ${fwd.role_name}.`,
        spatial_compatibility: 'Midfielder feeds forward. Close connection.',
        functional_compatibility: 'Midfielder creates chances, forward scores.',
        combined_strengths: JSON.stringify(['Creativity', 'Goals', 'Combination play']),
        combined_weaknesses: JSON.stringify(['Defensive work limited']),
        synergy_description: `${mid.role_name} feeding ${fwd.role_name}. Classic attacking partnership.`,
        ideal_positioning: 'Midfielder behind forward. Passing lanes open.',
        movement_coordination: 'Midfielder passes, forward runs. Timing key.',
        passing_relationships: 'Through balls, combinations, flicks.',
        famous_partnerships: JSON.stringify(['Creative to goalscorer', 'Standard link'])
      });
    });
  });

  // Same position synergies (10 more)
  // CB partnerships
  const cbs = roles.filter(r => r.role_name.includes('Defender') || r.role_name.includes('Centre-Back'));
  if (cbs.length >= 2) {
    for (let i = 0; i < Math.min(cbs.length - 1, 3); i++) {
      synergies.push({
        role_1_id: cbs[i].id,
        role_2_id: cbs[i + 1].id,
        synergy_type: 'CB Partnership',
        synergy_score: 9,
        tactical_compatibility: `${cbs[i].role_name} and ${cbs[i+1].role_name} form solid CB partnership.`,
        spatial_compatibility: 'Side by side central defense.',
        functional_compatibility: 'Complementary defending styles.',
        combined_strengths: JSON.stringify(['Defensive solidity', 'Communication', 'Coverage']),
        combined_weaknesses: JSON.stringify(['Pace can be issue']),
        synergy_description: 'Classic CB partnership. Communication and understanding key.',
        ideal_positioning: 'Side by side 5-10m apart.',
        movement_coordination: 'Cover each other. One steps, other covers.',
        passing_relationships: 'Short passes, buildup together.',
        famous_partnerships: JSON.stringify(['Van Dijk + Matip', 'Ramos + Varane', 'Terry + Carvalho'])
      });
    }
  }

  console.log(`💡 ${synergies.length} sinerji oluşturuldu, ekleniyor...\n`);

  let completed = 0;
  const stmt = db.prepare(`INSERT INTO role_synergies (
    role_1_id, role_2_id, synergy_type, synergy_score,
    tactical_compatibility, spatial_compatibility, functional_compatibility,
    combined_strengths, combined_weaknesses, synergy_description,
    ideal_positioning, movement_coordination, passing_relationships, famous_partnerships
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  synergies.forEach((s, i) => {
    stmt.run(
      s.role_1_id, s.role_2_id, s.synergy_type, s.synergy_score,
      s.tactical_compatibility, s.spatial_compatibility, s.functional_compatibility,
      s.combined_strengths, s.combined_weaknesses, s.synergy_description,
      s.ideal_positioning, s.movement_coordination, s.passing_relationships, s.famous_partnerships,
      (err) => {
        if (err) {
          console.log(`❌ Error adding synergy: ${err.message}`);
        } else {
          completed++;
          if (completed % 10 === 0) {
            console.log(`✅ ${completed}/${synergies.length} sinerjiler eklendi...`);
          }
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 ${completed}/${synergies.length} rol sinerjisi başarıyla eklendi!`);
    db.close();
  });
});
