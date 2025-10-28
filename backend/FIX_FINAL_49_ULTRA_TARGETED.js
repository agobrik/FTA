const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('KALAN 49 SORUNU HEDEFLE DÜZELTİYORUZ - %98+ İÇİN');
console.log('═'.repeat(80) + '\n');

let totalFixed = 0;

// Çok hedefli düzeltme fonksiyonu
function ultraTargetedFix(text) {
  if (!text) return text;

  // 1. Türkçe bağlamda "back" düzeltmeleri (wing-back HARİÇ)
  // "İki back" → "İki bek" gibi
  text = text.replace(/\bİki back\b/g, 'İki bek');
  text = text.replace(/\bÜç back\b/g, 'Üç bek');
  text = text.replace(/\bÜçüncü back\b/g, 'Üçüncü bek');
  text = text.replace(/\bDört back\b/g, 'Dört bek');
  text = text.replace(/\bBeş back\b/g, 'Beş bek');
  text = text.replace(/\biki back\b/g, 'iki bek');
  text = text.replace(/\büç back\b/g, 'üç bek');

  // 2. "and" in English phrases → "ve"
  text = text.replace(/\bcontrol and intensity\b/gi, 'kontrol ve yoğunluk');
  text = text.replace(/\bdiscipline and patience\b/gi, 'disiplin ve sabır');
  text = text.replace(/\bbalanced control and\b/gi, 'dengeli kontrol ve');
  text = text.replace(/\bhigher possession and\b/gi, 'daha yüksek top hakimiyeti ve');

  // 3. Diğer yaygın kalıplar
  text = text.replace(/\bhigh line\b/gi, 'yüksek hat');
  text = text.replace(/\bdeep runs\b/gi, 'derin koşular');
  text = text.replace(/\binto midfield\b/gi, 'orta sahaya');
  text = text.replace(/\baround the\b/gi, 'etrafında');
  text = text.replace(/\bbetween CBs\b/gi, 'stoperlerin arasına');
  text = text.replace(/\btarget man\b/gi, 'hedef adam');
  text = text.replace(/\bfinal third\b/gi, 'son üçlü');

  // 4. "pressing" (Gegenpressing, pressing trap HARİÇ)
  if (!text.includes('Gegenpressing') && !text.includes('pressing trap')) {
    text = text.replace(/\bpositional pressing\b/gi, 'pozisyonel baskı');
  }

  return text;
}

console.log('[1/2] Genel kayıtları düzeltiyoruz...\n');

db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    fixSpecificRecords();
    return;
  }

  let processed = 0;
  rows.forEach(row => {
    db.run(
      `UPDATE tactical_systems SET
         philosophy=?,
         key_principles=?,
         strengths=?,
         weaknesses=?,
         build_up_play=?,
         passing_style=?,
         defensive_approach=?,
         attacking_approach=?
       WHERE id=?`,
      [
        ultraTargetedFix(row.philosophy),
        ultraTargetedFix(row.key_principles),
        ultraTargetedFix(row.strengths),
        ultraTargetedFix(row.weaknesses),
        ultraTargetedFix(row.build_up_play),
        ultraTargetedFix(row.passing_style),
        ultraTargetedFix(row.defensive_approach),
        ultraTargetedFix(row.attacking_approach),
        row.id
      ],
      (err2) => {
        if (!err2) totalFixed++;
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${totalFixed} genel kayıt güncellendi`);
          fixSpecificRecords();
        }
      }
    );
  });
});

function fixSpecificRecords() {
  console.log('\n[2/2] Tamamen İngilizce kayıtları düzeltiyoruz...\n');

  // Özel kayıt düzeltmeleri
  const specificFixes = [
    {
      id: 37,
      strengths: '["La Liga 2022-23 şampiyonu","Pedri-Gavi inanılmaz yetenekler","Lewandowski goller","Barcelona kimliği","Xavi vizyonu","Gavi enerjisi"]'
    },
    {
      id: 41,
      strengths: '["Serie A hakimiyeti 2014-19","BBC efsanevi savunma","Buffon liderlik","Pragmatik zaferler","Derin Şampiyonlar Ligi koşuları"]'
    },
    {
      id: 43,
      key_principles: '["Kante yok edici dahi","Pogba yaratıcı özgürlük","Mbappe hız fenomeni","Griezmann komple forvet","Deschamps pragmatizmi"]'
    },
    {
      id: 44,
      key_principles: '["Her şey Messi için","Di Maria kritik oyuncu","Emi Martinez kahraman kaleci","De Paul savaşçı orta saha","Lautaro partner"]'
    },
    {
      id: 46,
      philosophy: 'Devrimci pozisyonel oyun ile inverted bek. Zinchenko orta sahaya düşerek 3-2 şekli yaratır. Ødegaard derin, Saka-Martinelli kanatlar geniş.',
      strengths: '["oyun kurma kontrolü","Sayısal üstünlük","Alan yaratır","Savunma dengesi"]'
    },
    {
      id: 47,
      philosophy: 'Klopp gegenpressing\'in kontrollü pozisyonel baskıya evrimi. Arne Slot disiplin ve sabır getirdi. Daha yüksek savunma hattı, orta saha kontrolü, seçici baskı tetikleyicileri.',
      key_principles: '["Pozisyonel baskı vs adam odaklı","DM stoperler arasına düşer (3-2-5)","Seçici tetikleyiciler","Daha yüksek top hakimiyeti"]',
      strengths: '["Dengeli kontrol ve yoğunluk","Daha iyi savunma yapısı","Daha yüksek top hakimiyeti","Daha sürdürülebilir"]'
    }
  ];

  let processed = 0;
  specificFixes.forEach(fix => {
    const updateFields = Object.keys(fix).filter(k => k !== 'id');
    const setClause = updateFields.map(f => `${f}=?`).join(', ');
    const values = updateFields.map(f => fix[f]);
    values.push(fix.id);

    db.run(
      `UPDATE tactical_systems SET ${setClause} WHERE id=?`,
      values,
      (err) => {
        if (!err) totalFixed++;
        processed++;
        if (processed === specificFixes.length) {
          console.log(`✅ ${totalFixed} toplam kayıt güncellendi (özel kayıtlar dahil)`);
          finish();
        }
      }
    );
  });
}

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${totalFixed} KAYIT GÜNCELLENDİ!`);
  console.log('\nDETAILED_QUALITY_CHECK.js ile son kontrol yapın.');
  console.log('Hedef: %98+ temizlik!');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
