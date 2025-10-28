const db = require('./ultra_database');

console.log('\n🔄 SİSTEM 1-10 VERİLERİ DOLDURMA...\n');

const systems = [
  {
    // ID 1: Guardiola Possession
    id: 1,
    name: 'Guardiola Possession',
    possession: {
      possession_style: 'Pozisyonel Dominasyon',
      possession_target_percentage: 70,
      in_possession_shape: '2-3-2-3 Buildup Şekli - Pivot düşer, bekler geniş',
      passing_principles: JSON.stringify([
        'Sürekli üçgen ve elmas oluşturma',
        'Kısa-orta pas kombinasyonları dominasyonu',
        'Pozisyonel rotasyonlar ile yer değiştirme',
        'Yarı alanlarda sayısal yoğunlaşma',
        'Hasta/Pivot üzerinden oyun kurma'
      ]),
      movement_principles: JSON.stringify([
        'Sürekli hareket - pas ver koş',
        'Boşluklara diagonal koşular',
        'Lateral hareketler ile genişlik yaratma',
        'False 9 düşüşleri ile boşluk',
        'İçe kesen kanatlar yarı alanlara'
      ]),
      build_up_strategy: 'Kaleciden başlayan kısa pas oyunu. Bekler geniş açılır, pivot düşerek üçüncü stoper olur. 3-2 buildup şekli oluşturulur. Hasta veya De Bruyne tipi 8 numara oyun kurar.',
      progression_methods: 'Hasta veya pivot üzerinden kontrollü ilerleme. Yarı alanlarda sayısal üstünlük yaratarak overload. Ani tempo değişimleri ile rakip savunmayı şaşırtma.',
      key_players_positioning: 'Kaleci sweeper, bekler çok geniş, pivot düşük, 8 numara yarı alan, false 9 düşüp boşluk yarat'
    },
    non_possession: {
      defensive_philosophy: 'Yoğun Karşı Baskı (Gegenpressing)',
      pressing_philosophy: 'Top kaybından sonraki 6 saniye içinde topu geri kazanma prensibi',
      counter_attack_philosophy: 'Kontra atak yerine topu hemen geri kazanıp hakimiyeti sürdürme',
      out_of_possession_shape: '4-1-4-1 Kompakt Blok - Hatlar arası 30m',
      pressing_triggers: JSON.stringify([
        'Rakip stoper kötü ilk dokunuş yaptığında',
        'Rakip pivot geriye pas aldığında',
        'Rakip kanat beklere pas gittiğinde',
        'Yan hatlarda top sıkışık olduğunda'
      ]),
      defensive_priorities: JSON.stringify([
        'Merkezi her zaman kapalı tutmak',
        'Pressing koordinasyonu - topun etrafında koza',
        'Top kazanımı rakip yarı sahada',
        'Topu izole edip sayısal üstünlük',
        'Hızlı geçişler'
      ]),
      regain_strategies: 'Gruplar halinde koordineli baskı. Topun etrafında 4-5 oyuncu koza oluşturur. Yan hatlara zorlayıp tuzak kurma. 6 saniyelik kural.',
      rest_defense: 'Her zaman minimum 6 oyuncu savunmada pozisyon alır. Pivot, iki 8 numara ve üçlü savunma. Dengeli yapı bozulmaz.',
      counter_press_intensity: 'Çok Yüksek - Tiki-Taka 6 saniyelik kural'
    },
    pressing_zones: [
      {
        zone_name: 'Kaleci Baskısı - En Yüksek Hat',
        zone_type: 'Yüksek Baskı',
        description: 'Rakip kaleciye kadar çıkan ultra yüksek baskı. Kaleci kısa pas zorlanır.',
        intensity: 'Çok Yüksek',
        trigger_conditions: 'Kaleciye geri pas gittiğinde forvet anında baskı yapar. Kanatlar bekler kapatır.',
        player_responsibilities: 'Forvet kaleciye direkt bas, kanatlar kanat bekleri kapat, orta saha pivot önle, savunma hat yükselt',
        success_metrics: 'Kaleci uzun top zorlanır veya ceza sahası civarında top kazanımı',
        common_mistakes: 'Savunma hattı takip etmezse forvet izole kalır. Takım uzamazsa boşluklar açılır.'
      },
      {
        zone_name: 'Stoper Baskı Tuzağı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Rakip stoperlere pas geldiğinde ani ve koordineli baskı tuzağı',
        intensity: 'Yüksek',
        trigger_conditions: 'Stoper topa sahip olduğunda pivot pas yolunu kapatır, forvet baskı yapar',
        player_responsibilities: 'Forvet stoper baskısı, kanatlar kanat bekleri kapat, orta saha pivot pas yolunu kapat, geri pas zorla',
        success_metrics: 'Stoper hata yapar, uzun top zorlanır veya top kazanılır',
        common_mistakes: 'Orta saha pivot pas yolunu kapatmazsa stoper rahat pivot bulur'
      },
      {
        zone_name: 'Yarı Alan Sayısal Üstünlük Tuzağı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Yarı alanlarda 3-4 oyuncu ile sayısal üstünlük yaratarak tuzak kurma',
        intensity: 'Yüksek',
        trigger_conditions: 'Rakip kanat bek veya orta saha oyuncusu yarı alanda top aldığında',
        player_responsibilities: '3-4 oyuncu yarı alanda hızla çember oluşturur, diğerleri çıkış pas yollarını kapatır',
        success_metrics: 'Yarı alanda top kazanımı, rakip hata, aut',
        common_mistakes: 'Çember gevşekse rakip sıyrılır, diğer taraf boş kalabilir'
      },
      {
        zone_name: 'Kanat Zorlama Baskısı',
        zone_type: 'Kanat Baskısı',
        description: 'Rakibi kanatlara zorlayıp orada kalabalığa alma stratejisi',
        intensity: 'Yüksek',
        trigger_conditions: 'Merkez kapalı tutulur, rakip top kanata gitmek zorunda kalır',
        player_responsibilities: 'Kanat oyuncu bas, bek destek ver, orta saha içe kaydır, merkezi kapat',
        success_metrics: 'Kanatta top kazanımı, aut, geri pas zorla',
        common_mistakes: 'Orta saha içe kaymazsa geri pas yolu açık kalır'
      }
    ]
  },
  {
    // ID 2: Klopp Gegenpressing
    id: 2,
    name: 'Klopp Gegenpressing',
    possession: {
      possession_style: 'Dikey Hızlı Oyun - Heavy Metal Football',
      possession_target_percentage: 55,
      in_possession_shape: '4-3-3 Asimetrik - Tek fullback yüksek',
      passing_principles: JSON.stringify([
        'Dikey paslar her zaman öncelikli',
        'Yüksek tempo - hızlı karar',
        'Risk alma cesareti gösterme',
        'Az dokunuş - maksimum hız',
        'Direkt ilerleme - orta saha atla'
      ]),
      movement_principles: JSON.stringify([
        'Derinliğe sürekli koşular - arkaya git',
        'Savunma arkası koşular',
        'Fullback overlapping - yan destek',
        'Kanat içe kesme - yarı alana',
        'Forvet mobil hareketler - düş gel'
      ]),
      build_up_strategy: 'Kaleciden hızlı ve direkt. Orta sahayı atla, forvet hattına erken top. Van Dijk uzun pas, fullback koşu, hızlı ilerleme.',
      progression_methods: 'Dikey uzun paslar, fullback yan koşuları, derinlik pasları. Minimum pas ile hızlı ilerleme. Heavy metal.',
      key_players_positioning: 'Fullback tek taraf yüksek, kanatlar geniş, 8ler box-to-box motorlar, forvet mobil'
    },
    non_possession: {
      defensive_philosophy: 'Ultra Yoğun Gegenpressing',
      pressing_philosophy: 'Top kaybı anında maksimum yoğunlukta ani baskı - 8 saniyelik kural',
      counter_attack_philosophy: 'Top kazanımı sonrası dikey hızlı kontra - az pas maksimum hız',
      out_of_possession_shape: '4-3-3 Ultra Yüksek Kompakt - Hat yüksek',
      pressing_triggers: JSON.stringify([
        'Top kaybından hemen sonra - anında',
        'Rakip kötü ilk dokunuş',
        'Geriye pas - forvet bas',
        'Kanat bölgelerinde top - sandwich'
      ]),
      defensive_priorities: JSON.stringify([
        'Top kazanımı 8 saniyede mutlaka',
        'Yüksek bölgede kazanma - rakip yarı saha',
        'Rakibi hataya zorla - baskı yap',
        'Yoğun grup baskısı - çember',
        'Hızlı geçişler - kontra'
      ]),
      regain_strategies: 'Topu kaybeden oyuncu etrafında 4-5 oyuncu anında çember oluşturur. Maksimum yoğunluk. Gegenpressing - 8 saniye.',
      rest_defense: 'Yüksek hat korunur, kompakt yapı. Savunma ile hücum arası 30-40m mesafe.',
      counter_press_intensity: 'Maksimum - Gegenpressing Ruhu'
    },
    pressing_zones: [
      {
        zone_name: 'Anında Gegenpressing Çemberi',
        zone_type: 'Karşı Baskı',
        description: 'Top kaybı sonrası ilk 8 saniye - maksimum yoğunluk gegenpressing',
        intensity: 'Maksimum',
        trigger_conditions: 'Top kaybı anında tüm yakın oyuncular maksimum hızla baskı',
        player_responsibilities: 'Top kaybı civarındaki 4-5 oyuncu anında çember, diğerleri pas yolları kapat, geri pas yok',
        success_metrics: '8 saniyede top geri kazanma veya rakip baskı altında hata yapma',
        common_mistakes: 'Herkes basarsa arka boşluklar tehlikeli açılır, offsayta düşülebilir'
      },
      {
        zone_name: 'Yüksek Hat Agresif Baskı',
        zone_type: 'Yüksek Baskı',
        description: 'Rakip stoperlere ultra agresif yüksek hat baskısı',
        intensity: 'Çok Yüksek',
        trigger_conditions: 'Rakip stoper topa sahip, forvet hattı anında agresif bas',
        player_responsibilities: 'Forvet üçlüsü stoperlere ve pivota bas, orta saha kanat bekler kapat, savunma hat yükselt',
        success_metrics: 'Yüksek bölgede top kazanımı, rakip uzun top zorlanır',
        common_mistakes: 'Savunma hattı takip etmezse uzun toplarla arkası boşalır'
      },
      {
        zone_name: 'Kanat Sandwich Tuzağı',
        zone_type: 'Kanat Baskısı',
        description: 'Rakibi kanatlara zorla ve orada fullback-kanat sandwich yap',
        intensity: 'Çok Yüksek',
        trigger_conditions: 'Top kanatta, fullback ve kanat oyuncu birlikte sandwich',
        player_responsibilities: 'Kanat ve fullback sandwich, 8 numara yan destek, diğerleri içe kay',
        success_metrics: 'Kanatta top kazanımı, aut',
        common_mistakes: 'Sandwich zamanlaması kötüyse rakip sıyrılıp geçer'
      },
      {
        zone_name: 'Orta Saha İkileme Baskısı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Rakip orta sahaya çift adam sayısal üstünlük',
        intensity: 'Yüksek',
        trigger_conditions: 'Rakip orta saha oyuncusu top aldığında',
        player_responsibilities: 'İki 8 numara agresif bas, Fabinho destek, sayısal üstünlük',
        success_metrics: 'Orta sahada top kazanımı',
        common_mistakes: '8ler çok ileri giderse Fabinho izole kalır'
      }
    ]
  },
  {
    // ID 3: Conte Wing-Back System
    id: 3,
    name: 'Conte Wing-Back System',
    possession: {
      possession_style: 'Wing-back Dominant Fiziksel',
      possession_target_percentage: 52,
      in_possession_shape: '3-4-3 Wing-back Ultra Yüksek',
      passing_principles: JSON.stringify([
        'Wing-backlere erken ve sık toplar',
        'Direkt ve vertikal oyun',
        'Az riskli güvenli paslar',
        'Kanat oyunu ağırlıklı',
        'Forvet hedef adam olarak kullanım'
      ]),
      movement_principles: JSON.stringify([
        'Wing-backler sürekli koşu - yorulmaz',
        'Forvet hedef adamı rol',
        'Kanatlar içe kesme',
        'Orta saha dengeli kalma',
        'Savunma geniş destek'
      ]),
      build_up_strategy: 'Üçlü savunmadan güvenli başlangıç. Wing-backlere erken top. Forvet hedef adam, tutup çevir. Fiziksel dominasyon.',
      progression_methods: 'Wing-back koşuları ana silah, kanat geçişleri, forvet hedef adam, direkt oyun. Moses-Alonso dominant.',
      key_players_positioning: 'Üçlü stoper geniş, wing-backler çok yüksek non-stop, ikili pivot, kanatlar mobil, tek forvet hedef'
    },
    non_possession: {
      defensive_philosophy: 'Ultra Kompakt 5-4-1 Blok',
      pressing_philosophy: 'Orta blok seçici pressing - enerji tasarrufu',
      counter_attack_philosophy: 'Wing-back hızlı geçiş kontrası',
      out_of_possession_shape: '5-4-1 Ultra Kompakt - Hatlar arası 20m',
      pressing_triggers: JSON.stringify([
        'Rakip kanatta zayıf ayak',
        'Wing-backlere pas',
        'Zayıf ayak kullanımı',
        'Geriye yanlış pas'
      ]),
      defensive_priorities: JSON.stringify([
        'Kompaktlık her şeyden önce',
        'Wing-backler hızlı geri dönüş',
        'Merkez her zaman kapalı',
        'Organize blok bozma',
        'Sayısal üstünlük merkez'
      ]),
      regain_strategies: '5-4-1 ultra kompakt blok. Rakibi kanatlara zorla. Wing-backler hızlı geri döner. Merkez kapalı. Sabırlı savunma.',
      rest_defense: 'Her zaman 5-4-1 şekil korunur. Dengeli ve güvenli yapı.',
      counter_press_intensity: 'Orta - Seçici ve enerji tasarruflu'
    },
    pressing_zones: [
      {
        zone_name: 'Orta Blok Kompakt Yapı',
        zone_type: 'Orta Saha Blok',
        description: '5-4-1 kompakt blok ile merkezi kapatma',
        intensity: 'Orta',
        trigger_conditions: 'Rakip kendi yarısında buildup yaparken',
        player_responsibilities: '5-4-1 kompakt kal, merkezi kapat, rakibi kanatlara zorla',
        success_metrics: 'Rakip merkez geçemiyor, kanatlara zorlanıyor',
        common_mistakes: 'Çok derin durulursa rakip rahat buildup yapar'
      },
      {
        zone_name: 'Wing-back Geri Dönüş Disiplini',
        zone_type: 'Geçiş Savunması',
        description: 'Wing-backlerin hızlı ve disiplinli geri dönüşü',
        intensity: 'Yüksek',
        trigger_conditions: 'Top kaybı anında wing-backler sprint geri döner',
        player_responsibilities: 'Wing-backler anında 5li savunmaya dönüş, diğerleri zaman kazan',
        success_metrics: 'Wing-backler zamanında dönüp 5-4-1 oluşturur',
        common_mistakes: 'Wing-back geç dönerse kanat boşlukları tehlikeli'
      }
    ]
  },
  {
    // ID 4: Ancelotti Balanced
    id: 4,
    name: 'Ancelotti Balanced',
    possession: {
      possession_style: 'Dengeli Pragmatik',
      possession_target_percentage: 55,
      in_possession_shape: '4-3-3 Simetrik Dengeli',
      passing_principles: JSON.stringify([
        'Dengeli tempo - ne çok hızlı ne yavaş',
        'Güvenli ve akıllı paslar',
        'Risk-ödül dengesi',
        'Orta ve uzun pas karışımı',
        'Sabırlı ama amaçlı'
      ]),
      movement_principles: JSON.stringify([
        'Dengeli hareketler',
        'Kanatlar geniş kalma',
        'Orta saha box-to-box',
        'Fullbackler seçici overlap',
        'Forvet mobil ama disiplinli'
      ]),
      build_up_strategy: 'Dengeli ve esnek buildup. Kısa ve uzun pas seçenekleri. Pragmatik yaklaşım. Yıldızlara özgürlük.',
      progression_methods: 'Karışık yöntemler. Kısa kombinasyonlar veya uzun toplar. Modric-Kroos kontrol. Yıldız oyuncular serbest.',
      key_players_positioning: 'Simetrik 4-3-3. Modric-Kroos-Casemiro üçlüsü. Kanatlar geniş. Benzema false 9 özgür.'
    },
    non_possession: {
      defensive_philosophy: 'Dengeli Orta Blok',
      pressing_philosophy: 'Seçici ve akıllı pressing - enerji yönetimi',
      counter_attack_philosophy: 'Hızlı yıldız bazlı kontralar',
      out_of_possession_shape: '4-3-3 Orta Blok Dengeli',
      pressing_triggers: JSON.stringify([
        'Rakip zayıf ayak',
        'Pivot geriye pas',
        'Kanat bölgelerinde',
        'Yanlış pas'
      ]),
      defensive_priorities: JSON.stringify([
        'Denge ve organizasyon',
        'Enerji yönetimi',
        'Akıllı pozisyon alma',
        'Yıldızları koruma',
        'Kompakt yapı'
      ]),
      regain_strategies: 'Orta blok kompakt. Seçici pressing. Enerji tasarrufu. Akıllı savunma. Yıldızlar az koşsun.',
      rest_defense: 'Dengeli 4-3-3. Her pozisyon kaplı.',
      counter_press_intensity: 'Orta - Seçici ve akıllı'
    },
    pressing_zones: [
      {
        zone_name: 'Orta Blok Seçici Baskı',
        zone_type: 'Orta Saha Blok',
        description: 'Orta bloktan seçici pressing',
        intensity: 'Orta',
        trigger_conditions: 'Rakip zayıf ayak veya hata',
        player_responsibilities: 'Kompakt kal, seçici bas',
        success_metrics: 'Enerji tasarrufu ile etkili savunma',
        common_mistakes: 'Çok pasif kalma'
      }
    ]
  },
  {
    // ID 5: Mourinho Defensive
    id: 5,
    name: 'Mourinho Defensive',
    possession: {
      possession_style: 'Pragmatik Minimal Risk',
      possession_target_percentage: 45,
      in_possession_shape: '4-2-3-1 Kontrollü',
      passing_principles: JSON.stringify([
        'Minimal risk - güvenli oyun',
        'Geriye pas kabul edilir',
        'Uzun top stratejik kullanım',
        'Forvet hedef adamı merkez',
        'Yan paslar dominant'
      ]),
      movement_principles: JSON.stringify([
        'Az hareket - enerji tasarrufu',
        'Forvet hedef adamı sabitleme',
        'Kanatlar kontra için hazır',
        'Orta saha dengeli kalma',
        'Fullbackler temkinli'
      ]),
      build_up_strategy: 'Güvenli ve yavaş buildup. Hedef adama uzun top seçeneği her zaman hazır. Minimal risk. Sabır.',
      progression_methods: 'Güvenli paslar veya uzun top hedef adama. Kontra için sabır. Enerji tasarrufu.',
      key_players_positioning: 'İkili pivot çok derin, 10 numara hedef adam bağlantı, kanatlar kontraya hazır'
    },
    non_possession: {
      defensive_philosophy: 'Ultra Derin Kompakt Blok',
      pressing_philosophy: 'Minimal pressing - alçak blok',
      counter_attack_philosophy: 'Hızlı kontra atak - ana silah',
      out_of_possession_shape: '4-5-1 Ultra Derin Blok',
      pressing_triggers: JSON.stringify([
        'Rakip çok ileri geldiğinde',
        'Kontra fırsatında',
        'Kanat köşelerinde',
        'Aut öncesi'
      ]),
      defensive_priorities: JSON.stringify([
        'Gol yememek öncelik',
        'Ultra kompakt blok',
        'Merkez her zaman kapalı',
        'Sabırlı savunma',
        'Kontra fırsatı kollama'
      ]),
      regain_strategies: 'Ultra derin 4-5-1 blok. Rakibe sahayı ver. Gol yememe öncelik. Kontra için sabır. Parking bus.',
      rest_defense: 'Her zaman ultra derin blok. Park the bus.',
      counter_press_intensity: 'Çok Düşük - Minimal'
    },
    pressing_zones: [
      {
        zone_name: 'Derin Blok Parking',
        zone_type: 'Alçak Blok',
        description: 'Ultra derin park the bus',
        intensity: 'Düşük',
        trigger_conditions: 'Rakip her yerde rahat',
        player_responsibilities: 'Derin blok koru, merkez kapat',
        success_metrics: 'Gol yememe',
        common_mistakes: 'Çok derin kalma baskı artırır'
      }
    ]
  },
  {
    // ID 6: Mourinho Bus
    id: 6,
    name: 'Mourinho Bus',
    possession: {
      possession_style: 'Minimal Pragmatik',
      possession_target_percentage: 40,
      in_possession_shape: '5-3-2 Güvenli',
      passing_principles: JSON.stringify([
        'Ultra güvenli paslar',
        'Geriye ve yan paslar ana',
        'Uzun top hedef adama',
        'Minimal risk maksimum güvenlik',
        'Yavaş tempo'
      ]),
      movement_principles: JSON.stringify([
        'Minimal hareket',
        'İki forvet sabit',
        'Orta saha dengeli',
        'Wing-backler temkinli',
        'Enerji tasarrufu maksimum'
      ]),
      build_up_strategy: 'Ultra güvenli buildup. Beşli savunmadan yavaş. Hedef adamlara uzun top her zaman hazır.',
      progression_methods: 'Güvenli paslar veya direk uzun top. Kontra için sabır. Sabır sabır sabır.',
      key_players_positioning: 'Beşli savunma, üçlü orta saha, ikili forvet hedef adam'
    },
    non_possession: {
      defensive_philosophy: 'Park The Bus Ultra',
      pressing_philosophy: 'Sıfır pressing - sadece blok',
      counter_attack_philosophy: 'Kontra atak tek silah',
      out_of_possession_shape: '5-3-2 Ultra Derin',
      pressing_triggers: JSON.stringify([
        'Sadece kontra fırsatında',
        'Rakip hata yaptığında',
        'Kanat köşelerinde',
        'Son dakika'
      ]),
      defensive_priorities: JSON.stringify([
        'Gol yememek tek hedef',
        'Park the bus',
        'Ultra kompakt',
        'Sabır sabır sabır',
        'Kontra bekle'
      ]),
      regain_strategies: 'Park the bus. Ultra derin. Rakibe her şeyi ver ama gol yeme. Kontra için sabır.',
      rest_defense: 'Her zaman park the bus.',
      counter_press_intensity: 'Sıfır - Yok'
    },
    pressing_zones: [
      {
        zone_name: 'Park The Bus',
        zone_type: 'Alçak Blok',
        description: 'Tam park the bus',
        intensity: 'Minimal',
        trigger_conditions: 'Hep derin blok',
        player_responsibilities: 'Derin kal, merkez kapat',
        success_metrics: 'Gol yememe',
        common_mistakes: 'Çok derin sürekli baskı'
      }
    ]
  },
  {
    // ID 7: Tuchel Compact
    id: 7,
    name: 'Tuchel Compact',
    possession: {
      possession_style: 'Kontrollü Sabırlı',
      possession_target_percentage: 58,
      in_possession_shape: '3-4-2-1 Wing-back Geniş',
      passing_principles: JSON.stringify([
        'Sabırlı buildup - acele yok',
        'Güvenli pas seçenekleri',
        'Minimal risk alma',
        'Yan ve geri paslar kabul',
        'Ani tempo değişimi hazır'
      ]),
      movement_principles: JSON.stringify([
        'Wing-backler genişlik sağlar',
        'İki 10 numara boşluklarda',
        'Forvet mobil düşüşler',
        'Stoperlerin topla ilerlemesi',
        'Simetrik dengeli yapı'
      ]),
      build_up_strategy: 'Üçlü savunmadan sabırlı buildup. Wing-backler genişlik, iki 10 numara ara bölgede yaratıcılık. Azpilicueta-Luiz-Cahill güvenli.',
      progression_methods: 'Sabırlı paslaşma, wing-back koşuları, ani tempo değişimi, 10 numaralardan ara paslar.',
      key_players_positioning: 'Üçlü stoper geniş, wing-backler yan hatlarda, iki 10 ara bölge, tek forvet mobil'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt Orta Blok Organizasyonu',
      pressing_philosophy: 'Seçici pressing - baskı tuzakları',
      counter_attack_philosophy: 'Kontrollü geçiş - wing-backler kritik',
      out_of_possession_shape: '5-4-1 Ultra Kompakt',
      pressing_triggers: JSON.stringify([
        'Rakip kanatlarda',
        'Rakip pivot geriye pas',
        'Wing-backlere pas',
        'Zayıf ayak kullanımı'
      ]),
      defensive_priorities: JSON.stringify([
        'Kompaktlık koruma öncelik',
        'Merkezi kapatmak',
        'Rakibi kanatlara zorla',
        'Sayısal üstünlük yarat',
        'Organize blok disiplin'
      ]),
      regain_strategies: 'Rakibi kanatlara zorla, orada kalabalık oluştur, pas yollarını kes. Pressing tuzakları kur.',
      rest_defense: '5-4-1 kompakt blok. Hatlar arası minimum mesafe. Chelsea CL win formula.',
      counter_press_intensity: 'Orta - Seçici ve organize'
    },
    pressing_zones: [
      {
        zone_name: 'Orta Blok Kompakt Organizasyon',
        zone_type: 'Orta Saha Blok',
        description: 'Merkezi kapalı kompakt blok, rakibi kanatlara zorla',
        intensity: 'Orta',
        trigger_conditions: 'Rakip orta sahanın kendi yarısında',
        player_responsibilities: '5-4-1 kompakt, merkezi kapat, kanata zorla',
        success_metrics: 'Rakip merkez geçemiyor, kanatlara zorlanıyor',
        common_mistakes: 'Çok derin durulursa rakip rahat buildup'
      },
      {
        zone_name: 'Kanat Pressing Tuzağı',
        zone_type: 'Kanat Baskısı',
        description: 'Rakip kanatlara geldiğinde ani kalabalık tuzağı',
        intensity: 'Yüksek',
        trigger_conditions: 'Top kanatta, wing-back ve kanat baskı',
        player_responsibilities: 'Wing-back bas, kanat yardım, stoper destek, merkez kapalı kal',
        success_metrics: 'Kanatta top kazanımı veya geri pas zorla',
        common_mistakes: 'Diğer taraf wing-back çok ileriyse karşı kanat boş'
      }
    ]
  },
  {
    // ID 8: Ancelotti Diamond
    id: 8,
    name: 'Ancelotti Diamond',
    possession: {
      possession_style: 'Merkez Dominant Elmas',
      possession_target_percentage: 58,
      in_possession_shape: '4-3-1-2 Elmas Merkez',
      passing_principles: JSON.stringify([
        'Merkez üzerinden oyun',
        'Elmas şekil sürekli',
        'Üçgen paslar',
        'Fullbackler genişlik',
        'İki forvet kombinasyon'
      ]),
      movement_principles: JSON.stringify([
        '10 numara serbest hareket',
        'İki forvet kombinasyon',
        'Fullbackler overlap',
        'Elmas rotasyon',
        'Merkez dominant'
      ]),
      build_up_strategy: 'Elmas merkez kontrolü. Pirlo gibi regista oyun kurar. İki forvet kombinasyon. Fullbackler genişlik.',
      progression_methods: 'Merkez elmas üzerinden. Fullback overlap. İki forvet kombinasyon. Yaratıcılık merkez.',
      key_players_positioning: 'Elmas orta saha, 10 numara serbest, iki forvet kombinasyon, fullbackler geniş'
    },
    non_possession: {
      defensive_philosophy: 'Kompakt Elmas Blok',
      pressing_philosophy: 'Orta blok seçici',
      counter_attack_philosophy: 'Hızlı ikili forvet',
      out_of_possession_shape: '4-4-2 Kompakt',
      pressing_triggers: JSON.stringify([
        'Merkez bölgede',
        'Pivot geriye pas',
        'Zayıf ayak',
        'Yanlış pas'
      ]),
      defensive_priorities: JSON.stringify([
        'Merkez kapalı',
        'Elmas kompakt',
        'Dengeli savunma',
        'Akıllı pozisyon',
        'Enerji tasarrufu'
      ]),
      regain_strategies: '4-4-2 kompakt. Merkez kapalı. Elmas şekil korunur. Akıllı savunma.',
      rest_defense: 'Elmas 4-4-2ye dönüşür. Kompakt.',
      counter_press_intensity: 'Orta - Seçici'
    },
    pressing_zones: [
      {
        zone_name: 'Merkez Elmas Baskısı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Elmas şekil ile merkez baskısı',
        intensity: 'Orta',
        trigger_conditions: 'Rakip merkez geçmeye çalışır',
        player_responsibilities: 'Elmas kompakt, merkez kapat',
        success_metrics: 'Merkez geçiş engellenir',
        common_mistakes: 'Kanatlar boş kalabilir'
      }
    ]
  },
  {
    // ID 9: Arteta Inverted FB
    id: 9,
    name: 'Arteta Inverted FB',
    possession: {
      possession_style: 'Pozisyonel İnverted FB Dominasyonu',
      possession_target_percentage: 65,
      in_possession_shape: '3-2-5 Inverted FB Yapısı - Zinchenko içe',
      passing_principles: JSON.stringify([
        'Üçgen ve elmas oluşturma',
        'Inverted bek pivot oluşturur',
        'Yarı alanlarda aşırı yükleme',
        'Kısa-orta kombinasyonlar',
        'Ani tempo değişimleri'
      ]),
      movement_principles: JSON.stringify([
        'Inverted bek merkeze kayar',
        'Kanat bekler yüksek ve geniş',
        'İçe kesen kanatlar',
        'Üçüncü adam koşuları',
        'Rotasyonel hareketler'
      ]),
      build_up_strategy: 'Zinchenko içe kayarak 3-2 buildup oluşturur. Sayısal üstünlük ile ilerleme. White geniş kalır.',
      progression_methods: 'Üçüncü adam pasları, yarı alanlarda overload, sudden vertical pas, kanat overlap. Odegaard sihir.',
      key_players_positioning: 'Zinchenko merkeze, White yüksek, Saka-Martinelli yarı alan, Odegaard free 10, Jesus false 9'
    },
    non_possession: {
      defensive_philosophy: 'Organize Yüksek Hat Pressing',
      pressing_philosophy: 'Kontrollü yüksek hat, seçici tetikleyiciler',
      counter_attack_philosophy: 'Hızlı wing-back geçişleri',
      out_of_possession_shape: '4-3-3 Kompakt Yüksek',
      pressing_triggers: JSON.stringify([
        'Rakip stoper zayıf dokunuş',
        'Geriye pas anında',
        'Kanat beklere pas',
        'Pivot alırken baskı'
      ]),
      defensive_priorities: JSON.stringify([
        'Yüksek hat koruma',
        'Kompaktlık',
        'Merkez kapalı',
        'Tetikleyicilerde agresif',
        'Hızlı geçişler'
      ]),
      regain_strategies: 'Yüksek hat koruma, tetikleyicilerde ani baskı, merkezi kapalı tutma. Zinchenko dönüp 4-3-3.',
      rest_defense: 'Zinchenko dönüp 4-3-3 oluşturur. Dengeli ve kompakt. Arsenal 2024 formula.',
      counter_press_intensity: 'Yüksek - Ani tetikleyiciler'
    },
    pressing_zones: [
      {
        zone_name: 'Yüksek Hat Tetikleyici Baskı',
        zone_type: 'Yüksek Baskı',
        description: 'Rakip stoperlere tetikleyicili baskı',
        intensity: 'Yüksek',
        trigger_conditions: 'Stoper kötü dokunuş veya geriye pas',
        player_responsibilities: 'Forvet hat agresif bas, orta saha pivot kapat',
        success_metrics: 'Yüksek bölgede top kazanımı',
        common_mistakes: 'Savunma hattı takip etmezse boşluklar'
      },
      {
        zone_name: 'Merkez Kapatma Kompakt',
        zone_type: 'Orta Saha Blok',
        description: 'Merkezi kompakt tutarak rakibi kanatlara zorla',
        intensity: 'Orta-Yüksek',
        trigger_conditions: 'Rakip merkez geçmeye çalışıyor',
        player_responsibilities: 'Merkez yoğun, kanatlar içe, rakibi kanata zorla',
        success_metrics: 'Rakip merkez geçemiyor',
        common_mistakes: 'Kanatlar çok içte kalırsa wing-backler izole'
      },
      {
        zone_name: 'Yarı Alan Overload Tuzağı',
        zone_type: 'Orta Saha Baskısı',
        description: 'Yarı alanlarda sayısal üstünlük tuzağı',
        intensity: 'Yüksek',
        trigger_conditions: 'Rakip yarı alana geldiğinde',
        player_responsibilities: 'Yarı alanda 3-4 oyuncu çember, diğerleri pas yolu kapat',
        success_metrics: 'Yarı alanda top kazanımı',
        common_mistakes: 'Diğer yarı alan boş kalabilir'
      }
    ]
  },
  {
    // ID 10: Ten Hag Possession
    id: 10,
    name: 'Ten Hag Possession',
    possession: {
      possession_style: 'Pozisyonel Ajax Okulu',
      possession_target_percentage: 65,
      in_possession_shape: '4-3-3 Asimetrik Bek',
      passing_principles: JSON.stringify([
        'Pozisyonel oyun disiplini',
        'Üçgen oluşturma sürekli',
        'Kısa pas kombinasyonları',
        'Rotasyonel hareketler',
        'Hasta tipi oyun kurma'
      ]),
      movement_principles: JSON.stringify([
        'Sürekli pozisyon değişimi',
        'Bir bek içe kayar',
        'Kanatlar yarı alana',
        'False 9 hareketi',
        'De Jong tipi pivot'
      ]),
      build_up_strategy: 'Bir bek içe kayar, 3-2 buildup. De Jong tipi pivot oyun kurar. Ajax okulu pozisyonel.',
      progression_methods: 'Pozisyonel rotasyonlar, üçgen paslar, yarı alan overload, ani tempo değişimi.',
      key_players_positioning: 'Bir bek içe, pivot oyun kurucu, 8ler yarı alan, kanatlar içe, false 9'
    },
    non_possession: {
      defensive_philosophy: 'Yüksek Hat Pozisyonel Pressing',
      pressing_philosophy: 'Ajax okulu yüksek pressing',
      counter_attack_philosophy: 'Hızlı pozisyonel geçiş',
      out_of_possession_shape: '4-3-3 Yüksek Kompakt',
      pressing_triggers: JSON.stringify([
        'Stoper zayıf dokunuş',
        'Geriye pas',
        'Pivot alırken',
        'Kanat beklere'
      ]),
      defensive_priorities: JSON.stringify([
        'Yüksek hat',
        'Pozisyonel disiplin',
        'Merkez kapalı',
        'Koordineli baskı',
        'Top kazanımı yüksek'
      ]),
      regain_strategies: 'Yüksek hat pozisyonel pressing. Ajax okulu. Koordineli baskı.',
      rest_defense: '4-3-3 kompakt. Dengeli.',
      counter_press_intensity: 'Yüksek - Ajax okulu'
    },
    pressing_zones: [
      {
        zone_name: 'Ajax Yüksek Pressing',
        zone_type: 'Yüksek Baskı',
        description: 'Ajax okulu yüksek hat pressing',
        intensity: 'Yüksek',
        trigger_conditions: 'Stoper top aldığında',
        player_responsibilities: 'Forvet bas, orta saha kapat, savunma yükselt',
        success_metrics: 'Yüksek bölgede top kazanımı',
        common_mistakes: 'Hat takip etmezse boşluk'
      },
      {
        zone_name: 'Pozisyonel Blok',
        zone_type: 'Orta Saha Blok',
        description: 'Pozisyonel disiplinli blok',
        intensity: 'Orta-Yüksek',
        trigger_conditions: 'Rakip buildup',
        player_responsibilities: 'Pozisyonel disiplin, merkez kapat',
        success_metrics: 'Rakip zorlanır',
        common_mistakes: 'Disiplin bozulursa boşluk'
      }
    ]
  }
];

