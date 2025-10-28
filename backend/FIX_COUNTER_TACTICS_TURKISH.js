const db = require('./ultra_database');

console.log('═'.repeat(80));
console.log('COUNTER TACTICS TÜRKÇELEŞTIRME');
console.log('═'.repeat(80) + '\n');

let fixed = 0;

db.all('SELECT * FROM counter_tactics', [], (err, rows) => {
  if (err) {
    console.log('ERROR:', err);
    process.exit(1);
  }

  console.log(`${rows.length} counter tactics kaydı işleniyor...\n`);

  let processed = 0;

  rows.forEach(row => {
    // player_instructions'ı parse et ve Türkçeleştir
    let instructions = row.player_instructions;

    // JSON parse edilebilir mi kontrol et
    try {
      const parsed = JSON.parse(instructions);
      const turkishInstructions = {};

      Object.keys(parsed).forEach(key => {
        // Key'i de Türkçeleştir
        let turkishKey = key;
        turkishKey = turkishKey.replace(/^Overall$/i, 'Genel');
        turkishKey = turkishKey.replace(/^Defense$/i, 'Savunma');
        turkishKey = turkishKey.replace(/^Midfield$/i, 'Orta Saha');
        turkishKey = turkishKey.replace(/^Forwards$/i, 'Forvetler');
        turkishKey = turkishKey.replace(/^Wingers$/i, 'Kanatlar');
        turkishKey = turkishKey.replace(/^Fullbacks$/i, 'Bekler');
        turkishKey = turkishKey.replace(/^Midfielders$/i, 'Orta Saha Oyuncuları');
        turkishKey = turkishKey.replace(/^Striker$/i, 'Forvet');
        turkishKey = turkishKey.replace(/^OppositeFB$/i, 'Karşı Bek');
        turkishKey = turkishKey.replace(/^InsideForwards$/i, 'İçe Kesen Forvetter');
        turkishKey = turkishKey.replace(/^Attackers$/i, 'Hücumcular');
        turkishKey = turkishKey.replace(/^Players$/i, 'Oyuncular');

        let value = parsed[key];

        // İngilizce cümleleri Türkçeleştir - GENİŞLETİLMİŞ KAPSAM

        // Uzun cümleler önce (daha spesifik olanlar önce gelmeli)
        value = value.replace(/Target Arkadaki boşluk inverted fullback relentlessly/gi, 'Invertli bek karşısında sürekli arkadaki boşluğu hedefle');
        value = value.replace(/Overlap süreklily zaman inverted FB central/gi, 'Invertli bek merkeze geldiğinde sürekli bindirme yap');
        value = value.replace(/Quick switch passes to isolated winger/gi, 'İzole kanada hızlı taraf değiştirme pasları');
        value = value.replace(/Exploit transitions zaman FB out of position/gi, 'Bek pozisyon dışındayken geçişleri kullan');
        value = value.replace(/Quick execution/gi, 'Hızlı uygulama');
        value = value.replace(/Stay çok wide\. Cross frequently den byline/gi, 'Çok geniş kal. Kale çizgisinden sık sık orta yap');
        value = value.replace(/Push çok high\. Provide width overlaps/gi, 'Çok yukarı çık. Genişlik ve bindirme sağla');
        value = value.replace(/Position outside box for second balls/gi, 'İkinci toplar için ceza sahası dışında pozisyon al');
        value = value.replace(/Target man role\. Attack crosses/gi, 'Hedef adam rolü. Ortaları hücum et');
        value = value.replace(/Patience gerekli\. 60\+ minutes often needed/gi, 'Sabır gerekli. Genelde 60+ dakika gerekir');
        value = value.replace(/Pin wing-backs\. Create 2v1 with fullback/gi, 'Kanat beklerini çivile. Bekle 2v1 yarat');
        value = value.replace(/Exploit channels WB leaves behind/gi, 'Kanat beğin arkada bıraktığı koridorları kullan');
        value = value.replace(/Man-mark False 9/gi, 'False 9\'a adam adama');
        value = value.replace(/Follow everywhere\. Physical/gi, 'Her yerde takip et. Fiziksel ol');
        value = value.replace(/Hold position\. Do not follow False 9/gi, 'Pozisyonu koru. False 9\'u takip etme');
        value = value.replace(/Cover DM space zaman tracking/gi, 'Takipte DM boşluğunu kapat');
        value = value.replace(/Discipline gerekli\. Communication key/gi, 'Disiplin gerekli. İletişim kilit');
        value = value.replace(/Mid-block at halfway\. Compact/gi, 'Orta çizgide orta blok. Kompakt');
        value = value.replace(/Press triggers zaman ball enters your half/gi, 'Top kendi yarı sahanıza girdiğinde pres tetikle');
        value = value.replace(/Stay high for vertical counters/gi, 'Dikey kontralar için yüksek kal');
        value = value.replace(/Patience\. Let them have safe ball\. Strike zaman space opens/gi, 'Sabır. Güvenli topu onlara ver. Boşluk açıldığında vur');
        value = value.replace(/Calm topla\. Draw press/gi, 'Sakin topla oyna. Presi çek');
        value = value.replace(/Sürekli movement\. Third man koşular/gi, 'Sürekli hareket. Üçüncü adam koşuları');
        value = value.replace(/Technical quality\. Quick combos\. Confidence gerekli/gi, 'Teknik kalite. Hızlı kombinler. Güven gerekli');
        value = value.replace(/Dominate possession\. Control tempo\. 3v2 advantage/gi, 'Topa hakim ol. Tempoyu kontrol et. 3v2 avantajı');
        value = value.replace(/Patient\. Use Orta Saha superiority\. Control game/gi, 'Sabırlı ol. Orta saha üstünlüğünü kullan. Oyunu kontrol et');
        value = value.replace(/Overlap süreklily zaman WB caught high/gi, 'Kanat bek yukarı yakalandığında sürekli bindirme yap');
        value = value.replace(/Quick switches to overload/gi, 'Aşırı yükleme için hızlı taraf değişimleri');
        value = value.replace(/Transition speed key\. Catch WBs high/gi, 'Geçiş hızı kilit. Kanat bekleri yukarıda yakala');
        value = value.replace(/Patience\. Let them have güvenli top\. vur on transition/gi, 'Sabır. Güvenli topu onlara ver. Geçişte vur');
        value = value.replace(/Let them have/gi, 'Onlara ver');
        value = value.replace(/on transition/gi, 'geçişte');

        // Orta uzunlukta cümleler
        value = value.replace(/Direct passes in behind/gi, 'Arkaya direkt paslar');
        value = value.replace(/No buildup needed/gi, 'Oyun kurmaya gerek yok');
        value = value.replace(/Through balls in behind/gi, 'Arkaya ara paslar');
        value = value.replace(/at every opportunity/gi, 'her fırsatta');
        value = value.replace(/Sürekli runs in behind/gi, 'Sürekli arkaya koşular');
        value = value.replace(/directly to forwards in space behind/gi, 'direkt olarak arkadaki boşluktaki forvete');
        value = value.replace(/Uzun dagitim directly to/gi, 'Uzun dağıtım direkt olarak');
        value = value.replace(/forwards in space/gi, 'boşluktaki forvete');
        value = value.replace(/Direct passes/gi, 'Direkt paslar');
        value = value.replace(/Riskli driblingler yok/gi, 'Riskli dribling yok');
        value = value.replace(/Once guvenlik/gi, 'Önce güvenlik');
        value = value.replace(/Almak icin derine sadece guvenli bolgelerde/gi, 'Sadece güvenli bölgelerde derine düş');
        value = value.replace(/Target man hold up play/gi, 'Hedef adam tutma oyunu');
        value = value.replace(/Forward runners support/gi, 'Forvete destek koşuları');
        value = value.replace(/Switch play instantly/gi, 'Anında oyun değiştir');
        value = value.replace(/Exploit space quickly/gi, 'Boşluğu hızla kullan');
        value = value.replace(/Space behind/gi, 'Arkadaki boşluk');
        value = value.replace(/High line vulnerability/gi, 'Yüksek hat zafiyeti');
        value = value.replace(/Catch them out of shape/gi, 'Onları organizasyonsuz yakala');
        value = value.replace(/Time perfectly/gi, 'Zamanla mükemmel');
        value = value.replace(/Elite pace required/gi, 'Üst düzey hız gerekli');
        value = value.replace(/Sprint arkaya on turnovers immediately/gi, 'Top kazanımında anında arkaya sprint');
        value = value.replace(/Patient zaman safe/gi, 'Sabırlı ve güvenli oyna');
        value = value.replace(/inverted fullback/gi, 'invertli bek');
        value = value.replace(/isolated winger/gi, 'izole kanat');
        value = value.replace(/out of position/gi, 'pozisyon dışında');
        value = value.replace(/second balls/gi, 'ikinci toplar');
        value = value.replace(/often needed/gi, 'genelde gerekir');
        value = value.replace(/vertical counters/gi, 'dikey kontralar');
        value = value.replace(/safe ball/gi, 'güvenli top');
        value = value.replace(/space opens/gi, 'boşluk açıldığında');

        // Kısa kelimeler ve genel terimler (en sonda, daha genel olanlar)
        value = value.replace(/\btarget\b/gi, 'hedefle');
        value = value.replace(/\brelentlessly\b/gi, 'sürekli');
        value = value.replace(/\boverlap\b/gi, 'bindirme yap');
        value = value.replace(/\bexploit\b/gi, 'kullan');
        value = value.replace(/\btransitions\b/gi, 'geçişler');
        value = value.replace(/\bstay wide\b/gi, 'geniş kal');
        value = value.replace(/\bcross frequently\b/gi, 'sık orta yap');
        value = value.replace(/\bprovide width\b/gi, 'genişlik sağla');
        value = value.replace(/\battack crosses\b/gi, 'ortaları hücum et');
        value = value.replace(/\bpin\b/gi, 'çivile');
        value = value.replace(/\bfollow\b/gi, 'takip et');
        value = value.replace(/\bhold position\b/gi, 'pozisyonu koru');
        value = value.replace(/\bcover\b/gi, 'kapat');
        value = value.replace(/\bcompact\b/gi, 'kompakt');
        value = value.replace(/\bpress triggers\b/gi, 'pres tetikle');
        value = value.replace(/\bstrike\b/gi, 'vur');
        value = value.replace(/\bdraw press\b/gi, 'presi çek');
        value = value.replace(/\bmovement\b/gi, 'hareket');
        value = value.replace(/\bthird man\b/gi, 'üçüncü adam');
        value = value.replace(/\bquick combos\b/gi, 'hızlı kombinler');
        value = value.replace(/\bdominate possession\b/gi, 'topa hakim ol');
        value = value.replace(/\bcontrol tempo\b/gi, 'tempoyu kontrol et');
        value = value.replace(/\bcontrol game\b/gi, 'oyunu kontrol et');
        value = value.replace(/\bsuperiority\b/gi, 'üstünlük');
        value = value.replace(/\badvantage\b/gi, 'avantaj');
        value = value.replace(/\bpatient\b/gi, 'sabırlı');
        value = value.replace(/\bpatience\b/gi, 'sabır');
        value = value.replace(/\bcalm\b/gi, 'sakin');
        value = value.replace(/\bkey\b/gi, 'kilit');
        value = value.replace(/\bcatch\b/gi, 'yakala');
        value = value.replace(/\bswitches\b/gi, 'taraf değişimleri');
        value = value.replace(/\boverload\b/gi, 'aşırı yükleme');
        value = value.replace(/\bconfidence\b/gi, 'güven');
        value = value.replace(/\bdiscipline\b/gi, 'disiplin');
        value = value.replace(/\bcommunication\b/gi, 'iletişim');
        value = value.replace(/\bphysical\b/gi, 'fiziksel');
        value = value.replace(/\btechnical quality\b/gi, 'teknik kalite');
        value = value.replace(/\bin behind\b/gi, 'arkaya');
        value = value.replace(/\bthrough balls\b/gi, 'ara paslar');
        value = value.replace(/\bNo buildup\b/gi, 'Oyun kurma yok');
        value = value.replace(/\bBypass press\b/gi, 'Baskıyı atla');
        value = value.replace(/\bHizli paslar\b/gi, 'Hızlı paslar');
        value = value.replace(/\bon turnovers\b/gi, 'top kazanımında');
        value = value.replace(/\bimmediately\b/gi, 'anında');
        value = value.replace(/\brequired\b/gi, 'gerekli');
        value = value.replace(/\bperfectly\b/gi, 'mükemmel');
        value = value.replace(/\bruns\b/gi, 'koşular');
        value = value.replace(/\bOverall\b/gi, 'Genel');
        value = value.replace(/\bDefense\b/gi, 'Savunma');
        value = value.replace(/\bMidfield\b/gi, 'Orta Saha');
        value = value.replace(/\bForwards\b/gi, 'Forvetler');
        value = value.replace(/\bWingers\b/gi, 'Kanatlar');
        value = value.replace(/\bwing-backs\b/gi, 'kanat bekler');
        value = value.replace(/\bfullback\b/gi, 'bek');
        value = value.replace(/\bchannels\b/gi, 'koridorlar');
        value = value.replace(/\bcreate\b/gi, 'yarat');
        value = value.replace(/\bwhen\b/gi, 'iken');
        value = value.replace(/\bcaught high\b/gi, 'yukarı yakalandığında');

        // Düzeltmeler - yanlış Türkçe yazımlar
        value = value.replace(/süreklily/gi, 'sürekli');
        value = value.replace(/zaman inverted/gi, 'invertli');
        value = value.replace(/zaman WB/gi, 'kanat bek');
        value = value.replace(/zaman FB/gi, 'bek');
        value = value.replace(/zaman tracking/gi, 'takipte');
        value = value.replace(/zaman ball/gi, 'top');
        value = value.replace(/zaman space/gi, 'boşluk');
        value = value.replace(/den byline/gi, 'kale çizgisinden');
        value = value.replace(/topla\./gi, 'topu oyna.');
        value = value.replace(/çok wide/gi, 'çok geniş');
        value = value.replace(/çok high/gi, 'çok yukarı');

        turkishInstructions[turkishKey] = value;
      });

      instructions = JSON.stringify(turkishInstructions, null, 0);

    } catch (e) {
      // JSON değilse string olarak temizle - aynı pattern'leri uygula
      instructions = instructions.replace(/Target Arkadaki boşluk inverted fullback relentlessly/gi, 'Invertli bek karşısında sürekli arkadaki boşluğu hedefle');
      instructions = instructions.replace(/Direct passes in behind/gi, 'Arkaya direkt paslar');
      instructions = instructions.replace(/No buildup needed/gi, 'Oyun kurmaya gerek yok');
      instructions = instructions.replace(/Through balls in behind/gi, 'Arkaya ara paslar');
      instructions = instructions.replace(/at every opportunity/gi, 'her fırsatta');
      instructions = instructions.replace(/in behind/gi, 'arkaya');
      instructions = instructions.replace(/directly to forwards/gi, 'direkt forvete');
      instructions = instructions.replace(/\bOverall\b/gi, 'Genel');
      instructions = instructions.replace(/\bDefense\b/gi, 'Savunma');
      instructions = instructions.replace(/\bMidfield\b/gi, 'Orta Saha');
      instructions = instructions.replace(/\bForwards\b/gi, 'Forvetler');
      instructions = instructions.replace(/\bWingers\b/gi, 'Kanatlar');
    }

    // Diğer alanları da Türkçeleştir
    let keyWeaknesses = row.key_weaknesses || '';
    let exploitationMethods = row.exploitation_methods || '';
    let detailedStrategy = row.detailed_strategy || '';

    keyWeaknesses = keyWeaknesses.replace(/Space in behind/gi, 'Arkadaki boşluk');
    keyWeaknesses = keyWeaknesses.replace(/Vulnerable to/gi, 'Karşı savunmasız');
    keyWeaknesses = keyWeaknesses.replace(/High defensive line/gi, 'Yüksek savunma hattı');
    keyWeaknesses = keyWeaknesses.replace(/Slow build-up/gi, 'Yavaş oyun kurma');

    exploitationMethods = exploitationMethods.replace(/Long balls/gi, 'Uzun toplar');
    exploitationMethods = exploitationMethods.replace(/Counter-attacks/gi, 'Karşı ataklar');
    exploitationMethods = exploitationMethods.replace(/Quick transitions/gi, 'Hızlı geçişler');
    exploitationMethods = exploitationMethods.replace(/Exploit space/gi, 'Boşluğu kullan');

    detailedStrategy = detailedStrategy.replace(/Press high/gi, 'Yüksek baskı');
    detailedStrategy = detailedStrategy.replace(/Sit deep/gi, 'Derine otur');
    detailedStrategy = detailedStrategy.replace(/Counter quickly/gi, 'Hızlı karşı atak');

    // Güncelle
    db.run(
      `UPDATE counter_tactics SET
        key_weaknesses = ?,
        exploitation_methods = ?,
        detailed_strategy = ?,
        player_instructions = ?
      WHERE id = ?`,
      [keyWeaknesses, exploitationMethods, detailedStrategy, instructions, row.id],
      (err2) => {
        if (!err2) {
          fixed++;
          console.log(`✅ Counter tactic #${row.id} düzeltildi`);
        } else {
          console.log(`❌ Counter tactic #${row.id} hata: ${err2.message}`);
        }
        processed++;

        if (processed === rows.length) {
          console.log('\n' + '═'.repeat(80));
          console.log(`✅ TOPLAM ${fixed} COUNTER TACTIC DÜZELTİLDİ!`);
          console.log('═'.repeat(80) + '\n');
          process.exit(0);
        }
      }
    );
  });
});
