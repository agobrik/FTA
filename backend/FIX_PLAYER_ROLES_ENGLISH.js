const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('PLAYER ROLES İNGİLİZCE İÇERİKLERİ DÜZELTİYORUZ');
console.log('═'.repeat(80) + '\n');

let totalFixed = 0;

const playerRoleFixes = [
  {
    id: 36,
    tactical_purpose: 'Kutuya geç koşular. Forvet ile orta sahayı bağla. Derinlikten gol at.'
  },
  {
    id: 37,
    description: 'Wing-back neredeyse bir kanat oyuncusu. Hakimi, Alphonso Davies, Theo Hernandez.',
    detailed_explanation: 'Hücum eden wing-back zamanının çoğunu rakip yarısında geçirir. Hız kritik.',
    tactical_purpose: 'Hücumda genişlik sağla. Rakibi ger. Orta ve gol.'
  },
  {
    id: 40,
    tactical_purpose: 'Baskıya liderlik et. Baskı tuzaklarını tetikle. Oyunu bağla.'
  },
  {
    id: 41,
    detailed_explanation: 'Geri 3\'te geniş stoper. Topu ileri taşıma ve geniş alanları kaplama için daha fazla özgürlük.',
    tactical_purpose: 'Geri 3 geniş savunucu. Geniş alanı kapla. Top ilerlemesi.'
  },
  {
    id: 42,
    detailed_explanation: 'Ters ayaklı kanat oyuncusu ters ayakta oynar. İçeri keserek şut atar ve şans yaratır.'
  },
  {
    id: 43,
    tactical_purpose: 'Gol at. Savunmayı ger. Paslar için hedef.'
  },
  {
    id: 44,
    detailed_explanation: 'Top kazanan orta saha agresif takl ve topa müdahaleler. Motor.',
    tactical_purpose: 'Topu geri kazan. Yüksek yoğunluk. Oyunu böl.'
  }
];

console.log('Player roles düzeltiliyor...\n');

let processed = 0;
playerRoleFixes.forEach(fix => {
  const updateFields = Object.keys(fix).filter(k => k !== 'id');
  const setClause = updateFields.map(f => `${f}=?`).join(', ');
  const values = updateFields.map(f => fix[f]);
  values.push(fix.id);

  db.run(
    `UPDATE player_roles SET ${setClause} WHERE id=?`,
    values,
    (err) => {
      if (err) {
        console.log(`❌ Hata (player_roles #${fix.id}):`, err.message);
      } else {
        totalFixed++;
        console.log(`✅ player_roles #${fix.id} güncellendi`);
      }
      processed++;
      if (processed === playerRoleFixes.length) {
        finish();
      }
    }
  );
});

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${totalFixed} PLAYER ROLE GÜNCELLENDİ!`);
  console.log('\nDETAILED_QUALITY_CHECK.js ile final kontrol yapın.');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
