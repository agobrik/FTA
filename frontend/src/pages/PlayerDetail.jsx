import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { playersAPI } from '../services/api';

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadPlayerData();
  }, [id]);

  const loadPlayerData = async () => {
    try {
      const [playerRes, statsRes] = await Promise.all([
        playersAPI.getById(id),
        playersAPI.getStats(id)
      ]);
      setPlayer(playerRes.data.data);
      setStats(statsRes.data.data);
      setFormData(playerRes.data.data);
    } catch (error) {
      console.error('Oyuncu verileri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await playersAPI.update(id, formData);
      setEditing(false);
      loadPlayerData();
    } catch (error) {
      console.error('Oyuncu güncellenemedi:', error);
      alert('Güncelleme sırasında bir hata oluştu');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu oyuncuyu silmek istediğinizden emin misiniz?')) {
      try {
        await playersAPI.delete(id);
        navigate('/players');
      } catch (error) {
        console.error('Oyuncu silinemedi:', error);
        alert('Silme sırasında bir hata oluştu');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  if (!player) {
    return <div className="text-center py-12">
      <p className="text-xl text-gray-600">Oyuncu bulunamadı</p>
      <Link to="/players" className="text-green-600 hover:underline mt-4 inline-block">
        Oyunculara dön
      </Link>
    </div>;
  }

  const currentSeasonStats = stats.find(s => s.season === new Date().getFullYear().toString()) || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/players" className="text-green-600 hover:text-green-700 flex items-center">
          ← Geri
        </Link>
        <div className="space-x-2">
          {!editing ? (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Düzenle
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sil
              </button>
            </>
          ) : (
            <button
              onClick={() => { setEditing(false); setFormData(player); }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              İptal
            </button>
          )}
        </div>
      </div>

      {editing ? (
        /* Edit Form */
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Oyuncu Bilgilerini Düzenle</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İsim</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pozisyon</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                >
                  <option value="Kaleci">Kaleci</option>
                  <option value="Defans">Defans</option>
                  <option value="Orta Saha">Orta Saha</option>
                  <option value="Kanat">Kanat</option>
                  <option value="Forvet">Forvet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yaş</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Forma No</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.jersey_number}
                  onChange={(e) => setFormData({...formData, jersey_number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Boy (cm)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kilo (kg)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uyruk</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.nationality}
                  onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tercih Edilen Ayak</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.preferred_foot}
                  onChange={(e) => setFormData({...formData, preferred_foot: e.target.value})}
                >
                  <option value="Sağ">Sağ</option>
                  <option value="Sol">Sol</option>
                  <option value="İki Ayak">İki Ayak</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
              />
              <div className="text-center text-2xl font-bold text-green-600">{formData.rating}</div>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Güncelle
            </button>
          </form>
        </div>
      ) : (
        /* Player Info */
        <>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-6">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-6xl">
                👤
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-4xl font-bold">{player.name}</h1>
                  <span className="text-5xl font-bold text-green-600">#{player.jersey_number}</span>
                </div>
                <p className="text-xl text-gray-600 mb-4">{player.position}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Yaş</p>
                    <p className="text-lg font-semibold">{player.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Boy</p>
                    <p className="text-lg font-semibold">{player.height} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kilo</p>
                    <p className="text-lg font-semibold">{player.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ayak</p>
                    <p className="text-lg font-semibold">{player.preferred_foot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Uyruk</p>
                    <p className="text-lg font-semibold">{player.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="text-lg font-semibold text-green-600">{player.rating}/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Season Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Bu Sezon İstatistikleri</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <StatBox label="Maç" value={currentSeasonStats.matches_played || 0} />
              <StatBox label="Gol" value={currentSeasonStats.goals || 0} color="text-green-600" />
              <StatBox label="Asist" value={currentSeasonStats.assists || 0} color="text-blue-600" />
              <StatBox label="Dakika" value={currentSeasonStats.minutes_played || 0} />
              <StatBox label="Şut" value={currentSeasonStats.shots || 0} />
              <StatBox label="Pas İsabeti" value={`%${currentSeasonStats.pass_accuracy || 0}`} color="text-purple-600" />
              <StatBox label="Top Kesme" value={currentSeasonStats.tackles || 0} />
              <StatBox label="Araya Girme" value={currentSeasonStats.interceptions || 0} />
              <StatBox label="Sarı Kart" value={currentSeasonStats.yellow_cards || 0} color="text-yellow-600" />
              <StatBox label="Kırmızı Kart" value={currentSeasonStats.red_cards || 0} color="text-red-600" />
            </div>
          </div>

          {/* All Seasons */}
          {stats.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Tüm Sezonlar</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sezon</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Maç</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Gol</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Asist</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Dakika</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Sarı</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Kırmızı</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stats.map((stat) => (
                      <tr key={stat.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{stat.season}</td>
                        <td className="px-4 py-3 text-sm text-center">{stat.matches_played}</td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-green-600">{stat.goals}</td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-blue-600">{stat.assists}</td>
                        <td className="px-4 py-3 text-sm text-center">{stat.minutes_played}</td>
                        <td className="px-4 py-3 text-sm text-center">{stat.yellow_cards}</td>
                        <td className="px-4 py-3 text-sm text-center">{stat.red_cards}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const StatBox = ({ label, value, color = 'text-gray-900' }) => (
  <div className="bg-gray-50 rounded-lg p-4 text-center">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

export default PlayerDetail;
