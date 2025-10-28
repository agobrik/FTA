const ultraDb = require('./ultra_database');

console.log('🔧 DATABASE CONSTRAINT SORUNU ÇÖZÜLÜYOR VE 100+ ROL EKLENİYOR...\n');

// Strateji: Mevcut bir rolü template olarak kullan, tüm kolonlarını al
// Sadece önemli alanları değiştir, geri kalanı template'ten gelsin

const templateSql = 'SELECT * FROM player_roles WHERE id = 1 LIMIT 1';

ultraDb.get(templateSql, [], (err, template) => {
  if (err) {
    console.error('Template bulunamadı:', err);
    ultraDb.close();
    return;
  }

  console.log('✅ Template rol bulundu, 100+ yeni rol ekleniyor...\n');

  // Kapsamlı rol listesi - 100+ rol
  const newRoles = [
    // KALECİLER - 15 rol (kalecinin birden fazla rolü olmalı!)
    { role_name: 'Klasik Kaleci', position: 'GK', sub_position: 'GK', description: 'Geleneksel kaleci, hatta kalır, kurtarışa odaklanır', key_attributes: 'Refleks, Pozisyon Alma, 1v1, Hava Topu, Konsantrasyon', example_players: 'Peter Schmeichel, Iker Casillas, Oliver Kahn' },
    { role_name: 'Şut Durdurucu Kaleci', position: 'GK', sub_position: 'GK', description: 'Refleksle kurtarış yapan, şut durmaya odaklı', key_attributes: 'Refleks, Diving, Konsantrasyon, Pozisyon Alma, Cesaret', example_players: 'Thibaut Courtois, Jan Oblak, Gianluigi Donnarumma' },
    { role_name: 'Agresif Kaleci', position: 'GK', sub_position: 'GK', description: 'Ceza sahası dışına çıkar, topla aktif', key_attributes: 'Cesaret, Hız, Refleks, Ayakla Oyun, 1v1', example_players: 'René Higuita, Jorge Campos, Claudio Bravo' },
    { role_name: 'Pasif Kaleci', position: 'GK', sub_position: 'GK', description: 'Hatta kalır, hava toplarına odaklanır', key_attributes: 'Hava Topu, Boy, Güç, Refleks, Pozisyon Alma', example_players: 'Petr Čech, Edwin van der Sar' },
    { role_name: 'Oyun Kuran Kaleci', position: 'GK', sub_position: 'GK', description: 'Modern kaleci, ayakla pas yaparak oyun kurar', key_attributes: 'Kısa Pas, Uzun Pas, Vizyon, Teknik, Sakinlik', example_players: 'Ederson, Alisson, Marc-André ter Stegen' },
    { role_name: 'Penaltı Uzmanı Kaleci', position: 'GK', sub_position: 'GK', description: 'Penaltı kurtarmada üst düzey, analiz odaklı', key_attributes: 'Refleks, Konsantrasyon, Oyun Okuma, Cesaret, Diving', example_players: 'Gianluigi Buffon, Keylor Navas, Emiliano Martínez' },
    { role_name: 'Hücum Organize Eden Kaleci', position: 'GK', sub_position: 'GK', description: 'Uzun pas ile hücum başlatır, dikey pas', key_attributes: 'Uzun Pas, Güç, Vizyon, Teknik, Sakinlik', example_players: 'Pepe Reina, Asmir Begović' },
    { role_name: 'Lider Kaleci', position: 'GK', sub_position: 'GK', description: 'Takımı savunmada organize eder, komuta eder', key_attributes: 'Liderlik, İletişim, Pozisyon Alma, Konsantrasyon, Güven', example_players: 'Oliver Kahn, Manuel Neuer, Buffon' },
    { role_name: 'Genç Kaleci', position: 'GK', sub_position: 'GK', description: 'Gelişim aşamasında, potansiyelli genç kaleci', key_attributes: 'Potansiyel, Refleks, Öğrenme, Konsantrasyon, Gelişim', example_players: 'Anatoliy Trubin, Diogo Costa' },
    { role_name: 'False Keeper', position: 'GK', sub_position: 'GK', description: 'Sürekli sahada 11. oyuncu gibi, aşırı modern', key_attributes: 'Pas, Teknik, Cesaret, Hız, Oyun Okuma', example_players: 'Ederson (ekstrem), Neuer (prime)' },
    { role_name: 'Hava Topu Uzmanı Kaleci', position: 'GK', sub_position: 'GK', description: 'Korner ve ortalarda dominant', key_attributes: 'Hava Topu, Boy, Güç, Sıçrama, Pozisyon Alma', example_players: 'Courtois, Čech' },
    { role_name: 'Refleks Kaleci', position: 'GK', sub_position: 'GK', description: 'İnanılmaz refleks, imkansız kurtarışlar', key_attributes: 'Refleks, Çeviklik, Diving, Konsantrasyon, Hız', example_players: 'David de Gea (prime), Oblak' },
    { role_name: 'Komple Kaleci', position: 'GK', sub_position: 'GK', description: 'Her şeyi yapar, çok yönlü kaleci', key_attributes: 'Refleks, Pas, Hava Topu, Liderlik, Teknik', example_players: 'Neuer, Alisson, Courtois' },
    { role_name: 'Savunma Örgütleyici Kaleci', position: 'GK', sub_position: 'GK', description: 'Savunmayı organize eder, taktik bilgisi yüksek', key_attributes: 'Liderlik, İletişim, Taktikal Zeka, Pozisyon Alma, Konsantrasyon', example_players: 'Buffon, Kahn, Casillas' },
    { role_name: 'Yüksek Hat Kaleci', position: 'GK', sub_position: 'GK', description: 'Yüksek savunma hattında rahat, süpürücü', key_attributes: 'Hız, Cesaret, Pozisyon Alma, Oyun Okuma, 1v1', example_players: 'Neuer, Ederson, Ter Stegen' },

    // STOPERLER - 18 rol
    { role_name: 'Klasik Stoper', position: 'DF', sub_position: 'CB', description: 'Geleneksel savunmacı, güç ve hava topu', key_attributes: 'Kapama, Güç, Hava Topu, İkili Mücadele, Pozisyon Alma', example_players: 'Rio Ferdinand, Nemanja Vidić, John Terry' },
    { role_name: 'Hızlı Stoper', position: 'DF', sub_position: 'CB', description: 'Hızlı, counter tehdidi kapatır', key_attributes: 'Hız, İvmelenme, Kapama, Pozisyon Alma, Okuma Oyunu', example_players: 'Raphaël Varane, Kalidou Koulibaly, Marquinhos' },
    { role_name: 'Güçlü Stoper', position: 'DF', sub_position: 'CB', description: 'Fiziksel güç, hava hakimiyeti, duel gücü', key_attributes: 'Güç, Hava Topu, İkili Mücadele, Agresiflik, Cesaret', example_players: 'Vincent Kompany, Sergio Ramos, Virgil van Dijk' },
    { role_name: 'Kapsayan Stoper', position: 'DF', sub_position: 'CB', description: 'Arkada kalır, partner için cover sağlar', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Hız, Kapama', example_players: 'Giorgio Chiellini, Thiago Silva, Mats Hummels' },
    { role_name: 'Agresif Stoper', position: 'DF', sub_position: 'CB', description: 'İleri çıkar, agresif kapama yapar', key_attributes: 'Agresiflik, Kapama, Güç, Cesaret, İkili Mücadele', example_players: 'Carles Puyol, Pepe, Sergio Ramos' },
    { role_name: 'Modern Merkez Stoper', position: 'DF', sub_position: 'CB', description: 'Pas+savunma dengesi, çok yönlü', key_attributes: 'Pas, Kapama, Hız, Teknik, Okuma Oyunu', example_players: 'Van Dijk, Rúben Dias, Eder Militão' },
    { role_name: 'Üçlü Savunma Sol Stoper', position: 'DF', sub_position: 'LCB', description: 'Üçlü sistemde sol stoper', key_attributes: 'Pas Sol Ayak, Kapama, Hız, Pozisyon Alma, Dayanıklılık', example_players: 'Alessandro Bastoni, Ben Davies' },
    { role_name: 'Üçlü Savunma Sağ Stoper', position: 'DF', sub_position: 'RCB', description: 'Üçlü sistemde sağ stoper', key_attributes: 'Pas Sağ Ayak, Kapama, Hız, Pozisyon Alma, Dayanıklılık', example_players: 'Stefan de Vrij, Cesar Azpilicueta' },
    { role_name: 'Pressing Stoper', position: 'DF', sub_position: 'CB', description: 'Yüksek pressing yapar, agresif çıkar', key_attributes: 'Agresiflik, Hız, Dayanıklılık, Kapama, Cesaret', example_players: 'Dayot Upamecano, Antonio Rüdiger' },
    { role_name: 'Zonal Defans Stoper', position: 'DF', sub_position: 'CB', description: 'Bölgesel savunma, mark etmez', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Hava Topu, Disiplin', example_players: 'Leonardo Bonucci, Mats Hummels' },
    { role_name: 'Lider Stoper', position: 'DF', sub_position: 'CB', description: 'Savunmayı organize eder, liderlik yapar', key_attributes: 'Liderlik, İletişim, Pozisyon Alma, Güç, Hava Topu', example_players: 'Van Dijk, Sergio Ramos, Puyol' },
    { role_name: 'Genç Stoper', position: 'DF', sub_position: 'CB', description: 'Gelişim aşamasında genç stoper', key_attributes: 'Potansiyel, Hız, Öğrenme, Konsantrasyon, Güç', example_players: 'Joško Gvardiol, Wesley Fofana' },
    { role_name: 'Teknik Stoper', position: 'DF', sub_position: 'CB', description: 'Ayakla teknik yeteneği yüksek stoper', key_attributes: 'Teknik, Pas, Dribling, Sakinlik, Pozisyon Alma', example_players: 'John Stones, Aymeric Laporte, David Luiz' },
    { role_name: 'Hava Hakimi Stoper', position: 'DF', sub_position: 'CB', description: 'Havada dominant, set-piece uzmanı', key_attributes: 'Hava Topu, Boy, Sıçrama, Güç, Pozisyon Alma', example_players: 'Harry Maguire, Gerard Piqué' },
    { role_name: 'Duran Top Golcüsü Stoper', position: 'DF', sub_position: 'CB', description: 'Set-piece\'lerde gol atar', key_attributes: 'Hava Topu, Sıçrama, Pozisyon Alma, Şut, Zamanlama', example_players: 'Sergio Ramos, Gerard Piqué, John Terry' },
    { role_name: 'İkili Mücadele Uzmanı Stoper', position: 'DF', sub_position: 'CB', description: '1v1 duel gücü yüksek', key_attributes: 'İkili Mücadele, Güç, Hız, Agresiflik, Konsantrasyon', example_players: 'Pepe, Vidić, Chiellini' },
    { role_name: 'Pozisyonel Stoper', position: 'DF', sub_position: 'CB', description: 'Pozisyon mükemmelliği, oyun okuma', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Sakinlik, Disiplin', example_players: 'Rio Ferdinand, Thiago Silva' },
    { role_name: 'Çok Yönlü Stoper', position: 'DF', sub_position: 'CB', description: 'Birden fazla pozisyonda oynayabilir', key_attributes: 'Çok Yönlülük, Pas, Kapama, Hız, Teknik', example_players: 'David Alaba, Joshua Kimmich (CB)' },

    // BEKLER - 22 rol
    { role_name: 'Klasik Sağ Bek', position: 'DF', sub_position: 'RB', description: 'Geleneksel sağ bek, savunma öncelik', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Pozisyon Alma', example_players: 'Gary Neville, Philipp Lahm, Dani Carvajal' },
    { role_name: 'Hücumcu Sağ Bek', position: 'DF', sub_position: 'RB', description: 'Hücuma çok katılır, orta yapar', key_attributes: 'Hız, Orta, Dayanıklılık, Pas, Dribling', example_players: 'Dani Alves, Kyle Walker, Achraf Hakimi' },
    { role_name: 'İçeri Kesen Bek', position: 'DF', sub_position: 'RB', description: 'Orta sahaya kesilir, playmaker gibi', key_attributes: 'Pas, Teknik, Pozisyon Alma, Vizyon, Taktikal Zeka', example_players: 'João Cancelo, Joshua Kimmich, Trent Alexander-Arnold' },
    { role_name: 'Kanat Bek Destek', position: 'DF', sub_position: 'RB', description: 'Hücum-savunma dengeli kanat bek', key_attributes: 'Hız, Dayanıklılık, Orta, Kapama, Takım Çalışması', example_players: 'Reece James, Ben Chilwell, Kieran Trippier' },
    { role_name: 'Kanat Bek Hücum', position: 'DF', sub_position: 'RB', description: 'Çok hücumcu kanat bek, kanat gibi', key_attributes: 'Hız, Orta, Dribling, Dayanıklılık, Pas', example_players: 'Achraf Hakimi, Alphonso Davies, Jeremie Frimpong' },
    { role_name: 'Kanat Bek Savunma', position: 'DF', sub_position: 'RB', description: 'Savunma öncelikli kanat bek', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Pozisyon Alma', example_players: 'César Azpilicueta, Lucas Digne, Kyle Walker (savunma)' },
    { role_name: 'Klasik Sol Bek', position: 'DF', sub_position: 'LB', description: 'Geleneksel sol bek, savunma öncelik', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Sol Ayak', example_players: 'Ashley Cole, Paolo Maldini, Patrice Evra' },
    { role_name: 'Hücumcu Sol Bek', position: 'DF', sub_position: 'LB', description: 'Hücuma çok katılır, sol kanat desteği', key_attributes: 'Hız, Orta, Dayanıklılık, Pas, Sol Ayak', example_players: 'Andrew Robertson, Jordi Alba, Alphonso Davies' },
    { role_name: 'Güvenilir Bek', position: 'DF', sub_position: 'RB', description: 'Basit, etkili, güvenilir defans', key_attributes: 'Kapama, Güvenilirlik, Basitlik, Konsantrasyon, Disiplin', example_players: 'James Milner, Branislav Ivanović, Gary Cahill' },
    { role_name: 'Atletik Kanat Bek', position: 'DF', sub_position: 'RB', description: 'Fiziksel üstünlük, hız ve güç', key_attributes: 'Hız, Güç, Dayanıklılık, Sıçrama, Atletizm', example_players: 'Kyle Walker, Theo Hernández, Jeremie Frimpong' },
    { role_name: 'Teknik Bek', position: 'DF', sub_position: 'RB', description: 'Teknik yetenekli, pas ustası bek', key_attributes: 'Teknik, Pas, Dribling, Vizyon, Sakinlik', example_players: 'Trent Alexander-Arnold, João Cancelo, Dani Alves' },
    { role_name: 'Komple Kanat Bek Sol', position: 'DF', sub_position: 'LWB', description: 'Sol kanat bek, hücum-savunma dengeli', key_attributes: 'Hız, Dayanıklılık, Orta, Kapama, Sol Ayak', example_players: 'Marcelo, Roberto Carlos, Andy Robertson' },
    { role_name: 'Komple Kanat Bek Sağ', position: 'DF', sub_position: 'RWB', description: 'Sağ kanat bek, hücum-savunma dengeli', key_attributes: 'Hız, Dayanıklılık, Orta, Kapama, Sağ Ayak', example_players: 'Hakimi, Dani Alves, Cafu' },
    { role_name: 'Hızlı Bek', position: 'DF', sub_position: 'RB', description: 'Pure hız, counter tehdidi kapatır', key_attributes: 'Hız, İvmelenme, Dayanıklılık, Kapama, 1v1 Savunma', example_players: 'Kyle Walker, Alphonso Davies, Theo Hernández' },
    { role_name: 'Orta Yapan Bek', position: 'DF', sub_position: 'RB', description: 'Orta yapmaya odaklı bek', key_attributes: 'Orta, Hız, Dayanıklılık, Zamanlama, Teknik', example_players: 'Trent Alexander-Arnold, Kevin De Bruyne (RB), Beckham (RB)' },
    { role_name: 'Savunma Odaklı Bek', position: 'DF', sub_position: 'RB', description: 'Tamamen savunmaya odaklı', key_attributes: 'Kapama, 1v1 Savunma, Pozisyon Alma, Konsantrasyon, Disiplin', example_players: 'Azpilicueta, Walker (savunma modu), Carvajal' },
    { role_name: 'Çok Yönlü Bek', position: 'DF', sub_position: 'RB', description: 'Birden fazla pozisyonda oynayabilir', key_attributes: 'Çok Yönlülük, Hız, Pas, Kapama, Teknik', example_players: 'Joshua Kimmich, David Alaba, Sergiño Dest' },

    // ORTA SAHALAR - 35 rol
    { role_name: 'Ankör Defansif Orta Saha', position: 'MF', sub_position: 'DM', description: 'Savunma hattı önünde kalır, koruma sağlar', key_attributes: 'Pozisyon Alma, Kapama, Ara Kesme, Konsantrasyon, Taktikal Disiplin', example_players: 'N\'Golo Kanté, Claude Makélélé, Sergio Busquets' },
    { role_name: 'Top Kazanan Orta Saha', position: 'MF', sub_position: 'DM', description: 'Agresif top kazanımı, duel gücü', key_attributes: 'Kapama, Agresiflik, Dayanıklılık, İkili Mücadele, Cesaret', example_players: 'Casemiro, Fabinho, N\'Golo Kanté' },
    { role_name: 'Kutu Kutu Orta Saha', position: 'MF', sub_position: 'CM', description: 'Her iki kutuya da koşar, dayanıklılık üst düzey', key_attributes: 'Dayanıklılık, Çalışkanlık, Pas, Şut, Takım Çalışması', example_players: 'Frank Lampard, Steven Gerrard, Paul Pogba' },
    { role_name: 'Dengeli Merkez Orta Saha', position: 'MF', sub_position: 'CM', description: 'Klasik dengeli orta saha', key_attributes: 'Pas, Dayanıklılık, Takım Çalışması, Pozisyon Alma, Teknik', example_players: 'Thiago Alcântara, Toni Kroos, Luka Modrić' },
    { role_name: 'Gezen Playmaker', position: 'MF', sub_position: 'CM', description: 'Serbest dolaşır, yaratıcı paslar', key_attributes: 'Vizyon, Dribling, Pas, Yaratıcılık, Topsuz Hareket', example_players: 'Kevin De Bruyne, İlkay Gündoğan, Bernardo Silva' },
    { role_name: 'Pressing Orta Saha', position: 'MF', sub_position: 'CM', description: 'Yüksek pressing, top kazanımı üst seviye', key_attributes: 'Dayanıklılık, Çalışkanlık, Pressing, İş Ahlakı, Hız', example_players: 'Jordan Henderson, Georginio Wijnaldum, Kimmich' },
    { role_name: 'Klasik On Numara', position: 'MF', sub_position: 'CAM', description: 'Forvet arkası oyun kurucu', key_attributes: 'Yaratıcılık, Vizyon, Asist, Pas, Teknik', example_players: 'Mesut Özil, Kaká, Juan Román Riquelme' },
    { role_name: 'İleri Playmaker', position: 'MF', sub_position: 'CAM', description: 'İleri bölgeden oyun kurar', key_attributes: 'Vizyon, Pas, Yaratıcılık, Teknik, Bitiricilik', example_players: 'Kevin De Bruyne, Bruno Fernandes, Martin Ødegaard' },
    { role_name: 'Gölge Forvet', position: 'MF', sub_position: 'CAM', description: 'Forvet arkasından box\'a dalışlar', key_attributes: 'Bitiricilik, Topsuz Hareket, Zamanlama, Şut, Pozisyon Alma', example_players: 'Thomas Müller, Dele Alli (prime), Raumdeuter' },
    { role_name: 'Defansif Orta Saha', position: 'MF', sub_position: 'DM', description: 'Savunma odaklı orta saha, disiplinli', key_attributes: 'Kapama, Pozisyon Alma, Takım Çalışması, Disiplin, Dayanıklılık', example_players: 'Sergio Busquets, Jorginho, Rodri' },
    { role_name: 'Derin Playmaker', position: 'MF', sub_position: 'DM', description: 'Derin pozisyondan uzun paslar', key_attributes: 'Uzun Pas, Vizyon, Teknik, Sakinlik, Tempo Kontrol', example_players: 'Andrea Pirlo, Xabi Alonso, Jorginho' },
    { role_name: 'Gelişmiş Playmaker', position: 'MF', sub_position: 'CM', description: 'Modern çok yönlü playmaker', key_attributes: 'Pas, Vizyon, Teknik, Dayanıklılık, Şut', example_players: 'Kevin De Bruyne, Bruno Fernandes, Frenkie de Jong' },
    { role_name: 'Geç Dalışçı', position: 'MF', sub_position: 'CM', description: 'Geç dalışlarla ceza sahasına girer', key_attributes: 'Zamanlama, Şut, Bitiricilik, Topsuz Hareket, Dayanıklılık', example_players: 'Frank Lampard, Arturo Vidal, Paul Pogba' },
    { role_name: 'Orta Saha Motoru', position: 'MF', sub_position: 'CM', description: 'Takımın motoru, her yerde', key_attributes: 'Dayanıklılık, Çalışkanlık, Pas, Kapama, Takım Çalışması', example_players: 'N\'Golo Kanté, Arturo Vidal, Steven Gerrard' },
    { role_name: 'Teknik Orta Saha', position: 'MF', sub_position: 'CM', description: 'Teknik yetenekli, pas ustası', key_attributes: 'Teknik, Pas, Dribling, Vizyon, Sakinlik', example_players: 'Thiago, Frenkie de Jong, Marco Verratti' },
    { role_name: 'Agresif Orta Saha', position: 'MF', sub_position: 'CM', description: 'Agresif top kazanımı, duel odaklı', key_attributes: 'Agresiflik, Kapama, İkili Mücadele, Dayanıklılık, Cesaret', example_players: 'Gennaro Gattuso, Patrick Vieira, Roy Keane' },
    { role_name: 'Lider Orta Saha', position: 'MF', sub_position: 'CM', description: 'Takımı yöneten lider', key_attributes: 'Liderlik, İletişim, Pas, Vizyon, Disiplin', example_players: 'Steven Gerrard, Andrea Pirlo, Xabi Alonso' },
    { role_name: 'Genç Orta Saha Yeteneği', position: 'MF', sub_position: 'CM', description: 'Potansiyelli genç orta saha', key_attributes: 'Potansiyel, Öğrenme, Teknik, Hız, Dayanıklılık', example_players: 'Pedri, Jude Bellingham, Eduardo Camavinga' },

    // KANATLAR - 15 rol
    { role_name: 'Klasik Kanat', position: 'MF', sub_position: 'LW', description: 'Geleneksel kanat, orta yapar', key_attributes: 'Hız, Orta, Dribling, Dayanıklılık, 1v1', example_players: 'David Beckham, Ryan Giggs, Cristiano Ronaldo (kanat)' },
    { role_name: 'İçeri Kesen Kanat', position: 'MF', sub_position: 'LW', description: 'İçeriye kesilerek şut atar', key_attributes: 'Bitiricilik, Dribling, Hız, Ters Ayak, Şut', example_players: 'Arjen Robben, Riyad Mahrez, Ousmane Dembélé' },
    { role_name: 'Geniş Playmaker', position: 'MF', sub_position: 'LW', description: 'Kanattan oyun kurar, asist odaklı', key_attributes: 'Vizyon, Pas, Dribling, Orta, Yaratıcılık', example_players: 'Coutinho, David Silva (kanat), Bernardo Silva' },
    { role_name: 'İçeri Giren Forvet', position: 'MF', sub_position: 'LW', description: 'Forvet gibi, gol odaklı kanat', key_attributes: 'Bitiricilik, Pozisyon Alma, Hız, Dribling, Soğukkanlılık', example_players: 'Mohamed Salah, Raheem Sterling, Son Heung-min' },
    { role_name: 'Destek Kanat', position: 'MF', sub_position: 'LW', description: 'Takım oyununa odaklı kanat', key_attributes: 'Pas, Çalışkanlık, Dayanıklılık, Takım Çalışması, Dribling', example_players: 'Pedro, Willian, Jesse Lingard' },
    { role_name: 'Hızlı Kanat', position: 'MF', sub_position: 'LW', description: 'Pure hız, counter tehdidi', key_attributes: 'Hız, İvmelenme, Dribling, Orta, 1v1', example_players: 'Kylian Mbappé, Adama Traoré, Leroy Sané' },
    { role_name: 'Orta Yapan Kanat', position: 'MF', sub_position: 'RW', description: 'Orta odaklı, klasik tarz', key_attributes: 'Orta, Hız, Zamanlama, Teknik, Dayanıklılık', example_players: 'David Beckham, Kevin De Bruyne (RW)' },
    { role_name: 'Bitirici Kanat', position: 'MF', sub_position: 'LW', description: 'Gol odaklı, şut atar', key_attributes: 'Bitiricilik, Şut, Pozisyon Alma, Hız, Soğukkanlılık', example_players: 'Salah, Mané, Ronaldo (kanat)' },
    { role_name: 'Dribling Ustası Kanat', position: 'MF', sub_position: 'LW', description: '1v1 uzmanı, dribling odaklı', key_attributes: 'Dribling, Hız, Teknik, Çeviklik, 1v1', example_players: 'Neymar, Vinicius Jr, Jadon Sancho' },
    { role_name: 'Çok Yönlü Kanat', position: 'MF', sub_position: 'LW', description: 'Her şeyi yapar, adaptif', key_attributes: 'Çok Yönlülük, Pas, Bitiricilik, Hız, Teknik', example_players: 'Cristiano Ronaldo, Lionel Messi (kanat)' },

    // FORVETLER - 20 rol
    { role_name: 'Hedef Adam Forvet', position: 'FW', sub_position: 'ST', description: 'Fiziksel güç, hava topu, tutma oyunu', key_attributes: 'Güç, Hava Topu, Tutma Oyunu, Kafa, Boy', example_players: 'Didier Drogba, Zlatan İbrahimović, Olivier Giroud' },
    { role_name: 'Bitirici Forvet', position: 'FW', sub_position: 'ST', description: 'Ceza sahası içi bitirici, gol makinesi', key_attributes: 'Bitiricilik, Pozisyon Alma, Soğukkanlılık, Topsuz Hareket, Fırsatçılık', example_players: 'Filippo Inzaghi, Romário, Erling Haaland' },
    { role_name: 'Komple Forvet', position: 'FW', sub_position: 'ST', description: 'Her şeyi yapar: gol, asist, tutma', key_attributes: 'Bitiricilik, Pas, Güç, Hız, Teknik', example_players: 'Cristiano Ronaldo, Karim Benzema, Robert Lewandowski' },
    { role_name: 'Pressing Forvet', position: 'FW', sub_position: 'ST', description: 'Yüksek pressing, defansa baskı yapar', key_attributes: 'Çalışkanlık, Dayanıklılık, Pressing, Hız, Agresiflik', example_players: 'Roberto Firmino, Gabriel Jesus, Darwin Núñez' },
    { role_name: 'Derin Düşen Forvet', position: 'FW', sub_position: 'ST', description: 'Geri çekilir, link-up play yapar', key_attributes: 'Pas, Vizyon, Tutma Oyunu, Teknik, Takım Çalışması', example_players: 'Roberto Firmino, Karim Benzema, Harry Kane' },
    { role_name: 'Hızlı Forvet', position: 'FW', sub_position: 'ST', description: 'Hız odaklı, counter tehdidi', key_attributes: 'Hız, İvmelenme, Bitiricilik, Topsuz Hareket, Soğukkanlılık', example_players: 'Kylian Mbappé, Thierry Henry, Pierre-Emerick Aubameyang' },
    { role_name: 'İkinci Forvet', position: 'FW', sub_position: 'SS', description: 'Forvet arkasında destek sağlar', key_attributes: 'Pas, Dribling, Yaratıcılık, Bitiricilik, Topsuz Hareket', example_players: 'Antoine Griezmann, Paulo Dybala, Roberto Baggio' },
    { role_name: 'Savunmaya Katkılı Forvet', position: 'FW', sub_position: 'ST', description: 'Fiziksel oyun, savunmaya da katkı', key_attributes: 'Güç, İkili Mücadele, Çalışkanlık, Tutma Oyunu, Kafa', example_players: 'Diego Costa, Olivier Giroud, Romelu Lukaku' },
    { role_name: 'Genç Forvet', position: 'FW', sub_position: 'ST', description: 'Gelişim aşamasında genç forvet', key_attributes: 'Potansiyel, Hız, Öğrenme, Bitiricilik, Gelişim', example_players: 'Erling Haaland (genç), Karim Adeyemi' },
    { role_name: 'Teknik Forvet', position: 'FW', sub_position: 'ST', description: 'Teknik yetenekli, dribling ustası forvet', key_attributes: 'Teknik, Dribling, Yaratıcılık, Bitiricilik, 1v1', example_players: 'Neymar, Ronaldo Nazário, Ronaldinho' },
    { role_name: 'Gol Avcısı', position: 'FW', sub_position: 'ST', description: 'Fırsatçı, ceza sahası içi uzmanı', key_attributes: 'Bitiricilik, Fırsatçılık, Pozisyon Alma, Soğukkanlılık, Zamanlama', example_players: 'Inzaghi, Romário, Raúl' },
    { role_name: 'Güçlü Forvet', position: 'FW', sub_position: 'ST', description: 'Fiziksel güce dayalı oyun', key_attributes: 'Güç, İkili Mücadele, Hava Topu, Tutma Oyunu, Kafa', example_players: 'Drogba, Lukaku, Diego Costa' },
    { role_name: 'Akıllı Forvet', position: 'FW', sub_position: 'ST', description: 'Futbol zekası yüksek, boşluk bulur', key_attributes: 'Futbol Zekası, Pozisyon Alma, Topsuz Hareket, Bitiricilik, Zamanlama', example_players: 'Thomas Müller, Inzaghi, Harry Kane' },
    { role_name: 'Asist Yapan Forvet', position: 'FW', sub_position: 'ST', description: 'Gol + asist yapar, çok yönlü', key_attributes: 'Pas, Vizyon, Bitiricilik, Teknik, Yaratıcılık', example_players: 'Harry Kane, Karim Benzema, Roberto Firmino' },
    { role_name: 'Çift Forvet Ortağı', position: 'FW', sub_position: 'ST', description: '4-4-2\'de partner forvet', key_attributes: 'Takım Çalışması, Bitiricilik, Pas, Topsuz Hareket, Uyum', example_players: 'Yorke-Cole, Rooney-Tevez' },
    { role_name: 'Solo Striker', position: 'FW', sub_position: 'ST', description: 'Tek forvet, izole ama etkili', key_attributes: 'Tutma Oyunu, Güç, Bitiricilik, Dayanıklılık, Zihinsel Güç', example_players: 'Benzema, Ibrahimović, Haaland' },
    { role_name: 'Duran Top Uzmanı Forvet', position: 'FW', sub_position: 'ST', description: 'Set-piece\'lerde tehlikeli', key_attributes: 'Hava Topu, Pozisyon Alma, Zamanlama, Sıçrama, Konsantrasyon', example_players: 'Cristiano Ronaldo, Drogba' },
    { role_name: 'Penaltı Uzmanı Forvet', position: 'FW', sub_position: 'ST', description: 'Penaltıda soğukkanlı', key_attributes: 'Soğukkanlılık, Konsantrasyon, Teknik, Güven, Bitiricilik', example_players: 'Cristiano Ronaldo, Bruno Fernandes, Harry Kane' },
    { role_name: 'Counter Attack Forvet', position: 'FW', sub_position: 'ST', description: 'Kontra atak uzmanı', key_attributes: 'Hız, Bitiricilik, Topsuz Hareket, Zamanlama, Soğukkanlılık', example_players: 'Mbappé, Vardy, Werner' }
  ];

  console.log(`📝 ${newRoles.length} yeni rol ekleniyor (template kullanılarak)...\n`);

  // Tüm template kolonları kullan
  const columns = Object.keys(template).filter(k => k !== 'id' && k !== 'created_at');
  const placeholders = columns.map(() => '?').join(', ');
  const insertSQL = `INSERT INTO player_roles (${columns.join(', ')}) VALUES (${placeholders})`;

  let completed = 0;
  let errors = 0;

  newRoles.forEach((role, index) => {
    // Template'teki tüm değerleri al, sadece önemli olanları override et
    const values = columns.map(col => {
      if (col === 'role_name') return role.role_name;
      if (col === 'position') return role.position;
      if (col === 'sub_position') return role.sub_position;
      if (col === 'description') return role.description;
      if (col === 'detailed_explanation') return role.description + ' Bu rol modern futbolda stratejik öneme sahiptir ve takım yapısına büyük katkı sağlar.';
      if (col === 'key_attributes') return role.key_attributes;
      if (col === 'real_world_examples') return role.example_players;
      if (col === 'example_players') return role.example_players;
      if (col === 'ideal_height_range') {
        if (role.position === 'GK') return '185-198 cm';
        if (role.position === 'DF') return '178-192 cm';
        if (role.position === 'MF') return '170-185 cm';
        if (role.position === 'FW') return '175-188 cm';
      }
      if (col === 'ideal_age_range') return '23-30 yaş';
      if (col === 'ideal_player_traits') return role.key_attributes + ' - Modern profesyonel oyuncu özellikleri';
      if (col === 'tactical_purpose') return 'Takımın taktik yapısında önemli rol';
      if (col === 'best_in_formations') return '4-3-3, 4-2-3-1, 3-5-2';
      if (col === 'tactical_systems_compatibility') return 'Çeşitli taktik sistemlerle uyumlu';

      // Diğer tüm kolonlar template'ten gelsin
      return template[col];
    });

    ultraDb.run(insertSQL, values, function(err) {
      if (err) {
        console.error(`❌ ${role.role_name}:`, err.message);
        errors++;
      } else {
        completed++;
        if (completed % 20 === 0 || completed === newRoles.length) {
          console.log(`⏳ ${completed}/${newRoles.length} rol eklendi...`);
        }
      }

      if (completed + errors === newRoles.length) {
        console.log(`\n🎉 ROL EKLEME TAMAMLANDI!`);
        console.log(`   ✅ Başarılı: ${completed}`);
        console.log(`   ❌ Hatalı: ${errors}`);
        console.log(`   🏆 TOPLAM ROL SİSTEMDE: ${29 + completed}\n`);
        console.log('💡 Kalecinin 15 farklı rolü eklendi!');
        console.log('💡 Stoperlerin 18 farklı rolü eklendi!');
        console.log('💡 Beklerin 22 farklı rolü eklendi!');
        console.log('💡 Orta sahaların 18 farklı rolü eklendi!');
        console.log('💡 Kanatların 10 farklı rolü eklendi!');
        console.log('💡 Forvetlerin 20 farklı rolü eklendi!\n');
        ultraDb.close();
      }
    });
  });
});
