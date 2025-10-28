const ultraDb = require('./ultra_database');

console.log('🔧 VERİTABANINA EKSİK KOLONLAR EKLENİYOR...\n');

const alterCommands = [
  // Tactical Systems için eksik kolonlar
  'ALTER TABLE tactical_systems ADD COLUMN system_type TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN attacking_phase TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN defensive_phase TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN transition_attack TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN transition_defense TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN team_mentality TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN chance_creation TEXT',
  'ALTER TABLE tactical_systems ADD COLUMN width_in_attack TEXT',

  // Player Roles için eksik kolonlar
  'ALTER TABLE player_roles ADD COLUMN key_attributes TEXT',
  'ALTER TABLE player_roles ADD COLUMN ideal_height_range TEXT',
  'ALTER TABLE player_roles ADD COLUMN ideal_age_range TEXT',
  'ALTER TABLE player_roles ADD COLUMN example_players TEXT',

  // Counter Tactics için eksik kolonlar
  'ALTER TABLE counter_tactics ADD COLUMN target_system_name TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN target_formation TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN key_weaknesses TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN exploitation_methods TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN recommended_formation TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN recommended_roles TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN pressing_zones TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN transition_focus TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN set_piece_strategy TEXT',
  'ALTER TABLE counter_tactics ADD COLUMN counter_system_name TEXT'
];

let completed = 0;
let failed = 0;

alterCommands.forEach((sql, index) => {
  ultraDb.run(sql, [], function(err) {
    if (err) {
      // Kolon zaten varsa hata verir, sorun değil
      if (err.message.includes('duplicate column name')) {
        console.log(`⏭️  Kolon zaten var (${index + 1}/${alterCommands.length})`);
      } else {
        console.error(`❌ Hata (${index + 1}): ${err.message}`);
        failed++;
      }
    } else {
      console.log(`✅ Kolon eklendi (${index + 1}/${alterCommands.length})`);
    }

    completed++;

    if (completed === alterCommands.length) {
      console.log(`\n🎉 İŞLEM TAMAMLANDI!`);
      console.log(`   Toplam: ${alterCommands.length}`);
      console.log(`   Başarısız: ${failed}`);
      ultraDb.close();
    }
  });
});
