const db = require('./database.js');

/**
 * AUTO FILL ALL TACTICAL SYSTEMS - Comprehensive Data Generation
 *
 * This script intelligently fills missing tactical data for all football systems
 * by analyzing existing system characteristics and generating contextually appropriate
 * tactical information in Turkish.
 */

// ==================== TACTICAL DATA GENERATORS ====================

/**
 * Analyzes system characteristics and generates intelligent tactical data
 */
class TacticalDataGenerator {

  constructor(system) {
    this.system = system;
    this.isHighPressing = ['Yüksek', 'Çok Yüksek', 'Maksimum'].includes(system.pressing_intensity);
    this.isLowBlock = ['Düşük', 'Çok Düşük'].includes(system.pressing_intensity);
    this.isAttacking = system.system_type === 'Attacking';
    this.isDefensive = system.system_type === 'Defensive';
    this.isBalanced = system.system_type === 'Balanced';
    this.formation = system.formation;
  }

  // ========== POSSESSION TACTICS GENERATORS ==========

  generatePossessionStyle() {
    if (this.system.name.includes('Guardiola') || this.system.name.includes('Pozisyon')) {
      return 'Pozisyonel Dominasyon';
    }
    if (this.system.name.includes('Bielsa') || this.isHighPressing) {
      return 'Dikey Hızlı Oyun';
    }
    if (this.system.name.includes('Klopp') || this.system.name.includes('Gegenpress')) {
      return 'Yüksek Tempolu Direkt Oyun';
    }
    if (this.isDefensive || this.isLowBlock) {
      return 'Pragmatik Direkt Oyun';
    }
    if (this.system.name.includes('Cruyff') || this.system.name.includes('Total')) {
      return 'Total Futbol - Akışkan Rotasyon';
    }
    if (this.isAttacking) {
      return 'Dominasyon ve İlerleme';
    }
    return 'Dengeli Kontrollü Oyun';
  }

  generatePossessionTargetPercentage() {
    if (this.system.name.includes('Guardiola') || this.system.name.includes('Pozisyon')) {
      return '65-75';
    }
    if (this.isHighPressing && this.isAttacking) {
      return '58-65';
    }
    if (this.isDefensive || this.isLowBlock) {
      return '40-48';
    }
    if (this.system.name.includes('Klopp') || this.system.pressing_intensity === 'Yüksek') {
      return '52-58';
    }
    return '50-55';
  }

  generateInPossessionShape() {
    const defenders = this.formation.split('-')[0];
    const midfielders = this.formation.split('-')[1];

    if (this.system.name.includes('Inverted')) {
      return `${this.formation} → Topla bekler içe kayar, 2-3-5 şekline dönüşür`;
    }
    if (defenders === '3') {
      return `${this.formation} → Geniş stoperlerin yayılması, kanat bekler yüksek koridorlar`;
    }
    if (defenders === '4' && this.isAttacking) {
      return `${this.formation} → Bir bek içe pivot yanı, diğeri yüksek, asimetrik yapı`;
    }
    if (defenders === '5') {
      return `${this.formation} → Üç stoper, kanat bekler orta saha hattına`;
    }
    return `${this.formation} → Kompakt yapıda katmanlı ilerleyiş`;
  }

  generatePassingPrinciples() {
    const principles = [];

    if (this.isHighPressing) {
      principles.push('Hızlı dikey pas tercihi, tempo yüksek');
      principles.push('Az dokunuşla ilerleme, 1-2 dokunuş kuralı');
      principles.push('Risk alınabilir bölgelerde saldırgan pas');
    } else if (this.isDefensive) {
      principles.push('Güvenlik öncelikli, geriye pas meşru');
      principles.push('Uzun pas alternatifi her zaman mevcut');
      principles.push('Top kaybı riskinden kaçınma');
    } else {
      principles.push('Kontrollü ama ileri bakışlı pas seçimleri');
      principles.push('Pozisyonel üstünlük yaratana kadar sabır');
      principles.push('Pas tempo varyasyonu - yavaş/hızlı geçişler');
    }

    if (this.system.name.includes('Tiki-taka') || this.system.passing_style?.includes('Kısa')) {
      principles.push('Üçgen oluşumu zorunlu, her pas 3 seçenek');
      principles.push('Yatay sirkülasyon ile dikey fırsat arama');
    } else {
      principles.push('Orta-uzun pas karışımı, oyun değiştirme');
    }

    return JSON.stringify(principles.slice(0, 5), null, 2);
  }

