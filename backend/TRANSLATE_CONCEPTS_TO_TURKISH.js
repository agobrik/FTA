const db = require('./ultra_database');

console.log('\n🔄 TACTICAL CONCEPTS TÜRKÇE ÇEVİRİ BAŞLIYOR...\n');

const turkishConcepts = [
  {
    id: 1,
    concept_name: 'Yarı Alanlar (Half-Spaces)',
    category: 'Boşluk Yönetimi',
    description: 'Merkez ile kanat arasındaki dikey koridorlar. Modern hücumda kritik, en tehlikeli bölgeler.',
    detailed_explanation: 'Yarı alanlar, merkez (14 numaralı zon) ile kanatlar arasındaki dikey kanallardır. Bu bölgeler, ileriye doğru paslar atmak, içeri kesmek ve şut çekmek için açılar sunar. Gollerin çoğu yarı alan penetrasyonundan gelir. Guardiola takımları buraları sürekli kullanır.',
    principles: JSON.stringify([
      'Merkez ile yan çizgi arasında bulunur',
      'Merkezde olmayan pas açıları sunar',
      'Oyuncuların kaleye bakmasını sağlar',
      '2v1 durumları yaratır',
      'En tehlikeli hücum bölgeleridir'
    ]),
    how_to_implement: 'Hücum orta saha oyuncularını ve içe kesen kanat oyuncularını yarı alanlara yerleştirin. Burada sayısal üstünlük yaratın. Ters ayaklı kanatçılar doğal olarak bu alanları işgal eder. Üçüncü adam koşularını yarı alanlar üzerinden yapın.',
    required_player_attributes: JSON.stringify([
      'Vizyon',
      'Yakın kontrol',
      'Karar verme',
      'Bitiricilik',
      'Paslaşma'
    ]),
    suitable_formations: JSON.stringify([
      '4-3-3',
      '4-2-3-1',
      '3-2-4-1',
      'Her modern sistem'
    ]),
    real_world_examples: JSON.stringify([
      'Man City - KDB ve Silva yarı alanlarda',
      'Barcelona Messi yalancı 9 yarı alanda',
      'Arsenal Odegaard sağ yarı alan',
      'Liverpool Salah yarı alana kesme'
    ]),
    famous_implementations: JSON.stringify([
      'Guardiola Man City',
      'Pep Barcelona',
      'Arteta Arsenal 2024'
    ]),
    related_concepts: JSON.stringify([
      'Üçüncü adam koşuları',
      'Dikey paslaşma',
      'Sayısal üstünlükler'
    ]),
    opposing_concepts: JSON.stringify([
      'Geniş oyun',
      'Direkt oyun'
    ])
  },
  {
    id: 2,
    concept_name: 'Üçüncü Adam Koşuları',
    category: 'Hareket',
    description: 'İki takım arkadaşı pas alışverişi yaparken üçüncü oyuncu savunma arkasına koşar. Savunma hatlarını kırar.',
    detailed_explanation: 'İki oyuncu pas alışverişi yaparken, üçüncü oyuncu savunma arkasına işaretsiz koşu yapar. Defans oyuncuları topu izler, koşanı kaçırır. Son derece etkili modern konsept. Zamanlama ve zeka gerektirir.',
    principles: JSON.stringify([
      'İki oyuncu pas alışverişi yapar',
      'Üçüncü oyuncu işaretsiz koşar',
      'Zamanlama kritiktir',
      'Savunma hattını kırar',
      'Boşluk veya gol şansı yaratır'
    ]),
    how_to_implement: 'Pas üçgenlerini pratikte yapın. Orta saha oyuncusu kanata, kanat orta sahaya, forvet arkaya koşar. Anlayış ve zamanlama gerektirir. Antrenmanlarla öğretilebilir.',
    required_player_attributes: JSON.stringify([
      'Zeka',
      'Topsuz hareket',
      'Zamanlama',
      'Öngörü',
      'Vizyon'
    ]),
    suitable_formations: JSON.stringify([
      'Tüm formasyonlar',
      'Özellikle top hakimiyeti sistemleri'
    ]),
    real_world_examples: JSON.stringify([
      'Man City sürekli üçüncü adam koşuları',
      'Brighton De Zerbi sistemi',
      'Barcelona tiki-taka klasiği',
      'Arsenal Arteta kombinasyonları'
    ]),
    famous_implementations: JSON.stringify([
      'Guardiola sistemleri',
      'De Zerbi Brighton',
      'Cruyff Barcelona'
    ]),
    related_concepts: JSON.stringify([
      'Yarı alanlar',
      'Sayısal üstünlükler',
      'Pozisyonel oyun'
    ]),
    opposing_concepts: JSON.stringify([
      'Adam adama savunma',
      'Alçak blok'
    ])
  },
  {
    id: 3,
    concept_name: 'Pozisyonel Oyun (Juego de Posición)',
    category: 'Felsefe',
    description: 'Sahanın belirli bölgelerini işgal ederek üstünlük yaratma felsefesi. Guardiola\'nın temel prensibi.',
    detailed_explanation: 'Sahayı bölgelere ayırıp her bölgeye oyuncu yerleştirerek yapısal üstünlük yaratma. Rakip sayısal veya konumsal olarak ezilir. Topa sahip olma ve kontrol esastır. Cruyff ve Guardiola\'nın temel felsefesi.',
    principles: JSON.stringify([
      'Saha belirli bölgelere ayrılır',
      'Her bölgede oyuncu bulundur',
      'Yapısal üstünlük yarat',
      'Rakibi pozisyonla yenilgi',
      'Top kontrolü esastır'
    ]),
    how_to_implement: 'Takımı sahanın farklı bölgelerine yay. Sürekli pas seçenekleri sağla. Oyuncuların konumlarını korumalarını iste. Üçgenler ve rotasyonlarla çalış. Top hâkimiyetini koru.',
    required_player_attributes: JSON.stringify([
      'Teknik yetenek',
      'Pozisyon bilinci',
      'Paslaşma',
      'Vizyon',
      'Disiplin'
    ]),
    suitable_formations: JSON.stringify([
      '4-3-3',
      '4-2-3-1',
      '3-2-4-1'
    ]),
    real_world_examples: JSON.stringify([
      'Guardiola Man City tamamen pozisyonel',
      'Barcelona 2008-2012 altın çağ',
      'Bayern Munich Guardiola dönemi',
      'Arsenal Arteta 2024'
    ]),
    famous_implementations: JSON.stringify([
      'Guardiola tüm takımları',
      'Cruyff Barcelona'
    ]),
    related_concepts: JSON.stringify([
      'Yarı alanlar',
      'Üçgenler',
      'Top hakimiyeti'
    ]),
    opposing_concepts: JSON.stringify([
      'Direkt oyun',
      'Kontra atak'
    ])
  },
  {
    id: 4,
    concept_name: 'Gegenpressing (Karşı Baskı)',
    category: 'Geçiş',
    description: 'Top kaybedildikten hemen sonra anında yoğun baskı uygulama. Rakibi organize olamadan geri alma.',
    detailed_explanation: 'Top kaybı sonrası ilk 5-6 saniye içinde agresif baskı. Rakip henüz organize olamadan topu geri alma hedefi. Klopp\'un Liverpool\'u bu konsepti mükemmelleştirdi. Yüksek yoğunluk ve takım koordinasyonu gerektirir.',
    principles: JSON.stringify([
      'Top kaybı sonrası anında baskı',
      'İlk 5-6 saniye kritik',
      'Takım olarak hareket et',
      'Pas hatlarını kes',
      'Topu geri kazan veya faul yap'
    ]),
    how_to_implement: 'Top kaybında en yakın 2-3 oyuncu hemen baskıya. Pas hatlarını kes. Takım kompakt kal. Yüksek kondisyon gerekli. Baskı tetikleyicilerini belirle. Sürekli antrenmanda çalış.',
    required_player_attributes: JSON.stringify([
      'Yüksek kondisyon',
      'Yoğunluk',
      'Takım çalışması',
      'Öngörü',
      'Agresiflik'
    ]),
    suitable_formations: JSON.stringify([
      '4-3-3',
      '4-2-3-1',
      'Yüksek baskı sistemleri'
    ]),
    real_world_examples: JSON.stringify([
      'Klopp Liverpool 2017-2023',
      'Dortmund Klopp dönemi',
      'Barcelona Guardiola altında',
      'Arsenal Arteta gegenpressing kullanır'
    ]),
    famous_implementations: JSON.stringify([
      'Klopp Liverpool',
      'Dortmund Klopp',
      'Barcelona modern dönemi'
    ]),
    related_concepts: JSON.stringify([
      'Geçiş anları',
      'Yüksek baskı',
      'Kompaktlık'
    ]),
    opposing_concepts: JSON.stringify([
      'Düşük blok',
      'Organize savunmaya geçiş'
    ])
  },
  {
    id: 5,
    concept_name: 'Dikey Paslaşma',
    category: 'Paslaşma',
    description: 'Arka saha hatları atlayarak ileriye doğru direkt paslar. Hızla ilerlemeyi sağlar.',
    detailed_explanation: 'Yanlara değil öne doğru paslar. Rakip savunma hatlarını atlar. Tempo kazanır ve rakibi organize olamadan baskı altına alır. Tehlikeli gol pozisyonları yaratır. Yarı alanlarda çok etkilidir.',
    principles: JSON.stringify([
      'İleriye doğru pas yönelimi',
      'Hatları atla',
      'Tempo kazan',
      'Gol pozisyonları yarat',
      'Risk-ödül dengesi'
    ]),
    how_to_implement: 'Oyunculara her zaman önce ileriyi ara tavsiyesi. Defanstan orta sahaya, orta sahadan hücuma direkt paslar. Timing ve pas kalitesi kritik. Yarı alanları kullan.',
    required_player_attributes: JSON.stringify([
      'Pas yeteneği',
      'Vizyon',
      'Risk alma cesareti',
      'Timing',
      'Teknik kalite'
    ]),
    suitable_formations: JSON.stringify([
      'Tüm modern sistemler',
      'Özellikle hızlı geçiş takımları'
    ]),
    real_world_examples: JSON.stringify([
      'Man City De Bruyne dikey pasları',
      'Arsenal Odegaard dikey geçişler',
      'Real Madrid Modric-Kroos dikey oyun'
    ]),
    famous_implementations: JSON.stringify([
      'Guardiola sistemleri',
      'De Zerbi takımları'
    ]),
    related_concepts: JSON.stringify([
      'Yarı alanlar',
      'Penetrasyon',
      'Hızlı geçiş'
    ]),
    opposing_concepts: JSON.stringify([
      'Yatay pas oyunu',
      'Sabırlı build-up'
    ])
  },
  {
    id: 6,
    concept_name: 'Sayısal Üstünlük ve İzolasyonlar',
    category: 'Sayısal Avantaj',
    description: 'Sahanın belirli bölgelerinde rakipten sayıca fazla oyuncu bulundurmak veya 1v1 durumları yaratmak.',
    detailed_explanation: 'Belirli zonlarda 3v2 veya 4v3 gibi sayısal üstünlük yaratmak ya da yetenekli oyuncuları 1v1 durumlarında izole etmek. Her iki durum da avantaj sağlar. Modern futbolun temel taktik prensibi.',
    principles: JSON.stringify([
      'Belirlibölgelerde sayısal üstünlük',
      'veya 1v1 izolasyonları',
      'Rakibi ezici duruma sok',
      'Boşluklar yarat',
      'Avantajı kullan'
    ]),
    how_to_implement: 'Kanat ve merkez orta sahaya fazla oyuncu aktar. Kanatçıları geniş tutarak 1v1 durumları yarat. Rakip kanat beklerini içeri çekerek boşluk aç. Sürekli rotasyonlarla sayısal dengeyi değiştir.',
    required_player_attributes: JSON.stringify([
      'Taktik anlayış',
      'Pozisyon alma',
      '1v1 yeteneği (izolasyon için)',
      'Hızlı karar verme',
      'Takım oyunu'
    ]),
    suitable_formations: JSON.stringify([
      '4-3-3',
      '3-2-4-1',
      'Asimetrik sistemler'
    ]),
    real_world_examples: JSON.stringify([
      'Man City orta saha overload',
      'Arsenal sol kanat sayısal üstünlükler',
      'PSG Mbappe izolasyonu',
      'Real Madrid Vinicius 1v1'
    ]),
    famous_implementations: JSON.stringify([
      'Guardiola sistemleri',
      'Ancelotti Madrid'
    ]),
    related_concepts: JSON.stringify([
      'Pozisyonel oyun',
      'Asimetrik şekiller',
      'Kanat oyunu'
    ]),
    opposing_concepts: JSON.stringify([
      'Dengeli yapılanma',
      'Eşit dağılım'
    ])
  },
  {
    id: 7,
    concept_name: 'Baskı Tuzakları',
    category: 'Savunma',
    description: 'Rakibi belirli bölgelere çekerek orada tuzağa düşürüp top kapma stratejisi.',
    detailed_explanation: 'Rakibe kasıtlı olarak belirli bölgelerde pas izni vererek o alana çekmek, sonra aniden yoğun baskıyla topu kapmak. Yan çizgi ve köşe bayrakları doğal tuzak noktalarıdır. Guardiola takımları uzmanıdır.',
    principles: JSON.stringify([
      'Rakibi belirli bölgeye çek',
      'Pas izinleri kullan',
      'Kaçış yollarını kapat',
      'Aniden yoğun baskı',
      'Top kazanımı veya hata zorla'
    ]),
    how_to_implement: 'Merkezi kapat, rakibi kanada zorla. Kanat çizgisi tuzaktır. 2-3 oyuncu ani baskı yapar. Yan çizgi ve köşe bayrakları doğal hapishane. Geri pas yolunu kes.',
    required_player_attributes: JSON.stringify([
      'Takım koordinasyonu',
      'Disiplin',
      'Hız',
      'Öngörü',
      'Yoğunluk'
    ]),
    suitable_formations: JSON.stringify([
      '4-3-3',
      '4-2-3-1',
      'Yüksek baskı sistemleri'
    ]),
    real_world_examples: JSON.stringify([
      'Man City yan çizgi tuzakları',
      'Liverpool Klopp baskı tuzakları',
      'Arsenal Arteta pressing triggers'
    ]),
    famous_implementations: JSON.stringify([
      'Guardiola Man City',
      'Klopp Liverpool',
      'Arteta Arsenal'
    ]),
    related_concepts: JSON.stringify([
      'Gegenpressing',
      'Baskı tetikleyicileri',
      'Sayısal üstünlük'
    ]),
    opposing_concepts: JSON.stringify([
      'Düşük blok',
      'Rakibe alan verme'
    ])
  },
  {
    id: 8,
    concept_name: 'Kompaktlık',
    category: 'Savunma',
    description: 'Takımın hatlar arası mesafeleri kısa tutarak kompakt bir blok oluşturması. Boşlukları minimize eder.',
    detailed_explanation: 'Savunma, orta saha ve hücum hatları arasındaki dikey mesafeleri 25-30m civarında tut. Yatay olarak da좁게kal. Rakibe az boşluk ver. Pas hatlarını kapat. Modern savunmanın temel prensibi.',
    principles: JSON.stringify([
      'Hatlar arası mesafe 25-30m',
      'Yatay olarak da dar kal',
      'Boşlukları minimize et',
      'Pas hatlarını kapat',
      'Organize blok oluştur'
    ]),
    how_to_implement: 'Top neredeyse takım oraya kayar. Hatlar birlikte hareket eder. Defans çıkarsa orta saha da çıkar. Yatay olarak da merkeze sık. Kompakt 30x40m blok hedefle.',
    required_player_attributes: JSON.stringify([
      'Disiplin',
      'Takım çalışması',
      'Kondisyon',
      'Pozisyon alma',
      'Taktik anlayış'
    ]),
    suitable_formations: JSON.stringify([
      'Tüm formasyonlar',
      'Özellikle savunma odaklı sistemler'
    ]),
    real_world_examples: JSON.stringify([
      'Simeone Atletico Madrid ultra kompakt',
      'Mourinho takımları',
      'İtalyan takımları geleneksel'
    ]),
    famous_implementations: JSON.stringify([
      'Simeone Atletico',
      'Conte takımları',
      'Mourinho sistemleri'
    ]),
    related_concepts: JSON.stringify([
      'Düşük blok',
      'Bölgesel savunma',
      'Organize savunma'
    ]),
    opposing_concepts: JSON.stringify([
      'Yüksek savunma hattı',
      'Geniş şekil'
    ])
  }
];

