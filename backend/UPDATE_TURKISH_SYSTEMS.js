const db = require('./ultra_database');

// İlk 16 sistemin güncellenmiş Türkçe versiyonları
const updatedSystems = [
  // PART1 - 3 sistem
  {
    name: "4-2-3-1 Guardiola Possession",
    in_possession_shape: "Asimetrik 3-2-5 / 2-3-5 şekli - inverted bekler orta sahada sayısal üstünlük yaratır, kanatlar geniş ve yüksek, false 9 geriye düşer",
    out_of_possession_shape: "4-4-2 / 4-2-3-1 kompakt orta blok veya oyun durumuna göre yüksek baskı",
    transition_attack: "Boştaki en yakın oyuncuya anında ileri pas, uzun top yok, kademeli olarak üçte birlik bölgelerden kur",
    transition_defense: "Topun etrafında 4-6 oyuncuyla anında karşı baskı (gegenpress), başarısız olursa hemen orta bloğa çekilme"
  },
  {
    name: "4-3-3 Klopp Gegenpressing",
    in_possession_shape: "Yüksek beklerle 2-3-5 oluşturan 4-3-3, geniş forvetler savunmayı gerer, hızlı dikey paslar",
    out_of_possession_shape: "Tetiklemeye göre 4-3-3 yüksek baskı veya 4-5-1 orta blok, kompakt ve agresif",
    transition_attack: "Top kazanımı → anında dikey pas veya taşıma, rakip organize olmadan boşlukları kullan, hız kritik",
    transition_defense: "GEGENPRESS - 6 saniyede geri alma, başarısızsa sprint geri, hızlıca yeniden organize"
  },
  {
    name: "3-5-2 Conte Wing-Back System",
    in_possession_shape: "Wing-backler yüksekte 3-5-2, hücumda 3-2-5 oluşturur, merkez orta saha bazen stoperler arasına düşer",
    out_of_possession_shape: "5-3-2 kompakt orta blok, wing-backler geri çekilir, dar ve kırması zor",
    transition_attack: "Forverlere hızlı ileri paslar, wing-backler kanatlara sprint, rakibin bıraktığı boşlukları kullan",
    transition_defense: "Wing-backler geri sprint, üç stoper hattı tutar, orta saha alanı sıkıştırır, mümkünse karşı bas"
  },
  // BATCH2 - 7 sistem
  {
    name: "4-3-3 Ancelotti Balanced",
    in_possession_shape: "Bekler ileriye çıkar 4-3-3, önde üçlü savunmayı gerer, orta saha tempoyu kontrol eder",
    out_of_possession_shape: "4-4-2 / 4-5-1 orta blok, kompakt şekil, kanatlar geri gelir",
    transition_attack: "Hızlı ama kontrollü, bekleri ve orta sahayı kullan, boşluk varsa forverlere direkt paslar",
    transition_defense: "Organize geri çekilme, şekli koru, uygun olduğunda bas"
  },
  {
    name: "4-2-3-1 Mourinho Defensive",
    in_possession_shape: "4-2-3-1 ama temkinli, fazla ilerleme, savunma dengesini koru",
    out_of_possession_shape: "4-4-2 / 4-5-1 kompakt orta blok, merkezde alan verme, kanatlara zorla",
    transition_attack: "HIZLI kontra ataklar, hızlı forverlere direkt toplar, boşluğu anında kullan",
    transition_defense: "Hızlı geri çekilme, herkes geri, bloğu organize et, güvenli değilse basma"
  },
  {
    name: "5-3-2 Mourinho Bus",
    in_possession_shape: "Nadiren topa sahip, sahip olduğunda - 5-3-2 ama çok derin, forverlere uzun toplar",
    out_of_possession_shape: "5-4-1 veya 5-3-2 ultra alçak blok, iki sıra dörtlü, son derece kompakt, tüm alanı kapat",
    transition_attack: "Nadir geçişler, hedef adama uzun toplar, ara sıra derinlikten koşanlar",
    transition_defense: "Zaten savunmada, ultra kompakt şekli koru, risk yok"
  },
  {
    name: "3-4-2-1 Tuchel Compact",
    in_possession_shape: "Wing-backler yüksekte 3-4-2-1 / 3-2-4-1, hatlar arası iki 10 numara, tek forvet",
    out_of_possession_shape: "5-2-2-1 / 5-4-1 kompakt orta blok, wing-backler düşer, kanatlarda baskı tuzakları",
    transition_attack: "Sabırlı oyun kurma, wing-backleri kullan, 10 numaralar cepleri bulur, fırsat bekle",
    transition_defense: "Hızlıca kompakt şekil, wing-backler geri çekil, pas yollarını kapat, tetiklenirse baskı tuzağı"
  },
  {
    name: "4-3-1-2 Ancelotti Diamond",
    in_possession_shape: "Bekler üstlenerek genişlik yaratan 4-3-1-2, orta sahada elmas, iki forvet",
    out_of_possession_shape: "4-4-2 / 4-1-4-1 dar elmas, kompakt, ortayı kapat",
    transition_attack: "Elmas üzerinden hızlı paslaşma, Pirlo hücumları başlatır, ileri oyuncular kombine olur",
    transition_defense: "Kompakt elmas şekli, kanatlara zorla, merkezi koru"
  },
  {
    name: "4-3-3 Arteta Inverted FB",
    in_possession_shape: "Zinchenko orta sahaya geçerek 3-2-5 / 2-3-5, geniş forvetler yüksekte, merkezde aşırı yüklenme",
    out_of_possession_shape: "4-4-2 / 4-3-3 yüksek baskı, kompakt, top kaybı zorla",
    transition_attack: "Hızlı dikey paslar, yarı kanatları kullan, üçüncü adam koşuları, hızlı ilerleme",
    transition_defense: "Anında karşı baskı, başarısızsa hızlı geri çekilme, yüksek hattı organize et"
  },
  {
    name: "4-2-3-1 Ten Hag Possession",
    in_possession_shape: "Bir CDM daha derin 4-2-3-1 / 4-1-2-3, kanatlar geniş, hızlı dikey ilerleme",
    out_of_possession_shape: "4-4-2 kompakt yüksek baskı, top kaybı zorla, hızlı karşı baskı",
    transition_attack: "HIZLI dikey paslar, boşlukları hemen kullan, yavaş döndürme",
    transition_defense: "Hemen karşı bas, başarısızsa hızlıca organize ol, yüksek hat sürdürülür"
  },
  // BATCH3 - 6 sistem
  {
    name: "4-1-4-1 Simeone Defensive",
    in_possession_shape: "4-1-4-1 / 4-4-2 temkinli oyun kurma, direkt uzun toplar tercih edilir, minimum risk",
    out_of_possession_shape: "4-4-1-1 / 4-4-2 ultra kompakt alçak blok, çifte dörtlü hat, tüm merkezi alanı kapat",
    transition_attack: "HIZLI direkt kontralar, forvete uzun toplar, orta sahadan koşanlar arkadaki boşluğu kullanır",
    transition_defense: "Zaten savunmada, herkes anında geri, kompakt bloğu hemen yeniden oluştur"
  },
  {
    name: "3-4-3 Gasperini Attack",
    in_possession_shape: "Wing-backler son derece yüksek 3-4-3 / 3-2-5, önde üçlü kombine oluyor, dikey ilerleme",
    out_of_possession_shape: "3-4-3 ultra yüksek baskı, adam adam yönlü işaretleme, alanı sıkıştır, hata zorla",
    transition_attack: "ANINDA hızlı dikey hücum, stoper ve bek arası boşlukları kullan, kombinasyon oyunu",
    transition_defense: "Hemen yüksek bas, geçilirse sprint geri, agresif toparlanma"
  },
  {
    name: "4-4-2 Ranieri Leicester Miracle",
    in_possession_shape: "Sabırlı 4-4-2, mümkün olduğunda Vardy'ye direkt toplar, Mahrez driblingler yapar",
    out_of_possession_shape: "Kompakt 4-4-2, orta saha hattı orta çizgide, kanatlara zorla, pas yollarını kes, hata bekle",
    transition_attack: "ŞİMŞEK HIZINDA - kanalları koşan Vardy'e anında top, Mahrez destekler, klinik bitiricilik",
    transition_defense: "Organize geri çekilme, kompakt şekli koru, dörtlü hatlar, disiplinli"
  },
  {
    name: "4-3-3 Zidane Balanced Pragmatic",
    in_possession_shape: "Dengeli 4-3-3, Marcelo yüksek, Kroos-Modric kontrol, BBC hücum tehdidi",
    out_of_possession_shape: "Dengeli orta blok 4-4-2 / 4-5-1, Casemiro kalkan, organize",
    transition_attack: "Dengeli ilerleme, orta saha kalitesini kullan, uygun olduğunda BBC'ye direkt",
    transition_defense: "Organize geri çekilme, Casemiro kalkan, şekli koru"
  },
  {
    name: "3-5-2 Inzaghi Modern Flexible",
    in_possession_shape: "Wing-backler yüksek 3-5-2 / 3-2-5, orta saha rotasyonları, akışkan hareket",
    out_of_possession_shape: "Organize orta blok 5-3-2 / 5-4-1, wing-backler düşer, kompakt",
    transition_attack: "Hızlı dikey ilerleme, wing-backler sprint yukarı, boşluğu kullan",
    transition_defense: "Organize geri çekilme, wing-backler geri, kompakt blok oluştur"
  },
  {
    name: "4-3-3 Flick High Press Vertical",
    in_possession_shape: "Dikey 4-3-3, hızlı ileri paslar, her zaman derinlik ara, Davies üstlenir",
    out_of_possession_shape: "Çiftlerle ultra yüksek baskı 4-3-3, rakipleri yorma, anında hata zorla",
    transition_attack: "ANINDA dikey paslar, rakip organize olmadan boşluğu kullan, 10 saniyelik goller",
    transition_defense: "Çiftlerle hemen bas, geçilirse Davies hızla kurtar, Neuer süpürür"
  }
];

