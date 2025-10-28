# ⚽ Futbol Taktik Analiz Sistemi

Futbol koçları için geliştirilmiş kapsamlı bir taktik analiz ve yönetim platformu. Oyuncu yönetimi, maç analizi, taktik planlama, rakip analizi ve antrenman programlama modüllerini içerir.

## 🌟 Özellikler

### 1. **Oyuncu Yönetimi**
- Oyuncu profilleri ve detaylı bilgiler
- İstatistik takibi (gol, asist, pas isabeti, vb.)
- Sezon bazlı performans analizi
- Pozisyon ve rating sistemi

### 2. **Maç Analizi**
- Maç sonuçları ve skorlar
- Detaylı performans metrikleri (top hakimiyeti, şut, pas, vb.)
- Oyuncu bazlı maç performansları
- Maç geçmişi ve karşılaştırma

### 3. **Taktik Kütüphanesi**
- Farklı formasyon şablonları (4-4-2, 4-3-3, vb.)
- Taktik sistemler ve oyun stilleri
- Pozisyon talimatları
- Özelleştirilebilir taktikler

### 4. **Rakip Analizi**
- Rakip takım profilleri
- Güçlü ve zayıf yönler analizi
- Anahtar oyuncu tespiti
- Maç geçmişi ve istatistikler

### 5. **Antrenman Planlama**
- Hazır antrenman şablonları
- Kategori bazlı egzersizler (Fiziksel, Teknik, Taktik, vb.)
- Antrenman takvimi
- Detaylı egzersiz açıklamaları

### 6. **Dashboard**
- Genel istatistikler ve metrikler
- Son maçlar özeti
- En iyi performans gösteren oyuncular
- Yaklaşan antrenmanlar
- Görsel grafikler ve raporlar

## 🛠️ Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Veritabanı
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI kütüphanesi
- **Vite** - Build tool
- **TailwindCSS** - CSS framework
- **React Router** - Routing
- **Chart.js** - Grafik kütüphanesi
- **Axios** - HTTP client

## 📦 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### 1. Projeyi İndirin
```bash
cd C:\Projects\FTA
```

### 2. Backend Kurulumu
```bash
cd backend
npm install
```

### 3. Frontend Kurulumu
```bash
cd frontend
npm install
```

### 4. Örnek Verileri Yükleyin (Opsiyonel)
```bash
cd backend
node seed.js
```

## 🚀 Çalıştırma

### Backend Sunucusu
```bash
cd backend
npm start
```
Backend sunucu http://localhost:5000 adresinde çalışacaktır.

### Frontend Uygulaması
```bash
cd frontend
npm run dev
```
Frontend uygulama http://localhost:3000 adresinde çalışacaktır.

## 📁 Proje Yapısı

```
FTA/
├── backend/
│   ├── routes/          # API route'ları
│   │   ├── players.js
│   │   ├── matches.js
│   │   ├── tactics.js
│   │   ├── opponents.js
│   │   ├── training.js
│   │   └── dashboard.js
│   ├── database.js      # Veritabanı şeması
│   ├── server.js        # Express server
│   ├── seed.js          # Örnek veriler
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React bileşenleri
│   │   │   └── Layout.jsx
│   │   ├── pages/       # Sayfa bileşenleri
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Players.jsx
│   │   │   ├── PlayerDetail.jsx
│   │   │   ├── Matches.jsx
│   │   │   ├── MatchDetail.jsx
│   │   │   ├── Tactics.jsx
│   │   │   ├── TacticDetail.jsx
│   │   │   ├── Opponents.jsx
│   │   │   ├── OpponentDetail.jsx
│   │   │   ├── Training.jsx
│   │   │   └── TrainingDetail.jsx
│   │   ├── services/    # API servisleri
│   │   │   └── api.js
│   │   ├── App.jsx      # Ana uygulama
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Global stiller
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🎯 Kullanım

### Oyuncu Ekleme
1. Oyuncular sayfasına gidin
2. "Yeni Oyuncu" butonuna tıklayın
3. Oyuncu bilgilerini girin
4. Kaydet

### Maç Kaydı Oluşturma
1. Maçlar sayfasına gidin
2. "Yeni Maç" butonuna tıklayın
3. Maç detaylarını girin (rakip, tarih, skor, vb.)
4. Kaydet

### Taktik Oluşturma
1. Taktikler sayfasına gidin
2. "Yeni Taktik" butonuna tıklayın
3. Formasyon ve talimatları belirleyin
4. Kaydet

### Antrenman Planlama
1. Antrenmanlar sayfasına gidin
2. Önce şablon oluşturun veya mevcut şablonu kullanın
3. "Yeni Plan" ile antrenman takvime ekleyin

## 📊 API Endpoints

### Oyuncular
- `GET /api/players` - Tüm oyuncuları listele
- `GET /api/players/:id` - Tek oyuncu detayı
- `POST /api/players` - Yeni oyuncu ekle
- `PUT /api/players/:id` - Oyuncu güncelle
- `DELETE /api/players/:id` - Oyuncu sil

### Maçlar
- `GET /api/matches` - Tüm maçları listele
- `GET /api/matches/:id` - Tek maç detayı
- `POST /api/matches` - Yeni maç ekle
- `PUT /api/matches/:id` - Maç güncelle
- `DELETE /api/matches/:id` - Maç sil

### Taktikler
- `GET /api/tactics` - Tüm taktikleri listele
- `GET /api/tactics/:id` - Tek taktik detayı
- `POST /api/tactics` - Yeni taktik ekle
- `PUT /api/tactics/:id` - Taktik güncelle
- `DELETE /api/tactics/:id` - Taktik sil

### Dashboard
- `GET /api/dashboard/stats` - Genel istatistikler
- `GET /api/dashboard/recent-matches` - Son maçlar
- `GET /api/dashboard/top-players` - En iyi oyuncular

## 🔧 Geliştirme

### Backend Geliştirme Modu
```bash
cd backend
npm run dev  # nodemon ile otomatik yenileme
```

### Frontend Geliştirme Modu
```bash
cd frontend
npm run dev  # Hot reload aktif
```

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Futbol koçları için geliştirilmiş kapsamlı bir analiz sistemi.

## 📞 Destek

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Not:** Bu sistem profesyonel futbol koçlarının günlük çalışmalarını kolaylaştırmak için tasarlanmıştır. Sürekli geliştirme ve iyileştirmeler yapılmaktadır.