  generateMovementPrinciples() {
    const movements = [];

    if (this.system.name.includes('Total') || this.system.name.includes('Cruyff')) {
      movements.push('Pozisyon değişimleri serbest, akışkan rotasyonlar');
      movements.push('Biri boşluk terkeder, diğeri doldurur mantığı');
      movements.push('Sürekli hareket, durağan oyuncu yok');
    } else if (this.isDefensive) {
      movements.push('Minimum rotasyon, pozisyon disiplini öncelik');
      movements.push('Forvet düşme hareketi, orta saha destek');
      movements.push('Kontrollü hareket, shape bozulmaz');
    } else {
      movements.push('Planlı rotasyonlar, belirli tetikleyicilerle');
      movements.push('Topa yakın hareketlilik, uzakta pozisyon');
    }

    if (this.formation.startsWith('4-3-3') || this.formation.startsWith('4-2-3-1')) {
      movements.push('İç kanat - orta saha değişimleri');
      movements.push('Bek bindirme ile kanat içe kayma');
    } else if (this.formation.startsWith('3-')) {
      movements.push('Kanat bek koridor koşuları, stoper açılma');
      movements.push('Orta saha merkez-kanat geçişleri');
    }

    return JSON.stringify(movements.slice(0, 5), null, 2);
  }

  generateBuildUpStrategy() {
    if (this.system.name.includes('Guardiola') || this.system.build_up_play?.includes('Kısa')) {
      return 'Kaleci dahil kısa pas zinciri, defans hattı geniş açılır, pivot(lar) araya iner. Sabırlı build-up, her zaman geri dönüş seçeneği. 3-2 veya 2-3 yapısı defansta';
    }
    if (this.isLowBlock || this.isDefensive) {
      return 'Uzun top opsiyonu öncelik, kaleci güvenli oynar. Kısa build-up sadece rakip baskısı yoksa. Orta saha hızlı dikey pas ile atlanabilir. Forvet hedef adam';
    }
    if (this.isHighPressing) {
      return 'Hızlı build-up, kaleci süratle oyuna sokar. Az pas ile ilerleme hedefi. Defans hattı kompakt, hızlı dikey progresyon. Orta saha atlanabilir';
    }
    if (this.formation.startsWith('3-')) {
      return 'Üç stoper geniş açılır, kanat bekler seçenek. Orta saha üçgen, merkez oyuncu düşüp alır. Build-up 3-2 veya 3-1 yapısında. Geniş açılarak rakip presini açma';
    }
    return 'Dengeli build-up, kısa-uzun karışımı. Defans pozisyonel güvenli, orta saha bağlantı. Tempo kontrollü ama ileri bakışlı. Fleksibel yapı';
  }

  generateProgressionMethods() {
    const methods = [];

    if (this.system.name.includes('Kanat')) {
      methods.push('Kanat koridorları ana ilerleme yolu');
    }
    if (this.isHighPressing) {
      methods.push('Dikey paslar ile hızlı progresyon');
      methods.push('Taşıma (carrying) - hızlı top sürmeler');
    }
    if (this.system.passing_style?.includes('Kısa')) {
      methods.push('Kademeli kısa paslarla ilerleyiş');
      methods.push('Pozisyon değişimleri ile boşluk yaratma');
    }
    if (this.formation.includes('3-') || this.formation.includes('5-')) {
      methods.push('Kanat bek overlap koşuları');
      methods.push('Stoper taşıma ve ileri pas');
    }
    methods.push('Orta saha üçüncü adam kombinasyonları');
    methods.push('Oyun değiştirme (switch) pasları');
    methods.push('Forvet arkası penetrasyon pasları');

    return methods.slice(0, 4).join(', ');
  }

