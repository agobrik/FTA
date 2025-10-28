const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics.db');
const db = new sqlite3.Database(dbPath);

async function createAdminUser() {
  try {
    // Admin şifresi hash'le
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('admin123', salt);

    const sql = `INSERT INTO users (username, email, password_hash, team_name, full_name, role, is_active)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [
      'admin',
      'admin@fta.com',
      password_hash,
      'FTA Admin Team',
      'System Administrator',
      'admin',
      1
    ], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          console.log('ℹ️  Admin kullanıcısı zaten mevcut');
        } else {
          console.error('❌ Hata:', err.message);
        }
      } else {
        console.log('✅ Admin kullanıcısı oluşturuldu!');
        console.log('');
        console.log('📧 Email: admin@fta.com');
        console.log('🔑 Şifre: admin123');
        console.log('');
        console.log('⚠️  ÖNEMLİ: Production\'da bu şifreyi değiştirin!');
      }
      db.close();
    });
  } catch (error) {
    console.error('Hata:', error);
    db.close();
  }
}

createAdminUser();
