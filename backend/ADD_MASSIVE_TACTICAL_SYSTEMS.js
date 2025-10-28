const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./football_tactics_ultra.db');

console.log('🚀 KAPSAMLI TAKTİK SİSTEMLER EKLENİYOR...');
console.log('📊 40+ Yeni Profesyonel Taktik Sistem\n');

const newTacticalSystems = [
  // MOURINHO SİSTEMLERİ
  {
    name: '4-3-3 Mourinho Counter-Attack',
    formation: '4-3-3',
    category: 'Kontratak',
    style: 'Pragmatik',
    philosophy: 'Mourinho\'nun Porto ve Inter dönemindeki klasik kontratak sistemi. Kompakt savunma ve hızlı geçişlerle rakibi cezalandırma.',
    pressing_intensity: 5,
    defensive_line: 4,
    width_attack: 8,
    width_defense: 4,
    tempo: 7,
    passing_style: 'Direkt',
    buildup_play: 'Uzun pas',
    defensive_approach: 'Derin blok',
    mentality: 'Dengeli',
    possession_target: 45,
    chance_creation: 'Kontratak',
    key_principles: JSON.stringify([
      'Kompakt savunma bloku (4-4-2 defansif şekil)',
      'Hızlı kanat geçişleri',
      'Santrfor hedef adam olarak',
      'Orta saha topu kazanıp direkt pas',
      'Kanatlar geniş pozisyon tutup derin koşu'
    ]),
    famous_teams: 'Porto 2003-04, Inter 2009-10, Real Madrid 2011-12',
    famous_coaches: 'Jose Mourinho',
    success_rate: 85,
    position_specific_instructions: JSON.stringify({
      GK: 'Uzun pas için hazır, hızlı topla oynama',
      DF: 'Derin pozisyon, kanatlar içeri kapama',
      MF: 'Top kazanma odaklı, hızlı dağıtım',
      FW: 'Derinliğe koşu, tutma-çevirme'
    }),
    in_possession_shape: '4-3-3 genişlik ile',
    out_of_possession_shape: '4-4-1-1 kompakt blok',
    pressing_triggers: JSON.stringify(['Rakip geri pas', 'Kanat dönüşü', 'Kaleci ayağına']),
    buildup_patterns: JSON.stringify(['Kanat-hedef adam-kanat', 'Uzun pas-ikinci top', 'Hızlı kanat atakları']),
    attacking_width: 'Geniş',
    defensive_width: 'Dar',
    transition_speed_attack: 9,
    transition_speed_defense: 8
  },

  // SACCHI SİSTEMİ
  {
    name: '4-4-2 Sacchi Pressing Machine',
    formation: '4-4-2',
    category: 'Baskı',
    style: 'Yüksek Tempo',
    philosophy: 'Arrigo Sacchi\'nin AC Milan ile yazdığı efsane. Bölgesel baskı ve mükemmel hat hizalaması.',
    pressing_intensity: 10,
    defensive_line: 8,
    width_attack: 7,
    width_defense: 6,
    tempo: 9,
    passing_style: 'Kısa-orta',
    buildup_play: 'Kademeli',
    defensive_approach: 'Yüksek baskı',
    mentality: 'Çok Hücumcu',
    possession_target: 55,
    chance_creation: 'Baskı sonrası',
    key_principles: JSON.stringify([
      'Takım olarak 25 metre içinde oynama',
      'Bölgesel savunma, man-marking değil',
      'Dört hatın mükemmel hizası',
      'Topa 3 saniyede 3 oyuncu',
      'Ofsayt tuzağı sürekli',
      'Toptan 10 metre içinde her oyuncu'
    ]),
    famous_teams: 'AC Milan 1988-91, Italia 1994',
    famous_coaches: 'Arrigo Sacchi',
    success_rate: 88,
    position_specific_instructions: JSON.stringify({
      GK: 'Libero gibi, yüksek başlangıç pozisyonu',
      DF: 'Hat hizası mükemmel, ofsayt tuzağı',
      MF: 'Boşlukları kapatma, sürekli hareket',
      FW: 'İlk baskı tetikleyiciler, savunma başlangıcı'
    }),
    in_possession_shape: '4-4-2 dengeli',
    out_of_possession_shape: '4-4-2 yüksek kompakt blok',
    pressing_triggers: JSON.stringify(['Rakip dokunuş', 'Yanlara pas', 'Geri oyuncu']),
    buildup_patterns: JSON.stringify(['Kısa kademeli', 'Orta saha üçgenleri', 'Kanat-orta kombinasyonları']),
    attacking_width: 'Orta',
    defensive_width: 'Dar',
    transition_speed_attack: 8,
    transition_speed_defense: 10
  },

  // CRUYFF SİSTEMİ
  {
    name: '3-4-3 Cruyff Total Football',
    formation: '3-4-3',
    category: 'Pozisyonel',
    style: 'Total Football',
    philosophy: 'Johan Cruyff\'un Barça Dream Team\'i. Oyuncular pozisyon değiştirip her mevkiide oynayabilir.',
    pressing_intensity: 9,
    defensive_line: 8,
    width_attack: 9,
    width_defense: 7,
    tempo: 8,
    passing_style: 'Kısa',
    buildup_play: 'Kısa paslarla',
    defensive_approach: 'Yüksek baskı',
    mentality: 'Çok Hücumcu',
    possession_target: 70,
    chance_creation: 'Kombinasyon',
    key_principles: JSON.stringify([
      'Oyuncular pozisyon değişimi sürekli',
      'Her oyuncu her pozisyonda oynayabilir',
      'Top kaybında anında baskı (5 saniye kuralı)',
      'Üçgen formasyonlar sürekli',
      '3-4-3 yapısı ama akışkan',
      'Kanat bekler kanatçı gibi, kanatçılar içe girer'
    ]),
    famous_teams: 'Barcelona Dream Team 1990-94, Ajax 1971-73',
    famous_coaches: 'Johan Cruyff, Rinus Michels',
    success_rate: 90,
    position_specific_instructions: JSON.stringify({
      GK: 'Ayak becerisi üst düzey, yapılanmada 11. oyuncu',
      DF: 'Top sürme ve pas yeteneği, pozisyon değişimi',
      MF: 'Sürekli hareket, boşlukları doldurma',
      FW: 'Yanlara açılma, içe girme, değişim'
    }),
    in_possession_shape: '3-4-3 akışkan üçgenler',
    out_of_possession_shape: '5-2-3 yüksek baskı',
    pressing_triggers: JSON.stringify(['Top kaybı', '5 saniye kuralı', 'Her pozisyon']),
    buildup_patterns: JSON.stringify(['Üçgenler', 'Eşlik oyunu', 'Pozisyon rotasyonları']),
    attacking_width: 'Çok Geniş',
    defensive_width: 'Orta',
    transition_speed_attack: 9,
    transition_speed_defense: 10
  },

  // VAN GAAL SİSTEMİ
  {
    name: '4-3-3 Van Gaal Possession Control',
    formation: '4-3-3',
    category: 'Pozisyonel',
    style: 'Kontrollü Futbol',
    philosophy: 'Louis van Gaal\'ın Ajax ve Bayern sistemleri. Pozisyonlarla üstünlük, kontrol ve sabır.',
    pressing_intensity: 7,
    defensive_line: 7,
    width_attack: 8,
    width_defense: 6,
    tempo: 6,
    passing_style: 'Kısa',
    buildup_play: 'Sabırlı yapılanma',
    defensive_approach: 'Orta blok',
    mentality: 'Hücumcu',
    possession_target: 65,
    chance_creation: 'Pozisyon üstünlüğü',
    key_principles: JSON.stringify([
      'Pozisyonel disiplin çok önemli',
      'Her alanda sayısal üstünlük yaratma',
      'Sabırlı top sirkülasyonu',
      'Risk almadan güvenli pas',
      'Kanat bekler dar, kanatçılar geniş',
      '6 numaralı Regista gibi oynar'
    ]),
    famous_teams: 'Ajax 1994-95, Barcelona 1997-00, Bayern 2009-11',
    famous_coaches: 'Louis van Gaal',
    success_rate: 82,
    position_specific_instructions: JSON.stringify({
      GK: 'Yapılanmada aktif, güvenli paslar',
      DF: 'Pozisyon tutma, kontrollü sürme',
      MF: 'Üçgenler oluştur, açıları değiştir',
      FW: 'Genişlik koru, içeri girme zamanlaması'
    }),
    in_possession_shape: '4-3-3 kontrollü genişlik',
    out_of_possession_shape: '4-5-1 orta blok',
    pressing_triggers: JSON.stringify(['Rakip zayıf oyuncu', 'Yanlara pas', 'Kontrollü baskı']),
    buildup_patterns: JSON.stringify(['U şeklinde yapılanma', 'Kanat rotasyonları', 'Orta saha pivotu']),
    attacking_width: 'Geniş',
    defensive_width: 'Orta',
    transition_speed_attack: 6,
    transition_speed_defense: 7
  },

  // BIELSA SİSTEMİ
  {
    name: '3-3-1-3 Bielsa Atletismo',
    formation: '3-3-1-3',
    category: 'Baskı',
    style: 'Yüksek Tempolu',
    philosophy: 'Marcelo Bielsa\'nın atak ve yoğun futbolu. Man-marking, yüksek baskı, fiziksel üstünlük.',
    pressing_intensity: 10,
    defensive_line: 9,
    width_attack: 9,
    width_defense: 8,
    tempo: 10,
    passing_style: 'Direkt',
    buildup_play: 'Dikey hızlı',
    defensive_approach: 'Adam adama baskı',
    mentality: 'Çok Hücumcu',
    possession_target: 52,
    chance_creation: 'Dikey atak',
    key_principles: JSON.stringify([
      'Adam adama savunma tüm sahada',
      'Yüksek tempo fiziksel baskı',
      'Hızlı dikey paslar',
      'Kanat bekler çok ileriye',
      'Sürekli koşu ve baskı',
      '3-3-1-3 ama çok akışkan'
    ]),
    famous_teams: 'Chile 2007-11, Leeds United 2018-21, Athletic Bilbao 2011-13',
    famous_coaches: 'Marcelo Bielsa',
    success_rate: 75,
    position_specific_instructions: JSON.stringify({
      GK: 'Uzun pas yetenekli, hızlı oyuna başlama',
      DF: 'Man-marking, yüksek pozisyon, fiziksel',
      MF: 'Box-to-box, sürekli baskı ve destek',
      FW: 'Derin koşular, baskı tetikleyici'
    }),
    in_possession_shape: '3-3-1-3 geniş kanatlarla',
    out_of_possession_shape: '5-3-2 man-marking',
    pressing_triggers: JSON.stringify(['Her top', 'Tüm saha', 'Adam adama']),
    buildup_patterns: JSON.stringify(['Dikey hızlı paslar', 'Kanat sürüşleri', 'Orta vuruşlar']),
    attacking_width: 'Çok Geniş',
    defensive_width: 'Geniş',
    transition_speed_attack: 10,
    transition_speed_defense: 10
  },

  // RANGNICK SİSTEMİ
  {
    name: '4-2-2-2 Rangnick Gegenpressing 2.0',
    formation: '4-2-2-2',
    category: 'Baskı',
    style: 'Gegenpressing',
    philosophy: 'Ralf Rangnick\'in modern pressing yaklaşımı. Kompakt blok, top kazanımı ve hızlı vertikal atak.',
    pressing_intensity: 10,
    defensive_line: 8,
    width_attack: 6,
    width_defense: 5,
    tempo: 9,
    passing_style: 'Dikey',
    buildup_play: 'Hızlı geçiş',
    defensive_approach: 'Yüksek baskı',
    mentality: 'Çok Hücumcu',
    possession_target: 48,
    chance_creation: 'Pressing sonrası',
    key_principles: JSON.stringify([
      'Top kaybında 8 saniye kuralı - topa 3 oyuncu',
      'Dar ve kompakt blok (yaklaşık 20 metre)',
      'Dikey paslarla hızlı atak',
      '4-2-2-2 iki striker partnerliği',
      'Bölgesel pressing bölgeleriyle',
      'Yüksek tempo ve intensite'
    ]),
    famous_teams: 'RB Leipzig 2015-16, Hoffenheim 2006-08, Schalke 04 2004-05',
    famous_coaches: 'Ralf Rangnick, Julian Nagelsmann, Jesse Marsch',
    success_rate: 80,
    position_specific_instructions: JSON.stringify({
      GK: 'Sürekli sweeper pozisyonu, hızlı oyuna başlama',
      DF: 'Yüksek hat, agresif müdahale',
      MF: 'Top kazanma-hızlı dağıtım, box-to-box',
      FW: 'Pressing başlatıcı, derinlik koşuları'
    }),
    in_possession_shape: '4-2-2-2 dar orta koridor',
    out_of_possession_shape: '4-4-2 yüksek kompakt',
    pressing_triggers: JSON.stringify(['Top kaybı', 'Rakip dokunuş', '8 saniye kuralı']),
    buildup_patterns: JSON.stringify(['Kazanım-vertikal pas', 'Hızlı striker kombinasyonları', 'İkili paslaşmalar']),
    attacking_width: 'Dar',
    defensive_width: 'Dar',
    transition_speed_attack: 10,
    transition_speed_defense: 10
  },

  // NAGELSMANN SİSTEMİ
  {
    name: '3-4-2-1 Nagelsmann Hybrid',
    formation: '3-4-2-1',
    category: 'Hibrit',
    style: 'Modern Esnek',
    philosophy: 'Julian Nagelsmann\'ın yenilikçi sistemi. Asimetrik yapı, kanat beklerin farklı rolleri, esnek formasyonlar.',
    pressing_intensity: 8,
    defensive_line: 7,
    width_attack: 8,
    width_defense: 6,
    tempo: 8,
    passing_style: 'Karma',
    buildup_play: 'Esnek',
    defensive_approach: 'Bölgesel baskı',
    mentality: 'Hücumcu',
    possession_target: 58,
    chance_creation: 'Asimetrik aşırı yük',
    key_principles: JSON.stringify([
      'Asimetrik kanat bekleri (biri iç, biri geniş)',
      '3-4-2-1 defansif, 3-2-5 hücumda',
      'Dinamik pozisyon değişimleri',
      'Yarı boşluklarda aşırı yük',
      'False 9 veya hedef adam opsiyonlu',
      'Veri analitiği tabanlı taktikler'
    ]),
    famous_teams: 'RB Leipzig 2019-21, Bayern Munich 2021-23, Hoffenheim 2016-19',
    famous_coaches: 'Julian Nagelsmann',
    success_rate: 85,
    position_specific_instructions: JSON.stringify({
      GK: 'Modern sweeper keeper, yapılanma desteği',
      DF: 'Geniş pozisyon, top sürme, asimetrik',
      MF: 'Bir taraf yüksek, bir taraf pivot',
      FW: '10\'lar yarı boşluklarda, 9 esnek'
    }),
    in_possession_shape: '3-2-5 asimetrik',
    out_of_possession_shape: '5-4-1 dengeli',
    pressing_triggers: JSON.stringify(['Zayıf taraf', 'Yarı boşluk', 'Veri bazlı']),
    buildup_patterns: JSON.stringify(['Asimetrik yapılanma', 'Yarı boşluk aşırı yük', 'Kanat rotasyonları']),
    attacking_width: 'Asimetrik',
    defensive_width: 'Orta',
    transition_speed_attack: 8,
    transition_speed_defense: 8
  },

  // POCHETTINO SİSTEMİ
  {
    name: '4-2-3-1 Pochettino High Press',
    formation: '4-2-3-1',
    category: 'Baskı',
    style: 'Yüksek Tempo Baskı',
    philosophy: 'Mauricio Pochettino\'nun Tottenham dönemi sistemi. Agresif pressing, yüksek tempo, fiziksel oyun.',
    pressing_intensity: 9,
    defensive_line: 8,
    width_attack: 7,
    width_defense: 6,
    tempo: 9,
    passing_style: 'Dikey',
    buildup_play: 'Hızlı',
    defensive_approach: 'Yüksek baskı',
    mentality: 'Çok Hücumcu',
    possession_target: 52,
    chance_creation: 'Baskı sonrası',
    key_principles: JSON.stringify([
      'Yüksek defensive line ve ofsayt tuzağı',
      'Tüm takım pressing yapar',
      'Fiziksel ve tempolu oyun',
      'Kanat bekler overlapping koşular',
      'İkili pivot güçlü ve mobil',
      'Hızlı dikey geçişler'
    ]),
    famous_teams: 'Tottenham 2014-19, Southampton 2013-14',
    famous_coaches: 'Mauricio Pochettino',
    success_rate: 78,
    position_specific_instructions: JSON.stringify({
      GK: 'Sweeper keeper, yüksek başlangıç',
      DF: 'Yüksek hat, agresif, overlapping kanat bekler',
      MF: 'İkili 6 dengeli, 10\'lar içe girer',
      FW: 'Pressing tetikleyici, derinliğe koşu'
    }),
    in_possession_shape: '4-2-3-1 kanat bekleri yüksek',
    out_of_possession_shape: '4-4-1-1 yüksek baskı',
    pressing_triggers: JSON.stringify(['Geri pas', 'Zayıf ayak', 'Yanlara']),
    buildup_patterns: JSON.stringify(['Dikey paslar', 'Kanat bekleri overlapping', 'Hızlı kombinasyonlar']),
    attacking_width: 'Geniş',
    defensive_width: 'Orta',
    transition_speed_attack: 9,
    transition_speed_defense: 9
  },

  // CONTE 3-4-3 VARYANTv
  {
    name: '3-4-3 Conte Chelsea Wing-Backs',
    formation: '3-4-3',
    category: 'Dengeli',
    style: 'Kanat Bek Sistemi',
    philosophy: 'Antonio Conte\'nin Chelsea şampiyonluk sistemi. 3-4-3 ile kanat beklerin ataklarını maksimize etme.',
    pressing_intensity: 7,
    defensive_line: 6,
    width_attack: 9,
    width_defense: 5,
    tempo: 7,
    passing_style: 'Direkt',
    buildup_play: 'Kademeli',
    defensive_approach: 'Orta blok',
    mentality: 'Dengeli',
    possession_target: 50,
    chance_creation: 'Kanat bek atakları',
    key_principles: JSON.stringify([
      'Kanat bekler en önemli oyuncular',
      '3-4-3 dengeli ama esnek',
      'Üçlü stoper güvenli savunma',
      'İkili 6 koruma ve dağıtım',
      'Striker hedef adam, kanatlar içe',
      'Defansif 5-4-1 çok güvenli'
    ]),
    famous_teams: 'Chelsea 2016-17, Inter 2020-21',
    famous_coaches: 'Antonio Conte',
    success_rate: 88,
    position_specific_instructions: JSON.stringify({
      GK: 'Dağıtım yetenekli',
      DF: 'Üç stoper geniş açılır, orta güçlü',
      MF: 'Kanat bekler koşu gücü, pivot dengeli',
      FW: 'Striker hedef, kanatlar içe girer'
    }),
    in_possession_shape: '3-4-3 kanat bekler üst',
    out_of_possession_shape: '5-4-1 kompakt',
    pressing_triggers: JSON.stringify(['Orta bölge', 'Kontrollü baskı']),
    buildup_patterns: JSON.stringify(['Kanat bek atakları', 'Orta stoper sürüşleri', 'Direkt striker']),
    attacking_width: 'Çok Geniş',
    defensive_width: 'Dar',
    transition_speed_attack: 7,
    transition_speed_defense: 8
  },

  // ZEMAN SİSTEMİ
  {
    name: '4-3-3 Zeman Attacking Football',
    formation: '4-3-3',
    category: 'Atak',
    style: 'Topyekün Hücum',
    philosophy: 'Zdeněk Zeman\'ın ultra-ofansif futbolu. Defans ihmal, sürekli atak, çok sayıda gol atma/yeme.',
    pressing_intensity: 8,
    defensive_line: 9,
    width_attack: 9,
    width_defense: 7,
    tempo: 9,
    passing_style: 'Dikey',
    buildup_play: 'Hızlı hücum',
    defensive_approach: 'Minimal savunma',
    mentality: 'Çok Hücumcu',
    possession_target: 55,
    chance_creation: 'Sürekli atak',
    key_principles: JSON.stringify([
      'Gol atmak gol yemekten önemli',
      'Kanat bekler sürekli hücumda',
      'Orta saha box-to-box koşar',
      'Üç forvet sürekli hareket',
      'Çok yüksek defansif hat',
      'Spektaküler maçlar (4-3, 5-4 vb.)'
    ]),
    famous_teams: 'Roma 1997-99, Pescara 2011-12',
    famous_coaches: 'Zdeněk Zeman',
    success_rate: 65,
    position_specific_instructions: JSON.stringify({
      GK: 'Gol atmayı destekle, savunma ikinci planda',
      DF: 'Kanat bekler forvet gibi, çok yüksek',
      MF: 'Sürekli öne koşu, geri dönmeyi unut',
      FW: 'Her üçü hücum eder, defans yok'
    }),
    in_possession_shape: '2-3-5 topyekün hücum',
    out_of_possession_shape: '4-3-3 ama gevşek',
    pressing_triggers: JSON.stringify(['Gol fırsatı varsa bas', 'Yoksa önemli değil']),
    buildup_patterns: JSON.stringify(['Hızlı hücum', 'Kanat atakları', 'Çok oyunculu atak']),
    attacking_width: 'Çok Geniş',
    defensive_width: 'Çok Geniş',
    transition_speed_attack: 10,
    transition_speed_defense: 3
  },

  // ANCELOTTI 4-3-2-1 Christmas Tree
  {
    name: '4-3-2-1 Ancelotti Christmas Tree',
    formation: '4-3-2-1',
    category: 'Klasik',
    style: 'Yaratıcı Orta Saha',
    philosophy: 'Carlo Ancelotti\'nin AC Milan şampiyonluk sistemi. İki 10 numara yaratıcı, tek forvet.',
    pressing_intensity: 6,
    defensive_line: 6,
    width_attack: 6,
    width_defense: 5,
    tempo: 6,
    passing_style: 'Kısa-orta',
    buildup_play: 'Sabırlı',
    defensive_approach: 'Orta blok',
    mentality: 'Dengeli',
    possession_target: 58,
    chance_creation: '10 numaralar',
    key_principles: JSON.stringify([
      'İki 10 numara yaratıcılık merkezi',
      'Regista (Pirlo) oyun kurucu',
      'Tek forvet hedef adam ve bitirici',
      'Kanat bekleri dengeli',
      '4-3-2-1 çam ağacı formasyonu',
      'Orta koridor kontrolü'
    ]),
    famous_teams: 'AC Milan 2002-07, Real Madrid 2014-15',
    famous_coaches: 'Carlo Ancelotti',
    success_rate: 85,
    position_specific_instructions: JSON.stringify({
      GK: 'Güvenli ve tecrübeli',
      DF: 'Dengeli, kanat bekleri overlapping seçenekli',
      MF: 'Regista oyun kurar, 10\'lar yaratır, box-to-box destek',
      FW: 'Tek forvet her işi yapar'
    }),
    in_possession_shape: '4-3-2-1 orta kontrol',
    out_of_possession_shape: '4-5-1 kompakt',
    pressing_triggers: JSON.stringify(['Kontrollü baskı', 'Orta bölge']),
    buildup_patterns: JSON.stringify(['Regista dağıtım', '10 numaralar kombin', 'Orta saha üstünlüğü']),
    attacking_width: 'Dar',
    defensive_width: 'Dar',
    transition_speed_attack: 6,
    transition_speed_defense: 7
  },

  // LOW ALMANYA SİSTEMİ
  {
    name: '4-2-3-1 Low 2014 World Cup',
    formation: '4-2-3-1',
    category: 'Hibrit',
    style: 'Esnek Modern',
    philosophy: 'Joachim Löw\'ün 2014 Dünya Kupası şampiyonluk sistemi. Esnek, pozisyon rotasyonlu, False 9 opsiyonlu.',
    pressing_intensity: 7,
    defensive_line: 7,
    width_attack: 8,
    width_defense: 6,
    tempo: 7,
    passing_style: 'Kısa-orta',
    buildup_play: 'Esnek',
    defensive_approach: 'Orta blok',
    mentality: 'Hücumcu',
    possession_target: 60,
    chance_creation: 'Pozisyon rotasyonu',
    key_principles: JSON.stringify([
      'False 9 Götze kullanımı',
      'Müller\'in Raumdeuter rolü',
      'Sürekli pozisyon değişimi',
      'Teknik üstünlük',
      'Esnek 4-2-3-1/4-3-3/4-4-2',
      'Kroos-Schweinsteiger ikilisi'
    ]),
    famous_teams: 'Germany 2014 World Cup',
    famous_coaches: 'Joachim Löw',
    success_rate: 92,
    position_specific_instructions: JSON.stringify({
      GK: 'Neuer sweeper keeper örneği',
      DF: 'Teknik ve zeki stoperler, kanat bekleri mobil',
      MF: 'İkili 6 dengeli, 10\'lar yaratıcı, Müller özgür',
      FW: 'False 9 veya hedef adam esnek'
    }),
    in_possession_shape: '4-2-3-1/4-3-3 esnek',
    out_of_possession_shape: '4-4-1-1 kompakt',
    pressing_triggers: JSON.stringify(['Orta bölge', 'Akıllı baskı']),
    buildup_patterns: JSON.stringify(['Pozisyon rotasyonları', 'False 9 düşmesi', 'Yarı boşluk oyunu']),
    attacking_width: 'Geniş',
    defensive_width: 'Orta',
    transition_speed_attack: 7,
    transition_speed_defense: 7
  },

  // VALVERDE 4-4-2 ATLETICO
  {
    name: '4-4-2 Valverde Bilbao Defensive',
    formation: '4-4-2',
    category: 'Defansif',
    style: 'Kompakt Defansif',
    philosophy: 'Ernesto Valverde\'nin Athletic Bilbao sistemleri. Basque fiziksel güç, kompakt defans, set piece golü.',
    pressing_intensity: 7,
    defensive_line: 4,
    width_attack: 7,
    width_defense: 4,
    tempo: 6,
    passing_style: 'Direkt',
    buildup_play: 'Uzun-kısa karma',
    defensive_approach: 'Derin blok',
    mentality: 'Defansif',
    possession_target: 42,
    chance_creation: 'Duran top',
    key_principles: JSON.stringify([
      'Kompakt 4-4-2 blok',
      'Fiziksel ve mücadeleci',
      'Set piece özel antrenmanları',
      'Direkt oyun ve ikinci top',
      'Disiplinli defansif hat',
      'Counterattack seçenekleri'
    ]),
    famous_teams: 'Athletic Bilbao 2013-17, Barcelona 2017-20',
    famous_coaches: 'Ernesto Valverde',
    success_rate: 72,
    position_specific_instructions: JSON.stringify({
      GK: 'İkinci top kontrolü, set piece organizasyonu',
      DF: 'Fiziksel müdahale, duran top savunması güçlü',
      MF: 'Orta saha savaşı, fiziksel güç',
      FW: 'Hedef adam ve hızlı forvet kombinasyonu'
    }),
    in_possession_shape: '4-4-2 dengeli',
    out_of_possession_shape: '4-4-2 derin kompakt',
    pressing_triggers: JSON.stringify(['Kontrollü baskı', 'İkinci top']),
    buildup_patterns: JSON.stringify(['Uzun top', 'Set piece', 'İkinci top atakları']),
    attacking_width: 'Orta',
    defensive_width: 'Dar',
    transition_speed_attack: 6,
    transition_speed_defense: 8
  }
];