  generateKeyPlayersPositioning() {
    if (this.formation.startsWith('4-3-3')) {
      return 'Kaleci: Build-up dahil. Stoperler: Geniş. Pivot: Defans önü. İç orta sahalar: Half-space. Kanatlar: Geniş başla, içe kay. Forvet: Merkez sabitleyici';
    }
    if (this.formation.startsWith('4-2-3-1')) {
      return 'Kaleci: Destek. Bekler: Bindirme hazır. Çift pivot: Kademeli. Kanatlar: 1v1 pozisyonları. 10 numara: Forvet arkası. Forvet: Hedef adam veya düşen';
    }
    if (this.formation.startsWith('3-4-3') || this.formation.startsWith('3-5-2')) {
      return 'Kaleci: Sweeper. Stoperler: Geniş açık. Kanat bekler: Yüksek koridorlar. Orta saha merkez: Bağlantı hub. Forvetler: Hareket ve sabitleme';
    }
    if (this.formation.startsWith('4-4-2')) {
      return 'Kaleci: Hat lideri. Defans: Kompakt çizgi. Orta saha: İkili pivot veya kademeli. Kanatlar: Genişlik. Forvet ikili: Bir hedef bir hareket';
    }
    return `${this.formation} dizilişinde pozisyonel disiplin, her oyuncu sorumlu alanda`;
  }

  // ========== NON-POSSESSION TACTICS GENERATORS ==========

  generateDefensivePhilosophy() {
    if (this.isLowBlock) {
      return 'Derin savunma, kompakt düşük blok. Kale koruma öncelik, alan savunması. Sabırlı bekleyiş, rakip hata bekler. Forvetler bile geri, 11 kişi savunma';
    }
    if (this.isHighPressing) {
      return 'Agresif topu kazanma. Yüksek savunma hattı, sahayı daralt. Topu rakip yarıda kazanma hedefi. Proaktif savunma, tepki değil aksiyon';
    }
    if (this.system.name.includes('Gegenpress')) {
      return 'Topu kaybeder kaybetmez agresif kazanma. Saniyeler içinde pressing, pozisyon değil zaman. Yakın mesafe grup pressingi. Rakibi boğ, düşünme zamanı verme';
    }
    if (this.isDefensive) {
      return 'Pragmatik savunma, shape korunur. Orta blok, kompakt hatlar. Merkez koruma, kanatlardan gol zor. Disiplinli pozisyonel savunma';
    }
    return 'Dengeli savunma, duruma göre adaptasyon. Orta blok esnek, bazen yüksek bazen derin. Kontrollü risk alma, organizasyon öncelik';
  }

  generatePressingPhilosophy() {
    if (this.system.pressing_intensity === 'Maksimum') {
      return 'Tam saha agresif pressing. Her top kaybında anında baskı. Yoğunluk maksimum, dinlenme yok. Man-oriented pressing, adamı takip et';
    }
    if (this.isHighPressing) {
      return 'Yüksek baskı, rakip build-up engelle. Tetikleyici bazlı pressing, planlı baskı. Grup pressingi, izole etme. Yüksek tempo pressing';
    }
    if (this.isLowBlock) {
      return 'Minimal pressing, shape koruma öncelik. Sadece net fırsatlarda press. Konservatif yaklaşım, enerji yönetimi. Pozisyon savunması ağırlıklı';
    }
    if (this.isBalanced) {
      return 'Seçici pressing, zonal tetikleyiciler. Orta saha baskısı, kenar tuzakları. Kontrollü yoğunluk, enerji ekonomisi. Durum bazlı pressing kararları';
    }
    return 'Esnek pressing yaklaşımı, skor ve duruma göre. Organize baskı, kaos değil kontrol';
  }

