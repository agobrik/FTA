const db = require('./ultra_database');

console.log('NON-POSSESSION TACTICS INGILIZCE ALANLARI DUZELTILIYOR...\n');

// Ingilizce alanlari Turkceye cevir
const sql = `
UPDATE non_possession_tactics
SET
  out_of_possession_width = REPLACE(REPLACE(out_of_possession_width, 'Narrow to press', 'Baski icin dar'), 'Wide', 'Genis'),
  out_of_possession_depth = REPLACE(REPLACE(out_of_possession_depth, 'High and compressed', 'Yuksek ve sikistirilmis'), 'Deep block', 'Derin blok'),
  out_of_possession_compactness = REPLACE(out_of_possession_compactness, 'Very compact horizontally and vertically', 'Yatay ve dikey cok kompakt'),
  out_of_possession_gk_role = REPLACE(REPLACE(REPLACE(
    out_of_possession_gk_role,
    'Sweeper-keeper. High starting position. Covers space behind.',
    'Supurucu kaleci. Yuksek baslangic pozisyonu. Arkadaki alani kapatir.'),
    'Sweeper-keeper', 'Supurucu kaleci'),
    'High starting position', 'Yuksek baslangic pozisyonu'),
  recovery_speed = REPLACE(REPLACE(
    recovery_speed,
    'High-speed recovery. Immediate sprints.',
    'Yuksek hizda toparlanma. Aninda sprintler.'),
    'High-speed recovery', 'Yuksek hizda toparlanma'),
  when_to_drop_deep = REPLACE(
    when_to_drop_deep,
    'Rarely. Only when facing pace directly or on transitions.',
    'Nadiren. Sadece dogrudan hiz ile karsilasirken veya gecislerde.'),
  when_to_step_up = REPLACE(REPLACE(
    when_to_step_up,
    'Constantly. Maintain high line. Squeeze space. Offside trap ready.',
    'Surekli. Yuksek hatti koru. Alani sikistir. Ofsayt tuzagi hazir.'),
    'Constantly', 'Surekli'),
  when_to_press_high = REPLACE(
    when_to_press_high,
    'Always. High line enables high press. Compress space.',
    'Her zaman. Yuksek hat yuksek baski saglar. Alani sikistir.'),
  when_to_stay_compact = REPLACE(
    when_to_stay_compact,
    'When ball wide. Shift as unit. Maintain compactness.',
    'Top kenarda. Birim olarak kayma. Kompaktligi koru.')
WHERE id > 0
`;

db.run(sql, [], function(err) {
  if (err) {
    console.log('HATA:', err.message);
    process.exit(1);
  }

  console.log(`\n${this.changes} kayit guncellendi!`);

  // Array alanlarini da duzelt
  console.log('\nArray alanlari duzeltiliyor...\n');

  db.all('SELECT id FROM non_possession_tactics', [], (err, rows) => {
    if (err) {
      console.log('HATA:', err.message);
      return;
    }

    let processedCount = 0;

    rows.forEach((row, index) => {
      const updates = {
        out_of_possession_defender_roles: '["Yuksek savunma hatti","Birlikte yuksel","Ofsayt tuzagi oyna","Agresif savunma"]',
        out_of_possession_midfielder_roles: '["Agresif baski","Pas yollarini kes","Topu erken kazan","Yuksek enerji"]',
        out_of_possession_attacker_roles: '["Baskiya on ayak ol","Baski tetikle","Hata zorlama","Yuksek calisma orani"]',
        recovery_run_priorities: '["Once merkez alanlar","Kutuyu koru","Kosanlari takip et","Genis alanlari kapat","Savunma sekli"]',
        counter_press_zones: '["Top kaybinin etrafindaki anlik alan","10 yard yaricap","3+ oyuncu","Sahanin her yerinde"]'
      };

      const updateSql = `UPDATE non_possession_tactics
                         SET out_of_possession_defender_roles = ?,
                             out_of_possession_midfielder_roles = ?,
                             out_of_possession_attacker_roles = ?,
                             recovery_run_priorities = ?,
                             counter_press_zones = ?
                         WHERE id = ?`;

      db.run(updateSql, [
        updates.out_of_possession_defender_roles,
        updates.out_of_possession_midfielder_roles,
        updates.out_of_possession_attacker_roles,
        updates.recovery_run_priorities,
        updates.counter_press_zones,
        row.id
      ], function(err) {
        processedCount++;
        if (processedCount % 10 === 0) {
          console.log(`${processedCount}/${rows.length} kayit islendi...`);
        }

        if (processedCount === rows.length) {
          console.log(`\nTOPLAM ${rows.length} kayit basariyla guncellendi!`);
          console.log('\nNON-POSSESSION TACTICS TAMAMLANDI!\n');
          process.exit(0);
        }
      });
    });
  });
});
