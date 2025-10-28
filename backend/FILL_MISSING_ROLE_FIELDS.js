const db = require('./ultra_database');

console.log('\n🔄 OYUNCU ROLLERİ EKSİK ALANLAR DOLDURMA...\n');

// Pozisyona göre default değerler
const positionDefaults = {
  'GK': {
    secondary_attributes: 'Refleksler, Hava Hakimiyeti, Uzun Atış, Ceza Sahası Kontrolü, Bire Bir Kurtarışlar',
    physical_requirements: 'İyi boy (185cm+), Güçlü refleksler, Çeviklik, Patlayıcı güç, Dayanıklılık',
    mental_attributes: 'Konsantrasyon, Pozisyon Alma, Soğukkanlılık, İletişim, Karar Verme',
    attacking_duties: JSON.stringify(['Hızlı build-up başlatma', 'Uzun pas dağıtımı', 'Kısa pas seçenekleri', 'Ceza sahası dışı müdahale']),
    defensive_duties: JSON.stringify(['Şut kurtarma', 'Hava topu yakalama', 'Ceza sahası kontrolü', 'Bire bir durumlar', 'Savunma organize etme'])
  },
  'DF': {
    secondary_attributes: 'Hava Topu, Kuvvet, İkili Mücadele, Pas, Top Sürme, Pozisyon Alma',
    physical_requirements: 'Güçlü fizik, İyi boy (180cm+), Sprint hızı, Dayanıklılık, İkili mücadele gücü',
    mental_attributes: 'Konsantrasyon, Pozisyon Alma, Öngörü, Takım Çalışması, Sakinlik',
    attacking_duties: JSON.stringify(['Build-up katkısı', 'Ara sıra öne çıkma', 'Duran toplar', 'Kanat overlapping (bekler için)']),
    defensive_duties: JSON.stringify(['Birebir savunma', 'Hava topu mücadelesi', 'Takım arkadaşı örtüleme', 'Pas hatlarını kesme', 'Kompakt kalma'])
  },
  'MF': {
    secondary_attributes: 'Uzun Pas, Yaratıcılık, Dribling, Şut, Savunmaya Katılım, Dayanıklılık',
    physical_requirements: 'Yüksek dayanıklılık, İyi kondisyon, Hız, Çeviklik, Alandan alana koşu gücü',
    mental_attributes: 'Vizyon, Karar Verme, Yaratıcılık, İş Ahlakı, Takım Oyunu, Pozisyon Alma',
    attacking_duties: JSON.stringify(['Ara paslar', 'Ceza sahasına koşular', 'Şut çekme', 'Pas dağıtımı', 'Yaratıcılık']),
    defensive_duties: JSON.stringify(['Top kapma', 'Pressing', 'Pas hatlarını kesme', 'Pozisyon koruma', 'Geri dönüş'])
  },
  'FW': {
    secondary_attributes: 'Bitiricilik, Pozisyonda Olma, Hız, Kafa Vuruşu, Bireysel Yetenek, Soğukkanlılık',
    physical_requirements: 'Patlayıcı hız, Sprint gücü, Çeviklik, Kuvvet (hedef adam için), Atlama (kafa için)',
    mental_attributes: 'Soğukkanlılık, Bitiricilik, Pozisyon Alma, Öngörü, Konsantrasyon, Özgüven',
    attacking_duties: JSON.stringify(['Gol atmak', 'Pozisyon almak', 'Savunmayı germek', 'Koşular yapmak', 'Top tutma (hedef adam)']),
    defensive_duties: JSON.stringify(['İlk baskı', 'Pas hatlarını kapatma', 'Takım organizasyonu', 'Geçiş sonrası pressing'])
  }
};

async function fillMissingFields() {
  const sql = `SELECT id, position FROM player_roles`;

  db.all(sql, [], async (err, roles) => {
    if (err) {
      console.error('Roller çekilemedi:', err);
      return;
    }

    console.log(`📊 ${roles.length} rol işlenecek...\n`);

    let completed = 0;
    let updated = 0;

    for (const role of roles) {
      const defaults = positionDefaults[role.position] || positionDefaults['MF'];

      const updateSql = `UPDATE player_roles SET
        secondary_attributes = COALESCE(NULLIF(secondary_attributes, ''), ?),
        physical_requirements = COALESCE(NULLIF(physical_requirements, ''), ?),
        mental_attributes = COALESCE(NULLIF(mental_attributes, ''), ?),
        attacking_duties = CASE
          WHEN attacking_duties IS NULL OR attacking_duties = '' OR attacking_duties = '["Attacking"]'
          THEN ?
          ELSE attacking_duties
        END,
        defensive_duties = CASE
          WHEN defensive_duties IS NULL OR defensive_duties = '' OR defensive_duties = '["Defensive"]'
          THEN ?
          ELSE defensive_duties
        END
        WHERE id = ?`;

      await new Promise((resolve) => {
        db.run(updateSql, [
          defaults.secondary_attributes,
          defaults.physical_requirements,
          defaults.mental_attributes,
          defaults.attacking_duties,
          defaults.defensive_duties,
          role.id
        ], function(err) {
          if (err) {
            console.log(`❌ Rol ${role.id} güncellenemedi:`, err.message);
          } else {
            if (this.changes > 0) {
              updated++;
              console.log(`✅ Rol ${role.id} (${role.position}) - Eksik alanlar dolduruldu`);
            }
            completed++;
          }
          resolve();
        });
      });
    }

    console.log(`\n✅ İşlem tamamlandı!`);
    console.log(`   İşlenen rol: ${completed}`);
    console.log(`   Güncellenen rol: ${updated}`);
    console.log(`\n🎉 Tüm roller artık tam dolu!\n`);

    db.close();
  });
}

fillMissingFields();