  generateCounterAttackPhilosophy() {
    if (this.isDefensive) {
      return 'Kontra atak ana silah. Top kazanımı → hızlı dikey geçiş. Forvetler hazır, orta saha sprint. Az pas, çok mesafe. Direkt oyun, sürat kullan';
    }
    if (this.isHighPressing) {
      return 'Counter-press başarısızsa hızlı kontra. Yüksek pozisyon → kısa mesafe kontra. Hızlı kombinasyon, rakip dengesiz. Gegenpressing\'den kontraya geçiş';
    }
    if (this.isAttacking) {
      return 'Dengeli kontra, pozisyon ve hız karışımı. Hızlı ama kontrollü geçiş. Sayısal üstünlük yaratana kadar tempo. 3v2, 4v3 durumlarını zorla';
    }
    return 'Fırsatçı kontra atak. Top kazanma bölgesine göre hız kararı. Merkez kontrası direkt, kanat kontrası taşımalı';
  }

  generateOutOfPossessionShape() {
    const formation = this.formation;
    if (this.system.name.includes('5-') || formation.startsWith('5-')) {
      return `${formation} → Kompakt beşli savunma, kanat bekler geri`;
    }
    if (this.isHighPressing) {
      return `${formation} → Yüksek hat, dar mesafeler, agresif pozisyonlar`;
    }
    if (this.isLowBlock) {
      return `${formation} → Derin savunma, kale önü kalabalık, sıkı düzen`;
    }
    return `${formation} → Kompakt blok, hatlar arası 10-12m, organizeli düzen`;
  }

  generatePressingTriggers() {
    const triggers = [];

    triggers.push('Rakip kaleciye geri pas - GK pressingi');

    if (this.isHighPressing) {
      triggers.push('Rakip defans açık - anında yüksek press');
      triggers.push('Kötü ilk kontrol - grup pressingi tetikle');
      triggers.push('Bek yüzü kaleye - basma zamanı');
    } else {
      triggers.push('Rakip kenar bölgesinde - trap aktivasyonu');
      triggers.push('Rakip körmen pas yaptı - pressing fırsatı');
    }

    triggers.push('Rakip pivot arkası dönük top aldı - basma sinyali');
    triggers.push('Kanat-bek arası pas - pressing tuzağı');
    triggers.push('Rakip yavaş build-up - organize press başlat');

    return JSON.stringify(triggers.slice(0, 5), null, 2);
  }

  generateDefensivePriorities() {
    const priorities = [];

    priorities.push('Kale merkez koruma - santral bölge kapatma');
    priorities.push('Rakip 10 numara kontrolü - yaratıcı oyuncu nötralize');

    if (this.isDefensive) {
      priorities.push('Shape disiplini - pozisyon hiç bozulmasın');
      priorities.push('Kanat savunması - bekler geri tracking zorunlu');
      priorities.push('Ceza sahası koruma - tüm duran toplar organizeli');
    } else if (this.isHighPressing) {
      priorities.push('Topu kazanma - savunma değil topa sahip olma');
      priorities.push('Yüksek hat tutma - sahayı daralt');
      priorities.push('Counter-press - top kaybında 5 sn kuralı');
    } else {
      priorities.push('Kompakt mesafeler - hatlar arası disiplin');
      priorities.push('Merkez yoğunluğu - kanatlardan ver ortadan verme');
      priorities.push('Geçiş savunması - hızlı shape alma');
    }

    return JSON.stringify(priorities.slice(0, 5), null, 2);
  }

  generateRegainStrategies() {
    const strategies = [];

    if (this.isHighPressing) {
      strategies.push('Counter-pressing: Top kaybından 5 sn içinde grup baskısı, topu hemen geri kazanma hedefi');
      strategies.push('Yüksek pressing: Rakip build-up kesme, kendi yarılarında top kazanma, hızlı gol fırsatı');
    } else if (this.isLowBlock) {
      strategies.push('Sabırlı bekleme: Rakip hata bekle, pozisyon korunur, ani müdahale fırsatı');
      strategies.push('Kesilme: Pas yollarını kes, rakibi geri pasa zorla, tempo düşür');
    }

    strategies.push('Trap zonlar: Planlı tuzak bölgeler, rakibi yönlendir, sayısal üstünlükle çevrele');
    strategies.push('Duels kazanma: 1v1 ikili mücadeleler, fiziksel ve teknik üstünlük');
    strategies.push('Takım savunması: 11 kişi savunma, boşluk yok, sürekli cover');

    return strategies.slice(0, 4).join(' | ');
  }

