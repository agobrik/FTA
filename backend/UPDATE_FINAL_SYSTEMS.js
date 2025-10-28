const db = require('./ultra_database');

console.log('KALAN 19 SISTEMI GUNCELLIYOR UM...\n');

const finalSystems = [
  {id: 41, in_possession_shape: "Pivot'la dar 4-1-4-1", out_of_possession_shape: "4-1-4-1 kompakt orta blok"},
  {id: 42, in_possession_shape: "Dar merkez 4-4-2", out_of_possession_shape: "4-4-2 dar kompakt"},
  {id: 43, in_possession_shape: "Kanat bekleri cok yuksek 3-5-2", out_of_possession_shape: "5-3-2 dengeli"},
  {id: 44, in_possession_shape: "Asimetrik wing-back'ler 3-4-3", out_of_possession_shape: "5-2-3 yuksek baski"},
  {id: 45, in_possession_shape: "Pivot dusuk 4-3-3", out_of_possession_shape: "4-5-1 kompakt"},
  {id: 46, in_possession_shape: "Teknik kontrol 4-2-3-1", out_of_possession_shape: "4-4-1-1 orta blok"},
  {id: 47, in_possession_shape: "Yuksek tempolu 4-3-3", out_of_possession_shape: "4-3-3 yuksek agresif"},
  {id: 48, in_possession_shape: "Inverted full-back'ler 4-3-3", out_of_possession_shape: "4-4-2 kompakt"},
  {id: 49, in_possession_shape: "Kanatlar genisle 3-4-3", out_of_possession_shape: "5-4-1 kompakt"},
  {id: 50, in_possession_shape: "Dengeli akiskan 4-3-3", out_of_possession_shape: "4-5-1 orta blok"},
  {id: 51, in_possession_shape: "Bekler yuksek 4-2-3-1", out_of_possession_shape: "4-4-2 yuksek baski"},
  {id: 52, in_possession_shape: "Kontrol edici 3-5-2", out_of_possession_shape: "5-3-2 kompakt orta"},
  {id: 53, in_possession_shape: "Asimetrik overload 4-3-3", out_of_possession_shape: "4-5-1 dengeli"},
  {id: 54, in_possession_shape: "Wing-back'ler yuksek 3-4-3", out_of_possession_shape: "5-4-1 derin blok"},
  {id: 55, in_possession_shape: "Kanatlar ici kesme 4-3-3", out_of_possession_shape: "4-4-2 kompakt"},
  {id: 56, in_possession_shape: "Double pivot dengeli 4-2-3-1", out_of_possession_shape: "4-4-1-1 orta blok"},
  {id: 57, in_possession_shape: "Yuksek kanat bekleri 3-5-2", out_of_possession_shape: "5-3-2 solid"},
  {id: 58, in_possession_shape: "Hizli gecis 4-3-3", out_of_possession_shape: "4-5-1 kompakt"},
  {id: 59, in_possession_shape: "Elmas orta saha 4-4-2", out_of_possession_shape: "4-4-2 kompakt dar"}
];

let updated = 0;

function updateSystem(index) {
  if (index >= finalSystems.length) {
    console.log(`\nTOPLAM ${updated}/19 sistem guncellendi!`);
    console.log('\nTum 59 taktik sistem artik Turkce!\n');
    process.exit(0);
    return;
  }

  const sys = finalSystems[index];

  db.run(
    `UPDATE tactical_systems
     SET in_possession_shape = ?,
         out_of_possession_shape = ?
     WHERE id = ?`,
    [sys.in_possession_shape, sys.out_of_possession_shape, sys.id],
    function(err) {
      if (err) {
        console.log(`HATA [${sys.id}]`);
      } else if (this.changes > 0) {
        console.log(`OK [${sys.id}]`);
        updated++;
      }
      updateSystem(index + 1);
    }
  );
}

updateSystem(0);
