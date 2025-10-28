const db = require('./ultra_database');

console.log('\n🔄 OYUNCU ROLLERİ GÖREV ALANLARI GÜNCELLEME...\n');

// Pozisyona göre görev default'ları
const dutyDefaults = {
  'GK': {
    attacking: ['Hızlı build-up başlatma', 'Uzun pas dağıtımı', 'Kısa pas seçenekleri', 'Ceza sahası dışı müdahale'],
    defensive: ['Şut kurtarma', 'Hava topu yakalama', 'Ceza sahası kontrolü', 'Bire bir durumlar', 'Savunma organize etme'],
    in_possession: 'Arkadan oyun kurmada aktif rol alır. Kısa pas seçenekleri sunar ve uzun pas dağıtımıyla hızlı geçişleri başlatabilir.',
    out_of_possession: 'Ceza sahasını kontrol eder, savunma hattını organize eder, gerektiğinde ceza sahası dışına müdahale eder.',
    transition: 'Top kazanımı sonrası hızlı dağıtım yapar. Kontra atak fırsatlarında uzun pas ile hücumu başlatır.'
  },
  'DF': {
    attacking: ['Build-up katkısı', 'Ara sıra öne çıkma', 'Duran toplar', 'Kanat overlapping'],
    defensive: ['Birebir savunma', 'Hava topu mücadelesi', 'Takım arkadaşı örtüleme', 'Pas hatlarını kesme', 'Kompakt kalma'],
    in_possession: 'Arkadan oyun kurmada güvenli pas seçenekleri sunar. Gerektiğinde topu ileriye taşır ve build-up\'a katılır.',
    out_of_possession: 'Bireysel savunma görevlerini yerine getirir. Takım arkadaşlarını örtüler ve kompakt kalarak boşlukları kapatır.',
    transition: 'Top kaybında hızlı geri dönüş yapar. Top kazanımında topu ileriye güvenli şekilde taşır veya dağıtır.'
  },
  'MF': {
    attacking: ['Ara paslar', 'Ceza sahasına koşular', 'Şut çekme', 'Pas dağıtımı', 'Yaratıcılık'],
    defensive: ['Top kapma', 'Pressing', 'Pas hatlarını kesme', 'Pozisyon koruma', 'Geri dönüş'],
    in_possession: 'Oyunun kalbinde yer alır. Pas dağıtımı yapar, yaratıcılık gösterir ve ceza sahasına koşularla destek verir.',
    out_of_possession: 'Pressing uygular, pas hatlarını keser ve savunmaya dengeli katkı sağlar. Hücum-savunma dengesini korur.',
    transition: 'Her iki yönde de hızlı geçişlerde kritik rol oynar. Kontra ataklarda ara pas verir, savunmaya geçişte pozisyon alır.'
  },
  'FW': {
    attacking: ['Gol atmak', 'Pozisyon almak', 'Savunmayı germek', 'Koşular yapmak', 'Top tutma'],
    defensive: ['İlk baskı', 'Pas hatlarını kapatma', 'Takım organizasyonu', 'Geçiş sonrası pressing'],
    in_possession: 'Gol pozisyonları arar, savunmanın arkasına koşular yapar ve takım arkadaşlarına destek verir. Bitirici rolde.',
    out_of_possession: 'İlk baskıyı uygular, rakip build-up\'ı zorlaştırır ve pas hatlarını kapatarak takıma yardım eder.',
    transition: 'Hızlı kontra ataklarda hedef nokta olur. Derinlere koşular yaparak boşluğu kullanır ve bitirici hamleleri gerçekleştirir.'
  }
};

async function updateRoleDuties() {
  const sql = `SELECT id, position FROM player_roles`;

  db.all(sql, [], async (err, roles) => {
    if (err) {
      console.error('Roller çekilemedi:', err);
      return;
    }

    console.log(`📊 ${roles.length} rol güncellenecek...\n`);

    let completed = 0;
    let updated = 0;

    for (const role of roles) {
      const defaults = dutyDefaults[role.position] || dutyDefaults['MF'];

      const updateSql = `UPDATE player_roles SET
        attacking_duties = CASE
          WHEN attacking_duties IS NULL OR attacking_duties = '' OR attacking_duties = '["Attacking"]' OR attacking_duties = '[\"Attacking\"]'
          THEN ?
          ELSE attacking_duties
        END,
        defensive_duties = CASE
          WHEN defensive_duties IS NULL OR defensive_duties = '' OR defensive_duties = '["Defensive"]' OR defensive_duties = '[\"Defensive\"]'
          THEN ?
          ELSE defensive_duties
        END,
        in_possession_role = CASE
          WHEN in_possession_role IS NULL OR in_possession_role = '' OR in_possession_role = 'Test on ball' OR LENGTH(in_possession_role) < 20
          THEN ?
          ELSE in_possession_role
        END,
        out_of_possession_role = CASE
          WHEN out_of_possession_role IS NULL OR out_of_possession_role = '' OR out_of_possession_role = 'Test out of possession' OR LENGTH(out_of_possession_role) < 20
          THEN ?
          ELSE out_of_possession_role
        END,
        transition_role = CASE
          WHEN transition_role IS NULL OR transition_role = '' OR transition_role = 'Test transition' OR LENGTH(transition_role) < 20
          THEN ?
          ELSE transition_role
        END
        WHERE id = ?`;

      await new Promise((resolve) => {
        db.run(updateSql, [
          JSON.stringify(defaults.attacking),
          JSON.stringify(defaults.defensive),
          defaults.in_possession,
          defaults.out_of_possession,
          defaults.transition,
          role.id
        ], function(err) {
          if (err) {
            console.log(`❌ Rol ${role.id} güncellenemedi:`, err.message);
          } else {
            if (this.changes > 0) {
              updated++;
              console.log(`✅ Rol ${role.id} (${role.position}) güncellendi`);
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
    console.log(`\n🎉 Tüm roller artık detaylı görev açıklamalarına sahip!\n`);

    db.close();
  });
}

updateRoleDuties();