  generateRestDefense() {
    if (this.isHighPressing) {
      return 'Minimum rest-defense: Çoğunluk taarruzda, genelde 2+GK. Hızlı geri koşu planı var, counter-press öncelik. Risk kabul edilir';
    }
    if (this.isDefensive) {
      return 'Maksimum rest-defense: En az 4-5 oyuncu her zaman geri güvence. Muhafazakar taarruz, shape bozulmaz. Güvenlik öncelik';
    }
    if (this.isBalanced) {
      return 'Dengeli rest-defense: 3-4 oyuncu güvence, duruma göre ayarlanır. Skor öndeysek daha çok, gerideysek daha az. Fleksibel yapı';
    }
    return 'Orta rest-defense: 3 oyuncu genelde geri güvence pozisyonunda. Bir pivot + iki stoper veya benzer yapı';
  }

  generateCounterPressIntensity() {
    if (this.system.pressing_intensity === 'Maksimum' || this.system.pressing_intensity === 'Çok Yüksek') {
      return 'Maksimum - Her top kaybında tüm yakın oyuncular anında basma';
    }
    if (this.isHighPressing) {
      return 'Yüksek - Yakın 3-4 oyuncu 5-6 saniye agresif counter-press';
    }
    if (this.isLowBlock) {
      return 'Düşük - Minimal counter-press, hızla shape alma öncelik';
    }
    return 'Orta - Duruma göre, uygun bölgelerde 4-5 saniye counter-press';
  }

  // ========== PRESSING TRAP ZONES GENERATORS ==========