console.log('🔄 16 TAKTİK SİSTEMİ TÜRKÇE OLARAK GÜNCELLENİYOR...\n');

let updated = 0;
let errors = 0;

updatedSystems.forEach((system, index) => {
  const sql = `UPDATE tactical_systems
               SET in_possession_shape = ?,
                   out_of_possession_shape = ?,
                   transition_attack = ?,
                   transition_defense = ?
               WHERE name = ?`;

  db.run(sql, [
    system.in_possession_shape,
    system.out_of_possession_shape,
    system.transition_attack,
    system.transition_defense,
    system.name
  ], function(err) {
    if (err) {
      console.log(`❌ ${system.name} - HATA: ${err.message}`);
      errors++;
    } else if (this.changes > 0) {
      console.log(`✅ ${index + 1}/16 - ${system.name} güncellendi`);
      updated++;
    } else {
      console.log(`⚠️  ${system.name} - Bulunamadı`);
    }

    // Son sistem güncellendiğinde özeti göster
    if (index === updatedSystems.length - 1) {
      setTimeout(() => {
        console.log(`\n📊 ÖZET:`);
        console.log(`   ✅ Güncellenen: ${updated}`);
        console.log(`   ❌ Hata: ${errors}`);
        console.log(`   ⚠️  Bulunamayan: ${updatedSystems.length - updated - errors}`);
        console.log(`\n✨ İlk 16 sistem Türkçe'ye çevrildi!`);
        process.exit(0);
      }, 1000);
    }
  });
});
