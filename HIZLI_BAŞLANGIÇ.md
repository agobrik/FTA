# ⚡ HIZLI BAŞLANGIÇ REHBERİ

## 🎯 SİSTEMİ 5 DAKİKADA ÇALIŞTIRIN

### Adım 1: Terminal Açın (2 adet)

**Terminal 1 - Backend**
```bash
cd C:\Projects\FTA\backend
npm start
```

Şunu görmelisiniz:
```
🚀 Server is running on port 5000
📊 Environment: development
🔗 API: http://localhost:5000/api
✅ Health check: http://localhost:5000/api/health
```

**Terminal 2 - Frontend**
```bash
cd C:\Projects\FTA\frontend
npm run dev
```

Şunu görmelisiniz:
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
```

### Adım 2: Tarayıcıda Açın
```
http://localhost:3000
```

---

## ✅ HAZIR! SİSTEM ÇALIŞIYOR

Şimdi ne yapabilirsiniz:

### 📊 Dashboard'a Bakın
- Ana sayfa otomatik açılır
- Genel istatistikleri görün

### 👥 Oyuncu Ekleyin
1. Sol menüden "Oyuncular"
2. "Yeni Oyuncu" butonu
3. Formu doldurun
4. Kaydet

### ⚽ Maç Kaydedin
1. Sol menüden "Maçlar"
2. "Yeni Maç" butonu
3. Rakip, tarih, skor girin
4. Performans metriklerini ekleyin

### 🎓 Taktik Analiz
1. Sol menüden "Taktik Analiz"
2. 45+ taktik sistemi inceleyin
3. 56 oyuncu rolünü keşfedin
4. Anti-taktik stratejilerini öğrenin

---

## 🔐 KULLANICI HESABI OLUŞTURUN (Opsiyonel)

### API ile Kayıt
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "koc123",
    "email": "koc@example.com",
    "password": "guvenli123",
    "full_name": "Ahmet Koç",
    "team_name": "Beşiktaş"
  }'
```

### Giriş Yap
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "koc@example.com",
    "password": "guvenli123"
  }'
```

Token'ı kaydedin ve isteklerde kullanın!

---

## 📥 EXPORT/IMPORT

### CSV İndir
Tarayıcıda bu URL'leri açın:

**Oyuncular:**
```
http://localhost:5000/api/export/players/csv
```

**Maçlar:**
```
http://localhost:5000/api/export/matches/csv
```

**Tam Yedek (JSON):**
```
http://localhost:5000/api/export/backup/json
```

---

## 🎨 YENİ COMPONENTLER

### Notification Kullan
```javascript
import toast from 'react-hot-toast';

toast.success('Başarılı!');
toast.error('Hata!');
toast.loading('Yükleniyor...');
```

### Loading Spinner
```javascript
import LoadingSpinner from './components/LoadingSpinner';

<LoadingSpinner size="lg" message="Veriler yükleniyor..." />
```

### Radar Chart (Oyuncu Karşılaştırma)
```javascript
import PlayerRadarChart from './components/charts/PlayerRadarChart';

<PlayerRadarChart
  players={[
    {
      name: 'Messi',
      data: { shooting: 95, passing: 92, pace: 85, defending: 38, physicality: 68, dribbling: 97 }
    },
    {
      name: 'Ronaldo',
      data: { shooting: 93, passing: 82, pace: 87, defending: 35, physicality: 78, dribbling: 88 }
    }
  ]}
/>
```

---

## 🚨 SORUN GİDERME

### Backend çalışmıyor?
```bash
# Port kullanımda mı kontrol et
netstat -ano | findstr :5000

# Veritabanı var mı?
dir backend\football_tactics.db

# Bağımlılıklar yüklü mü?
cd backend
npm install
```

### Frontend çalışmıyor?
```bash
# Bağımlılıklar yüklü mü?
cd frontend
npm install

# Port kullanımda mı?
netstat -ano | findstr :3000
```

### API'ye ulaşamıyor?
1. Backend çalışıyor mu? → http://localhost:5000/api/health
2. CORS hatası mı? → .env'de CORS_ORIGIN kontrol et
3. Network tab'da hata var mı? → F12 > Network

---

## 📚 DAHA FAZLA BİLGİ

- **Tam Kullanım Kılavuzu:** `SİSTEM_ANALİZ_VE_KULLANIM_RAPORU.md`
- **İyileştirme Önerileri:** `SİSTEM_İYİLEŞTİRME_ÖNERİLERİ.md`
- **Tamamlananlar:** `TAMAMLANAN_İYİLEŞTİRMELER.md`
- **Taktik Analiz Kılavuzu:** `TACTICAL_ANALYSIS_GUIDE.md`

---

## 🎉 BAŞARILAR!

Sisteminiz hazır. İyi çalışmalar! ⚽
