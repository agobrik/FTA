import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { opponentsAPI } from '../services/api';

const Opponents = () => {
  const [opponents, setOpponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    league: '',
    typical_formation: '4-4-2',
    playing_style: '',
    strengths: '',
    weaknesses: '',
    key_players: '',
    notes: ''
  });

  const formations = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2', '4-1-4-1', '3-4-3'];

  useEffect(() => {
    loadOpponents();
  }, []);

  const loadOpponents = async () => {
    try {
      const response = await opponentsAPI.getAll();
      setOpponents(response.data.data);
    } catch (error) {
      console.error('Rakipler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await opponentsAPI.create(formData);
      setShowModal(false);
      resetForm();
      loadOpponents();
    } catch (error) {
      console.error('Rakip eklenemedi:', error);
      alert('Rakip eklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu rakibi silmek istediğinizden emin misiniz?')) {
      try {
        await opponentsAPI.delete(id);
        loadOpponents();
      } catch (error) {
        console.error('Rakip silinemedi:', error);
        alert('Rakip silinirken bir hata oluştu');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      league: '',
      typical_formation: '4-4-2',
      playing_style: '',
      strengths: '',
      weaknesses: '',
      key_players: '',
      notes: ''
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Rakip Takımlar</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Yeni Rakip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Toplam Rakip</p>
          <p className="text-3xl font-bold text-purple-600">{opponents.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opponents.map((opponent) => (
          <div key={opponent.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{opponent.name}</h3>
              {opponent.league && (
                <p className="text-sm text-gray-600 mb-3">🏆 {opponent.league}</p>
              )}

              <div className="space-y-2 mb-4">
                {opponent.typical_formation && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700">Formasyon:</span>
                    <span className="text-sm text-gray-600">{opponent.typical_formation}</span>
                  </div>
                )}
                {opponent.playing_style && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700">Stil:</span>
                    <span className="text-sm text-gray-600">{opponent.playing_style}</span>
                  </div>
                )}
              </div>

              {opponent.strengths && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">Güçlü Yönler:</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{opponent.strengths}</p>
                </div>
              )}

              {opponent.weaknesses && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-red-700 mb-1">Zayıf Yönler:</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{opponent.weaknesses}</p>
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                <Link
                  to={`/opponents/${opponent.id}`}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center text-sm"
                >
                  Detay
                </Link>
                <button
                  onClick={() => handleDelete(opponent.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {opponents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">Henüz rakip takım eklenmemiş</p>
          <p className="mt-2">Yeni rakip eklemek için yukarıdaki butona tıklayın</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Yeni Rakip Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Takım Adı *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lig</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.league}
                    onChange={(e) => setFormData({...formData, league: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipik Formasyon</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.typical_formation}
                    onChange={(e) => setFormData({...formData, typical_formation: e.target.value})}
                  >
                    {formations.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oyun Stili</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.playing_style}
                    onChange={(e) => setFormData({...formData, playing_style: e.target.value})}
                    placeholder="Örn: Hücum odaklı, top hakimi"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Güçlü Yönler</label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.strengths}
                  onChange={(e) => setFormData({...formData, strengths: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zayıf Yönler</label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.weaknesses}
                  onChange={(e) => setFormData({...formData, weaknesses: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anahtar Oyuncular</label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.key_players}
                  onChange={(e) => setFormData({...formData, key_players: e.target.value})}
                  placeholder="Örn: 10 numara, golcü, kaleci"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
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

export default Opponents;
