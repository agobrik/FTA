const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('TUR 2: ULTRA AGRESİF DÜZELTelse - 2,601 SORUNU TEMİZLİYORUZ');
console.log('═'.repeat(80) + '\n');

// TÜM TABLOLARDAKİ TÜM TEXT ALANLARI için genel bir çeviri yapalım

const translations = {
  // Futbol terimleri
  'high block': 'yüksek blok',
  'low block': 'alçak blok',
  'mid block': 'orta blok',
  'mid-block': 'orta blok',
  'deep block': 'derin blok',
  'compact block': 'kompakt blok',

  // Tek kelimeler (word boundary ile!)
  '\\bhigh\\b': 'yüksek',
  '\\blow\\b': 'alçak',
  '\\bblock\\b': 'blok',
  '\\bdeep\\b': 'derin',
  '\\bline\\b': 'hat',
  '\\bspace\\b': 'alan',
  '\\bnarrow\\b': 'dar',
  '\\bwide\\b': 'geniş',

  // Eylemler
  '\\bpressing\\b': 'baskı',
  '\\bpress\\b': 'baskı',
  '\\bdropping\\b': 'düşen',
  '\\bdrop\\b': 'düş',
  '\\bpushing\\b': 'iten',
  '\\bpush\\b': 'it',
  '\\bpulling\\b': 'çeken',
  '\\bpull\\b': 'çek',
  '\\bholding\\b': 'tutan',
  '\\bhold\\b': 'tut',
  '\\bcovering\\b': 'kaplayan',
  '\\bcover\\b': 'kapla',
  '\\btracking\\b': 'takip eden',
  '\\btrack\\b': 'takip et',

  // Diğer
  '\\bcounter\\b': 'karşı',
  '\\btarget\\b': 'hedef',
  '\\bzone\\b': 'bölge',
  '\\barea\\b': 'alan',
  '\\bchannel\\b': 'koridor',
  '\\bflank\\b': 'kanat',
  '\\bledge\\b': 'kenar',

  // Bozuk kelimeler
  'pozisyönü': 'pozisyonu',
  'kombinasyönü': 'kombinasyonu',
  'versiyönü': 'versiyonu',
  'organizasyönü': 'organizasyonu'
};

// GEÇERLİ futbol terimleri - bunları çevirMEyelim
const skipPatterns = [
  'Gegenpressing', 'gegenpressing', 'Possession', 'possession',
  'Wing-Back', 'wing-back', 'False', 'false', 'Bus', 'bus',
  'Guardiola', 'Klopp', 'Mourinho', 'Tiki-taka', 'Inverted',
  'pressing trap', 'pressing zone', 'counter-press', 'counter-attack',
  'high-press', 'low-line', 'mid-line', 'Christmas Tree'
];

let totalFixed = 0;

// TÜM TABLOLARI GÜNCELLE
const tables = [
  { name: 'tactical_systems', fields: ['philosophy', 'key_principles', 'build_up_play', 'passing_style', 'defensive_approach', 'attacking_approach'] },
  { name: 'player_roles', fields: ['description', 'detailed_explanation', 'tactical_purpose', 'movement_pattern', 'positioning', 'on_ball_behavior', 'off_ball_movement'] },
  { name: 'non_possession_tactics', fields: ['defensive_philosophy', 'pressing_philosophy', 'how_to_press', 'where_to_press', 'when_to_press'] },
  { name: 'system_weaknesses', fields: ['weakness_description', 'how_to_exploit'] },
  { name: 'pressing_trap_zones', fields: ['trap_execution', 'trap_setup'] },
  { name: 'tactical_partnerships', fields: ['movement_patterns', 'passing_patterns', 'function_description'] },
  { name: 'counter_tactics', fields: ['detailed_strategy', 'key_adjustments', 'player_instructions'] },
  { name: 'role_synergies', fields: ['synergy_description', 'ideal_positioning', 'movement_coordination'] },
  { name: 'formation_transitions', fields: ['description', 'how_to_execute', 'player_movements'] },
  { name: 'tactical_concepts', fields: ['description', 'detailed_explanation', 'how_to_implement'] },
  { name: 'possession_tactics', fields: ['progression_patterns', 'passing_principles', 'movement_principles'] }
];

let tableIndex = 0;

function processNextTable() {
  if (tableIndex >= tables.length) {
    console.log('\n' + '═'.repeat(80));
    console.log(`✅ TOPLAM ${totalFixed} TABLO GÜNCELLENDİ!`);
    console.log('\nULTRA_AGGRESSIVE_CHECK.js ile tekrar kontrol edin.');
    console.log('═'.repeat(80) + '\n');
    process.exit(0);
    return;
  }

  const table = tables[tableIndex];
  console.log(`[${tableIndex + 1}/${tables.length}] ${table.name} güncelleniyor...`);

  // Her alan için SET cümlesi oluştur
  const setClauses = table.fields.map(field => {
    let sqlField = field;

    // Her çeviri için REPLACE ekle
    Object.keys(translations).forEach(eng => {
      const tr = translations[eng];

      // Word boundary kontrolü (\\b varsa)
      if (eng.includes('\\b')) {
        const cleanEng = eng.replace(/\\b/g, '');
        // SQL'de REGEXP yoksa basit REPLACE kullan
        sqlField = `REPLACE(${sqlField}, ' ${cleanEng} ', ' ${tr} ')`;
        sqlField = `REPLACE(${sqlField}, ' ${cleanEng}.', ' ${tr}.')`;
        sqlField = `REPLACE(${sqlField}, ' ${cleanEng},', ' ${tr},')`;
        sqlField = `REPLACE(${sqlField}, '"${cleanEng}"', '"${tr}"')`;
      } else {
        sqlField = `REPLACE(${sqlField}, '${eng}', '${tr}')`;
      }
    });

    return `${field} = ${sqlField}`;
  }).join(',\n    ');

  const sql = `UPDATE ${table.name}\n  SET\n    ${setClauses}\n  WHERE id > 0`;

  db.run(sql, [], function(err) {
    if (err) {
      console.log(`❌ ERROR: ${err.message}`);
    } else {
      console.log(`✅ ${this.changes} kayıt güncellendi`);
      totalFixed += this.changes;
    }

    tableIndex++;
    setTimeout(processNextTable, 10);
  });
}

processNextTable();
