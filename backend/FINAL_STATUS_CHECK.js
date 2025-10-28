const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('═══════════════════════════════════════════════════════');
console.log('           📊 FİNAL %100 İÇERİK RAPORU');
console.log('═══════════════════════════════════════════════════════\n');

const tables = [
  'tactical_systems',
  'player_roles',
  'counter_tactics',
  'tactical_concepts',
  'system_weaknesses',
  'formation_transitions',
  'role_synergies',
  'tactical_trends',
  'pressing_trap_zones',
  'possession_tactics',
  'non_possession_tactics',
  'tactical_partnerships'
];

let completed = 0;
let totalEntries = 0;
const results = [];

function checkTable(index) {
  if (index >= tables.length) {
    printResults();
    return;
  }

  const table = tables[index];
  db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
    if (err) {
      results.push({ table, count: 0, status: '❌ ERROR' });
    } else {
      const count = row.count;
      totalEntries += count;
      const status = count > 0 ? '✅ DOLU' : '❌ BOŞ';
      results.push({ table, count, status });
      if (count > 0) completed++;
    }
    checkTable(index + 1);
  });
}

function printResults() {
  console.log('📋 TABLO DETAYLARI:\n');

  const tableNames = {
    'tactical_systems': '🎯 TAKTİK SİSTEMLER',
    'player_roles': '⚽ OYUNCU ROLLERİ',
    'counter_tactics': '🛡️  KARŞI TAKTİKLER',
    'tactical_concepts': '💡 TAKTİK KAVRAMLAR',
    'system_weaknesses': '⚠️  SİSTEM ZAYIFLIKLARI',
    'formation_transitions': '🔄 FORMASYON GEÇİŞLERİ',
    'role_synergies': '🤝 ROL SİNERJİLERİ',
    'tactical_trends': '📈 TAKTİK TRENDLER',
    'pressing_trap_zones': '🎯 PRESİNG BÖLGELERI',
    'possession_tactics': '⚫ TOP KONTROLÜ',
    'non_possession_tactics': '⚪ TOPSUZ OYUN',
    'tactical_partnerships': '👥 TAKTİK ORTAKLIKLAR'
  };

  results.forEach(r => {
    const name = tableNames[r.table] || r.table;
    const countStr = String(r.count).padStart(3);
    console.log(`${r.status} ${countStr}  - ${name}`);
  });

  const richnessScore = Math.round((completed / tables.length) * 100);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log(`📊 TOPLAM İÇERİK: ${totalEntries} entries`);
  console.log(`✅ DOLU TABLOLAR: ${completed}/${tables.length}`);
  console.log(`📈 ZENGİNLİK SKORU: ${richnessScore}%`);
  console.log('═══════════════════════════════════════════════════════\n');

  if (richnessScore === 100) {
    console.log('🎉🎉🎉 BAŞARILI! %100 ZENGİNLİĞE ULAŞILDI! 🎉🎉🎉');
    console.log('🏆 TÜM TABLOLAR DOLU VE ZENGİN İÇERİK EKLENDI!');
    console.log('✨ Football Tactics Ultra Database TAMAMEN ZENGİNLEŞTİRİLDİ!\n');
  } else if (richnessScore >= 90) {
    console.log('🎊 MÜKEMMEL! %90+ Zenginlik! Neredeyse tamamlandı!');
  } else if (richnessScore >= 75) {
    console.log('👍 ÇOK İYİ! %75+ Zenginlik! İyi ilerleme!');
  }

  // Detailed breakdown
  console.log('📊 KATEGORİ BAZINDA DAĞILIM:\n');
  console.log(`Temel Sistem Verileri: ${results[0].count + results[1].count + results[2].count} entries`);
  console.log(`Taktik Kavramlar & Trendler: ${results[3].count + results[7].count} entries`);
  console.log(`Sistem Detayları: ${results[4].count + results[5].count} entries`);
  console.log(`Rol İlişkileri: ${results[6].count + results[11].count} entries`);
  console.log(`Oyun Fazları: ${results[8].count + results[9].count + results[10].count} entries`);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('           ✨ RAPOR TAMAMLANDI ✨');
  console.log('═══════════════════════════════════════════════════════\n');

  db.close();
}

checkTable(0);
