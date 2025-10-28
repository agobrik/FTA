import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { trainingAPI } from '../services/api';

const TrainingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    try {
      const response = await trainingAPI.getTemplateById(id);
      setTemplate(response.data.data);
    } catch (error) {
      console.error('Şablon yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu şablonu silmek istediğinizden emin misiniz?')) {
      try {
        await trainingAPI.deleteTemplate(id);
        navigate('/training');
      } catch (error) {
        console.error('Şablon silinemedi:', error);
        alert('Silme sırasında bir hata oluştu');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Fiziksel': 'bg-red-100 text-red-800',
      'Teknik': 'bg-blue-100 text-blue-800',
      'Taktik': 'bg-green-100 text-green-800',
      'Kondisyon': 'bg-yellow-100 text-yellow-800',
      'Isınma': 'bg-purple-100 text-purple-800',
      'Soğuma': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  if (!template) {
    return <div className="text-center py-12">
      <p className="text-xl text-gray-600">Şablon bulunamadı</p>
      <Link to="/training" className="text-green-600 hover:underline mt-4 inline-block">
        Antrenmanlara dön
      </Link>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/training" className="text-green-600 hover:text-green-700 flex items-center">
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
        <h1 className="text-4xl font-bold mb-4">{template.name}</h1>
        <div className="flex items-center space-x-3 mb-6">
          <span className={`px-4 py-2 rounded-lg text-lg font-semibold ${getCategoryColor(template.category)}`}>
            {template.category}
          </span>
          <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-lg font-semibold">
            ⏱️ {template.duration} dakika
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-lg font-semibold">
            {template.difficulty}
          </span>
        </div>

        {template.description && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Açıklama</h3>
            <p className="text-gray-700 leading-relaxed">{template.description}</p>
          </div>
        )}

        {template.objectives && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Hedefler</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{template.objectives}</p>
            </div>
          </div>
        )}

        {template.equipment && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Gerekli Ekipman</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">{template.equipment}</p>
            </div>
          </div>
        )}

        {template.exercises && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Egzersizler</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{template.exercises}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingDetail;
