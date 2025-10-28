// PART 1: MODERN DOMINANT SYSTEMS (30 Sistemin İlk 10'u)
// Her sistem TAMAMEN detaylı - basit örnekler değil!

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

const tacticalSystems = [
  {
    name: "4-2-3-1 Guardiola Possession",
    formation: "4-2-3-1",
    category: "modern",
    style: "attacking",
    era: "2008-present",
    philosophy: `Pep Guardiola'nın ultimate possession sistemi. Top kontrolü üzerinden rakibi yorma, pozisyonel üstünlük yaratma ve kontrollü şekilde savunma çizgilerini aşma prensibine dayanır. 'Juego de Posición' konseptinin modern uyarlaması. Sahayı 20 bölgeye böler, her oyuncu için net pozisyonel görevler belirler. Topa sahipken asimetrik yapı oluşturur.`,
    key_principles: JSON.stringify([
      "Positional play (Juego de Posición) - sahanın her bölgesinde sayısal üstünlük",
      "High defensive line with offside trap - savunma çizgisi orta sahaya kadar çıkar",
      "Build-up through thirds - üç bölgede aşamalı oyun kurma",
      "Inverted fullbacks - bekler orta sahaya girerek sayısal üstünlük yaratır",
      "False 9 or dropping striker - forvet gerileyerek boşluk yaratır",
      "Overloads in half-spaces - yarı kanatlarda aşırı yüklenme",
      "Counterpressing (gegenpressing light) - top kaybında anında baskı",
      "Controlled tempo - tempoya hakimiyet",
      "Recycling possession - topu geri döndürerek yeni açılar bulma",
      "Width through wingers - kanatlarda genişlik forvetler sağlar"
    ]),
    strengths: JSON.stringify([
      "Topa hakimiyet %65-75+ - rakip yorulur ve organize olamaz",
      "Pozisyonel üstünlük - her bölgede sayıca fazla oyuncu",
      "Rakip savunmayı açma - sürekli hareketle boşluklar yaratılır",
      "Kontrollü oyun - maç temposu sizin kontrolünüzde",
      "Az gol yeme - topun sizde olması en iyi savunma",
      "Tehlikeli pas kanalları - sürekli forward passing options",
      "Set play üstünlüğü - rakip yarı sahada çok korner ve serbest vuruş",
      "Oyuncu gelişimi - teknik oyuncular mükemmel gelişir",
      "Esneklik - oyun içinde farklı şekillere dönüşebilir"
    ]),
    weaknesses: JSON.stringify([
      "Counterattack vulnerability - hızlı kontralar tehlikeli olabilir",
      "High line exploitation - arkaya koşan forvetler tehlike yaratır",
      "Physical teams - agresif baskı ve fiziksellik zorlayabilir",
      "Requires elite technique - teknik yetersizlik sistemi çöker",
      "Mental fatigue - yüksek konsantrasyon gerektirir",
      "Injury to key players - anahtar oyuncu sakatlıkları sistemi etkiler",
      "Against deep blocks - 10 kişi savunan takımlara karşı gol atmak zor",
      "Transition vulnerability - pozisyon değiştirirken savunma açılabilir",
      "Requires specific players - her oyuncu bu sisteme uygun değil"
    ]),
    ideal_opposition: "4-4-2 flat, 5-4-1 deep block - sayısal üstünlükler daha kolay yaratılır",
    pressing_intensity: 8,
    defensive_line_height: 9,
    width: 8,
    tempo: 7,
    risk_level: 7,
    physicality_requirement: 6,
    technical_requirement: 10,
    tactical_complexity: 10,
    build_up_play: "short",
    passing_style: "tiki-taka evolved",
    passing_directness: 4,
    defensive_approach: "high-press with counter-press",
    attacking_approach: "positional possession",
    compactness: "compact",
    defensive_width: "narrow",
    attacking_width: "wide",
    defensive_shape: "asymmetric",
    required_player_profiles: JSON.stringify({
      GK: "Ball-playing goalkeeper, exceptional passing, comfortable with back-passes",
      RB_LB: "Inverted fullback capable of playing as auxiliary midfielder, excellent passing",
      CB: "Ball-playing defender, comfortable in high line, good pace, excellent positioning",
      CDM: "Deep-lying playmaker AND destroyer combo - one Busquets, one Fernandinho type",
      CAM: "Advanced playmaker with excellent vision, can play false 9 role",
      Wingers: "Inverted wingers who cut inside, excellent dribbling and shooting",
      ST: "False 9 or mobile striker, drops deep, links play, intelligent movement"
    }),
    key_positions: JSON.stringify([
      "CDM (Busquets role) - sistem beyni, her şeyi organize eder",
      "Inverted fullbacks - orta sahada üstünlük yaratır",
      "False 9 / Dropping striker - forvet çizgisini bozar"
    ]),
    famous_teams: JSON.stringify([
      "Barcelona 2008-2012 (Guardiola era)",
      "Bayern Munich 2013-2016 (Guardiola)",
      "Manchester City 2016-present (Guardiola)",
      "Spain National Team 2008-2012"
    ]),
    famous_coaches: JSON.stringify([
      "Pep Guardiola - yaratıcı ve modern uyarlayıcı",
      "Luis Enrique - Barça'da varyasyon yarattı",
      "Mikel Arteta - Guardiola öğrencisi, Arsenal'de uyguladı"
    ]),
    famous_matches: JSON.stringify([
      "Barcelona 5-0 Real Madrid (2010) - Tiki-taka zirvesi",
      "Barcelona 2-0 Manchester United (2011 CL Final) - Mükemmel gösteri",
      "Manchester City 6-0 Chelsea (2019) - Total dominance"
    ]),
    variants: JSON.stringify([
      "4-3-3 False 9 - forvet gerilemesi vurgulanır",
      "3-2-4-1 in possession - bekler orta sahaya tamamen geçer",
      "4-1-4-1 with single pivot - tek holding midfielder"
    ]),
    in_possession_shape: "Asimetrik 3-2-5 / 2-3-5 şekli - inverted bekler orta sahada sayısal üstünlük yaratır, kanatlar geniş ve yüksek, false 9 geriye düşer",
    out_of_possession_shape: "4-4-2 / 4-2-3-1 kompakt orta blok veya oyun durumuna göre yüksek baskı",
    transition_to_attack: "Boştaki en yakın oyuncuya anında ileri pas, uzun top yok, kademeli olarak üçte birlik bölgelerden kur",
    transition_to_defense: "Topun etrafında 4-6 oyuncuyla anında karşı baskı (gegenpress), başarısız olursa hemen orta bloğa çekilme",
    corner_attack_strategy: "Kısa korner varyasyonları, ön direğe aşırı yükleme, derinlikten koşanlar, kaleci genelde kendi kalesinde",
    corner_defense_strategy: "Bölgesel ve adam adam işaretleme karışımı, ilk topa odaklanma, hızlı geçişler",
    free_kick_strategy: "Kısa kombinasyonlar tercih edilir, Messi seviyesinde oyuncu yoksa nadiren direkt şut",
    tactical_instructions: `
TOPA SAHİPKEN:
1. Bekler: Orta sahaya ilerle, 3 bek oluştur, defensive midfield önünde pozisyon al
2. Orta Sahalar: Yarı kanatlarda pozisyon al, sürekli destek ver, üçgenler oluştur
3. Kanatlar: Geniş kal ama işarette içeri kes, 1v1 durumları yarat
4. Forvet: Gerileyerek top al, boşluk yarat, kanat oyuncularına alan aç

TOPSUZ:
1. Hemen counterpress - 6 saniye kuralı
2. Başarısızsa hızlı geri çekilme
3. Compact defensive block
4. No risky tackles - positioning üzerinden savun

GEÇIŞLER:
- Top kazanımı → hemen ileri pas
- Top kaybı → anında baskı
- Asla panik long ball yok`,
    player_instructions_by_position: JSON.stringify({
      GK: "Arkadan her zaman oyna, kısa paslar tercih et, süpürücü olarak destekle, mükemmel pozisyon alma",
      RB: "Orta sahaya gir, dar kal, oyun kurmayı destekle, nadiren üstle",
      LB: "Orta sahaya gir, sayısal üstünlük yarat, mümkün olduğunda ileriye pas ver",
      RCB: "Yüksek hat, ofsayt oynat, mükemmel pas, sağ boşlukları kapat",
      LCB: "Yüksek hat, sola dağıt, boşlukları kapat, düellolarda agresif",
      RDM: "Yıkıcı rol, topu kazan, basit paslar, boşlukları kapat",
      LDM: "Oyun kurucu, oyunu dağıt, tempoyu kontrol et, inanılmaz pozisyon alma (Busquets)",
      CAM: "False 9 hibrit, derine in, boşluk yarat, oyunu bağla, boşluk olunca şut",
      RW: "İçeri kesen kanat, içeri kes, uzak direğe şut, 1v1 durumları",
      LW: "İçeri kesen kanat, içeri kes, CAM ve LCM ile kombine ol, şans yarat",
      ST: "False 9, almak için geri in, oyunu bağla, fırsat olunca şut, kanatlar için boşluk yarat"
    }),
    difficulty_to_implement: 10,
    effectiveness_rating: 9,
    popularity_current: 9,
    success_rate: 75.5
  },

  {
    name: "4-3-3 Klopp Gegenpressing",
    formation: "4-3-3",
    category: "modern",
    style: "attacking",
    era: "2008-present",
    philosophy: `Jurgen Klopp'un 'Heavy Metal Football' felsefesi. Ento yüksek tempolu, yoğun baskı ve hızlı geçişler üzerine kurulu. Rakibi kendi yarı sahasına hapsetme ve top kaybında anında geri alma (gegenpressing). 'En iyi forvet iyi bir savunmadır' değil, 'en iyi savunma anında top geri almaktır' prensibi. Fiziksel ve mental olarak rakibi ezmek.`,
    key_principles: JSON.stringify([
      "Gegenpressing - top kaybında 6 saniye içinde geri alma",
      "High intensity pressing - rakip konforlu olmaz",
      "Vertical transitions - hızlı dikey geçişler",
      "Wide attacks - kanat oyuncuları ile genişlik",
      "Fullback overlaps - bekler sürekli üst lenir",
      "Compact defensive block - topsuzken sıkı blok",
      "Counter-attacking threat - hızlı kontra tehdidi",
      "High defensive line - offside tuzağı",
      "Physicality and intensity - fiziksel baskınlık",
      "Pressing triggers - belli durumlarda tetiklenen baskı"
    ]),
    strengths: JSON.stringify([
      "Overwhelming intensity - rakip fiziksel ve mental olarak yorulur",
      "Quick transitions - saniyeler içinde golüne gidilebilir",
      "High ball retention in final third - rakip yarı sahada çok top kazanma",
      "Creates many chances - yüksek xG değerleri",
      "Excellent counter-attacks - kontralar çok tehlikeli",
      "Team unity - takım ruhu çok güçlü",
      "Adaptable - farklı maç durumlarına uyum sağlar",
      "Fullback threat - bekler sürekli tehlike yaratır",
      "Set-piece strength - duran toplarda etkili"
    ]),
    weaknesses: JSON.stringify([
      "Physical exhaustion - sezon boyunca yorgunluk",
      "Injury risk - yoğunluk sakatlık riskini artırır",
      "Requires specific fitness - çok iyi kondisyon gerekir",
      "Vulnerable to counters - arkaya boşluk bırakma riski",
      "Deep blocks problem - kapalı savunmalara karşı zorluk",
      "If pressing fails - baskı başarısız olursa savunma açık kalır",
      "Requires specific players - her oyuncu bu tempoda oynayamaz",
      "Mental fatigue - yüksek konsantrasyon sürdürme zorluğu",
      "Squad rotation crucial - geniş kadro şart"
    ]),
    ideal_opposition: "Teams that play out from back - baskı en etkili oluyor",
    pressing_intensity: 10,
    defensive_line_height: 9,
    width: 9,
    tempo: 10,
    risk_level: 8,
    physicality_requirement: 10,
    technical_requirement: 7,
    tactical_complexity: 7,
    build_up_play: "direct",
    passing_style: "vertical",
    passing_directness: 8,
    defensive_approach: "high-press with gegenpress",
    attacking_approach: "direct vertical football",
    compactness: "compact",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "flat",
    required_player_profiles: JSON.stringify({
      GK: "Shot-stopper, brave in 1v1s, good distribution, comfortable off line",
      RB_LB: "Athletic fullbacks, endless stamina, good crossing, can defend 1v1",
      CB: "Fast center-backs, comfortable high line, aggressive, good at reading play",
      CDM: "Box-to-box or destroyer, high work-rate, press-resistant, tackles",
      CM: "8s with incredible stamina, press, create, score, defend - complete midfielders",
      Wingers: "Pace, direct dribbling, scoring threat, work-rate for pressing",
      ST: "Mobile striker, presses from front, links play, scores, works for team"
    }),
    key_positions: JSON.stringify([
      "Fullbacks - overlap attacks, recovery defending",
      "Box-to-box midfielders (8s) - engine room",
      "Wide forwards - pace and pressing triggers"
    ]),
    famous_teams: JSON.stringify([
      "Borussia Dortmund 2010-2015 (Klopp)",
      "Liverpool 2015-present (Klopp)",
      "RB Leipzig (Hasenhüttl, Nagelsmann variants)"
    ]),
    famous_coaches: JSON.stringify([
      "Jurgen Klopp - gegenpressing'in babası",
      "Ralph Hasenhüttl - Klopp tarzını uyarladı",
      "Julian Nagelsmann - modern gegenpress varyantları"
    ]),
    famous_matches: JSON.stringify([
      "Liverpool 4-0 Barcelona (2019 CL Semi) - Tarihi geri dönüş",
      "Dortmund 4-1 Real Madrid (2013 CL Semi) - Gegenpress klinik",
      "Liverpool 2-1 Tottenham (2019 CL Final) - Zirvede şampiyonluk"
    ]),
    variants: JSON.stringify([
      "4-2-3-1 variant - extra CDM for stability",
      "4-4-2 in defense - converts when defending",
      "3-4-3 aggressive - one CB drops as CDM"
    ]),
    in_possession_shape: "Yüksek beklerle 2-3-5 oluşturan 4-3-3, geniş forvetler savunmayı gerer, hızlı dikey paslar",
    out_of_possession_shape: "Tetiklemeye göre 4-3-3 yüksek baskı veya 4-5-1 orta blok, kompakt ve agresif",
    transition_to_attack: "Top kazanımı → anında dikey pas veya taşıma, rakip organize olmadan boşlukları kullan, hız kritik",
    transition_to_defense: "GEGENPRESS - 6 saniyede geri alma, başarısızsa sprint geri, hızlıca yeniden organize",
    corner_attack_strategy: "Bölgesel koşular, ön direk vuruşlar, arka direk hücumlar, anahtar oyuncular için belirli rutinler",
    corner_defense_strategy: "Belirlenmiş hücumcularla bölgesel, ilk temasa odaklanma, hızlı geçişler",
    free_kick_strategy: "Direkt şutlar ve belirli oyunların karışımı, duran toplarda özel antrenman",
    tactical_instructions: `
PRESSING TRIGGERS:
1. Rakip kaleci ayağına aldığında - PRESS
2. Geriye pas - PRESS
3. Belirsiz control - PRESS
4. Kalabalık bölgede - PRESS

TOPA SAHİPKEN:
1. Hızlı vertical passes
2. Fullbacks overlap
3. Wingers stretch defense
4. Striker links and runs channels

TOPSUZ:
1. GEGENPRESS - 6 saniye
2. Team presses together or nobody presses
3. Compact shape
4. Force mistakes

GEÇIŞLER:
- Top kazanımı → GO NOW!
- Top kaybı → PRESS NOW!
- High energy always`,
    player_instructions_by_position: JSON.stringify({
      GK: "Yüksekte süpür, hızlı dağıt, cesur 1v1, yüksek hattı destekle",
      RB_LB: "Sürekli üstle, hızlı kur tar, 1v1 savunma iyi, orta yap",
      CB: "Yüksek hat, agresif düellolar, boşlukları kapat, hızlı toparlanma, dağıt",
      CDM: "Savunmayı koru, oyunu kes, dağıt, arkadan bas",
      RCM_LCM: "Çift yönlü, yüksekten bas, uzaktan şut, hücumları destekle, koşanları takip et",
      RW_LW: "Geniş kal, savunmayı ger, baskı tetikle, 1v1 dribling, içeri keserek şut",
      ST: "Baskı tetikleyicisi, topa çık, kanallara koş, oyunu bağla, şansları bitir"
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 9,
    popularity_current: 8,
    success_rate: 72.8
  },

  {
    name: "3-5-2 Conte Wing-Back System",
    formation: "3-5-2",
    category: "modern",
    style: "balanced",
    era: "2012-present",
    philosophy: `Antonio Conte'nin imza sistemi. 3 stoper ile güçlü savunma, 2 wing-back ile kanat hücumları, 3 orta saha ile kontrol, 2 forvetle tehdit. Kompakt savunma, organize geçişler, counter-attack tehdidi ve set-piece gücü. Takımsal disiplin ve organizasyon zirveye çıkar. 'Suffering' (acı çekme) konsepti - savunmada herkes savaşır.`,
    key_principles: JSON.stringify([
      "Three-man defense - üç stoperde emniyetli savunma",
      "Wing-backs as main width - kanatları wing-backler tutar",
      "Midfield control - 3'lü orta saha dominasyonu",
      "Compact defense - topsuzken sıkı blok (genellikle 5-3-2)",
      "Direct attacking - hızlı ve direkt hücumlar",
      "Physical intensity - fiziksel oyun",
      "Set-piece mastery - duran toplarda mükemmellik",
      "Counter-attacking threat - kontra tehdidi her zaman",
      "Work-rate requirement - herkes çalışmalı",
      "Tactical discipline - disiplin şart"
    ]),
    strengths: JSON.stringify([
      "Solid defense - üçlü stoper çok emniyet li",
      "Wing-back overlaps - kanatlardan sürekli tehdit",
      "Midfield numbers - orta sahada genelde üstünlük",
      "Counter-attacks - hızlı ve etkili kontralar",
      "Aerial dominance - havada güçlü",
      "Set-piece threat - kornerlerde ve serbest vuruşlarda tehlike",
      "Versatility - 5-3-2 ve 3-5-2 arası geçiş",
      "Defensive stability - az gol yenme",
      "Physical dominance - fiziksel üstünlük"
    ]),
    weaknesses: JSON.stringify([
      "Wing-back dependency - wing-backler kritik, yorgunluk/sakatlık büyük sorun",
      "Space between lines - stoper ve orta saha arası boşluk",
      "Requires specific strikers - iki forvet sisteme uygun olmalı",
      "Limited attacking options - hücumda bazen seçenekler kısıtlı",
      "Wide areas in transition - geçişlerde kanatlar açık",
      "Creative midfielder needed - yaratıcı 10 numara şart",
      "Not possession-heavy - topa uzun süre sahip olmayabilir",
      "Requires high fitness - wing-backler özellikle çok koşar",
      "Can be predictable - hücum paternleri öğrenilebilir"
    ]),
    ideal_opposition: "4-3-3 or 4-2-3-1 with wingers - numerical superiority in defense",
    pressing_intensity: 6,
    defensive_line_height: 5,
    width: 8,
    tempo: 6,
    risk_level: 5,
    physicality_requirement: 9,
    technical_requirement: 6,
    tactical_complexity: 6,
    build_up_play: "direct",
    passing_style: "mixed",
    passing_directness: 7,
    defensive_approach: "mid-block with counter-press",
    attacking_approach: "direct with counter-attacks",
    compactness: "very compact",
    defensive_width: "narrow",
    attacking_width: "very wide",
    defensive_shape: "flat three with cover",
    required_player_profiles: JSON.stringify({
      GK: "Shot-stopper, commanding, good distribution",
      LCB_RCB: "Physical, good 1v1, covering spaces, aerial duels",
      CCB: "Ball-playing sweeper, organize defense, distribute",
      RWB_LWB: "Athletic wing-backs, endless stamina, crossing, defending",
      CM: "Box-to-box, work-rate, tackling, passing",
      CAM: "Creative 10, vision, final pass, shooting",
      ST: "Strike partnership - one target man, one mobile/second striker"
    }),
    key_positions: JSON.stringify([
      "Wing-backs - sistemin kalbi, hücum ve savunmada kritik",
      "Central CB (Libero) - oyun kurma ve savunma organizasyonu",
      "Creative midfielder (10) - son pas ve gol tehdidi"
    ]),
    famous_teams: JSON.stringify([
      "Juventus 2011-2014 (Conte) - 3 consecutive Scudetto",
      "Chelsea 2016-17 (Conte) - Premier League champions",
      "Inter Milan 2019-2021 (Conte) - Serie A champions",
      "Italy National Team 2016 Euros (Conte)"
    ]),
    famous_coaches: JSON.stringify([
      "Antonio Conte - bu sistemin ustası",
      "Inzaghi - Conte'den öğrendi, Inter'de uyguladı",
      "Gasperini - Atalanta'da ofansif varyant"
    ]),
    famous_matches: JSON.stringify([
      "Chelsea 3-0 Manchester City (2016) - Tactical masterclass",
      "Italy 2-0 Belgium (Euro 2016) - Conte's tactics shone",
      "Inter 3-0 AC Milan (2021) - Derby dominance"
    ]),
    variants: JSON.stringify([
      "3-4-3 - orta sahada bir eksilme, kanatlarda forvet",
      "5-2-3 in possession - orta saha iki kişi, forvet üç",
      "5-4-1 defensive - ultra defansif versiyon"
    ]),
    in_possession_shape: "Wing-backler yüksekte 3-5-2, hücumda 3-2-5 oluşturur, merkez orta saha bazen stoperler arasına düşer",
    out_of_possession_shape: "5-3-2 kompakt orta blok, wing-backler geri çekilir, dar ve kırması zor",
    transition_to_attack: "Forverlere hızlı ileri paslar, wing-backler kanatlara sprint, rakibin bıraktığı boşlukları kullan",
    transition_to_defense: "Wing-backler geri sprint, üç stoper hattı tutar, orta saha alanı sıkıştırır, mümkünse karşı bas",
    corner_attack_strategy: "Stoperler ve forvetlerle ceza sahasını doldur, bölgesel koşular, kafa uzatmalar, duran toplar çok çalışılmış",
    corner_defense_strategy: "Üç stoperle bölgesel, wing-backler ön ve arka direkleri kapatır, hızlı kontralar",
    free_kick_strategy: "Direkt şutlar ve ceza sahasına ortaların karışımı, belirli rutinler",
    tactical_instructions: `
SAVUNMADA (5-3-2):
1. Wing-backler geri çekilir
2. Üç stoper compact line
3. Orta saha dar ve sıkı
4. İki forvet rakip stoperleri bağlar
5. Block oluştur, uzay verme

HÜCUMDA (3-5-2):
1. Wing-backler çıkar
2. Bir orta saha geri düşebilir (Libero yanı)
3. İki forvet hareket halinde
4. Yaratıcı 10 boşluklarda
5. Direkt ve hızlı

SET PIECE:
- Üç stoper + iki forvet = 5 uzun adam
- Organize rutinler
- Yüksek başarı oranı`,
    player_instructions_by_position: JSON.stringify({
      GK: "Hükümran, savunmayı organize et, ortaları topla, dağıt",
      RCB_LCB: "Geniş stopler kanallara çıkar, agresif, 1v1, wing-backleri destekle",
      CCB: "Libero rolü, dağıt, süpür, tüm savunmayı organize et",
      RWB_LWB: "Sürekli üstle, genişlik sağla, orta yap, hızlı geri gel, 1v1 savun",
      RCM_LCM: "Çift yönlü, bas, müdahale et, hücumları destekle, koşanları takip et",
      CAM: "Hatlar arası, son top, şut, yarat, forverleri bağla",
      RST_LST: "Forvet ortaklığı, biri bekler, biri koşar, ikisi de basar, ikisi de skor yapar"
    }),
    difficulty_to_implement: 6,
    effectiveness_rating: 8,
    popularity_current: 7,
    success_rate: 68.5
  }
  // ... 27 sistem daha eklenecek (token limiti nedeniyle parçalı)
];

console.log('💾 İLK 3 TAKTİK SİSTEM (30\'un 3\'ü) EKLENİYOR...\n');
console.log('📌 Not: Her sistem TAMAMEN detaylı - basit örnekler değil!\n');

// Veritabanına ekle
let completed = 0;
let failed = 0;

function insertSystem(system) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO tactical_systems (
      name, formation, category, style, era, philosophy,
      key_principles, strengths, weaknesses, ideal_opposition,
      pressing_intensity, defensive_line_height, width, tempo, risk_level,
      physicality_requirement, technical_requirement, tactical_complexity,
      build_up_play, passing_style, passing_directness,
      defensive_approach, attacking_approach,
      compactness, defensive_width, attacking_width, defensive_shape,
      required_player_profiles, key_positions,
      famous_teams, famous_coaches, famous_matches,
      variants, in_possession_shape, out_of_possession_shape,
      transition_to_attack, transition_to_defense,
      corner_attack_strategy, corner_defense_strategy, free_kick_strategy,
      tactical_instructions, player_instructions_by_position,
      difficulty_to_implement, effectiveness_rating, popularity_current, success_rate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      system.name, system.formation, system.category, system.style, system.era, system.philosophy,
      system.key_principles, system.strengths, system.weaknesses, system.ideal_opposition,
      system.pressing_intensity, system.defensive_line_height, system.width, system.tempo, system.risk_level,
      system.physicality_requirement, system.technical_requirement, system.tactical_complexity,
      system.build_up_play, system.passing_style, system.passing_directness,
      system.defensive_approach, system.attacking_approach,
      system.compactness, system.defensive_width, system.attacking_width, system.defensive_shape,
      system.required_player_profiles, system.key_positions,
      system.famous_teams, system.famous_coaches, system.famous_matches,
      system.variants, system.in_possession_shape, system.out_of_possession_shape,
      system.transition_to_attack, system.transition_to_defense,
      system.corner_attack_strategy, system.corner_defense_strategy, system.free_kick_strategy,
      system.tactical_instructions, system.player_instructions_by_position,
      system.difficulty_to_implement, system.effectiveness_rating, system.popularity_current, system.success_rate
    ];

    db.run(sql, values, (err) => {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          console.log(`⚠️  ${system.name} - Zaten mevcut`);
        } else {
          console.log(`❌ ${system.name} - Hata: ${err.message}`);
          failed++;
        }
        reject(err);
      } else {
        console.log(`✅ ${system.name} - Eklendi`);
        completed++;
        resolve();
      }
    });
  });
}

// Tüm sistemleri ekle
(async function() {
  for (const system of tacticalSystems) {
    try {
      await insertSystem(system);
    } catch (err) {
      // Continue
    }
  }

  console.log(`\n📊 ÖZET:`);
  console.log(`   ✅ Başarılı: ${completed}`);
  console.log(`   ❌ Başarısız: ${failed}`);
  console.log(`\n✨ Part 1 tamamlandı! 27 sistem daha eklenecek...\n`);

  db.close();
})();
