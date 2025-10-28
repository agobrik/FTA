const db = require('./ultra_database');

console.log('=== AGRESİF İNGİLİZCE TEMİZLİĞİ ===\n');
console.log('HER İNGİLİZCE KELİME TÜRKÇE OLACAK!\n');

// Kapsamlı İngilizce-Türkçe sözlük
const translations = {
  // Genel kelimeler
  'the ': '', ' the': '',
  'and ': 've ', ' and': ' ve',
  'with ': 'ile ', ' with': ' ile',
  'when ': 'zaman ', ' when': ' zaman',
  'from ': 'den ', ' from': ' den',
  'through ': 'içinden ', ' through': ' içinden',
  'over ': 'üzerinden ', ' over': ' üzerinden',
  'against ': 'karşı ', ' against': ' karşı',
  'using ': 'kullanarak ', ' using': ' kullanarak',
  'creating ': 'yaratarak ', ' creating': ' yaratarak',
  'making ': 'yaparak ', ' making': ' yaparak',

  // Futbol terimleri
  'ball': 'top',
  'balls': 'toplar',
  'long balls': 'uzun toplar',
  'direct balls': 'direkt toplar',
  'player': 'oyuncu',
  'players': 'oyuncular',
  'press': 'baskı',
  'pressing': 'baskı',
  'high press': 'yüksek baskı',
  'low press': 'alçak baskı',
  'counter-press': 'karşı baskı',
  'attack': 'hücum',
  'attacking': 'hücum',
  'defend': 'savunma',
  'defending': 'savunma',
  'defensive': 'defansif',
  'zone': 'bölge',
  'zones': 'bölgeler',
  'space': 'alan',
  'spaces': 'alanlar',
  'wing': 'kanat',
  'wings': 'kanatlar',
  'winger': 'kanat oyuncusu',
  'wingers': 'kanat oyuncuları',
  'forward': 'forvet',
  'forwards': 'forvetler',
  'midfielder': 'orta saha',
  'midfielders': 'orta saha oyuncuları',
  'defender': 'defans',
  'defenders': 'defanslar',
  'fullback': 'bek',
  'fullbacks': 'bekler',
  'wing-back': 'kanat bek',
  'wing-backs': 'kanat bekler',
  'center-back': 'stoper',
  'center-backs': 'stoperler',
  'goalkeeper': 'kaleci',
  'target man': 'hedef adam',
  'pivot': 'pivot',

  // Taktik terimler
  'possession': 'sahiplik',
  'buildup': 'oyun kurma',
  'build-up': 'oyun kurma',
  'gegenpressing': 'karşı baskı',
  'gegenpress': 'karşı baskı',
  'compact': 'kompakt',
  'compactness': 'kompaktlık',
  'low block': 'alçak blok',
  'high block': 'yüksek blok',
  'mid-block': 'orta blok',
  'deep block': 'derin blok',
  'organized': 'organize',
  'transition': 'geçiş',
  'transitions': 'geçişler',
  'counter-attack': 'kontra atak',
  'counter': 'kontra',
  'overlap': 'örtüşme',
  'overload': 'aşırı yükleme',
  'overloads': 'aşırı yüklemeler',
  'inverted': 'içe kesen',
  'wide': 'geniş',
  'narrow': 'dar',
  'high line': 'yüksek hat',
  'offside trap': 'ofsayt tuzağı',
  'passing lanes': 'pas yolları',
  'passing': 'paslaşma',
  'runs': 'koşular',
  'movement': 'hareket',
  'rotation': 'rotasyon',
  'circulation': 'dolaşım',
  'progression': 'ilerleme',

  // Sıfatlar ve fiiller
  'quick': 'hızlı',
  'fast': 'hızlı',
  'slow': 'yavaş',
  'patient': 'sabırlı',
  'aggressive': 'agresif',
  'passive': 'pasif',
  'active': 'aktif',
  'intense': 'yoğun',
  'extreme': 'aşırı',
  'high': 'yüksek',
  'low': 'alçak',
  'deep': 'derin',
  'can': 'olabilir',
  'will': 'olacak',
  'should': 'meli',
  'must': 'malı',
  'exploit': 'istismar et',
  'vulnerable': 'savunmasız',
  'weakness': 'zayıflık',
  'strength': 'güç',
  'force': 'zorla',
  'deny': 'engelle',
  'allow': 'izin ver',
  'create': 'yarat',
  'break': 'kır',
  'struggle': 'zorlan',
  'lack': 'eksiklik',
  'creativity': 'yaratıcılık',

  // Diğer
  'repeatedly': 'tekrar tekrar',
  'effective': 'etkili',
  'devastating': 'yıkıcı',
  'simple': 'basit',
  'complex': 'karmaşık',
  'organized': 'organize',
  'system': 'sistem',
  'style': 'stil',
  'philosophy': 'felsefe',
  'strategy': 'strateji',
  'tactic': 'taktik',
  'tactics': 'taktikler'
};

let totalUpdated = 0;

