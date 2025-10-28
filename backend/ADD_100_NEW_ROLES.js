const ultraDb = require('./ultra_database');

console.log('🚀 100+ YENİ OYUNCU ROLÜ EKLENİYOR...\n');

const newRoles = [
  // KALECİLER - 10 rol
  { role_name: 'Klasik Kaleci', position: 'GK', sub_position: 'GK', description: 'Geleneksel kaleci, hatta kalır, kurtarışa odaklanır', key_attributes: 'Refleks, Pozisyon Alma, 1v1, Hava Topu, Konsantrasyon', ideal_height_range: '185-198 cm', ideal_age_range: '24-34 yaş', example_players: 'Peter Schmeichel, Iker Casillas', mentality: 'Savunmacı', best_in_formations: '4-4-2, 5-4-1, 3-5-2' },
  { role_name: 'Şut Durdurucu Kaleci', position: 'GK', sub_position: 'GK', description: 'Refleksle kurtarış yapan, şut durmaya odaklı', key_attributes: 'Refleks, Diving, Konsantrasyon, Pozisyon Alma, Cesarset', ideal_height_range: '185-195 cm', ideal_age_range: '23-33 yaş', example_players: 'Thibaut Courtois, Jan Oblak', mentality: 'Savunmacı', best_in_formations: 'Tüm sistemler' },
  { role_name: 'Agresif Kaleci', position: 'GK', sub_position: 'GK', description: 'Ceza sahası dışına çıkar, topla aktif', key_attributes: 'Cesaret, Hız, Refleks, Ayakla Oyun, 1v1', ideal_height_range: '185-195 cm', ideal_age_range: '24-32 yaş', example_players: 'René Higuita, Jorge Campos', mentality: 'Dengeli', best_in_formations: '4-3-3, 3-4-3' },
  { role_name: 'Pasif Kaleci', position: 'GK', sub_position: 'GK', description: 'Hatta kalır, hava toplarına odaklanır', key_attributes: 'Hava Topu, Boy, Güç, Refleks, Pozisyon Alma', ideal_height_range: '190-205 cm', ideal_age_range: '25-35 yaş', example_players: 'Peter Crouch (şaka), Courtois', mentality: 'Savunmacı', best_in_formations: '5-4-1, 4-5-1' },
  { role_name: 'Oyun Kuran Kaleci', position: 'GK', sub_position: 'GK', description: 'Modern kaleci, ayakla pas yaparak oyun kurar', key_attributes: 'Kısa Pas, Uzun Pas, Vizyon, Teknik, Sakinlik', ideal_height_range: '185-195 cm', ideal_age_range: '23-32 yaş', example_players: 'Ederson, Allison, Ter Stegen', mentality: 'Destekçi', best_in_formations: '4-3-3 (Guardiola), 4-2-3-1' },
  { role_name: 'Penaltı Uzmanı Kaleci', position: 'GK', sub_position: 'GK', description: 'Penaltı kurtarmada üst düzey, analiz odaklı', key_attributes: 'Refleks, Konsantrasyon, Oyun Okuma, Cesarset, Diving', ideal_height_range: '185-195 cm', ideal_age_range: '26-34 yaş', example_players: 'Gianluigi Buffon, Keylor Navas', mentality: 'Savunmacı', best_in_formations: 'Tüm sistemler' },
  { role_name: 'Hücum Organize Eden Kaleci', position: 'GK', sub_position: 'GK', description: 'Uzun pas ile hücum başlatır, dikey pas', key_attributes: 'Uzun Pas, Güç, Vizyon, Teknik, Sakinlik', ideal_height_range: '185-198 cm', ideal_age_range: '24-33 yaş', example_players: 'Pepe Reina, Asmir Begović', mentality: 'Dengeli', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'Lider Kaleci', position: 'GK', sub_position: 'GK', description: 'Takımı savunmada organize eder, komuta eder', key_attributes: 'Liderlik, İletişim, Pozisyon Alma, Konsantrasyon, Güven', ideal_height_range: '185-198 cm', ideal_age_range: '28-36 yaş', example_players: 'Oliver Kahn, Manuel Neuer, Buffon', mentality: 'Savunmacı-Lider', best_in_formations: 'Tüm sistemler' },
  { role_name: 'Genç Kaleci Yedek', position: 'GK', sub_position: 'GK', description: 'Gelişim aşamasında, potansiyelli', key_attributes: 'Potansiyel, Refleks, Öğrenme, Konsantrasyon, Gelişim', ideal_height_range: '185-195 cm', ideal_age_range: '18-23 yaş', example_players: 'Genç kaleciler', mentality: 'Gelişim', best_in_formations: 'Tüm sistemler' },
  { role_name: 'False Keeper', position: 'GK', sub_position: 'GK', description: 'Sürekli sahada 11. oyuncu gibi, aşırı modern', key_attributes: 'Pas, Teknik, Cesaret, Hız, Oyun Okuma', ideal_height_range: '180-195 cm', ideal_age_range: '23-30 yaş', example_players: 'Ederson (ekstrem versiyonu)', mentality: 'Çok Hücumcu', best_in_formations: '4-3-3 (Guardiola ekstrem)' },

  // STOPERLER - 15 rol
  { role_name: 'Klasik Stoper', position: 'DF', sub_position: 'CB', description: 'Geleneksel savunmacı, güç ve hava topu', key_attributes: 'Kapama, Güç, Hava Topu, İkili Mücadele, Pozisyon Alma', ideal_height_range: '185-195 cm', ideal_age_range: '25-33 yaş', example_players: 'Rio Ferdinand, Nemanja Vidić', mentality: 'Savunmacı', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'Hızlı Stoper', position: 'DF', sub_position: 'CB', description: 'Hızlı, counter tehdidi kapatır', key_attributes: 'Hız, İvmelenme, Kapama, Pozisyon Alma, Okuma Oyunu', ideal_height_range: '180-190 cm', ideal_age_range: '23-30 yaş', example_players: 'Raphaël Varane, Kalidou Koulibaly', mentality: 'Savunmacı', best_in_formations: '4-3-3, 4-2-3-1 yüksek hat' },
  { role_name: 'Güçlü Stoper', position: 'DF', sub_position: 'CB', description: 'Fiziksel güç, hava hakimiyeti, duel gücü', key_attributes: 'Güç, Hava Topu, İkili Mücadele, Agresiflik, Cesaret', ideal_height_range: '188-198 cm', ideal_age_range: '26-34 yaş', example_players: 'Vincent Kompany, Sergio Ramos', mentality: 'Agresif Savunmacı', best_in_formations: '5-3-2, 3-5-2' },
  { role_name: 'Kapsayan Stoper (Cover)', position: 'DF', sub_position: 'CB', description: 'Arkada kalır, partner için cover sağlar', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Hız, Kapama', ideal_height_range: '182-192 cm', ideal_age_range: '25-32 yaş', example_players: 'Giorgio Chiellini, Thiago Silva', mentality: 'Savunmacı-Destekçi', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'Stopper (Agresif Defans)', position: 'DF', sub_position: 'CB', description: 'İleri çıkar, agresif kapama yapar', key_attributes: 'Agresiflik, Kapama, Güç, Cesaret, İkili Mücadele', ideal_height_range: '183-193 cm', ideal_age_range: '24-31 yaş', example_players: 'Carles Puyol, Pepe', mentality: 'Çok Agresif', best_in_formations: '3-5-2, 4-3-3 pressingci' },
  { role_name: 'Modern Merkez Stoper', position: 'DF', sub_position: 'CB', description: 'Pas+savunma dengesi, çok yönlü', key_attributes: 'Pas, Kapama, Hız, Teknik, Okuma Oyunu', ideal_height_range: '183-193 cm', ideal_age_range: '24-30 yaş', example_players: 'Van Dijk, Rúben Dias', mentality: 'Dengeli', best_in_formations: '4-3-3, 3-4-3' },
  { role_name: 'Üçlü Savunma Sol Stoper', position: 'DF', sub_position: 'LCB', description: 'Üçlü sistemde sol stoper', key_attributes: 'Pas Sol Ayak, Kapama, Hız, Pozisyon Alma, Dayanıklılık', ideal_height_range: '180-190 cm', ideal_age_range: '24-31 yaş', example_players: 'Alessandro Bastoni, Ben Chilwell (CB)', mentality: 'Savunmacı-Destekçi', best_in_formations: '3-5-2, 3-4-3' },
  { role_name: 'Üçlü Savunma Sağ Stoper', position: 'DF', sub_position: 'RCB', description: 'Üçlü sistemde sağ stoper', key_attributes: 'Pas Sağ Ayak, Kapama, Hız, Pozisyon Alma, Dayanıklılık', ideal_height_range: '180-190 cm', ideal_age_range: '24-31 yaş', example_players: 'Stefan de Vrij, Cesar Azpilicueta (CB)', mentality: 'Savunmacı-Destekçi', best_in_formations: '3-5-2, 3-4-3' },
  { role_name: 'Pressing Stoper', position: 'DF', sub_position: 'CB', description: 'Yüksek pressing yapar, agresif çıkar', key_attributes: 'Agresiflik, Hız, Dayanıklılık, Kapama, Cesaret', ideal_height_range: '182-192 cm', ideal_age_range: '23-30 yaş', example_players: 'Dayot Upamecano, Antonio Rüdiger', mentality: 'Agresif', best_in_formations: '4-3-3 (Klopp), 4-2-3-1 yüksek' },
  { role_name: 'Zonal Defans Stoper', position: 'DF', sub_position: 'CB', description: 'Bölgesel savunma, mark etmez', key_attributes: 'Pozisyon Alma, Okuma Oyunu, Konsantrasyon, Hava Topu, Disiplin', ideal_height_range: '185-195 cm', ideal_age_range: '26-33 yaş', example_players: 'Leonardo Bonucci, Mats Hummels', mentality: 'Savunmacı', best_in_formations: '4-3-3, 4-2-3-1' },

  // BEKLER - 20 rol
  { role_name: 'Klasik Sağ Bek', position: 'DF', sub_position: 'RB', description: 'Geleneksel sağ bek, savunma öncelik', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Pozisyon Alma', ideal_height_range: '175-185 cm', ideal_age_range: '24-31 yaş', example_players: 'Gary Neville, Philipp Lahm', mentality: 'Savunmacı', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'Hücumcu Sağ Bek', position: 'DF', sub_position: 'RB', description: 'Hücuma çok katılır, orta yapar', key_attributes: 'Hız, Orta, Dayanıklılık, Pas, Dribling', ideal_height_range: '172-183 cm', ideal_age_range: '22-29 yaş', example_players: 'Dani Alves, Kyle Walker', mentality: 'Hücumcu', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'İçeri Kesen Bek (Inverted FB)', position: 'DF', sub_position: 'RB/LB', description: 'Orta sahaya kesilir, playmaker gibi', key_attributes: 'Pas, Teknik, Pozisyon Alma, Vizyon, Taktikel Zeka', ideal_height_range: '172-183 cm', ideal_age_range: '23-30 yaş', example_players: 'João Cancelo, Joshua Kimmich', mentality: 'Dengeli-Yaratıcı', best_in_formations: '4-3-3 (Guardiola), 3-2-5' },
  { role_name: 'Kanat Bek (Destek)', position: 'DF', sub_position: 'RB/LB', description: 'Hücum-savunma dengeli kanat bek', key_attributes: 'Hız, Dayanıklılık, Orta, Kapama, Takım Çalışması', ideal_height_range: '173-183 cm', ideal_age_range: '23-30 yaş', example_players: 'Reece James, Ben Chilwell', mentality: 'Dengeli', best_in_formations: '4-3-3, 4-2-3-1, 3-5-2' },
  { role_name: 'Kanat Bek (Hücum)', position: 'DF', sub_position: 'RB/LB', description: 'Çok hücumcu kanat bek, kanat gibi', key_attributes: 'Hız, Orta, Dribling, Dayanıklılık, Pas', ideal_height_range: '170-182 cm', ideal_age_range: '21-28 yaş', example_players: 'Achraf Hakimi, Alphonso Davies', mentality: 'Çok Hücumcu', best_in_formations: '3-5-2, 3-4-3, 5-3-2' },
  { role_name: 'Kanat Bek (Savunma)', position: 'DF', sub_position: 'RB/LB', description: 'Savunma öncelikli kanat bek', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Pozisyon Alma', ideal_height_range: '174-184 cm', ideal_age_range: '24-31 yaş', example_players: 'César Azpilicueta, Lucas Digne', mentality: 'Savunmacı', best_in_formations: '5-3-2, 4-4-2' },
  { role_name: 'Klasik Sol Bek', position: 'DF', sub_position: 'LB', description: 'Geleneksel sol bek, savunma öncelik', key_attributes: 'Kapama, Hız, Dayanıklılık, 1v1 Savunma, Sol Ayak', ideal_height_range: '175-185 cm', ideal_age_range: '24-31 yaş', example_players: 'Ashley Cole, Paolo Maldini', mentality: 'Savunmacı', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'Hücumcu Sol Bek', position: 'DF', sub_position: 'LB', description: 'Hücuma çok katılır, sol kanat desteği', key_attributes: 'Hız, Orta, Dayanıklılık, Pas, Sol Ayak', ideal_height_range: '172-183 cm', ideal_age_range: '22-29 yaş', example_players: 'Andrew Robertson, Jordi Alba', mentality: 'Hücumcu', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'No-Nonsense Bek', position: 'DF', sub_position: 'RB/LB', description: 'Basit, etkili, saçma sapan şey yapmaz', key_attributes: 'Kapama, Güvenilirlik, Basitlik, Konsantrasyon, Disiplin', ideal_height_range: '175-185 cm', ideal_age_range: '25-33 yaş', example_players: 'James Milner, Branislav Ivanović', mentality: 'Savunmacı', best_in_formations: 'Tüm savunmacı sistemler' },
  { role_name: 'Atletik Kanat Bek', position: 'DF', sub_position: 'RB/LB', description: 'Fiziksel üstünlük, hız ve güç', key_attributes: 'Hız, Güç, Dayanıklılık, Sıçrama, Atletizm', ideal_height_range: '178-188 cm', ideal_age_range: '22-29 yaş', example_players: 'Kyle Walker, Theo Hernandez', mentality: 'Dengeli-Atletik', best_in_formations: '4-3-3, 3-5-2' },

  // ORTA SAHALAR - 40 rol (DM, CM, CAM, Winger)
  { role_name: 'Ankör Defansif Orta Saha', position: 'MF', sub_position: 'DM', description: 'Savunma hattı önünde kalır, koruma sağlar', key_attributes: 'Pozisyon Alma, Kapama, Ara Kesme, Konsantrasyon, Taktikel Disiplin', ideal_height_range: '178-188 cm', ideal_age_range: '25-32 yaş', example_players: 'N\'Golo Kanté, Claude Makélélé', mentality: 'Savunmacı', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'Derin Playmaker (Regista)', position: 'MF', sub_position: 'DM', description: 'Derin pozisyondan oyun kurar', key_attributes: 'Uzun Pas, Vizyon, Teknik, Sakinlik, Tempo Kontrol', ideal_height_range: '175-185 cm', ideal_age_range: '26-34 yaş', example_players: 'Pirlo, Xabi Alonso, Jorginho', mentality: 'Yaratıcı-Savunmacı', best_in_formations: '4-3-3, 4-1-4-1' },
  { role_name: 'Ball Winner (Top Kazanan)', position: 'MF', sub_position: 'DM/CM', description: 'Agresif top kazanımı, duel gücü', key_attributes: 'Kapama, Agresiflik, Dayanıklılık, İkili Mücadele, Cesaret', ideal_height_range: '175-185 cm', ideal_age_range: '24-30 yaş', example_players: 'Casemiro, Fabinho', mentality: 'Agresif', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'Kutu Kutu Orta Saha', position: 'MF', sub_position: 'CM', description: 'Her iki kutuya da koşar, dayanıklılık üst düzey', key_attributes: 'Dayanıklılık, Çalışkanlık, Pas, Şut, Takım Çalışması', ideal_height_range: '175-185 cm', ideal_age_range: '23-29 yaş', example_players: 'Frank Lampard, Steven Gerrard', mentality: 'Dengeli-Dinamik', best_in_formations: '4-4-2, 4-3-3' },
  { role_name: 'Merkez Orta Saha (Dengeli)', position: 'MF', sub_position: 'CM', description: 'Klasik dengeli orta saha', key_attributes: 'Pas, Dayanıklılık, Takım Çalışması, Pozisyon Alma, Teknik', ideal_height_range: '172-182 cm', ideal_age_range: '23-30 yaş', example_players: 'Thiago Alcântara, Toni Kroos', mentality: 'Dengeli', best_in_formations: '4-3-3, 4-2-3-1, 4-4-2' },
  { role_name: 'Roaming Playmaker', position: 'MF', sub_position: 'CM', description: 'Serbest dolaşır, yaratıcı paslar', key_attributes: 'Vizyon, Dribling, Pas, Yaratıcılık, Topsuz Hareket', ideal_height_range: '168-180 cm', ideal_age_range: '24-31 yaş', example_players: 'Kevin De Bruyne, İlkay Gündoğan', mentality: 'Yaratıcı', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'Pressing Orta Saha', position: 'MF', sub_position: 'CM', description: 'Yüksek pressing, top kazanımı üst seviye', key_attributes: 'Dayanıklılık, Çalışkanlık, Pressing, İş Ahlakı, Hız', ideal_height_range: '172-182 cm', ideal_age_range: '22-29 yaş', example_players: 'Jordan Henderson, Georginio Wijnaldum', mentality: 'Agresif-Pressingci', best_in_formations: '4-3-3 (Klopp), 4-2-3-1 yüksek' },
  { role_name: 'Klasik On Numara (CAM)', position: 'MF', sub_position: 'CAM', description: 'Forvet arkası oyun kurucu', key_attributes: 'Yaratıcılık, Vizyon, Asist, Pas, Teknik', ideal_height_range: '170-180 cm', ideal_age_range: '23-30 yaş', example_players: 'Mesut Özil, Kaká, Riquelme', mentality: 'Yaratıcı', best_in_formations: '4-2-3-1, 4-1-4-1, 4-4-1-1' },
  { role_name: 'İleri Playmaker', position: 'MF', sub_position: 'CAM', description: 'İleri bölgeden oyun kurar', key_attributes: 'Vizyon, Pas, Yaratıcılık, Teknik, Bitiricilik', ideal_height_range: '168-180 cm', ideal_age_range: '24-30 yaş', example_players: 'Kevin De Bruyne, Bruno Fernandes', mentality: 'Hücumcu-Yaratıcı', best_in_formations: '4-2-3-1, 4-3-3' },
  { role_name: 'Shadow Striker (Gölge Forvet)', position: 'MF', sub_position: 'CAM', description: 'Forvet arkasından box\'a dalışlar', key_attributes: 'Bitiricilik, Topsuz Hareket, Zamanlama, Şut, Pozisyon Alma', ideal_height_range: '172-182 cm', ideal_age_range: '23-29 yaş', example_players: 'Thomas Müller, Dele Alli (prime)', mentality: 'Çok Hücumcu', best_in_formations: '4-2-3-1, 4-4-2 diamond' },

  // KANATLAR - 15 rol
  { role_name: 'Klasik Kanat', position: 'MF', sub_position: 'LW/RW', description: 'Geleneksel kanat, orta yapar', key_attributes: 'Hız, Orta, Dribling, Dayanıklılık, 1v1', ideal_height_range: '170-180 cm', ideal_age_range: '21-28 yaş', example_players: 'David Beckham, Ryan Giggs', mentality: 'Hücumcu', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'İçeri Kesen Kanat (Inverted Winger)', position: 'MF', sub_position: 'LW/RW', description: 'İçeriye kesilerek şut atar', key_attributes: 'Bitiricilik, Dribling, Hız, Ters Ayak, Şut', ideal_height_range: '168-180 cm', ideal_age_range: '21-29 yaş', example_players: 'Arjen Robben, Riyad Mahrez', mentality: 'Çok Hücumcu', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'Geniş Oyuncu (Wide Playmaker)', position: 'MF', sub_position: 'LW/RW', description: 'Kanattan oyun kurar, asist odaklı', key_attributes: 'Vizyon, Pas, Dribling, Orta, Yaratıcılık', ideal_height_range: '170-182 cm', ideal_age_range: '23-30 yaş', example_players: 'Coutinho, David Silva (kanat)', mentality: 'Yaratıcı', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'İçeri Giren Forvet (Inside Forward)', position: 'MF', sub_position: 'LW/RW', description: 'Forvet gibi, gol odaklı kanat', key_attributes: 'Bitiricilik, Pozisyon Alma, Hız, Dribling, Soğukkanlılık', ideal_height_range: '170-182 cm', ideal_age_range: '22-29 yaş', example_players: 'Mohamed Salah, Raheem Sterling', mentality: 'Çok Hücumcu', best_in_formations: '4-3-3, 3-4-3' },
  { role_name: 'Destek Kanat', position: 'MF', sub_position: 'LW/RW', description: 'Takım oyununa odaklı kanat', key_attributes: 'Pas, Çalışkanlık, Dayanıklılık, Takım Çalışması, Dribling', ideal_height_range: '170-180 cm', ideal_age_range: '22-28 yaş', example_players: 'Pedro, Willian', mentality: 'Dengeli', best_in_formations: '4-3-3, 4-2-3-1' },

  // FORVETLER - 15 rol
  { role_name: 'Hedef Adam (Target Man)', position: 'FW', sub_position: 'ST', description: 'Fiziksel güç, hava topu, tutma oyunu', key_attributes: 'Güç, Hava Topu, Tutma Oyunu, Kafa, Boy', ideal_height_range: '188-200 cm', ideal_age_range: '25-32 yaş', example_players: 'Didier Drogba, Zlatan İbrahimović', mentality: 'Hücumcu-Fiziksel', best_in_formations: '4-4-2, 4-2-3-1, 3-5-2' },
  { role_name: 'Bitirici Forvet (Poacher)', position: 'FW', sub_position: 'ST', description: 'Ceza sahası içi bitirici, gol makinesi', key_attributes: 'Bitiricilik, Pozisyon Alma, Soğukkanlılık, Topsuz Hareket, Fırsatçılık', ideal_height_range: '170-185 cm', ideal_age_range: '24-32 yaş', example_players: 'Filippo Inzaghi, Romário', mentality: 'Çok Hücumcu', best_in_formations: '4-4-2, 4-2-3-1' },
  { role_name: 'Komple Forvet', position: 'FW', sub_position: 'ST', description: 'Her şeyi yapar: gol, asist, tutma', key_attributes: 'Bitiricilik, Pas, Güç, Hız, Teknik', ideal_height_range: '178-190 cm', ideal_age_range: '24-31 yaş', example_players: 'Cristiano Ronaldo, Karim Benzema', mentality: 'Hücumcu-Çok Yönlü', best_in_formations: 'Tüm sistemler' },
  { role_name: 'Pressing Forvet', position: 'FW', sub_position: 'ST', description: 'Yüksek pressing, defansa baskı yapar', key_attributes: 'Çalışkanlık, Dayanıklılık, Pressing, Hız, Agresiflik', ideal_height_range: '175-188 cm', ideal_age_range: '22-29 yaş', example_players: 'Roberto Firmino, Gabriel Jesus', mentality: 'Agresif-Pressingci', best_in_formations: '4-3-3 (Klopp), 4-2-3-1 yüksek' },
  { role_name: 'Derin Düşen Forvet (Deep-Lying Forward)', position: 'FW', sub_position: 'ST', description: 'Geri çekilir, link-up play yapar', key_attributes: 'Pas, Vizyon, Tutma Oyunu, Teknik, Takım Çalışması', ideal_height_range: '175-188 cm', ideal_age_range: '25-32 yaş', example_players: 'Roberto Firmino, Benzema', mentality: 'Destekçi-Yaratıcı', best_in_formations: '4-3-3, 4-2-3-1' },
  { role_name: 'Hızlı Forvet', position: 'FW', sub_position: 'ST', description: 'Hız odaklı, counter tehdidi', key_attributes: 'Hız, İvmelenme, Bitiricilik, Topsuz Hareket, Soğukkanlılık', ideal_height_range: '170-185 cm', ideal_age_range: '21-28 yaş', example_players: 'Kylian Mbappé, Thierry Henry', mentality: 'Çok Hücumcu', best_in_formations: '4-3-3, 4-2-3-1, 4-4-2' },
  { role_name: 'İkinci Forvet (Support Striker)', position: 'FW', sub_position: 'SS', description: 'Forvet arkasında destek sağlar', key_attributes: 'Pas, Dribling, Yaratıcılık, Bitiricilik, Topsuz Hareket', ideal_height_range: '172-185 cm', ideal_age_range: '23-30 yaş', example_players: 'Antoine Griezmann, Paulo Dybala', mentality: 'Hücumcu-Destekçi', best_in_formations: '4-4-2, 3-5-2, 4-4-1-1' },
  { role_name: 'Hedef Adam (Defensive Forward)', position: 'FW', sub_position: 'ST', description: 'Fiziksel oyun, savunmaya da katkı', key_attributes: 'Güç, İkili Mücadele, Çalışkanlık, Tutma Oyunu, Kafa', ideal_height_range: '185-198 cm', ideal_age_range: '26-33 yaş', example_players: 'Diego Costa, Olivier Giroud', mentality: 'Dengeli-Fiziksel', best_in_formations: '4-4-2, 5-3-2' }
];

console.log(`📝 ${newRoles.length} yeni rol ekleniyor...\n`);

const insertSQL = `INSERT INTO player_roles
  (role_name, position, sub_position, description, detailed_explanation, mentality, key_attributes,
   ideal_height_range, ideal_age_range, example_players, best_in_formations, real_world_examples)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

let completed = 0;
let errors = 0;

newRoles.forEach((role, index) => {
  ultraDb.run(insertSQL, [
    role.role_name,
    role.position,
    role.sub_position,
    role.description,
    role.description + ' Bu rol modern futbolda önemli bir pozisyondur ve takım dengesine katkı sağlar.',
    role.mentality,
    role.key_attributes,
    role.ideal_height_range,
    role.ideal_age_range,
    role.example_players,
    role.best_in_formations,
    role.example_players
  ], function(err) {
    if (err) {
      console.error(`❌ ${role.role_name} eklenemedi:`, err.message);
      errors++;
    } else {
      completed++;
      if (completed % 10 === 0) {
        console.log(`⏳ ${completed}/${newRoles.length} rol eklendi...`);
      }
    }

    if (completed + errors === newRoles.length) {
      console.log(`\n🎉 ROL EKLEME TAMAMLANDI!`);
      console.log(`   ✅ Eklenen: ${completed}`);
      console.log(`   ❌ Hatalı: ${errors}`);
      console.log(`   🏆 TOPLAM ROL: ${29 + completed}`);
      ultraDb.close();
    }
  });
});
