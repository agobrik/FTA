const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🛡️  59 SİSTEM İÇİN ZAYIFLIKLAR OLUŞTURULUYOR...\n');

// Get all systems
db.all('SELECT id, name, formation, style, defensive_line_height, pressing_intensity FROM tactical_systems', (err, systems) => {
  if (err) {
    console.log('❌ Error:', err.message);
    db.close();
    return;
  }

  console.log(`📊 ${systems.length} sistem bulundu, zayıflıklar ekleniyor...\n`);

  const weaknesses = [];

  systems.forEach(system => {
    // Generate 2-3 weaknesses per system based on characteristics
    const systemWeaknesses = [];

    // Weakness 1: Based on defensive line height
    if (system.defensive_line_height >= 8) {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Balls In Behind',
        weakness_description: `${system.name} uses very high defensive line. Extremely vulnerable to long balls and pace in behind.`,
        how_to_exploit: 'Play direct balls over high line. Use pacy forwards making runs in behind. Time runs to beat offside trap. Simple but devastating.',
        required_approach: JSON.stringify(['Pacy forwards essential', 'Direct passing', 'Time runs perfectly', 'Exploit transitions']),
        severity: 9,
        frequency: 9,
        examples: JSON.stringify(['Most teams exploit this', 'High success rate', 'Obvious weakness'])
      });
    }

    // Weakness 2: Based on pressing intensity
    if (system.pressing_intensity >= 8) {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Bypass High Press',
        weakness_description: `${system.name} uses intense high pressing. Can be bypassed with direct play or patient buildup through press.`,
        how_to_exploit: 'Either: (1) Long balls to target man bypassing press entirely, OR (2) Technical quality to play through press with quick combinations.',
        required_approach: JSON.stringify(['Long ball option OR technical quality', 'Patient vs press', 'Quick decision making', 'GK long distribution']),
        severity: 7,
        frequency: 7,
        examples: JSON.stringify(['Real Madrid vs high press', 'Technical teams succeed', 'Direct approach works'])
      });
    } else if (system.pressing_intensity <= 4) {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Time and Space for Opponents',
        weakness_description: `${system.name} low pressing intensity gives opponents time on ball. Quality teams exploit this.`,
        how_to_exploit: 'Patient possession buildup. Quality teams will dominate possession and create chances with time given.',
        required_approach: JSON.stringify(['Technical quality', 'Patient possession', 'Exploit time given', 'Quality passing']),
        severity: 6,
        frequency: 8,
        examples: JSON.stringify(['Top teams dominate vs low press', 'Possession teams excel', 'Quality exploitation'])
      });
    }

    // Weakness 3: Based on formation structure
    if (system.formation.includes('3-') || system.formation.includes('5-')) {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Wide Overloads',
        weakness_description: `${system.name} using ${system.formation} can be vulnerable in wide areas, especially vs quick switches and wing overloads.`,
        how_to_exploit: 'Overload wings with winger + fullback creating 2v1 vs wing-back. Quick switches to isolated areas.',
        required_approach: JSON.stringify(['Wide overloads', 'Quick switches', '2v1 situations', 'Exploit wing-backs']),
        severity: 7,
        frequency: 7,
        examples: JSON.stringify(['Man City vs wing-back systems', 'Wide overload success', 'Guardiola approach'])
      });
    }

    if (system.formation.includes('4-4-2')) {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Midfield Outnumbered',
        weakness_description: `${system.name} with 4-4-2 only has 2 central midfielders. Modern 3-man midfields dominate center.`,
        how_to_exploit: 'Use 3 central midfielders (4-3-3 or 4-2-3-1). Create numerical superiority 3v2 in midfield. Dominate possession.',
        required_approach: JSON.stringify(['3 central midfielders', 'Dominate possession', 'Control midfield', 'Patient buildup']),
        severity: 8,
        frequency: 9,
        examples: JSON.stringify(['Modern teams vs 4-4-2', 'Midfield control', 'Possession dominance'])
      });
    }

    // Weakness 4: Based on style
    if (system.style === 'possession') {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Counter-Attack Vulnerability',
        weakness_description: `${system.name} possession style commits players forward. Vulnerable to quick counters when ball lost.`,
        how_to_exploit: 'Compact defensive shape. Win ball and counter immediately with pace. Exploit space left behind.',
        required_approach: JSON.stringify(['Low block defense', 'Win ball cleanly', 'Immediate counter', 'Pace critical']),
        severity: 7,
        frequency: 8,
        examples: JSON.stringify(['Classic counter vs possession', 'Mourinho vs Guardiola', 'Effective strategy'])
      });
    } else if (system.style === 'counter-attacking' || system.style === 'defensive') {
      systemWeaknesses.push({
        system_id: system.id,
        weakness_type: 'Lack of Creativity',
        weakness_description: `${system.name} defensive/counter style can struggle to break down organized low blocks.`,
        how_to_exploit: 'Not about exploiting - this system struggles when forced to attack vs deep block. Mirror their defensive approach.',
        required_approach: JSON.stringify(['Low block forces them to attack', 'Compact shape', 'Deny counters', 'Patience']),
        severity: 6,
        frequency: 6,
        examples: JSON.stringify(['Defensive teams vs defensive teams', 'Stalemate common', 'Tactical mirrors'])
      });
    }

    // Add all weaknesses for this system
    systemWeaknesses.forEach(w => weaknesses.push(w));
  });

  console.log(`💡 ${weaknesses.length} zayıflık oluşturuldu, ekleniyor...\n`);

  let completed = 0;
  const stmt = db.prepare(`INSERT INTO system_weaknesses (
    system_id, weakness_type, weakness_description, how_to_exploit,
    required_approach, severity, frequency, examples
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

  weaknesses.forEach((w, i) => {
    stmt.run(
      w.system_id,
      w.weakness_type,
      w.weakness_description,
      w.how_to_exploit,
      w.required_approach,
      w.severity,
      w.frequency,
      w.examples,
      (err) => {
        if (err) {
          console.log(`❌ System ${w.system_id} - Error: ${err.message}`);
        } else {
          completed++;
          if (completed % 10 === 0) {
            console.log(`✅ ${completed}/${weaknesses.length} zayıflık eklendi...`);
          }
        }
      }
    );
  });

  stmt.finalize(() => {
    console.log(`\n🎯 ${completed}/${weaknesses.length} sistem zayıflığı başarıyla eklendi!`);
    console.log(`📊 Her sistem için ortalama ${(completed / systems.length).toFixed(1)} zayıflık`);
    db.close();
  });
});