  generatePressingTrapZones() {
    const zones = [];
    const intensity = this.system.pressing_intensity;

    // Zone 1: High press trap (if applicable)
    if (['Yüksek', 'Çok Yüksek', 'Maksimum'].includes(intensity)) {
      zones.push({
        zone_name: 'Yüksek Pressing Tuzağı - Rakip Yarı Saha',
        zone_type: 'Yüksek Baskı',
        description: `Rakip kendi yarı sahasında build-up yaparken aktivasyon. ${this.formation} dizilişinde forvet hattı rakip stoperleri basma şeklinde, orta saha pas yollarını kapatma pozisyonunda. Amaç rakibi geri pasa veya uzun topa zorlamak, hata yakalamak.`,
        intensity: intensity === 'Maksimum' ? 'Maksimum' : 'Çok Yüksek',
        trigger_conditions: 'Rakip kaleci topa sahip, defans build-up hazırlığı, yavaş top sirkülasyonu. Takım şekli ve pozisyonları tam olduğunda aktivasyon',
        player_responsibilities: `Forvetler: Rakip stoper basma, orta pas yolu kapat. Orta sahalar: Pivot markaj, ara pas yolları kapat, ikinci top hazır. Bekler: Rakip kanat bek kontrolü, içe kayma hazırlığı. GK: Arkada geniş, uzun top karşı pozisyon`,
        success_metrics: 'Top kazanma rakip 3\'te 1\'lik alanda, rakip hata zorlaması, uzun top zorlama ve kazanma, rakip build-up bozulması',
        common_mistakes: 'Bireysel baskı (grup yerine), çok ileri çıkma ve arkada boşluk, eşzamansız pressing, enerji israfı sürekli basma'
      });
    }

    // Zone 2: Mid-block press
    zones.push({
      zone_name: 'Orta Saha Baskı Bölgesi',
      zone_type: 'Orta Saha Baskısı',
      description: `Orta saha bölgesinde (orta saha çizgisi civarı ±15m) kompakt blok pressi. ${this.formation} şeklinde organize savunma, merkez yoğun. Rakibi kenar veya geri pasa zorlamak için ara bölge kontrolü.`,
      intensity: intensity === 'Düşük' ? 'Orta' : (intensity === 'Maksimum' ? 'Çok Yüksek' : intensity),
      trigger_conditions: 'Rakip orta sahaya geçiş yaptı, build-up tamamlandı ama henüz final 3\'te 1 giriş yok. Takım orta blok pozisyonu aldı, hatlar kompakt',
      player_responsibilities: `Forvetler: Rakip pivotu basma veya gölgeleme. Orta saha hattı: Kompakt 10-12m genişlik, ara pas kapatma, rakip 10 numara kontrolü. Savunma hattı: 40-45m hat yüksekliği, sıkı çizgi, stoper organizasyon. GK: Sweeper rol`,
      success_metrics: 'Rakibi kenar veya geri pas zorlaması, orta sahada top kazanımı, rakip final pası engelleme, pozisyon savunması başarısı',
      common_mistakes: 'Hatlar arası mesafe açılması, forvet baskısız bırakma, kanat savunması ihmal, orta sahadan atlamalar'
    });

    // Zone 3: Wing trap
    zones.push({
      zone_name: 'Kanat Tuzak Bölgesi',
      zone_type: 'Kanat Baskısı',
      description: `Yan koridor tuzağı. Rakip kanada top geldiğinde kenara yönlendirip sayısal üstünlükle çevreleme. Yan çizgi doğal yardımcımız, rakibi köşeye sıkıştırma. 3v1 veya 4v2 yaratma hedefi.`,
      intensity: 'Çok Yüksek',
      trigger_conditions: 'Rakip kanat oyuncusuna top geldi, rakip kenara doğru hareketsiz veya sınırlı seçenekler. Bizim kanat+bek+orta saha üçgen pozisyon aldı',
      player_responsibilities: `Yakın kanat oyuncusu: Ana baskı, köşeye yönlendir. Bek: Destek ve geri seçenek kes. Orta saha: Merkeze dönüş pas yolu kapat, ikinci top. Karşı taraf: Kompakt kal, switch'e hazır. Libero/Pivot: Merkez cover`,
      success_metrics: 'Kanat tuzağında top kazanma, rakip körmen veya geri pas zorlaması, yan çizgi out zorlaması, sayısal üstünlük kullanımı',
      common_mistakes: 'Erken dalma ve geçilme, bek destek vermeme, orta saha cover yetersiz, karşı taraf açık kalma'
    });

    // Zone 4: Counter-press zone (if applicable)
    if (intensity !== 'Düşük' && intensity !== 'Çok Düşük') {
      zones.push({
        zone_name: 'Counter-Pressing Anında Kazanma',
        zone_type: 'Karşı Baskı',
        description: `Top kaybı anında (kendi taarruz anında) immediate baskı. Zaman bazlı: ilk 5-6 saniye kritik. Pozisyon bazlı: tercihen orta saha ve ileri bölgeler. Rakip organizasyon önce topu geri kazanma.`,
        intensity: this.isHighPressing ? 'Maksimum' : 'Yüksek',
        trigger_conditions: 'Top kaybı anı - özellikle rakip yarısı ve orta sahalarda. İlk 5 saniye altın kural. Rakip henüz organize olmadı, dengesiz pozisyonlar',
        player_responsibilities: `Top kaybeden: İlk baskı, hemen reaktif. Yakın 2-3 oyuncu: Anında etraf sarma, pas yollarını kes. Uzaktakiler: Hızla pozisyon al, geri seçenekleri kapat. Savunma: Step up, sahayı daralt. GK: İleri pozisyon`,
        success_metrics: '5 saniye içinde top kazanma, rakip counter öncesi kesme, topu rakip organize olmadan alma, ikinci top kontrolü',
        common_mistakes: 'Geç reaksiyon, bireysel pressing, arkada boşluk açma, uzun süre zorlaması ve enerji kaybı, fail sonrası shape almama'
      });
    }

    return zones.slice(0, 4); // Max 4 zones
  }
}

// ==================== DATABASE OPERATIONS ====================

