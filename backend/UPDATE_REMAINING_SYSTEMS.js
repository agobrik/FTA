const db = require('./ultra_database');

console.log('KALAN 43 SISTEMI TURKCEYE CEVIRIYORUM...\n');

const systemTranslations = [
  {
    id: 17,
    name: "4-3-3 Mourinho Inter Treble",
    in_possession_shape: "Sneijder'in geri düştüğü 4-3-3",
    out_of_possession_shape: "4-4-1-1 kompakt derin blok"
  },
  {
    id: 18,
    name: "4-4-2 Sacchi Pressing Machine",
    in_possession_shape: "4-4-2 dengeli kompakt",
    out_of_possession_shape: "4-4-2 ultra yüksek hat kompakt"
  },
  {
    id: 19,
    name: "3-4-3 Cruyff Dream Team",
    in_possession_shape: "Rotasyonlu pozisyonlarla 3-4-3",
    out_of_possession_shape: "5-2-3 yüksek baskı"
  },
  {
    id: 20,
    name: "4-3-3 Van Gaal Ajax 1995",
    in_possession_shape: "4-3-3 pozisyonel kontrol",
    out_of_possession_shape: "4-5-1 kompakt orta blok"
  },
  {
    id: 21,
    name: "3-3-1-3 Bielsa Chile",
    in_possession_shape: "Kanat bekleri yüksek geniş 3-3-1-3",
    out_of_possession_shape: "5-3-2 adam adama işaretleme"
  },
  {
    id: 22,
    name: "4-2-2-2 Rangnick RB Leipzig",
    in_possession_shape: "4-2-2-2 dar koridorlar",
    out_of_possession_shape: "4-4-2 kompakt yüksek baskı"
  },
  {
    id: 23,
    name: "3-4-2-1 Nagelsmann Asymmetric",
    in_possession_shape: "3-2-5 asimetrik aşırı yüklenme",
    out_of_possession_shape: "5-4-1 dengeli"
  },
  {
    id: 24,
    name: "2-3-5 Piramit - WM Öncesi",
    in_possession_shape: "2-3-5 yayılmış",
    out_of_possession_shape: "2-3-5 minimal savunma organizasyonu"
  },
  {
    id: 25,
    name: "WM Formation - Chapman Arsenal",
    in_possession_shape: "WM - W forvet, M orta saha",
    out_of_possession_shape: "WM kompakt"
  },
  {
    id: 26,
    name: "4-2-3-1 Pochettino Tottenham High Press",
    in_possession_shape: "Bekler yüksek 4-2-3-1",
    out_of_possession_shape: "4-4-1-1 yüksek kompakt baskı"
  },
  {
    id: 27,
    name: "3-4-3 Conte Chelsea 2016-17",
    in_possession_shape: "Kanat bekleri çok yüksek 3-4-3",
    out_of_possession_shape: "5-4-1 kompakt sağlam"
  },
  {
    id: 28,
    name: "4-3-3 Zeman Ultra-Attacking",
    in_possession_shape: "Herkes ileriye 2-3-5",
    out_of_possession_shape: "4-3-3 minimal savunma"
  },
  {
    id: 29,
    name: "4-4-2 Ferguson United Dynasty",
    in_possession_shape: "Kanatlar geniş 4-4-2",
    out_of_possession_shape: "4-4-2 çalışkan kompakt"
  },
  {
    id: 30,
    name: "5-3-2 Trapattoni Defensive Block",
    in_possession_shape: "5-3-2 temkinli yapı",
    out_of_possession_shape: "5-3-2 ultra derin blok"
  },
  {
    id: 31,
    name: "4-2-3-1 Heynckes Bayern Treble",
    in_possession_shape: "Robben-Ribery geniş 4-2-3-1",
    out_of_possession_shape: "4-4-1-1 kompakt baskı"
  },
  {
    id: 32,
    name: "4-3-3 Bosz Ajax Spectacle",
    in_possession_shape: "Yüksek üçgenlerle 4-3-3",
    out_of_possession_shape: "4-3-3 ultra yüksek baskı"
  },
  {
    id: 33,
    name: "4-3-3 Mancini Italy EURO 2020",
    in_possession_shape: "Bekler yüksek 4-3-3",
    out_of_possession_shape: "4-5-1 dengeli blok"
  },
  {
    id: 34,
    name: "4-3-3 Arteta Arsenal Modern",
    in_possession_shape: "Zinchenko içe keserek 3-2-5",
    out_of_possession_shape: "4-4-2 kompakt baskı"
  },
  {
    id: 35,
    name: "3-4-3 De Zerbi Brighton Possession",
    in_possession_shape: "Kaleci katılımıyla 3-4-3",
    out_of_possession_shape: "5-2-3 yüksek baskı"
  },
  {
    id: 36,
    name: "4-3-3 Spalletti Napoli Scudetto 2023",
    in_possession_shape: "Geniş kanatlar yüksek 4-3-3",
    out_of_possession_shape: "4-5-1 kompakt orta blok"
  },
  {
    id: 37,
    name: "4-3-3 Postecoglou Tottenham Attack",
    in_possession_shape: "Asimetrik beklerle 4-3-3",
    out_of_possession_shape: "4-3-3 yüksek agresif baskı"
  },
  {
    id: 38,
    name: "3-5-2 Pioli AC Milan Balanced",
    in_possession_shape: "Kanat bekleri yüksek 3-5-2",
    out_of_possession_shape: "5-3-2 dengeli blok"
  },
  {
    id: 39,
    name: "4-2-3-1 Flick Bayern Treble 2020",
    in_possession_shape: "Yüksek tempolu 4-2-3-1",
    out_of_possession_shape: "4-4-2 ultra yüksek baskı"
  },
  {
    id: 40,
    name: "4-3-3 Emery Villarreal Europa Win",
    in_possession_shape: "Dengeli kontrollü 4-3-3",
    out_of_possession_shape: "4-4-2 orta blok"
  }
];

let updated = 0;
let errors = 0;

function updateSystem(index) {
  if (index >= systemTranslations.length) {
    console.log(`\nOZET:`);
    console.log(`   Guncellenen: ${updated}`);
    console.log(`   Hata: ${errors}`);
    console.log(`\nKalan sistemler icin devam ediyorum...`);
    process.exit(0);
    return;
  }

  const sys = systemTranslations[index];

  db.run(
    `UPDATE tactical_systems
     SET in_possession_shape = ?,
         out_of_possession_shape = ?
     WHERE id = ?`,
    [sys.in_possession_shape, sys.out_of_possession_shape, sys.id],
    function(err) {
      if (err) {
        console.log(`❌ [${sys.id}] ${sys.name} - HATA`);
        errors++;
      } else if (this.changes > 0) {
        console.log(`✅ [${sys.id}] ${sys.name}`);
        updated++;
      }
      updateSystem(index + 1);
    }
  );
}

updateSystem(0);
