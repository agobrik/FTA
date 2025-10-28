// PART 1 BATCH 2: MODERN DOMINANT SYSTEMS (Systems 4-10)
// Sistemler 4-10 - Her sistem ULTRA detaylı!

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

const tacticalSystems = [
  {
    name: "4-3-3 Ancelotti Balanced",
    formation: "4-3-3",
    category: "modern",
    style: "balanced",
    era: "2000-present",
    philosophy: `Carlo Ancelotti'nin dengeli ve pragmatik futbol felsefesi. Sistem esnekliği üzerine kurulu - hem savunmada hem hücumda güçlü. Oyuncu kalitesine ve oyun durumuna göre adaptasyon. Tiki-taka kadar kontrol odaklı değil, gegenpress kadar yoğun değil. 'Dengelenmiş futbol' - her pozisyonda kaliteli oyuncularla etkili oyun. Orta saha kontrolü ve hızlı geçişler. Oyunculara özgürlük verme ama taktiksel disiplin koruma dengesi.`,
    key_principles: JSON.stringify([
      "Tactical flexibility - duruma göre adaptasyon yeteneği",
      "Midfield control through quality - üç orta saha ile kontrol",
      "Balanced defense and attack - her iki fazda etkili",
      "Counter-attack when needed - gerektiğinde kontra",
      "Possession when appropriate - uygun durumlarda topa sahip olma",
      "Fullback support in attack - bekler hücuma destek",
      "Fluid front three - forvet üçlüsü akışkan hareket",
      "Quick transitions both ways - her yöne hızlı geçiş",
      "Defensive stability - savunmada güvenlik",
      "Player freedom within structure - yapı içinde oyuncu özgürlüğü"
    ]),
    strengths: JSON.stringify([
      "Versatility - her tarz rakibe karşı etkili",
      "Midfield solidity - orta sahada güçlü",
      "Experienced management - deneyimli yönetim",
      "Adaptable game plans - plan değiştirebilme",
      "Strong in transitions - geçişlerde etkili",
      "Set-piece proficiency - duran toplarda başarılı",
      "Squad rotation capability - kadro rotasyonu iyi",
      "Big-game mentality - büyük maçlarda güçlü",
      "Works with star players - yıldız oyuncularla uyumlu"
    ]),
    weaknesses: JSON.stringify([
      "Can lack identity - belirgin kimlik eksikliği olabilir",
      "Not ultra-pressing - çok yoğun press yapmaz",
      "Not ultra-possession - aşırı top kontrolü aramaz",
      "Requires quality players - kaliteli kadro şart",
      "Can be reactive - bazen reaktif kalabilir",
      "Less innovative - az yenilikçi olabilir",
      "Midfield can be bypassed - orta saha atlanabilir",
      "Relies on individual brilliance - bireysel kaliteye güvenir",
      "Defensive transitions can be slow - savunma geçişleri yavaş olabilir"
    ]),
    ideal_opposition: "Works against most systems due to flexibility - esneklik sayesinde çoğu sisteme karşı etkili",
    pressing_intensity: 6,
    defensive_line_height: 6,
    width: 7,
    tempo: 6,
    risk_level: 5,
    physicality_requirement: 6,
    technical_requirement: 8,
    tactical_complexity: 6,
    build_up_play: "mixed",
    passing_style: "balanced",
    passing_directness: 6,
    defensive_approach: "balanced mid-block",
    attacking_approach: "balanced - possession and counter",
    compactness: "balanced",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "flat four",
    required_player_profiles: JSON.stringify({
      GK: "Reliable shot-stopper, decent distribution, commanding",
      RB_LB: "Modern fullbacks, good going forward and defending, stamina",
      CB: "Strong defenders, good positioning, comfortable on ball",
      CDM: "Controlling midfielder, can be destroyer or playmaker",
      CM: "Complete box-to-box midfielders, technique and work-rate",
      Wingers: "Fast, direct wingers or inside forwards, can score and create",
      ST: "Complete striker, hold-up play, finishing, link play"
    }),
    key_positions: JSON.stringify([
      "Central midfield trio - kontrol merkezi",
      "Versatile striker - forvet her şeyi yapabilmeli",
      "Athletic fullbacks - bekler çok koşmalı"
    ]),
    famous_teams: JSON.stringify([
      "AC Milan 2002-2009 (Ancelotti) - 2 Champions League",
      "Real Madrid 2013-2015 (Ancelotti) - La Decima",
      "Real Madrid 2021-present (Ancelotti 2nd spell) - Champions League 2022, 2024",
      "Chelsea 2009-2011 (Ancelotti) - Double winners"
    ]),
    famous_coaches: JSON.stringify([
      "Carlo Ancelotti - master of balance and man-management",
      "Carlo Ancelotti disciples - pragmatic flexible approach"
    ]),
    famous_matches: JSON.stringify([
      "Real Madrid 4-1 Atletico (2014 CL Final) - La Decima achieved",
      "AC Milan 2-1 Liverpool (2007 CL Final) - Revenge for Istanbul",
      "Chelsea 8-0 Wigan (2010) - Premier League title-winning form",
      "Real Madrid 1-0 Liverpool (2022 CL Final) - 14th European Cup"
    ]),
    variants: JSON.stringify([
      "4-4-2 diamond in midfield - orta sahada elmas",
      "4-2-3-1 defensive variant - savunma versiyonu",
      "3-5-2 against specific opponents - belirli rakiplere karşı"
    ]),
    in_possession_shape: "Bekler ileriye çıkar 4-3-3, önde üçlü savunmayı gerer, orta saha tempoyu kontrol eder",
    out_of_possession_shape: "4-4-2 / 4-5-1 orta blok, kompakt şekil, kanatlar geri gelir",
    transition_to_attack: "Hızlı ama kontrollü, bekleri ve orta sahayı kullan, boşluk varsa forverlere direkt paslar",
    transition_to_defense: "Organize geri çekilme, şekli koru, uygun olduğunda bas",
    corner_attack_strategy: "Bölgesel ve adam adama karışımı, belirli rutinler, uzun oyunculara hedeflenme",
    corner_defense_strategy: "Bölgesel ve adam adam hibrit, güçlü hava hakimiyeti",
    free_kick_strategy: "Çeşitli belirli oyunlar, oyuncu kalitesine bağlı (Kroos, Alaba vb.)",
    tactical_instructions: `
GENEL YAKLAŞIM:
1. Orta sahayı kontrol et
2. Maç durumuna göre adapte ol
3. Oyuncu kalitesine güven
4. Dengeyi koru

TOPA SAHİPKEN:
1. Sabırlı ol ama fırsat varsa hızlı git
2. Bekler destek versin
3. Orta saha üçgenleri oluştursun
4. Forvetler hareket etsin

TOPSUZ:
1. Kompakt blok
2. Orta sahada sıkı duruş
3. Kanatlar geri gelsin
4. Organizeli savun

GEÇİŞLER:
- Hızlı ama kontrollü
- Fırsat varsa hemen git
- Yoksa sabırlı kur`,
    player_instructions_by_position: JSON.stringify({
      GK: "Güvenilir kurtarışlar, savunmayı organize et, düzgün pas",
      RB_LB: "Güvenliyken hücumları destekle, geri gel, genişlik sağla",
      CB: "Sağlam savunma, basit pas, defans hattını organize et",
      CDM: "Savunmayı koru, tempoyu kontrol et, akıllıca dağıt",
      RCM_LCM: "Çift yönlü, bas, yarat, hücum ve savunmayı destekle",
      RW_LW: "Savunmayı ger, 1v1 dribling, içeri keserek şut, geri gel",
      ST: "Topa çık, oyunu bağla, şansları bitir, gerektiğinde bas"
    }),
    difficulty_to_implement: 6,
    effectiveness_rating: 8,
    popularity_current: 8,
    success_rate: 71.2
  },

  {
    name: "4-2-3-1 Mourinho Defensive",
    formation: "4-2-3-1",
    category: "modern",
    style: "defensive",
    era: "2002-present",
    philosophy: `Jose Mourinho'nun 'Special One' felsefesi. Önce savunma, sonra hızlı kontralar. Taktiksel disiplin ve organizasyon zirvede. "Bir gol atarsak, rakip iki atmalı" mantığı. Kompakt mid-block, az risk, klinik kontra ataklar. Takımsal savunma - herkes savunur. Oyuncular rollerini mükemmel bilir. Pragmatik yaklaşım - galibiyet her şeyden önemli. Zihinsel güç ve savaşçı ruh. Set-piece ustası.`,
    key_principles: JSON.stringify([
      "Defensive organization - savunma organizasyonu mükemmel",
      "Compact mid-block - sıkı orta blok",
      "Counter-attacking football - kontra atak futbolu",
      "Minimal risk-taking - minimum risk",
      "Everyone defends - herkes savunur",
      "Tactical discipline - taktiksel disiplin",
      "Clinical finishing - klinik bitiricilik",
      "Set-piece mastery - duran top ustası",
      "Strong mentality - güçlü zihniyet",
      "Winning at all costs - ne pahasına olursa olsun galibiyet"
    ]),
    strengths: JSON.stringify([
      "Defensive solidity - savunmada çok sağlam",
      "Counter-attack threat - kontra tehdidi yüksek",
      "Tactical discipline - disiplin mükemmel",
      "Set-piece goals - duran toplardan gol",
      "Mental strength - zihinsel güç",
      "Big-game experience - büyük maç deneyimi",
      "Organized structure - organize yapı",
      "Low goals conceded - az gol yenme",
      "Difficult to break down - kırması zor"
    ]),
    weaknesses: JSON.stringify([
      "Low possession - düşük top kontrolü",
      "Reactive style - reaktif stil",
      "Can be boring - sıkıcı olabilir",
      "Requires specific players - özel oyuncular gerekli",
      "Against deep blocks struggles - kapalı savunmalara karşı zorlanır",
      "Creative players may suffer - yaratıcı oyuncular sıkılabilir",
      "Not fan-favorite style - taraftar favorisi değil",
      "Negative perception - negatif algı",
      "Injuries to key players critical - anahtar oyuncu sakatlıkları kritik"
    ]),
    ideal_opposition: "Possession-heavy teams that leave space - top kontrolcü ve arkada boşluk bırakan takımlar",
    pressing_intensity: 5,
    defensive_line_height: 4,
    width: 6,
    tempo: 5,
    risk_level: 3,
    physicality_requirement: 8,
    technical_requirement: 6,
    tactical_complexity: 7,
    build_up_play: "direct",
    passing_style: "direct",
    passing_directness: 8,
    defensive_approach: "compact mid-block",
    attacking_approach: "counter-attack",
    compactness: "very compact",
    defensive_width: "narrow",
    attacking_width: "balanced",
    defensive_shape: "flat four with double pivot",
    required_player_profiles: JSON.stringify({
      GK: "Shot-stopper, commanding, good distribution for counters",
      RB_LB: "Defensive-minded fullbacks, disciplined, can support counter-attacks",
      CB: "Strong, physical center-backs, excellent positioning, aerial ability",
      CDM: "Destroyer DM (Makelele type), ball-winner, simple passing, discipline",
      CAM: "Creative playmaker who also works defensively, link defense to attack",
      Wingers: "Fast wingers for counter-attacks, track back defensively",
      ST: "Target man or mobile striker, hold-up play, clinical finishing"
    }),
    key_positions: JSON.stringify([
      "Destroyer DM (Makelele role) - kalkan",
      "Clinical striker - golcü forvet",
      "Hard-working wingers - çalışkan kanatlar"
    ]),
    famous_teams: JSON.stringify([
      "Chelsea 2004-07 (Mourinho) - 2 Premier League, 15 goals conceded in 04/05",
      "Inter Milan 2008-10 (Mourinho) - Treble 2009/10",
      "Real Madrid 2010-13 (Mourinho) - Record 100 points, 121 goals",
      "Porto 2002-04 (Mourinho) - UEFA Cup & Champions League"
    ]),
    famous_coaches: JSON.stringify([
      "Jose Mourinho - The Special One, master of defensive organization",
      "Diego Simeone - Similar philosophy, even more extreme at Atletico"
    ]),
    famous_matches: JSON.stringify([
      "Chelsea 1-0 Barcelona (2012 CL Semi) - Ultimate defensive masterclass",
      "Inter 3-1 Barcelona (2010 CL Semi) - Tactical perfection",
      "Chelsea 2-0 Liverpool (2014) - Parking the bus at Anfield",
      "Porto 3-0 Manchester United (2004 CL) - Announcing himself"
    ]),
    variants: JSON.stringify([
      "4-3-3 with defensive midfielders - savunmacı orta sahalar",
      "4-5-1 ultra defensive - ultra savunmacı",
      "4-4-2 flat with defensive discipline - disiplinli dörtlü"
    ]),
    in_possession_shape: "4-2-3-1 ama temkinli, fazla ilerleme, savunma dengesini koru",
    out_of_possession_shape: "4-4-2 / 4-5-1 kompakt orta blok, merkezde alan verme, kanatlara zorla",
    transition_to_attack: "HIZLI kontra ataklar, hızlı forverlere direkt toplar, boşluğu anında kullan",
    transition_to_defense: "Hızlı geri çekilme, herkes geri, bloğu organize et, güvenli değilse basma",
    corner_attack_strategy: "Fiziksel oyuncularla ceza sahasını doldur, belirli rutinler, klinik bitiricilik",
    corner_defense_strategy: "Belirlenmiş adam adamla bölgesel, fiziksel varlık kritik",
    free_kick_strategy: "Uzaktan direkt şutlar, hedef adamlar için belirli oyunlar",
    tactical_instructions: `
SAV UNMA ÖNCELİĞİ:
1. Compact blok oluştur - dar duruş
2. Orta sahada sıkı duruş
3. Kanatlar geri gelsin
4. Riski minimize et

KONTRA ATAK:
1. Top kazanınca HEMEN dikey pas
2. Hızlı oyuncular koşsun
3. Boşlukları kullan
4. Klinik bitir

DURAN TOPLAR:
- Organize rutinler
- Fiziksel üstünlük kullan
- Zonal savunma

ZİHNİYET:
- Disiplin
- Savaşçılık
- Galibiyet odaklı`,
    player_instructions_by_position: JSON.stringify({
      GK: "Alanına hakim ol, savunmayı organize et, kontralar için hızlı dağıt",
      RB_LB: "Savunma öncelikli, fazla ilerleme, kanatları takip et",
      CB: "Fiziksel savunma, hava düelloları, defans hattını organize et, basit pas",
      LCDM_RCDM: "Savunmayı koru, oyunu kes, basit paslar, taktiksel disiplin",
      CAM: "Oyunu bağla, savunmada çalış, kontra ataklar yarat, skor yap",
      RW_LW: "Her zaman geri gel, hızlı kontra ataklar, 1v1 dribling, klinik",
      ST: "Topa çık, hedef adam, klinik bitiricilik, takım için çalış"
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 8,
    popularity_current: 5,
    success_rate: 69.8
  },

  {
    name: "5-3-2 Mourinho Bus",
    formation: "5-3-2",
    category: "specialized",
    style: "defensive",
    era: "2004-present",
    philosophy: `"Parking the Bus" - Jose Mourinho'nun ultra savunmacı sistem i. Neredeyse tüm takım savunur, rakibe top hakimiyeti verir ama minimal alan bırakır. İki sıra dörtlü, beş stoper, her şeyi kapat. Boşlukları tıka, merkezi kapat, kanatlara zorla. Sabır ve disiplin. Bir an gelir, bir kontra bir gol. "Suffering" (acı çekme) felsefesi - zorluğa göğüs ger, sonunda kazan. Son çare silahı ama etkili.`,
    key_principles: JSON.stringify([
      "Ultra-defensive - aşırı savunmacı",
      "Parking the bus - otobüsü park et",
      "Five-man defense - beş kişi savunma",
      "Deny central space - merkezi kapat",
      "Force play wide - kanatlara zorla",
      "Absorb pressure - baskıyı emmek",
      "Counter when possible - fırsat varsa kontra",
      "Minimal risk - minimum risk",
      "Whole team defends - tüm takım savunur",
      "Mental toughness - zihinsel dayanıklılık"
    ]),
    strengths: JSON.stringify([
      "Extremely hard to break down - kırması çok zor",
      "Very few goals conceded - çok az gol yenme",
      "Frustrates opponents - rakibi sinirlendirir",
      "Effective against strong teams - güçlü takımlara karşı etkili",
      "Set-piece opportunities - duran top fırsatları",
      "Counter-attack threat - kontra tehdidi",
      "Low risk of defeat - yenilme riski düşük",
      "Requires less possession - az top kontrolü yeterli",
      "Protects leads effectively - önü korur"
    ]),
    weaknesses: JSON.stringify([
      "Very negative - çok negatif",
      "Boring to watch - izlemesi sıkıcı",
      "Low scoring - az gol atma",
      "Requires extreme discipline - aşırı disiplin gerekli",
      "Tires players mentally - oyuncuları zihinsel yorar",
      "Fan backlash - taraftar tepkisi",
      "Hard to score - gol atmak zor",
      "Not sustainable long-term - uzun vadede sürdürülemez",
      "Against deep blocks useless - kapalı savunmalara karşı işe yaramaz"
    ]),
    ideal_opposition: "Strong attacking teams with high lines - güçlü hücum yapan ve yüksek savunmalı takımlar",
    pressing_intensity: 2,
    defensive_line_height: 2,
    width: 4,
    tempo: 3,
    risk_level: 1,
    physicality_requirement: 9,
    technical_requirement: 4,
    tactical_complexity: 5,
    build_up_play: "long",
    passing_style: "direct",
    passing_directness: 10,
    defensive_approach: "ultra-low block",
    attacking_approach: "rare counter-attacks",
    compactness: "extremely compact",
    defensive_width: "narrow",
    attacking_width: "minimal",
    defensive_shape: "two banks of four plus striker",
    required_player_profiles: JSON.stringify({
      GK: "Shot-stopper supreme, commanding, brave",
      CB: "Physical defenders, aerial ability, positioning, stamina",
      WB: "Defensive wing-backs, stamina, discipline, can counter occasionally",
      CM: "Defensive midfielders, ball-winners, physical, simple passing",
      ST: "Target men, hold-up play, win headers, lone striker capability"
    }),
    key_positions: JSON.stringify([
      "Five center-backs - beşli stoper hattı",
      "Target man striker - hedef adam forvet",
      "Destroyer midfielders - yıkıcı orta sahalar"
    ]),
    famous_teams: JSON.stringify([
      "Chelsea vs Barcelona 2012 - Classic bus parking at Camp Nou",
      "Chelsea vs Liverpool 2014 - Anfield bus parking ended title hopes",
      "Inter vs Barcelona 2010 - Defensive masterclass",
      "Roma in big games (Mourinho era)"
    ]),
    famous_coaches: JSON.stringify([
      "Jose Mourinho - coined 'parking the bus' term",
      "Diego Simeone - similar ultra-defensive approaches",
      "Tony Pulis - utilized similar defensive systems"
    ]),
    famous_matches: JSON.stringify([
      "Chelsea 0-0 Barcelona (2012 CL Semi 2nd leg) - Ultimate bus parking",
      "Chelsea 2-0 Liverpool (2014) - Killed Liverpool's title dream",
      "Inter 1-0 Barcelona (2010 CL Semi 2nd leg) - Defended with 10 men"
    ]),
    variants: JSON.stringify([
      "5-4-1 with extra midfielder - ekstra orta saha",
      "6-3-1 ultra extreme - ultra aşırı",
      "5-2-3 when needing goal - gol gerektiğinde"
    ]),
    in_possession_shape: "Nadiren topa sahip, sahip olduğunda - 5-3-2 ama çok derin, forverlere uzun toplar",
    out_of_possession_shape: "5-4-1 veya 5-3-2 ultra alçak blok, iki sıra dörtlü, son derece kompakt, tüm alanı kapat",
    transition_to_attack: "Nadir geçişler, hedef adama uzun toplar, ara sıra derinlikten koşanlar",
    transition_to_defense: "Zaten savunmada, ultra kompakt şekli koru, risk yok",
    corner_attack_strategy: "Uzun oyuncuları gönder, kalanlar arkada kal, kontrayı savunmaya hazır ol",
    corner_defense_strategy: "Tüm oyuncular ceza sahasında, bölgesel işaretleme, her şeyi temizle",
    free_kick_strategy: "Ceza sahasına uzun toplar, hedef adamlar, süslemesiz",
    tactical_instructions: `
SAVUNMA SAVUNMA SAVUNMA:
1. 5 stoper - dar hat
2. Orta saha önde blok
3. Merkezi KAPAT
4. Hiç boşluk yok
5. Sabır ve dayanıklılık

NADIR HÜCUMLAR:
1. Uzun top hedef adama
2. İkinci top kazan
3. Nadiren kontra

ZİHNİYET:
- Acı çek
- Sabret
- Savun
- Bir gol yeter`,
    player_instructions_by_position: JSON.stringify({
      GK: "Her şeyi kurtar, ceza sahasına hakim ol, uzun dağıtım",
      RCB_LCB: "Geniş stopler, kanalları savun, havada, fiziksel",
      CCB: "Merkez stoper, organize et, süpür, lider",
      RWB_LWB: "Öncelikle savun, nadiren ileriye git, dayanıklılık, disiplin",
      CM: "Yıkıcılar, oyunu kes, topu kazan, basit paslar, risk yok",
      ST: "Hedef adam, topa çık, kafa kazan, yalnız çalış, nadir servis"
    }),
    difficulty_to_implement: 5,
    effectiveness_rating: 6,
    popularity_current: 2,
    success_rate: 52.3
  },

  {
    name: "3-4-2-1 Tuchel Compact",
    formation: "3-4-2-1",
    category: "modern",
    style: "balanced",
    era: "2015-present",
    philosophy: `Thomas Tuchel'in üçlü savunma felsefesi. Kompaktlık ve organizasyon zirvede. Pressing tuzakları - rakibi kanatlara sıkıştır, orada kalabalığa al. Merkezi kapat, sayısal üstünlük yarat. İki on numara forvetin arkasında yaratıcılık ve bağlantı. Wing-backler genişlik sağlar. Defans güvenli, orta saha kontrollü, hücum esnek. Çok iyi organize edilmiş sistem - herkes ne yapacağını bilir. Minimal gol yeme maksimum organizasyon.`,
    key_principles: JSON.stringify([
      "Three-man defense - üç kişi savunma",
      "Compact defensive block - kompakt savunma bloğu",
      "Pressing traps - baskı tuzakları",
      "Force play wide - kanatlara zorla",
      "Central overload - merkezde sayısal üstünlük",
      "Wing-backs provide width - wing-backler genişlik",
      "Two number 10s create - iki on numara yaratır",
      "Defensive organization - savunma organizasyonu",
      "Tactical flexibility - taktiksel esneklik",
      "Minimal risk in build-up - oyun kurmada minimal risk"
    ]),
    strengths: JSON.stringify([
      "Defensive solidity - savunmada sağlam",
      "Well organized - iyi organize",
      "Hard to break down - kırması zor",
      "Effective pressing - etkili baskı",
      "Numerical superiority centrally - merkezde sayısal üstünlük",
      "Wing-back threats - wing-back tehditleri",
      "Creative number 10s - yaratıcı on numaralar",
      "Clean sheets - gol yememe",
      "Tournament football ideal - turnuva futbolu için ideal"
    ]),
    weaknesses: JSON.stringify([
      "Can lack goals - gol atma eksikliği olabilir",
      "Lone striker isolated - tek forvet izole",
      "Wing-back dependency - wing-backlere bağımlılık",
      "Requires specific players - özel oyuncular gerekli",
      "Can be cautious - temkinli olabilir",
      "Against deep blocks struggles - kapalı savunmalara karşı zorlanır",
      "Less width in attack - hücumda daha az genişlik",
      "Predictable patterns - öğrenilebilir paternler",
      "High fitness demands - yüksek kondisyon talebi"
    ]),
    ideal_opposition: "Teams that play out from back - arkadan oynayan takımlar (pressing trap çalışır)",
    pressing_intensity: 7,
    defensive_line_height: 6,
    width: 7,
    tempo: 6,
    risk_level: 4,
    physicality_requirement: 7,
    technical_requirement: 8,
    tactical_complexity: 8,
    build_up_play: "short",
    passing_style: "patient",
    passing_directness: 5,
    defensive_approach: "compact mid-block with pressing traps",
    attacking_approach: "patient possession",
    compactness: "very compact",
    defensive_width: "narrow",
    attacking_width: "wide through wing-backs",
    defensive_shape: "flat three with midfield cover",
    required_player_profiles: JSON.stringify({
      GK: "Ball-playing goalkeeper, comfortable with feet, command area",
      CB: "Ball-playing center-backs, comfortable in three, good positioning",
      RWB_LWB: "Athletic wing-backs, stamina, crossing, defending",
      CM: "Controlling midfielders, press-resistant, tactical discipline",
      CAM: "Two creative number 10s, vision, movement, finishing",
      ST: "Lone striker, hold-up play, movement, clinical finishing"
    }),
    key_positions: JSON.stringify([
      "Wing-backs - genişlik ve savunma denges i",
      "Two number 10s - yaratıcılık merkezi",
      "Central CB - organize edici"
    ]),
    famous_teams: JSON.stringify([
      "Chelsea 2021 (Tuchel) - Champions League winners",
      "Chelsea 2021-22 (Tuchel) - Defensive solidity",
      "PSG 2018-20 (Tuchel) - CL final 2020",
      "Borussia Dortmund 2015-17 (Tuchel) - DFB-Pokal"
    ]),
    famous_coaches: JSON.stringify([
      "Thomas Tuchel - master of three-back systems",
      "Antonio Conte - influenced Tuchel's Chelsea approach"
    ]),
    famous_matches: JSON.stringify([
      "Chelsea 1-0 Manchester City (2021 CL Final) - Tactical masterclass",
      "Chelsea 2-0 Real Madrid (2021 CL Semi 2nd leg) - Controlled performance",
      "PSG 1-0 RB Leipzig (2020 CL Semi) - Organized display"
    ]),
    variants: JSON.stringify([
      "3-5-2 with one number 10 - tek on numara",
      "3-4-3 with wide forwards - kanat forveti",
      "5-2-3 ultra defensive - ultra savunmacı"
    ]),
    in_possession_shape: "Wing-backler yüksekte 3-4-2-1 / 3-2-4-1, hatlar arası iki 10 numara, tek forvet",
    out_of_possession_shape: "5-2-2-1 / 5-4-1 kompakt orta blok, wing-backler düşer, kanatlarda baskı tuzakları",
    transition_to_attack: "Sabırlı oyun kurma, wing-backleri kullan, 10 numaralar cepleri bulur, fırsat bekle",
    transition_to_defense: "Hızlıca kompakt şekil, wing-backler geri çekil, pas yollarını kapat, tetiklenirse baskı tuzağı",
    corner_attack_strategy: "Stoperler ve forvetle ceza sahasını doldur, wing-backler gönderir veya destekler",
    corner_defense_strategy: "Üç stoperle bölgesel, fiziksel varlık, organize",
    free_kick_strategy: "Uzun oyuncular için belirli oyunlar, spesifik rutinler",
    tactical_instructions: `
BASKIBASKIRALS TRİGGER:
1. Rakip kanatta - BASKIRALL
2. Merkezi kapat
3. Kalabalık oluştur
4. Top kazan

TOPA SAHİPKEN:
1. Sabırlı kur
2. Wing-backler genişlik
3. İki on numara boşluklarda
4. Forvet hareket

SAVUNMADA:
1. 5-4-1 kompakt
2. Merkezi kapat
3. Kanatlara zorla
4. Organize blok`,
    player_instructions_by_position: JSON.stringify({
      GK: "Ayakları iyi, oyun kurmayı destekle, alanına hakim ol",
      RCB_LCB: "Geniş stopler, kanalları savun, wing-backleri destekle, topla rahat",
      CCB: "Merkez stoper, organize et, dağıt, süpür",
      RWB_LWB: "Genişlik sağla, orta yap, geri gel, dayanıklılık kritik",
      RCM_LCM: "Orta sahayı kontrol et, bas, dağıt, taktiksel disiplin",
      RCAM_LCAM: "Hatlar arası, yarat, kombine ol, şut, forveti bağla",
      ST: "Tek forvet, topa çık, hareket, klinik, yalnız çalış"
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 8,
    popularity_current: 7,
    success_rate: 68.9
  },

  {
    name: "4-3-1-2 Ancelotti Diamond",
    formation: "4-3-1-2",
    category: "classic",
    style: "balanced",
    era: "2000s",
    philosophy: `"Christmas Tree" formasyonu - Carlo Ancelotti'nin AC Milan şaheseri. Elmas orta saha ile merkezi dominasyon. Pirlo derin oyun kurucu, Gattuso kalkan, Seedorf ve Kaka ileriye. İki forvet ortaklığı - Shevchenko ve Inzaghi. Kanat yerine beklerin üst lenmesiyle genişlik. Merkezi kontrol tam, orta sahada sayısal üstünlük. Teknik futbol, kısa paslar, kombinasyonlar. Kompakt savunma. Milan'ın altın çağı.`,
    key_principles: JSON.stringify([
      "Diamond midfield - elmas orta saha",
      "Central dominance - merkezi dominasyon",
      "Deep-lying playmaker - derin oyun kurucu (Pirlo)",
      "Destroyer shield - kalkan (Gattuso)",
      "Two advanced midfielders - iki ileri orta saha",
      "Strike partnership - forvet ortaklığı",
      "Fullback overlaps for width - bekler genişlik için üstlenir",
      "Compact defense - kompakt savunma",
      "Technical football - teknik futbol",
      "Short passing combinations - kısa pas kombinasyonları"
    ]),
    strengths: JSON.stringify([
      "Midfield control - orta saha kontrolü",
      "Central overload - merkezde üstünlük (5 oyuncu)",
      "Technical superiority - teknik üstünlük",
      "Strike partnership - forvet ikilisi etkili",
      "Compact shape - kompakt şekil",
      "Difficult to play through middle - merkezden geçmek zor",
      "Great for talented midfielders - yetenekli orta sahalar için harika",
      "Defensive stability - savunma istikrarı",
      "Fluid attacking - akıcı hücum"
    ]),
    weaknesses: JSON.stringify([
      "Lacks natural width - doğal genişlik yok",
      "Fullback dependency - beklere bağımlılık",
      "Vulnerable to wide attacks - kanat hücumlarına açık",
      "Requires specific players - özel oyuncular gerekli",
      "Regista (Pirlo) essential - derin oyun kurucu şart",
      "Against wing play struggles - kanat oyununa karşı zorlanır",
      "Fullbacks leave space - bekler boşluk bırakır",
      "Old-fashioned - eski moda sayılabilir",
      "Less popular nowadays - artık az kullanılır"
    ]),
    ideal_opposition: "Teams without strong wingers - güçlü kanat oyuncusu olmayan takımlar",
    pressing_intensity: 6,
    defensive_line_height: 5,
    width: 5,
    tempo: 6,
    risk_level: 5,
    physicality_requirement: 6,
    technical_requirement: 9,
    tactical_complexity: 7,
    build_up_play: "short",
    passing_style: "tiki-taka",
    passing_directness: 4,
    defensive_approach: "compact mid-block",
    attacking_approach: "possession through middle",
    compactness: "compact",
    defensive_width: "narrow",
    attacking_width: "through fullbacks only",
    defensive_shape: "compact diamond",
    required_player_profiles: JSON.stringify({
      GK: "Reliable, good with feet, organize",
      RB_LB: "Attacking fullbacks, endless stamina, crossing, defend 1v1",
      CB: "Solid defenders, good positioning, comfortable on ball",
      CDM: "Deep-lying playmaker (Regista) - Pirlo type, vision, passing, positioning",
      RCM_LCM: "Box-to-box OR Destroyer (Gattuso) and Carrier (Seedorf type)",
      CAM: "Advanced playmaker, vision, dribbling, shooting (Kaka type)",
      ST: "Strike partnership - one target man, one poacher ideal"
    }),
    key_positions: JSON.stringify([
      "Regista (CDM) - Pirlo role, sistem beyni",
      "Advanced playmaker (CAM) - Kaka role, yaratıcı",
      "Attacking fullbacks - Cafu type, genişlik"
    ]),
    famous_teams: JSON.stringify([
      "AC Milan 2003-2007 (Ancelotti) - 2 Champions League finals",
      "AC Milan 2006/07 - Champions League winners",
      "Brazil national team occasionally",
      "Various Italian teams in 2000s"
    ]),
    famous_coaches: JSON.stringify([
      "Carlo Ancelotti - perfected it at Milan",
      "Italian coaches traditionally - classic Italian approach"
    ]),
    famous_matches: JSON.stringify([
      "AC Milan 2-1 Liverpool (2007 CL Final) - Revenge for Istanbul",
      "AC Milan 3-0 Manchester United (2007 CL Semi) - Dominant display",
      "AC Milan's 2006/07 Champions League campaign"
    ]),
    variants: JSON.stringify([
      "4-4-2 diamond - farklı adlandırma",
      "4-1-2-1-2 - single pivot vurgusu",
      "4-2-1-3 - kanat oyuncuları eklenirse"
    ]),
    in_possession_shape: "Bekler üstlenerek genişlik yaratan 4-3-1-2, orta sahada elmas, iki forvet",
    out_of_possession_shape: "4-4-2 / 4-1-4-1 dar elmas, kompakt, ortayı kapat",
    transition_to_attack: "Elmas üzerinden hızlı paslaşma, Pirlo hücumları başlatır, ileri oyuncular kombine olur",
    transition_to_defense: "Kompakt elmas şekli, kanatlara zorla, merkezi koru",
    corner_attack_strategy: "İki stoper ve forvet ceza sahasına, belirli rutinler",
    corner_defense_strategy: "Bölgesel işaretleme, kompakt, temizle",
    free_kick_strategy: "Pirlo ustalığı - hassas ortalar veya şutlar",
    tactical_instructions: `
ELMAS ORTA SAHA:
1. Pirlo derin - oyun kurar
2. Gattuso kalkan - savunur
3. Seedorf/Kaka ileri - yaratır
4. Merkezi domine et

GENIŞLIK:
- Bekler sürekli üstlenir
- Cafu tüm sahayı koşar
- Forvetler dar kalır

SAVUNMADA:
- Elmas kompakt
- Merkezi kapat
- Kanatlara zorla`,
    player_instructions_by_position: JSON.stringify({
      GK: "Güvenilir, alanına hakim, düzgün dağıtım",
      RB_LB: "Sürekli üstle, genişlik sağla, orta yap, gerektiğinde 1v1 savun",
      CB: "Sağlam savunma, pozisyon, Pirlo'ya dağıt",
      CDM: "Regista - derin oyun kurucu, tempoyu belirle, vizyon, pas (Pirlo)",
      RCM: "Yıkıcı - Pirlo'yu koru, topu kazan, basit paslar (Gattuso)",
      LCM: "Çift yönlü - oyunu bağla, yarat, skor yap (Seedorf)",
      CAM: "İleri oyun kurucu - yarat, dribbling, skor yap (Kaka)",
      RST_LST: "Forvet ortaklığı - biri bekler, biri koşar, ikisi de skor yapar"
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 7,
    popularity_current: 3,
    success_rate: 65.4
  },

  {
    name: "4-3-3 Arteta Inverted FB",
    formation: "4-3-3",
    category: "modern",
    style: "attacking",
    era: "2020-present",
    philosophy: `Mikel Arteta'nın Guardiola'dan öğrendiği ve geliştirdiği sistem. İnverted fullbackler - bekler orta sahaya girer, sayısal üstünlük. Zinchenko sol kanattan orta sahaya geçiş yapar. Pozisyonel futbol ama daha vertikal ve direkt. Topa sahip olma ve hızlı ilerleme dengesi. Arsenal DNA ile Guardiola prensiplerini birleştirme. Yüksek baskı, hızlı geçişler, yaratıcı hücum. Modern futbolun yeni nesli.`,
    key_principles: JSON.stringify([
      "Inverted fullbacks - bekler orta sahaya",
      "Positional play - pozisyonel oyun",
      "Vertical progression - vertikal ilerleme",
      "Half-space occupation - yarı kanat işgali",
      "High pressing - yüksek baskı",
      "Build-up through thirds - kademeli kurma",
      "Quick transitions - hızlı geçişler",
      "Overloads in midfield - orta sahada üstünlük",
      "Wide forwards - geniş forvetler",
      "Arsenal DNA meets Guardiola - Arsenal ruhu + Pep sistemi"
    ]),
    strengths: JSON.stringify([
      "Midfield dominance - orta saha dominasyonu",
      "Numerical superiority centrally - merkezde sayısal üstünlük",
      "Flexible attacking - esnek hücum",
      "High pressing effective - yüksek baskı etkili",
      "Third-man combinations - üçüncü adam kombinasyonları",
      "Creative freedom - yaratıcı özgürlük",
      "Modern tactical approach - modern yaklaşım",
      "Young team development - genç takım gelişimi",
      "Title-challenging quality - şampiyonluk kalitesi"
    ]),
    weaknesses: JSON.stringify([
      "Fullback inversion risky - bek geçişi riskli",
      "Counter-attack vulnerable - kontra açığı",
      "Requires specific players - özel oyuncular gerekli",
      "Fullback injury problems - bek sakatlıkları sorun",
      "High-line risks - yüksek hat riski",
      "Young team inexperience - genç takım deneyimsizlik",
      "Against low blocks hard - kapalı savunmalara karşı zor",
      "Physical teams can trouble - fiziksel takımlar zorlayabilir",
      "Requires patience - sabır gerektirir"
    ]),
    ideal_opposition: "Teams that play out from back - arkadan oynayan takımlar",
    pressing_intensity: 8,
    defensive_line_height: 8,
    width: 8,
    tempo: 7,
    risk_level: 7,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 9,
    build_up_play: "short",
    passing_style: "vertical possession",
    passing_directness: 6,
    defensive_approach: "high press",
    attacking_approach: "positional with vertical progression",
    compactness: "compact",
    defensive_width: "narrow",
    attacking_width: "wide",
    defensive_shape: "asymmetric",
    required_player_profiles: JSON.stringify({
      GK: "Ball-playing (Ramsdale), sweeper-keeper, distribution",
      RB: "Attacking fullback, can stay wide (White)",
      LB: "Inverted fullback, can play midfielder role (Zinchenko)",
      CB: "Ball-playing center-backs, comfortable high line (Saliba, Gabriel)",
      CDM: "Controlling midfielder, receives from defense (Partey)",
      CM: "Box-to-box, half-space occupation, create and score (Odegaard, Rice)",
      Wingers: "Wide forwards, cut inside, score and create (Saka, Martinelli)",
      ST: "Mobile striker, links play, scores (Jesus)"
    }),
    key_positions: JSON.stringify([
      "Inverted LB (Zinchenko) - orta sahaya geçiş",
      "Creative midfielder (Odegaard) - yaratıcı merkez",
      "Wide forwards - kanat forveti"
    ]),
    famous_teams: JSON.stringify([
      "Arsenal 2022-23 (Arteta) - Title challenge, 84 points",
      "Arsenal 2023-24 (Arteta) - Title challenge, evolved system",
      "Arsenal 2024-25 (Arteta) - Continued evolution"
    ]),
    famous_coaches: JSON.stringify([
      "Mikel Arteta - Guardiola disciple, evolved the approach",
      "Pep Guardiola - original inverted fullback innovator"
    ]),
    famous_matches: JSON.stringify([
      "Arsenal 3-1 Tottenham (2023) - Dominant display",
      "Arsenal 2-0 Manchester United (2023) - Tactical superiority",
      "Arsenal 3-2 Manchester United (2023) - Comeback win"
    ]),
    variants: JSON.stringify([
      "4-2-3-1 with double pivot - çift pivot",
      "3-2-5 in possession - topa sahipken",
      "4-4-2 in defense - savunmada"
    ]),
    in_possession_shape: "Zinchenko orta sahaya geçerek 3-2-5 / 2-3-5, geniş forvetler yüksekte, merkezde aşırı yüklenme",
    out_of_possession_shape: "4-4-2 / 4-3-3 yüksek baskı, kompakt, top kaybı zorla",
    transition_to_attack: "Hızlı dikey paslar, yarı kanatları kullan, üçüncü adam koşuları, hızlı ilerleme",
    transition_to_defense: "Anında karşı baskı, başarısızsa hızlı geri çekilme, yüksek hattı organize et",
    corner_attack_strategy: "Ön direğe aşırı yüklenme, derinlikten koşanlar, Odegaard ortası",
    corner_defense_strategy: "Belirlenmiş işaretleyicilerle bölgesel, ilk temasa odaklan",
    free_kick_strategy: "Geniş alanlardan belirli oyunlar, Odegaard orta kalitesi",
    tactical_instructions: `
İNVERTED FULLBACK:
1. Zinchenko orta sahaya
2. Partey yanında double pivot
3. White sağda geniş
4. Asimetrik yapı

TOPA SAHİPKEN:
1. Pozisyonel üstünlük
2. Yarı kanatlarda yük lenme
3. Hızlı vertikal paslar
4. Forvetler geniş

BASKIRALL:
- Yüksek hat
- Agresif press
- Top kazan → hemen golüne git`,
    player_instructions_by_position: JSON.stringify({
      GK: "Ayakları iyi, yüksekte süpür, oyun kurmayı destekle",
      RB: "Geniş kal, hücumu destekle, genişlik sağla (White)",
      LB: "Orta sahaya gir, aşırı yüklenme yarat, oyunu kontrol et (Zinchenko)",
      RCB_LCB: "Yüksek hat, ayakları iyi, boşlukları kapat, agresif",
      CDM: "Pivot, tempoyu kontrol et, dağıt (Partey)",
      RCM_LCM: "Yarı kanatlar, yarat, skor yap, oyunu bağla (Odegaard, Rice)",
      RW_LW: "Geniş, içeri kes, 1v1, skor yap ve yarat (Saka, Martinelli)",
      ST: "Hareketli, oyunu bağla, bas, skor yap (Jesus)"
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 8,
    popularity_current: 8,
    success_rate: 72.6
  },

  {
    name: "4-2-3-1 Ten Hag Possession",
    formation: "4-2-3-1",
    category: "modern",
    style: "attacking",
    era: "2017-present",
    philosophy: `Erik ten Hag'ın Ajax'taki possession sistemi. "Total Football 2.0" - modern Hollanda futbolu. Topa hakimiyet ama Guardiola'dan daha vertikal ve direkt. Hızlı ilerleme, rakip savunmayı organize olmadan yakalama. Yüksek baskı, akışkan rotasyonlar, pozisyon değişimleri. Manchester United'da adaptasyon - daha direkt, daha hızlı geçişler. Hollanda DNA ile modern gereksinimler dengesi. Genç oyuncu gelişimi mükemmel.`,
    key_principles: JSON.stringify([
      "Possession-based - top kontrolü odaklı",
      "Vertical progression - hızlı vertikal ilerleme",
      "Fluid rotations - akışkan rotasyonlar",
      "High pressing - yüksek baskı",
      "Quick transitions - hızlı geçişler",
      "Exploit openings early - boşlukları erken kullan",
      "Position interchanges - pozisyon değişimleri",
      "Ajax philosophy - Ajax felsefesi",
      "Youth development - genç gelişimi",
      "Direct when needed - gerektiğinde direkt"
    ]),
    strengths: JSON.stringify([
      "Possession control - top kontrolü",
      "Quick progression - hızlı ilerleme",
      "Pressing effectiveness - baskı etkinliği",
      "Fluid attacking - akıcı hücum",
      "Develops young players - gençleri geliştirir",
      "Versatile - çok yönlü",
      "Modern approach - modern yaklaşım",
      "Creates chances - şans yaratır",
      "Exciting football - heyecanlı futbol"
    ]),
    weaknesses: JSON.stringify([
      "Requires specific players - özel oyuncular gerekli",
      "High technical demands - yüksek teknik talep",
      "Vulnerable on counter - kontra açığı",
      "Adaptation to league varies - lige göre adaptasyon değişir",
      "Manchester United struggles - Man Utd'da zorluklar",
      "Injuries disrupt system - sakatlıklar sistemi bozar",
      "Against physical teams hard - fiziksel takımlara karşı zor",
      "Different from Ajax at United - United'da Ajax'tan farklı",
      "Work in progress - gelişme aşamasında"
    ]),
    ideal_opposition: "Teams that play out from back - arkadan oynayan takımlar (baskı çalışır)",
    pressing_intensity: 8,
    defensive_line_height: 8,
    width: 7,
    tempo: 8,
    risk_level: 7,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 8,
    build_up_play: "short",
    passing_style: "vertical possession",
    passing_directness: 7,
    defensive_approach: "high press",
    attacking_approach: "possession with quick progression",
    compactness: "compact",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "flat four with double pivot",
    required_player_profiles: JSON.stringify({
      GK: "Ball-playing goalkeeper, comfortable in build-up (Onana)",
      RB_LB: "Attacking fullbacks, technical, can invert or overlap",
      CB: "Ball-playing defenders, high line comfortable, pace",
      CDM: "Double pivot - one controller (De Jong type), one destroyer",
      CAM: "Advanced playmaker, between lines, create and score",
      Wingers: "Fast, direct wingers, 1v1 ability, score and create",
      ST: "Mobile striker, press from front, clinical finishing"
    }),
    key_positions: JSON.stringify([
      "Double pivot - kontrol ve koruma dengesi",
      "Advanced playmaker - yaratıcı on numara",
      "Mobile striker - hareketli forvet"
    ]),
    famous_teams: JSON.stringify([
      "Ajax 2017-2022 (Ten Hag) - Eredivisie titles, CL semi-final 2019",
      "Ajax 2018/19 - Beat Real Madrid and Juventus in CL",
      "Manchester United 2022-present (Ten Hag) - EFL Cup 2023, FA Cup 2024",
      "Utrecht (Ten Hag earlier)"
    ]),
    famous_coaches: JSON.stringify([
      "Erik ten Hag - Ajax total football modernizer",
      "Rinus Michels influence - total football heritage",
      "Guardiola influence - possession principles"
    ]),
    famous_matches: JSON.stringify([
      "Ajax 4-1 Real Madrid (2019 CL) - Stunning victory at Bernabeu",
      "Ajax 2-1 Juventus (2019 CL) - De Ligt header to semi-final",
      "Manchester United 2-0 Newcastle (2023 EFL Cup Final) - First trophy"
    ]),
    variants: JSON.stringify([
      "4-3-3 with single pivot - tek holding",
      "4-4-2 diamond at United - elmas orta saha",
      "3-4-2-1 occasionally - bazen üçlü stoper"
    ]),
    in_possession_shape: "Bir CDM daha derin 4-2-3-1 / 4-1-2-3, kanatlar geniş, hızlı dikey ilerleme",
    out_of_possession_shape: "4-4-2 kompakt yüksek baskı, top kaybı zorla, hızlı karşı baskı",
    transition_to_attack: "HIZLI dikey paslar, boşlukları hemen kullan, yavaş döndürme",
    transition_to_defense: "Hemen karşı bas, başarısızsa hızlıca organize ol, yüksek hat sürdürülür",
    corner_attack_strategy: "Belirli oyunların karışımı, derinlikten koşanlar, uzun oyunculara hedefle",
    corner_defense_strategy: "Öncelikle bölgesel işaretleme, organize",
    free_kick_strategy: "Çeşitli rutinler, personele bağlı",
    tactical_instructions: `
AJAX STYLE:
1. Topa sahip ol AMA hızlı ilerle
2. Boşlukları BEKLEMEDENkarşıla kullan
3. Rotasyonlar ve değişimler
4. Yüksek baskı

MANCHESTER UNITED ADAPTASYON:
1. Daha direkt
2. Daha hızlı geçişler
3. Farklı bloklardan baskı
4. Premier League DNA

GENEL:
- Esnek sistem içinde akışkanlık
- Pozisyon değişimleri
- Rakibi şaşırt`,
    player_instructions_by_position: JSON.stringify({
      GK: "Ayakları iyi, oyun kurmayı destekle, süpür (Onana)",
      RB_LB: "Hücumları destekle, teknik, içeri kesebilir",
      CB: "Yüksek hat, ayakları iyi, agresif, hız",
      LCDM: "Kontrolcü - tempo, dağıtım (Eriksen/De Jong tipi)",
      RCDM: "Yıkıcı - topu kazan, oyunu kes (Casemiro tipi)",
      CAM: "Hatlar arası, yarat, skor yap (Bruno/Mount)",
      RW_LW: "Direkt, 1v1, içeri kes, skor yap (Antony, Rashford, Garnacho)",
      ST: "Hareketli, bas, bağla, bitir (Hojlund)"
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 7,
    popularity_current: 7,
    success_rate: 67.8
  }
];

console.log('💾 TAKTİK SİSTEMLER BATCH 2 (Sistemler 4-10) EKLENİYOR...\n');
console.log('📌 7 sistem - Her biri ULTRA detaylı!\n');

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
        }
        failed++;
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
      // Continue even if error
    }
  }

  console.log(`\n📊 BATCH 2 ÖZET:`);
  console.log(`   ✅ Başarılı: ${completed}`);
  console.log(`   ❌ Başarısız: ${failed}`);
  console.log(`\n✨ Sistemler 4-10 eklendi! Toplam 10/100 sistem tamamlandı.\n`);
  console.log(`📈 İlerleme: %10 - Devam ediyoruz...\n`);

  db.close();
})();
