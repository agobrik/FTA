const db = require('./ultra_database');

console.log('\n🔄 İLK 10 SİSTEM İÇİN VERİ DOLDURMA BAŞLIYOR...\n');

// Sistem 1-10 için detaylı taktik verileri (DOĞRU KOLON İSİMLERİ İLE)
const systems = [
  {
    id: 1,
    name: 'Guardiola Possession',
    possession: {
      possession_style: 'Pozisyonel Dominasyon',
      in_possession_shape: '2-3-2-3 Buildup Şekli',
      passing_principles: '["Sürekli üçgen oluşturma","Kısa-orta pas kombinasyonları","Pozisyonel rotasyonlar","Yarı alanlarda yoğunlaşma","Hasta regista ve pivot kullanımı"]',
      movement_principles: '["Sürekli hareket ve yer değiştirme","Boşluklara koşular","Lateral hareketler ile genişlik","False 9 düşüşleri","İçe kesen kanatlar"]',
      progression_patterns: 'Kaleciden başlayan kısa pas oyunu. Bekler geniş açılır, pivot düşer. 3-2 buildup şekli oluşturur. Hasta veya pivot üzerinden merkezi ilerleme sağlanır.',
      circulation_patterns: 'Topun sürekli dolaşımı ile rakibi yorma ve boşluk yaratma. Kanat değişimleri, geriye dönüş pasları, U şeklinde dolaşım kalıpları.',
      overload_patterns: 'Yarı alanlarda 4v3 üstünlük yaratma. Pivot düşüşü ile 3 stoper oluşturma. Kanat beklerle geniş overload. İçe kesen kanatlarla merkez yoğunlaştırma.'
    },
    non_possession: {
      defensive_philosophy: 'Yoğun Karşı Baskı',
      pressing_philosophy: 'Top kaybından 6 saniye içinde geri kazanma',
      counter_attack_philosophy: 'Karşı atak yerine topu geri kazanıp hakimiyet',
      out_of_possession_shape: '4-1-4-1 Kompakt Blok',
      pressing_triggers: '["Rakip stoper kötü dokunuş","Rakip pivot geriye pas","Kanat beklere pas","Yan hatlarda tuzak"]',
      where_to_press: 'Rakip yarı alanda yüksek baskı. Merkezi kapatıp yan hatlara zorlama. Köşe bayraklarına yakın bölgelerde tuzak kurma.',
      when_to_press: 'Top kaybından hemen sonra. Rakip kötü dokunuşta. Geriye pas yapıldığında. Yan hatta top olduğunda.',
      how_to_press: 'Gruplar halinde baskı. Topun etrafında koza oluşturma. Pas yollarını kapatıp hata zorla. Sayısal üstünlük ile top kazanma.',
      pressing_traps: 'Yan hatlarda 3-4 oyuncu ile tuzak. Merkez kapalı, yan açık görüntüsü. Pas gelince ani kapatma. Köşeye sıkıştırma tuzağı.'
    },
    pressing_zones: [
      {
        trap_name: 'Yan Hat Kıskacı',
        trap_zone: 'Rakip yarı sahada yan koridor',
        trap_trigger: 'Rakip kanat beke pas yapıldığında',
        trap_setup: 'Kanat oyuncusu + 8 numara + kanat bek üçgeni kurar. Merkez kapalı görünür, yan hat açık bırakılır. Pas yolu daralır.',
        trap_execution: 'Pas geldiği anda kanat oyuncusu ön baskı, 8 numara içe kesme yolunu kapar, bek yan çizgiyi keser. 3v1 üstünlük ile top kazanımı.',
        player_roles_involved: 'Kanat Oyuncusu (ön baskı), İç Orta Saha (pas yolu kesme), Kanat Bek (yan çizgi kapama)',
        success_rate_high_against: 'Buildup zayıf takımlar, teknik becerisi düşük kanat bekler, tek pivotlu sistemler',
        success_rate_low_against: 'İyi ayak altı tekniği olan bekler, çift pivot sistemler, kaleci katılımı yüksek takımlar'
      },
      {
        trap_name: 'Pivot Baskı Tuzağı',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip defans pivota geriye pas yaptığında',
        trap_setup: 'False 9 pivotun önünde bekler. İki 8 numara pas yollarını gözetler. Forvet hattı kompakt kalır.',
        trap_execution: 'Geriye pas gelince false 9 pivota bastırır. İki 8 numara yan pas yollarını kapar. Pivotu izole edip top kazanımı sağlanır.',
        player_roles_involved: 'False 9 (direkt baskı), İki İç Orta Saha (pas yolu kontrolü), Kanatlar (geniş kontrol)',
        success_rate_high_against: 'Teknik zayıf pivotlar, tek pivotlu sistemler, geriye dönük oynayan takımlar',
        success_rate_low_against: 'Çift pivot sistemler, pivottan sık yana açılan takımlar, uzun top oynayan sistemler'
      },
      {
        trap_name: 'Merkez Stoper Baskısı',
        trap_zone: 'Rakip ceza sahası önü',
        trap_trigger: 'Kaleciden stopere pas yapıldığında',
        trap_setup: 'Forvet stoperin önünde bekleme pozisyonu. Kanatlar içe daralmış şekilde pas yollarını gözetler. Orta saha hattı yüksek durur.',
        trap_execution: 'Stopere pas gelince forvet ani bastırır. Kanatlar beklere pas yolunu kapar. Stoperi kötü karar almaya zorlar, hata yaptırır.',
        player_roles_involved: 'Forvet (direkt stoper baskısı), Kanatlar (bek yolu kesme), Orta Saha (ikinci dalga baskı)',
        success_rate_high_against: 'Ayakla oynamayan kaleciler, teknik zayıf stopler, dar buildup yapan takımlar',
        success_rate_low_against: 'Sweeper keeper kullanan takımlar, üç stoper sistemler, geniş buildup yapanlar'
      },
      {
        trap_name: 'Köşe Bayrak Tuzağı',
        trap_zone: 'Yan koridor alt üçlü',
        trap_trigger: 'Rakip topu köşe bölgesine taşıdığında',
        trap_setup: 'Kanat + orta saha + bek üçgeni köşeye doğru sıkıştırma hazırlığı. Diğer oyuncular merkezi kapatır. Yan çizgi + alt çizgi kullanılır.',
        trap_execution: 'Top köşeye gittiğinde üçlü sıkıştırma başlar. Yan çizgi ek bir savunucu gibi kullanılır. Oyuncuyu köşeye hapsedip top kazanımı.',
        player_roles_involved: 'Kanat (ön baskı), Orta Saha (merkez kesme), Bek (arka kapama), Diğerleri (merkez bloke)',
        success_rate_high_against: 'Kanat oyununa bağımlı sistemler, orta alternatifi zayıf takımlar, bire bir zayıf oyuncular',
        success_rate_low_against: 'Hızlı kombinasyon oynayan takımlar, köşeden merkeze iyi kesebilen oyuncular, çok yönlü atakçılar'
      }
    ]
  },
  {
    id: 2,
    name: 'Klopp Gegenpressing',
    possession: {
      possession_style: 'Dikey İlerleme Odaklı',
      in_possession_shape: '4-3-3 Yüksek Tempo',
      passing_principles: '["Dikey paslar öncelikli","Hızlı kombinasyonlar","Kanat oyunu yoğun","Az dokunuşla ilerleme","Risk almaya hazır paslar"]',
      movement_principles: '["Derinliğe sürekli koşular","Kanatlardan içe kesme","Fullback overlaps","Sekizlerin kutu içi akınları","Yüksek tempo hareketlilik"]',
      progression_patterns: 'Hızlı ve dikey pas oyunu. Kanat beklerin yüksek pozisyonları. 6 numaranın derin pası. Kanatların birebir üstünlüğü. Box-to-box 8lerin destek koşuları.',
      circulation_patterns: 'Tempo kontrolü için yan kullanımı. Kanat bek devresi. 6 numara üzerinden taraf değişimi. Rakip yorulana kadar sahiplik ardından ani hızlanma.',
      overload_patterns: 'Kanat beklerin yükselmesi ile kanat overload. İki 8in kutu içine girmesi. False 9 düşüp kanatların içe kesmesi. 6 numara arkada tek kalır.'
    },
    non_possession: {
      defensive_philosophy: 'Agresif Gegenpressing',
      pressing_philosophy: '5-8 saniye içinde yoğun baskı ile geri kazanma',
      counter_attack_philosophy: 'Yüksek bölgede top kazanıp direkt gol pozisyonu',
      out_of_possession_shape: '4-3-3 Yüksek Blok',
      pressing_triggers: '["Top kaybı anı","Rakip stoper top aldığında","Geriye pas","Yan hat topları"]',
      where_to_press: 'Rakip yarı sahada çok yüksek baskı. Topu kaybettiğimiz bölgede anında tetiklenme. Orta sahada yoğun baskı alanları.',
      when_to_press: 'Top kaybından hemen sonra. Rakip arkası döndüğünde. Stoperde top olduğunda. Yan hatta tuzak anında.',
      how_to_press: 'Topu kazandığımız oyuncuya en yakın 3-4 oyuncu anında bastırır. Kaçış yolları kesilir. Yüksek yoğunlukta grup baskısı. Fiziksel üstünlük kullanımı.',
      pressing_traps: 'Yan hatta 3-4 oyuncu ile tuzak. Stophere köşeleme. İzole edilen oyuncuya grup baskısı. Orta saha merkezinde kıskaca alma.'
    },
    pressing_zones: [
      {
        trap_name: 'Gegenpress Tetikleme',
        trap_zone: 'Top kaybedilen bölge (genelde rakip yarı saha)',
        trap_trigger: 'Top kaybı anında',
        trap_setup: 'Tüm oyuncular top kaybı ihtimalini düşünerek pozisyon alır. En yakın 3-4 oyuncu 5 metre mesafede hazır. Diğerleri kaçış yollarını gözetler.',
        trap_execution: 'Top kaybında en yakın oyuncu 1 saniye içinde bastırır. 2-3 destek oyuncu kaçış yollarını kapar. 5-8 saniye yoğun baskı. Geri kazanım veya faul.',
        player_roles_involved: 'En yakındaki oyuncu (ilk baskı), Çevre oyuncular (pas yolu kesme), Geri kalanlar (ikinci dalga)',
        success_rate_high_against: 'Top tutan takımlar, teknik zayıf orta saha, baskıya alışık olmayan takımlar',
        success_rate_low_against: 'Uzun top oynayan takımlar, çok hızlı çıkış yapan sistemler, kaleci katılımı yüksek yapılar'
      },
      {
        trap_name: 'Kanat Fulltrap',
        trap_zone: 'Yan koridor orta saha hattı',
        trap_trigger: 'Rakip kanat oyuncusu topu aldığında',
        trap_setup: 'Kanat bek + orta saha + kanat üçgeni hazır pozisyonda. İçeri geçiş yolu kapalı görünümü. Yan hat açık bırakılır.',
        trap_execution: 'Top gelince kanat bek önden baskı. Orta saha içe kesme yolunu kapar. Kanat arkadan destek. Oyuncuyu yan çizgiye sıkıştırma.',
        player_roles_involved: 'Kanat Bek (ön baskı), Orta Saha 8 (içe kesme bloke), Kanat (destek ve yan kapama)',
        success_rate_high_against: 'Kanat oyununa bağımlı sistemler, bire bir zayıf oyuncular, merkez alternatifi az takımlar',
        success_rate_low_against: 'Çift kanat bek sistemler, merkezi iyi kullanan takımlar, hızlı kombinasyon oynayan yapılar'
      },
      {
        trap_name: 'Orta Saha Kıskacı',
        trap_zone: 'Merkez orta saha çemberi',
        trap_trigger: 'Rakip orta saha oyuncusu arkası dönük top aldığında',
        trap_setup: 'Üç orta saha oyuncusu üçgen formasyonunda. 6 numara ön baskıya hazır. İki 8 pas yollarını gözetler. Kompakt 15 metre alan.',
        trap_execution: '6 numara arkadan bastırır. İki 8 yan pas yollarını kapar. Forvet hattı geriye dönüş pasını bloke eder. Oyuncuyu izole edip hata yaptırma.',
        player_roles_involved: 'Defansif Orta Saha (direkt baskı), İki 8 (pas yolu kontrolü), Forvet hattı (geri pas bloke)',
        success_rate_high_against: 'Pivot üzerinden oynayan sistemler, arkası dönük oynayan 10 numara, orta saha zayıf takımlar',
        success_rate_low_against: 'Uzun top oynayan sistemler, çift pivot yapılar, hızlı tek dokunuş kombinasyon oynayan takımlar'
      },
      {
        trap_name: 'Stoper Yüksek Baskı',
        trap_zone: 'Rakip ceza sahası önü',
        trap_trigger: 'Kaleciden stopere kısa pas',
        trap_setup: 'Forvet hattı yüksek pozisyon. Orta saha 10 metre geride destek hazır. Kanat bekler içe daralmış. Yüksek savunma hattı.',
        trap_execution: 'Forvet stopere bastırır. Kanatlar beklere pas yolunu keser. Orta saha pivota pas yolunu kapar. Stoperi uzun topa veya hataya zorlar.',
        player_roles_involved: 'Forvet (stoper baskısı), Kanatlar (bek yolu kesme), Orta Saha (pivot kapama), Defans (yüksek hat)',
        success_rate_high_against: 'Kısa buildup yapan takımlar, teknik zayıf stopler, baskı altında panik yapan takımlar',
        success_rate_low_against: 'Uzun top tercih eden takımlar, sweeper keeper yapılar, 3 stoper sistemler'
      }
    ]
  },
  {
    id: 3,
    name: 'Conte Wing-Back',
    possession: {
      possession_style: 'Kanat Bek Dominasyonu',
      in_possession_shape: '3-4-3 / 3-5-2 Asimetrik',
      passing_principles: '["Kanat beklere sürekli servis","Stoperlerden geniş açılış","Orta sahadan dikey paslar","Forvet ikili kombinasyonları","Üçgen oluşumları"]',
      movement_principles: '["Kanat beklerin box-to-box koşuları","Stoperler geniş pozisyon","Forvet ikilisinin mobilitesi","Orta saha sıkı kompakt","Ani tempo değişimleri"]',
      progression_patterns: 'Üç stoper geniş buildup kurar. Kanat bekler koridorları kaplar. Orta saha ikilisi pivot görevi görür. Kanat bekerden ilerleme veya forvet ikilisine dikey pas.',
      circulation_patterns: 'Üç stoper arasında top dolaşımı. Kanat bekler geniş pozisyonda outlet. Orta saha tempo kontrol eder. Stoper-kanat bek devresi ile kanat değişimi.',
      overload_patterns: 'Bir tarafta kanat bek + 10 numara + kanat üçgeni. Karşı kanat bek savunmada kalır. Asimetrik yapı. Forvet ikilisi alternatif akın yolu. Orta sahada sayısal dengelik.'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt Blok Defansı',
      pressing_philosophy: 'Orta saha hattından blok savunma',
      counter_attack_philosophy: 'Top kazanımında kanat bekerle hızlı çıkış',
      out_of_possession_shape: '5-3-2 / 5-4-1 Derin Blok',
      pressing_triggers: '["Rakip kanat beklere pas","Yan hatlarda top","Orta saha merkezinde kötü dokunuş","Uzun top kontrolü"]',
      where_to_press: 'Kendi yarı sahada orta blok. Merkezi kompakt tutma. Yan koridorlar kullanarak baskı. Ceza sahası önü yoğun savunma.',
      when_to_press: 'Rakip kanat beke pas yaptığında. Orta sahada kötü kontrolde. Uzun top geldiğinde. Yan hatta tuzak kurulduğunda.',
      how_to_press: 'Kompakt 5li savunma hattı. Orta saha üçlüsü dar alan kapama. Forvet hattı pas yollarını kesme. Ani sıkıştırma ile top kazanma.',
      pressing_traps: 'Yan hatta 3lü tuzak. Orta sahada dar alan kıskacı. Forvet ikilisi ile stoper izolasyonu. 5-3-2 sıkışık blok ile merkez kapama.'
    },
    pressing_zones: [
      {
        trap_name: 'Kanat Bek Tuzağı',
        trap_zone: 'Yan koridor orta saha',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat bek + orta saha + kanat üçgeni yan hatta hazır. Beşli savunmaya geçişte kanat bek hızla geri döner. Kompakt yapı.',
        trap_execution: 'Kanat oyuncusu ön baskı. Orta saha içe pas yolunu keser. Kanat bek yan çizgiyi kapar. Beşli savunmadan destek gelir. 3v1 üstünlük.',
        player_roles_involved: 'Kanat Oyuncusu (ön baskı), Orta Saha (içe kesme bloke), Kanat Bek (yan hat), Stoper (destek)',
        success_rate_high_against: 'Kanat oyunu yoğun sistemler, yavaş buildup yapan takımlar, bire bir zayıf kanat bekler',
        success_rate_low_against: 'Merkez odaklı oyun, hızlı kombinasyon, inside forward kullanımı yüksek takımlar'
      },
      {
        trap_name: 'Merkez Sıkıştırma',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip orta sahaya top geldiğinde',
        trap_setup: 'Orta saha ikilisi kompakt pozisyon. Forvet ikilisi geri düşer. Beşli defans sıkı hat. Merkez 20 metre kadar dar tutulur.',
        trap_execution: 'Orta saha ikilisi direkt baskı. Forvet ikilisi pas yollarını kapar. Beşli defans arkayı tutar. Dar alanda izolasyon ve hata yaptırma.',
        player_roles_involved: 'İki Orta Saha (direkt baskı), İki Forvet (pas yolu kesme), Beşli Defans (arka kontrol)',
        success_rate_high_against: 'Merkezi iyi kullanamayan takımlar, orta saha üstünlüğüne bağımlı sistemler, baskı altında zayıf oyuncular',
        success_rate_low_against: 'Kanat oyunu iyi takımlar, uzun top tercih eden sistemler, hızlı kanat değişimi yapan yapılar'
      },
      {
        trap_name: 'Beşli Blok Duvarı',
        trap_zone: 'Kendi ceza sahası önü',
        trap_trigger: 'Rakip final üçlüde topu ilerletttiğinde',
        trap_setup: 'Beş defans oyuncusu kompakt hat. Orta saha üçlüsü önlerinde sıkı blok. Forvet ikilisi pas yollarını bloke eder. 10-15 metre kompakt alan.',
        trap_execution: 'Beşli defans hat savunması. Orta saha destek ve ara boşluklar. Forvetler derin pas yollarını keser. Topa yakın oyuncu bastırır, diğerleri boşlukları kapatır.',
        player_roles_involved: 'Beş Defans (ana hat), Üç Orta Saha (destek ve ara boşluk), İki Forvet (geri dönen pas bloke)',
        success_rate_high_against: 'Uzun top oynayan takımlar, orta vuruş ağırlıklı sistemler, bireysel bire bir bağımlı takımlar',
        success_rate_low_against: 'Hızlı kombinasyon oynayan takımlar, iyi ayak altı tekniği, overload yaratma yeteneği yüksek sistemler'
      }
    ]
  },
  {
    id: 4,
    name: 'Ancelotti Balanced',
    possession: {
      possession_style: 'Dengeli ve Esnek',
      in_possession_shape: '4-3-3 Varyasyonları',
      passing_principles: '["Pragmatik pas seçimi","Tempo kontrol yeteneği","Esnek geçişler","Oyuncu kalitesine güven","Durum okuma odaklı"]',
      movement_principles: '["Oyuncu özgürlüğü","Doğal pozisyonlar","Yaratıcılığa alan","Duruma göre adaptasyon","Akışkan hareketlilik"]',
      progression_patterns: 'Esnek buildup. Durum okuma ile kısa veya uzun seçim. Oyuncu kalitesine güven. Modric tipi pivot üzerinden yaratıcılık. Kanatların doğal oyunu.',
      circulation_patterns: 'Tempo kontrolü önemli. Yavaşlatma-hızlandırma dengesi. Beklerle top dolaşımı. Pivot üzerinden taraf değişimi. Pragmatik sahiplik.',
      overload_patterns: 'Doğal üstünlükler yaratma. Kroos-Modric ikilisi ile orta saha baskınlığı. Kanat bekler duruma göre katılır. Forvet üçlüsünün mobilitesi.'
    },
    non_possession: {
      defensive_philosophy: 'Akıllı Pozisyonel Savunma',
      pressing_philosophy: 'Duruma göre baskı - ekonomik enerji',
      counter_attack_philosophy: 'Dengeli geçiş, kaliteli oyuncularla hızlı çıkış',
      out_of_possession_shape: '4-3-3 Orta Blok',
      pressing_triggers: '["Oyuncu kalite farkı anı","Rakip hata yaptığında","Stratejik bölgelerde","Enerji ekonomisi ile baskı"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt yapı. Stratejik bölgelerde tetikleme. Merkezi koruma öncelikli.',
      when_to_press: 'Rakip hata yaptığında. Oyuncu kalite farkı görüldüğünde. Yan hatta tuzak fırsatında. Maç durumuna göre tetikleme.',
      how_to_press: 'Akıllı pozisyonel baskı. Enerji tasarrufu önemli. Doğru anı bekleme. Grup organizasyonu ile etkili baskı. Pragmatik yaklaşım.',
      pressing_traps: 'Seçici baskı noktaları. Oyuncu kalitesine göre hedefleme. Yan hatta fırsat tuzakları. Orta sahada stratejik kıskaca alma.'
    },
    pressing_zones: [
      {
        trap_name: 'Stratejik Orta Saha Baskısı',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip zayıf orta saha oyuncusu top aldığında',
        trap_setup: 'Orta saha üçlüsü oyuncu kalitesini değerlendirir. Zayıf oyuncuya karşı daha agresif. Kaçış yolları gözetilir. Ekonomik enerji.',
        trap_execution: 'Casemiro tipi 6 numara direkt baskı. İki 8 pas yollarını kapar. Akıllı pozisyonel oyun. Hata yaptırma veya top kazanımı.',
        player_roles_involved: 'Defansif Orta Saha (hedefli baskı), İki 8 (pas yolu kontrolü), Forvet hattı (geri pas bloke)',
        success_rate_high_against: 'Orta saha kalitesi düşük takımlar, baskı altında zayıf oyuncular, teknik yetersiz ekipler',
        success_rate_low_against: 'Kaliteli orta saha oyuncular, baskı altında rahat takımlar, hızlı tek dokunuş oynayan sistemler'
      },
      {
        trap_name: 'Kanat Fırsat Baskısı',
        trap_zone: 'Yan koridor',
        trap_trigger: 'Uygun fırsat olduğunda kanat oyuncusuna baskı',
        trap_setup: 'Kanat + orta saha + bek üçgeni hazır ama pasif. Fırsat değerlendirmesi yapılır. Enerji ekonomisi öncelikli. Doğru an beklenir.',
        trap_execution: 'Fırsat anında aktive olur. Üçlü koordineli baskı. Yan çizgi kullanımı. Hızlı top kazanımı veya faul. Sonra tekrar pasif moda.',
        player_roles_involved: 'Kanat (ön baskı), Orta Saha (destek), Bek (yan kapama)',
        success_rate_high_against: 'Bire bir zayıf oyuncular, yorgun takımlar, kanat oyununa mecbur sistemler',
        success_rate_low_against: 'Kaliteli kanat oyuncular, hızlı kombinasyon yapan takımlar, merkez alternatifi iyi sistemler'
      },
      {
        trap_name: 'Blok İçi Koruma',
        trap_zone: 'Final üçlü ceza sahası önü',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: 'Kompakt 4-3 yapısı. Merkez yoğun korunur. Kanatlar içe daralır. 15 metre sıkı alan. Pozisyonel disiplin.',
        trap_execution: 'Sıkı blok savunması. Ara boşluklar kapalı. Topa yakın oyuncu bastırır. Diğerleri pozisyon tutar. Top kazanımı veya faul.',
        player_roles_involved: 'Dörtlü Defans (ana hat), Üçlü Orta Saha (destek ve ara boşluk), Forvetler (geri dönüş desteği)',
        success_rate_high_against: 'Uzun top oynayan takımlar, bireysel oyuna bağımlı sistemler, ceza sahası dışı vuruş ağırlıklı',
        success_rate_low_against: 'Hızlı kombinasyon oynayan takımlar, overload yaratma yeteneği yüksek, iyi ayak altı tekniği olan ekipler'
      }
    ]
  },
  {
    id: 5,
    name: 'Mourinho Defensive',
    possession: {
      possession_style: 'Pragmatik ve Verimli',
      in_possession_shape: '4-2-3-1 Kontrollü',
      passing_principles: '["Güvenli pas seçimi","Gereksiz risk almama","Top koruma odaklı","Belirli kalıplara sadık","Disiplinli dolaşım"]',
      movement_principles: '["Kontrollü hareketler","Belirli görev tanımları","Savunma dengesi öncelikli","Karşı atak için hazırlık","Disiplinli pozisyonlama"]',
      progression_patterns: 'Güvenli buildup. Çift pivot üzerinden kontrol. 10 numara bağlantı. Kanatlar geniş pozisyon tutar. Forvet hedef adam. Kontrollü ilerleme.',
      circulation_patterns: 'Çift pivot arasında top devri. Beklerle güvenli dolaşım. Gereksiz risk alınmaz. Tempo düşük tutulur. Rakip yorulması beklenir.',
      overload_patterns: 'Seçici yüklemeler. 10 numara etrafında kısa kombinasyonlar. Bir tarafta yoğunlaşma, diğer taraf dengede. Karşı atak dengesi her zaman korunur.'
    },
    non_possession: {
      defensive_philosophy: 'Katı Savunma Organizasyonu',
      pressing_philosophy: 'Düşük blok savunma - enerji tasarrufu',
      counter_attack_philosophy: 'Top kazanımı ardından hızlı ve etkili karşı atak',
      out_of_possession_shape: '4-4-1-1 / 4-5-1 Düşük Blok',
      pressing_triggers: '["Yan hatta kesin fırsat","Rakip stoper hatası","Savunma üçlüsü içinde top","Maç durumu gerektirdiğinde"]',
      where_to_press: 'Kendi yarı sahada düşük blok. Ceza sahası önü yoğun koruma. Merkez tamamen kapalı. Kanatlar dar tutulur.',
      when_to_press: 'Yan hatta kesin fırsat. Rakip hata yaptığında. Maç skoru gerektirdiğinde. Stratejik anlarda tetikleme.',
      how_to_press: 'Kompakt blok savunması. İki hat arası mesafe minimum. Merkez tamamen kapalı. Grup organizasyonu mükemmel. Disiplinli baskı.',
      pressing_traps: 'Yan hatta 4 oyuncu tuzağı. Düşük blok içinde dar alan kıskacı. Orta sahada çift pivot ile merkez kilidi. 4-4-2 kompakt duvar.'
    },
    pressing_zones: [
      {
        trap_name: 'Yan Hat 4lü Tuzak',
        trap_zone: 'Yan koridor savunma üçlüsü',
        trap_trigger: 'Rakip kanat beke pas ve kesin fırsat',
        trap_setup: 'Kanat + 10 numara + orta saha + bek dörtlüsü. Düşük blok içinden tetikleme. Merkez tamamen kapalı. Yan çizgi kullanımı.',
        trap_execution: 'Dörtlü eşzamanlı baskı. Yan çizgi ek savunucu gibi. Oyuncuyu köşeye sıkıştırma. Top kazanımı ardından hızlı karşı atak.',
        player_roles_involved: 'Kanat (ön), 10 Numara (merkez bloke), Orta Saha (destek), Bek (yan kapama)',
        success_rate_high_against: 'Kanat oyununa mecbur takımlar, bire bir zayıf oyuncular, yavaş buildup yapan sistemler',
        success_rate_low_against: 'Hızlı kombinasyon yapan takımlar, merkez alternatifi iyi sistemler, kalit eli kanat oyuncular'
      },
      {
        trap_name: 'Çift Pivot Kilidi',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Çift pivot kompakt pozisyon. 10 numara önlerinde. Kanat oyuncular içe daralır. Merkez tamamen kapalı. 4-4-1-1 sıkı blok.',
        trap_execution: 'Çift pivot merkezi kilitledi. Pas yolları yok. Rakip kenarlara zorlanır. 10 numara destek verir. Kompakt yapı bozulmaz.',
        player_roles_involved: 'Çift Pivot (merkez kilidi), 10 Numara (ön destek), Kanatlar (içe daralma), Forvet (hedef izolasyon)',
        success_rate_high_against: 'Merkez odaklı takımlar, pivot kullanımı yoğun sistemler, orta saha bağımlı yapılar',
        success_rate_low_against: 'Kanat oyunu iyi takımlar, uzun top oynayan sistemler, geniş açılım yapan yapılar'
      },
      {
        trap_name: 'Düşük Blok Duvarı',
        trap_zone: 'Ceza sahası önü 25 metre',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: '8 oyunculu kompakt blok. İki hat arası 5-8 metre. Merkez tamamen kapalı. Forvet bile savunmada. Sıkı organizasyon.',
        trap_execution: 'İki hat kompakt hareket eder. Ara boşluklar yok. Topa yakın oyuncu bastırır ama blok bozulmaz. Top kazanımı veya faul. Sonra hızlı karşı atak.',
        player_roles_involved: 'Dörtlü Defans (ana hat), Dörtlü Orta Saha (ikinci hat), 10 ve Forvet (ön destek)',
        success_rate_high_against: 'Uzun top oynayan takımlar, bireysel bire bir bağımlı, ceza sahası dışı vuruş ağırlıklı',
        success_rate_low_against: 'Overload yaratma yeteneği yüksek, hızlı kombinasyon oynayan, hareket oyunu iyi takımlar'
      }
    ]
  },
  {
    id: 6,
    name: 'Mourinho Bus',
    possession: {
      possession_style: 'Minimum Risk Oyun',
      in_possession_shape: '4-5-1 Ultra Güvenli',
      passing_principles: '["En güvenli pas seçimi","Top koruma maksimum","Geriye dönüş izinli","Zaman oyunu","Rakip yorma stratejisi"]',
      movement_principles: '["Minimal hareket","Enerji tasarrufu","Savunma pozisyonu korunur","Kontrollü tempolar","Disiplin üst seviye"]',
      progression_patterns: 'Minimal ilerleme çabası. Çoğunlukla geriye ve yan geçişler. Forvet izole ve hedef adam. Çok nadiren hızlı çıkış. Top koruma odaklı.',
      circulation_patterns: 'Arka beşli arasında sürekli top devri. Orta saha bloke kalır. Tempo çok düşük. Zaman oyunu yapılır. Rakip yorgunluğu hedeflenir.',
      overload_patterns: 'Neredeyse hiç overload yapılmaz. Tüm oyuncular savunma pozisyonunu korur. Forvet izole kalır. Tek amaç savunma organizasyonu.'
    },
    non_possession: {
      defensive_philosophy: 'Ultra Defansif Park The Bus',
      pressing_philosophy: 'Sıfır baskı - tamamen bekle',
      counter_attack_philosophy: 'Çok nadir uzun top karşı atakları',
      out_of_possession_shape: '5-4-1 / 4-5-1 Ultra Düşük Blok',
      pressing_triggers: '["Neredeyse hiçbir tetikleyici yok","Sadece ceza sahası içinde top","Yan hatta son çare","Tamamen pasif"]',
      where_to_press: 'Kendi ceza sahası önü. Ultra düşük blok. Ceza sahasında bile oyuncu sayısı çok. Tamamen savunma odaklı.',
      when_to_press: 'Sadece ceza sahası içinde. Rakip şut pozisyonunda. Hemen hemen hiç baskı yok. Tamamen bekle ve savun.',
      how_to_press: '10 oyuncu savunmada. Çift hat ultra kompakt. Ara boşluk sıfır. Sadece blok et ve kapa. Topa gidilmez, alan kapatılır.',
      pressing_traps: 'Tuzak yok. Sadece ultra kompakt blok savunması. 5-4-1 çift duvar. Ceza sahası içi bile kalabalık. Tamamen pasif savunma.'
    },
    pressing_zones: [
      {
        trap_name: 'Ceza Sahası Bloke',
        trap_zone: 'Ceza sahası ve hemen önü',
        trap_trigger: 'Rakip ceza sahası içine girdiğinde',
        trap_setup: '10 oyuncu ceza sahası ve çevresinde. Beşli defans ana hat. Orta saha önlerinde ikinci hat. Forvet bile geri döner. Ultra kompakt.',
        trap_execution: 'Alan kapama odaklı. Topa değil, bölgeye odaklanma. Her oyuncu kendi bölgesini korur. Vücut blokeleri. Faul bile yapılır.',
        player_roles_involved: 'Beşli Defans (ana hat), Beşli Orta Saha (ikinci hat), Forvet (geri dönüş)',
        success_rate_high_against: 'Uzun top oynayan takımlar, ceza sahası dışı vuruş yapan, hava topu bağımlı',
        success_rate_low_against: 'Çok hızlı kombinasyon oynayan, overload yaratma yeteneği çok yüksek, bireysel kalite çok üst seviye'
      },
      {
        trap_name: 'Çift Hat Duvarı',
        trap_zone: 'Ceza sahası önü 20 metre',
        trap_trigger: 'Rakip final üçlüde topu taşıdığında',
        trap_setup: 'Beşli defans + Beşli orta saha çift hat. Arası 5 metre. Tamamen kompakt. Forvet bile döner. 11 oyuncu savunma.',
        trap_execution: 'İki hat birlikte hareket. Ara boşluk sıfır. Topa gidilmez, alan kapatılır. Pas yolları bloke edilir. Vücut blokeleri.',
        player_roles_involved: 'Beşli Defans (birinci hat), Beşli Orta Saha (ikinci hat), Forvet (üçüncü hat destek)',
        success_rate_high_against: 'Bireysel oyuna bağımlı takımlar, orta vuruş yapan, hava topu oynayan',
        success_rate_low_against: 'Çok kaliteli takımlar, sabırlı oynayan, overload çok iyi yapan sistemler'
      },
      {
        trap_name: 'Yan Koridor Kapama',
        trap_zone: 'Yan koridorlar savunma üçlüsü',
        trap_trigger: 'Rakip kanat oyuncusuna top',
        trap_setup: 'Kanat bek + orta saha + kanat bek (beşli defanstan) üçlüsü. İçeri geçiş tamamen kapalı. Yan çizgi kullanımı.',
        trap_execution: 'Üçlü yan koridoru tamamen kapar. İçeri geçiş imkansız. Orta saha desteği ile sayısal üstünlük. Alan kapatma.',
        player_roles_involved: 'Kanat Bek (ön), Orta Saha (içe kesme bloke), Yan Stoper (destek)',
        success_rate_high_against: 'Kanat oyununa mecbur takımlar, merkez alternatifi zayıf, bire bir bağımlı',
        success_rate_low_against: 'Merkezi iyi kullanan takımlar, hızlı taraf değiştiren, overload yapabilen sistemler'
      }
    ]
  },
  {
    id: 7,
    name: 'Tuchel Compact',
    possession: {
      possession_style: 'Kontrollü Pozisyonel',
      in_possession_shape: '3-4-2-1 / 3-4-3 Asimetrik',
      passing_principles: '["Yarı alanlarda yoğunlaşma","Kanat bek dever sistemi","Stoperlerden buildup","10lar arası bölgede oyun","Kontrollü progresyon"]',
      movement_principles: '["Kanat beklerin akıllı pozisyonları","Stoper geniş açılımı","10lar mobil ve dinamik","Forvet bağlantı oyuncusu","Asimetrik rotasyonlar"]',
      progression_patterns: 'Üç stoperden geniş buildup. Kanat bekler koridorları alır. 10lar yarı alanlarda boşluk bulur. Forvet bağlantı kurar. Asimetrik ilerleme.',
      circulation_patterns: 'Stoperler arasında tempo kontrolü. Kanat bek dever sistemi. 10lar üzerinden yaratıcılık. Taraf değişimleri ile boşluk yaratma.',
      overload_patterns: 'Bir tarafta 10 + kanat bek + kanat üçgeni. Karşı taraf dengeli. Stoperler geniş destek. Forvet bağlantı. Asimetrik yükleme.'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt ve Organize',
      pressing_philosophy: 'Orta blok baskı - seçici tetikleme',
      counter_attack_philosophy: 'Hızlı geçişler, kanat bekerle çıkış',
      out_of_possession_shape: '5-3-2 / 5-2-3 Kompakt Blok',
      pressing_triggers: '["Rakip kanat beklere pas","Yan hatlarda tuzak","Orta sahada kötü kontrol","Stoper izolasyonu"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt. Yan koridorlarda aktive olma. Merkezi sıkı tutma.',
      when_to_press: 'Yan hatta tuzak fırsatı. Orta sahada hata. Kanat beke pas. Stoper izole edildiğinde.',
      how_to_press: 'Beşli defans hattı. Orta saha kompakt destek. Forvet hattı pas yolu kesme. Grup organizasyonu ile baskı. Seçici tetikleme.',
      pressing_traps: 'Yan hatta 3-4 oyuncu tuzağı. Orta sahada dar alan kıskacı. Stoper izolasyonu forvet baskısı. 5-3 kompakt blok ile merkez kapama.'
    },
    pressing_zones: [
      {
        trap_name: 'Yan Koridor Aktive',
        trap_zone: 'Yan koridor orta saha hattı',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat bek + 10 numara + orta saha + stoper dörtlüsü. Beşli defansa geçiş hazır. Yan çizgi kullanımı.',
        trap_execution: 'Dörtlü eşzamanlı baskı. Kanat bek ön, 10 numara içe kesme bloke, orta saha destek, stoper arka. Yan çizgi kullanılır.',
        player_roles_involved: 'Kanat Bek (ön baskı), 10 Numara (içe kesme bloke), Orta Saha (destek), Stoper (arka)',
        success_rate_high_against: 'Kanat oyunu yoğun takımlar, bire bir zayıf kanat bekler, merkez alternatifi az sistemler',
        success_rate_low_against: 'Merkezi iyi kullanan takımlar, hızlı kombinasyon, kanat bek kalitesi yüksek sistemler'
      },
      {
        trap_name: 'Merkez Kompakt Kıskaç',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Orta saha ikilisi kompakt. İki 10 numara destek. Beşli defans arkada sıkı. 15 metre dar alan.',
        trap_execution: 'Orta saha ikilisi direkt baskı. İki 10 pas yollarını kapar. Beşli defans arkayı tutar. Dar alanda izolasyon.',
        player_roles_involved: 'İki Orta Saha (direkt baskı), İki 10 Numara (pas yolu kesme), Beşli Defans (arka kontrol)',
        success_rate_high_against: 'Orta saha zayıf takımlar, pivot bağımlı sistemler, baskı altında zayıf oyuncular',
        success_rate_low_against: 'Kanat oyunu iyi takımlar, uzun top tercih eden, orta saha kalitesi yüksek sistemler'
      },
      {
        trap_name: 'Beşli Blok Duvar',
        trap_zone: 'Ceza sahası önü',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: 'Beşli defans kompakt hat. Orta saha önlerinde destek. 10lar ara boşlukları kapar. Forvet geri döner. Ultra kompakt.',
        trap_execution: 'Beşli defans hat savunması. Orta saha ikinci hat. 10lar ara boşlukları kapar. Forvet pas yollarını keser. Kompakt blok.',
        player_roles_involved: 'Beşli Defans (ana hat), Orta Saha (ikinci hat), 10lar (ara boşluk), Forvet (pas yolu kesme)',
        success_rate_high_against: 'Uzun top oynayan takımlar, ceza sahası dışı vuruş ağırlıklı, bireysel bire bir bağımlı',
        success_rate_low_against: 'Hızlı kombinasyon oynayan, overload yaratma yeteneği yüksek, hareket oyunu iyi takımlar'
      }
    ]
  },
  {
    id: 8,
    name: 'Ancelotti Diamond',
    possession: {
      possession_style: 'Elmas Orta Saha Kontrolü',
      in_possession_shape: '4-4-2 Elmas / 4-1-2-1-2',
      passing_principles: '["Orta saha üzerinden kontrol","Elmas rotasyonları","Kısa pas kombinasyonları","Merkezi domine etme","Forvet ikilisi bağlantısı"]',
      movement_principles: '["Elmas sürekli rotasyon","Kanat beklerin katılımı","Forvet ikilisi mobil","10 numara yaratıcı özgürlük","Orta saha baskınlığı"]',
      progression_patterns: 'Çift stoperden elmas pivota pas. Pivot dağıtıcı rol. İki 8 numara yarı alanlarda. 10 numara yaratıcı. Forvet ikilisi bağlantı kurar.',
      circulation_patterns: 'Elmas içinde top dolaşımı. Pivot-8ler-10 rotasyonu. Kanat bekler outlet. Forvet ikilisi alternatif. Orta saha baskınlığı.',
      overload_patterns: 'Orta sahada 4 oyuncu ile üstünlük. Kanat bek katılımı ile kanat overload. Forvet ikilisi ve 10 ile final üçlü yoğunluğu.'
    },
    non_possession: {
      defensive_philosophy: 'Elmas Kompakt Blok',
      pressing_philosophy: 'Orta saha elmas ile merkez kilit',
      counter_attack_philosophy: 'Forvet ikilisi ile hızlı çıkış',
      out_of_possession_shape: '4-4-2 Elmas Kompakt',
      pressing_triggers: '["Rakip orta sahaya pas","Merkez bölge topu","Pivot izolasyonu","Elmas aktive anları"]',
      where_to_press: 'Orta saha merkez çember. Elmas formasyon ile merkez kilidi. Kanatlar koridorları kontrol eder.',
      when_to_press: 'Rakip orta sahaya ilerlediğinde. Merkez bölgede top. Pivot izole edildiğinde. Elmas koordine aktive olur.',
      how_to_press: 'Elmas formasyon merkezi kilitledi. Dörtlü defans arkada. Forvet ikilisi geri dönüş. Kompakt 4-4-2 blok. Merkez tamamen kapalı.',
      pressing_traps: 'Elmas içinde merkez kıskacı. Orta sahada 4 oyuncu tuzağı. Pivot-8ler-10 dörtlüsü ile izolasyon. Kompakt blok ile alan kapama.'
    },
    pressing_zones: [
      {
        trap_name: 'Elmas Merkez Kıskacı',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip orta saha oyuncusu top aldığında',
        trap_setup: 'Elmas formasyon: Pivot altta, iki 8 yanlarda, 10 üstte. Forvet ikilisi önde. Kompakt 4-4-2. Merkez 15 metre.',
        trap_execution: 'En yakın elmas oyuncusu bastırır. Diğer üçü pas yollarını kapar. Forvet ikilisi geri dönüş desteği. Merkez tamamen kapalı.',
        player_roles_involved: 'Pivot (alt kapama), İki 8 (yan kapama), 10 Numara (üst kapama), Forvet İkilisi (geri destek)',
        success_rate_high_against: 'Merkez odaklı takımlar, orta saha zayıf sistemler, pivot bağımlı yapılar',
        success_rate_low_against: 'Kanat oyunu iyi takımlar, geniş açılım yapan, uzun top tercih eden sistemler'
      },
      {
        trap_name: 'Pivot İzolasyonu',
        trap_zone: 'Rakip pivot bölgesi',
        trap_trigger: 'Rakip pivota geriye pas',
        trap_setup: '10 numara pivotun önünde. İki 8 pas yollarını gözetir. Forvet ikilisi yüksek pozisyon. Pivot izole edilir.',
        trap_execution: '10 numara pivota bastırır. İki 8 yan pasları kapar. Forvet ikilisi geriye dönüş pasını bloke eder. İzolasyon ve hata yaptırma.',
        player_roles_involved: '10 Numara (direkt baskı), İki 8 (pas yolu kesme), Forvet İkilisi (geri pas bloke)',
        success_rate_high_against: 'Tek pivot sistemler, teknik zayıf pivotlar, geriye oynayan takımlar',
        success_rate_low_against: 'Çift pivot sistemler, kaliteli pivotlar, hızlı açılım yapan takımlar'
      },
      {
        trap_name: 'Kompakt 4-4-2 Blok',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip topu ilerletttiğinde',
        trap_setup: 'Dörtlü defans + elmas orta saha + forvet ikilisi. İki hat arası 10 metre. Merkez kompakt. Kanatlar koridoru kontrol eder.',
        trap_execution: 'İki hat birlikte hareket. Elmas merkezi kilitledi. Forvet ikilisi pas yollarını keser. Kompakt blok savunması.',
        player_roles_involved: 'Dörtlü Defans (ana hat), Elmas Orta Saha (ikinci hat), Forvet İkilisi (ön hat)',
        success_rate_high_against: 'Uzun top oynayan takımlar, bireysel oyuna bağımlı, merkez odaklı sistemler',
        success_rate_low_against: 'Kanat oyunu çok iyi, overload yaratma yeteneği yüksek, hızlı kombinasyon oynayan takımlar'
      }
    ]
  },
  {
    id: 9,
    name: 'Arteta Inverted FB',
    possession: {
      possession_style: 'İçe Kesen Bek Dominasyonu',
      in_possession_shape: '2-3-5 / 3-2-5 Asimetrik Buildup',
      passing_principles: '["İçe kesen bek üzerinden progresyon","Yarı alanlarda yoğunlaşma","Kısa-orta pas kombinasyonları","Overload ile üstünlük","8lerin kutu akınları"]',
      movement_principles: '["İçe kesen bekler pivot rol","Kanatlar geniş pin edilir","8ler kutu içi koşular","10 numara false 9 düşüşü","Sürekli rotasyon"]',
      progression_patterns: 'Kaleci+iki stoper 3 buildup oluşturur. Bir bek içe pivot rol, diğer bek yüksek. 8ler yarı alanlarda. Kanatlar geniş pin. 10 düşer, 9 koşar.',
      circulation_patterns: 'İçe kesen bek üzerinden dağıtım. Yarı alanlarda 8 ve 10 kombinasyonları. Kanat değişimleri. Overload alanları yaratma.',
      overload_patterns: 'Bir tarafta kanat + 8 + içe kesen bek + 10 dörtlüsü. Karşı taraf dengeli. Asimetrik yapı. 2-3-5 formasyon ile final üçlü dominasyonu.'
    },
    non_possession: {
      defensive_philosophy: 'Yüksek Agresif Baskı',
      pressing_philosophy: 'Rakip yarı sahada yoğun baskı',
      counter_attack_philosophy: 'Hızlı geri kazanım ve kombinasyon',
      out_of_possession_shape: '4-3-3 / 4-4-2 Yüksek Blok',
      pressing_triggers: '["Rakip stoper top aldığında","Kanat beklere pas","Geriye dönüş pasları","Yan hatlarda tuzak"]',
      where_to_press: 'Rakip yarı sahada yüksek baskı. Buildup bölgesinde agresif. Merkezi kapatıp yan hatlara zorlama.',
      when_to_press: 'Stoper topu aldığında. Kanat beke pas. Geriye dönüş yapıldığında. Kötü dokunuşta.',
      how_to_press: 'Forvet hattı yüksek baskı. Orta saha pas yollarını kapar. İçe kesen bek pivot görevi. Agresif grup baskısı.',
      pressing_traps: 'Yan hatta 3-4 oyuncu tuzağı. Stoper baskısı ile uzun topa zorlama. Orta sahada yoğun kıskaca alma. Yüksek hat ile offsid tuzağı.'
    },
    pressing_zones: [
      {
        trap_name: 'Stoper Yüksek Baskı',
        trap_zone: 'Rakip ceza sahası önü',
        trap_trigger: 'Kaleciden stopere kısa pas',
        trap_setup: 'Forvet hattı yüksek. Orta saha 10 metre geride. İçe kesen bek pivot. Defans hattı orta sahada. Yüksek hat.',
        trap_execution: 'Forvet stopere bastırır. Kanatlar beklere pas yolunu keser. Orta saha pivotu bloke eder. Stoperi hataya veya uzun topa zorlar.',
        player_roles_involved: 'Forvet (stoper baskısı), Kanatlar (bek yolu kesme), Orta Saha (pivot kapama), İçe Kesen Bek (destek)',
        success_rate_high_against: 'Kısa buildup yapan takımlar, teknik zayıf stopler, baskı altında panik yapan sistemler',
        success_rate_low_against: 'Uzun top tercih eden takımlar, sweeper keeper yapılar, 3 stoper sistemler'
      },
      {
        trap_name: 'Yan Hat 4lü Tuzak',
        trap_zone: 'Yan koridor rakip yarı saha',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat + 8 numara + içe kesen bek + stoper dörtlüsü. Merkez kapalı. Yan hat açık bırakılır. Tuzak kurulur.',
        trap_execution: 'Kanat önden bastırır. 8 numara içe kesme yolunu kapar. İçe kesen bek destek verir. Stoper yan çizgiyi keser. 4v1 üstünlük.',
        player_roles_involved: 'Kanat (ön baskı), 8 Numara (içe kesme bloke), İçe Kesen Bek (destek), Stoper (yan kapama)',
        success_rate_high_against: 'Kanat oyunu yoğun sistemler, bire bir zayıf kanat bekler, merkez alternatifi az takımlar',
        success_rate_low_against: 'Hızlı kombinasyon yapan takımlar, kanat bek kalitesi yüksek, merkezi iyi kullanan sistemler'
      },
      {
        trap_name: 'Orta Saha Overload Baskı',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'İki 8 + içe kesen bek + 10 numara dörtlüsü. Forvet hattı destek. Rakip orta sahasında sayısal üstünlük yaratma.',
        trap_execution: 'Dörtlü orta saha oyuncusu grup baskısı. En yakın bastırır, diğerleri pas yollarını kapar. Sayısal üstünlükle top kazanımı.',
        player_roles_involved: 'İki 8 Numara (baskı), İçe Kesen Bek (pivot destek), 10 Numara (ön baskı), Forvetler (geri pas bloke)',
        success_rate_high_against: 'Orta saha zayıf takımlar, sayısal eşitlikte zayıf kalan sistemler, baskı altında zayıf oyuncular',
        success_rate_low_against: 'Uzun top oynayan takımlar, kanat oyununa kaçabilen sistemler, kaliteli orta saha yapıları'
      }
    ]
  },
  {
    id: 10,
    name: 'Ten Hag Possession',
    possession: {
      possession_style: 'Ajax Pozisyonel Oyun',
      in_possession_shape: '4-3-3 / 3-2-5 Buildup',
      passing_principles: '["Sürekli üçgen oluşturma","Pozisyonel rotasyonlar","Kısa pas kombinasyonları","Yarı alanlarda oyun","Pivot dağıtımı"]',
      movement_principles: '["Bekler geniş açılım","Pivot düşüşü ile 3 buildup","İçe kesen kanatlar","False 9 düşüşleri","8lerin kutu akınları"]',
      progression_patterns: 'Kaleci-iki stoper-pivot 4 buildup. Bekler geniş. 8ler yarı alanlarda. Kanatlar içe keser. False 9 düşer, 8ler koşar. Ajax modeli.',
      circulation_patterns: 'Pivot üzerinden dağıtım. Stoper-pivot-8 üçgenleri. Kanat değişimleri. Sürekli hareket ve top dolaşımı.',
      overload_patterns: 'Yarı alanlarda 4v3 yaratma. Pivot-8-kanat-forvet dörtlüsü. Karşı bek dengede. Ajax asimetrik overload stratejisi.'
    },
    non_possession: {
      defensive_philosophy: 'Yüksek Pozisyonel Baskı',
      pressing_philosophy: 'Rakip buildup bölgesinde yoğun baskı',
      counter_attack_philosophy: 'Hızlı geri kazanım ve kombinasyon geçişler',
      out_of_possession_shape: '4-3-3 Yüksek Blok',
      pressing_triggers: '["Stoper top aldığında","Pivot geriye pas","Kanat beklere pas","Yan hatlarda tuzak"]',
      where_to_press: 'Rakip yarı sahada yüksek baskı. Buildup bölgesinde agresif. Merkezi kapatıp yan hatlara zorlama.',
      when_to_press: 'Stoper topu aldığında. Pivot geriye döndüğünde. Kanat beke pas. Kötü kontrolde.',
      how_to_press: 'Forvet hattı yüksek baskı. Orta saha pas yollarını kapar. Defans hattı yarı sahada. Grup koordinasyonu ile baskı.',
      pressing_traps: 'Yan hatta üçlü tuzak. Stoperelere yüksek baskı. Pivot izolasyonu. Orta sahada kompakt kıskaca alma.'
    },
    pressing_zones: [
      {
        trap_name: 'Buildup Yüksek Baskı',
        trap_zone: 'Rakip ceza sahası önü buildup',
        trap_trigger: 'Kaleci stoperlere kısa pas',
        trap_setup: 'Forvet hattı yüksek pozisyon. Orta saha pas yollarını gözetir. Defans hattı orta sahada. Yüksek kompakt hat.',
        trap_execution: 'Forvet stopere bastırır. Kanatlar beklere pas yolunu keser. Orta saha pivotu bloke eder. Uzun topa veya hataya zorlar.',
        player_roles_involved: 'Forvet (stoper baskısı), Kanatlar (bek yolu kesme), Orta Saha (pivot kapama), Defans (yüksek hat)',
        success_rate_high_against: 'Kısa buildup yapan takımlar, teknik zayıf stopler, baskı altında zayıf takımlar',
        success_rate_low_against: 'Uzun top oynayan takımlar, sweeper keeper yapılar, kaliteli buildup yapan sistemler'
      },
      {
        trap_name: 'Pivot İzolasyon Baskısı',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip pivota geriye pas',
        trap_setup: 'Forvet pivotun önünde. İki 8 pas yollarını gözetir. Kanatlar içe daralır. Pivotu izole etme.',
        trap_execution: 'Forvet pivota bastırır. İki 8 yan pasları kapar. Kanatlar geri dönüş desteği. Pivotu izole edip hata yaptırma.',
        player_roles_involved: 'Forvet (direkt baskı), İki 8 (pas yolu kesme), Kanatlar (destek ve ara kapama)',
        success_rate_high_against: 'Tek pivot sistemler, pivot bağımlı takımlar, teknik zayıf pivotlar',
        success_rate_low_against: 'Çift pivot sistemler, kaliteli pivotlar, hızlı açılım yapan takımlar'
      },
      {
        trap_name: 'Yan Koridor Üçlü Tuzak',
        trap_zone: 'Yan koridor rakip yarı saha',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat + 8 numara + bek üçgeni. Merkez kapalı görünümü. Yan hat açık bırakılır.',
        trap_execution: 'Kanat önden bastırır. 8 numara içe kesme yolunu kapar. Bek yan çizgiyi keser. 3v1 üstünlük ile top kazanımı.',
        player_roles_involved: 'Kanat (ön baskı), 8 Numara (içe kesme bloke), Bek (yan kapama)',
        success_rate_high_against: 'Kanat oyunu yoğun sistemler, bire bir zayıf oyuncular, merkez alternatifi az takımlar',
        success_rate_low_against: 'Hızlı kombinasyon yapan takımlar, kaliteli kanat bekler, merkezi iyi kullanan sistemler'
      }
    ]
  }
];