async function getAllSystems() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tactical_systems ORDER BY id', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function checkPossessionTactics(systemId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM possession_tactics WHERE system_id = ?', [systemId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function checkNonPossessionTactics(systemId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM non_possession_tactics WHERE system_id = ?', [systemId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function checkPressingTrapZones(systemId) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pressing_trap_zones WHERE system_id = ?', [systemId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function updatePossessionTactics(systemId, generator) {
  const data = {
    possession_style: generator.generatePossessionStyle(),
    possession_target_percentage: generator.generatePossessionTargetPercentage(),
    passing_principles: generator.generatePassingPrinciples(),
    movement_principles: generator.generateMovementPrinciples(),
    in_possession_shape: generator.generateInPossessionShape()
  };

  // Check if we need to add new columns first
  return new Promise((resolve, reject) => {
    // Try to add build_up_strategy column if it doesn't exist
    db.run(`ALTER TABLE possession_tactics ADD COLUMN build_up_strategy TEXT`, (err) => {
      // Ignore error if column already exists
      db.run(`ALTER TABLE possession_tactics ADD COLUMN progression_methods TEXT`, (err) => {
        db.run(`ALTER TABLE possession_tactics ADD COLUMN key_players_positioning TEXT`, (err) => {

          // Now update with all data including new fields
          const updateQuery = `
            UPDATE possession_tactics
            SET possession_style = ?,
                in_possession_shape = ?,
                passing_principles = ?,
                movement_principles = ?,
                build_up_strategy = ?,
                progression_methods = ?,
                key_players_positioning = ?
            WHERE system_id = ?
          `;

          const params = [
            data.possession_style,
            data.in_possession_shape,
            data.passing_principles,
            data.movement_principles,
            generator.generateBuildUpStrategy(),
            generator.generateProgressionMethods(),
            generator.generateKeyPlayersPositioning(),
            systemId
          ];

          db.run(updateQuery, params, function(err) {
            if (err) reject(err);
            else resolve(this.changes);
          });
        });
      });
    });
  });
}

async function updateNonPossessionTactics(systemId, generator) {
  return new Promise((resolve, reject) => {
    // Try to add new columns if they don't exist
    db.run(`ALTER TABLE non_possession_tactics ADD COLUMN regain_strategies TEXT`, (err) => {
      db.run(`ALTER TABLE non_possession_tactics ADD COLUMN rest_defense TEXT`, (err) => {
        db.run(`ALTER TABLE non_possession_tactics ADD COLUMN defensive_priorities TEXT`, (err) => {

          const updateQuery = `
            UPDATE non_possession_tactics
            SET defensive_philosophy = ?,
                pressing_philosophy = ?,
                counter_attack_philosophy = ?,
                out_of_possession_shape = ?,
                pressing_triggers = ?,
                defensive_priorities = ?,
                regain_strategies = ?,
                rest_defense = ?,
                counter_press_intensity = ?
            WHERE system_id = ?
          `;

          const params = [
            generator.generateDefensivePhilosophy(),
            generator.generatePressingPhilosophy(),
            generator.generateCounterAttackPhilosophy(),
            generator.generateOutOfPossessionShape(),
            generator.generatePressingTriggers(),
            generator.generateDefensivePriorities(),
            generator.generateRegainStrategies(),
            generator.generateRestDefense(),
            generator.generateCounterPressIntensity(),
            systemId
          ];

          db.run(updateQuery, params, function(err) {
            if (err) reject(err);
            else resolve(this.changes);
          });
        });
      });
    });
  });
}

async function insertPressingTrapZone(systemId, zone) {
  return new Promise((resolve, reject) => {
    // First, try to add new columns
    db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN zone_type TEXT`, (err) => {
      db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN intensity TEXT`, (err) => {
        db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN description TEXT`, (err) => {
          db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN trigger_conditions TEXT`, (err) => {
            db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN player_responsibilities TEXT`, (err) => {
              db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN success_metrics TEXT`, (err) => {
                db.run(`ALTER TABLE pressing_trap_zones ADD COLUMN common_mistakes TEXT`, (err) => {

                  const insertQuery = `
                    INSERT INTO pressing_trap_zones (
                      system_id, trap_name, trap_zone, zone_type, description,
                      intensity, trap_trigger, trigger_conditions, trap_setup,
                      player_roles_involved, player_responsibilities,
                      success_rate_high_against, success_metrics,
                      success_rate_low_against, common_mistakes
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

                  const params = [
                    systemId,
                    zone.zone_name,
                    zone.zone_name, // trap_zone
                    zone.zone_type,
                    zone.description,
                    zone.intensity,
                    zone.trigger_conditions, // trap_trigger
                    zone.trigger_conditions, // trigger_conditions
                    zone.description, // trap_setup
                    zone.player_responsibilities, // player_roles_involved
                    zone.player_responsibilities,
                    zone.success_metrics, // success_rate_high_against
                    zone.success_metrics,
                    zone.common_mistakes, // success_rate_low_against
                    zone.common_mistakes
                  ];

                  db.run(insertQuery, params, function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

async function deleteExistingPressingTrapZones(systemId) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM pressing_trap_zones WHERE system_id = ?', [systemId], function(err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

// ==================== MAIN PROCESSING FUNCTION ====================

async function processAllSystems() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║   AUTO FILL ALL TACTICAL SYSTEMS - STARTING PROCESSING        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  try {
    const systems = await getAllSystems();
    console.log(`📊 Found ${systems.length} tactical systems in database\n`);
    console.log('─'.repeat(70));

    let processedCount = 0;
    let updatedPossession = 0;
    let updatedNonPossession = 0;
    let addedTrapZones = 0;

    for (const system of systems) {
      console.log(`\n🎯 Processing: ${system.name} (ID: ${system.id})`);
      console.log(`   Formation: ${system.formation} | Type: ${system.system_type} | Pressing: ${system.pressing_intensity}`);

      const generator = new TacticalDataGenerator(system);

      // Update possession tactics
      try {
        const existing = await checkPossessionTactics(system.id);
        if (existing) {
          const changes = await updatePossessionTactics(system.id, generator);
          if (changes > 0) {
            console.log('   ✅ Possession tactics updated');
            updatedPossession++;
          }
        }
      } catch (err) {
        console.log(`   ⚠️  Possession tactics error: ${err.message}`);
      }

      // Update non-possession tactics
      try {
        const existing = await checkNonPossessionTactics(system.id);
        if (existing) {
          const changes = await updateNonPossessionTactics(system.id, generator);
          if (changes > 0) {
            console.log('   ✅ Non-possession tactics updated');
            updatedNonPossession++;
          }
        }
      } catch (err) {
        console.log(`   ⚠️  Non-possession tactics error: ${err.message}`);
      }

      // Generate and insert pressing trap zones
      try {
        const existingZones = await checkPressingTrapZones(system.id);

        // Delete existing zones first
        if (existingZones && existingZones.length > 0) {
          await deleteExistingPressingTrapZones(system.id);
          console.log(`   🗑️  Deleted ${existingZones.length} existing trap zones`);
        }

        const zones = generator.generatePressingTrapZones();

        for (const zone of zones) {
          await insertPressingTrapZone(system.id, zone);
          addedTrapZones++;
        }

        console.log(`   ✅ Added ${zones.length} pressing trap zones`);
      } catch (err) {
        console.log(`   ⚠️  Pressing trap zones error: ${err.message}`);
      }

      processedCount++;
      console.log(`   📈 Progress: ${processedCount}/${systems.length}`);
    }

    console.log('\n' + '═'.repeat(70));
    console.log('\n✨ PROCESSING COMPLETE!\n');
    console.log('📊 Summary:');
    console.log(`   • Total systems processed: ${processedCount}`);
    console.log(`   • Possession tactics updated: ${updatedPossession}`);
    console.log(`   • Non-possession tactics updated: ${updatedNonPossession}`);
    console.log(`   • Pressing trap zones added: ${addedTrapZones}`);
    console.log('\n' + '═'.repeat(70));

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
  } finally {
    db.close(() => {
      console.log('\n🔒 Database connection closed');
    });
  }
}

// ==================== EXECUTE ====================

processAllSystems();
