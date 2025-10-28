const db = require('./ultra_database');

const queries = [
  {
    name: 'System Weaknesses',
    query: `SELECT COUNT(*) as total,
            SUM(CASE WHEN weakness_description LIKE '%the %' OR
                          weakness_description LIKE '% vs %' OR
                          weakness_description LIKE '%with %' OR
                          how_to_exploit LIKE '%the %' OR
                          how_to_exploit LIKE '% vs %'
                THEN 1 ELSE 0 END) as eng
            FROM system_weaknesses`
  },
  {
    name: 'Possession Tactics',
    query: `SELECT COUNT(*) as total,
            SUM(CASE WHEN circulation_patterns LIKE '%the %' OR
                          circulation_patterns LIKE '% vs %' OR
                          progression_patterns LIKE '%the %'
                THEN 1 ELSE 0 END) as eng
            FROM possession_tactics`
  },
  {
    name: 'Non-Possession Tactics',
    query: `SELECT COUNT(*) as total,
            SUM(CASE WHEN defensive_philosophy LIKE '%the %' OR
                          pressing_philosophy LIKE '% vs %'
                THEN 1 ELSE 0 END) as eng
            FROM non_possession_tactics`
  },
  {
    name: 'Pressing Trap Zones',
    query: `SELECT COUNT(*) as total,
            SUM(CASE WHEN trap_execution LIKE '%the %' OR
                          trap_execution LIKE '% vs %'
                THEN 1 ELSE 0 END) as eng
            FROM pressing_trap_zones`
  },
  {
    name: 'Counter Tactics',
    query: `SELECT COUNT(*) as total,
            SUM(CASE WHEN detailed_strategy LIKE '%the %' OR
                          detailed_strategy LIKE '% vs %'
                THEN 1 ELSE 0 END) as eng
            FROM counter_tactics`
  }
];

console.log('\n🔍 TÜM TABLOLARDA İNGİLİZCE KELİME KONTROLÜ:\n');
console.log('═'.repeat(70));

let completed = 0;

queries.forEach(q => {
  db.get(q.query, [], (err, row) => {
    if (err) {
      console.log(`\n❌ ${q.name}: HATA -`, err.message);
    } else if (row) {
      const pct = ((row.total - row.eng) / row.total * 100).toFixed(1);
      console.log(`\n📊 ${q.name}`);
      console.log(`   Toplam Kayıt: ${row.total}`);
      console.log(`   İngilizce içeren: ${row.eng}`);
      console.log(`   Türkçe Oranı: %${pct}`);

      if (row.eng === 0) {
        console.log('   ✅ TAM TÜRKÇE!');
      } else if (pct >= 95) {
        console.log('   ✅ ÇOK İYİ');
      } else if (pct >= 85) {
        console.log('   ⚠️  İYİ');
      } else {
        console.log('   ❌ İYİLEŞTİRME GEREKLİ');
      }
    }

    completed++;
    if (completed === queries.length) {
      console.log('\n' + '═'.repeat(70));
      console.log('\n✅ KONTROL TAMAMLANDI!\n');
      process.exit(0);
    }
  });
});
