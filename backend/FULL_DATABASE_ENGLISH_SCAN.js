const db = require('./ultra_database');

console.log('=== TÜM VERİTABANI İNGİLİZCE TARAMA ===\n');

// Yaygın İngilizce kelimeler
const englishPatterns = [
  '%the %', '% the%',
  '%and %', '% and%',
  '%with %', '% with%',
  '%when %', '% when%',
  '%this %', '% this%',
  '%that %', '% that%',
  '%from %', '% from%',
  '%ball %', '% ball%',
  '%press%', '%attack%', '%defend%',
  '%player%', '%zone%', '%space%',
  '%high %', '% high%',
  '%low %', '% low%',
  '%forward%', '%back%',
  '%wing%', '%center%',
  '%can %', '% can%',
  '%will %', '% will%',
  '%should %', '% should%',
  '%using %', '% using%',
  '%vs %', '% vs%',
  '%against %', '% against%',
  '%through %', '% through%',
  '%over %', '% over%',
  '%lack%', '%struggle%', '%weakness%',
  '%strength%', '%counter%',
  '%creating %', '% creating%',
  '%exploit%', '%vulnerable%'
];

const tablesToCheck = [
  {
    name: 'tactical_systems',
    columns: ['name', 'in_possession_shape', 'out_of_possession_shape', 'transition_attack', 'transition_defense', 'corner_attack_strategy', 'corner_defense_strategy', 'free_kick_strategy']
  },
  {
    name: 'system_weaknesses',
    columns: ['weakness_type', 'weakness_description', 'how_to_exploit', 'required_approach', 'examples']
  },
  {
    name: 'pressing_trap_zones',
    columns: ['trap_name', 'trap_zone', 'trap_trigger', 'trap_setup', 'trap_execution', 'player_roles_involved', 'success_rate_high_against', 'success_rate_low_against']
  },
  {
    name: 'possession_tactics',
    columns: ['circulation_patterns', 'progression_patterns', 'overload_patterns', 'possession_zones', 'passing_principles', 'movement_principles']
  },
  {
    name: 'non_possession_tactics',
    columns: ['defensive_philosophy', 'pressing_philosophy', 'counter_attack_philosophy', 'where_to_press', 'when_to_press', 'how_to_press', 'pressing_traps', 'out_of_possession_width', 'out_of_possession_depth', 'out_of_possession_compactness', 'out_of_possession_gk_role', 'recovery_speed', 'when_to_drop_deep', 'when_to_step_up', 'when_to_press_high', 'when_to_stay_compact']
  },
  {
    name: 'counter_tactics',
    columns: ['counter_name', 'detailed_strategy', 'when_to_apply', 'player_instructions', 'key_adjustments']
  },
  {
    name: 'tactical_concepts',
    columns: ['concept_name', 'description', 'how_to_implement', 'key_principles', 'example_teams']
  },
  {
    name: 'formation_transitions',
    columns: ['description', 'key_player_movements', 'timing_triggers', 'coaching_points']
  },
  {
    name: 'tactical_trends',
    columns: ['trend_name', 'description', 'why_effective', 'example_teams', 'how_to_implement']
  },
  {
    name: 'player_roles',
    columns: ['role_name', 'description', 'key_attributes', 'responsibilities', 'example_players']
  },
  {
    name: 'advanced_player_profiles',
    columns: ['profile_name', 'description', 'ideal_attributes', 'playing_style', 'example_players']
  },
  {
    name: 'tactical_partnerships',
    columns: ['partnership_name', 'description', 'synergy_explanation', 'example_pairs']
  },
  {
    name: 'role_synergies',
    columns: ['synergy_description', 'why_works', 'tactical_benefits']
  },
  {
    name: 'phase_analysis',
    columns: ['phase_name', 'key_principles', 'common_patterns', 'coaching_points']
  },
  {
    name: 'spatial_analysis',
    columns: ['zone_name', 'strategic_importance', 'how_to_exploit', 'common_mistakes']
  },
  {
    name: 'width_depth_maps',
    columns: ['map_description', 'tactical_implications', 'example_usage']
  },
  {
    name: 'player_system_fit',
    columns: ['fit_analysis', 'strengths_in_system', 'weaknesses_in_system']
  }
];

console.log('Taranacak tablo sayısı:', tablesToCheck.length);
console.log('═'.repeat(70));

let tableIndex = 0;
let totalEnglishRecords = 0;
let detailedResults = [];

function scanNextTable() {
  if (tableIndex >= tablesToCheck.length) {
    console.log('\n\n' + '═'.repeat(70));
    console.log('📊 TARAMA SONUÇLARI:\n');
    console.log('Toplam İngilizce içeren tablo:', detailedResults.filter(r => r.count > 0).length);
    console.log('Toplam İngilizce içeren kayıt:', totalEnglishRecords);
    console.log('\n' + '═'.repeat(70));

    if (detailedResults.filter(r => r.count > 0).length > 0) {
      console.log('\n🔍 DETAYLI SONUÇLAR:\n');
      detailedResults.filter(r => r.count > 0).forEach(r => {
        console.log(`\n❌ ${r.table}: ${r.count} kayıt`);
        if (r.samples && r.samples.length > 0) {
          console.log('   Örnekler:');
          r.samples.slice(0, 3).forEach(s => {
            console.log(`   ID ${s.id}: "${s.text.substring(0, 80)}..."`);
          });
        }
      });
    }

    console.log('\n');
    process.exit(0);
    return;
  }

  const table = tablesToCheck[tableIndex];
  console.log(`\n${tableIndex + 1}. ${table.name} taranıyor...`);

  // Her tablo için İngilizce içeren kayıtları bul
  const conditions = table.columns.map(col =>
    englishPatterns.map(pattern => `${col} LIKE '${pattern}'`).join(' OR ')
  ).join(' OR ');

  const query = `SELECT * FROM ${table.name} WHERE ${conditions} LIMIT 100`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.log(`   HATA: ${err.message}`);
      detailedResults.push({ table: table.name, count: 0, error: err.message });
    } else {
      console.log(`   ${rows.length} İngilizce içeren kayıt bulundu`);

      const samples = rows.slice(0, 5).map(row => {
        const textFields = table.columns.map(col => row[col]).filter(v => v).join(' ');
        return { id: row.id, text: textFields };
      });

      detailedResults.push({
        table: table.name,
        count: rows.length,
        samples: samples
      });

      totalEnglishRecords += rows.length;
    }

    tableIndex++;
    scanNextTable();
  });
}

scanNextTable();
