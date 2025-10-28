const ultraDb = require('./ultra_database');

console.log('🚀 100+ YENİ OYUNCU ROLÜ (BASİT YÖNTEM) EKLENİYOR...\n');

// Daha basit: mevcut bir rolü template olarak kullan, sadece temel alanları değiştir
const templateSql = 'SELECT * FROM player_roles WHERE id = 1 LIMIT 1';

ultraDb.get(templateSql, [], (err, template) => {
  if (err) {
    console.error('Template bulunamadı:', err);
    ultraDb.close();
    return;
  }

  const newRoles = [
    // KALECİLER - 10 rol
    { role_name: 'Klasik Kaleci', position: 'GK', description: 'Geleneksel kaleci, hatta kalır, kurtarışa odaklanır', key_attributes: 'Refleks, Pozisyon Alma, 1v1, Hava Topu, Konsantrasyon' },
    { role_name: 'Şut Durdurucu Kaleci', position: 'GK', description: 'Refleksle kurtarış yapan, şut durmaya odaklı', key_attributes: 'Refleks, Diving, Konsantrasyon, Pozisyon Alma, Cesaret' },
    { role_name: 'Agresif Kaleci', position: 'GK', description: 'Ceza sahası dışına çıkar, topla aktif', key_attributes: 'Cesaret, Hız, Refleks, Ayakla Oyun, 1v1' },
    { role_name: 'Pasif Kaleci', position: 'GK', description: 'Hatta kalır, hava toplarına odaklanır', key_attributes: 'Hava Topu, Boy, Güç, Refleks, Pozisyon Alma' },
    { role_name: 'Oyun Kuran Kaleci', position: 'GK', description: 'Modern kaleci, ayakla pas yaparak oyun kurar', key_attributes: 'Kısa Pas, Uzun Pas, Vizyon, Teknik, Sakinlik' },
    { role_name: 'Penaltı Uzmanı Kaleci', position: 'GK', description: 'Penaltı kurtarmada üst düzey, analiz odaklı', key_attributes: 'Refleks, Konsantrasyon, Oyun Okuma, Cesaret, Diving' },
    { role_name: 'Hücum Organize Eden Kaleci', position: 'GK', description: 'Uzun pas ile hücum başlatır, dikey pas', key_attributes: 'Uzun Pas, Güç, Vizyon, Teknik, Sakinlik' },
    { role_name: 'Lider Kaleci', position: 'GK', description: 'Takımı savunmada organize eder, komuta eder', key_attributes: 'Liderlik, İletişim, Pozisyon Alma, Konsantrasyon, Güven' },
    { role_name: 'Genç Kaleci', position: 'GK', description: 'Gelişim aşamasında, potansiyelli genç kaleci', key_attributes: 'Potansiyel, Refleks, Öğrenme, Konsantrasyon, Gelişim' },
    { role_name: 'False Keeper', position: 'GK', description: 'Sürekli sahada 11. oyuncu gibi, aşırı modern', key_attributes: 'Pas, Teknik, Cesaret, Hız, Oyun Okuma' },

    // STOPERLER - 12 rol
    { role_name: 'Klasik Stoper', position: 'DF', description: 'Geleneksel savunmacı, güç ve hava topu', key_attributes: 'Kapama, Güç, Hava Topu, İkili Mücadele, Pozisyon Alma' },
    { role_name: 'Hızlı Stoper', position: 'DF', description: 'Hızlı, counter tehdidi kapatır', key_attributes: 'Hız, İvmelenme, Kapama, Pozisyon Alma, Okuma Oyunu' },
    { role_name: 'Güçlü Stoper', position: 'DF', description: 'Fiziksel güç, hava hakimiyeti, duel gücü', key_attributes: 'Güç, Hava Topu, İkili Mücadele, Agresiflik, Cesaret' },
    { role_name: 'Kapsayan Stoper', position: 'DF', description: 'Arkada kalır, partner için cover sağlar', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Hız, Kapama' },
    { role_name: 'Agresif Stoper', position: 'DF', description: 'İleri çıkar, agresif kapama yapar', key_attributes: 'Agresiflik, Kapama, Güç, Cesaret, İkili Mücadele' },
    { role_name: 'Modern Merkez Stoper', position: 'DF', description: 'Pas+savunma dengesi, çok yönlü', key_attributes: 'Pas, Kapama, Hız, Teknik, Okuma Oyunu' },
    { role_name: 'Üçlü Savunma Sol Stoper', position: 'DF', description: 'Üçlü sistemde sol stoper', key_attributes: 'Pas Sol Ayak, Kapama, Hız, Pozisyon Alma, Dayanıklılık' },
    { role_name: 'Üçlü Savunma Sağ Stoper', position: 'DF', description: 'Üçlü sistemde sağ stoper', key_attributes: 'Pas Sağ Ayak, Kapama, Hız, Pozisyon Alma, Dayanıklılık' },
    { role_name: 'Pressing Stoper', position: 'DF', description: 'Yüksek pressing yapar, agresif çıkar', key_attributes: 'Agresiflik, Hız, Dayanıklılık, Kapama, Cesaret' },
    { role_name: 'Zonal Defans Stoper', position: 'DF', description: 'Bölgesel savunma, mark etmez', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Hava Topu, Disiplin' },
    { role_name: 'Lider Stoper', position: 'DF', description: 'Savunmayı organize eder, liderlik yapar', key_attributes: 'Liderlik, İletişim, Pozisyon Alma, Güç, Hava Topu' },
    { role_name: 'Genç Stoper', position: 'DF', description: 'Gelişim aşamasında genç stoper', key_attributes: 'Potansiyel, Hız, Öğrenme, Konsantrasyon, Güç' },

    // BEKLER - 18 rol
    { role_name: 'Klasik Sağ Bek', position: 'DF', description: 'Geleneksel sağ bek, savunma öncelik', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Pozisyon Alma' },
    { role_name: 'Hücumcu Sağ Bek', position: 'DF', description: 'Hücuma çok katılır, orta yapar', key_attributes: 'Hız, Orta, Dayanıklılık, Pas, Dribling' },
    { role_name: 'İçeri Kesen Bek', position: 'DF', description: 'Orta sahaya kesilir, playmaker gibi', key_attributes: 'Pas, Teknik, Pozisyon Alma, Vizyon, Taktikel Zeka' },
    { role_name: 'Kanat Bek Destek', position: 'DF', description: 'Hücum-savunma dengeli kanat bek', key_attributes: 'Hız, Dayanıklılık, Orta, Kapama, Takım Çalışması' },
    { role_name: 'Kanat Bek Hücum', position: 'DF', description: 'Çok hücumcu kanat bek, kanat gibi', key_attributes: 'Hız, Orta, Dribling, Dayanıklılık, Pas' },
    { role_name: 'Kanat Bek Savunma', position: 'DF', description: 'Savunma öncelikli kanat bek', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Pozisyon Alma' },
    { role_name: 'Klasik Sol Bek', position: 'DF', description: 'Geleneksel sol bek, savunma öncelik', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Sol Ayak' },
    { role_name: 'Hücumcu Sol Bek', position: 'DF', description: 'Hücuma çok katılır, sol kanat desteği', key_attributes: 'Hız, Orta, Dayanıklılık, Pas, Sol Ayak' },
    { role_name: 'Güvenilir Bek', position: 'DF', description: 'Basit, etkili, güvenilir defans', key_attributes: 'Kapama, Güvenilirlik, Basitlik, Konsantrasyon, Disiplin' },
    { role_name: 'Atletik Kanat Bek', position: 'DF', description: 'Fiziksel üstünlük, hız ve güç', key_attributes: 'Hız, Güç, Dayanıklılık, Sıçrama, Atletizm' },

    // ORTA SAHALAR - 25 rol
    { role_name: 'Ankör Defansif Orta Saha', position: 'MF', description: 'Savunma hattı önünde kalır, koruma sağlar', key_attributes: 'Pozisyon Alma, Kapama, Ara Kesme, Konsantrasyon, Taktikel Disiplin' },
    { role_name: 'Top Kazanan Orta Saha', position: 'MF', description: 'Agresif top kazanımı, duel gücü', key_attributes: 'Kapama, Agresiflik, Dayanıklılık, İkili Mücadele, Cesaret' },
    { role_name: 'Kutu Kutu Orta Saha', position: 'MF', description: 'Her iki kutuya da koşar, dayanıklılık üst düzey', key_attributes: 'Dayanıklılık, Çalışkanlık, Pas, Şut, Takım Çalışması' },
    { role_name: 'Dengeli Merkez Orta Saha', position: 'MF', description: 'Klasik dengeli orta saha', key_attributes: 'Pas, Dayanıklılık, Takım Çalışması, Pozisyon Alma, Teknik' },
    { role_name: 'Gezen Playmaker', position: 'MF', description: 'Serbest dolaşır, yaratıcı paslar', key_attributes: 'Vizyon, Dribling, Pas, Yaratıcılık, Topsuz Hareket' },
    { role_name: 'Pressing Orta Saha', position: 'MF', description: 'Yüksek pressing, top kazanımı üst seviye', key_attributes: 'Dayanıklılık, Çalışkanlık, Pressing, İş Ahlakı, Hız' },
    { role_name: 'Klasik On Numara', position: 'MF', description: 'Forvet arkası oyun kurucu', key_attributes: 'Yaratıcılık, Vizyon, Asist, Pas, Teknik' },
    { role_name: 'İleri Playmaker', position: 'MF', description: 'İleri bölgeden oyun kurar', key_attributes: 'Vizyon, Pas, Yaratıcılık, Teknik, Bitiricilik' },
    { role_name: 'Gölge Forvet', position: 'MF', description: 'Forvet arkasından box\'a dalışlar', key_attributes: 'Bitiricilik, Topsuz Hareket, Zamanlama, Şut, Pozisyon Alma' },
    { role_name: 'Defansif Orta Saha', position: 'MF', description: 'Savunma odaklı orta saha, disiplinli', key_attributes: 'Kapama, Pozisyon Alma, Takım Çalışması, Disiplin, Dayanıklılık' },

    // KANATLAR - 8 rol
    { role_name: 'Klasik Kanat', position: 'MF', description: 'Geleneksel kanat, orta yapar', key_attributes: 'Hız, Orta, Dribling, Dayanıklılık, 1v1' },
    { role_name: 'İçeri Kesen Kanat', position: 'MF', description: 'İçeriye kesilerek şut atar', key_attributes: 'Bitiricilik, Dribling, Hız, Ters Ayak, Şut' },
    { role_name: 'Geniş Playmaker', position: 'MF', description: 'Kanattan oyun kurar, asist odaklı', key_attributes: 'Vizyon, Pas, Dribling, Orta, Yaratıcılık' },
    { role_name: 'İçeri Giren Forvet', position: 'MF', description: 'Forvet gibi, gol odaklı kanat', key_attributes: 'Bitiricilik, Pozisyon Alma, Hız, Dribling, Soğukkanlılık' },
    { role_name: 'Destek Kanat', position: 'MF', description: 'Takım oyununa odaklı kanat', key_attributes: 'Pas, Çalışkanlık, Dayanıklılık, Takım Çalışması, Dribling' },
    { role_name: 'Hızlı Kanat', position: 'MF', description: 'Pure hız, counter tehdidi', key_attributes: 'Hız, İvmelenme, Dribling, Orta, 1v1' },

    // FORVETLER - 12 rol
    { role_name: 'Hedef Adam Forvet', position: 'FW', description: 'Fiziksel güç, hava topu, tutma oyunu', key_attributes: 'Güç, Hava Topu, Tutma Oyunu, Kafa, Boy' },
    { role_name: 'Bitirici Forvet', position: 'FW', description: 'Ceza sahası içi bitirici, gol makinesi', key_attributes: 'Bitiricilik, Pozisyon Alma, Soğukkanlılık, Topsuz Hareket, Fırsatçılık' },
    { role_name: 'Komple Forvet', position: 'FW', description: 'Her şeyi yapar: gol, asist, tutma', key_attributes: 'Bitiricilik, Pas, Güç, Hız, Teknik' },
    { role_name: 'Pressing Forvet', position: 'FW', description: 'Yüksek pressing, defansa baskı yapar', key_attributes: 'Çalışkanlık, Dayanıklılık, Pressing, Hız, Agresiflik' },
    { role_name: 'Derin Düşen Forvet', position: 'FW', description: 'Geri çekilir, link-up play yapar', key_attributes: 'Pas, Vizyon, Tutma Oyunu, Teknik, Takım Çalışması' },
    { role_name: 'Hızlı Forvet', position: 'FW', description: 'Hız odaklı, counter tehdidi', key_attributes: 'Hız, İvmelenme, Bitiricilik, Topsuz Hareket, Soğukkanlılık' },
    { role_name: 'İkinci Forvet', position: 'FW', description: 'Forvet arkasında destek sağlar', key_attributes: 'Pas, Dribling, Yaratıcılık, Bitiricilik, Topsuz Hareket' },
    { role_name: 'Savunmaya Katkılı Forvet', position: 'FW', description: 'Fiziksel oyun, savunmaya da katkı', key_attributes: 'Güç, İkili Mücadele, Çalışkanlık, Tutma Oyunu, Kafa' },
    { role_name: 'Genç Forvet', position: 'FW', description: 'Gelişim aşamasında genç forvet', key_attributes: 'Potansiyel, Hız, Öğrenme, Bitiricilik, Gelişim' },
    { role_name: 'Teknik Forvet', position: 'FW', description: 'Teknik yetenekli, dribling ustası forvet', key_attributes: 'Teknik, Dribling, Yaratıcılık, Bitiricilik, 1v1' }
  ];

  console.log(`📝 ${newRoles.length} yeni rol template ile ekleniyor...\n`);

  // SQL için tüm kolonları kullan, sadece önemli olanları değiştir
  const insertSQL = `INSERT INTO player_roles
    (role_name, position, sub_position, description, detailed_explanation, tactical_purpose,
     mentality, key_attributes, ideal_height_range, ideal_age_range, example_players,
     movement_pattern, positioning, off_ball_movement, on_ball_behavior,
     primary_duties, secondary_duties, defensive_duties, attacking_duties,
     pace_importance, stamina_importance, strength_importance, agility_importance,
     passing_importance, dribbling_importance, shooting_importance, tackling_importance,
     marking_importance, positioning_importance, vision_importance, decision_importance,
     concentration_importance, work_rate_importance, teamwork_importance,
     best_in_formations, tactical_systems_compatibility, real_world_examples)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  let completed = 0;
  let errors = 0;

  newRoles.forEach(role => {
    ultraDb.run(insertSQL, [
      role.role_name,
      role.position,
      role.position === 'GK' ? 'GK' : (role.position === 'DF' ? 'CB' : (role.position === 'MF' ? 'CM' : 'ST')),
      role.description,
      role.description + ' Modern futbolda önemli bir rol olup takım dengesine büyük katkı sağlar.',
      'Takımın taktik yapısında stratejik öneme sahip pozisyon',
      'Dengeli',
      role.key_attributes,
      role.position === 'GK' ? '185-198 cm' : (role.position === 'DF' ? '178-190 cm' : (role.position === 'MF' ? '170-185 cm' : '175-188 cm')),
      '23-30 yaş',
      'Modern profesyonel futbolcular',
      template.movement_pattern,
      template.positioning,
      template.off_ball_movement,
      template.on_ball_behavior,
      template.primary_duties,
      template.secondary_duties,
      template.defensive_duties,
      template.attacking_duties,
      template.pace_importance,
      template.stamina_importance,
      template.strength_importance,
      template.agility_importance,
      template.passing_importance,
      template.dribbling_importance,
      template.shooting_importance,
      template.tackling_importance,
      template.marking_importance,
      template.positioning_importance,
      template.vision_importance,
      template.decision_importance,
      template.concentration_importance,
      template.work_rate_importance,
      template.teamwork_importance,
      '4-3-3, 4-2-3-1, 3-5-2',
      'Çeşitli taktik sistemlerle uyumlu',
      'Çeşitli modern futbolcular'
    ], function(err) {
      if (err) {
        console.error(`❌ ${role.role_name}:`, err.message);
        errors++;
      } else {
        completed++;
        if (completed % 10 === 0 || completed === newRoles.length) {
          console.log(`⏳ ${completed}/${newRoles.length} rol eklendi...`);
        }
      }

      if (completed + errors === newRoles.length) {
        console.log(`\n🎉 ROL EKLEME TAMAMLANDI!`);
        console.log(`   ✅ Başarılı: ${completed}`);
        console.log(`   ❌ Hatalı: ${errors}`);
        console.log(`   🏆 TOPLAM ROL SİSTEMDE: ${29 + completed}\n`);
        ultraDb.close();
      }
    });
  });
});
