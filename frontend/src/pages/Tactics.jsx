import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tacticsAPI } from '../services/api';

const Tactics = () => {
  const [tactics, setTactics] = useState([]);
  const [filteredTactics, setFilteredTactics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterFormation, setFilterFormation] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    formation: '4-4-2',
    description: '',
    style: 'Hücum',
    positions: '',
    instructions: ''
  });

  const formations = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2', '4-1-4-1', '3-4-3'];
  const styles = ['Hücum', 'Savunma', 'Dengeli', 'Baskı', 'Kontra Atak'];

  useEffect(() => {
    loadTactics();
  }, []);

  useEffect(() => {
    filterTactics();
  }, [tactics, filterFormation]);

  const loadTactics = async () => {
    try {
      const response = await tacticsAPI.getAll();
      setTactics(response.data.data);
    } catch (error) {
      console.error('Taktikler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTactics = () => {
    let filtered = tactics;
    if (filterFormation !== 'all') {
      filtered = filtered.filter(tactic => tactic.formation === filterFormation);
    }
    setFilteredTactics(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tacticsAPI.create(formData);
      setShowModal(false);
      resetForm();
      loadTactics();
    } catch (error) {
      console.error('Taktik eklenemedi:', error);
      alert('Taktik eklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu taktiği silmek istediğinizden emin misiniz?')) {
      try {
        await tacticsAPI.delete(id);
        loadTactics();
      } catch (error) {
        console.error('Taktik silinemedi:', error);
        alert('Taktik silinirken bir hata oluştu');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      formation: '4-4-2',
      description: '',
      style: 'Hücum',
      positions: '',
      instructions: ''
    });
  };

  const getStyleColor = (style) => {
    const colors = {
      'Hücum': 'bg-red-100 text-red-800',
      'Savunma': 'bg-blue-100 text-blue-800',
      'Dengeli': 'bg-green-100 text-green-800',
      'Baskı': 'bg-purple-100 text-purple-800',
      'Kontra Atak': 'bg-yellow-100 text-yellow-800'
    };
    return colors[style] || 'bg-gray-100 text-gray-800';
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
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={filterFormation}
            onChange={(e) => setFilterFormation(e.target.value)}
          >
            <option value="all">Tüm Formasyonlar</option>
            {formations.map(form => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Yeni Taktik
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Toplam Taktik</p>
          <p className="text-3xl font-bold text-green-600">{tactics.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Filtrelenen</p>
          <p className="text-3xl font-bold text-blue-600">{filteredTactics.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Formasyonlar</p>
          <p className="text-3xl font-bold text-purple-600">
            {new Set(tactics.map(t => t.formation)).size}
          </p>
        </div>
      </div>

      {/* Tactics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTactics.map((tactic) => (
          <div key={tactic.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2">{tactic.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {tactic.formation}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStyleColor(tactic.style)}`}>
                    {tactic.style}
                  </span>
                </div>
              </div>

              {tactic.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tactic.description}</p>
              )}

              <div className="flex space-x-2 mt-4">
                <Link
                  to={`/tactics/${tactic.id}`}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center text-sm"
                >
                  Detay
                </Link>
                <button
                  onClick={() => handleDelete(tactic.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTactics.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">Taktik bulunamadı</p>
          <p className="mt-2">Yeni taktik eklemek için yukarıdaki butona tıklayın</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Yeni Taktik Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taktik Adı *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formasyon *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.formation}
                    onChange={(e) => setFormData({...formData, formation: e.target.value})}
                  >
                    {formations.map(form => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stil *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.style}
                    onChange={(e) => setFormData({...formData, style: e.target.value})}
                  >
                    {styles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pozisyonlar (JSON)</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono text-sm"
                  value={formData.positions}
                  onChange={(e) => setFormData({...formData, positions: e.target.value})}
                  placeholder='{"GK": "Kaleci", "LB": "Sol Bek", ...}'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Talimatlar</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.instructions}
                  onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                  placeholder="Takım talimatlarını buraya yazın..."
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

export default Tactics;
