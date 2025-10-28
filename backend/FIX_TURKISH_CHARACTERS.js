const db = require('./ultra_database');

console.log('=== TURKCE KARAKTERLER DUZELTILIYOR ===\n');

// Tum tablolari tara ve duzelt
const tables = [
  {
    name: 'tactical_systems',
    columns: ['in_possession_shape', 'out_of_possession_shape', 'transition_attack', 'transition_defense',
              'corner_attack_strategy', 'corner_defense_strategy', 'free_kick_strategy']
  },
  {
    name: 'system_weaknesses',
    columns: ['weakness_type', 'weakness_description', 'how_to_exploit']
  },
  {
    name: 'pressing_trap_zones',
    columns: ['trap_name', 'trap_zone', 'trap_trigger', 'trap_setup', 'trap_execution',
              'player_roles_involved', 'success_rate_high_against', 'success_rate_low_against']
  },
  {
    name: 'possession_tactics',
    columns: ['circulation_patterns', 'progression_patterns', 'overload_patterns']
  },
  {
    name: 'non_possession_tactics',
    columns: ['defensive_philosophy', 'pressing_philosophy', 'counter_attack_philosophy',
              'where_to_press', 'when_to_press', 'how_to_press', 'pressing_traps']
  },
  {
    name: 'counter_tactics',
    columns: ['counter_name', 'detailed_strategy', 'when_to_apply']
  }
];

function fixTurkishChars(text) {
  if (!text) return text;

  // Yanlis yazilmis Turkce karakterleri duzelt
  text = text.replace(/cok/gi, 'çok');
  text = text.replace(/yuksek/gi, 'yüksek');
  text = text.replace(/duşer/gi, 'düşer');
  text = text.replace(/duser/gi, 'düşer');
  text = text.replace(/bolge/gi, 'bölge');
  text = text.replace(/bolgeleri/gi, 'bölgeleri');
  text = text.replace(/genis/gi, 'geniş');
  text = text.replace(/ucte/gi, 'üçte');
  text = text.replace(/uc /gi, 'üç ');
  text = text.replace(/dort/gi, 'dört');
  text = text.replace(/besli/gi, 'beşli');
  text = text.replace(/alti/gi, 'altı');
  text = text.replace(/yogun/gi, 'yoğun');
  text = text.replace(/baski/gi, 'baskı');
  text = text.replace(/baskirall/gi, 'baskı');
  text = text.replace(/hatti/gi, 'hattı');
  text = text.replace(/sirasi/gi, 'sırası');
  text = text.replace(/sirada/gi, 'sırada');
  text = text.replace(/ikisi/gi, 'ikisi');
  text = text.replace(/ustu/gi, 'üstü');
  text = text.replace(/ustune/gi, 'üstüne');
  text = text.replace(/ustle/gi, 'üstle');
  text = text.replace(/sonra/gi, 'sonra');
  text = text.replace(/once/gi, 'önce');
  text = text.replace(/onu/gi, 'önü');
  text = text.replace(/gole/gi, 'göle');
  text = text.replace(/ortusu/gi, 'örtüsü');
  text = text.replace(/oluştur/gi, 'oluştur');
  text = text.replace(/olustur/gi, 'oluştur');
  text = text.replace(/karisim/gi, 'karışım');
  text = text.replace(/zorlasti/gi, 'zorlaştı');
  text = text.replace(/hizli/gi, 'hızlı');
  text = text.replace(/hiza/gi, 'hıza');
  text = text.replace(/cikis/gi, 'çıkış');
  text = text.replace(/cekil/gi, 'çekil');
  text = text.replace(/asiri/gi, 'aşırı');
  text = text.replace(/yukle/gi, 'yükle');
  text = text.replace(/agir/gi, 'ağır');
  text = text.replace(/sicak/gi, 'sıcak');
  text = text.replace(/soguk/gi, 'soğuk');
  text = text.replace(/kullanir/gi, 'kullanır');
  text = text.replace(/gorer/gi, 'görür');
  text = text.replace(/acar/gi, 'açar');
  text = text.replace(/kapar/gi, 'kapar');
  text = text.replace(/sikistir/gi, 'sıkıştır');
  text = text.replace(/sikistirilmis/gi, 'sıkıştırılmış');
  text = text.replace(/sabir/gi, 'sabır');
  text = text.replace(/mukemmel/gi, 'mükemmel');
  text = text.replace(/guncelle/gi, 'güncelle');
  text = text.replace(/olcude/gi, 'ölçüde');
  text = text.replace(/onemli/gi, 'önemli');
  text = text.replace(/buyuk/gi, 'büyük');
  text = text.replace(/kucuk/gi, 'küçük');
  text = text.replace(/ic /gi, 'iç ');
  text = text.replace(/dis /gi, 'dış ');
  text = text.replace(/su /gi, 'şu ');
  text = text.replace(/gun /gi, 'gün ');
  text = text.replace(/gecis/gi, 'geçiş');
  text = text.replace(/hucum/gi, 'hücum');
  text = text.replace(/savunmasiz/gi, 'savunmasız');
  text = text.replace(/ofsayt/gi, 'ofsayt');
  text = text.replace(/ozgur/gi, 'özgür');
  text = text.replace(/dikkat/gi, 'dikkat');
  text = text.replace(/hazirligi/gi, 'hazırlığı');
  text = text.replace(/sagla/gi, 'sağla');
  text = text.replace(/dogru/gi, 'doğru');
  text = text.replace(/yanlis/gi, 'yanlış');
  text = text.replace(/guvenli/gi, 'güvenli');
  text = text.replace(/tehlikeli/gi, 'tehlikeli');
  text = text.replace(/olumcul/gi, 'ölümcül');
  text = text.replace(/guncelliyor/gi, 'güncelleniyor');
  text = text.replace(/cevriliyor/gi, 'çevriliyor');
  text = text.replace(/duzelt/gi, 'düzelt');
  text = text.replace(/kontrol/gi, 'kontrol');
  text = text.replace(/simdiki/gi, 'şimdiki');
  text = text.replace(/sonraki/gi, 'sonraki');
  text = text.replace(/ileri/gi, 'ileri');
  text = text.replace(/geri/gi, 'geri');

  // Ozel durumlar
  text = text.replace(/Top Hakimiyeti/gi, 'Top Hakimiyeti');
  text = text.replace(/Topsuz Faz/gi, 'Topsuz Faz');

  return text;
}

