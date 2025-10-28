// PART 1 BATCH 3: MODERN DOMINANT SYSTEMS (Systems 11-16)
// Sistemler 11-16 - Her sistem ULTRA detaylı!

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

const tacticalSystems = [
  {
    name: "4-1-4-1 Simeone Defensive",
    formation: "4-1-4-1",
    category: "specialized",
    style: "defensive",
    era: "2011-present",
    philosophy: `"Cholismo" - Diego Simeone'nin savaşçı futbol felsefesi. Atletico Madrid kimliği. Önce savunma, sonra her şey. Ultra kompakt low-block, acı çekme (suffering) kültürü, takımsal disiplin zirvede. Orta alanı tıka, kanatlara zorla, ideal olmayan bölgelerden şut attır. Klinik kontralar. "Defans ilk savunmadır" değil, "Defans tek savunmadır, hücum bonustur." Zihinsel dayanıklılık, fiziksel güç, taktiksel disiplin üçgeni. Şampiyonlar Ligi finalleri, La Liga şampiyonlukları - savunmayla kazanılan başarılar.`,
    key_principles: JSON.stringify([
      "Low block defense - alçak savunma bloğu",
      "Cholismo - acı çekme kültürü",
      "Extreme compactness - aşırı sıkılık",
      "Force wide play - kanatlara zorla",
      "Minimal space centrally - merkezde sıfır boşluk",
      "Clinical counter-attacks - klinik kontralar",
      "Everyone defends - herkes savunur",
      "Tactical discipline supreme - disiplin zirvede",
      "Mental toughness - zihinsel dayanıklılık",
      "Set-piece excellence - duran top mükemmelliği"
    ]),
    strengths: JSON.stringify([
      "Best defense in La Liga - ligde en az gol yiyen",
      "Extremely hard to break - kırması çok zor",
      "Forces poor quality shots - kalitesiz şutlar attırır",
      "50% shots from outside box - şutların %50'si dışarıdan",
      "Counter-attack deadly - kontralar ölümcül",
      "Set-piece threat - duran top tehdidi",
      "Mental strength - zihinsel güç",
      "Big game specialists - büyük maç uzmanı",
      "Never give up - asla pes etmez"
    ]),
    weaknesses: JSON.stringify([
      "Low possession - düşük top kontrolü",
      "Not entertaining - eğlenceli değil",
      "Requires specific players - özel oyuncular şart",
      "Against deep blocks useless - kapalı savunmalara karşı işe yaramaz",
      "Physically exhausting - fiziksel yorucu",
      "Negative perception - negatif algı",
      "Scoring struggles - gol atma zorluğu",
      "Aging squad issues - yaşlanan kadro sorunları",
      "High-intensity unsustainable - yüksek yoğunluk sürdürülemez"
    ]),
    ideal_opposition: "Possession-heavy attacking teams with high lines - top kontrolcü ve yüksek hatlı takımlar",
    pressing_intensity: 4,
    defensive_line_height: 3,
    width: 5,
    tempo: 4,
    risk_level: 2,
    physicality_requirement: 10,
    technical_requirement: 5,
    tactical_complexity: 6,
    build_up_play: "direct",
    passing_style: "long",
    passing_directness: 9,
    defensive_approach: "ultra-low block",
    attacking_approach: "rare clinical counters",
    compactness: "extremely compact",
    defensive_width: "very narrow",
    attacking_width: "balanced",
    defensive_shape: "double bank of four",
    required_player_profiles: JSON.stringify({
      GK: "World-class shot-stopper (Oblak), commanding, reliable",
      RB_LB: "Defensive fullbacks, warriors, discipline, stamina",
      CB: "Physical monsters, aerial ability, leadership (Godin type)",
      CDM: "Destroyer anchor, shield defense, win everything (Rodri type)",
      CM: "Box-to-box warriors, press, tackle, run (Koke, Saul type)",
      Wingers: "Hard-working wide players, track back, occasional counter threat",
      ST: "Lone warrior striker, hold-up, work alone, clinical (Diego Costa type)"
    }),
    key_positions: JSON.stringify([
      "Destroyer CDM - kalkan, her şeyi kazan",
      "Warrior center-backs - savaşçı stooperler (Godin, Savic)",
      "Clinical striker - tek başına çalışabilenforvet"
    ]),
    famous_teams: JSON.stringify([
      "Atletico Madrid 2011-present (Simeone) - 2 La Liga, 2 CL finals",
      "Atletico 2013/14 - La Liga champions, CL final",
      "Atletico 2015/16 - CL final again",
      "Atletico 2020/21 - La Liga champions"
    ]),
    famous_coaches: JSON.stringify([
      "Diego Simeone - El Cholo, Cholismo creator, warrior coach"
    ]),
    famous_matches: JSON.stringify([
      "Atletico 1-0 Barcelona (2014 Liga title decider) - Championship secured",
      "Atletico 0-4 Real Madrid (2014 CL Final) - Heartbreak despite great defense",
      "Atletico 2-0 Barcelona (2016) - Knocked out favorites",
      "Atletico 1-0 Liverpool (2020 CL) - Anfield fortress broken"
    ]),
    variants: JSON.stringify([
      "4-4-2 flat defensive - düz savunmacı",
      "5-4-1 ultra defensive - ultra savunma",
      "4-4-1-1 with 10 behind ball - 10 kişi arkada"
    ]),
    in_possession_shape: "4-1-4-1 / 4-4-2 temkinli oyun kurma, direkt uzun toplar tercih edilir, minimum risk",
    out_of_possession_shape: "4-4-1-1 / 4-4-2 ultra kompakt alçak blok, çifte dörtlü hat, tüm merkezi alanı kapat",
    transition_to_attack: "HIZLI direkt kontralar, forvete uzun toplar, orta sahadan koşanlar arkadaki boşluğu kullanır",
    transition_to_defense: "Zaten savunmada, herkes anında geri, kompakt bloğu hemen yeniden oluştur",
    corner_attack_strategy: "Fiziksel oyuncularla ceza sahasını doldur, Godin/Savic hava tehdidi, organize rutinler",
    corner_defense_strategy: "Bölgesel işaretleme, fiziksel varlık, her şeyi temizle, uzaklaştırmalardan kontra atak",
    free_kick_strategy: "Direkt şutlar (Griezmann), kafa için ceza sahasına ortalar",
    tactical_instructions: `
CHOLISMO:
1. SAVUN - acı çek, savaş
2. Kompakt blok - çok dar
3. Orta alanı KAPAT
4. Kanatlara zorla
5. Kalitesiz şutlar attır

NADIR KONTRALAR:
1. Uzun top Diego Costa'ya
2. Koş arkaya
3. Klinik bitir
4. Geri dön savunmaya

ZİHNİYET:
- Savaşçı ruhu
- Asla pes etme
- Takım için acı çek
- Galibiyet her şeydir`,
    player_instructions_by_position: JSON.stringify({
      GK: "Dünya klasmanı kurtarışlar, alanına hakim ol, kontralar için hızlı dağıt (Oblak)",
      RB_LB: "Önce savun, disiplin, nadiren ileriye git, savaşçılar",
      RCB_LCB: "Fiziksel canavarlar, her şeyi kazan, havada, liderlik (Godin, Savic, Felipe)",
      CDM: "Çapa, yıkıcı, tüm topları kazan, basit paslar (Rodri, Partey tipi)",
      RCM_LCM: "Çift yönlü savaşçılar, bas, müdahale et, kontraları destekle (Koke, Saul)",
      RW_LW: "Savunmada çalış, her zaman geri gel, ara sıra kontra tehdidi",
      ST: "Yalnız savaşçı, topa çık, savaş, klinik bitiricilik (Diego Costa, Suarez, Griezmann)"
    }),
    difficulty_to_implement: 6,
    effectiveness_rating: 8,
    popularity_current: 6,
    success_rate: 67.3
  },

  {
    name: "3-4-3 Gasperini Attack",
    formation: "3-4-3",
    category: "specialized",
    style: "attacking",
    era: "2016-present",
    philosophy: `Gian Piero Gasperini'nin Atalanta mucizesi. Ultra agresif, yüksek baskı, dikey hücum. Adam adama pressleme - her oyuncu bir rakibi marke eder. Wing-backler sürekli geniş, forvet üçlüsü kombinasyon. Yüksek hat ile alan sıkıştırma, baskı sonrası hızlı kontra. "Atalanta DNA" - korkmadan hücum, savunma en iyi hücumdur. Genç oyuncu gelişimi mükemmel. İtalyan futbolunda devrim. Çok goller, çok heyecan. 18.9 tacle per match - ligde en çok.`,
    key_principles: JSON.stringify([
      "Ultra-high press - çok yüksek baskı",
      "Man-marking oriented - adam adama işaretleme",
      "Vertical attacking - dikey hücum",
      "Wing-backs crucial - wing-backler kritik",
      "Combination play front three - forvet üçlüsü kombine",
      "High defensive line - çok yüksek hat",
      "Space compression - alan sıkıştırma",
      "Aggressive transitions - agresif geçişler",
      "Youth development - genç geliştirme",
      "Fearless attacking - korkmadan hücum"
    ]),
    strengths: JSON.stringify([
      "High goal-scoring - çok gol atma",
      "Exciting football - heyecanlı futbol",
      "Pressing effectiveness - baskı çok etkili",
      "Develops young talent - gençleri geliştirir",
      "Unpredictable attacks - öngörülemez hücumlar",
      "Wing-back threat - wing-back tehdidi",
      "Champions League success - Şampiyonlar Liginde başarı",
      "Team spirit - takım ruhu güçlü",
      "Overperforms budget - bütçe üstü performans"
    ]),
    weaknesses: JSON.stringify([
      "High risk - yüksek risk",
      "Concedes goals - gol yer",
      "Defensive vulnerabilities - savunma açıkları",
      "High-line exploitation - yüksek hat istismar edilir",
      "Physically exhausting - fiziksel yorucu",
      "Against deep blocks hard - kapalı savunmalara karşı zor",
      "Requires specific players - özel oyuncular gerekli",
      "Aging players decline - yaşlı oyuncular düşer",
      "Sustainability questions - sürdürülebilirlik sorgulanır"
    ]),
    ideal_opposition: "Teams that build from back - arkadan kuran takımlar (baskı çok etkili)",
    pressing_intensity: 10,
    defensive_line_height: 10,
    width: 10,
    tempo: 9,
    risk_level: 9,
    physicality_requirement: 9,
    technical_requirement: 7,
    tactical_complexity: 7,
    build_up_play: "short",
    passing_style: "vertical",
    passing_directness: 8,
    defensive_approach: "ultra-high press man-oriented",
    attacking_approach: "vertical direct attack",
    compactness: "high-line compressed",
    defensive_width: "very wide",
    attacking_width: "extremely wide",
    defensive_shape: "high three with aggressive press",
    required_player_profiles: JSON.stringify({
      GK: "Sweeper-keeper, brave, comfortable with feet",
      CB: "Fast center-backs, high-line comfortable, aggressive, ball-playing",
      RWB_LWB: "Athletic wing-backs, endless stamina, crossing, defend and attack",
      CM: "Box-to-box, high work-rate, press, tackle, create",
      Wingers: "Inside forwards, dribble, score, combine, press",
      ST: "Mobile striker, combination play, movement, scoring"
    }),
    key_positions: JSON.stringify([
      "Wing-backs - sistemin motoru, her şeyi yapar",
      "Front three - forvet üçlüsü kombinasyonları",
      "Box-to-box midfielders - motor orta sahalar"
    ]),
    famous_teams: JSON.stringify([
      "Atalanta 2016-present (Gasperini) - CL regulars, exciting football",
      "Atalanta 2019/20 - 98 goals in Serie A, CL quarter-finals",
      "Atalanta 2020/21 - Coppa Italia finalists, CL knockouts",
      "Atalanta 2024 - Europa League winners"
    ]),
    famous_coaches: JSON.stringify([
      "Gian Piero Gasperini - revolutionary Italian coach, Atalanta miracle worker"
    ]),
    famous_matches: JSON.stringify([
      "Atalanta 4-1 Valencia (2020 CL) - Dominant attacking display",
      "Atalanta 8-4 Lecce (2020) - 12-goal thriller",
      "Atalanta 5-0 Milan (2019) - Devastated big opponents",
      "Atalanta 3-0 Liverpool (2024 UEL) - Europa League glory"
    ]),
    variants: JSON.stringify([
      "3-4-2-1 with two 10s - iki on numara",
      "3-4-1-2 with striker pair - forvet ikilisi",
      "3-5-2 occasionally - bazen beşli orta saha"
    ]),
    in_possession_shape: "Wing-backler son derece yüksek 3-4-3 / 3-2-5, önde üçlü kombine oluyor, dikey ilerleme",
    out_of_possession_shape: "3-4-3 ultra yüksek baskı, adam adam yönlü işaretleme, alanı sıkıştır, hata zorla",
    transition_to_attack: "ANINDA hızlı dikey hücum, stoper ve bek arası boşlukları kullan, kombinasyon oyunu",
    transition_to_defense: "Hemen yüksek bas, geçilirse sprint geri, agresif toparlanma",
    corner_attack_strategy: "Derinlikten koşanlar, kombinasyon oyunları, wing-backler gönderir",
    corner_defense_strategy: "Adam adama işaretleme, agresif, temizle ve kontra",
    free_kick_strategy: "Ceza sahasına ortalar, derinlikten koşanlar",
    tactical_instructions: `
ULTRA BASKIRALL:
1. Adam adama marke
2. Yüksek hat - alan sıkıştır
3. Agresif baskı
4. Top kazan → hemen golüne git

HÜCUM:
1. Wing-backler geniş kal
2. Forvet üçlüsü kombine
3. Dikey paslar
4. Hızlı progresyon

ATALANTA DNA:
- Korkma
- Hücum et
- Gol at
- Eeğlenceli fut bol`,
    player_instructions_by_position: JSON.stringify({
      GK: "Süpürücü, cesur, yüksek hattı destekle, iyi dağıt",
      RCB_LCB: "Geniş stopler, hızlı, kanalları kapat, agresif, yüksekte rahat",
      CCB: "Merkez stoper, organize et, dağıt, süpür",
      RWB_LWB: "Sürekli geniş, dayanıklılık kritik, orta yap, savun, hücum et (Gosens tipi)",
      RCM_LCM: "Çift yönlü, bas, yarat, skor yap, sonsuz koşu (Freuler, De Roon)",
      RW_LW: "İçeri kesen forvetler, içeri kes, skor yap, kombine ol (Ilicic, Muriel, Lookman)",
      ST: "Hareketli dokuz, oyunu bağlar, koşar, skor yapar (Zapata, Scamacca)"
    }),
    difficulty_to_implement: 7,
    effectiveness_rating: 7,
    popularity_current: 6,
    success_rate: 64.8
  },

  {
    name: "4-4-2 Ranieri Leicester Miracle",
    formation: "4-4-2",
    category: "classic",
    style: "balanced",
    era: "2015-16",
    philosophy: `Futbol tarihinin en büyük mucizesi - 5000/1 şampiyonluk. Claudio Ranieri'nin basit ama mükemmel planı. İki sıra dörtlü, kompakt blok, disiplinli savunma. N'Golo Kante her yerde, Drinkwater organizasyon. Bekler orta çizgide durur, boşluk vermez. Top kazanınca HIZLA Vardy'ye, Mahrez sihir yapar. Pizza şampiyonluğu - oyunculara pizza sözü vermişti. Takım ruhu, inanılmaz çalışma, klinik kontralar. Underdog hikayelerin en büyüğü.`,
    key_principles: JSON.stringify([
      "Two banks of four - iki sıra dörtlü",
      "Compact defensive block - kompakt savunma",
      "Midfield line at halfway - orta saha orta çizgide",
      "Force wide play - kanatlara zorla",
      "Lightning counters - şimşek kontralar",
      "Vardy pace exploitation - Vardy hızını kullan",
      "Mahrez magic - Mahrez sihri",
      "Kante everywhere - Kante her yerde",
      "Team spirit supreme - takım ruhu zirvede",
      "Simple but effective - basit ama etkili"
    ]),
    strengths: JSON.stringify([
      "Perfect team chemistry - mükemmel kimya",
      "Kante defensive mastery - Kante savunma ustası (175 tackles, 156 interceptions)",
      "Vardy pace threat - Vardy hız tehdidi (24 goals)",
      "Mahrez creativity - Mahrez yaratıcılığı (17 goals, 11 assists)",
      "Defensive discipline - savunma disiplini",
      "Counter-attack deadly - kontralar ölümcül",
      "Set-piece threat - duran top tehdidi",
      "Underdog mentality - ezilen takım zihniyeti",
      "Incredible belief - inanılmaz inanç"
    ]),
    weaknesses: JSON.stringify([
      "Requires perfect execution - mükemmel uygulama gerekli",
      "Unsustainable long-term - uzun vadede sürdürülemez",
      "Relied on Kante - Kante'ye bağımlılık",
      "Limited possession - sınırlı top kontrolü",
      "Against deep blocks hard - kapalı savunmalara karşı zor",
      "Squad depth issues - kadro derinliği sorunları",
      "Aging players - yaşlanan oyuncular",
      "One-season wonder - tek sezonluk mucize",
      "Hard to replicate - tekrarlaması zor"
    ]),
    ideal_opposition: "Possession teams that push high - yüksek oynayan top kontrolcü takımlar",
    pressing_intensity: 6,
    defensive_line_height: 4,
    width: 6,
    tempo: 7,
    risk_level: 5,
    physicality_requirement: 7,
    technical_requirement: 6,
    tactical_complexity: 4,
    build_up_play: "direct",
    passing_style: "direct",
    passing_directness: 9,
    defensive_approach: "compact mid-block",
    attacking_approach: "lightning counter-attack",
    compactness: "very compact",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "two flat banks of four",
    required_player_profiles: JSON.stringify({
      GK: "Reliable shot-stopper (Schmeichel), commanding",
      RB_LB: "Defensive fullbacks, Simpson and Fuchs - disciplined, hard-working",
      CB: "Physical center-backs, Huth and Morgan - aerial, leadership, no-nonsense",
      CM: "Kante - destroyer, everywhere, 175 tackles | Drinkwater - organize, distribute",
      Wingers: "Mahrez - magic, dribbles, scores | Albrighton - work-horse, crosses",
      ST: "Vardy - pace, runs in behind, clinical | Okazaki - work-rate, link play"
    }),
    key_positions: JSON.stringify([
      "N'Golo Kante - sistem motoru, her yerde, her şey",
      "Jamie Vardy - hız ve bitiricilik, kontra silahı",
      "Riyad Mahrez - sihirbaz, yaratıcılık kaynağı"
    ]),
    famous_teams: JSON.stringify([
      "Leicester City 2015-16 (Ranieri) - 5000/1 Premier League champions - THE miracle"
    ]),
    famous_coaches: JSON.stringify([
      "Claudio Ranieri - Tinkerman became miracle worker"
    ]),
    famous_matches: JSON.stringify([
      "Leicester 3-1 Manchester City (Feb 2016) - Statement win",
      "Leicester 1-0 Crystal Palace (Oct 2015) - Vardy record streak",
      "Tottenham 2-2 Chelsea (May 2016) - Leicester crowned champions",
      "Leicester 2-0 Sunderland (April 2016) - Towards the title"
    ]),
    variants: JSON.stringify([
      "4-4-1-1 with Okazaki deeper - Okazaki daha derin",
      "4-5-1 defensive - savunmacı",
      "4-2-4 on counter - kontrada"
    ]),
    in_possession_shape: "Sabırlı 4-4-2, mümkün olduğunda Vardy'ye direkt toplar, Mahrez driblingler yapar",
    out_of_possession_shape: "Kompakt 4-4-2, orta saha hattı orta çizgide, kanatlara zorla, pas yollarını kes, hata bekle",
    transition_to_attack: "ŞİMŞEK HIZINDA - kanalları koşan Vardy'e anında top, Mahrez destekler, klinik bitiricilik",
    transition_to_defense: "Organize geri çekilme, kompakt şekli koru, dörtlü hatlar, disiplinli",
    corner_attack_strategy: "Huth ve Morgan ceza sahasına, belirli rutinler",
    corner_defense_strategy: "Bölgesel işaretleme, fiziksel varlık, temizle",
    free_kick_strategy: "Mahrez ortaları, Huth/Morgan havada hedefler",
    tactical_instructions: `
SAVUNMA:
1. İki sıra dörtlü
2. Orta çizgide bekle
3. Kompakt kal
4. Kanatlara zorla
5. Kante her şeyi kazan

KONTRA:
1. Topu kazandın mı → VARDY'YE
2. Mahrez sihir yap
3. Hızlı bitir
4. Geri dön

MUCİZE FORMÜL:
- Basit planı mükemmel uygula
- İnan
- Çalış
- Pizza ye (Ranieri sözü)`,
    player_instructions_by_position: JSON.stringify({
      GK: "Güvenilir kurtarışlar, savunmayı organize et (Schmeichel)",
      RB_LB: "Savunma disiplini, fazla ilerleme (Simpson, Fuchs)",
      CB: "Fiziksel savunma, havada, liderlik (Huth, Morgan)",
      RCM: "KANTE - yok et, müdahale et, her şeyi kazan, her yerde",
      LCM: "Drinkwater - organize et, kontrol et, dağıt",
      RW: "MAHREZ - sihir, dribbling, yarat, skor yap",
      LW: "Albrighton - çalışkanlık, geri gel, orta yap",
      RST: "VARDY - kanalları koş, hız, klinik bitiricilik, asla ofsayt",
      LST: "Okazaki - takım için çalış, bas, oyunu bağla"
    }),
    difficulty_to_implement: 4,
    effectiveness_rating: 10,
    popularity_current: 4,
    success_rate: 78.2
  },

  {
    name: "4-3-3 Zidane Balanced Pragmatic",
    formation: "4-3-3",
    category: "modern",
    style: "balanced",
    era: "2016-2021",
    philosophy: `Zinedine Zidane'ın pragmatik ve dengeli futbolu. BBC (Bale-Benzema-Cristiano) dönemi. Taktikte esneklik - her rakibe farklı plan. Orta saha üçlüsü (Kroos-Modric-Casemiro) mükemmel denge. Savunmada organizasyon, hücumda bireysel kalite. "Zidane taktiksizdir" eleştirileri - ama 3 Şampiyonlar Ligi üst üste. Oyuncu yönetimi harika, rotasyon ustası, büyük maç DNA'sı. Basit tutma, oyuncuların parlamas ına izin ver. Real Madrid'in en başarılı antrenörü.`,
    key_principles: JSON.stringify([
      "Balanced approach - dengeli yaklaşım",
      "Tactical flexibility - taktiksel esneklik",
      "Midfield trio excellence - orta saha üçlüsü mükemmeli",
      "Individual quality - bireysel kalite",
      "Defensive organization - savunma organizasyonu",
      "Big-game mentality - büyük maç zihniyeti",
      "Player management - oyuncu yönetimi",
      "Squad rotation - kadro rotasyonu",
      "Pragmatic adaptability - pragmatik adaptasyon",
      "Champions League DNA - Şampiyonlar Ligi DNA'sı"
    ]),
    strengths: JSON.stringify([
      "3 consecutive Champions Leagues - 3 üst üste ŞL",
      "Big-game specialist - büyük maç uzmanı",
      "Perfect squad management - mükemmel kadro yönetimi",
      "Midfield control - orta saha kontrolü",
      "Defensive balance - savunma dengesi",
      "Individual brilliance - bireysel parlaklık (CR7, Modric, Kroos)",
      "Tactical adaptability - taktiksel adaptasyon",
      "Experienced leadership - deneyimli liderlik",
      "Winning mentality - kazanan zihniyeti"
    ]),
    weaknesses: JSON.stringify([
      "Lacks clear identity - net kimlik eksikliği",
      "Relies on star players - yıldız oyunculara güvenir",
      "Domestic struggles - ligde zorluklar",
      "Less innovative - az yenilikçi",
      "Aging squad - yaşlanan kadro",
      "Tactical simplicity criticized - taktiksel sadelik eleştirilir",
      "Second season syndrome - ikinci sezon sendromu (La Liga düşüşü)",
      "BBC dependency - BBC bağımlılığı",
      "Reactive rather than proactive - reaktif, proaktif değil"
    ]),
    ideal_opposition: "Works against most due to adaptability - adaptasyon sayesinde çoğuna karşı çalışır",
    pressing_intensity: 6,
    defensive_line_height: 6,
    width: 7,
    tempo: 6,
    risk_level: 5,
    physicality_requirement: 6,
    technical_requirement: 9,
    tactical_complexity: 5,
    build_up_play: "mixed",
    passing_style: "controlled",
    passing_directness: 6,
    defensive_approach: "balanced organized",
    attacking_approach: "balanced with individual brilliance",
    compactness: "balanced",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "flat four with Casemiro shield",
    required_player_profiles: JSON.stringify({
      GK: "World-class shot-stopper (Navas, Courtois)",
      RB_LB: "Reliable fullbacks, Carvajal and Marcelo - attack and defend",
      CB: "Experienced center-backs, Ramos and Varane - leadership, quality",
      CDM: "Destroyer anchor - Casemiro, shield defense, break play",
      CM: "Modric - magic, control | Kroos - quarterback, distribution",
      RW: "Bale - pace, power, goals",
      LW: "Cristiano Ronaldo - GOAT, goals, everything",
      ST: "Benzema - link play, hold-up, goals, unselfish"
    }),
    key_positions: JSON.stringify([
      "Modric-Kroos-Casemiro trio - perfect balance",
      "Cristiano Ronaldo - decisive factor",
      "Sergio Ramos - leader and clutch goals"
    ]),
    famous_teams: JSON.stringify([
      "Real Madrid 2015-18 (Zidane 1st spell) - 3 consecutive Champions Leagues",
      "Real Madrid 2016/17 - La Liga + Champions League double",
      "Real Madrid 2019-21 (Zidane 2nd spell) - La Liga 2019/20"
    ]),
    famous_coaches: JSON.stringify([
      "Zinedine Zidane - pragmatic winner, player whisperer"
    ]),
    famous_matches: JSON.stringify([
      "Real Madrid 4-1 Juventus (2017 CL Final) - Dominant performance",
      "Real Madrid 3-1 Liverpool (2018 CL Final) - Third consecutive CL",
      "Real Madrid 3-1 PSG (2018 CL R16) - Comeback from first leg",
      "Real Madrid 3-0 Atletico (2016 CL Final ET) - La Decima defense"
    ]),
    variants: JSON.stringify([
      "4-4-2 diamond - elmas orta saha",
      "4-3-1-2 with Isco - Isco ile",
      "4-2-3-1 occasionally - bazen"
    ]),
    in_possession_shape: "Dengeli 4-3-3, Marcelo yüksek, Kroos-Modric kontrol, BBC hücum tehdidi",
    out_of_possession_shape: "Dengeli orta blok 4-4-2 / 4-5-1, Casemiro kalkan, organize",
    transition_to_attack: "Dengeli ilerleme, orta saha kalitesini kullan, uygun olduğunda BBC'ye direkt",
    transition_to_defense: "Organize geri çekilme, Casemiro kalkan, şekli koru",
    corner_attack_strategy: "Ramos hava tehdidi, Kroos ortası, organize rutinler",
    corner_defense_strategy: "Adam adamla bölgesel, Ramos organize eder",
    free_kick_strategy: "Cristiano şutları, Kroos/Modric ortaları, belirli oyunlar",
    tactical_instructions: `
DENGE:
1. Orta sahayı kontrol et
2. Organize savun
3. Büyük oyunculara güven
4. Her maça adapte ol

ZİDANE YOLU:
- Basit tut
- Oyuncular parlasın
- Rotasyon yap
- Büyük maçlarda kazan

ORTA SAHA TRİOSU:
- Casemiro kalkan
- Kroos kontrol
- Modric sihir`,
    player_instructions_by_position: JSON.stringify({
      GK: "Dünya klasmanı kurtarışlar, organize et (Navas, Courtois)",
      RB: "Carvajal - üstle, savun, istikrar",
      LB: "Marcelo - hücum et, genişlik, yaratıcılık",
      CB: "Ramos - liderlik, kritik anlar | Varane - hız, kapsama",
      CDM: "Casemiro - yok et, koru, basit paslar",
      RCM: "Kroos - oyun kurucu, tempoyu kontrol et, dağıtım",
      LCM: "Modric - sihir, dribbling, kontrol, yarat",
      RW: "Bale - hız, güç, içeri kes, şut",
      LW: "Cristiano - HER ŞEY, skor yap, maçlara karar ver",
      ST: "Benzema - oyunu bağla, fedakar, topa çık, skor yap"
    }),
    difficulty_to_implement: 5,
    effectiveness_rating: 9,
    popularity_current: 6,
    success_rate: 73.8
  },

  {
    name: "3-5-2 Inzaghi Modern Flexible",
    formation: "3-5-2",
    category: "modern",
    style: "balanced",
    era: "2020-present",
    philosophy: `Simone Inzaghi'nin Conte'den devraldığı ve evrimleştirdiği sistem. 3-5-2 ama çok daha akışkan ve ofansif. Pozisyonel katılık yok - oyuncular boşluklara göre hareket. Conte savunmacı, Inzaghi hücumcuydu - şimdi savunma + hücum dengesi mükemmel. Lazio'dan Inter'e evrim. Wing-backler kritik, orta saha rotasyonları, forvet ikilileri. Possession-based ama hızlı geçişli. Taktikte esneklik ve özgürlük. Scudetto 2021, Şampiyonlar Ligi finali 2023.`,
    key_principles: JSON.stringify([
      "Modern flexible 3-5-2 - modern esnek",
      "Positional fluidity - pozisyonel akışkanlık",
      "Occupy available space - boş alanları işgal et",
      "Wing-backs crucial - wing-backler kritik",
      "Midfield rotations - orta saha rotasyonları",
      "Possession-based with quick transitions - topa sahip + hızlı geçiş",
      "Evolution from Conte - Conte'den evrim",
      "Defensive solidity - savunma sağlamlığı",
      "Attacking fluidity - hücum akışkanlığı",
      "Balanced approach - dengeli yaklaşım"
    ]),
    strengths: JSON.stringify([
      "Scudetto winners - seri A şampiyonu",
      "Champions League finalists - ŞL finalisti",
      "Balanced football - dengeli futbol",
      "Flexible system - esnek sistem",
      "Strong defense - güçlü savunma",
      "Attacking threat - hücum tehdidi",
      "Player development - oyuncu gelişimi",
      "Tactical intelligence - taktiksel zeka",
      "Big-game performance - büyük maç performansı"
    ]),
    weaknesses: JSON.stringify([
      "Wing-back dependency - wing-back bağımlılığı",
      "Against ultra-defensive hard - ultra savunmacılara karşı zor",
      "Requires intelligent players - akıllı oyuncular gerekli",
      "Space between lines - hatlar arası boşluk",
      "Consistency issues - istikrar sorunları",
      "Squad depth needed - kadro derinliği şart",
      "High fitness demands - yüksek kondisyon talebi",
      "Tactical complexity - taktiksel karmaşıklık",
      "European struggles occasionally - Avrupada bazen zorluk"
    ]),
    ideal_opposition: "Teams with traditional wingers - geleneksel kanat oyunculu takımlar",
    pressing_intensity: 7,
    defensive_line_height: 6,
    width: 8,
    tempo: 7,
    risk_level: 6,
    physicality_requirement: 7,
    technical_requirement: 8,
    tactical_complexity: 8,
    build_up_play: "short",
    passing_style: "possession with vertical",
    passing_directness: 6,
    defensive_approach: "organized mid-block",
    attacking_approach: "possession with quick transitions",
    compactness: "balanced",
    defensive_width: "balanced",
    attacking_width: "very wide",
    defensive_shape: "three with cover",
    required_player_profiles: JSON.stringify({
      GK: "Modern goalkeeper, feet comfortable (Handanovic, Onana)",
      CB: "Ball-playing center-backs, Bastoni left, de Vrij center, Skriniar right",
      RWB_LWB: "Athletic wing-backs, Perisic/Dimarco left, Dumfries right - attack and defend",
      CM: "Intelligent midfielders, Barella, Calhanoglu, Brozovic - control and create",
      ST: "Strike partnership - Lautaro and Dzeko/Lukaku - complementary"
    }),
    key_positions: JSON.stringify([
      "Wing-backs - sistemin motoru",
      "Versatile midfielders - çok yönlü orta sahalar",
      "Complementary strike pair - tamamlayıcı forvet ikilisi"
    ]),
    famous_teams: JSON.stringify([
      "Inter Milan 2021-present (Inzaghi) - Scudetto 2021, CL final 2023",
      "Lazio 2016-21 (Inzaghi) - Coppa Italia, developed 3-5-2",
      "Inter 2022/23 - Champions League final, Coppa Italia"
    ]),
    famous_coaches: JSON.stringify([
      "Simone Inzaghi - evolved Conte's system, modern flexible approach"
    ]),
    famous_matches: JSON.stringify([
      "Inter 3-0 AC Milan (2021) - Scudetto derby dominance",
      "Inter 1-0 Porto (2023 CL) - CL final qualification",
      "Inter 3-3 Barcelona (2019) - Lazio heroics",
      "Inter 3-2 Milan (2022) - Derby comeback"
    ]),
    variants: JSON.stringify([
      "3-4-2-1 with two 10s - iki on numara ile",
      "3-4-3 occasionally - bazen",
      "5-3-2 defensive - savunmacı"
    ]),
    in_possession_shape: "Wing-backler yüksek 3-5-2 / 3-2-5, orta saha rotasyonları, akışkan hareket",
    out_of_possession_shape: "Organize orta blok 5-3-2 / 5-4-1, wing-backler düşer, kompakt",
    transition_to_attack: "Hızlı dikey ilerleme, wing-backler sprint yukarı, boşluğu kullan",
    transition_to_defense: "Organize geri çekilme, wing-backler geri, kompakt blok oluştur",
    corner_attack_strategy: "Stoperler ve forvetlerle ceza sahasını doldur, rotasyonlar, organize",
    corner_defense_strategy: "Üç stoperle bölgesel, organize",
    free_kick_strategy: "Calhanoglu uzmanı, belirli oyunlar",
    tactical_instructions: `
ESNEKLİK:
1. Katı pozisyonlar değil
2. Boş alanları bul ve işgal et
3. Akışkan hareket
4. Rotasyonlar

WING-BACKLER:
- Çok yüksek git
- Genişlik sağla
- Savunmaya dön

İNZAGHI YOLU:
- Conte savunması
- + Hücum özgürlüğü
= Dengeli modern futbol`,
    player_instructions_by_position: JSON.stringify({
      GK: "Modern kaleci, rahat ayaklar (Handanovic, Onana)",
      RCB: "Skriniar - fiziksel, savunmacı",
      CCB: "De Vrij - organize et, dağıt",
      LCB: "Bastoni - ayakları iyi, ilerici",
      RWB: "Dumfries - atletik, direkt, orta yap",
      LWB: "Perisic/Dimarco - yaratıcı, orta yap, içeri kes",
      RCM: "Barella - enerji, yarat, bas",
      CCM: "Brozovic/Calhanoglu - kontrol, dağıt",
      LCM: "Mkhitaryan - zeka, oyunu bağla",
      RST_LST: "Lautaro + Lukaku/Dzeko - tamamlayıcı ortaklık"
    }),
    difficulty_to_implement: 8,
    effectiveness_rating: 8,
    popularity_current: 7,
    success_rate: 70.5
  },

  {
    name: "4-3-3 Flick High Press Vertical",
    formation: "4-3-3",
    category: "modern",
    style: "attacking",
    era: "2019-2021",
    philosophy: `Hansi Flick'in Bayern Munich sextuple (altılı kupa) sisteminin 4-3-3 versiyonu. Ultra yüksek baskı, agresif pressing çiftleriyle. Vertical hızlı hücum - kombinasyon değil, derinlik. 8-2 Barcelona - 4 golün 3'ü 10 saniye içinde. Double pivot yerine üçlü orta saha varyantı. Depth odaklı - hızlı ileriye git. Sextuple = Bundesliga, DFB-Pokal, Supercup, Champions League, UEFA Supercup, Club World Cup. Tarihi başarı.`,
    key_principles: JSON.stringify([
      "Ultra-high press - çok yüksek baskı",
      "Press in pairs - çiftlerle baskı",
      "Vertical depth - vertikal derinlik",
      "Quick attacks - hızlı hücumlar",
      "10-second rule - 10 saniye kuralı (gol 10 saniyede)",
      "High defensive line - yüksek hat",
      "Aggressive from start - baştan agresif",
      "Not combinative but direct - kombine değil direkt",
      "Depth over possession - derinlik > top kontrolü",
      "Sextuple mentality - altılı kupa zihniyeti"
    ]),
    strengths: JSON.stringify([
      "Sextuple winners - altılı kupa",
      "8-2 vs Barcelona - tarihi galibiyet",
      "Ultra-effective pressing - çok etkili baskı",
      "Quick goal-scoring - hızlı gol atma",
      "Overwhelming opponents - rakipleri ezen",
      "High intensity - yüksek yoğunluk",
      "Champions League dominance - ŞL dominasyonu",
      "Individual quality - bireysel kalite (Lewandowski)",
      "Historic achievement - tarihi başarı"
    ]),
    weaknesses: JSON.stringify([
      "Physically exhausting - fiziksel yorucu",
      "Injury risks - sakatlık riski",
      "High-line vulnerable - yüksek hat açığı",
      "Requires elite players - elit oyuncular gerekli",
      "Unsustainable long-term - uzun vadede sürdürülemez",
      "Squad rotation crucial - kadro rotasyonu kritik",
      "One great season - bir harika sezon (ardından ayrıldı)",
      "Germany national team struggles - Almanya Milli Takımda zorluk",
      "Against ultra-defensive can struggle - ultra savunmacılara karşı zorluk olabilir"
    ]),
    ideal_opposition: "Teams that build from back - arkadan kuran takımlar",
    pressing_intensity: 10,
    defensive_line_height: 10,
    width: 7,
    tempo: 10,
    risk_level: 8,
    physicality_requirement: 9,
    technical_requirement: 9,
    tactical_complexity: 7,
    build_up_play: "direct",
    passing_style: "vertical",
    passing_directness: 9,
    defensive_approach: "ultra-high press in pairs",
    attacking_approach: "vertical quick depth",
    compactness: "high-line compressed",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "high line aggressive",
    required_player_profiles: JSON.stringify({
      GK: "Sweeper-keeper, Neuer - world-class, supports high line",
      RB_LB: "Athletic fullbacks, Davies and Pavard - pace, defend high",
      CB: "Fast center-backs, Alaba and Boateng - comfortable extremely high",
      CDM: "Controlling midfielder, Kimmich - distribution, intelligence",
      CM: "Box-to-box, Goretzka and Thiago/Muller - press, create, score",
      Wingers: "Pace and directness, Gnabry and Coman - run in behind, score",
      ST: "Elite striker, Lewandowski - world-class finishing, hold-up"
    }),
    key_positions: JSON.stringify([
      "Robert Lewandowski - golcü makinesi",
      "Alphonso Davies - sol bek hız canavarı",
      "Joshua Kimmich - orta saha beyni"
    ]),
    famous_teams: JSON.stringify([
      "Bayern Munich 2019-21 (Flick) - SEXTUPLE 2019/20",
      "Bayern 2019/20 - Treble + 3 more cups = 6 total",
      "Germany 2021-23 (Flick) - Mixed results"
    ]),
    famous_coaches: JSON.stringify([
      "Hansi Flick - sextuple winner, ultra-high press master"
    ]),
    famous_matches: JSON.stringify([
      "Bayern 8-2 Barcelona (2020 CL QF) - Historic demolition",
      "Bayern 1-0 PSG (2020 CL Final) - Sextuple completed",
      "Bayern 3-0 Chelsea (2020 CL R16) - Dominant aggregate",
      "Bayern 4-2 Sevilla (2020 Super Cup) - Extension win"
    ]),
    variants: JSON.stringify([
      "4-2-3-1 Flick original - orijinal versiyon",
      "4-4-2 in defense - savunmada",
      "4-1-4-1 with Kimmich deep - Kimmich derin"
    ]),
    in_possession_shape: "Dikey 4-3-3, hızlı ileri paslar, her zaman derinlik ara, Davies üstlenir",
    out_of_possession_shape: "Çiftlerle ultra yüksek baskı 4-3-3, rakipleri yorma, anında hata zorla",
    transition_to_attack: "ANINDA dikey paslar, rakip organize olmadan boşluğu kullan, 10 saniyelik goller",
    transition_to_defense: "Çiftlerle hemen bas, geçilirse Davies hızla kurtar, Neuer süpürür",
    corner_attack_strategy: "Lewandowski hedef, derinlikten koşanlar, belirli oyunlar",
    corner_defense_strategy: "Bölgesel işaretleme, hızlı geçişler",
    free_kick_strategy: "Kimmich ortası, çeşitli rutinler",
    tactical_instructions: `
ULTRA BASKIRALL:
1. ÇİFTLERLE bas - condition rakip
2. Yüksek hat - çok yüksek
3. Agresif baştan

VERTİKAL HÜCUM:
1. Hemen derinlik ara
2. Hızlı ilerle
3. 10 saniyede gol
4. Kombinasyon değil DİREKT

SEXTUPLE ZİHNİYETİ:
- Her kupayı kazan
- Rakipleri ez
- Tarihi başarı`,
    player_instructions_by_position: JSON.stringify({
      GK: "Neuer - süpürücü kaleci, dünya klasmanı, yüksek hat desteği",
      RB: "Pavard - sağlam, destekle",
      LB: "Davies - HIZ, kurtar, üstle, yüksekte savun",
      CB: "Alaba/Boateng - yüksek hat, hızlı, dağıt",
      CDM: "Kimmich - oyun kurucu, kontrol, dağıt",
      RCM_LCM: "Goretzka/Muller/Thiago - çiftlerle bas, yarat, skor yap",
      RW_LW: "Gnabry/Coman - direkt, hız, arkaya koş, skor yap",
      ST: "Lewandowski - elit bitiricilik, topa çık, her şey"
    }),
    difficulty_to_implement: 9,
    effectiveness_rating: 10,
    popularity_current: 7,
    success_rate: 82.4
  }
];

console.log('💾 TAKTİK SİSTEMLER BATCH 3 (Sistemler 11-16) EKLENİYOR...\n');
console.log('📌 6 sistem - Her biri ULTRA detaylı!\n');

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

  console.log(`\n📊 BATCH 3 ÖZET:`);
  console.log(`   ✅ Başarılı: ${completed}`);
  console.log(`   ❌ Başarısız: ${failed}`);
  console.log(`\n✨ Sistemler 11-16 eklendi! Toplam 16/100 sistem tamamlandı.\n`);
  console.log(`📈 İlerleme: %16 - Harika ilerleme!\n`);

  db.close();
})();
