const ultraDb = require('./ultra_database');

console.log('🔥 TACTICAL SYSTEMS 6-15 ZENGİNLEŞTİRME...\n');

const updates = [
  // 6. False 9 System
  {
    id: 6,
    system_type: 'Top Hakimiyeti',
    team_mentality: 'Çok Hücumcu',
    attacking_phase: `False 9 sisteminde, geleneksel forvet rolü radikal bir şekilde yeniden tanımlanır. Merkez forveti (CF), derinlikte kalmak yerine orta sahaya düşer ve #10 rolü oynar. Bu hareket, rakip merkez stoperleri bir ikileme sokar: forveti takip edip merkezi boş mu bıraksınlar, yoksa pozisyonda kalıp forvete serbest alan mı versinler? Bu boşluk, kanat oyuncularının (inverted wingers) içeriye kesilen koşularıyla exploit edilir. Sistem, Barcelona'nın Lionel Messi ile oynadığı tarzın DNA'sıdır. Orta saha üçlüsü, derin build-up ve pas kontrol sağlar. İki pivot (çift 6), topu arkadan taşır ve triangulation (üçgen oluşturma) ile rakip pressi kırar. Kanat oyuncuları, sürekli savunma hatlarının arkasına timing runs (zamanlamalı koşular) yapar ve gol pozisyonlarını değerlendirir. False 9, link-up play (bağlantı oyunu) yaparak orta sahayı doldurmada, passing options (pas seçenekleri) yaratmada ve rakip savunmanın organize olmasını engellemede kritik rol oynar. Sistem, exceptional technical ability (olağanüstü teknik yetenek), football IQ (futbol zekası) ve movement off the ball (topsuz hareket) gerektirir.`,
    defensive_phase: `Savunma fazında, False 9 sistemi high press (yüksek press) ve positional defending (pozisyonel savunma) kombinasyonu kullanır. False 9, rakip pivotlara press yapar ve backward passes (geri pasları) engeller, ancak derinliğe koşmaz - pressing trigger (baskı tetikleyicisi) olarak çalışır. Kanat oyuncuları, rakip beklerine agresif baskı yapar ve wing play (kanat oyunu) ile build-up'ı zorlaştırır. Orta saha üçlüsü, merkezi kompakt tutar ve through balls (ara paslar) engeller. Tam bekler, narrow position (dar pozisyon) alır ve inside cuts (içeriye kesmelere) karşı koruma sağlar. Sistem, topu rakipte yüksek bölgelerde kazanmayı ve anında counterpress (karşı press) başlatmayı hedefler. Eğer press kırılırsa, takım hızla compact mid-block (kompakt orta blok) oluşturur. Üç stoper yoktur, bu yüzden aerial battles (hava topları) ve physical duels (fiziksel düellolar) zayıf nokta olabilir - ancak sistem bu riski possession dominance (topa sahip olma hakimiyeti) ile minimize eder.`,
    transition_attack: `False 9 sisteminde transition attack (geçiş hücumu), inverted wingers'ın explosive pace (patlayıcı hız) ve False 9'un quick decision-making (hızlı karar verme) yeteneğine dayanır. Top kazanımı sonrası, False 9 immediately drops deep (hemen derine düşer) ve passing hub (pas merkezi) olur. Kanat oyuncuları, savunma hatlarının arkasına diagonal runs (çapraz koşular) yapar. Orta saha, hızlı through balls (ara paslar) ve one-touch combinations (tek dokunuş kombinasyonlar) ile transition'ı accelerate eder (hızlandırır). Tam bekler, wide overlap (geniş bindirme) yaparak extra width (ekstra genişlik) sağlar ve defense'i stretch eder (savunmayı gerir). False 9'un positional intelligence (pozisyonel zeka), boşlukları bulmada ve space'i exploit etmede (boşlukları istismar etmede) kritiktir. Sistem, quick transition (hızlı geçiş) ve patient build-up (sabırlı oyun kurma) arasında switch yapabilme (değişebilme) yeteneğine sahiptir.`,
    transition_defense: `Transition defense (geçiş savunması), False 9 sisteminde immediate counterpress (anında karşı press) ile başlar. Top kaybı anında, en yakın 5-6 oyuncu topu surround eder (kuşatır) ve rakibi fast break'e (hızlı atağa) çıkamadan durdurur. False 9, backward pass (geri pas) blocking role (bloke etme rolü) oynar. Kanat oyuncuları, rakip beklerin forward movement'ını (ileri hareketini) track eder (takip eder). Orta saha üçlüsü, central zones (merkez bölgeleri) kapatır. Eğer counterpress başarısız olursa, takım hızla compact shape (kompakt şekil) oluşturur. Tam bekler, dar pozisyona gelir ve stoperlerle birlikte four-man defense (dört kişilik savunma) line'ı oluşturur. Sistem, defensive transitions'ı (savunma geçişlerini) minimize etmek için possession'ı (topa sahipliği) koruma odaklıdır - topu kaybetmemek, en iyi savunma stratejisidir.`
  },

  // 7. Tiki-Taka
  {
    id: 7,
    system_type: 'Top Hakimiyeti',
    team_mentality: 'Dengeli-Hücumcu',
    attacking_phase: `Tiki-Taka, modern futbol tarihinin en iconic (ikonik) oyun tarzlarından biridir. İspanya Milli Takımı ve Barcelona'nın 2008-2012 golden era'sında (altın döneminde) doruk noktasına ulaşmıştır. Tiki-Taka'nın essence'i (özü), short passing (kısa paslaşma), constant movement (sürekli hareket), positional rotation (pozisyonel rotasyon) ve extreme possession dominance'tır (aşırı topa sahip olma hakimiyeti). Takım, sürekli triangles (üçgenler), diamonds (elmaslar) ve passing options (pas seçenekleri) oluşturur. Her oyuncu, sürekli hareket eder ve passing lanes (pas yolları) açar. Sistem, rondos (dar alan pas çalışmaları) ve positional drills (pozisyonel antrenmanlar) ile mükemmelleştirilir. Tam bekler, oyun kurmaya katılır ve inverted positions (içe dönük pozisyonlar) alabilir. Kanat oyuncuları, geniş kalır ve pitch'i stretch eder (sahayı gerir). Orta saha, constantly interchange (sürekli yer değiştirir) ve rakip markings'i (işaretlemeleri) confuse eder (karıştırır). Sistem, "pass and move" (pas ver ve hareket et) principles'ine (prensiplerine) dayanır ve rakibi mental fatigue (zihinsel yorgunluk) ile yıpratmayı hedefler.`,
    defensive_phase: `Tiki-Taka'da savunma, attacking principles'ın (hücum prensiplerinin) extension'ıdır (uzantısıdır). "The best defense is a good offense" (en iyi savunma, iyi bir hücumdur) mantığı hakimdir. Takım, topu kaybettiği anda immediate counterpress (anında karşı press) uygular - bu, Tiki-Taka'nın defensive cornerstone'udur (savunma köşe taşıdır). Oyuncular, compact positions (kompakt pozisyonlar) alır ve ball-oriented defense (top odaklı savunma) yapar. Pressing, coordinated (koordineli) ve intelligent (akıllı) - amaç, rakibi dar alanlara sıkıştırıp turnover (top kaybı) zorlamak. Eğer press kırılırsa, takım hızla defensive shape (savunma şekli) alır ancak bu nadirdir çünkü possession çok yüksektir (%65-75). Sistem, physical defending (fiziksel savunma) yerine positional intelligence (pozisyonel zeka) kullanır.`,
    transition_attack: `Tiki-Taka'da transition attack (geçiş hücumu), traditional counterattack'ten (geleneksel kontra ataktan) farklıdır. Top kazanımı sonrası, takım immediate long balls (anında uzun toplar) yerine topu consolidate eder (pekiştirir) ve possession'ı (topa sahipliği) secure eder (güvence altına alır). Ancak eğer space available ise (boşluk varsa), quick vertical passes (hızlı dikey paslar) ve incisive through balls (keskin ara paslar) kullanılır. Transition, controlled (kontrollü) ancak purposeful'dır (amaçlıdır). Oyuncular, hızla attacking positions (hücum pozisyonları) alır ve numerical superiority (sayısal üstünlük) yaratmaya çalışır.`,
    transition_defense: `Transition defense (geçiş savunması), Tiki-Taka'nın en güçlü yanlarından biridir. Top kaybı anında, 6-second rule (6 saniyelik kural) aktive olur: topu 6 saniye içinde geri kazanmak veya rakibi durdur mak. Immediate pressing (anında baskı), topun etrafında yoğun bir cocoon (koza) oluşturur. Bu, Barcelona'nın "you have 6 seconds" approach'ıdır (6 saniyen var yaklaşımı). Eğer counterpress başarısız olursa, takım hızla compact block (kompakt blok) oluşturur ve possession'ı (topa sahipliği) geri kazanmaya odaklanır. Sistem, defensive transitions'ı (savunma geçişlerini) minimize etmek için possession maintenance (topa sahip olma sürdürme) odaklıdır.`
  },

  // 8. 4-1-4-1 Low Block Counter
  {
    id: 8,
    system_type: 'Kompakt Savunma',
    team_mentality: 'Savunmacı',
    attacking_phase: `4-1-4-1 low block counter sistemi, savunma öncelikli bir tarz olsa da, hücum fazı son derece lethal (öldürücü) ve efficient'tır (etkilidir). Tek forvet (lone striker), isolated (izole) kalır ancak exceptional hold-up play (olağanüstü tutma oyunu) ve physical presence (fiziksel varlık) gerektirir. Orta saha dörtlüsü, compact (kompakt) kalır ve savunmada sayısal üstünlük sağlar. Hücum fazında, takım patient build-up (sabırlı oyun kurma) yerine direct transitions (direk geçişler) ve long balls (uzun toplar) kullanır. İki kanat orta sahası (wide midfielders), counterattack'te sprint eder ve forvetin flick-ons (dokunuşlarından) yararlanır. Merkez orta saha ikilisi, forward passes (ileri paslar) ve through balls (ara paslar) ile counterattack'i orchestrate eder (yönetir). Sistem, minimal risk alır ve rakip hatalarından yararlanmayı hedefler. Set-pieces (duran toplar), scoring opportunities'in (gol fırsatları) önemli bir kaynağıdır. Hücum, direct (direk), fast (hızlı) ve ruthlessly efficient'tır (acımasızca etkilidir).`,
    defensive_phase: `4-1-4-1'in defensive phase'i (savunma fazı), sistemin true identity'sidir (gerçek kimliğidir). Takım, deep defensive line (derin savunma hattı) ve compact block (kompakt blok) oluşturur, genellikle kendi yarı sahasında positioning yapar. Holding midfielder (defansif orta saha), stoperlerinin önünde shield (kalkan) görevi görür ve central zones'ı (merkez bölgeleri) kapatır. Orta saha dörtlüsü, narrow (dar) ve compact kalır, rakibin through middle (ortadan geçişini) extremely difficult (aşırı zor) hale getirir. Lone striker, minimal pressing yapar - sadece backward passes'i (geri pasları) block eder (bloke eder) ve defensive line'dan (savunma hattından) disconnected (kopuk) kalmaz. Sistem, two banks of four (iki dörtlü hat) oluşturur ve rakibi wing play'e (kanat oyununa), long shots'a (uzak şutlara) ve crosses'e (ortalara) zorlar. Defensive discipline (savunma disiplini) ve organization (organizasyon) kritiktir - küçük gaps (boşluklar) bile fatal (ölümcül) olabilir. Takım, patient defending (sabırlı savunma) yapar ve rakibin frustration'ını (hayal kırıklığını) bekler.`,
    transition_attack: `4-1-4-1'de transition attack (geçiş hücumu), sistemin primary weapon'ıdır (birincil silahıdır). Top kazanımı sonrası, takım lightning-fast (şimşek hızı) counterattack başlatır. Holding midfielder, immediate long pass (anında uzun pas) yapar ve lone striker'ı hedefler. Wide midfielders (kanat orta sahaları), touchline'a sprint eder (yan çizgiye koşar) ve isolation situations (izolasyon durumları) yaratır. Central midfielders (merkez orta sahalar), late runs (geç dalışlar) ile ceza sahasına girer ve second balls (ikinci topları) kazanır. Tam bekler, genellikle counterattack'e katılmaz - defensive solidity (savunma sağlamlığı) için back (arkada) kalır. Transition, direct (direk) ve minimalist - 3-4 pass içinde goalscoring opportunity (gol fırsatı) yaratma hedefi. Sistem, speed (hız), directness (direklik) ve clinical finishing (klinik bitiricilik) gerektirir.`,
    transition_defense: `Transition defense (geçiş savunması), 4-1-4-1 low block'ta straightforward'dır (basittir). Top kaybı sonrası, takım immediately drop deep (hemen derine düşer) ve defensive shape'i (savunma şeklini) regain eder (yeniden kazanır). Counterpress yapılmaz - bunun yerine, takım quickly reorganize olur (hızla yeniden organize olur) ve compact block'a (kompakt bloğa) döner. Holding midfielder, ilk defensive barrier (ilk savunma bariyer) olur ve forward passes'i (ileri pasları) intercept eder (keser). Orta saha dörtlüsü, geri koşarak narrow positions (dar pozisyonlar) alır. Lone striker, geri düşmez - orta sahada kalır ve rakip build-up'a minimal obstruction (minimal engelleme) sağlar. Sistem, defensive transitions'ı (savunma geçişlerini) minimize eder çünkü hücumda çok az oyuncu commit olur (taahhüt eder).`
  }
];

console.log(`📝 ${updates.length} sistem daha güncellenecek...\n`);

let completed = 0;

updates.forEach(update => {
  const { id, system_type, team_mentality, attacking_phase, defensive_phase, transition_attack, transition_defense } = update;

  const sql = `UPDATE tactical_systems
               SET system_type = ?,
                   team_mentality = ?,
                   attacking_phase = ?,
                   defensive_phase = ?,
                   transition_attack = ?,
                   transition_defense = ?
               WHERE id = ?`;

  ultraDb.run(sql, [system_type, team_mentality, attacking_phase, defensive_phase, transition_attack, transition_defense, id], function(err) {
    if (err) {
      console.error(`❌ Sistem ID ${id} güncellenemedi:`, err.message);
    } else {
      completed++;
      console.log(`✅ Sistem ID ${id} güncellendi (${completed}/${updates.length})`);
    }

    if (completed === updates.length) {
      console.log('\n🎉 SİSTEM 6-8 TAMAMLANDI!\n');
      ultraDb.close();
    }
  });
});
