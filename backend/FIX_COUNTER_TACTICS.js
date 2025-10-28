const db = require('./ultra_database');

console.log('COUNTER TACTICS TURKCEYE CEVRILIYOR...\n');

db.all('SELECT * FROM counter_tactics ORDER BY id', [], (err, rows) => {
  if (err) {
    console.log('HATA:', err.message);
    process.exit(1);
  }

  console.log(`Toplam ${rows.length} counter tactic bulundu.\n`);

  let processed = 0;
  let updated = 0;

  rows.forEach((row) => {
    let detailed = row.detailed_strategy || '';
    let when = row.when_to_apply || '';
    let instructions = row.player_instructions || '';

    // Temel cumle cevirileri
    detailed = detailed.replace(/Park the bus/gi, 'Otobus koy');
    detailed = detailed.replace(/ultra-compact/gi, 'ultra kompakt');
    detailed = detailed.replace(/Deny all space/gi, 'Tum alanlari kapat');
    detailed = detailed.replace(/Absorb sustained pressure/gi, 'Surekli baski em');
    detailed = detailed.replace(/Counter-attack explosively/gi, 'Patlayici kontra atak');
    detailed = detailed.replace(/with pace/gi, 'hiz ile');
    detailed = detailed.replace(/Requires incredible discipline/gi, 'Inanilmaz disiplin gerektirir');
    detailed = detailed.replace(/Completely bypass/gi, 'Tamamen atla');
    detailed = detailed.replace(/high press/gi, 'yuksek baski');
    detailed = detailed.replace(/direct long balls/gi, 'direkt uzun toplar');
    detailed = detailed.replace(/target man/gi, 'hedef adam');
    detailed = detailed.replace(/holds up/gi, 'bekler');
    detailed = detailed.replace(/brings others in/gi, 'digerlerini oyuna katar');
    detailed = detailed.replace(/Patient possession/gi, 'Sabir li sahiplik');
    detailed = detailed.replace(/safe zones/gi, 'guvenli bolgeler');
    detailed = detailed.replace(/pressing triggers/gi, 'baski tetikleyicileri');
    detailed = detailed.replace(/Never play short/gi, 'Asla kisa oynama');
    detailed = detailed.replace(/out from back/gi, 'arkadan');
    detailed = detailed.replace(/when pressed/gi, 'baski aldiginda');

    // when_to_apply
    when = when.replace(/When significantly outmatched/gi, 'Onemli olcude guc farkinda');
    when = when.replace(/in quality/gi, 'kalite olarak');
    when = when.replace(/Big matches/gi, 'Buyuk maclar');
    when = when.replace(/vs elite possession teams/gi, 'elit sahiplik takimlarina karsi');
    when = when.replace(/When needing just one goal/gi, 'Sadece bir gol gerektiginde');
    when = when.replace(/Against/gi, 'Karsi');
    when = when.replace(/When struggling/gi, 'Zorlandiginda');
    when = when.replace(/to play out from back/gi, 'arkadan oynamakta');

    // player_instructions - JSON string
    if (instructions && instructions.startsWith('{')) {
      try {
        let inst = JSON.parse(instructions);
        if (inst.Defense) inst.Defense = inst.Defense.replace(/Hold ultra-compact shape/gi, 'Ultra kompakt sekli koru')
                                                      .replace(/Never break lines/gi, 'Asla hatlari kirma')
                                                      .replace(/Discipline critical/gi, 'Disiplin kritik');
        if (inst.Midfield) inst.Midfield = inst.Midfield.replace(/Sit very deep/gi, 'Cok derin otur')
                                                         .replace(/Deny space between lines/gi, 'Hatlar arasi alani kapat')
                                                         .replace(/Quick release on turnover/gi, 'Top kaybi aninda hizli cikis');
        if (inst.Forwards) inst.Forwards = inst.Forwards.replace(/Stay high on halfway line/gi, 'Orta cizgide yuksek kal')
                                                         .replace(/Sprint on counter/gi, 'Kontrada sprint')
                                                         .replace(/Pace critical/gi, 'Hiz kritik');
        if (inst.Overall) inst.Overall = inst.Overall.replace(/Extreme patience required/gi, 'Asiri sabir gerekli')
                                                      .replace(/One mistake fatal/gi, 'Bir hata olumcul');
        if (inst.GK) inst.GK = inst.GK.replace(/Long distribution/gi, 'Uzun dagitim')
                                       .replace(/to target man/gi, 'hedef adama')
                                       .replace(/Never play short when pressed/gi, 'Baski altinda asla kisa oynama');
        if (inst.CBs) inst.CBs = inst.CBs.replace(/Direct passing/gi, 'Direkt paslar')
                                         .replace(/No risky dribbles/gi, 'Riskli driblingler yok')
                                         .replace(/Safety first/gi, 'Once guvenlik');
        if (inst.DM) inst.DM = inst.DM.replace(/Deep to receive/gi, 'Almak icin derine')
                                       .replace(/in safe zones only/gi, 'sadece guvenli bolgelerde')
                                       .replace(/Quick passes/gi, 'Hizli paslar');
        if (inst.TargetMan) inst.TargetMan = inst.TargetMan.replace(/Hold-up play/gi, 'Topa cikma')
                                                           .replace(/Win aerials/gi, 'Hava toplari kazan')
                                                           .replace(/Bring others into play/gi, 'Digerlerini oyuna kat');

        instructions = JSON.stringify(inst);
      } catch (e) {
        // JSON degil, skip
      }
    }

    // Genel kelime cevirileri
    detailed = detailed.replace(/\bthe\b/gi, '').replace(/\s+/g, ' ').trim();
    when = when.replace(/\bthe\b/gi, '').replace(/\s+/g, ' ').trim();

    db.run(
      `UPDATE counter_tactics
       SET detailed_strategy = ?,
           when_to_apply = ?,
           player_instructions = ?
       WHERE id = ?`,
      [detailed, when, instructions, row.id],
      function(err) {
        if (err) {
          console.log(`HATA [${row.id}]:`, err.message);
        } else if (this.changes > 0) {
          updated++;
          console.log(`[${updated}] ID:${row.id} guncellendi`);
        }

        processed++;
        if (processed === rows.length) {
          console.log(`\n\nTOPLAM ${updated} counter tactic guncellendi!`);
          console.log('COUNTER TACTICS TURKCE!\n');
          process.exit(0);
        }
      }
    );
  });
});
