import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tacticsAPI } from '../services/api';

const TacticDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tactic, setTactic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTactic();
  }, [id]);

  const loadTactic = async () => {
    try {
      const response = await tacticsAPI.getById(id);
      setTactic(response.data.data);
    } catch (error) {
      console.error('Taktik yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu taktiği silmek istediğinizden emin misiniz?')) {
      try {
        await tacticsAPI.delete(id);
        navigate('/tactics');
      } catch (error) {
        console.error('Taktik silinemedi:', error);
        alert('Silme sırasında bir hata oluştu');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  if (!tactic) {
    return <div className="text-center py-12">
      <p className="text-xl text-gray-600">Taktik bulunamadı</p>
      <Link to="/tactics" className="text-green-600 hover:underline mt-4 inline-block">
        Taktiklere dön
      </Link>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/tactics" className="text-green-600 hover:text-green-700 flex items-center">
          ← Geri
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sil
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4">{tactic.name}</h1>
        <div className="flex items-center space-x-3 mb-6">
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-lg font-semibold">
            {tactic.formation}
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-lg font-semibold">
            {tactic.style}
          </span>
        </div>

        {tactic.description && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Açıklama</h3>
            <p className="text-gray-700 leading-relaxed">{tactic.description}</p>
          </div>
        )}

        {tactic.instructions && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Talimatlar</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{tactic.instructions}</p>
            </div>
          </div>
        )}

        {tactic.positions && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Pozisyonlar</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 overflow-x-auto">{tactic.positions}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacticDetail;
