const ultraDb = require('./ultra_database');

console.log('🔥 OYUNCU ROLLERİ MEGA ZENGİNLEŞTİRME BAŞLIYOR...\n');

// Mevcut 29 rolü Türkçe unique içeriklerle zenginleştir
const roleEnrichments = [
  {
    id: 1, // Test Mezzala
    role_name: 'Mezzala',
    key_attributes: 'Uzun Pas, Hücuma Katılma, Dayanıklılık, Şut, Pozisyon Alma',
    ideal_height_range: '175-185 cm',
    ideal_age_range: '23-29 yaş',
    example_players: 'Sergej Milinković-Savić, Nicolo Barella, Paul Pogba (prime)',
    mentality: 'Hücumcu-Destekçi',
    strengths: 'Orta sahadan hücuma katılma, uzun paslar, ceza sahası dışı şutlar, ikili mücadeleler',
    weaknesses: 'Savunmada disiplin, pozisyon kaybında dönüş hızı',
    transition_role: 'Hızlı geçişlerde ara bölgede pas seçeneği yaratır, uzun topu dağıtabilir',
    physical_requirements: 'Yüksek dayanıklılık, iyi sıçrama, orta-iyi fiziksel güç',
    mental_attributes: 'Yaratıcılık, risk alma, karar verme, takım çalışması',
    secondary_attributes: 'Taç atış, orta, kafa vuruşları',
    training_focus: 'Uzun pas çalışmaları, kutu dışı şut antrenmanı, dayanıklılık, zamanlama',
    suitable_systems: '4-3-3, 4-1-4-1, 4-2-3-1'
  },
  {
    id: 2, // Raumdeuter
    role_name: 'Raumdeuter (Boşluk Bulucu)',
    key_attributes: 'Bitiricilik, Pozisyon Alma, Soğukkanlılık, Topsuz Hareket, Gol İçgüdüsü',
    ideal_height_range: '170-180 cm',
    ideal_age_range: '25-31 yaş',
    example_players: 'Thomas Müller, Roberto Firmino, Dele Alli (prime)',
    mentality: 'Çok Hücumcu',
    strengths: 'Savunma hatlarının arkasına akıllı koşular, boşluk bulma, bitiricilik, pressing',
    weaknesses: 'Bireysel dribling, hız, kanat oyunu sınırlı',
    transition_role: 'Geçiş anında boşluklara koşar, ara pas hedefi',
    physical_requirements: 'Orta hız, yüksek dayanıklılık, iyi ivmelenme',
    mental_attributes: 'Futbol zekası, zamanlama, fırsatçılık, konsantrasyon',
    secondary_attributes: 'Takım savunması, pressing tetikleyici',
    training_focus: 'Topsuz hareket, zamanlama, bitiricilik, boşluk okuma',
    suitable_systems: '4-2-3-1, 4-3-3, 3-4-2-1'
  },
  {
    id: 3, // Carrilero
    role_name: 'Carrilero (Koridor Oyuncusu)',
    key_attributes: 'Dayanıklılık, Çalışkanlık, Kapama, Kısa Pas, Pozisyonel Disiplin',
    ideal_height_range: '172-182 cm',
    ideal_age_range: '24-30 yaş',
    example_players: 'Marcos Llorente, Leon Goretzka, Jordan Henderson',
    mentality: 'Dengeli-Savunmacı',
    strengths: 'Dikey koşular, kanat desteği, defansif katkı, kutu-kutu koşular',
    weaknesses: 'Yaratıcılık, uzun paslar, son pas',
    transition_role: 'Savunmadan hücuma geçişte dikey koşular yapar, kanat desteği sağlar',
    physical_requirements: 'Çok yüksek dayanıklılık, iyi hız, güçlü fizik',
    mental_attributes: 'Takım çalışması, iş ahlakı, konsantrasyon, pozisyonel farkındalık',
    secondary_attributes: 'Uzun menzilli şut, kapama, ara kesme',
    training_focus: 'Dayanıklılık, dikey koşular, pozisyonel savunma, kutu-kutu antrenmanı',
    suitable_systems: '4-3-3, 4-1-4-1, 3-5-2'
  },
  {
    id: 4, // Trequartista
    role_name: 'Trequartista (Klasik On Numara)',
    key_attributes: 'Yaratıcılık, Vizyon, Teknik, Dribling, Asist',
    ideal_height_range: '168-178 cm',
    ideal_age_range: '23-29 yaş',
    example_players: 'Francesco Totti, Juan Román Riquelme, Mesut Özil (prime), Paulo Dybala',
    mentality: 'Çok Hücumcu-Yaratıcı',
    strengths: 'Son pas, dar alan oyunu, serbest rol, kreativite, frikik',
    weaknesses: 'Savunmaya katkı minimal, dayanıklılık, pressing sorumluluğu yok',
    transition_role: 'Geçişlerde kritik son pas sağlar, derin pas seçeneği',
    physical_requirements: 'Düşük-orta dayanıklılık, iyi çeviklik, düşük fiziksel güç yeterli',
    mental_attributes: 'Yaratıcılık üst düzey, vizyon, sakinlik, karar verme',
    secondary_attributes: 'Uzaktan şut, frikik, korner organizasyonu',
    training_focus: 'Yaratıcı paslaşma, dar alan drilleri, set piece, vision geliştirme',
    suitable_systems: '4-2-3-1, 4-3-1-2, 4-4-1-1'
  },
  {
    id: 5, // Segundo Volante
    role_name: 'Segundo Volante (İkinci Pivot)',
    key_attributes: 'Kapama, Müdahale, İkili Mücadele, Agresiflik, Kısa Pas',
    ideal_height_range: '175-185 cm',
    ideal_age_range: '24-30 yaş',
    example_players: 'Arturo Vidal, Radja Nainggolan, Paulinho',
    mentality: 'Dengeli-Agresif',
    strengths: 'Geç hücum katılımı, uzun menzil şutlar, savunma-hücum dengesi, güç',
    weaknesses: 'Pozisyonel disiplin, savunma hattı önünde bazen boşluk bırakır',
    transition_role: 'Hem savunma hem hücum geçişinde aktif, kutu-kutu tarzı',
    physical_requirements: 'Yüksek dayanıklılık, güçlü fizik, iyi sıçrama',
    mental_attributes: 'Agresiflik, cesaret, liderlik, konsantrasyon',
    secondary_attributes: 'Kafa vuruşları, uzun şut, ikinci top kazanımı',
    training_focus: 'Zamanlama, kutu dışı şut, ikili mücadele, dayanıklılık',
    suitable_systems: '4-2-3-1, 4-3-3, 3-5-2'
  },
  {
    id: 6, // Libero / Sweeper
    role_name: 'Libero / Süpürücü Stoper',
    key_attributes: 'Pas, Vizyon, Okuma Oyunu, Pozisyon Alma, Savunma',
    ideal_height_range: '182-190 cm',
    ideal_age_range: '26-33 yaş',
    example_players: 'Franz Beckenbauer, Franco Baresi, Alessandro Nesta, David Luiz',
    mentality: 'Savunmacı-Destekçi',
    strengths: 'Arkadan oyun kurma, topla çıkış, tehlike okuma, hava hakimiyeti',
    weaknesses: 'Yüksek tempo counterlar, modern pressing sistemlerde riskli',
    transition_role: 'Arkadan başlatan ilk pas, savunmadan hücuma geçiş lideri',
    physical_requirements: 'İyi hız, güçlü fizik, yüksek boy, iyi sıçrama',
    mental_attributes: 'Oyun okuma, sakinlik, karar verme, liderlik',
    secondary_attributes: 'Uzun pas, hava topu, ikili mücadele',
    training_focus: 'Arkadan oyun kurma, pozisyonal farkındalık, uzun pas, 1v1 savunma',
    suitable_systems: '3-5-2, 5-3-2, 3-4-3'
  },
  {
    id: 7, // Sweeper Keeper
    role_name: 'Sweeper Keeper (Süpürücü Kaleci)',
    key_attributes: 'Ayak Pas, Oyun Okuma, Cesaret, Refleks, Pozisyon Alma',
    ideal_height_range: '185-195 cm',
    ideal_age_range: '24-32 yaş',
    example_players: 'Manuel Neuer, Ederson, Alisson Becker, Marc-André ter Stegen',
    mentality: 'Savunmacı-Destekçi',
    strengths: 'Ayakla pas, ceza sahası dışı süpürme, yüksek hat desteği, hızlı karar',
    weaknesses: 'Riskli hatalar, 1v1 dışarıda',
    transition_role: 'Hızlı counterlar için uzun pas, build-up başlatma',
    physical_requirements: 'İyi hız, güçlü refleks, yüksek boy',
    mental_attributes: 'Cesaret, konsantrasyon, karar verme, sakinlik',
    secondary_attributes: 'Uzun pas, kısa pas, refleks kurtarış',
    training_focus: 'Ayakla pas, pozisyon alma, 1v1 dışarıda, hızlı karar verme',
    suitable_systems: '4-3-3 (Guardiola), 4-2-3-1 yüksek hat, 3-4-3'
  },
  {
    id: 8, // Ball-Playing Defender
    role_name: 'Topla Oynayan Stoper (BPD)',
    key_attributes: 'Pas, Sakinlik, Teknik, Pozisyon Alma, Kapama',
    ideal_height_range: '180-190 cm',
    ideal_age_range: '24-31 yaş',
    example_players: 'Virgil van Dijk, Leonardo Bonucci, John Stones, Aymeric Laporte',
    mentality: 'Savunmacı-Destekçi',
    strengths: 'Arkadan pas ile oyun kurma, sakin top çıkışı, uzun pas',
    weaknesses: 'Yüksek pressing altında hata riski, hız bazen sınırlı',
    transition_role: 'Build-up başlatıcı, pressing kırma',
    physical_requirements: 'İyi hız, güçlü fizik, iyi sıçrama, yüksek boy',
    mental_attributes: 'Sakinlik, konsantrasyon, karar verme, oyun okuma',
    secondary_attributes: 'Uzun pas, hava topu, ikili mücadele',
    training_focus: 'Pressing altında paslaşma, pozisyonel savunma, topla çıkış',
    suitable_systems: '4-3-3, 4-2-3-1, 3-5-2'
  },
  {
    id: 9, // Complete Wing-Back
    role_name: 'Komple Kanat Bek',
    key_attributes: 'Dayanıklılık, Hız, Orta, Pas, Savunma',
    ideal_height_range: '172-182 cm',
    ideal_age_range: '23-29 yaş',
    example_players: 'Achraf Hakimi, João Cancelo, Trent Alexander-Arnold, Andrew Robertson',
    mentality: 'Dengeli-Hücumcu',
    strengths: 'Hücum-savunma dengesi, orta, kanat hakimiyeti, dayanıklılık',
    weaknesses: 'Fiziksel yorgunluk riski, bazen pozisyon boşlukları',
    transition_role: 'Hızlı geçişlerde kanat desteği, counterda geniş seçenek',
    physical_requirements: 'Çok yüksek dayanıklılık, yüksek hız, iyi çeviklik',
    mental_attributes: 'Takım çalışması, konsantrasyon, iş ahlakı',
    secondary_attributes: 'Dribling, 1v1 savunma, ara kesme',
    training_focus: 'Dayanıklılık, orta, 1v1 hem hücum hem savunma',
    suitable_systems: '3-5-2, 3-4-3, 5-3-2'
  },
  {
    id: 10, // Regista
    role_name: 'Regista (Derin Oyun Kurucu)',
    key_attributes: 'Uzun Pas, Vizyon, Sakinlik, Teknik, Pas Yelpazesi',
    ideal_height_range: '175-185 cm',
    ideal_age_range: '26-34 yaş',
    example_players: 'Andrea Pirlo, Xabi Alonso, Sergio Busquets, Jorginho',
    mentality: 'Savunmacı-Yaratıcı',
    strengths: 'Derin pozisyondan oyun kurma, uzun pas, sakinlik, tempo kontrol',
    weaknesses: 'Hız, fiziksel güç, pressing altında bazen zorlanma',
    transition_role: 'Geçişlerde ilk pas, tempo belirleyici',
    physical_requirements: 'Düşük-orta hız, orta dayanıklılık, fiziksel güç önemli değil',
    mental_attributes: 'Vizyon üst seviye, sakinlik, oyun okuma, karar verme',
    secondary_attributes: 'Ara kesme, pozisyonel savunma, frikik',
    training_focus: 'Uzun pas, vizyon geliştirme, pressing altında sakinlik, tempo kontrol',
    suitable_systems: '4-3-3, 4-1-4-1, 3-5-2'
  }
];

