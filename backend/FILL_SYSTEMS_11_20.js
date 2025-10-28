const db = require('./ultra_database');

console.log('\n🔄 SİSTEM 11-20 İÇİN VERİ DOLDURMA BAŞLIYOR...\n');

const systems = [
  {
    id: 11,
    name: 'Simeone Defensive',
    possession: {
      possession_style: 'Minimal Risk Kontrol',
      in_possession_shape: '4-1-4-1 Ultra Kompakt',
      passing_principles: '["Güvenli pas seçimi","Top koruma maksimum","Geriye dönüş serbest","Uzun hedef adam pasları","Savunma dengesi her zaman"]',
      movement_principles: '["Minimal hareket enerji tasarrufu","Savunma pozisyonunu koruma","Hedef adam bekleme","Karşı atak hazırlığı","Disiplinli duruş"]',
      progression_patterns: 'Çoğunlukla uzun toplar hedef adama. Pivot güvenli dağıtım yapar. Orta saha dördlüsü kompakt kalır. Minimal ilerleme çabası. Karşı atak dengesi korunur.',
      circulation_patterns: 'Arka dörtlü ve pivot arasında güvenli devir. Tempo çok düşük. Top koruma ve zaman oyunu. Orta saha bloke pozisyonda kalır.',
      overload_patterns: 'Overload neredeyse hiç yapılmaz. Tüm oyuncular savunma pozisyonunu korur. Sadece karşı atak anında ani yükleme. Dengeli yapı her zaman.'
    },
    non_possession: {
      defensive_philosophy: 'Ultra Defansif Düşük Blok',
      pressing_philosophy: 'Çok düşük blok - minimal baskı',
      counter_attack_philosophy: 'Top kazanımı ardından hızlı uzun top karşı atakları',
      out_of_possession_shape: '4-4-2 / 4-5-1 Ultra Düşük Blok',
      pressing_triggers: '["Yan hatta kesin fırsat","Rakip ceza sahası içinde","Maç durumu gerektirirse","Genelde pasif bekle"]',
      where_to_press: 'Kendi ceza sahası önü. Ultra düşük blok. İki hat arası 5-8 metre. Merkez tamamen kapalı. Kanatlar dar tutulur.',
      when_to_press: 'Çok nadir. Yan hatta kesin fırsat. Ceza sahası içinde. Genelde pasif bekle ve alan kapa.',
      how_to_press: 'İki hat ultra kompakt. Ara boşluk sıfır. Topa gidilmez, alan kapatılır. Faul bile yapılır. Vücut blokeleri.',
      pressing_traps: 'Tuzak yok. Sadece ultra kompakt blok. 4-4-2 çift duvar. Ceza sahası içi kalabalık. Tamamen alan kapama odaklı.'
    },
    pressing_zones: [
      {
        trap_name: 'Çift Hat Ultra Blok',
        trap_zone: 'Ceza sahası önü 20 metre',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: 'Dörtlü defans + dörtlü orta saha çift hat. Arası 5 metre. İki forvet bile geri döner. Ultra kompakt 4-4-2.',
        trap_execution: 'İki hat birlikte hareket. Ara boşluk yok. Alan kapama odaklı. Topa gidilmez, bölge korunur. Vücut blokeleri ve faul.',
        player_roles_involved: 'Dörtlü Defans (birinci hat), Dörtlü Orta Saha (ikinci hat), İki Forvet (üçüncü hat destek)',
        success_rate_high_against: 'Uzun top oynayan takımlar, bireysel oyuna bağımlı, ceza sahası dışı vuruş yapan',
        success_rate_low_against: 'Çok kaliteli takımlar, overload çok iyi yapan, sabırlı ve hızlı kombinasyon oynayan'
      },
      {
        trap_name: 'Yan Koridor Sayısal Üstünlük',
        trap_zone: 'Yan koridorlar kendi yarı saha',
        trap_trigger: 'Rakip kanat oyuncusuna pas',
        trap_setup: 'Bek + orta saha + orta saha + stoper dörtlüsü. İçeri geçiş tamamen kapalı. Yan çizgi kullanımı.',
        trap_execution: 'Dörtlü yan koridoru kapar. İçeri geçiş imkansız. Sayısal üstünlük 4v1. Alan kapama.',
        player_roles_involved: 'Bek (ön), İki Orta Saha (içe kesme bloke), Stoper (destek)',
        success_rate_high_against: 'Kanat oyununa mecbur takımlar, bire bir bağımlı, merkez alternatifi zayıf',
        success_rate_low_against: 'Merkezi iyi kullanan, hızlı taraf değiştiren, overload yapan takımlar'
      },
      {
        trap_name: 'Ceza Sahası Duvarı',
        trap_zone: 'Ceza sahası ve 6 pas',
        trap_trigger: 'Rakip ceza sahasına yaklaştığında',
        trap_setup: 'On oyuncu ceza sahası ve çevresinde. Dörtlü defans sıkı. Orta saha önlerinde. Forvetler bile geri. Ultra kalabalık.',
        trap_execution: 'Alan kapama maksimum. Her oyuncu bölgesini korur. Vücut blokeleri. Faul yapılır. Top uzaklaştırılır.',
        player_roles_involved: 'Dörtlü Defans (ana), Dörtlü Orta Saha (destek), İki Forvet (ek destek)',
        success_rate_high_against: 'Uzun top, hava topu bağımlı, ceza sahası dışı vuruş yapan takımlar',
        success_rate_low_against: 'Çok kaliteli bireysel oyuncular, overload çok iyi yapan, sabırlı takımlar'
      }
    ]
  },
  {
    id: 12,
    name: 'Gasperini Attack',
    possession: {
      possession_style: 'Agresif Dikey Atak',
      in_possession_shape: '3-4-3 Asimetrik Yükleme',
      passing_principles: '["Dikey pas öncelikli","Hızlı kombinasyonlar","Kanat bek sürpriz katılım","Risk alma cesareti","Tempo çok yüksek"]',
      movement_principles: '["Kanat beklerin box-to-box koşuları","Stoperler geniş buildup","Forvet üçlüsü mobil","Sürekli yoğun hareket","Atletik performans maksimum"]',
      progression_patterns: 'Üç stoperden hızlı açılış. Kanat bekler koridorları doldurur. Orta saha ikilisi destek. Forvet üçlüsüne dikey paslar. Çok hızlı tempo.',
      circulation_patterns: 'Minimal dolaşım. Çoğunlukla dikey ilerleme. Kanat bek üzerinden ani hızlanma. Tempo kontrolü az, sürekli ileri.',
      overload_patterns: 'Bir tarafta kanat bek + kanat + 10 numara üçgeni. Karşı kanat bek de katılabilir 5v3 yaratır. Forvet üçlüsü final üçlüde yoğunluk. Çılgın yüklemeler.'
    },
    non_possession: {
      defensive_philosophy: 'Agresif Adam Adama Savunma',
      pressing_philosophy: 'Her bölgede yoğun adam adama baskı',
      counter_attack_philosophy: 'Hızlı top kazanımı ve devam eden atak',
      out_of_possession_shape: '5-3-2 / 5-2-3 Agresif Blok',
      pressing_triggers: '["Her bölgede sürekli","Topu alan her oyuncu","Adam adama match-up","Yoğun fiziksel baskı"]',
      where_to_press: 'Her bölgede agresif. Adam adama baskı tüm sahada. Yüksek yoğunluk. Sürekli düelist.',
      when_to_press: 'Her zaman. Sürekli baskı. Adam adama takip. Fiziksel üstünlük arayışı.',
      how_to_press: 'Adam adama marking. Fiziksel düellolar. Yoğun koşu. Agresif müdahale. Sürekli baskı.',
      pressing_traps: 'Adam adama izolasyon. Fiziksel üstünlük alanları. Yan hatta sıkıştırma. Sürekli düelist çarpışmalar.'
    },
    pressing_zones: [
      {
        trap_name: 'Adam Adama Yüksek Baskı',
        trap_zone: 'Rakip yarı saha tüm bölge',
        trap_trigger: 'Topu alan her rakip oyuncu',
        trap_setup: 'Her oyuncu karşılığını takip eder. Forvet üçlüsü stoper üçlüsüne. Kanat bekler kanat beklere. Orta saha orta sahaya. Adam adama.',
        trap_execution: 'Eşleşen oyuncu direkt bastırır. Fiziksel düello. Yoğun koşu. Agresif müdahale. Sürekli baskı.',
        player_roles_involved: 'Tüm oyuncular (adam adama eşleşme), Forvetler (stoper baskı), Kanat Bekler (kanat bek takip)',
        success_rate_high_against: 'Fiziksel zayıf takımlar, baskı altında zayıf, teknik orta seviye',
        success_rate_low_against: 'Teknik çok iyi takımlar, baskı altında rahat, fiziksel üstün ekipler'
      },
      {
        trap_name: 'Kanat Bekler Sıkıştırma',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat bek + kanat + orta saha üçgeni. Adam adama baskı hazır. Yan çizgi kullanımı.',
        trap_execution: 'Kanat bek adam adama bastırır. Kanat destek. Orta saha içe kesme bloke. Fiziksel düello. Yan çizgide izolasyon.',
        player_roles_involved: 'Kanat Bek (adam adama), Kanat (destek baskı), Orta Saha (içe kesme bloke)',
        success_rate_high_against: 'Bire bir zayıf oyuncular, fiziksel zayıf kanat bekler, merkez alternatifi az',
        success_rate_low_against: 'Hızlı kombinasyon yapan, kaliteli kanat bekler, merkezi iyi kullanan'
      },
      {
        trap_name: 'Beşli Blok Fiziksel Duvar',
        trap_zone: 'Final üçlü savunma',
        trap_trigger: 'Rakip final üçlüde',
        trap_setup: 'Beşli defans kompakt. Orta saha önlerinde sıkı. Forvetler bile geri döner. Fiziksel mücadele hazır.',
        trap_execution: 'Beşli defans fiziksel düellolar. Orta saha destek. Vücut blokeleri. Agresif müdahale. Her topta mücadele.',
        player_roles_involved: 'Beşli Defans (fiziksel duvar), Orta Saha (destek), Forvetler (geri dönüş)',
        success_rate_high_against: 'Fiziksel zayıf forvetler, hava topu zayıf, bire bir düello kaybeden',
        success_rate_low_against: 'Fiziksel güçlü forvetler, hava topu iyi, hızlı kombinasyon yapan'
      }
    ]
  },
  {
    id: 13,
    name: 'Ranieri Leicester Miracle',
    possession: {
      possession_style: 'Pragmatik Verimli',
      in_possession_shape: '4-4-2 Basit Etkili',
      passing_principles: '["Basit ve etkili paslar","Vardy hızına servis","Mahrez yaratıcılığı","Minimal risk","Karşı atak odaklı"]',
      movement_principles: '["Vardy derinlik koşuları","Mahrez bire bir özgürlük","Orta saha dengeli kalır","Basit ve etkili hareketler","Karşı atak hazırlığı"]',
      progression_patterns: 'Defanstan hızlı uzun toplar Vardy hızına. Mahrez bire bir yaratıcılık. Orta saha basit destek. Minimal buildup. Karşı atak öncelikli.',
      circulation_patterns: 'Minimal dolaşım. Çoğunlukla hızlı dikey. Kante top kazanır, Drinkwater dağıtır, Vardy koşar. Basit ve etkili.',
      overload_patterns: 'Minimal overload. Mahrez bire bir bırakılır. Vardy derinlikte bekler. Orta saha dengeli. Karşı atak için hazırlık.'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt Blok Defansı',
      pressing_philosophy: 'Orta blok - Kante her yerde',
      counter_attack_philosophy: 'Top kazanımı ardından hızlı Vardy derinlik atağı',
      out_of_possession_shape: '4-4-2 Kompakt Blok',
      pressing_triggers: '["Rakip orta sahada hata","Yan hatlarda fırsat","Kante tetiklemesi","Seçici baskı"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt. Merkez Kante ile kapalı. İki hat sıkı.',
      when_to_press: 'Rakip hata yaptığında. Kante fırsat gördüğünde. Yan hatta tuzak anında. Seçici tetikleme.',
      how_to_press: 'Kompakt 4-4-2 blok. Kante her yerde top kazanıcı. İki hat arası dar. Basit ama etkili organizasyon.',
      pressing_traps: 'Orta sahada Kante izolasyonu. Yan hatta sayısal üstünlük. Kompakt blok ile merkez kapama. Basit ama etkili.'
    },
    pressing_zones: [
      {
        trap_name: 'Kante Orta Saha Vacuum',
        trap_zone: 'Orta saha merkez geniş alan',
        trap_trigger: 'Rakip orta sahada top olduğunda',
        trap_setup: 'Kante sürekli hareket halinde. Drinkwater destek. Dörtlü defans arkada. Forvet ikilisi önde. Kante her yerde.',
        trap_execution: 'Kante inanılmaz top kazanma yeteneği. Her topta mücadele. Sürekli koşu. Drinkwater destek verir. Basit ama çok etkili.',
        player_roles_involved: 'Kante (top kazanıcı her yerde), Drinkwater (destek), Dörtlü Defans (arka), Forvetler (ön blok)',
        success_rate_high_against: 'Orta saha yoğunluğu az takımlar, fiziksel zayıf orta saha, tek pivot',
        success_rate_low_against: 'Çok kaliteli orta saha, sayısal üstünlük yapan, hızlı kombinasyon oynayan'
      },
      {
        trap_name: 'Kompakt 4-4-2 Blok',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip topu ilerletttiğinde',
        trap_setup: 'Dörtlü defans + dörtlü orta saha kompakt. İki forvet pas yollarını gözetir. İki hat arası 10 metre. Merkez Kante ile kapalı.',
        trap_execution: 'İki hat birlikte hareket. Kante her yerde top kazanır. Kompakt yapı bozulmaz. Basit ama etkili blok savunması.',
        player_roles_involved: 'Dörtlü Defans (ana hat), Dörtlü Orta Saha (Kante merkez), İki Forvet (pas yolu kesme)',
        success_rate_high_against: 'Merkez odaklı takımlar, orta saha bağımlı, yavaş buildup',
        success_rate_low_against: 'Kanat oyunu çok iyi, overload yapan, sabırlı oynayan takımlar'
      },
      {
        trap_name: 'Karşı Atak Geçişi',
        trap_zone: 'Top kazanım bölgesi',
        trap_trigger: 'Kante top kazandığında',
        trap_setup: 'Vardy her zaman derinlikte hazır. Mahrez kanat pozisyonda. Drinkwater dağıtım hazır. Karşı atak tetikleme.',
        trap_execution: 'Kante kazanır, Drinkwater hızlı dağıtır, Vardy koşar, Mahrez destek. Hızlı geçiş. 3-4 pas ile gol pozisyonu.',
        player_roles_involved: 'Kante (kazanım), Drinkwater (dağıtım), Vardy (derinlik), Mahrez (yaratıcılık)',
        success_rate_high_against: 'Yüksek savunma hattı, yavaş geri dönüş, karşı atak zayıf savunma',
        success_rate_low_against: 'Düşük blok, hızlı geri dönüş, iyi organize savunma'
      }
    ]
  },
  {
    id: 14,
    name: 'Zidane Balanced Pragmatic',
    possession: {
      possession_style: 'Dengelenmiş Esnek',
      in_possession_shape: '4-3-3 Dengeli',
      passing_principles: '["Oyuncu kalitesine güven","Yaratıcılığa özgürlük","Pragmatik seçimler","Kroos-Modric dağıtım","BBC forvet hattı"]',
      movement_principles: '["Ronaldo özgür hareketler","Benzema false 9 düşüşleri","Bale derinlik koşuları","Modric her yerde","Esnek pozisyonlar"]',
      progression_patterns: 'Kroos-Modric ikilisi orta saha kontrolü. Marcelo ataklara katılır. BBC forvet hattı özgürlük. Oyuncu kalitesine güven. Esnek ilerleme.',
      circulation_patterns: 'Kroos tempo kontrolü. Modric yaratıcılık. Casemiro güvenlik. Dengeli dolaşım. Ani tempo değişimleri.',
      overload_patterns: 'Marcelo yükselir bir tarafta. Kroos-Modric orta saha dominasyonu. BBC üçlüsü forvet hattında tehdit. Doğal üstünlükler.'
    },
    non_possession: {
      defensive_philosophy: 'Pragmatik Pozisyonel',
      pressing_philosophy: 'Seçici baskı - enerji ekonomisi',
      counter_attack_philosophy: 'Hızlı geçişler, oyuncu kalitesi ile sonuçlandırma',
      out_of_possession_shape: '4-3-3 Orta Blok',
      pressing_triggers: '["Stratejik anlarda","Oyuncu kalite farkı","Maç durumu gerektirdiğinde","Seçici tetikleme"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt. Seçici baskı noktaları. Merkez koruma.',
      when_to_press: 'Rakip hata yaptığında. Kalite farkı anında. Maç durumu gerektirdiğinde. Enerji ekonomisi.',
      how_to_press: 'Akıllı pozisyonel savunma. Grup organizasyonu. Seçici baskı. Casemiro merkez kilidi. Pragmatik yaklaşım.',
      pressing_traps: 'Seçici bölgelerde. Casemiro merkez kıskacı. Yan hatta fırsat tuzakları. Stratejik baskı noktaları.'
    },
    pressing_zones: [
      {
        trap_name: 'Casemiro Merkez Kilidi',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Casemiro merkez pozisyon. Kroos-Modric yanlarında. BBC üçlüsü önde. Dörtlü defans arkada. Dengeli yapı.',
        trap_execution: 'Casemiro merkezi kilitledi. Kroos-Modric destek. BBC forvetler pas yollarını gözetir. Pragmatik baskı.',
        player_roles_involved: 'Casemiro (merkez kilidi), Kroos-Modric (destek), BBC (pas yolu), Defans (arka)',
        success_rate_high_against: 'Merkez odaklı takımlar, orta saha zayıf, pivot bağımlı',
        success_rate_low_against: 'Kanat oyunu iyi, overload yapan, orta saha kaliteli takımlar'
      },
      {
        trap_name: 'Yan Koridor Seçici Baskı',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Fırsat anında kanat oyuncusuna',
        trap_setup: 'Kanat (Bale/Ronaldo) + orta saha + bek üçgeni. Pasif bekle, fırsat değerlendir. Enerji ekonomisi.',
        trap_execution: 'Fırsat anında üçlü aktive olur. Koordineli baskı. Hızlı top kazanımı veya faul. Sonra tekrar pasif.',
        player_roles_involved: 'Kanat (ön baskı), Orta Saha (destek), Bek (yan kapama)',
        success_rate_high_against: 'Zayıf kanat oyuncular, yorgun takımlar, bire bir zayıf',
        success_rate_low_against: 'Kaliteli kanat oyuncular, hızlı kombinasyon, merkez alternatifi iyi'
      },
      {
        trap_name: 'Orta Blok Pozisyonel',
        trap_zone: 'Kendi yarı saha',
        trap_trigger: 'Rakip topu ilerletttiğinde',
        trap_setup: 'Kompakt 4-3-3. Casemiro merkez. Kroos-Modric yanlar. BBC önde. Pozisyonel disiplin.',
        trap_execution: 'Pozisyonel savunma. Casemiro merkez kilidi. Diğerleri destek ve boşluk kapama. Pragmatik organizasyon.',
        player_roles_involved: 'Dörtlü Defans (ana), Üçlü Orta Saha (Casemiro merkez), BBC (ön hat)',
        success_rate_high_against: 'Orta saha zayıf, merkez odaklı, bireysel oyuna bağımlı',
        success_rate_low_against: 'Overload iyi yapan, kanat oyunu çok iyi, sabırlı oynayan'
      }
    ]
  },
  {
    id: 15,
    name: 'Inzaghi Modern Flexible',
    possession: {
      possession_style: 'Esnek ve Çok Yönlü',
      in_possession_shape: '3-5-2 Asimetrik Varyasyonlar',
      passing_principles: '["Kanat bek katılımı yoğun","Orta saha üçlüsü kontrol","Forvet ikilisi kombinasyon","Esnek geçişler","Asimetrik yüklemeler"]',
      movement_principles: '["Kanat beklerin akıllı koşuları","Stoperler geniş buildup","Forvet ikilisi mobil","Orta saha rotasyonları","Sürekli adaptasyon"]',
      progression_patterns: 'Üç stoperden buildup. Kanat bekler koridorları doldurur. Orta saha üçlüsü destek ve yaratıcılık. Forvet ikilisine kombinasyonlar. Esnek ilerleme.',
      circulation_patterns: 'Stoperler arası tempo kontrolü. Kanat bekler outlet. Orta saha yaratıcılık. Asimetrik dolaşım kalıpları.',
      overload_patterns: 'Bir tarafta kanat bek + orta saha + forvet üçlüsü. Karşı kanat bek dengeli. Asimetrik yapı. Esnek overload yaratma.'
    },
    non_possession: {
      defensive_philosophy: 'Esnek Pozisyonel Savunma',
      pressing_philosophy: 'Duruma göre baskı yoğunluğu',
      counter_attack_philosophy: 'Hızlı geçişler, forvet ikilisi ile çıkış',
      out_of_possession_shape: '5-3-2 Esnek Blok',
      pressing_triggers: '["Durum okuma ile tetikleme","Rakip buildup hatası","Yan hatta fırsat","Maç durumuna göre"]',
      where_to_press: 'Esnek baskı. Bazen yüksek bazen orta blok. Durum okuma önemli. Adaptif savunma.',
      when_to_press: 'Rakip hata yaptığında. Maç durumu gerektirdiğinde. Fırsat anlarında. Esnek tetikleme.',
      how_to_press: 'Beşli defans hattı. Orta saha üçlüsü destek. Forvet ikilisi pas yolu kesme. Esnek organizasyon.',
      pressing_traps: 'Yan hatta adaptif tuzak. Orta sahada esnek kıskaca alma. Beşli blok ile alan kapama. Duruma göre organizasyon.'
    },
    pressing_zones: [
      {
        trap_name: 'Kanat Bek Adaptif Baskı',
        trap_zone: 'Yan koridor',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat bek + orta saha + stoper üçgeni. Duruma göre yoğunluk ayarı. Esnek organizasyon.',
        trap_execution: 'Durum okuma ile üçlü baskı. Bazen yoğun bazen kontrollü. Esnek yaklaşım. Top kazanımı veya kontrol.',
        player_roles_involved: 'Kanat Bek (ön), Orta Saha (destek), Stoper (arka)',
        success_rate_high_against: 'Kanat oyununa bağımlı, bire bir zayıf, merkez alternatifi az',
        success_rate_low_against: 'Hızlı kombinasyon, kaliteli kanat bekler, merkezi iyi kullanan'
      },
      {
        trap_name: 'Orta Saha Üçlü Kontrol',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Orta saha üçlüsü esnek pozisyon. Beşli defans arkada. Forvet ikilisi önde. Adaptif yapı.',
        trap_execution: 'Üçlü orta saha grup baskısı veya kontrol. Duruma göre adaptasyon. Esnek organizasyon.',
        player_roles_involved: 'Üçlü Orta Saha (adaptif kontrol), Beşli Defans (arka), Forvet İkilisi (ön)',
        success_rate_high_against: 'Orta saha zayıf, pivot bağımlı, adaptasyon yavaş',
        success_rate_low_against: 'Orta saha kaliteli, hızlı adaptasyon, esnek takımlar'
      },
      {
        trap_name: 'Beşli Blok Esnek Duvar',
        trap_zone: 'Final üçlü',
        trap_trigger: 'Rakip final üçlüye girdiğinde',
        trap_setup: 'Beşli defans esnek hat. Orta saha önlerinde. Forvetler geri döner. Duruma göre organizasyon.',
        trap_execution: 'Beşli defans hat savunması. Orta saha destek. Esnek alan kapama. Duruma göre adaptasyon.',
        player_roles_involved: 'Beşli Defans (ana), Üçlü Orta Saha (destek), Forvet İkilisi (geri dönüş)',
        success_rate_high_against: 'Uzun top oynayan, bireysel bağımlı, hava topu ağırlıklı',
        success_rate_low_against: 'Hızlı kombinasyon, overload iyi yapan, zeminde iyi oynayan'
      }
    ]
  },
  {
    id: 16,
    name: 'Flick High Press Vertical',
    possession: {
      possession_style: 'Dikey Hızlı Pozisyonel',
      in_possession_shape: '4-3-3 Yüksek Hatlı',
      passing_principles: '["Dikey paslar öncelikli","Kimmich dağıtım","Hızlı kombinasyonlar","Yarı alanlarda yoğunlaşma","Yüksek tempo"]',
      movement_principles: '["Bekler geniş yüksek pozisyon","Lewandowski hedef adam","Kanatlar içe keser","Goretzka-Muller kutu akınları","Sürekli hareket"]',
      progression_patterns: 'Neuer sweeper keeper buildup. Kimmich pivot dağıtıcı. Bekler yüksek pozisyon. Dikey paslarla hızlı ilerleme. Lewandowski hedef adam.',
      circulation_patterns: 'Kimmich üzerinden tempo kontrolü. Beklerle top dolaşımı. Ani dikey hızlanma. Yarı alanlarda Muller yaratıcılık.',
      overload_patterns: 'Yarı alanlarda 4v3 yaratma. Bekler yüksek katılım. Muller boşluk bulucu. Lewandowski hedef. Yoğun final üçlü baskısı.'
    },
    non_possession: {
      defensive_philosophy: 'Ultra Yüksek Baskı',
      pressing_philosophy: 'Rakip ceza sahası önünden başlayan yoğun baskı',
      counter_attack_philosophy: 'Yüksek bölgede kazanıp direkt gol',
      out_of_possession_shape: '4-3-3 Çok Yüksek Hat',
      pressing_triggers: '["Stoper top aldığında","Kaleci ayağına aldığında","Geriye pas","Her rakip dokunuşu"]',
      where_to_press: 'Rakip ceza sahası önünden başlar. Çok yüksek hat. Tüm takım yukarıda. Agresif baskı her bölgede.',
      when_to_press: 'Sürekli. Rakip her top aldığında. Çok yüksek yoğunluk. Neuer bile pressingde.',
      how_to_press: 'Forvet hattı yüksek baskı. Orta saha pas yollarını kapar. Defans hattı orta sahada. Neuer sweeper. Ultra agresif.',
      pressing_traps: 'Stoper izolasyonu çok yüksek bölgede. Yan hatta üçlü tuzak. Offsid tuzağı yüksek hat ile. Neuer son adam.'
    },
    pressing_zones: [
      {
        trap_name: 'Ultra Yüksek Stoper Baskısı',
        trap_zone: 'Rakip ceza sahası önü',
        trap_trigger: 'Kaleci stoperlere pas',
        trap_setup: 'Lewandowski yüksek baskı. Kanatlar beklere yol keser. Orta saha pivotu bloke. Defans orta sahada. Neuer sweeper.',
        trap_execution: 'Lewandowski stopere bastırır. Kanatlar bekleri kapar. Orta saha pivotu izole eder. Çok yüksek hat. Neuer son adam. Offsid tuzağı.',
        player_roles_involved: 'Lewandowski (stoper), Kanatlar (bekler), Orta Saha (pivot), Defans (yüksek hat), Neuer (sweeper)',
        success_rate_high_against: 'Kısa buildup yapan, baskı altında panik, teknik zayıf stopler',
        success_rate_low_against: 'Uzun top oynayan, sweeper keeper iyi kullanan, baskıya alışık'
      },
      {
        trap_name: 'Yan Hat Yüksek Tuzak',
        trap_zone: 'Yan koridor rakip yarı saha',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Kanat + orta saha + bek üçgeni çok yüksek pozisyon. Yan çizgi kullanımı. Neuer bile destek mesafesinde.',
        trap_execution: 'Üçlü yüksek baskı. Yan çizgide sıkıştırma. Çok agresif. Top kazanımı veya yan dışarı. Neuer destek.',
        player_roles_involved: 'Kanat (ön), Orta Saha (destek), Bek (yan kapama), Neuer (sweeper destek)',
        success_rate_high_against: 'Kanat oyununa bağımlı, baskı altında zayıf, yavaş kanat bekler',
        success_rate_low_against: 'Hızlı kanat bekler, uzun top iyi kullanan, Neuer arkasını iyi kullanan'
      },
      {
        trap_name: 'Orta Saha Yüksek Overload',
        trap_zone: 'Rakip orta saha',
        trap_trigger: 'Rakip pivot top aldığında',
        trap_setup: 'Muller + Goretzka + Kimmich üçlüsü + forvet hattı desteği. Yüksek pozisyon. Grup baskısı hazır.',
        trap_execution: 'Dörtlü grup baskısı. Pivotu izole eder. Pas yolları kapalı. Çok yüksek yoğunluk. Top kazanımı ve direkt gol pozisyonu.',
        player_roles_involved: 'Kimmich (direkt), Goretzka-Muller (destek), Forvet Hattı (pas yolu), Defans (yüksek hat)',
        success_rate_high_against: 'Tek pivot, orta saha zayıf, baskı altında panik',
        success_rate_low_against: 'Çift pivot, baskıya alışık, uzun top tercih eden'
      }
    ]
  },
  {
    id: 17,
    name: 'Mourinho Inter Treble',
    possession: {
      possession_style: 'Etkili ve Kontrollu',
      in_possession_shape: '4-3-1-2 Kompakt',
      passing_principles: '["Sneijder yaratıcılığı","Cambiasso güvenli dağıtım","Milito-Eto hedef","Kontrollü tempo","Risk minimize"]',
      movement_principles: '["Maicon sürpriz yükseliş","Milito-Eto ikilisi mobil","Sneijder özgür pozisyon","Savunma dengesi öncelik","Kontrollü hareketler"]',
      progression_patterns: 'Cambiasso güvenli dağıtım. Sneijder yaratıcılık merkezi. Maicon sağdan sürpriz. Milito-Eto ikilisi kombinasyon. Kontrollü ilerleme.',
      circulation_patterns: 'Cambiasso-Zanetti ikilisi kontrol. Sneijder yaratıcı çıkış. Tempo dengeli. Karşı atak dengesi her zaman korunur.',
      overload_patterns: 'Maicon sağdan sürpriz yükleliş. Sneijder-Milito-Eto üçgeni final üçlüde. Sol taraf dengeli. Seçici yüklemeler.'
    },
    non_possession: {
      defensive_philosophy: 'Organize Kompakt Savunma',
      pressing_philosophy: 'Orta blok - seçici baskı',
      counter_attack_philosophy: 'Top kazanımı ardından Sneijder-Milito-Eto hızlı çıkış',
      out_of_possession_shape: '4-5-1 Kompakt Blok',
      pressing_triggers: '["Yan hatta kesin fırsat","Rakip hata yaptığında","Maç durumu gerektirdiğinde","Seçici tetikleme"]',
      where_to_press: 'Orta blok savunma. Kendi yarı sahada kompakt. Merkez Cambiasso ile kapalı. Beşli orta saha hattı.',
      when_to_press: 'Rakip hata yaptığında. Yan hatta fırsat. Maç skoru gerektirdiğinde. Enerji ekonomisi.',
      how_to_press: 'Kompakt 4-5-1 blok. İki hat arası dar. Cambiasso merkez kilidi. Disiplinli organizasyon.',
      pressing_traps: 'Yan hatta beşli orta saha tuzağı. Cambiasso merkez kıskacı. Kompakt blok ile alan kapama. Seçici baskı.'
    },
    pressing_zones: [
      {
        trap_name: 'Beşli Orta Saha Duvarı',
        trap_zone: 'Orta saha hattı',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Beş orta saha oyuncusu kompakt hat. Cambiasso merkez. Sneijder bile savunmada. Dörtlü defans arkada. Eto tek forvet.',
        trap_execution: 'Beşli orta saha hat savunması. Cambiasso merkez kilidi. Kompakt yapı. Alan kapama. Top kazanımı sonrası hızlı karşı atak.',
        player_roles_involved: 'Beşli Orta Saha (Cambiasso merkez), Dörtlü Defans (arka), Eto (tek forvet)',
        success_rate_high_against: 'Merkez odaklı takımlar, orta saha bağımlı, yavaş buildup',
        success_rate_low_against: 'Kanat oyunu iyi, overload yapan, sabırlı oynayan'
      },
      {
        trap_name: 'Yan Koridor Seçici Tuzak',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Kesin fırsat anında',
        trap_setup: 'Maicon/Chivu + orta saha + orta saha üçlüsü. Pasif bekle, fırsat değerlendir. Enerji ekonomisi.',
        trap_execution: 'Fırsat anında üçlü aktive olur. Hızlı top kazanımı. Sonra tekrar kompakt bloka dönüş.',
        player_roles_involved: 'Bek (ön), İki Orta Saha (destek ve kapama)',
        success_rate_high_against: 'Zayıf kanat oyuncular, yorgun takımlar, bire bir zayıf',
        success_rate_low_against: 'Kaliteli kanat oyuncular, hızlı kombinasyon, merkez alternatifi iyi'
      },
      {
        trap_name: 'Cambiasso Merkez Kilidi',
        trap_zone: 'Orta saha merkez çember',
        trap_trigger: 'Rakip pivot top aldığında',
        trap_setup: 'Cambiasso merkez pozisyon. Zanetti-Motta yanlarında. Sneijder önde destek. Kompakt organizasyon.',
        trap_execution: 'Cambiasso direkt baskı veya kontrol. Zanetti-Motta pas yollarını kapar. Sneijder geri destek. Merkez tamamen kapalı.',
        player_roles_involved: 'Cambiasso (merkez kilidi), Zanetti-Motta (yan destek), Sneijder (ön destek)',
        success_rate_high_against: 'Tek pivot, orta saha zayıf, pivot bağımlı takımlar',
        success_rate_low_against: 'Çift pivot, kanat oyunu iyi, uzun top tercih eden'
      }
    ]
  },
  {
    id: 18,
    name: 'Sacchi Pressing Machine',
    possession: {
      possession_style: 'Dikey Hızlı Atak',
      in_possession_shape: '4-4-2 Kompakt Hızlı',
      passing_principles: '["Hızlı dikey paslar","Gullit-Rijkaard dağıtım","Van Basten hedef","Donadoni-Colombo kanat","Minimal dokunuş"]',
      movement_principles: '["Van Basten akıllı hareketler","Gullit box-to-box","Kanat oyuncular geniş","Sürekli yoğun hareket","Yüksek tempo"]',
      progression_patterns: 'Hızlı dikey pas oyunu. Gullit-Rijkaard orta saha motoru. Van Basten hedef adam. Kanatlardan servis. Az dokunuşla ilerleme.',
      circulation_patterns: 'Minimal dolaşım. Çoğunlukla dikey ve hızlı. Tempo çok yüksek. Sürekli ileri baskı.',
      overload_patterns: 'Box-to-box oyuncularla ani yüklemeler. Van Basten-Gullit kombinasyonu. Kanat oyuncularla geniş. Ani sayısal üstünlükler.'
    },
    non_possession: {
      defensive_philosophy: 'Devrimci Pressing Sistemi',
      pressing_philosophy: 'Zonepressing - takım olarak baskı',
      counter_attack_philosophy: 'Yüksek bölgede kazanıp direkt gol',
      out_of_possession_shape: '4-4-2 Ultra Kompakt',
      pressing_triggers: '["Rakip her dokunuşu","Alan bazlı tetikleme","Takım olarak hareket","Sürekli yüksek baskı"]',
      where_to_press: 'Rakip yarı sahada yüksek baskı. Alan bazlı pressing. Tüm takım birlikte hareket. 25 metre kompakt alan.',
      when_to_press: 'Sürekli. Rakip her top aldığında. Takım olarak zonepressing. Yüksek yoğunluk.',
      how_to_press: 'Devrimci zonepressing. İki hat birlikte hareket. 25 metre kompakt alan. Topa değil alana odaklanma. Takım organizasyonu.',
      pressing_traps: 'Alan bazlı tuzaklar. Zonepressing ile izolasyon. Yan hatta dar alan kıskacı. Takım olarak kompakt baskı.'
    },
    pressing_zones: [
      {
        trap_name: 'Zonepressing Yüksek Blok',
        trap_zone: 'Rakip yarı saha tüm alan',
        trap_trigger: 'Rakip buildup başlattığında',
        trap_setup: '4-4-2 ultra kompakt. İki hat arası 25 metre. Takım birlikte yukarı-aşağı hareket. Alan bazlı pressing.',
        trap_execution: 'Takım olarak zonepressing. Topa en yakın bastırır, diğerleri alan kapar. İki hat birlikte hareket. Devrimci sistem.',
        player_roles_involved: 'Tüm Takım (zonepressing birlikte hareket), Gullit-Rijkaard (orta saha motor), Van Basten (forvet baskı)',
        success_rate_high_against: 'Baskı altında zayıf, yavaş buildup, teknik orta seviye',
        success_rate_low_against: 'Uzun top oynayan, baskıya alışık, teknik çok iyi takımlar'
      },
      {
        trap_name: 'Yan Koridor Alan Tuzağı',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip topu yana taşıdığında',
        trap_setup: 'Kanat + orta saha + bek üçgeni + yan çizgi. Takım aynı tarafa kayar. Zonepressing yan hatta.',
        trap_execution: 'Üçlü + yan çizgi = dar alan. Zonepressing ile oyuncuyu izole etme. Takım birlikte yan tarafa kayar.',
        player_roles_involved: 'Kanat (ön), Orta Saha (destek), Bek (arka), Tüm Takım (yan kayma)',
        success_rate_high_against: 'Kanat oyununa bağımlı, yavaş kanat değişimi, baskı altında zayıf',
        success_rate_low_against: 'Hızlı taraf değiştiren, merkezi iyi kullanan, baskıya alışık'
      },
      {
        trap_name: 'Orta Saha Kompakt Alan',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahada top',
        trap_setup: 'Gullit-Rijkaard-Ancelotti-Donadoni dörtlüsü. Van Basten-gelen forvet önde. Defans destek. 25 metre alan.',
        trap_execution: 'Dörtlü orta saha zonepressing. Alan bazlı baskı. En yakın bastırır, diğerleri alan kapar. Rijkaard-Gullit motor.',
        player_roles_involved: 'Dörtlü Orta Saha (Gullit-Rijkaard motor), Forvet İkilisi (ön), Defans (destek)',
        success_rate_high_against: 'Orta saha zayıf, baskı altında panik, yavaş oyun',
        success_rate_low_against: 'Orta saha kaliteli, hızlı tek dokunuş, uzun top tercih eden'
      }
    ]
  },
  {
    id: 19,
    name: 'Cruyff Dream Team',
    possession: {
      possession_style: 'Total Football Pozisyonel',
      in_possession_shape: '3-4-3 Akışkan Rotasyonlar',
      passing_principles: '["Sürekli üçgen oluşturma","Guardiola pivot dağıtım","Pozisyonel rotasyonlar","Kısa pas kombinasyonları","Her oyuncu her pozisyonda"]',
      movement_principles: '["Sürekli pozisyon değişimleri","Koeman stoper ama playmaker","Laudrup yaratıcı özgürlük","Stoichkov-Romario mobil","Total football felsefesi"]',
      progression_patterns: 'Koeman stoper ama playmaker. Guardiola pivot organizatör. Laudrup yaratıcı 10. Stoichkov-Romario mobil forvet. Sürekli rotasyonlar.',
      circulation_patterns: 'Sürekli üçgen oluşturma. Top dolaşımı çok hızlı. Pozisyonel değişimler. Laudrup yaratıcılık merkezi. Akışkan oyun.',
      overload_patterns: 'Her bölgede sayısal üstünlük yaratma. Pozisyonel rotasyonlarla boşluk bulma. Total football ile ani yüklemeler. Guardiola koordinasyonu.'
    },
    non_possession: {
      defensive_philosophy: 'Yüksek Baskı Total Football',
      pressing_philosophy: 'Rakip yarı sahada sürekli yoğun baskı',
      counter_attack_philosophy: 'Topu geri kazanıp pozisyonel üstünlük',
      out_of_possession_shape: '3-4-3 Yüksek Blok',
      pressing_triggers: '["Rakip her dokunuşu","Total football pressing","Sürekli yoğun baskı","Pozisyonel rotasyonlar"]',
      where_to_press: 'Rakip yarı sahada yüksek baskı. Total football pressing. Her oyuncu bastırabilir. Sürekli hareket.',
      when_to_press: 'Sürekli. Rakip her top aldığında. Total football felsefesi. Yüksek yoğunluk.',
      how_to_press: 'Pozisyonel baskı. Her oyuncu her pozisyonda bastırabilir. Guardiola koordinasyon. Koeman bile yüksek bastırır. Total football.',
      pressing_traps: 'Pozisyonel rotasyonlarla tuzak. Total football pressing. Her bölgede organizasyon. Sürekli hareketli baskı.'
    },
    pressing_zones: [
      {
        trap_name: 'Total Football Yüksek Baskı',
        trap_zone: 'Rakip ceza sahası önü',
        trap_trigger: 'Rakip buildup başladığında',
        trap_setup: 'Üçlü forvet yüksek. Dörtlü orta saha destek. Üçlü defans bile yüksek. Guardiola koordinasyon. Total football.',
        trap_execution: 'En yakın oyuncu bastırır, pozisyon fark etmez. Diğerleri pas yollarını kapar. Sürekli rotasyon. Total football pressing.',
        player_roles_involved: 'Tüm Takım (pozisyonel pressing), Guardiola (koordinasyon), Koeman (playmaker stoper)',
        success_rate_high_against: 'Baskı altında zayıf, teknik orta seviye, yavaş buildup',
        success_rate_low_against: 'Uzun top oynayan, baskıya alışık, teknik çok üst seviye'
      },
      {
        trap_name: 'Guardiola Pivot Organizasyonu',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Guardiola pivot merkez. Dörtlü orta saha esnek. Koeman arkadan destek bile bastırabilir. Pozisyonel rotasyonlar.',
        trap_execution: 'Guardiola organizasyon yapar. En yakın bastırır. Pozisyon değişimleri ile pas yollarını kapar. Total football.',
        player_roles_involved: 'Guardiola (pivot koordinasyon), Dörtlü Orta Saha (esnek), Koeman (stoper ama bastırabilir)',
        success_rate_high_against: 'Orta saha zayıf, organizasyon zayıf, baskı altında panik',
        success_rate_low_against: 'Orta saha kaliteli, organizasyon iyi, baskıya alışık'
      },
      {
        trap_name: 'Pozisyonel Rotasyon Tuzağı',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip topu yana taşıdığında',
        trap_setup: 'Pozisyonel rotasyonlarla yan hatta sayısal üstünlük. Koeman bile bastırabilir. Guardiola koordine eder. Total football.',
        trap_execution: 'Pozisyon rotasyonları ile 3-4 oyuncu yan hatta. Sayısal üstünlük. Yan çizgi kullanımı. Total football pressing.',
        player_roles_involved: 'Yan Oyuncular (esnek), Koeman (her yerde olabilir), Guardiola (koordinasyon)',
        success_rate_high_against: 'Kanat oyununa bağımlı, pozisyonel zayıf, sayısal eşitlikte zayıf',
        success_rate_low_against: 'Hızlı kombinasyon, pozisyonel güçlü, baskıya alışık'
      }
    ]
  },
  {
    id: 20,
    name: 'Van Gaal Ajax 1995',
    possession: {
      possession_style: 'Ajax Pozisyonel Okul',
      in_possession_shape: '4-3-3 / 3-4-3 Buildup',
      passing_principles: '["Sürekli üçgen oluşturma","Kısa pas kombinasyonları","Pozisyonel rotasyonlar","Davids-Seedorf kontrol","Litmanen yaratıcılık"]',
      movement_principles: '["Bekler geniş açılım","Rijkaard stoper ama pivot","Litmanen false 9 düşüşleri","Overmars-Finidi hız","Kluivert hedef"]',
      progression_patterns: 'Rijkaard stoper ama pivota düşer. Bekler geniş buildup. Davids-Seedorf orta saha motoru. Litmanen false 9. Overmars-Finidi kanatlar. Kluivert hedef.',
      circulation_patterns: 'Rijkaard-Davids-Seedorf üçgeni. Sürekli üçgen oluşturma. Litmanen yaratıcı çıkış. Hızlı top dolaşımı. Ajax okulu.',
      overload_patterns: 'Rijkaard pivota düşüşü ile 3 buildup. Yarı alanlarda Litmanen-Seedorf kombinasyonu. Bekler yüksek katılım. Overload yaratma ustası.'
    },
    non_possession: {
      defensive_philosophy: 'Yüksek Baskı Ajax Okulu',
      pressing_philosophy: 'Rakip buildup bölgesinde yoğun baskı',
      counter_attack_philosophy: 'Top kazanımı ve pozisyonel üstünlük',
      out_of_possession_shape: '4-3-3 Yüksek Blok',
      pressing_triggers: '["Stoper top aldığında","Geriye pas","Rakip buildup","Sürekli baskı"]',
      where_to_press: 'Rakip yarı sahada yüksek baskı. Buildup bölgesinde agresif. Ajax okulu pressing.',
      when_to_press: 'Stoper topu aldığında. Geriye pas. Rakip buildup başladığında. Sürekli yüksek yoğunluk.',
      how_to_press: 'Forvet hattı yüksek. Orta saha üçlüsü pas yollarını kapar. Rijkaard koordinasyon. Ajax okulu organizasyon.',
      pressing_traps: 'Stoper baskısı ile hata yaptırma. Yan hatta üçlü tuzak. Orta sahada Davids-Seedorf kıskacı. Ajax sistemi.'
    },
    pressing_zones: [
      {
        trap_name: 'Ajax Yüksek Stoper Baskısı',
        trap_zone: 'Rakip ceza sahası önü buildup',
        trap_trigger: 'Kaleci stoperlere pas',
        trap_setup: 'Kluivert yüksek baskı. Overmars-Finidi beklere yol keser. Orta saha üçlüsü pivotu bloke. Rijkaard koordinasyon.',
        trap_execution: 'Kluivert stopere bastırır. Kanatlar bekleri kapar. Davids-Seedorf pivotu izole eder. Ajax okulu pressing.',
        player_roles_involved: 'Kluivert (stoper baskı), Overmars-Finidi (bek yolu), Davids-Seedorf (pivot), Rijkaard (koordinasyon)',
        success_rate_high_against: 'Kısa buildup yapan, teknik zayıf stopler, baskı altında panik',
        success_rate_low_against: 'Uzun top oynayan, baskıya alışık, teknik üst seviye'
      },
      {
        trap_name: 'Orta Saha Üçlü Kontrol',
        trap_zone: 'Orta saha merkez',
        trap_trigger: 'Rakip orta sahaya ilerlediğinde',
        trap_setup: 'Davids-Seedorf-Litmanen üçgeni. Rijkaard arkadan destek. Sürekli üçgen oluşturma. Ajax felsefesi.',
        trap_execution: 'Üçlü orta saha grup baskısı. Davids fiziksel. Seedorf teknik. Litmanen akıllı. Rijkaard koordine eder. Ajax sistemi.',
        player_roles_involved: 'Davids (fiziksel baskı), Seedorf (teknik kontrol), Litmanen (akıllı pozisyon), Rijkaard (koordinasyon)',
        success_rate_high_against: 'Orta saha zayıf, pivot bağımlı, tek orta saha oyuncusu',
        success_rate_low_against: 'Orta saha kaliteli, sayısal üstünlük, uzun top tercih eden'
      },
      {
        trap_name: 'Kanat Hız Tuzağı',
        trap_zone: 'Yan koridorlar',
        trap_trigger: 'Rakip kanat beke pas',
        trap_setup: 'Overmars/Finidi hız + bek + orta saha üçgeni. Ajax okulu yan hat baskısı.',
        trap_execution: 'Kanat hızlı baskı. Bek destek. Orta saha içe kesme bloke. Üçlü koordineli baskı. Ajax sistemi.',
        player_roles_involved: 'Kanat (hızlı baskı), Bek (destek), Orta Saha (içe kesme bloke)',
        success_rate_high_against: 'Yavaş kanat bekler, bire bir zayıf, merkez alternatifi az',
        success_rate_low_against: 'Hızlı kanat bekler, kaliteli bire bir, merkezi iyi kullanan'
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
                  console.log(`\n🎉 SİSTEM 11-20 BAŞARIYLA DOLDURULDU!\n`);
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
