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
    in_possession_shape: "4-3-3 with fullbacks pushing up, front three stretching defense, midfield controlling tempo",
    out_of_possession_shape: "4-4-2 / 4-5-1 mid-block, compact shape, wingers track back",
    transition_to_attack: "Quick but controlled, use fullbacks and midfield, direct passes to forwards when space available",
    transition_to_defense: "Organized retreat, maintain shape, press when appropriate",
    corner_attack_strategy: "Mix of zonal and man-marking, specific routines, target tall players",
    corner_defense_strategy: "Zonal with man-marking hybird, strong aerial presence",
    free_kick_strategy: "Variety of set plays, depends on player quality (Kroos, Alaba, etc.)",
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
      GK: "Reliable saves, organize defense, decent passing",
      RB_LB: "Support attacks when safe, track back, provide width",
      CB: "Solid defending, simple passing, organize backline",
      CDM: "Shield defense, control tempo, distribute wisely",
      RCM_LCM: "Box-to-box, press, create, support attacks and defense",
      RW_LW: "Stretch defense, 1v1 dribbling, cut inside to shoot, track back",
      ST: "Hold-up play, link play, finish chances, press when needed"
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
    in_possession_shape: "4-2-3-1 but cautious, don't overcommit, keep defensive balance",
    out_of_possession_shape: "4-4-2 / 4-5-1 compact mid-block, deny space centrally, force wide",
    transition_to_attack: "FAST counter-attacks, direct balls to fast forwards, exploit space immediately",
    transition_to_defense: "Quick retreat, everyone back, organize block, no pressing unless safe",
    corner_attack_strategy: "Load the box with physical players, set routines, clinical finishing",
    corner_defense_strategy: "Zonal marking with designated man-markers, physical presence crucial",
    free_kick_strategy: "Direct shots from distance, set plays for target men",
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
      GK: "Command area, organize defense, quick distribution for counters",
      RB_LB: "Defensive priority, don't overcommit, track wingers",
      CB: "Physical defending, aerial duels, organize backline, simple passing",
      LCDM_RCDM: "Shield defense, break play, simple passes, tactical discipline",
      CAM: "Link play, work defensively, create counter-attacks, score",
      RW_LW: "Track back always, fast counter-attacks, 1v1 dribbling, clinical",
      ST: "Hold-up play, target man, clinical finishing, work for team"
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
    in_possession_shape: "Rarely have possession, when have it - 5-3-2 but very deep, long balls to strikers",
    out_of_possession_shape: "5-4-1 or 5-3-2 ultra-low block, two banks of four, extremely compact, deny all space",
    transition_to_attack: "Rare transitions, long balls to target man, runners from deep occasionally",
    transition_to_defense: "Already defending, maintain ultra-compact shape, no risk",
    corner_attack_strategy: "Send tall players, rest stay back, be ready to defend counter",
    corner_defense_strategy: "All players in box, zonal marking, clear everything",
    free_kick_strategy: "Long balls into box, target men, nothing fancy",
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
      GK: "Save everything, command box, long distribution",
      RCB_LCB: "Wide CBs, defend channels, aerial, physical",
      CCB: "Central CB, organize, sweep, leader",
      RWB_LWB: "Defend primarily, rarely go forward, stamina, discipline",
      CM: "Destroyers, break play, win ball, simple passes, no risk",
      ST: "Target man, hold-up, win headers, work alone, rare service"
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
    in_possession_shape: "3-4-2-1 / 3-2-4-1 with wing-backs high, two 10s between lines, lone striker",
    out_of_possession_shape: "5-2-2-1 / 5-4-1 compact mid-block, wing-backs drop, pressing traps on flanks",
    transition_to_attack: "Patient build-up, use wing-backs, number 10s find pockets, wait for opportunity",
    transition_to_defense: "Compact shape quickly, wing-backs retreat, block passing lanes, pressing trap if triggered",
    corner_attack_strategy: "Load box with CBs and striker, wing-backs deliver or support",
    corner_defense_strategy: "Zonal with three CBs, physical presence, organized",
    free_kick_strategy: "Set plays for tall players, specific routines",
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
      GK: "Ball-playing, support build-up, command area",
      RCB_LCB: "Wide CBs, defend channels, support wing-backs, comfortable on ball",
      CCB: "Central CB, organize, distribute, sweep",
      RWB_LWB: "Provide width, cross, track back, stamina crucial",
      RCM_LCM: "Control midfield, press, distribute, tactical discipline",
      RCAM_LCAM: "Between lines, create, combine, shoot, link striker",
      ST: "Lone striker, hold-up, movement, clinical, work alone"
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
    in_possession_shape: "4-3-1-2 with fullbacks overlapping creating width, diamond in midfield, two strikers",
    out_of_possession_shape: "4-4-2 / 4-1-4-1 narrow diamond, compact, deny middle",
    transition_to_attack: "Quick passing through diamond, Pirlo starts attacks, advanced players combine",
    transition_to_defense: "Compact diamond shape, force wide, protect center",
    corner_attack_strategy: "Two CBs and striker into box, set routines",
    corner_defense_strategy: "Zonal marking, compact, clear",
    free_kick_strategy: "Pirlo masterclass - precision deliveries or shots",
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
      GK: "Reliable, command area, decent distribution",
      RB_LB: "Overlap constantly, provide width, cross, defend 1v1 when needed",
      CB: "Solid defending, position, distribute to Pirlo",
      CDM: "Regista - deep playmaker, dictate tempo, vision, passing (Pirlo)",
      RCM: "Destroyer - shield Pirlo, win ball, simple passes (Gattuso)",
      LCM: "Box-to-box - link play, create, score (Seedorf)",
      CAM: "Advanced playmaker - create, dribble, score (Kaka)",
      RST_LST: "Strike partnership - one holds, one runs, both score"
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
    in_possession_shape: "3-2-5 / 2-3-5 with Zinchenko inverting to midfield, wide forwards high, overloads centrally",
    out_of_possession_shape: "4-4-2 / 4-3-3 high press, compact, force turnovers",
    transition_to_attack: "Quick vertical passes, exploit half-spaces, third-man runs, fast progression",
    transition_to_defense: "Immediate counter-press, if failed quick retreat, organize high line",
    corner_attack_strategy: "Overload near post, runners from deep, Odegaard delivery",
    corner_defense_strategy: "Zonal with designated markers, focus on first contact",
    free_kick_strategy: "Set plays from wide areas, Odegaard delivery quality",
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
      GK: "Ball-playing, sweep high, support build-up",
      RB: "Stay wide, support attack, provide width (White)",
      LB: "Invert to midfield, create overload, control game (Zinchenko)",
      RCB_LCB: "High line, ball-playing, cover spaces, aggressive",
      CDM: "Pivot, control tempo, distribute (Partey)",
      RCM_LCM: "Half-spaces, create, score, link play (Odegaard, Rice)",
      RW_LW: "Wide, cut inside, 1v1, score and create (Saka, Martinelli)",
      ST: "Mobile, link play, press, score (Jesus)"
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
    in_possession_shape: "4-2-3-1 / 4-1-2-3 with one CDM deeper, wingers wide, quick vertical progression",
    out_of_possession_shape: "4-4-2 compact high press, force turnovers, quick counter-press",
    transition_to_attack: "FAST vertical passes, exploit openings immediately, don't recycle slowly",
    transition_to_defense: "Counter-press immediately, if failed organize quickly, high line maintained",
    corner_attack_strategy: "Mix of set plays, runners from deep, target tall players",
    corner_defense_strategy: "Zonal marking primarily, organized",
    free_kick_strategy: "Variety of routines, depends on personnel",
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
      GK: "Ball-playing, build-up support, sweep (Onana)",
      RB_LB: "Support attacks, technical, can invert",
      CB: "High line, ball-playing, aggressive, pace",
      LCDM: "Controller - tempo, distribution (Eriksen/De Jong type)",
      RCDM: "Destroyer - win ball, break play (Casemiro type)",
      CAM: "Between lines, create, score (Bruno/Mount)",
      RW_LW: "Direct, 1v1, cut inside, score (Antony, Rashford, Garnacho)",
      ST: "Mobile, press, link, finish (Hojlund)"
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
