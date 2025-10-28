const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('SPESIFIK TAMAMEN INGILIZCE KAYITLARI DÜZELTIYORUZ');
console.log('═'.repeat(80) + '\n');

let totalFixed = 0;

const specificFixes = [
  // Record #24 - "İki back sadece" → "İki bek sadece"
  {
    id: 24,
    key_principles: '["sürekli atak","Orta saha üçgeni","İki bek sadece","Çok basit organizasyon","Skor odaklı futbol"]'
  },
  // Record #25 - "Üçüncü back", "Üç back sistemi"
  {
    id: 25,
    philosophy: 'Herbert Chapman\'ın devrim yaratan WM sistemi. Offside kuralı değişikliğine tepki. Üçüncü bek, iki içli forvet geri çekili.',
    key_principles: '["Üç bek sistemi (stopper + iki bek)","İki inside forward geri çekili","WM harfi şekli oluşturur","Karşı ataklar","Organizasyonun doğuşu"]'
  },
  // Record #47 - Lots of English content
  {
    id: 47,
    weaknesses: '["Klopp\'tan daha az yoğun","Uyum süreci gerekli","Baskı ve düşüş arasında yakalanabilir","Hafif gol azalması"]'
  },
  // Record #48 - "Andoni Iraola Bielsa disciple brought ultra-agresif baskı and lightning counters"
  {
    id: 48,
    philosophy: 'Devrimci geçiş takımı. Andoni Iraola Bielsa öğrencisi ultra-agresif baskı ve yıldırım karşı ataklar getirdi. 2024/25\'te Premier League\'in en heyecanlı takımı.',
    strengths: '["PL 2024/25\'te en etkili geçişler","Yıkıcı karşı ataklar","Baskı topu tehlikeli kazanır","Mükemmel enerji","Senenkes fenomen"]',
    weaknesses: '["Karşı ataklara çok savunmasız","Yüksek enerji sürdürülemez","Kaotik savunma","Düşük bloklara karşı zorlanır","Çok fazla gol yer"]'
  },
  // Record #49 - "EXTREMELY vulnerable", "easily exploited"
  {
    id: 49,
    strengths: '["Heyecanlı hücum futbolu","Çok yüksek kaliteli şanslar","Rakip yarısında top hakimiyeti","Takım kimliği güçlü","Genç yetenekler gelişir"]',
    weaknesses: '["Arkasına AŞIRI savunmasız","Yüksek hat kolayca istismar edilir","Uyarlanmayı inatla reddeder","Çok fazla alan bırakır","Pragmatik takımlara karşı naif"]'
  },
  // Player role #35 - "box-to-box everywhere!", "Attack and defend"
  {
    table: 'player_roles',
    id: 35,
    detailed_explanation: 'Her yerde box-to-box! Tüm fazlarda tam orta saha varlığı.',
    tactical_purpose: 'Tüm orta sahayı kaplayın. Eşit atak ve savunma.'
  }
];

console.log('Spesifik kayıtları düzeltiyoruz...\n');

let processed = 0;
specificFixes.forEach(fix => {
  const table = fix.table || 'tactical_systems';
  const updateFields = Object.keys(fix).filter(k => k !== 'id' && k !== 'table');
  const setClause = updateFields.map(f => `${f}=?`).join(', ');
  const values = updateFields.map(f => fix[f]);
  values.push(fix.id);

  db.run(
    `UPDATE ${table} SET ${setClause} WHERE id=?`,
    values,
    (err) => {
      if (err) {
        console.log(`❌ Hata (${table} #${fix.id}):`, err.message);
      } else {
        totalFixed++;
        console.log(`✅ ${table} #${fix.id} güncellendi`);
      }
      processed++;
      if (processed === specificFixes.length) {
        finish();
      }
    }
  );
});

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${totalFixed} SPESIFIK KAYIT GÜNCELLENDİ!`);
  console.log('\nDETAILED_QUALITY_CHECK.js ile son kontrol yapın.');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