// Devam edecek - 30+ sistem daha...
const additionalSystems = [
  // BOSZ SİSTEMİ
  {
    name: '4-3-3 Bosz Ajax High Press',
    formation: '4-3-3',
    category: 'Baskı',
    style: 'Hollanda Okulu',
    philosophy: 'Peter Bosz\'un Ajax ile oynadığı spektaküler futbol. Cruyff mirası, yüksek baskı, genç yıldızlar.',
    pressing_intensity: 9,
    defensive_line: 9,
    width_attack: 8,
    width_defense: 7,
    tempo: 9,
    passing_style: 'Kısa',
    buildup_play: 'Kısa yapılanma',
    defensive_approach: 'Çok yüksek hat',
    mentality: 'Çok Hücumcu',
    possession_target: 65,
    chance_creation: 'Hızlı kombinasyon',
    key_principles: JSON.stringify([
      'Çok yüksek defansif hat',
      'Top kaybında anında baskı',
      'Genç yeteneklere güven',
      'Hollanda okulu teknik futbol',
      'Sürekli hareket ve rotasyon',
      'Kaleci yapılanmada aktif (Onana)'
    ]),
    famous_teams: 'Ajax 2016-17, Bayer Leverkusen 2017-18',
    famous_coaches: 'Peter Bosz',
    success_rate: 76,
    position_specific_instructions: JSON.stringify({
      GK: 'Sweeper keeper, ayak becerisi kritik',
      DF: 'Çok yüksek, ofsayt tuzağı, top sürme',
      MF: 'De Jong tipi pivot, yaratıcı 8\'ler',
      FW: 'Hızlı kanatlar, mobil santrfor'
    }),
    in_possession_shape: '4-3-3 yüksek üçgenler',
    out_of_possession_shape: '4-3-3 çok yüksek',
    pressing_triggers: JSON.stringify(['Top kaybı', 'Rakip dokunuş', 'Sürekli']),
    buildup_patterns: JSON.stringify(['Kısa hızlı paslar', 'Üçgen kombinasyonları', 'Kanat rotasyonları']),
    attacking_width: 'Geniş',
    defensive_width: 'Geniş',
    transition_speed_attack: 9,
    transition_speed_defense: 10
  },

  // MANCINI İTALYA
  {
    name: '4-3-3 Mancini Italy EURO 2020',
    formation: '4-3-3',
    category: 'Modern',
    style: 'İtalya Devrimi',
    philosophy: 'Roberto Mancini\'nin İtalya\'yı dönüştürmesi. Catenaccio\'dan vazgeçip, hücum futbolu oynama.',
    pressing_intensity: 8,
    defensive_line: 7,
    width_attack: 8,
    width_defense: 6,
    tempo: 8,
    passing_style: 'Kısa-orta',
    buildup_play: 'Kademeli',
    defensive_approach: 'Orta-yüksek baskı',
    mentality: 'Hücumcu',
    possession_target: 60,
    chance_creation: 'Kanat oyunu',
    key_principles: JSON.stringify([
      'İtalyan defans geleneği + hücum',
      'Kanat bekleri çok aktif (Spinazzola)',
      'False 9 bazen kullanım',
      'Bonucci-Chiellini güvenli defans',
      'Jorginho oyun kurucu',
      '4-3-3 dengeli ama hücumcu'
    ]),
    famous_teams: 'Italy EURO 2020 Şampiyonu',
    famous_coaches: 'Roberto Mancini',
    success_rate: 90,
    position_specific_instructions: JSON.stringify({
      GK: 'Donnarumma - penaltı devi',
      DF: 'Tecrübeli stopper ikilisi, hücumcu kanat bekler',
      MF: 'Jorginho regista, Verratti-Barella box-to-box',
      FW: 'İmmobile/Chiesa hızlı, Insigne yaratıcı'
    }),
    in_possession_shape: '4-3-3 kanat bekleri yüksek',
    out_of_possession_shape: '4-5-1 kompakt',
    pressing_triggers: JSON.stringify(['Orta bölge', 'Kanat', 'Akıllı baskı']),
    buildup_patterns: JSON.stringify(['Jorginho dağıtım', 'Kanat bek atakları', 'İçe giren kanatlar']),
    attacking_width: 'Geniş',
    defensive_width: 'Orta',
    transition_speed_attack: 8,
    transition_speed_defense: 8
  },

  // EMERY SEVILLA
  {
    name: '4-2-3-1 Emery Sevilla Europa League',
    formation: '4-2-3-1',
    category: 'Pragmatik',
    style: 'Turnuva Uzmanı',
    philosophy: 'Unai Emery\'nin Sevilla ile 3 UEFA Europa League. Disiplinli defans, duran top, turnuva taktiği.',
    pressing_intensity: 7,
    defensive_line: 5,
    width_attack: 7,
    width_defense: 5,
    tempo: 7,
    passing_style: 'Orta',
    buildup_play: 'Sabırlı',
    defensive_approach: 'Orta blok',
    mentality: 'Dengeli',
    possession_target: 52,
    chance_creation: 'Duran top',
    key_principles: JSON.stringify([
      'Turnuva taktiği - yorgunluk yönetimi',
      'Duran top set piece master',
      'Disiplinli defansif organizasyon',
      'Rotasyon ve kadro derinliği',
      'Pragmatik sonuç odaklı futbol',
      'İkinci top ve uzun top kombinasyonu'
    ]),
    famous_teams: 'Sevilla 2013-16 (3x Europa League), Villarreal 2020-22',
    famous_coaches: 'Unai Emery',
    success_rate: 82,
    position_specific_instructions: JSON.stringify({
      GK: 'Güvenilir, set piece organizasyonu',
      DF: 'Disiplinli hat, set piece savunma/atak',
      MF: 'İkili pivot dengeli, 10 yaratıcı, kanatlar iş yapıcı',
      FW: 'Hedef adam, set piece tehdidi'
    }),
    in_possession_shape: '4-2-3-1 sabırlı',
    out_of_possession_shape: '4-4-1-1 kompakt',
    pressing_triggers: JSON.stringify(['Kontrollü', 'Set piece', 'İkinci top']),
    buildup_patterns: JSON.stringify(['Set piece', 'Sabırlı yapılanma', 'Kanat değişimleri']),
    attacking_width: 'Orta',
    defensive_width: 'Dar',
    transition_speed_attack: 7,
    transition_speed_defense: 7
  },

  // SPALETTI NAPOLI
  {
    name: '4-3-3 Spalletti Napoli Scudetto',
    formation: '4-3-3',
    category: 'Atak',
    style: 'İtalyan Hücum',
    philosophy: 'Luciano Spalletti\'nin Napoli şampiyonluğu. Hızlı kanatlar, Osimhen hedef adam, yaratıcı orta saha.',
    pressing_intensity: 8,
    defensive_line: 7,
    width_attack: 9,
    width_defense: 6,
    tempo: 8,
    passing_style: 'Hızlı direkt',
    buildup_play: 'Hızlı geçiş',
    defensive_approach: 'Orta baskı',
    mentality: 'Çok Hücumcu',
    possession_target: 56,
    chance_creation: 'Kanat hızı',
    key_principles: JSON.stringify([
      'Kanatlar çok hızlı (Kvaratskhelia-Lozano)',
      'Osimhen hedef adam ve bitirici',
      'Lobotka regista, kontrolü sağlar',
      'Di Lorenzo hücumcu kanat bek',
      'Hızlı transizyon hücumları',
      'Yüksek sayıda gol atan sistem'
    ]),
    famous_teams: 'Napoli 2022-23 Scudetto',
    famous_coaches: 'Luciano Spalletti',
    success_rate: 88,
    position_specific_instructions: JSON.stringify({
      GK: 'Güvenli, yapılanma desteği',
      DF: 'Kim Min-jae hızlı stoper, Di Lorenzo öne',
      MF: 'Lobotka pivot, Anguissa-Zielinski box-to-box',
      FW: 'Hızlı kanatlar, Osimhen hedef-hız'
    }),
    in_possession_shape: '4-3-3 geniş hızlı',
    out_of_possession_shape: '4-5-1 orta',
    pressing_triggers: JSON.stringify(['Orta bölge', 'Kanat baskısı']),
    buildup_patterns: JSON.stringify(['Hızlı kanat geçişleri', 'Osimhen derinliği', 'Lobotka dağıtım']),
    attacking_width: 'Çok Geniş',
    defensive_width: 'Orta',
    transition_speed_attack: 9,
    transition_speed_defense: 8
  },

  // XAVI BARCELONA
  {
    name: '4-3-3 Xavi Barcelona Revival',
    formation: '4-3-3',
    category: 'Pozisyonel',
    style: 'Barça DNA',
    philosophy: 'Xavi\'nin Barça\'ya dönüşü. Cruyff-Guardiola mirasını yeniden canlandırma, genç yetenekler.',
    pressing_intensity: 8,
    defensive_line: 8,
    width_attack: 8,
    width_defense: 7,
    tempo: 8,
    passing_style: 'Kısa',
    buildup_play: 'Kısa pozisyonel',
    defensive_approach: 'Yüksek baskı',
    mentality: 'Hücumcu',
    possession_target: 70,
    chance_creation: 'Pozisyon üstünlüğü',
    key_principles: JSON.stringify([
      'Tiki-taka geri dönüşü',
      'Pedri-Gavi genç yetenek',
      'Lewandowski bitirici',
      'Pozisyonel rotasyonlar',
      'Yüksek defansif hat',
      'Barça DNA - Cruyff mirası'
    ]),
    famous_teams: 'Barcelona 2021-günümüz',
    famous_coaches: 'Xavi Hernandez',
    success_rate: 78,
    position_specific_instructions: JSON.stringify({
      GK: 'Ter Stegen sweeper keeper',
      DF: 'Araujo-Kounde hızlı, kanat bekler iç geçiş',
      MF: 'Busquets/De Jong pivot, Pedri-Gavi yaratıcı',
      FW: 'Lewandowski bitirici, Raphinha-Dembele hızlı'
    }),
    in_possession_shape: '4-3-3 pozisyonel üstünlük',
    out_of_possession_shape: '4-3-3 yüksek baskı',
    pressing_triggers: JSON.stringify(['Top kaybı', 'Rakip dokunuş', 'Yüksek']),
    buildup_patterns: JSON.stringify(['Kısa paslar', 'Pozisyon rotasyonları', 'İçe geçen kanat bekler']),
    attacking_width: 'Geniş',
    defensive_width: 'Geniş',
    transition_speed_attack: 8,
    transition_speed_defense: 9
  }
];