let completedSystems = 0;
const totalSystems = systems.length;

systems.forEach(system => {
  // 1. Possession Tactics Update
  db.run(`UPDATE possession_tactics SET
    possession_style = ?,
    in_possession_shape = ?,
    passing_principles = ?,
    movement_principles = ?,
    progression_patterns = ?,
    circulation_patterns = ?,
    overload_patterns = ?
    WHERE system_id = ?`,
  [
    system.possession.possession_style,
    system.possession.in_possession_shape,
    system.possession.passing_principles,
    system.possession.movement_principles,
    system.possession.progression_patterns,
    system.possession.circulation_patterns,
    system.possession.overload_patterns,
    system.id
  ], function(possErr) {
    if (possErr) {
      console.error(`❌ Sistem ${system.id} (${system.name}) possession hatası:`, possErr.message);
    } else {
      console.log(`✅ Sistem ${system.id} (${system.name}) possession güncellendi`);
    }

    // 2. Non-Possession Tactics Update
    db.run(`UPDATE non_possession_tactics SET
      defensive_philosophy = ?,
      pressing_philosophy = ?,
      counter_attack_philosophy = ?,
      out_of_possession_shape = ?,
      pressing_triggers = ?,
      where_to_press = ?,
      when_to_press = ?,
      how_to_press = ?,
      pressing_traps = ?
      WHERE system_id = ?`,
    [
      system.non_possession.defensive_philosophy,
      system.non_possession.pressing_philosophy,
      system.non_possession.counter_attack_philosophy,
      system.non_possession.out_of_possession_shape,
      system.non_possession.pressing_triggers,
      system.non_possession.where_to_press,
      system.non_possession.when_to_press,
      system.non_possession.how_to_press,
      system.non_possession.pressing_traps,
      system.id
    ], function(nonPossErr) {
      if (nonPossErr) {
        console.error(`❌ Sistem ${system.id} (${system.name}) non-possession hatası:`, nonPossErr.message);
      } else {
        console.log(`✅ Sistem ${system.id} (${system.name}) non-possession güncellendi`);
      }

      // 3. Delete existing pressing zones for this system
      db.run(`DELETE FROM pressing_trap_zones WHERE system_id = ?`, [system.id], function(delErr) {
        if (delErr) {
          console.error(`❌ Sistem ${system.id} eski pressing zones silinemedi:`, delErr.message);
        }

        // 4. Insert new pressing zones
        let insertedZones = 0;
        system.pressing_zones.forEach(zone => {
          db.run(`INSERT INTO pressing_trap_zones
            (system_id, trap_name, trap_zone, trap_trigger, trap_setup, trap_execution, player_roles_involved, success_rate_high_against, success_rate_low_against)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            system.id,
            zone.trap_name,
            zone.trap_zone,
            zone.trap_trigger,
            zone.trap_setup,
            zone.trap_execution,
            zone.player_roles_involved,
            zone.success_rate_high_against,
            zone.success_rate_low_against
          ], function(zoneErr) {
            if (zoneErr) {
              console.error(`❌ Sistem ${system.id} pressing zone hatası:`, zoneErr.message);
            } else {
              insertedZones++;
              if (insertedZones === system.pressing_zones.length) {
                console.log(`✅ Sistem ${system.id} (${system.name}) ${insertedZones} pressing zone eklendi`);

                completedSystems++;
                if (completedSystems === totalSystems) {
                  console.log(`\n🎉 ${totalSystems} SİSTEM BAŞARIYLA DOLDURULDU!\n`);
                  db.close();
                }
              }
            }
          });
        });
      });
    });
  });
});