// İşleme fonksiyonu
async function processSystem(system) {
  return new Promise((resolve) => {
    // Önce possession kontrol et
    db.get('SELECT id FROM possession_tactics WHERE system_id = ?', [system.id], (err, row) => {
      if (row) {
        // Update
        db.run(`UPDATE possession_tactics SET
          possession_style = ?, possession_target_percentage = ?, in_possession_shape = ?,
          passing_principles = ?, movement_principles = ?, build_up_strategy = ?,
          progression_methods = ?, key_players_positioning = ?
          WHERE system_id = ?`,
          [
            system.possession.possession_style,
            system.possession.possession_target_percentage,
            system.possession.in_possession_shape,
            system.possession.passing_principles,
            system.possession.movement_principles,
            system.possession.build_up_strategy,
            system.possession.progression_methods,
            system.possession.key_players_positioning,
            system.id
          ],
          function(err) {
            if (err) console.error(`❌ ${system.name} possession update:`, err.message);
            else console.log(`✅ ${system.name} - Possession güncellendi`);

            // Non-possession işle
            processNonPossession(system, resolve);
          }
        );
      } else {
        // Insert
        db.run(`INSERT INTO possession_tactics (
          system_id, possession_style, possession_target_percentage, in_possession_shape,
          passing_principles, movement_principles, build_up_strategy,
          progression_methods, key_players_positioning
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            system.id,
            system.possession.possession_style,
            system.possession.possession_target_percentage,
            system.possession.in_possession_shape,
            system.possession.passing_principles,
            system.possession.movement_principles,
            system.possession.build_up_strategy,
            system.possession.progression_methods,
            system.possession.key_players_positioning
          ],
          function(err) {
            if (err) console.error(`❌ ${system.name} possession insert:`, err.message);
            else console.log(`✅ ${system.name} - Possession eklendi`);

            // Non-possession işle
            processNonPossession(system, resolve);
          }
        );
      }
    });
  });
}

function processNonPossession(system, resolve) {
  db.get('SELECT id FROM non_possession_tactics WHERE system_id = ?', [system.id], (err, row) => {
    if (row) {
      // Update
      db.run(`UPDATE non_possession_tactics SET
        defensive_philosophy = ?, pressing_philosophy = ?, counter_attack_philosophy = ?,
        out_of_possession_shape = ?, pressing_triggers = ?, defensive_priorities = ?,
        regain_strategies = ?, rest_defense = ?, counter_press_intensity = ?
        WHERE system_id = ?`,
        [
          system.non_possession.defensive_philosophy,
          system.non_possession.pressing_philosophy,
          system.non_possession.counter_attack_philosophy,
          system.non_possession.out_of_possession_shape,
          system.non_possession.pressing_triggers,
          system.non_possession.defensive_priorities,
          system.non_possession.regain_strategies,
          system.non_possession.rest_defense,
          system.non_possession.counter_press_intensity,
          system.id
        ],
        function(err) {
          if (err) console.error(`❌ ${system.name} non-possession update:`, err.message);
          else console.log(`✅ ${system.name} - Non-possession güncellendi`);

          // Pressing zones işle
          processPressingZones(system, resolve);
        }
      );
    } else {
      // Insert
      db.run(`INSERT INTO non_possession_tactics (
        system_id, defensive_philosophy, pressing_philosophy, counter_attack_philosophy,
        out_of_possession_shape, pressing_triggers, defensive_priorities,
        regain_strategies, rest_defense, counter_press_intensity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          system.id,
          system.non_possession.defensive_philosophy,
          system.non_possession.pressing_philosophy,
          system.non_possession.counter_attack_philosophy,
          system.non_possession.out_of_possession_shape,
          system.non_possession.pressing_triggers,
          system.non_possession.defensive_priorities,
          system.non_possession.regain_strategies,
          system.non_possession.rest_defense,
          system.non_possession.counter_press_intensity
        ],
        function(err) {
          if (err) console.error(`❌ ${system.name} non-possession insert:`, err.message);
          else console.log(`✅ ${system.name} - Non-possession eklendi`);

          // Pressing zones işle
          processPressingZones(system, resolve);
        }
      );
    }
  });
}

async function processPressingZones(system, finalResolve) {
  if (!system.pressing_zones || system.pressing_zones.length === 0) {
    finalResolve();
    return;
  }

  let zoneCount = 0;
  for (const zone of system.pressing_zones) {
    await new Promise((resolve) => {
      db.run(`INSERT INTO pressing_trap_zones (
        system_id, zone_name, zone_type, description, intensity,
        trigger_conditions, player_responsibilities, success_metrics, common_mistakes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          system.id,
          zone.zone_name,
          zone.zone_type,
          zone.description,
          zone.intensity,
          zone.trigger_conditions,
          zone.player_responsibilities,
          zone.success_metrics,
          zone.common_mistakes
        ],
        function(err) {
          if (err) console.error(`❌ ${system.name} pressing zone:`, err.message);
          else {
            zoneCount++;
            console.log(`✅ ${system.name} - Pressing zone ${zoneCount} eklendi`);
          }
          resolve();
        }
      );
    });
  }

  finalResolve();
}

// Ana işlem
async function main() {
  for (const system of systems) {
    await processSystem(system);
  }

  console.log('\n✅ Batch 1-10 tamamlandı!\n');
  db.close();
}

main();
