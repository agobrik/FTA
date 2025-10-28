const db = require('./ultra_database');

console.log('\n🔄 SİSTEM 21-30 İÇİN VERİ DOLDURMA BAŞLIYOR...\n');

const systems = [
  {
    id: 21,
    name: 'Bielsa Chile',
    possession: {
      possession_style: 'Yoğun Agresif Atak',
      in_possession_shape: '3-3-1-3 Ultra Ofansif',
      passing_principles: '["Dikey paslar maksimum","Hızlı kombinasyonlar","Risk alma yüksek","Minimal geriye pas","Sürekli ileri"]',
      movement_principles: '["Her oyuncu sürekli koşar","Kanat bekler box-to-box","Sanchez özgür hareket","Vidal motor","Yoğun atletizm"]',
      progression_patterns: 'Üç stoper hızlı açılış. Üç orta saha yoğun destek. Sanchez özgür yaratıcılık. Forvet üçlüsü sürekli hareket. Çok yüksek tempo. Delilik seviyesi atletizm.',
      circulation_patterns: 'Minimal dolaşım. Sürekli dikey ve ileri. Tempo çılgın yüksek. Geriye dönüş çok az. İleri, ileri, ileri.',
      overload_patterns: 'Her bölgede maksimum oyuncu. Kanat bekler bile forvet hattında olabilir. 7-8 oyuncu atak bölgesinde. Çılgın yüklemeler. Bielsa felsefesi.'
    },
    non_possession: {
      defensive_philosophy: 'Deli Pressing Everywhere',
      pressing_philosophy: 'Her bölgede çılgın yoğun baskı',
      counter_attack_philosophy: 'Hemen geri kazanıp devam eden atak',
      out_of_possession_shape: '3-3-1-3 Yüksek Blok (ama çok dağınık)',
      pressing_triggers: '["Her rakip dokunuşu","Her bölge","Sürekli koş","Bielsa çılgınlığı"]',
      where_to_press: 'Her yerde. Tüm sahada. Kaleci bile bastırılır. Çılgın yüksek yoğunluk. Bielsa felsefesi.',
      when_to_press: 'Sürekli. Her an. Her saniye. Koş, koş, koş. Durmak yok.',
      how_to_press: 'Çılgın yoğunlukta. Vidal her yerde. Herkes koşar. Organizasyon bazen kaotik. Ama yoğunluk inanılmaz. Bielsa sistemi.',
      pressing_traps: 'Tuzak değil, sürekli koşma. Her bölgede baskı. Organizasyondan çok yoğunluk. Bielsa çılgınlığı. Atletizm maksimum.'
    },
    pressing_zones: [
      {
        trap_name: 'Her Yerde Baskı',
        trap_zone: 'Tüm saha',
        trap_trigger: 'Rakip her top aldığında',
        trap_setup: 'Organizasyon belirsiz. Ama yoğunluk maksimum. Vidal motor. Herkes koşar. Bielsa felsefesi.',
        trap_execution: 'En yakın oyuncu çılgınca bastırır. Diğerleri destek için koşar. Yoğunluk inanılmaz. Organizasyon bazen kaotik ama etkili.',
        player_roles_involved: 'Tüm Takım (sürekli koşma), Vidal (motor her yerde), Sanchez (forvet ama geri bile döner)',
        success_rate_high_against: 'Fiziksel zayıf takımlar, baskı altında panik, yorgunluğa dayanıksız',
        success_rate_low_against: 'Sabırlı oynayan, uzun top iyi kullanan, fiziksel çok güçlü takımlar'
      },
      {
        trap_name: 'Vidal Motor Everywhere',
        trap_zone: 'Orta saha ve her yer',
        trap_trigger: 'Her an',
        trap_setup: 'Vidal sürekli hareket. Arevalo-Diaz destek. Sanchez bile geri döner. Sürekli koşma.',
        trap_execution: 'Vidal inanılmaz top kazanma. Sürekli koşar. Box-to-box üstü. Her yerde olabilir. Bielsa motorun simgesi.',
        player_roles_involved: 'Vidal (motor her yerde), Arevalo-Diaz (destek), Sanchez (bile geri döner)',
        success_rate_high_against: 'Orta saha yoğunluğu az, fiziksel zayıf, tekli pivot',
        success_rate_low_against: 'Çok kaliteli orta saha, sabırlı oynayan, uzun top tercih eden'
      },
      {
        trap_name: 'Kaotik Yüksek Blok',
        trap_zone: 'Rakip yarı saha',
        trap_trigger: 'Rakip buildup',
        trap_setup: 'Üç forvet yüksek. Orta saha üçlü yoğun. Kanat bekler bile yukarıda. Üç stoper bile orta sahada. Kaotik ama yoğun.',
        trap_execution: 'Tüm takım yüksek baskı. Organizasyon belirsiz. Ama yoğunluk çok fazla. Bielsa çılgınlığı etkili olabilir.',
        player_roles_involved: 'Tüm Takım (yüksek baskı), Vidal (motor), Medel-Jara (stopper bile yukarıda)',
        success_rate_high_against: 'Teknik zayıf, baskı altında panik, yavaş buildup',
        success_rate_low_against: 'Teknik çok iyi, sabırlı, uzun top iyi kullanan, Bielsa çılgınlığına alışık'
      }
    ]
  },
  {
    id: 22,
    name: 'Rangnick RB Leipzig',
    possession: {
      possession_style: 'Vertikal Hızlı Geçişler',
      in_possession_shape: '4-2-2-2 Kompakt',
      passing_principles: '["Vertikal paslar öncelik","5 saniye kuralı","Hızlı kombinasyonlar","Minimal dokunuş","Tempo maksimum"]',
      movement_principles: '["Werner-Poulsen ikili mobil","Forsberg-Sabitzer yaratıcı destek","Kanat bekler anlık katılım","Sürekli hareket","Yüksek tempo"]',
      progression_patterns: 'Çift pivot hızlı dağıtım. Forsberg-Sabitzer bağlantı. Werner-Poulsen derinlik ve hareket. Az dokunuşla hızlı ilerleme. 5 saniye kuralı. Vertikal oyun.',
      circulation_patterns: 'Minimal dolaşım. Çoğunlukla vertikal. 5 saniye içinde ileri tercih. Geriye dönüş az. Hızlı tempo.',
      overload_patterns: 'İki 10 numara + iki forvet final üçlüde dörtlü. Çift pivot dengeli. Ani kanat bek katılımı ile 5v4. Hızlı yüklemeler.'
    },
    non_possession: {
      defensive_philosophy: 'Gegenpressing Rangnick Versiyonu',
      pressing_philosophy: '5-8 saniye içinde yoğun geri kazanma',
      counter_attack_philosophy: 'Top kazanımı ve hızlı vertikal atak',
      out_of_possession_shape: '4-4-2 / 4-2-2-2 Kompakt',
      pressing_triggers: '["Top kaybı anı","5-8 saniye kuralı","Rakip hatalı dokunuş","Vertikal baskı"]',
      where_to_press: 'Top kaybedilen bölge anında. Genelde rakip yarı saha. Yüksek yoğunluk. Gegenpressing Rangnick okulu.',
      when_to_press: 'Top kaybından hemen sonra. 5-8 saniye penceresi. Rakip hatada. Sürekli tetikleme.',
      how_to_press: 'Forvet ikilisi + iki 10 dörtlü ön baskı. Çift pivot destek. Takım kompakt birlikte. Yoğun gegenpressing.',
      pressing_traps: 'Top kaybı anında dörtlü forvet hattı grubu. Çift pivot destek. Yan hatlarda sıkıştırma. Gegenpressing tuzakları.'
    },
    pressing_zones: [
      {
        trap_name: 'Gegenpressing 5 Saniye',
        trap_zone: 'Top kaybı bölgesi',
        trap_trigger: 'Top kaybı anında',
        trap_setup: 'Forvet ikilisi + iki 10 dörtlü en yakın. Çift pivot 5-10 metre geride destek. Tüm takım 5 saniye penceresi bilincinde.',
        trap_execution: 'Dörtlü forvet hattı anında bastırır. Çift pivot pas yollarını kapar. 5-8 saniye yoğun baskı. Top kazanımı veya faul.',
        player_roles_involved: 'Werner-Poulsen (forvet baskı), Forsberg-Sabitzer (10 destek), Çift Pivot (pas yolu), Defans (arka kontrol)',
        success_rate_high_against: 'Top tutan takımlar, baskı altında zayıf, teknik orta seviye',
        success_rate_low_against: 'Uzun top oynayan, gegenpressing hazırlıklı, hızlı çıkış yapan'
      },
      {
        trap_name: 'Vertikal Baskı Koridoru',
        trap_zone: 'Merkez koridor rakip yarı saha',
        trap_trigger: 'Rakip merkez pivot top aldığında',
        trap_setup: 'Forvet ikilisi öndeyken iki 10 numara pivot çevresinde. Çift pivot pas yollarını gözetir. Vertikal baskı koridoru.',
        trap_execution: 'İki 10 pivota bastırır. Forvet ikilisi geriye pas yolunu keser. Çift pivot yan pasları bloke eder. Vertikal kıskaca alma.',
        player_roles_involved: 'Forsberg-Sabitzer (pivot baskı), Werner-Poulsen (geri pas bloke), Çift Pivot (yan pas kesme)',
        success_rate_high_against: 'Tek pivot, pivot bağımlı, vertikal zayıf takımlar',
        success_rate_low_against: 'Çift pivot, kanat oyunu iyi, uzun top tercih eden'
      },
      {
        trap_name: '4-2-2-2 Kompakt Blok',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip topu ilerletttiğinde',
        trap_setup: 'Dörtlü defans + çift pivot + iki 10 + iki forvet. Üç hat kompakt. Aralar 10 metre. Merkez sıkı.',
        trap_execution: 'Üç hat birlikte hareket. Forvet ikilisi pas yollarını gözetir. İki 10 ara boşlukları kapar. Kompakt blok savunması.',
        player_roles_involved: 'Dörtlü Defans (ana), Çift Pivot (ikinci), İki 10 (ara boşluk), İki Forvet (ön)',
        success_rate_high_against: 'Merkez odaklı, yavaş buildup, bireysel bağımlı',
        success_rate_low_against: 'Kanat oyunu iyi, overload yapan, sabırlı oynayan'
      }
    ]
  },
  {
    id: 23,
    name: 'Nagelsmann Asymmetric',
    possession: {
      possession_style: 'Asimetrik Akıllı Pozisyonel',
      in_possession_shape: '3-4-2-1 Asimetrik Varyasyonlar',
      passing_principles: '["Pozisyonel rotasyonlar","Asimetrik yüklemeler","Akıllı pas seçimi","Yarı alanlar yoğun","Esnek geçişler"]',
      movement_principles: '["Kanat beklerin farklı rolleri","Stoperler geniş buildup","10lar asimetrik pozisyon","Forvet mobil bağlantı","Sürekli adaptasyon"]',
      progression_patterns: 'Üç stoperden esnek buildup. Bir kanat bek içe keser, diğeri yüksek. İki 10 asimetrik pozisyonlar. Forvet bağlantı kurar. Akıllı asimetrik ilerleme.',
      circulation_patterns: 'Stoperler tempo kontrolü. Asimetrik kanat bek kullanımı. İki 10 pozisyon rotasyonları. Esnek top dolaşımı.',
      overload_patterns: 'Bir tarafta kanat bek + 10 + kanat üçgeni. Karşı taraf farklı yapı. Asimetrik overload stratejisi. Sürekli varyasyonlar.'
    },
    non_possession: {
      defensive_philosophy: 'Akıllı Esnek Savunma',
      pressing_philosophy: 'Durum okuma ile asimetrik baskı',
      counter_attack_philosophy: 'Esnek geçişler ve hızlı çıkış',
      out_of_possession_shape: '5-3-2 / 5-2-3 Asimetrik',
      pressing_triggers: '["Durum okuma ile","Asimetrik tetikleme","Akıllı fırsat anlarda","Esnek baskı"]',
      where_to_press: 'Esnek baskı bölgeleri. Durum okuma önemli. Bazen yüksek bazen orta. Asimetrik organizasyon.',
      when_to_press: 'Akıllı fırsat değerlendirmesi. Durum okuma ile tetikleme. Esnek yaklaşım.',
      how_to_press: 'Beşli defans esnek hat. Orta saha asimetrik destek. Forvet hattı durum okur. Akıllı organizasyon.',
      pressing_traps: 'Asimetrik tuzaklar. Durum bazlı organizasyon. Akıllı baskı noktaları. Nagelsmann yenilikçiliği.'
    },
    pressing_zones: [
      {
        trap_name: 'Asimetrik Yan Baskı',
        trap_zone: 'Yan koridorlar (asimetrik)',
        trap_trigger: 'Durum okuma ile yan hatta',
        trap_setup: 'Bir tarafta içe kesen kanat bek + 10 + stoper üçgeni. Diğer taraf farklı. Asimetrik organizasyon.',
        trap_execution: 'Üçlü asimetrik baskı. Durum okuma ile yoğunluk ayarı. Akıllı koordinasyon. Esnek yaklaşım.',
        player_roles_involved: 'Asimetrik Kanat Bek (rol değişken), 10 Numara (destek), Stoper (arka)',
        success_rate_high_against: 'Simetrik takımlar, adaptasyon yavaş, kanat oyununa bağımlı',
        success_rate_low_against: 'Esnek takımlar, hızlı adaptasyon, asimetrik hazırlıklı'
      },
      {
        trap_name: 'Akıllı Orta Saha Kontrol',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Durum okuma ile',
        trap_setup: 'Orta saha üçlüsü esnek pozisyonlar. İki 10 asimetrik destek. Beşli defans arkada. Akıllı organizasyon.',
        trap_execution: 'Durum okuma ile baskı veya kontrol. Esnek yaklaşım. Asimetrik destek. Nagelsmann akıl.',
        player_roles_involved: 'Üçlü Orta Saha (esnek), İki 10 (asimetrik destek), Beşli Defans (arka)',
        success_rate_high_against: 'Öngörülebilir takımlar, adaptasyon yavaş, tek plan',
        success_rate_low_against: 'Esnek takımlar, çok plan, hızlı adaptasyon'
      },
      {
        trap_name: 'Beşli Esnek Blok',
        trap_zone: 'Final üçlü',
        trap_trigger: 'Rakip final üçlüde',
        trap_setup: 'Beşli defans esnek hat. Orta saha asimetrik destek. Forvetler durum okur. Esnek organizasyon.',
        trap_execution: 'Beşli defans durum bazlı savunma. Orta saha asimetrik destek. Esnek alan kapama.',
        player_roles_involved: 'Beşli Defans (esnek), Orta Saha (asimetrik), Forvetler (durum okuma)',
        success_rate_high_against: 'Tek tip atak, adaptasyon yavaş, öngörülebilir',
        success_rate_low_against: 'Çok varyasyon, hızlı adaptasyon, esnek atak'
      }
    ]
  },
  {
    id: 24,
    name: '2-3-5 Piramit',
    possession: {
      possession_style: 'Klasik Ofansif Piramit',
      in_possession_shape: '2-3-5 Tarihi Piramit',
      passing_principles: '["Uzun paslar kanat kadar","Orta saha üçlü dağıtım","Beşli forvet hattı","Klasik ayak altı tekniği","Basit ama etkili"]',
      movement_principles: '["Kanat oyuncular geniş pin","Orta forvet hedef adam","İç forvetler mobil","Orta saha üçlü destek","Minimal rotasyon"]',
      progression_patterns: 'İki bek + üç orta saha buildup. Beşli forvet hattı bekler. Uzun top veya orta saha üzerinden. Kanat oyuncular geniş. Klasik ilerleme.',
      circulation_patterns: 'Orta saha üçlüsü tempo kontrolü. Bekler güvenli devir. Beşli forvet hattına servis. Basit dolaşım.',
      overload_patterns: 'Beşli forvet hattı doğal yükleme. Orta saha üçlü destek. İki bek arkada kalır. Klasik 5-3-2 ofansif yapı.'
    },
    non_possession: {
      defensive_philosophy: 'İki Bek Savunması',
      pressing_philosophy: 'Minimal baskı - beşli forvet genelde basmaz',
      counter_attack_philosophy: 'Beşli forvet hattı zaten hazır',
      out_of_possession_shape: '2-3-5 (savunma zayıf)',
      pressing_triggers: '["Çok nadir","Genelde pasif","Beşli forvet basmaz","Tarihi zafiyet"]',
      where_to_press: 'Genelde kendi yarı saha. İki bek + üç orta saha savunur. Beşli forvet çok az geri döner. Savunma zayıf.',
      when_to_press: 'Neredeyse hiç. Beşli forvet atak pozisyonunda kalır. Pasif bekle.',
      how_to_press: 'İki bek + üç orta saha savunma yapar. Beşli forvet neredeyse hiç geri dönmez. Çok zayıf savunma organizasyonu.',
      pressing_traps: 'Tuzak yok. Sadece iki bek savunur. Tarihi formasyonun en zayıf yanı. Savunma çok açık.'
    },
    pressing_zones: [
      {
        trap_name: 'İki Bek Savunması',
        trap_zone: 'Kendi ceza sahası önü',
        trap_trigger: 'Rakip atak yaptığında',
        trap_setup: 'İki bek ana savunma. Üç orta saha önlerinde destek. Beşli forvet neredeyse hiç geri dönmez. Çok açık savunma.',
        trap_execution: 'İki bek savunma yapar. Üç orta saha destek. Çok zayıf savunma. Tarihi formasyonun problemi.',
        player_roles_involved: 'İki Bek (ana savunma), Üç Orta Saha (destek), Beşli Forvet (geri dönmez)',
        success_rate_high_against: 'Zayıf atakçı takımlar, yavaş oyun, fiziksel zayıf forvetler',
        success_rate_low_against: 'Modern atakçı takımlar, hızlı oyun, sayısal üstünlük yaratan sistemler'
      },
      {
        trap_name: 'Orta Saha Üçlü Destek',
        trap_zone: 'Orta saha',
        trap_trigger: 'Rakip orta sahaya geldiğinde',
        trap_setup: 'Üç orta saha kompakt. İki bek arkada. Beşli forvet yukarıda kalır. Orta saha kritik bölge.',
        trap_execution: 'Üç orta saha savunma desteği. İki bek arkada. Ama sayısal dezavantaj sık. Zayıf organizasyon.',
        player_roles_involved: 'Üç Orta Saha (savunma desteği), İki Bek (arka), Beşli Forvet (ofansta kalır)',
        success_rate_high_against: 'Az oyunculu atak, merkez odaklı, yavaş tempo',
        success_rate_low_against: 'Kanat oyunu iyi, sayısal üstünlük, modern pressing'
      },
      {
        trap_name: 'Kanat Koridor Zafiyeti',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip kanatlara açıldığında',
        trap_setup: 'Kanat koridorlar çok açık. İki bek geniş alanı kapatamaz. Orta saha yan desteği sınırlı. Tarihi zafiyet.',
        trap_execution: 'Bir bek yana kayar. Ama merkez çok açık kalır. Çok zayıf yan koridor savunması. Tarihi problem.',
        player_roles_involved: 'Bek (yan kayma), Orta Saha (sınırlı yan destek)',
        success_rate_high_against: 'Merkez odaklı takımlar, kanat oyunu kullanmayan',
        success_rate_low_against: 'Kanat oyunu iyi takımlar, modern sistemler, geniş açılım yapan'
      }
    ]
  },
  {
    id: 25,
    name: 'WM Formation Chapman',
    possession: {
      possession_style: 'Devrimci WM Sistemi',
      in_possession_shape: 'WM (3-2-2-3) Chapman Yeniliği',
      passing_principles: '["Üç stoper geniş buildup","İki half-back bağlantı","İki inside forward yaratıcı","Üç forvet kombinasyon","Devrimci sistem"]',
      movement_principles: '["Stopper merkez savunma","İki half-back box-to-box","Inside forward yarı alan","Kanat oyuncular geniş","Orta forvet hedef"]',
      progression_patterns: 'Üç stoper (WM arkası) buildup. İki half-back bağlantı ve dağıtım. İki inside forward yaratıcı yarı alanlar. Üç forvet kombinasyon. Devrimci WM.',
      circulation_patterns: 'Üç stoper arası dolaşım. İki half-back tempo kontrolü. Inside forward üzerinden yaratıcılık. Üç forvet hattına servis.',
      overload_patterns: 'Inside forward yarı alanlarda yoğunlaşma. Half-back destek. Üç forvet final üçlüde. WM doğal overload alanları.'
    },
    non_possession: {
      defensive_philosophy: 'Üçlü Defans WM Sistemi',
      pressing_philosophy: 'Orta blok - half-back savunma desteği',
      counter_attack_philosophy: 'Üç forvet + inside forward hızlı çıkış',
      out_of_possession_shape: 'WM (3-4-3 benzeri)',
      pressing_triggers: '["Orta sahada fırsat","Half-back tetiklemesi","Seçici baskı","WM dengesi"]',
      where_to_press: 'Orta blok savunma. Üçlü defans + iki half-back kompakt. Merkez koruma önemli. WM yapısı.',
      when_to_press: 'Rakip orta sahada hata. Half-back fırsat gördüğünde. Seçici tetikleme. Enerji ekonomisi.',
      how_to_press: 'Üçlü defans hat. İki half-back orta saha desteği. Inside forward bile geri döner. WM kompakt organizasyon.',
      pressing_traps: 'Orta sahada half-back kıskacı. Üçlü defans kompakt blok. WM sistemi ile alan kapama. Chapman yeniliği.'
    },
    pressing_zones: [
      {
        trap_name: 'Half-Back Orta Saha Kontrolü',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'İki half-back merkez pozisyon. Inside forward bile geri döner destek. Üçlü defans arkada. WM organizasyonu.',
        trap_execution: 'Half-back ikilisi orta saha kontrolü. Inside forward destek. Üçlü defans arka güvenlik. WM sistem savunması.',
        player_roles_involved: 'İki Half-Back (orta saha kontrol), Inside Forward (destek), Üçlü Defans (arka)',
        success_rate_high_against: 'Merkez odaklı takımlar, orta saha zayıf, WM sistemi bilmeyen',
        success_rate_low_against: 'Kanat oyunu iyi, WM sistemine hazırlıklı, modern overload yapan'
      },
      {
        trap_name: 'Üçlü Defans WM Blok',
        trap_zone: 'Savunma üçlüsü',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: 'Stopper merkez + iki bek yanlarda. Half-back önlerinde destek. Inside forward ara boşluk. WM blok yapısı.',
        trap_execution: 'Üçlü defans WM pozisyonu. Half-back destek. Inside forward ara boşlukları kapar. Devrimci sistem savunması.',
        player_roles_involved: 'Üçlü Defans (stopper merkez), İki Half-Back (destek), Inside Forward (ara boşluk)',
        success_rate_high_against: 'Orta forvet odaklı, WM karşısında deneyimsiz, yavaş atak',
        success_rate_low_against: 'Kanat oyunu çok iyi, WM zafiyetlerini bilen, hızlı kanat değişimi'
      },
      {
        trap_name: 'Inside Forward Destek Savunması',
        trap_zone: 'Yarı alanlar',
        trap_trigger: 'Rakip yarı alanlara topu taşıdığında',
        trap_setup: 'Inside forward yarı alanlarda geri döner. Half-back destek. Üçlü defans arkada. WM esnek yapı.',
        trap_execution: 'Inside forward savunma desteği. Half-back ile birlikte alan kapama. Yarı alan kontrolü. WM sistemi esnekliği.',
        player_roles_involved: 'Inside Forward (geri dönüş), Half-Back (destek), Üçlü Defans (arka)',
        success_rate_high_against: 'Yarı alan kullanımı zayıf, merkez odaklı, WM bilmeyen',
        success_rate_low_against: 'Yarı alan ustası takımlar, WM sistemine hazırlıklı, esnek atak'
      }
    ]
  },
  {
    id: 26,
    name: 'Pochettino Tottenham High Press',
    possession: {
      possession_style: 'Yüksek Tempolu Kontrol',
      in_possession_shape: '4-2-3-1 Dengeli',
      passing_principles: '["Eriksen yaratıcı dağıtım","Çift pivot güvenli destek","Kane hedef adam","Alli box-to-box akınları","Hızlı kombinasyonlar"]',
      movement_principles: '["Kane düşer bağlantı kurar","Son-Alli içe keser","Walker-Rose box-to-box bekler","Eriksen özgür yaratıcılık","Yoğun hareket"]',
      progression_patterns: 'Çift pivot güvenli buildup. Eriksen yaratıcı dağıtım. Walker-Rose yüksek koşular. Kane düşer, Alli koşar. Son içe keser. Dengeli ilerleme.',
      circulation_patterns: 'Çift pivot tempo kontrolü. Eriksen yaratıcı çıkış. Bekler outlet. Kane bağlantı. Hızlı dolaşım.',
      overload_patterns: 'Bir tarafta bek + Eriksen + kanat üçgeni. Alli kutu içi. Kane bağlantı. Dengeli overload yaratma.'
    },
    non_possession: {
      defensive_philosophy: 'Yüksek Yoğun Baskı',
      pressing_philosophy: 'Rakip yarı sahada yoğun pressing',
      counter_attack_philosophy: 'Hızlı geçişler Kane-Son-Alli üçgeni',
      out_of_possession_shape: '4-2-3-1 Yüksek Blok',
      pressing_triggers: '["Rakip stoper top aldığında","Geriye pas","Yan hatlarda fırsat","Pochettino yoğunluğu"]',
      where_to_press: 'Rakip yarı sahada yüksek baskı. Orta sahada yoğun. Pochettino yüksek yoğunluk felsefesi.',
      when_to_press: 'Stoper topu aldığında. Geriye pas. Yan hatta tuzak. Sürekli yüksek yoğunluk.',
      how_to_press: 'Kane forvet baskısı. Eriksen-Alli-Son destek. Çift pivot pas yolu kesme. Pochettino organizasyonu.',
      pressing_traps: 'Stoper baskısı Kane. Yan hatta üçlü tuzak. Orta sahada çift pivot kıskacı. Pochettino sistemi.'
    },
    pressing_zones: [
      {
        trap_name: 'Kane Yüksek Forvet Baskısı',
        trap_zone: 'Rakip ceza sahası önü',
        trap_trigger: 'Kaleciden stoperlere pas',
        trap_setup: 'Kane yüksek baskı hazır. Eriksen-Alli-Son destek pozisyonları. Çift pivot pas yollarını gözetir. Pochettino yüksek hat.',
        trap_execution: 'Kane stopere bastırır. Üçlü destek kaçış yollarını kapar. Çift pivot pivotu bloke eder. Yüksek yoğunluk.',
        player_roles_involved: 'Kane (stoper baskı), Eriksen-Alli-Son (destek), Çift Pivot (pivot bloke), Defans (yüksek hat)',
        success_rate_high_against: 'Kısa buildup yapan, teknik zayıf stopler, baskı altında panik',
        success_rate_low_against: 'Uzun top oynayan, baskıya alışık, kaliteli buildup'
      },
      {
        trap_name: 'Yan Koridor Rose-Walker Baskısı',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Bek (Walker/Rose) + kanat (Son/Eriksen) + orta saha (Dembele/Wanyama) üçgeni. Pochettino yüksek yoğunluk.',
        trap_execution: 'Bek yüksek baskı. Kanat içe kesme bloke. Orta saha destek. Üçlü yüksek yoğunlukta top kazanımı.',
        player_roles_involved: 'Bek (yüksek baskı), Kanat (içe kesme bloke), Orta Saha (destek)',
        success_rate_high_against: 'Kanat oyununa bağımlı, yavaş kanat bekler, merkez alternatifi az',
        success_rate_low_against: 'Hızlı kanat bekler, kaliteli bire bir, merkezi iyi kullanan'
      },
      {
        trap_name: 'Çift Pivot Orta Saha Kontrol',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Dembele-Wanyama çift pivot. Alli önlerinde. Eriksen destek. Kane bile geri döner. Pochettino organizasyonu.',
        trap_execution: 'Çift pivot orta saha kontrolü. Alli-Eriksen destek. Kane geri dönüş. Grup baskısı ile top kazanımı.',
        player_roles_involved: 'Çift Pivot (merkez kontrol), Alli-Eriksen (destek), Kane (geri dönüş)',
        success_rate_high_against: 'Orta saha zayıf, pivot bağımlı, baskı altında zayıf',
        success_rate_low_against: 'Orta saha kaliteli, çift pivot sistemler, baskıya alışık'
      }
    ]
  },
  {
    id: 27,
    name: 'Conte Chelsea 2016-17',
    possession: {
      possession_style: 'Kanat Bek Dominasyonu (Chelsea)',
      in_possession_shape: '3-4-3 Asimetrik',
      passing_principles: '["Alonso-Moses kanat bek servisi","Üç stoper geniş buildup","Kante-Matic pivot kontrol","Hazard yaratıcılık","Costa hedef savaşçı"]',
      movement_principles: '["Alonso-Moses box-to-box koşular","Hazard özgür hareketler","Pedro-Willian çalışkan kanatlar","Costa agresif forvet","Üç stoper geniş"]',
      progression_patterns: 'Üç stoper geniş buildup. Kante-Matic pivot. Alonso-Moses koridorları doldurur. Hazard yaratıcı. Costa hedef. Premier League şampiyonluğu formülü.',
      circulation_patterns: 'Üç stoper dolaşım. Kante-Matic tempo. Alonso-Moses outlet. Hazard yaratıcı çıkış. Etkili dolaşım.',
      overload_patterns: 'Alonso soldanson + Hazard + Pedro üçgeni. Moses sağdan dengeli veya yükselir. Costa-Hazard final üçlü tehdit. Conte asimetrisi.'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt Beşli Blok',
      pressing_philosophy: 'Orta blok - disiplinli savunma',
      counter_attack_philosophy: 'Top kazanımı ardından Hazard-Costa hızlı çıkış',
      out_of_possession_shape: '5-3-2 / 5-4-1 Kompakt',
      pressing_triggers: '["Yan hatlarda fırsat","Rakip hata","Maç durumu gerektirdiğinde","Seçici tetikleme"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt. Beşli defans sıkı. Kante her yerde.',
      when_to_press: 'Yan hatta fırsat. Rakip hata yaptığında. Maç skoru gerektirdiğinde. Disiplinli tetikleme.',
      how_to_press: 'Beşli defans kompakt. Kante-Matic orta saha kilidi. Kanatlar geri döner. Conte disiplini.',
      pressing_traps: 'Yan hatta beşli tuzak. Orta sahada Kante-Matic kıskacı. Kompakt blok ile alan kapama. Conte organizasyonu.'
    },
    pressing_zones: [
      {
        trap_name: 'Kante Orta Saha Vacuum (Chelsea)',
        trap_zone: 'Orta saha geniş alan',
        trap_trigger: 'Rakip orta sahada top',
        trap_setup: 'Kante sürekli hareket. Matic destek. Beşli defans arkada. Kanatlar geri döner. Kante her yerde.',
        trap_execution: 'Kante inanılmaz top kazanma. Matic destek. Beşli defans güvenlik. Premier League şampiyonluğunun anahtarı.',
        player_roles_involved: 'Kante (top kazanıcı her yerde), Matic (destek), Beşli Defans (arka), Kanatlar (geri dönüş)',
        success_rate_high_against: 'Orta saha yoğunluğu az, fiziksel zayıf, tek pivot',
        success_rate_low_against: 'Çok kaliteli orta saha, sayısal üstünlük yapan, Kante etrafında oynayan'
      },
      {
        trap_name: 'Beşli Blok Chelsea Duvarı',
        trap_zone: 'Savunma üçlüsü ve ceza sahası',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: 'David Luiz-Azpilicueta-Cahill üçlüsü + Alonso-Moses kanat bekler. Beşli kompakt hat. Kante-Matic önlerinde. Ultra sağlam.',
        trap_execution: 'Beşli defans kompakt hat savunması. Kante-Matic ikinci hat. Kanatlar bile geri döner. Conte duvarı. Premier League en az gol yiyen.',
        player_roles_involved: 'Beşli Defans (Luiz merkez), Kante-Matic (ikinci hat), Kanatlar (geri dönüş)',
        success_rate_high_against: 'Uzun top oynayan, bireysel bağımlı, hava topu ağırlıklı',
        success_rate_low_against: 'Hızlı kombinasyon, overload çok iyi yapan, hareket oyunu mükemmel'
      },
      {
        trap_name: 'Yan Koridor Moses-Alonso Tuzağı',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip kanat oyuncusuna pas',
        trap_setup: 'Kanat bek + kanat + orta saha + stoper dörtlüsü. Conte organizasyonu. İçeri geçiş kapalı.',
        trap_execution: 'Dörtlü yan koridoru kapar. Moses/Alonso ön baskı. Kanat destek. Orta saha ve stoper alan kapar. Top kazanımı.',
        player_roles_involved: 'Kanat Bek (ön), Kanat (destek), Orta Saha (Kante/Matic), Stoper (arka)',
        success_rate_high_against: 'Kanat oyununa mecbur, bire bir zayıf, merkez alternatifi az',
        success_rate_low_against: 'Hızlı kombinasyon, kaliteli kanat oyuncular, merkezi iyi kullanan'
      }
    ]
  },
  {
    id: 28,
    name: 'Zeman Ultra-Attacking',
    possession: {
      possession_style: 'Saldırgan Çılgın Atak',
      in_possession_shape: '4-3-3 Ultra Ofansif',
      passing_principles: '["Dikey paslar maksimum","Atak atak atak","Geriye dönüş yasak","Sürekli ileri","Zeman çılgınlığı"]',
      movement_principles: '["Herkes atak pozisyonunda","Bekler bile forvet hattında olabilir","Sürekli ileri koşular","Savunma umurunda değil","Çılgın yoğunluk"]',
      progression_patterns: 'Hızlı ve direkt. Geriye pas neredeyse yasak. Sürekli ileri. Bekler bile çok yüksek. Forvet üçlüsü her zaman yukarıda. Zeman felsefesi: Atak!',
      circulation_patterns: 'Minimal dolaşım. Çoğunlukla dikey. Tempo çılgın. Geriye dönüş yasak. İleri, ileri, ileri!',
      overload_patterns: 'Bazen 7-8 oyuncu atak bölgesinde. Bekler bile yukarıda. Çılgın yüklemeler. Savunma dengesi yok. Zeman çılgınlığı.'
    },
    non_possession: {
      defensive_philosophy: 'Savunma? Ne Savunması?',
      pressing_philosophy: 'Yüksek baskı ama organizasyonsuz',
      counter_attack_philosophy: 'Karşı atak? Zaten hep ataktayız!',
      out_of_possession_shape: '4-3-3 (ama çok dağınık)',
      pressing_triggers: '["Sürekli baskı ama kaotik","Herkes bastırır ama organizasyon yok","Zeman: Gol yemeyelim değil daha çok atalım"]',
      where_to_press: 'Her yerde ama organizasyonsuz. Çılgın yoğunluk ama yapısal zayıflık. Savunma Zeman umurunda değil.',
      when_to_press: 'Sürekli. Ama organizasyon zayıf. Yoğunluk var, sistem yok.',
      how_to_press: 'Herkes koşar ve bastırır. Ama organizasyon çok zayıf. Açıklar her yerde. Zeman: "Onlar 3 atarsa biz 4 atarız!"',
      pressing_traps: 'Tuzak yok. Sadece sürekli koşma ve baskı. Organizasyon zayıf. Açıklar büyük. Zeman felsefesi.'
    },
    pressing_zones: [
      {
        trap_name: 'Kaotik Yüksek Baskı',
        trap_zone: 'Tüm saha (kaotik)',
        trap_trigger: 'Rakip top aldığında (sürekli)',
        trap_setup: 'Organizasyon yok. Herkes koşar. Bekler bile yukarıda. Açıklar her yerde. Zeman çılgınlığı.',
        trap_execution: 'Herkes en yakın rakibe koşar. Organizasyon zayıf. Yoğunluk çok ama yapı yok. Bazen etkili, çoğunlukla açıklar verir.',
        player_roles_involved: 'Tüm Takım (kaotik koşma), Bekler (bile çok yüksek), Forvetler (sürekli yukarıda)',
        success_rate_high_against: 'Zayıf takımlar, yoğunluğa dayanamayan, teknik zayıf',
        success_rate_low_against: 'Kaliteli takımlar (çok gol yersiniz), sabırlı oynayan, açıkları iyi kullanan'
      },
      {
        trap_name: 'Savunma Felaket Bölgesi',
        trap_zone: 'Kendi ceza sahası',
        trap_trigger: 'Rakip karşı atak yaptığında',
        trap_setup: 'Çok az oyuncu geride. Bekler yukarıda kalmış. Açıklar devasa. Zeman: "Önemli değil, biz daha çok gol atarız!"',
        trap_execution: 'Çok zayıf savunma. Genelde sayısal dezavantaj. Rakip çok gol atar. Ama Zeman takımları da çok atar. Yüksek skorlu maçlar.',
        player_roles_involved: 'Çok Az Savunma Oyuncusu (genelde sayısal dezavantaj)',
        success_rate_high_against: 'Atağa geçmeyen takımlar, korku içinde oynayan, çok pasif',
        success_rate_low_against: 'Karşı atak iyi takımlar (çok gol yersiniz), kaliteli forvetler, hızlı geçişler'
      },
      {
        trap_name: 'Atletik Yoğunluk Baskısı',
        trap_zone: 'Her yer',
        trap_trigger: 'Sürekli',
        trap_setup: 'Oyuncular çok fit olmalı. Sürekli koşma. Organizasyon zayıf ama yoğunluk maksimum. Zeman kondisyon antrenmanları efsane.',
        trap_execution: 'Sürekli yoğun koşma. Rakibi yorma. Ama açıklar çok. Yüksek skorlu maçlar. Zeman tarzı futbol.',
        player_roles_involved: 'Tüm Takım (süper fit olmalı), Zeman Kondisyon Antrenmanları (efsanevi)',
        success_rate_high_against: 'Fiziksel zayıf takımlar, yorgunluğa dayanıksız, düşük tempo',
        success_rate_low_against: 'Fiziksel güçlü takımlar, sabırlı oynayan, açıkları iyi kullanan (ama siz de çok gol atarsınız!)'
      }
    ]
  },
  {
    id: 29,
    name: 'Ancelotti Christmas Tree',
    possession: {
      possession_style: 'Noel Ağacı Kontrolü',
      in_possession_shape: '4-3-2-1 Christmas Tree',
      passing_principles: '["Pirlo regista dağıtımı","Gattuso-Seedorf destek","Kaka-Rui Costa yaratıcı ikili","Shevchenko hedef","Kısa kombinasyonlar"]',
      movement_principles: '["Pirlo derin oyun kurucu","Kaka box-to-box akınları","Rui Costa yaratıcılık","Shevchenko akıllı hareketler","AC Milan altın yıllar"]',
      progression_patterns: 'Pirlo regista derin oyun kuruculuğu. Gattuso-Seedorf destek. Kaka-Rui Costa yaratıcı ikili yarı alanlarda. Shevchenko hedef adam. AC Milan şaheseri.',
      circulation_patterns: 'Pirlo üzerinden tempo kontrolü ve dağıtım. Kaka-Rui Costa yaratıcı devre. Shevchenko bağlantı. Etkili dolaşım.',
      overload_patterns: 'Kaka-Rui Costa yarı alanlarda ikili yoğunluk. Pirlo arkadan destek. Seedorf bile kutuya girer. Shevchenko final üçlüde tehdit.'
    },
    non_possession: {
      defensive_philosophy: 'Dengeli Organizasyon',
      pressing_philosophy: 'Orta blok - Gattuso motor',
      counter_attack_philosophy: 'Kaka hızlı geçişler, Shevchenko sonlandırma',
      out_of_possession_shape: '4-5-1 Kompakt',
      pressing_triggers: '["Rakip orta sahada hata","Gattuso tetiklemesi","Seçici baskı","Pirlo korunur"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt. Gattuso her yerde top kazanır. Pirlo korunur.',
      when_to_press: 'Rakip hata yaptığında. Gattuso fırsat gördüğünde. Seçici tetikleme. Pirlo savunmada fazla koşmaz.',
      how_to_press: 'Gattuso motor. Seedorf destek. Kaka-Rui Costa geri döner. Pirlo minimal savunma. Dörtlü defans sağlam. Ancelotti dengesi.',
      pressing_traps: 'Gattuso orta saha kıskacı. Seedorf destek. Kompakt blok ile alan kapama. Pirlo korumalı sistem.'
    },
    pressing_zones: [
      {
        trap_name: 'Gattuso Motor Pressing',
        trap_zone: 'Orta saha',
        trap_trigger: 'Rakip orta sahada top',
        trap_setup: 'Gattuso sürekli hareket. Pirlo arkada güvenli. Seedorf destek. Kaka-Rui Costa geri döner. AC Milan motoru.',
        trap_execution: 'Gattuso inanılmaz top kazanma. Seedorf destek. Pirlo korunur. Kaka-Rui Costa ara boşluk. Champions League kazandıran sistem.',
        player_roles_involved: 'Gattuso (motor), Pirlo (regista korumalı), Seedorf (destek), Kaka-Rui Costa (geri dönüş)',
        success_rate_high_against: 'Orta saha yoğunluğu az, fiziksel zayıf, pivot bağımlı',
        success_rate_low_against: 'Çok kaliteli orta saha, sayısal üstünlük yapan, Pirloyu hedefleyen'
      },
      {
        trap_name: 'Kompakt 4-5-1 Blok',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip topu ilerletttiğinde',
        trap_setup: 'Dörtlü defans (Maldini-Nesta-Costacurta-Cafu). Beşli orta saha (Gattuso merkez). Shevchenko tek forvet. Kompakt ve dengeli.',
        trap_execution: 'Dörtlü defans efsane hat. Beşli orta saha kompakt. Gattuso her yerde. Pirlo korunur. AC Milan duvarı.',
        player_roles_involved: 'Dörtlü Defans (efsane), Beşli Orta Saha (Gattuso motor), Shevchenko (tek forvet)',
        success_rate_high_against: 'Uzun top oynayan, bireysel bağımlı, merkez odaklı',
        success_rate_low_against: 'Overload iyi yapan, kanat oyunu çok iyi, sabırlı oynayan'
      },
      {
        trap_name: 'Pirlo Koruma Sistemi',
        trap_zone: 'Pirlo çevresi',
        trap_trigger: 'Rakip Pirloyu hedeflediğinde',
        trap_setup: 'Gattuso-Seedorf Pirloyu korur. Kaka-Rui Costa geri döner destek. Dörtlü defans arkada. Pirlo korumalı sistem.',
        trap_execution: 'Gattuso-Seedorf Pirloyu izole ettirmez. Kaka-Rui Costa destek. Pirlo rahat oynayabilir. AC Milan stratejisi.',
        player_roles_involved: 'Gattuso-Seedorf (Pirlo koruma), Kaka-Rui Costa (destek), Pirlo (korumalı regista)',
        success_rate_high_against: 'Pirloyu hedefleyemeyen, orta saha zayıf, organizasyon zayıf',
        success_rate_low_against: 'Pirloyu iyi hedefleyen, yoğun forvet baskısı, Gattusoyu aşabilen'
      }
    ]
  },
  {
    id: 30,
    name: 'Löw Germany 2014 World Cup',
    possession: {
      possession_style: 'Dünya Kupası Şampiyonu Pozisyonel',
      in_possession_shape: '4-2-3-1 Esnek Varyasyonlar',
      passing_principles: '["Lahm inside bek dağıtım","Kroos-Schweinsteiger kontrol","Özil yaratıcı 10","Müller raumdeuter","Esnek kombinasyonlar"]',
      movement_principles: '["Lahm içe pivot rol","Müller boşluk bulucu hareketler","Özil özgür yaratıcılık","Kroos tempo kontrolü","Esnek pozisyonlar"]',
      progression_patterns: 'Lahm içe pivot rol. Kroos-Schweinsteiger orta saha dominasyonu. Özil yaratıcı 10. Müller boşluk bulucu. Götze/Schürrle kanat. Esnek ve etkili.',
      circulation_patterns: 'Lahm-Kroos-Schweinsteiger üçgeni kontrol. Özil yaratıcı çıkış. Müller boşluk bulur. Dünya Kupası kalitesi dolaşım.',
      overload_patterns: 'Lahm içeri pivot ile orta saha 3lü. Özil-Müller yarı alan ikilisi. Kanatlar geniş. Esnek overload yaratma. Dünya Kupası formülü.'
    },
    non_possession: {
      defensive_philosophy: 'Akıllı Pozisyonel Savunma',
      pressing_philosophy: 'Durum okuma ile seçici baskı',
      counter_attack_philosophy: 'Hızlı geçişler Özil-Müller yaratıcılığı',
      out_of_possession_shape: '4-2-3-1 / 4-5-1 Kompakt',
      pressing_triggers: '["Durum okuma ile","Rakip hata yaptığında","Maç durumu gerektirdiğinde","Akıllı tetikleme"]',
      where_to_press: 'Esnek baskı. Bazen yüksek bazen orta blok. Durum okuma önemli. Löw akıl oyunu.',
      when_to_press: 'Rakip hata yaptığında. Maç durumu gerektirdiğinde. Akıllı fırsat değerlendirmesi.',
      how_to_press: 'Müller akıllı baskı. Özil bile geri döner. Kroos-Schweinsteiger orta saha kilidi. Lahm esnek pozisyon. Dünya Kupası organizasyonu.',
      pressing_traps: 'Lahm esnek rol ile tuzaklar. Kroos-Schweinsteiger merkez kıskacı. Müller akıllı pozisyonlar. Löw stratejisi.'
    },
    pressing_zones: [
      {
        trap_name: 'Lahm Esnek Pivot Sistem',
        trap_zone: 'Orta saha',
        trap_trigger: 'Durum okuma ile',
        trap_setup: 'Lahm içeri pivot rol veya bek pozisyonu. Kroos-Schweinsteiger esnek destek. Özil-Müller ara boşluk. Esnek organizasyon.',
        trap_execution: 'Lahm duruma göre pozisyon. Kroos-Schweinsteiger orta saha kontrolü. Özil-Müller akıllı destek. Dünya Kupası esnekliği.',
        player_roles_involved: 'Lahm (esnek rol), Kroos-Schweinsteiger (orta saha), Özil-Müller (akıllı destek)',
        success_rate_high_against: 'Esnek olmayan takımlar, adaptasyon yavaş, tek plan',
        success_rate_low_against: 'Esnek takımlar, hızlı adaptasyon, çok varyasyon'
      },
      {
        trap_name: 'Müller Raumdeuter Baskı',
        trap_zone: 'Boşluk alanlar',
        trap_trigger: 'Müller boşluk bulduğunda',
        trap_setup: 'Müller boşluk bulucu pozisyonlar. Özil destek. Kroos-Schweinsteiger kontrol. Lahm esnek. Akıllı organizasyon.',
        trap_execution: 'Müller akıllı pozisyonlardan baskı veya top kazanımı. Özil destek. Dünya Kupası akıl oyunu.',
        player_roles_involved: 'Müller (raumdeuter), Özil (destek), Kroos-Schweinsteiger (kontrol), Lahm (esnek)',
        success_rate_high_against: 'Boşluk kontrolü zayıf, Mülleri takip edemeyen, alan savunması zayıf',
        success_rate_low_against: 'Mülleri iyi marke eden, alan kontrolü iyi, esnek savunma'
      },
      {
        trap_name: 'Kompakt Dünya Kupası Blok',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Maç durumu gerektirdiğinde',
        trap_setup: 'Boateng-Hummels-Höwedes sağlam defans. Lahm esnek. Kroos-Schweinsteiger orta saha. Özil-Müller ara boşluk. Kompakt ve akıllı.',
        trap_execution: 'Sağlam defans hattı. Kroos-Schweinsteiger orta saha kontrolü. Özil-Müller ara boşlukları kapar. Dünya Kupası şampiyonu savunması.',
        player_roles_involved: 'Boateng-Hummels (defans), Kroos-Schweinsteiger (orta saha), Özil-Müller (ara boşluk), Lahm (esnek)',
        success_rate_high_against: 'Uzun top oynayan, bireysel bağımlı, organizasyon zayıf',
        success_rate_low_against: 'Overload çok iyi yapan, sabırlı oynayan, çok kaliteli'
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

      // 3. Delete existing pressing zones
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
                  console.log(`\n🎉 SİSTEM 21-30 BAŞARIYLA DOLDURULDU!\n`);
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
