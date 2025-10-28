const ultraDb = require('./ultra_database');

console.log('🔍 VERİTABANI TAMLIGI KONTROLÜ\n');
console.log('=' .repeat(60));

// Tactical Systems kontrolü
ultraDb.all('SELECT * FROM tactical_systems', [], (err, systems) => {
  if (err) {
    console.error('❌ Tactical systems error:', err);
    return;
  }

  console.log(`\n1️⃣ TACTICAL SYSTEMS (${systems.length} adet)`);
  console.log('-'.repeat(60));

  let emptyFields = 0;
  systems.forEach((sys, i) => {
    if (i < 3) {
      console.log(`\n📌 ${sys.name} (${sys.formation})`);
      console.log(`  Philosophy: ${sys.philosophy ? sys.philosophy.substring(0, 50) + '...' : '❌ BOŞ'}`);
      console.log(`  System Type: ${sys.system_type || '❌ BOŞ'}`);
      console.log(`  Pressing: ${sys.pressing_intensity || '❌ BOŞ'}`);
      console.log(`  Build-up: ${sys.build_up_play ? sys.build_up_play.substring(0, 40) + '...' : '❌ BOŞ'}`);
      console.log(`  Attacking Phase: ${sys.attacking_phase ? sys.attacking_phase.substring(0, 40) + '...' : '❌ BOŞ'}`);
    }

    // Boş alan kontrolü
    if (!sys.philosophy || sys.philosophy.length < 50) emptyFields++;
    if (!sys.attacking_phase || sys.attacking_phase.length < 50) emptyFields++;
    if (!sys.defensive_phase || sys.defensive_phase.length < 50) emptyFields++;
  });

  console.log(`\n⚠️ Yetersiz içerik: ~${emptyFields} alan`);
});

// Player Roles kontrolü
ultraDb.all('SELECT * FROM player_roles', [], (err, roles) => {
  if (err) {
    console.error('❌ Player roles error:', err);
    return;
  }

  console.log(`\n\n2️⃣ PLAYER ROLES (${roles.length} adet)`);
  console.log('-'.repeat(60));

  let emptyFields = 0;
  roles.forEach((role, i) => {
    if (i < 3) {
      console.log(`\n📌 ${role.role_name} (${role.position})`);
      console.log(`  Description: ${role.description ? role.description.substring(0, 50) + '...' : '❌ BOŞ'}`);
      console.log(`  Movement Pattern: ${role.movement_pattern ? role.movement_pattern.substring(0, 40) + '...' : '❌ BOŞ'}`);
      console.log(`  Primary Duties: ${role.primary_duties || '❌ BOŞ'}`);
      console.log(`  Key Attributes: ${role.key_attributes || '❌ BOŞ'}`);
    }

    if (!role.description || role.description.length < 50) emptyFields++;
    if (!role.movement_pattern || role.movement_pattern.length < 30) emptyFields++;
    if (!role.primary_duties) emptyFields++;
  });

  console.log(`\n⚠️ Yetersiz içerik: ~${emptyFields} alan`);
});

// Counter Tactics kontrolü
ultraDb.all('SELECT * FROM counter_tactics', [], (err, counters) => {
  if (err) {
    console.error('❌ Counter tactics error:', err);
    return;
  }

  console.log(`\n\n3️⃣ COUNTER TACTICS (${counters.length} adet)`);
  console.log('-'.repeat(60));

  let emptyFields = 0;
  counters.forEach((counter, i) => {
    if (i < 3) {
      console.log(`\n📌 Sistem ID: ${counter.system_id}`);
      console.log(`  Key Weaknesses: ${counter.key_weaknesses ? counter.key_weaknesses.substring(0, 50) + '...' : '❌ BOŞ'}`);
      console.log(`  Exploitation: ${counter.exploitation_methods ? counter.exploitation_methods.substring(0, 40) + '...' : '❌ BOŞ'}`);
      console.log(`  Player Instructions: ${counter.player_instructions ? counter.player_instructions.substring(0, 40) + '...' : '❌ BOŞ'}`);
    }

    if (!counter.key_weaknesses || counter.key_weaknesses.length < 50) emptyFields++;
    if (!counter.exploitation_methods || counter.exploitation_methods.length < 50) emptyFields++;
  });

  console.log(`\n⚠️ Yetersiz içerik: ~${emptyFields} alan`);

  console.log('\n\n' + '='.repeat(60));
  console.log('✅ KONTROL TAMAMLANDI');
  console.log('='.repeat(60));

  ultraDb.close();
});