let totalUpdated = 0;
let tableIndex = 0;

function processNextTable() {
  if (tableIndex >= tables.length) {
    console.log(`\n=== TOPLAM ${totalUpdated} kayit guncellendi ===\n`);
    process.exit(0);
    return;
  }

  const table = tables[tableIndex];
  console.log(`${tableIndex + 1}. ${table.name} tablosu duzeltiliyor...`);

  db.all(`SELECT * FROM ${table.name}`, [], (err, rows) => {
    if (err) {
      console.log(`  HATA:`, err.message);
      tableIndex++;
      processNextTable();
      return;
    }

    let processed = 0;
    let updated = 0;

    if (rows.length === 0) {
      console.log(`  0 kayit bulundu\n`);
      tableIndex++;
      processNextTable();
      return;
    }

    rows.forEach(row => {
      const updates = {};
      let hasChanges = false;

      table.columns.forEach(col => {
        if (row[col]) {
          const fixed = fixTurkishChars(row[col]);
          if (fixed !== row[col]) {
            updates[col] = fixed;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        const setClauses = Object.keys(updates).map(col => `${col} = ?`).join(', ');
        const values = Object.values(updates);
        values.push(row.id);

        db.run(
          `UPDATE ${table.name} SET ${setClauses} WHERE id = ?`,
          values,
          function(err) {
            if (!err && this.changes > 0) {
              updated++;
              totalUpdated++;
            }

            processed++;
            if (processed === rows.length) {
              console.log(`  ${updated}/${rows.length} kayit guncellendi\n`);
              tableIndex++;
              processNextTable();
            }
          }
        );
      } else {
        processed++;
        if (processed === rows.length) {
          console.log(`  ${updated}/${rows.length} kayit guncellendi\n`);
          tableIndex++;
          processNextTable();
        }
      }
    });
  });
}

processNextTable();
