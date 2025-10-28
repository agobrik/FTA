const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('TUR 2: JAVASCRIPT TABANLI ÇOKLU ÇEVİRİ');
console.log('Her kaydı okuyup JS ile çevirip yazıyoruz');
console.log('═'.repeat(80) + '\n');

// Çeviri sözlüğü
const translations = [
  // Bozuk kelimeler önce
  { en: 'pozisyönü', tr: 'pozisyonu' },
  { en: 'kombinasyönü', tr: 'kombinasyonu'},
  { en: 'versiyönü', tr: 'versiyonu' },
  { en: 'organizasyönü', tr: 'organizasyonu' },

  // İki kelimelik terimler
  { en: 'high block', tr: 'yüksek blok' },
  { en: 'low block', tr: 'alçak blok' },
  { en: 'mid block', tr: 'orta blok' },
  { en: 'mid-block', tr: 'orta blok' },
  { en: 'deep block', tr: 'derin blok' },
  { en: 'compact block', tr: 'kompakt blok' },
  { en: 'defensive line', tr: 'savunma hattı' },

  // Tek kelimeler (dikkatli!)
  { en: /\bhigh\b/gi, tr: 'yüksek' },
  { en: /\blow\b/gi, tr: 'alçak' },
  { en: /\bblock\b/gi, tr: 'blok' },
  { en: /\bdeep\b/gi, tr: 'derin' },
  { en: /\bline\b/gi, tr: 'hat' },
  { en: /\bspace\b/gi, tr: 'alan' },
  { en: /\bnarrow\b/gi, tr: 'dar' },
  { en: /\bzone\b/gi, tr: 'bölge' },
  { en: /\barea\b/gi, tr: 'alan' },
  { en: /\bchannel\b/gi, tr: 'koridor' },
  { en: /\bflank\b/gi, tr: 'kanat' },
  { en: /\bledge\b/gi, tr: 'kenar' },

  // Eylemler
  { en: /\bdropping\b/gi, tr: 'düşen' },
  { en: /\bdrop\b/gi, tr: 'düş' },
  { en: /\bpushing\b/gi, tr: 'iten' },
  { en: /\bpush\b/gi, tr: 'it' },
  { en: /\bpulling\b/gi, tr: 'çeken' },
  { en: /\bpull\b/gi, tr: 'çek' },
  { en: /\bholding\b/gi, tr: 'tutan' },
  { en: /\bcovering\b/gi, tr: 'kaplayan' },
  { en: /\bcover\b/gi, tr: 'kapla' },
  { en: /\btracking\b/gi, tr: 'takip eden' },
  { en: /\btrack\b/gi, tr: 'takip et' }
];

// Geçerli futbol terimleri - çevirME
const skipTerms = [
  'Gegenpressing', 'Possession', 'Wing-Back', 'False', 'Bus',
  'Guardiola', 'Klopp', 'Mourinho', 'pressing trap', 'counter-press'
];

function translateText(text) {
  if (!text) return text;

  // Geçerli terim mi kontrol et
  let hasValidTerm = false;
  skipTerms.forEach(term => {
    if (text.includes(term)) hasValidTerm = true;
  });

  // Eğer geçerli terim varsa dikkatli ol
  if (hasValidTerm) {
    // Sadece açık İngilizce kelimeleri çevir
    translations.slice(0, 15).forEach(pair => { // İlk 15'i güvenli
      if (typeof pair.en === 'string') {
        text = text.replace(new RegExp(pair.en, 'g'), pair.tr);
      } else if (pair.en instanceof RegExp) {
        text = text.replace(pair.en, pair.tr);
      }
    });
  } else {
    // Her şeyi çevir
    translations.forEach(pair => {
      if (typeof pair.en === 'string') {
        text = text.replace(new RegExp(pair.en, 'gi'), pair.tr);
      } else if (pair.en instanceof RegExp) {
        text = text.replace(pair.en, pair.tr);
      }
    });
  }

  return text;
}

let totalFixed = 0;