// Çeviri fonksiyonu
function translateText(text) {
  if (!text) return text;

  let result = text.toLowerCase();

  // Tüm çevirileri uygula
  Object.keys(translations).forEach(eng => {
    const tur = translations[eng];
    const regex = new RegExp(eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, tur);
  });

  // Çoklu boşlukları temizle
  result = result.replace(/\s+/g, ' ').trim();

  // İlk harfi büyük yap
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

console.log('1. Tactical Systems düzeltiliyor...');

db.all('SELECT * FROM tactical_systems', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  let processed = 0;
  let updated = 0;

  rows.forEach(row => {
    const in_poss = translateText(row.in_possession_shape);
    const out_poss = translateText(row.out_of_possession_shape);
    const trans_att = translateText(row.transition_attack);
    const trans_def = translateText(row.transition_defense);

    db.run(
      `UPDATE tactical_systems
       SET in_possession_shape = ?,
           out_of_possession_shape = ?,
           transition_attack = ?,
           transition_defense = ?
       WHERE id = ?`,
      [in_poss, out_poss, trans_att, trans_def, row.id],
      function(updateErr) {
        if (!updateErr && this.changes > 0) {
          updated++;
          totalUpdated++;
        }
        processed++;
        if (processed === rows.length) {
          console.log(`✅ ${updated}/${rows.length} tactical system düzeltildi`);
          fixSystemWeaknesses();
        }
      }
    );
  });
});

function fixSystemWeaknesses() {
  console.log('\n2. System Weaknesses düzeltiliyor...');

  db.all('SELECT * FROM system_weaknesses', [], (err, rows) => {
    if (err) {
      fixCounterTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const type = translateText(row.weakness_type);
      const desc = translateText(row.weakness_description);
      const exploit = translateText(row.how_to_exploit);

      db.run(
        `UPDATE system_weaknesses
         SET weakness_type = ?,
             weakness_description = ?,
             how_to_exploit = ?
         WHERE id = ?`,
        [type, desc, exploit, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} weakness düzeltildi`);
            fixCounterTactics();
          }
        }
      );
    });
  });
}

function fixCounterTactics() {
  console.log('\n3. Counter Tactics düzeltiliyor...');

  db.all('SELECT * FROM counter_tactics', [], (err, rows) => {
    if (err) {
      fixPressingZones();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const name = translateText(row.counter_name);
      const strategy = translateText(row.detailed_strategy);
      const when = translateText(row.when_to_apply);

      db.run(
        `UPDATE counter_tactics
         SET counter_name = ?,
             detailed_strategy = ?,
             when_to_apply = ?
         WHERE id = ?`,
        [name, strategy, when, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} counter tactic düzeltildi`);
            fixPressingZones();
          }
        }
      );
    });
  });
}

function fixPressingZones() {
  console.log('\n4. Pressing Trap Zones düzeltiliyor...');

  db.all('SELECT * FROM pressing_trap_zones', [], (err, rows) => {
    if (err) {
      fixPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const name = translateText(row.trap_name);
      const exec = translateText(row.trap_execution);

      db.run(
        `UPDATE pressing_trap_zones
         SET trap_name = ?,
             trap_execution = ?
         WHERE id = ?`,
        [name, exec, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} pressing zone düzeltildi`);
            fixPossessionTactics();
          }
        }
      );
    });
  });
}

function fixPossessionTactics() {
  console.log('\n5. Possession Tactics düzeltiliyor...');

  db.all('SELECT * FROM possession_tactics', [], (err, rows) => {
    if (err) {
      fixNonPossessionTactics();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const circ = translateText(row.circulation_patterns);
      const prog = translateText(row.progression_patterns);

      db.run(
        `UPDATE possession_tactics
         SET circulation_patterns = ?,
             progression_patterns = ?
         WHERE id = ?`,
        [circ, prog, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} possession tactic düzeltildi`);
            fixNonPossessionTactics();
          }
        }
      );
    });
  });
}

function fixNonPossessionTactics() {
  console.log('\n6. Non-Possession Tactics düzeltiliyor...');

  db.all('SELECT * FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      finishUp();
      return;
    }

    let processed = 0;
    let updated = 0;

    rows.forEach(row => {
      const def = translateText(row.defensive_philosophy);
      const press = translateText(row.pressing_philosophy);

      db.run(
        `UPDATE non_possession_tactics
         SET defensive_philosophy = ?,
             pressing_philosophy = ?
         WHERE id = ?`,
        [def, press, row.id],
        function(updateErr) {
          if (!updateErr && this.changes > 0) {
            updated++;
            totalUpdated++;
          }
          processed++;
          if (processed === rows.length) {
            console.log(`✅ ${updated}/${rows.length} non-possession tactic düzeltildi`);
            finishUp();
          }
        }
      );
    });
  });
}

function finishUp() {
  console.log('\n' + '═'.repeat(70));
  console.log(`\n✅ TOPLAM ${totalUpdated} KAYIT AGRESİF ŞEKİLDE DÜZELTİLDİ!\n`);
  console.log('═'.repeat(70) + '\n');
  process.exit(0);
}
