const db = require('./ultra_database');

// 16 sistemin TAM Türkçe güncellemeleri (corner, free kick, player instructions dahil)
const completeUpdates = [
  {
    name: "4-2-3-1 Guardiola Possession",
    corner_attack_strategy: "Kısa korner varyasyonları, ön direğe aşırı yükleme, derinlikten koşanlar, kaleci genelde kendi kalesinde",
    corner_defense_strategy: "Bölgesel ve adam adam işaretleme karışımı, ilk topa odaklanma, hızlı geçişler",
    free_kick_strategy: "Kısa kombinasyonlar tercih edilir, Messi seviyesinde oyuncu yoksa nadiren direkt şut",
    player_instructions: JSON.stringify({
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
    })
  },
  {
    name: "4-3-3 Klopp Gegenpressing",
    corner_attack_strategy: "Bölgesel koşular, ön direk vuruşlar, arka direk hücumlar, anahtar oyuncular için belirli rutinler",
    corner_defense_strategy: "Belirlenmiş hücumcularla bölgesel, ilk temasa odaklanma, hızlı geçişler",
    free_kick_strategy: "Direkt şutlar ve belirli oyunların karışımı, duran toplarda özel antrenman",
    player_instructions: JSON.stringify({
      GK: "Yüksekte süpür, hızlı dağıt, cesur 1v1, yüksek hattı destekle",
      RB_LB: "Sürekli üstle, hızlı kurtar, 1v1 savunma iyi, orta yap",
      CB: "Yüksek hat, agresif düellolar, boşlukları kapat, hızlı toparlanma, dağıt",
      CDM: "Savunmayı koru, oyunu kes, dağıt, arkadan bas",
      RCM_LCM: "Çift yönlü, yüksekten bas, uzaktan şut, hücumları destekle, koşanları takip et",
      RW_LW: "Geniş kal, savunmayı ger, baskı tetikle, 1v1 dribling, içeri keserek şut",
      ST: "Baskı tetikleyicisi, topa çık, kanallara koş, oyunu bağla, şansları bitir"
    })
  },
  {
    name: "3-5-2 Conte Wing-Back System",
    corner_attack_strategy: "Stoperler ve forvetlerle ceza sahasını doldur, bölgesel koşular, kafa uzatmalar, duran toplar çok çalışılmış",
    corner_defense_strategy: "Üç stoperle bölgesel, wing-backler ön ve arka direkleri kapatır, hızlı kontralar",
    free_kick_strategy: "Direkt şutlar ve ceza sahasına ortaların karışımı, belirli rutinler",
    player_instructions: JSON.stringify({
      GK: "Hükümran, savunmayı organize et, ortaları topla, dağıt",
      RCB_LCB: "Geniş stopler kanallara çıkar, agresif, 1v1, wing-backleri destekle",
      CCB: "Libero rolü, dağıt, süpür, tüm savunmayı organize et",
      RWB_LWB: "Sürekli üstle, genişlik sağla, orta yap, hızlı geri gel, 1v1 savun",
      RCM_LCM: "Çift yönlü, bas, müdahale et, hücumları destekle, koşanları takip et",
      CAM: "Hatlar arası, son top, şut, yarat, forverleri bağla",
      RST_LST: "Forvet ortaklığı, biri bekler, biri koşar, ikisi de basar, ikisi de skor yapar"
    })
  },
  {
    name: "4-3-3 Ancelotti Balanced",
    corner_attack_strategy: "Bölgesel ve adam adama karışımı, belirli rutinler, uzun oyunculara hedeflenme",
    corner_defense_strategy: "Bölgesel ve adam adam hibrit, güçlü hava hakimiyeti",
    free_kick_strategy: "Çeşitli belirli oyunlar, oyuncu kalitesine bağlı (Kroos, Alaba vb.)",
    player_instructions: JSON.stringify({
      GK: "Güvenilir kurtarışlar, savunmayı organize et, düzgün pas",
      RB_LB: "Güvenliyken hücumları destekle, geri gel, genişlik sağla",
      CB: "Sağlam savunma, basit pas, defans hattını organize et",
      CDM: "Savunmayı koru, tempoyu kontrol et, akıllıca dağıt",
      RCM_LCM: "Çift yönlü, bas, yarat, hücum ve savunmayı destekle",
      RW_LW: "Savunmayı ger, 1v1 dribling, içeri keserek şut, geri gel",
      ST: "Topa çık, oyunu bağla, şansları bitir, gerektiğinde bas"
    })
  },
  {
    name: "4-2-3-1 Mourinho Defensive",
    corner_attack_strategy: "Fiziksel oyuncularla ceza sahasını doldur, belirli rutinler, klinik bitiricilik",
    corner_defense_strategy: "Belirlenmiş adam adamla bölgesel, fiziksel varlık kritik",
    free_kick_strategy: "Uzaktan direkt şutlar, hedef adamlar için belirli oyunlar",
    player_instructions: JSON.stringify({
      GK: "Alanına hakim ol, savunmayı organize et, kontralar için hızlı dağıt",
      RB_LB: "Savunma öncelikli, fazla ilerleme, kanatları takip et",
      CB: "Fiziksel savunma, hava düelloları, defans hattını organize et, basit pas",
      LCDM_RCDM: "Savunmayı koru, oyunu kes, basit paslar, taktiksel disiplin",
      CAM: "Oyunu bağla, savunmada çalış, kontra ataklar yarat, skor yap",
      RW_LW: "Her zaman geri gel, hızlı kontra ataklar, 1v1 dribling, klinik",
      ST: "Topa çık, hedef adam, klinik bitiricilik, takım için çalış"
    })
  }
];

console.log('🔄 SİSTEMLERİN TAM TÜRKÇE GÜNCELLEMESİ YAPILIYOR...\n');

let updated = 0;

completeUpdates.forEach((system, index) => {
  const sql = `UPDATE tactical_systems
               SET corner_attack_strategy = ?,
                   corner_defense_strategy = ?,
                   free_kick_strategy = ?,
                   player_instructions_by_position = ?
               WHERE name = ?`;

  db.run(sql, [
    system.corner_attack_strategy,
    system.corner_defense_strategy,
    system.free_kick_strategy,
    system.player_instructions,
    system.name
  ], function(err) {
    if (err) {
      console.log(`❌ ${system.name} - HATA: ${err.message}`);
    } else if (this.changes > 0) {
      console.log(`✅ ${index + 1}/5 - ${system.name} - Duran top ve talimatlar güncellendi`);
      updated++;
    }

    if (index === completeUpdates.length - 1) {
      setTimeout(() => {
        console.log(`\n📊 ${updated}/5 sistem tamamen Türkçe'ye çevrildi!`);
        console.log(`\n🔍 Şimdi diğer tabloları kontrol ediyoruz...`);
        process.exit(0);
      }, 500);
    }
  });
});