// Diğer konseptleri de ekleyeceğim ama dosya çok uzadığı için ilk 8'ini yaptım
// Devamını ayrı bir batch'te yapacağım

let completed = 0;
let failed = 0;

function translateConcept(concept) {
  return new Promise((resolve) => {
    const sql = `UPDATE tactical_concepts SET
      concept_name = ?,
      category = ?,
      description = ?,
      detailed_explanation = ?,
      principles = ?,
      how_to_implement = ?,
      required_player_attributes = ?,
      suitable_formations = ?,
      real_world_examples = ?,
      famous_implementations = ?,
      related_concepts = ?,
      opposing_concepts = ?
      WHERE id = ?`;

    db.run(sql, [
      concept.concept_name,
      concept.category,
      concept.description,
      concept.detailed_explanation,
      concept.principles,
      concept.how_to_implement,
      concept.required_player_attributes,
      concept.suitable_formations,
      concept.real_world_examples,
      concept.famous_implementations,
      concept.related_concepts,
      concept.opposing_concepts,
      concept.id
    ], (err) => {
      if (err) {
        console.log(`❌ ID ${concept.id} (${concept.concept_name}) çevrilemedi:`, err.message);
        failed++;
      } else {
        console.log(`✅ ID ${concept.id} - ${concept.concept_name} Türkçeye çevrildi`);
        completed++;
      }
      resolve();
    });
  });
}

async function translateAll() {
  for (const concept of turkishConcepts) {
    await translateConcept(concept);
  }

  console.log(`\n✅ İşlem tamamlandı!`);
  console.log(`   Başarılı: ${completed}`);
  console.log(`   Başarısız: ${failed}`);
  console.log(`\n📝 NOT: İlk 8 konsept çevrildi. Kalan 23 konsepti ikinci batch'te çevireceğiz.\n`);

  db.close();
}

translateAll();
