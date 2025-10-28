import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { matchesAPI } from '../services/api';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    opponent: '',
    match_date: '',
    location: '',
    home_away: 'İç Saha',
    score_home: '',
    score_away: '',
    formation: '4-4-2',
    result: 'Galibiyet',
    notes: ''
  });

  const formations = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2', '4-1-4-1'];

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const response = await matchesAPI.getAll();
      setMatches(response.data.data);
    } catch (error) {
      console.error('Maçlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await matchesAPI.create(formData);
      setShowModal(false);
      resetForm();
      loadMatches();
    } catch (error) {
      console.error('Maç eklenemedi:', error);
      alert('Maç eklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu maçı silmek istediğinizden emin misiniz?')) {
      try {
        await matchesAPI.delete(id);
        loadMatches();
      } catch (error) {
        console.error('Maç silinemedi:', error);
        alert('Maç silinirken bir hata oluştu');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      opponent: '',
      match_date: '',
      location: '',
      home_away: 'İç Saha',
      score_home: '',
      score_away: '',
      formation: '4-4-2',
      result: 'Galibiyet',
      notes: ''
    });
  };

  const getResultColor = (result) => {
    const colors = {
      'Galibiyet': 'bg-green-100 text-green-800 border-green-300',
      'Beraberlik': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Mağlubiyet': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[result] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const wins = matches.filter(m => m.result === 'Galibiyet').length;
  const draws = matches.filter(m => m.result === 'Beraberlik').length;
  const losses = matches.filter(m => m.result === 'Mağlubiyet').length;

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Maç Geçmişi</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Yeni Maç
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Toplam Maç</p>
          <p className="text-3xl font-bold text-blue-600">{matches.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Galibiyet</p>
          <p className="text-3xl font-bold text-green-600">{wins}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Beraberlik</p>
          <p className="text-3xl font-bold text-yellow-600">{draws}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Mağlubiyet</p>
          <p className="text-3xl font-bold text-red-600">{losses}</p>
        </div>
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-lg shadow-md">
        {matches.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {matches.map((match) => (
              <div key={match.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-bold">{match.opponent}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getResultColor(match.result)}`}>
                        {match.result}
                      </span>
                      <span className="text-sm text-gray-500">
                        {match.home_away === 'İç Saha' ? '🏠' : '✈️'} {match.home_away}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>📅 {new Date(match.match_date).toLocaleDateString('tr-TR')}</span>
                      {match.location && <span>📍 {match.location}</span>}
                      <span>📋 {match.formation}</span>
                    </div>
                    {match.notes && (
                      <p className="mt-2 text-sm text-gray-600">{match.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800">
                        {match.score_home} - {match.score_away}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link
                        to={`/matches/${match.id}`}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm text-center"
                      >
                        Detay
                      </Link>
                      <button
                        onClick={() => handleDelete(match.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">Henüz maç kaydı yok</p>
            <p className="mt-2">Yeni maç eklemek için yukarıdaki butona tıklayın</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Yeni Maç Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rakip Takım *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.opponent}
                    onChange={(e) => setFormData({...formData, opponent: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maç Tarihi *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.match_date}
                    onChange={(e) => setFormData({...formData, match_date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasyon</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">İç Saha / Deplasman</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.home_away}
                    onChange={(e) => setFormData({...formData, home_away: e.target.value})}
                  >
                    <option value="İç Saha">İç Saha</option>
                    <option value="Deplasman">Deplasman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formasyon</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.formation}
                    onChange={(e) => setFormData({...formData, formation: e.target.value})}
                  >
                    {formations.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ev Sahibi Skoru</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.score_home}
                    onChange={(e) => setFormData({...formData, score_home: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deplasman Skoru</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.score_away}
                    onChange={(e) => setFormData({...formData, score_away: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sonuç</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.result}
                    onChange={(e) => setFormData({...formData, result: e.target.value})}
                  >
                    <option value="Galibiyet">Galibiyet</option>
                    <option value="Beraberlik">Beraberlik</option>
                    <option value="Mağlubiyet">Mağlubiyet</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
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

export default Matches;