// Tactical systems
console.log('[1/5] tactical_systems işleniyor...');
db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process2();
    return;
  }

  let processed = 0;
  rows.forEach(row => {
    const updates = {
      philosophy: translateText(row.philosophy),
      key_principles: translateText(row.key_principles),
      build_up_play: translateText(row.build_up_play),
      passing_style: translateText(row.passing_style),
      defensive_approach: translateText(row.defensive_approach),
      attacking_approach: translateText(row.attacking_approach)
    };

    db.run(
      `UPDATE tactical_systems SET philosophy=?, key_principles=?, build_up_play=?, passing_style=?, defensive_approach=?, attacking_approach=? WHERE id=?`,
      [updates.philosophy, updates.key_principles, updates.build_up_play, updates.passing_style, updates.defensive_approach, updates.attacking_approach, row.id],
      (err2) => {
        if (!err2) totalFixed++;
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${totalFixed} tactical_systems güncellendi`);
          process2();
        }
      }
    );
  });
});

function process2() {
  console.log('[2/5] player_roles işleniyor...');
  db.all('SELECT * FROM player_roles', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process3();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const updates = {
        description: translateText(row.description),
        detailed_explanation: translateText(row.detailed_explanation),
        tactical_purpose: translateText(row.tactical_purpose),
        movement_pattern: translateText(row.movement_pattern)
      };

      db.run(
        `UPDATE player_roles SET description=?, detailed_explanation=?, tactical_purpose=?, movement_pattern=? WHERE id=?`,
        [updates.description, updates.detailed_explanation, updates.tactical_purpose, updates.movement_pattern, row.id],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (player_roles dahil)`);
            process3();
          }
        }
      );
    });
  });
}

function process3() {
  console.log('[3/5] non_possession_tactics işleniyor...');
  db.all('SELECT * FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process4();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const updates = {
        defensive_philosophy: translateText(row.defensive_philosophy),
        pressing_philosophy: translateText(row.pressing_philosophy),
        how_to_press: translateText(row.how_to_press)
      };

      db.run(
        `UPDATE non_possession_tactics SET defensive_philosophy=?, pressing_philosophy=?, how_to_press=? WHERE id=?`,
        [updates.defensive_philosophy, updates.pressing_philosophy, updates.how_to_press, row.id],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (non_possession dahil)`);
            process4();
          }
        }
      );
    });
  });
}

function process4() {
  console.log('[4/5] system_weaknesses işleniyor...');
  db.all('SELECT * FROM system_weaknesses', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      process5();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const updates = {
        weakness_description: translateText(row.weakness_description),
        how_to_exploit: translateText(row.how_to_exploit)
      };

      db.run(
        `UPDATE system_weaknesses SET weakness_description=?, how_to_exploit=? WHERE id=?`,
        [updates.weakness_description, updates.how_to_exploit, row.id],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (system_weaknesses dahil)`);
            process5();
          }
        }
      );
    });
  });
}

function process5() {
  console.log('[5/5] possession_tactics işleniyor...');
  db.all('SELECT * FROM possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('ERROR:', err);
      finish();
      return;
    }

    let processed = 0;
    rows.forEach(row => {
      const updates = {
        progression_patterns: translateText(row.progression_patterns),
        passing_principles: translateText(row.passing_principles)
      };

      db.run(
        `UPDATE possession_tactics SET progression_patterns=?, passing_principles=? WHERE id=?`,
        [updates.progression_patterns, updates.passing_principles, row.id],
        (err2) => {
          if (!err2) totalFixed++;
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${totalFixed} toplam (possession dahil)`);
            finish();
          }
        }
      );
    });
  });
}

function finish() {
  console.log('\n' + '═'.repeat(80));
  console.log(`✅ TOPLAM ${totalFixed} KAYIT GÜNCELLENDİ!`);
  console.log('\nULTRA_AGGRESSIVE_CHECK.js ile kontrol edin.');
  console.log('═'.repeat(80) + '\n');
  process.exit(0);
}
