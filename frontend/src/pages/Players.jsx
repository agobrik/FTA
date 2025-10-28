import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { playersAPI } from '../services/api';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    position: 'Forvet',
    age: '',
    jersey_number: '',
    height: '',
    weight: '',
    nationality: 'Türkiye',
    preferred_foot: 'Sağ',
    rating: 70
  });

  const positions = ['Kaleci', 'Defans', 'Orta Saha', 'Kanat', 'Forvet'];

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [players, searchTerm, filterPosition]);

  const loadPlayers = async () => {
    try {
      const response = await playersAPI.getAll();
      setPlayers(response.data.data);
    } catch (error) {
      console.error('Oyuncular yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlayers = () => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPosition !== 'all') {
      filtered = filtered.filter(player => player.position === filterPosition);
    }

    setFilteredPlayers(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await playersAPI.create(formData);
      setShowModal(false);
      resetForm();
      loadPlayers();
    } catch (error) {
      console.error('Oyuncu eklenemedi:', error);
      alert('Oyuncu eklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu oyuncuyu silmek istediğinizden emin misiniz?')) {
      try {
        await playersAPI.delete(id);
        loadPlayers();
      } catch (error) {
        console.error('Oyuncu silinemedi:', error);
        alert('Oyuncu silinirken bir hata oluştu');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: 'Forvet',
      age: '',
      jersey_number: '',
      height: '',
      weight: '',
      nationality: 'Türkiye',
      preferred_foot: 'Sağ',
      rating: 70
    });
  };

  const getPositionColor = (position) => {
    const colors = {
      'Kaleci': 'bg-yellow-100 text-yellow-800',
      'Defans': 'bg-blue-100 text-blue-800',
      'Orta Saha': 'bg-green-100 text-green-800',
      'Kanat': 'bg-purple-100 text-purple-800',
      'Forvet': 'bg-red-100 text-red-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Oyuncu ara..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
          >
            <option value="all">Tüm Pozisyonlar</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Yeni Oyuncu
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Toplam Oyuncu</p>
          <p className="text-3xl font-bold text-green-600">{players.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Ortalama Yaş</p>
          <p className="text-3xl font-bold text-blue-600">
            {players.length > 0 ? (players.reduce((sum, p) => sum + (p.age || 0), 0) / players.length).toFixed(1) : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Filtrelenen</p>
          <p className="text-3xl font-bold text-purple-600">{filteredPlayers.length}</p>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getPositionColor(player.position)}`}>
                      {player.position}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  #{player.jersey_number}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Yaş:</span>
                  <span className="font-semibold">{player.age}</span>
                </div>
                <div className="flex justify-between">
                  <span>Boy:</span>
                  <span className="font-semibold">{player.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Ayak:</span>
                  <span className="font-semibold">{player.preferred_foot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-semibold text-green-600">{player.rating}/100</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/players/${player.id}`}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center text-sm"
                >
                  Detay
                </Link>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">Oyuncu bulunamadı</p>
          <p className="mt-2">Yeni oyuncu eklemek için yukarıdaki butona tıklayın</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Yeni Oyuncu Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">İsim *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pozisyon *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  >
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yaş</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forma No</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.jersey_number}
                    onChange={(e) => setFormData({...formData, jersey_number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Boy (cm)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kilo (kg)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Uyruk</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tercih Edilen Ayak</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-100)</label>
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
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