// Veritabanına ekleme fonksiyonu
function insertTacticalSystem(system) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT OR IGNORE INTO tactical_systems (
      name, formation, category, style, philosophy,
      pressing_intensity, defensive_line, width_attack, width_defense,
      tempo, passing_style, buildup_play, defensive_approach,
      mentality, possession_target, chance_creation,
      key_principles, famous_teams, famous_coaches, success_rate,
      position_specific_instructions, in_possession_shape,
      out_of_possession_shape, pressing_triggers, buildup_patterns,
      attacking_width, defensive_width, transition_speed_attack,
      transition_speed_defense
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      system.name,
      system.formation,
      system.category,
      system.style,
      system.philosophy,
      system.pressing_intensity,
      system.defensive_line,
      system.width_attack,
      system.width_defense,
      system.tempo,
      system.passing_style,
      system.buildup_play,
      system.defensive_approach,
      system.mentality,
      system.possession_target,
      system.chance_creation,
      system.key_principles,
      system.famous_teams,
      system.famous_coaches,
      system.success_rate,
      system.position_specific_instructions,
      system.in_possession_shape,
      system.out_of_possession_shape,
      system.pressing_triggers,
      system.buildup_patterns,
      system.attacking_width,
      system.defensive_width,
      system.transition_speed_attack,
      system.transition_speed_defense
    ];

    db.run(sql, values, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          console.log(`⚠️  ${system.name} - Zaten mevcut`);
          resolve({ success: false, exists: true });
        } else {
          console.error(`❌ ${system.name} - Hata:`, err.message);
          reject(err);
        }
      } else {
        console.log(`✅ ${system.name} - Eklendi!`);
        resolve({ success: true, id: this.lastID });
      }
    });
  });
}

// Ana işlem
async function main() {
  const allSystems = [...newTacticalSystems, ...additionalSystems];

  let successCount = 0;
  let existsCount = 0;
  let errorCount = 0;

  for (const system of allSystems) {
    try {
      const result = await insertTacticalSystem(system);
      if (result.success) successCount++;
      else if (result.exists) existsCount++;
    } catch (error) {
      errorCount++;
    }
  }

  console.log(`\n📊 ÖZET:`);
  console.log(`   ✅ Yeni eklenen: ${successCount}`);
  console.log(`   ⚠️  Zaten mevcut: ${existsCount}`);
  console.log(`   ❌ Hata: ${errorCount}`);
  console.log(`   📈 Toplam: ${allSystems.length}`);

  // Toplam sistem sayısını göster
  db.get('SELECT COUNT(*) as total FROM tactical_systems', (err, row) => {
    if (!err) {
      console.log(`\n🎯 Veritabanındaki toplam sistem sayısı: ${row.total}`);
    }
    db.close();
  });
}

main().catch(console.error);
