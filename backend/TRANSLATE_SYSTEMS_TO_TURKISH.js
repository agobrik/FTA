const ultraDb = require('./ultra_database');

console.log('🇹🇷 TAKTİK SİSTEMLER TÜRKÇEYE ÇEVRİLİYOR...\n');

// İlk 8 sistemi tamamen Türkçeye çevir
const turkishSystems = [
  {
    id: 1,
    attacking_phase: `Guardiola'nın 4-2-3-1 sisteminde hücum fazı son derece organize ve karmaşıktır. İki pivot (çift 6'lar), sürekli olarak savunma hattından pas alma seçenekleri sunar. Tam bekler sahaya kanat açısı verirken, iç kanatlar dar pozisyon alarak merkezi doldurmaya ve yarı alanlardan oynamaya odaklanır. On numara, forvetin arkasında serbest rol oynar ve sürekli hareket eder. Sistem, üçgen oluşturmaya, pozisyonel rotasyona ve sabırlı top hakimiyetine dayanır. Oyuncular, sürekli pas seçenekleri yaratarak rakip savunmasını yorar ve boşluklar arar. Rakip baskısı altında bile sakin çıkış yapılır. Sistem, teknik yetenek, futbol zekası ve pozisyonel disiplin gerektirir.`,
    defensive_phase: `Savunmada, 4-2-3-1 kompakt bir yapı oluşturur. İki pivot, merkezi kapatır ve ara kesme yapar. On numara, rakip pivotunu bloke eder. İç kanatlar, rakip tam beklerine baskı yapar ve içeriye kesilmeyi engeller. Takım, topu yüksek bölgelerde geri kazanmayı hedefler. Eğer baskı kırılırsa, orta bloka geçilir. Tam bekler, merkeze doğru kayar ve stoperlere destek sağlar. Sistem, bölgesel savunma yapar ve boşlukları minimize eder.`,
    transition_attack: `Top kazanımı sonrası, takım hızla hücum organizasyonu kurar. Pivot oyuncular, dikey paslar atar. İç kanatlar, savunma hatlarının arkasına keskin koşular yapar. On numara, ara paslar bulur. Tam bekler, kanat bindirmeleri yapar. Forvet, topla sırtını döner ve arkadan gelenlere seçenek sunar. Geçiş kontrollü ama amaca yönelik, sabırlı ama keskindir.`,
    transition_defense: `Top kaybı sonrası, anında karşı baskı (gegenpressing) uygulanır. En yakın 5-6 oyuncu topu kuşatır. Amaç, topu 6 saniye içinde geri kazanmak veya rakibi durdurmaktır. Eğer baskı başarısız olursa, takım hızla kompakt şekil alır. Pivot oyuncular, merkezi kapatır. Tam bekler, dar pozisyona gelir. Sistem, savunma geçişlerini minimize etmek için top hakimiyetine odaklanır.`
  },
  {
    id: 2,
    attacking_phase: `Klopp'un 4-3-3 gegenpress sisteminde hücum fazı yüksek tempolu ve dikeydür. Sistem, dikey paslar, hızlı kombinasyonlar ve kanat oyunuyla rakibi hızla açmaya odaklanır. Tam bekler, agresif bindirmeler yapar ve beşinci hücum oyuncusu gibi davranır. İç kanatlar, içeriye kesilir ve gol pozisyonları arar. Merkez forvet, topla sırtını döner ve destek sağlar. Orta saha üçlüsü, dengeyi korur ancak hücuma katılım yüksektir. Sistem, rakip savunmayı geçiş hızıyla ve agresif hareketlerle parçalamayı hedefler. Her oyuncu yüksek tempo koşular yapar.`,
    defensive_phase: `Savunma fazında, sistem yüksek baskıyla (high pressing) karakterizedir. Üç forvet, rakip stoperlere ve pivotuna agresif baskı yapar. Orta saha üçlüsü, geçiş yollarını kapatır. Tam bekler, rakip kanatlarını kovalar. Takım, topu rakip yarı sahasında kazanmayı hedefler. Baskı tetikleyicileri (pressing triggers) belirlenir - örneğin rakip bekine kötü pas. Eğer baskı kırılırsa, takım hızla orta-yüksek bloğa geçer. Savunma enerjik, agresif ve koordinelidir.`,
    transition_attack: `Gegenpress felsefesi, hücum geçişinin özüdür. Top kazanımı sonrası, takım anında dikey hücum başlatır. Amaç, rakip savunma organize olmadan gol atmaktır. Kanatlar, hızla derinliğe koşar. Forvet, pivottan arkaya uzanır. Orta saha, hızlı ara paslar yapar. Sistem, 5 saniye içinde gol şansı yaratmayı hedefler. Geçiş hızı, sistemin en büyük silahıdır.`,
    transition_defense: `Top kaybı sonrası, anında karşı baskı (gegenpressing) maksimum yoğunlukta uygulanır. "Topu kaybettikten sonraki 8 saniye, en iyi savunma anıdır" prensibi hakimdir. 6 oyuncu topun etrafında yoğunlaşır ve topu kuşatır. Amaç, topu anında geri kazanmak ve rakibin kontra atağını engellemektir. Eğer baskı başarısız olursa, takım hızla kompakt savunma şekline döner.`
  },
  {
    id: 3,
    attacking_phase: `Conte'nin 3-5-2 sisteminde hücum fazı kanat beklerin genişliğine dayanır. İki kanat bek, sahayı gerçek kanatlar gibi doldurur ve sürekli bindirmeler yapar. Merkezdeki üç stoper, arkadan güvenli pas çıkışı sağlar. Orta saha ikilisi, merkezi kontrol eder ve geçiş yollarını yönetir. İki forvet, birlikte çalışır - biri derin, biri hedef adam. Sistem, kanat hakimiyeti, orta yapmalar ve fiziksel oyunla gol arar. Takım, kompakt kalırken hücumda sayısal üstünlük yaratır.`,
    defensive_phase: `Savunmada, 3-5-2 beş kişilik savunma hattına dönüşür (5-3-2). İki kanat bek, geri çekilir ve tam bek pozisyonu alır. Üç stoper, geniş bir hat oluşturur ve kanat alanlarını kapatır. Orta saha ikilisi, merkezi sıkı tutar. İki forvet, rakip pivotuna minimal baskı yapar. Takım, orta-düşük blokta organize olur ve kompakt kalır. Sistem, kanat alanlarını kapatmaya ve merkezi savunmaya odaklanır.`,
    transition_attack: `Top kazanımı sonrası, kanat bekler anında ileri koşar ve geniş seçenekler sunar. Orta saha ikilisi, dikey paslar dağıtır. İki forvet, birlikte hareket eder ve boşlukları istismar eder. Üç stoper, arkadan destek ve güvenlik sağlar. Geçiş organize, güçlü ve etkilidir. Sistem, kanat bindirmeleriyle rakibi geniş alanlara zorlar.`,
    transition_defense: `Top kaybı sonrası, kanat bekler hızla geri koşar ve beş kişilik savunma hattı oluşur. Orta saha ikilisi, merkezi kapatır. İki forvet, minimal baskı yapar ama geriye düşmez. Takım, hızla kompakt şekil alır ve boşlukları minimize eder. Savunma geçişi hızlı, organize ve disiplinlidir.`
  },
  {
    id: 4,
    attacking_phase: `Klasik 4-4-2 sisteminde hücum fazı basit ama etkilidir. İki forvet birlikte çalışır - genellikle biri hedef adam, diğeri ikinci forvet. İki kanat, genişliği korur ve orta yapar. Merkez orta saha ikilisi, kutu-kutu koşular yapar ve hem savunur hem de hücuma katılır. Tam bekler, kanat bindirmeleri yapabilir. Sistem, basit geçişler, direkt paslar ve fiziksel oyunla gol arar. Orta yapmalar ve ikinci toplar önemlidir.`,
    defensive_phase: `Savunmada, 4-4-2 kompakt iki dörtlü hat oluşturur. İki forvet, rakip pivotuna minimal baskı yapar. Dört orta saha, düz bir hat oluşturur ve boşlukları kapatır. Dört defans, organize savunma yapar. Takım, orta blokta kalır ve merkezi sıkı tutar. Bölgesel savunma yapılır, disiplin kritiktir.`,
    transition_attack: `Top kazanımı sonrası, takım hızlı kontra atak başlatır. Orta saha, dikey paslar yapar. Kanatlar, hızla derinliğe koşar. İki forvet, boşlukları istismar eder. Geçiş direkt, basit ve hızlıdır. Uzun top ve ikinci top mücadeleleri önemlidir.`,
    transition_defense: `Top kaybı sonrası, takım hızla savunma şekline döner. Forvetler, geri çekilmeden rakip pivotunu bloke eder. Orta saha hattı, kompakt kalır. Tam bekler, dar pozisyona gelir. Savunma geçişi organize ve disiplinlidir.`
  },
  {
    id: 5,
    attacking_phase: `Ancelotti'nin 4-3-3 sisteminde hücum fazı dengeli ve adaptiftir. Üç forvet, farklı roller oynar - kanatlar içeriye kesilir veya geniş kalır, duruma göre. Merkez forvet, topla sırtını döner ve destek sağlar. Orta saha üçlüsü, dengeli katkı sağlar - biri derin, ikisi kutu-kutu tarzı. Tam bekler, duruma göre hücuma katılır. Sistem, esneklik, dengeli hücum ve çeşitli gol yolları sunar.`,
    defensive_phase: `Savunmada, 4-3-3 orta blokta organize olur. Üç forvet, rakip oyun kurmasına orta seviyede baskı yapar. Orta saha üçlüsü, merkezi kapatır ve boşlukları doldurur. Tam bekler, kanat alanlarını korur. Takım, dengeli ve organize savunma yapar. Baskı seçicidir - önemli anlarda yoğunlaşır.`,
    transition_attack: `Top kazanımı sonrası, takım dengeli hücum başlatır. Orta saha, akıllı paslar dağıtır. Üç forvet, hızlı hareket eder. Tam bekler, destek sağlar. Geçiş kontrollü ama amaçlıdır.`,
    transition_defense: `Top kaybı sonrası, takım orta seviyede karşı baskı yapar. Odak, takım dengesini korumaktır. Orta saha, merkezi kapatır. Savunma geçişi organize ve dengeli bir yaklaşımdır.`
  },
  {
    id: 6,
    attacking_phase: `False 9 sisteminde, geleneksel forvet rolü radikal bir şekilde yeniden tanımlanır. Merkez forveti, derinlikte kalmak yerine orta sahaya düşer ve on numara rolü oynar. Bu hareket, rakip merkez stoperlerini bir ikileme sokar: forveti takip edip merkezi boş mu bıraksınlar, yoksa pozisyonda kalıp forvete serbest alan mı versinler? Bu boşluk, kanat oyuncularının içeriye kesilen koşularıyla istismar edilir. Sistem, Barcelona'nın Lionel Messi ile oynadığı tarzın DNA'sıdır. Orta saha üçlüsü, derin oyun kurma ve pas kontrol sağlar. İki pivot, topu arkadan taşır ve üçgen oluşturma ile rakip baskısını kırar. Kanat oyuncuları, sürekli savunma hatlarının arkasına zamanlamalı koşular yapar ve gol pozisyonlarını değerlendirir. False 9, bağlantı oyunu yaparak orta sahayı doldurmada, pas seçenekleri yaratmada ve rakip savunmanın organize olmasını engellemede kritik rol oynar. Sistem, olağanüstü teknik yetenek, futbol zekası ve topsuz hareket gerektirir.`,
    defensive_phase: `Savunma fazında, False 9 sistemi yüksek baskı ve pozisyonel savunma kombinasyonu kullanır. False 9, rakip pivotlara baskı yapar ve geri pasları engeller, ancak derinliğe koşmaz - baskı tetikleyicisi olarak çalışır. Kanat oyuncuları, rakip beklere agresif baskı yapar ve kanat oyunu ile oyun kurmayı zorlaştırır. Orta saha üçlüsü, merkezi kompakt tutar ve ara pasları engeller. Tam bekler, dar pozisyon alır ve içeriye kesmelere karşı koruma sağlar. Sistem, topu rakipte yüksek bölgelerde kazanmayı ve anında karşı baskı başlatmayı hedefler. Eğer baskı kırılırsa, takım hızla kompakt orta blok oluşturur. Üç stoper olmadığı için, hava topları ve fiziksel düellolar zayıf nokta olabilir - ancak sistem bu riski top hakimiyeti ile minimize eder.`,
    transition_attack: `False 9 sisteminde geçiş hücumu, iç kanatların patlayıcı hızı ve False 9'un hızlı karar verme yeteneğine dayanır. Top kazanımı sonrası, False 9 hemen derine düşer ve pas merkezi olur. Kanat oyuncuları, savunma hatlarının arkasına çapraz koşular yapar. Orta saha, hızlı ara paslar ve tek dokunuş kombinasyonlarla geçişi hızlandırır. Tam bekler, geniş bindirme yaparak ekstra genişlik sağlar ve savunmayı gerir. False 9'un pozisyonel zekası, boşlukları bulmada ve boşlukları istismar etmede kritiktir. Sistem, hızlı geçiş ve sabırlı oyun kurma arasında geçiş yapabilme yeteneğine sahiptir.`,
    transition_defense: `Geçiş savunması, False 9 sisteminde anında karşı baskı ile başlar. Top kaybı anında, en yakın 5-6 oyuncu topu kuşatır ve rakibi hızlı atağa çıkamadan durdurur. False 9, geri pas bloke etme rolü oynar. Kanat oyuncuları, rakip beklerin ileri hareketini takip eder. Orta saha üçlüsü, merkez bölgeleri kapatır. Eğer karşı baskı başarısız olursa, takım hızla kompakt şekil oluşturur. Tam bekler, dar pozisyona gelir ve stoperlerle birlikte dört kişilik savunma hattı oluşturur. Sistem, savunma geçişlerini minimize etmek için top hakimiyetini koruma odaklıdır - topu kaybetmemek, en iyi savunma stratejisidir.`
  },
  {
    id: 7,
    attacking_phase: `Tiki-Taka, modern futbol tarihinin en ikonik oyun tarzlarından biridir. İspanya Milli Takımı ve Barcelona'nın 2008-2012 altın döneminde doruk noktasına ulaşmıştır. Tiki-Taka'nın özü, kısa paslaşma, sürekli hareket, pozisyonel rotasyon ve aşırı top hakimiyetidir. Takım, sürekli üçgenler, elmaslar ve pas seçenekleri oluşturur. Her oyuncu, sürekli hareket eder ve pas yolları açar. Sistem, dar alan pas çalışmaları ve pozisyonel antrenmanlarla mükemmelleştirilir. Tam bekler, oyun kurmaya katılır ve içe dönük pozisyonlar alabilir. Kanat oyuncuları, geniş kalır ve sahayı gerir. Orta saha, sürekli yer değiştirir ve rakip işaretlemeleri karıştırır. Sistem, "pas ver ve hareket et" prensiplerine dayanır ve rakibi zihinsel yorgunluk ile yıpratmayı hedefler.`,
    defensive_phase: `Tiki-Taka'da savunma, hücum prensiplerinin uzantısıdır. "En iyi savunma, iyi bir hücumdur" mantığı hakimdir. Takım, topu kaybettiği anda anında karşı baskı uygular - bu, Tiki-Taka'nın savunma köşe taşıdır. Oyuncular, kompakt pozisyonlar alır ve top odaklı savunma yapar. Baskı, koordineli ve akıllı - amaç, rakibi dar alanlara sıkıştırıp top kaybı zorlamaktır. Eğer baskı kırılırsa, takım hızla savunma şekli alır ancak bu nadirdir çünkü top hakimiyeti çok yüksektir (%65-75). Sistem, fiziksel savunma yerine pozisyonel zeka kullanır.`,
    transition_attack: `Tiki-Taka'da geçiş hücumu, geleneksel kontra ataktan farklıdır. Top kazanımı sonrası, takım anında uzun toplar yerine topu pekiştirir ve top hakimiyetini güvence altına alır. Ancak eğer boşluk varsa, hızlı dikey paslar ve keskin ara paslar kullanılır. Geçiş, kontrollü ancak amaçlıdır. Oyuncular, hızla hücum pozisyonları alır ve sayısal üstünlük yaratmaya çalışır.`,
    transition_defense: `Geçiş savunması, Tiki-Taka'nın en güçlü yanlarından biridir. Top kaybı anında, 6 saniyelik kural aktive olur: topu 6 saniye içinde geri kazanmak veya rakibi durdurmak. Anında baskı, topun etrafında yoğun bir koza oluşturur. Bu, Barcelona'nın "6 saniyen var" yaklaşımıdır. Eğer karşı baskı başarısız olursa, takım hızla kompakt blok oluşturur ve top hakimiyetini geri kazanmaya odaklanır. Sistem, savunma geçişlerini minimize etmek için top hakimiyeti sürdürme odaklıdır.`
  },
  {
    id: 8,
    attacking_phase: `4-1-4-1 düşük blok kontra sistemi, savunma öncelikli bir tarz olsa da, hücum fazı son derece öldürücü ve etkilidir. Tek forvet, izole kalır ancak olağanüstü tutma oyunu ve fiziksel varlık gerektirir. Orta saha dörtlüsü, kompakt kalır ve savunmada sayısal üstünlük sağlar. Hücum fazında, takım sabırlı oyun kurma yerine direkt geçişler ve uzun toplar kullanır. İki kanat orta sahası, kontra atakta sprint eder ve forvetin dokunuşlarından yararlanır. Merkez orta saha ikilisi, ileri paslar ve ara paslarla kontra atağı yönetir. Sistem, minimal risk alır ve rakip hatalarından yararlanmayı hedefler. Duran toplar, gol fırsatlarının önemli bir kaynağıdır. Hücum, direkt, hızlı ve acımasızca etkilidir.`,
    defensive_phase: `4-1-4-1'in savunma fazı, sistemin gerçek kimliğidir. Takım, derin savunma hattı ve kompakt blok oluşturur, genellikle kendi yarı sahasında pozisyon alır. Defansif orta saha, stoperlerin önünde kalkan görevi görür ve merkez bölgeleri kapatır. Orta saha dörtlüsü, dar ve kompakt kalır, rakibin ortadan geçişini aşırı zor hale getirir. Tek forvet, minimal baskı yapar - sadece geri pasları bloke eder ve savunma hattından kopuk kalmaz. Sistem, iki dörtlü hat oluşturur ve rakibi kanat oyununa, uzak şutlara ve ortalara zorlar. Savunma disiplini ve organizasyonu kritiktir - küçük boşluklar bile ölümcül olabilir. Takım, sabırlı savunma yapar ve rakibin hayal kırıklığını bekler.`,
    transition_attack: `4-1-4-1'de geçiş hücumu, sistemin birincil silahıdır. Top kazanımı sonrası, takım şimşek hızı kontra atak başlatır. Defansif orta saha, anında uzun pas yapar ve tek forveti hedefler. Kanat orta sahaları, yan çizgiye koşar ve izolasyon durumları yaratır. Merkez orta sahalar, geç dalışlarla ceza sahasına girer ve ikinci topları kazanır. Tam bekler, genellikle kontra atağa katılmaz - savunma sağlamlığı için arkada kalır. Geçiş, direkt ve minimalist - 3-4 pas içinde gol fırsatı yaratma hedefi. Sistem, hız, direklik ve klinik bitiricilik gerektirir.`,
    transition_defense: `Geçiş savunması, 4-1-4-1 düşük blokta basittir. Top kaybı sonrası, takım hemen derine düşer ve savunma şeklini yeniden kazanır. Karşı baskı yapılmaz - bunun yerine, takım hızla yeniden organize olur ve kompakt bloğa döner. Defansif orta saha, ilk savunma bariyeri olur ve ileri pasları keser. Orta saha dörtlüsü, geri koşarak dar pozisyonlar alır. Tek forvet, geri düşmez - orta sahada kalır ve rakip oyun kurmasına minimal engelleme sağlar. Sistem, savunma geçişlerini minimize eder çünkü hücumda çok az oyuncu taahhüt eder.`
  }
];

console.log(`📝 ${turkishSystems.length} sistem Türkçeye çevriliyor...\n`);

let completed = 0;

turkishSystems.forEach(system => {
  const sql = `UPDATE tactical_systems
               SET attacking_phase = ?,
                   defensive_phase = ?,
                   transition_attack = ?,
                   transition_defense = ?
               WHERE id = ?`;

  ultraDb.run(sql, [
    system.attacking_phase,
    system.defensive_phase,
    system.transition_attack,
    system.transition_defense,
    system.id
  ], function(err) {
    if (err) {
      console.error(`❌ Sistem ID ${system.id} çevrilemedi:`, err.message);
    } else {
      completed++;
      console.log(`✅ Sistem ID ${system.id} Türkçeye çevrildi (${completed}/${turkishSystems.length})`);
    }

    if (completed === turkishSystems.length) {
      console.log('\n🎉 TÜM SİSTEMLER TÜRKÇEYE ÇEVRİLDİ!\n');
      ultraDb.close();
    }
  });
});