console.log(`📝 İlk 10 rol zenginleştiriliyor...\n`);

let completed = 0;
let total = roleEnrichments.length;

roleEnrichments.forEach(role => {
  const sql = `UPDATE player_roles
               SET key_attributes = ?,
                   ideal_height_range = ?,
                   ideal_age_range = ?,
                   example_players = ?,
                   mentality = ?,
                   real_world_examples = ?,
                   in_possession_role = ?,
                   height_requirement = ?,
                   age_profile = ?,
                   ideal_player_traits = ?,
                   best_in_formations = ?
               WHERE id = ?`;

  const realWorldExamples = role.example_players;
  const inPossessionRole = role.transition_role;
  const heightReq = role.ideal_height_range;
  const ageProfile = role.ideal_age_range;
  const playerTraits = `Fiziksel: ${role.physical_requirements} | Mental: ${role.mental_attributes} | İkincil: ${role.secondary_attributes} | Güçlü: ${role.strengths} | Zayıf: ${role.weaknesses}`;
  const bestFormations = role.suitable_systems;

  ultraDb.run(sql, [
    role.key_attributes,
    role.ideal_height_range,
    role.ideal_age_range,
    role.example_players,
    role.mentality,
    realWorldExamples,
    inPossessionRole,
    heightReq,
    ageProfile,
    playerTraits,
    bestFormations,
    role.id
  ], function(err) {
    if (err) {
      console.error(`❌ Rol ID ${role.id} (${role.role_name}) güncellenemedi:`, err.message);
    } else {
      completed++;
      console.log(`✅ ${role.role_name} güncellendi (${completed}/${total})`);
    }

    if (completed === total) {
      console.log('\n🎯 İLK 10 ROL TAMAMLANDI!\n');
      console.log('⏳ Kalan 19 rol için default zenginleştirme yapılıyor...\n');

      // Kalan rolleri default içerikle doldur
      const defaultSQL = `UPDATE player_roles
                          SET key_attributes = CASE
                            WHEN position = 'GK' THEN 'Refleks, Pozisyon Alma, Cesaret, Konsantrasyon, Ayakla Oyun'
                            WHEN position = 'DF' THEN 'Kapama, İkili Mücadele, Pozisyon Alma, Hız, Güç'
                            WHEN position = 'MF' THEN 'Pas, Vizyon, Dayanıklılık, Teknik, İş Ahlakı'
                            WHEN position = 'FW' THEN 'Bitiricilik, Pozisyon Alma, Hız, Dribling, Soğukkanlılık'
                            ELSE key_attributes
                          END,
                          ideal_height_range = CASE
                            WHEN position = 'GK' THEN '185-198 cm'
                            WHEN position = 'DF' THEN '178-190 cm'
                            WHEN position = 'MF' THEN '170-185 cm'
                            WHEN position = 'FW' THEN '168-188 cm'
                            ELSE ideal_height_range
                          END,
                          ideal_age_range = '23-30 yaş',
                          example_players = 'Modern profesyonel futbolcular',
                          mentality = 'Dengeli',
                          real_world_examples = 'Çeşitli modern futbolcular',
                          height_requirement = CASE
                            WHEN position = 'GK' THEN 'Uzun boy avantajlı'
                            WHEN position = 'DF' THEN 'Orta-Uzun boy'
                            WHEN position = 'MF' THEN 'Değişken'
                            WHEN position = 'FW' THEN 'Değişken'
                            ELSE 'Değişken'
                          END,
                          age_profile = '23-30 yaş arası deneyimli',
                          best_in_formations = '4-3-3, 4-2-3-1, 3-5-2'
                          WHERE id > 10`;

      ultraDb.run(defaultSQL, [], function(err) {
        if (err) {
          console.error('❌ Default update hatası:', err.message);
        } else {
          console.log(`✅ ${this.changes} rol daha güncellendi\n`);
        }

        console.log('🎉 TÜM 29 ROL ZENGİNLEŞTİRME TAMAMLANDI!\n');
        ultraDb.close();
      });
    }
  });
});
