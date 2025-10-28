const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('EKSİK COUNTER TACTICS OLUŞTURMA');
console.log('═'.repeat(80) + '\n');

// Önce hangi sistemlerin counter tactics'i yok bul
db.all(`
  SELECT ts.id, ts.name, ts.formation, ts.system_type, ts.pressing_intensity
  FROM tactical_systems ts
  LEFT JOIN counter_tactics ct ON ts.id = ct.system_id
  WHERE ct.id IS NULL
  ORDER BY ts.id
`, [], (err, systems) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  console.log(`${systems.length} sistem için counter tactic oluşturulacak...\n`);

  if (systems.length === 0) {
    console.log('✅ Tüm sistemlerin counter tactics\'i mevcut!');
    process.exit(0);
  }

  let added = 0;
  let processed = 0;

  systems.forEach(system => {
    // Sisteme göre zayıf noktalar ve karşı taktikler oluştur
    const counterTactic = generateCounterTactic(system);

    db.run(
      `INSERT INTO counter_tactics (
        system_id, counter_name, strategy_type, when_to_apply,
        key_weaknesses, exploitation_methods,
        recommended_formation, recommended_roles, pressing_zones,
        transition_focus, set_piece_strategy, player_instructions,
        detailed_strategy, key_adjustments, counter_system_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        system.id,
        `${system.name} Karşı Taktik`, // counter_name
        counterTactic.strategy_type || 'Adaptif Karşı Strateji', // strategy_type
        counterTactic.when_to_apply || 'Rakip bu sistemi kullandığında uygula', // when_to_apply
        counterTactic.key_weaknesses,
        counterTactic.exploitation_methods,
        counterTactic.recommended_formation,
        counterTactic.recommended_roles,
        counterTactic.pressing_zones,
        counterTactic.transition_focus,
        counterTactic.set_piece_strategy,
        counterTactic.player_instructions,
        counterTactic.detailed_strategy,
        counterTactic.key_adjustments,
        null // counter_system_id - bu aşamada null
      ],
      (err2) => {
        if (!err2) {
          added++;
          console.log(`✅ ${system.name} için counter tactic eklendi`);
        } else {
          console.log(`❌ ${system.name} hata: ${err2.message}`);
        }
        processed++;

        if (processed === systems.length) {
          console.log('\n' + '═'.repeat(80));
          console.log(`✅ TOPLAM ${added} YENİ COUNTER TACTIC EKLENDİ!`);
          console.log('═'.repeat(80) + '\n');
          process.exit(0);
        }
      }
    );
  });
});

function generateCounterTactic(system) {
  const formation = system.formation;
  const systemType = system.system_type;
  const pressingIntensity = system.pressing_intensity;

  let counterTactic = {
    key_weaknesses: '',
    exploitation_methods: '',
    recommended_formation: '',
    recommended_roles: '',
    pressing_zones: '',
    transition_focus: '',
    set_piece_strategy: '',
    player_instructions: '',
    detailed_strategy: '',
    key_adjustments: ''
  };

  // Formasyon bazlı zayıf noktalar
  if (formation.startsWith('4-3-3')) {
    counterTactic.key_weaknesses = 'Kanatlarda savunma zafiyeti, orta saha ikili yaratan oyunculara karşı açık, kanat bekleri hücuma katıldığında arkada boşluklar';
    counterTactic.exploitation_methods = 'Kanat boşluklarını kullan, hızlı kanat oyuncularıyla 1v1 yaratın, merkezi yoğunlaştır ve kanatlara açılımlar yap';
    counterTactic.recommended_formation = '4-4-2 veya 4-2-3-1 ile merkezi sıkılaştır';
    counterTactic.recommended_roles = 'Hızlı kanat oyuncuları, güçlü forvet ikilisi, box-to-box orta saha';
    counterTactic.pressing_zones = 'Yarı saha, kanat koridorları';
    counterTactic.transition_focus = 'Hızlı karşı atak, kanat geçişleri';
    counterTactic.player_instructions = JSON.stringify({
      'Savunma': 'Kompakt kal, kanat koridorlarını kapat',
      'Orta Saha': 'Merkezi sıkılaştır, top kazanımında hızlı geçiş',
      'Kanatlar': 'Rakip kanat beklerine karşı agresif ol, 1v1 yaratmaya odaklan',
      'Forvetler': 'Arkaya koşular, defansları gerdiren hareketler'
    });
    counterTactic.detailed_strategy = 'Merkezi kalabalıklaştırarak onları kanatlara yönlendir, sonra o bölgelerde tuzak kur. Top kazanımında anında kanat geçişleriyle karşı atak yap.';
  } else if (formation.startsWith('4-4-2')) {
    counterTactic.key_weaknesses = 'Yaratıcı orta saha eksikliği, modern üçgen formasyonlara karşı sayısal dezavantaj, kanatlarda yalnız kalanlar';
    counterTactic.exploitation_methods = 'Orta sahada sayısal üstünlük kur, top kontrolü ile yoracak tempoda oyna, kanat değişimleriyle savunmayı kaydır';
    counterTactic.recommended_formation = '4-3-3 veya 4-2-3-1 merkezi dominant';
    counterTactic.recommended_roles = 'Playmaker, box-to-box, False 9';
    counterTactic.pressing_zones = 'Orta saha merkezi, oyun kurma bölgesi';
    counterTactic.transition_focus = 'Kontrollü oyun kurma, genişlik kullanımı';
    counterTactic.player_instructions = JSON.stringify({
      'Savunma': 'Yüksek hat, oyun kurmayı zorlaştır',
      'Orta Saha': 'Üçgen oluştur, top hakimiyeti kur, rakip orta sahayı yut',
      'Kanatlar': 'Genişlik oluştur, savunmayı kaydır, içeri kesme hareketleri',
      'Forvet': 'Düşerek top al, orta sahaya bağlantı kur'
    });
    counterTactic.detailed_strategy = 'Orta sahada sayısal üstünlük kurarak rakibin orta ikilisini yok et. Top hakimiyetiyle onları yorar, pozisyonel hataları beklersin.';
  } else if (formation.startsWith('3-5-2') || formation.startsWith('3-4-3')) {
    counterTactic.key_weaknesses = 'Geniş kanat koridorları savunmasız, kanatta 1v1 durumlarda zayıf, hızlı kanat oyuncularına karşı açık';
    counterTactic.exploitation_methods = 'Hızlı kanatlarla genişlik kullan, wing-back\'leri savunmaya çağır, kanat koridorlarında sürekli tehdit oluştur';
    counterTactic.recommended_formation = '4-3-3 veya 4-2-3-1 geniş kanatlarla';
    counterTactic.recommended_roles = 'Hızlı invertli kanatlar, üst kanat bekleri, dinamik orta saha';
    counterTactic.pressing_zones = 'Geniş kanat bölgeleri, wing-back bölgeleri';
    counterTactic.transition_focus = 'Geniş kanat geçişleri, hız kullanımı';
    counterTactic.player_instructions = JSON.stringify({
      'Savunma': 'Wing-back\'leri kanat oyuncularıyla meşgul et',
      'Orta Saha': 'Rakip orta sahasına baskı, kanatlara hızlı açılış',
      'Kanatlar': 'Geniş kal, sürekli kanat tehdidi, 1v1 yarat, wing-back\'leri savunmaya çağır',
      'Forvetler': 'Stoper arasındaki boşluklarda hareket et'
    });
    counterTactic.detailed_strategy = 'Geniş kanat oyunuyla wing-back\'leri savunmaya zorlayarak onların hücum katkısını sıfırla. Kanat koridorlarında sürekli tehdit oluştur.';
  } else if (formation.startsWith('4-2-3-1')) {
    counterTactic.key_weaknesses = 'Tek forvetle gol baskısı yetersiz, merkezi 10 numara işlemezse yaratıcılık azalır, ikili pivot yavaş geçişlere neden olur';
    counterTactic.exploitation_methods = 'Merkezi 10 numarayı işlevsiz kıl, çift forvetle fizik baskı kur, hızlı basit futbolla onları tempo olarak geç';
    counterTactic.recommended_formation = '4-4-2 veya 4-3-3 agresif';
    counterTactic.recommended_roles = 'Güçlü forvet ikilisi, yüksek enerjili orta saha, baskıcı kanatlar';
    counterTactic.pressing_zones = 'Merkezi 10 numara bölgesi, pivot bölgesi';
    counterTactic.transition_focus = 'Dikey hızlı oyun, basit futbol';
    counterTactic.player_instructions = JSON.stringify({
      'Savunma': 'Merkezi 10 numarayı adamla kapat, hiç rahat ettirme',
      'Orta Saha': 'Yüksek tempo, fiziksel mücadele, basit paslar',
      'Forvetler': 'Savunmaya sürekli baskı, ikinci top mücadelesi, gol baskısı'
    });
    counterTactic.detailed_strategy = '10 numarayı işlevsiz kılarak onların oyun yaratıcısını sıfırla. Fiziksel ve tempolu oyunla onları kendi oyunlarından uzaklaştır.';
  } else if (formation.startsWith('4-1-4-1')) {
    counterTactic.key_weaknesses = 'Tek defansif orta saha aşırı yüklenebilir, forvet izole kalır, yaratıcılık sadece kanatlardan';
    counterTactic.exploitation_methods = 'DM\'ye sürekli baskı, orta sahaya sayısal üstünlükle gir, forvet izolasyonunu kullan';
    counterTactic.recommended_formation = '4-3-3 veya 4-2-3-1';
    counterTactic.recommended_roles = 'Pressing forvet, aktif orta saha üçlüsü, hareketli kanatlar';
    counterTactic.pressing_zones = 'DM bölgesi, forvet izolasyonu';
    counterTactic.transition_focus = 'Orta sahada sayısal üstünlük';
    counterTactic.player_instructions = JSON.stringify({
      'Forvet': 'DM\'ye sürekli baskı, hiç rahat ettirme',
      'Orta Saha': 'Rakip DM etrafında sayısal üstünlük kur',
      'Savunma': 'Forvet izolasyonunu kullan, rahat oyna'
    });
    counterTactic.detailed_strategy = 'DM\'yi baskı altına alarak onların oyun kurmalarını engelle. Orta sahada sayısal üstünlükle kontrol sağla.';
  } else if (formation.startsWith('5-3-2') || formation.startsWith('5-4-1')) {
    counterTactic.key_weaknesses = 'Aşırı savunmacı, hücumda sayısal azlık, yaratıcılık eksikliği, kompakt ama durağan';
    counterTactic.exploitation_methods = 'Top hakimiyeti kur, sabırla bekle, kanatlarda genişlik, kanat değişimleriyle yoracak oyun';
    counterTactic.recommended_formation = '4-3-3 possession veya 4-2-3-1';
    counterTactic.recommended_roles = 'Playmaker, kanat bekleri, çok hareketli forvetter';
    counterTactic.pressing_zones = 'Yarı sahalardan itibaren baskı';
    counterTactic.transition_focus = 'Sabırlı oyun kurma, tempo değişimleri';
    counterTactic.player_instructions = JSON.stringify({
      'Takım': 'Sabırlı ol, top hakimiyeti kur, acele etme',
      'Orta Saha': 'Tempo kontrol et, değişkenlik yarat',
      'Kanatlar': 'Sürekli genişlik, kanat değişimi, savunmayı kaydır',
      'Forvetler': 'Hareket et, stoperleri oyala, boşluklar yarat'
    });
    counterTactic.detailed_strategy = 'Top hakimiyetiyle sabırla bekle. Kompakt savunmayı kanat değişimleriyle ve sürekli hareketsayısıyla yorar, hata beklersin.';
  } else {
    // Genel counter tactic
    counterTactic.key_weaknesses = 'Sistem bazlı zayıf noktalar analiz edilmeli, hatlar arası boşluklar, tempo değişimlerine karşı adaptasyon zorluğu';
    counterTactic.exploitation_methods = 'Rakibin güçlü yönlerini sıfırla, zayıf noktalarını hedefle, tempo ve alan kullanımıyla avantaj yarat';
    counterTactic.recommended_formation = 'Rakip sistemin zayıflıklarına uygun formasyon';
    counterTactic.recommended_roles = 'Rakip sistemin zayıf noktalarını hedefleyen roller';
    counterTactic.pressing_zones = 'Rakibin oyun kurma bölgeleri';
    counterTactic.transition_focus = 'Hızlı geçişler ve tempo kontrolü';
    counterTactic.player_instructions = JSON.stringify({
      'Takım': 'Disiplinli kal, planı uygula',
      'Savunma': 'Kompakt ve organize',
      'Orta Saha': 'Akıllı pozisyonlanma, top kazanımında hızlı karar',
      'Hücum': 'Sabırlı ama etkili'
    });
    counterTactic.detailed_strategy = 'Rakip sistemin temel prensiplerini bozmaya odaklan. Güçlü yönlerini sıfırla, zayıf noktalarını istismar et.';
  }

  // Pressing intensity'ye göre ayarlamalar
  const pressingStr = pressingIntensity ? String(pressingIntensity) : '';
  if (pressingStr && (pressingStr.includes('Yüksek') || pressingStr.includes('Maksimum'))) {
    counterTactic.key_adjustments = 'Rakip yüksek baskı yapıyor - uzun toplarla baskıyı atla, sakin kal, basit oyun. Baskı altında top kaybı çok maliyetli!';
    counterTactic.set_piece_strategy = 'Uzun atışlarla baskıyı atla. Köşe vuruşlarında hızlı karşı atak fırsatı ara.';
  } else if (pressingStr && pressingStr.includes('Düşük')) {
    counterTactic.key_adjustments = 'Rakip düşük blok - sabırlı ol, top hakimiyeti kur, hızlı kanat değişimleriyle savunmayı kaydır';
    counterTactic.set_piece_strategy = 'Duran toplarda yaratıcı ol, kısa kornerler dene, çok adam ceza sahasına gönder';
  } else {
    counterTactic.key_adjustments = 'Rakibin baskı şiddetine göre oyununu adapte et. Tempo senin elinde olsun.';
    counterTactic.set_piece_strategy = 'Duran toplarda disiplinli ol, karşı atak fırsatlarını kollama';
  }

  return counterTactic;
}
