import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trainingAPI } from '../services/api';

const Training = () => {
  const [templates, setTemplates] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');
  const [templateFormData, setTemplateFormData] = useState({
    name: '',
    category: 'Fiziksel',
    duration: 60,
    description: '',
    objectives: '',
    equipment: '',
    exercises: '',
    difficulty: 'Orta'
  });
  const [planFormData, setPlanFormData] = useState({
    date: '',
    template_id: '',
    notes: '',
    completed: 0
  });

  const categories = ['Fiziksel', 'Teknik', 'Taktik', 'Kondisyon', 'Isınma', 'Soğuma'];
  const difficulties = ['Kolay', 'Orta', 'Zor'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [templatesRes, plansRes] = await Promise.all([
        trainingAPI.getAllTemplates(),
        trainingAPI.getAllPlans()
      ]);
      setTemplates(templatesRes.data.data);
      setPlans(plansRes.data.data);
    } catch (error) {
      console.error('Antrenman verileri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSubmit = async (e) => {
    e.preventDefault();
    try {
      await trainingAPI.createTemplate(templateFormData);
      setShowTemplateModal(false);
      resetTemplateForm();
      loadData();
    } catch (error) {
      console.error('Şablon eklenemedi:', error);
      alert('Şablon eklenirken bir hata oluştu');
    }
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      await trainingAPI.createPlan(planFormData);
      setShowPlanModal(false);
      resetPlanForm();
      loadData();
    } catch (error) {
      console.error('Plan eklenemedi:', error);
      alert('Plan eklenirken bir hata oluştu');
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Bu şablonu silmek istediğinizden emin misiniz?')) {
      try {
        await trainingAPI.deleteTemplate(id);
        loadData();
      } catch (error) {
        console.error('Şablon silinemedi:', error);
        alert('Şablon silinirken bir hata oluştu');
      }
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('Bu planı silmek istediğinizden emin misiniz?')) {
      try {
        await trainingAPI.deletePlan(id);
        loadData();
      } catch (error) {
        console.error('Plan silinemedi:', error);
        alert('Plan silinirken bir hata oluştu');
      }
    }
  };

  const resetTemplateForm = () => {
    setTemplateFormData({
      name: '',
      category: 'Fiziksel',
      duration: 60,
      description: '',
      objectives: '',
      equipment: '',
      exercises: '',
      difficulty: 'Orta'
    });
  };

  const resetPlanForm = () => {
    setPlanFormData({
      date: '',
      template_id: '',
      notes: '',
      completed: 0
    });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Şablonlar ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'plans'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Planlar ({plans.length})
          </button>
        </div>
        <button
          onClick={() => activeTab === 'templates' ? setShowTemplateModal(true) : setShowPlanModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Yeni {activeTab === 'templates' ? 'Şablon' : 'Plan'}
        </button>
      </div>

      {activeTab === 'templates' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-xl mb-2">{template.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {template.duration} dk
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {template.difficulty}
                    </span>
                  </div>
                </div>

                {template.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.description}</p>
                )}

                <div className="flex space-x-2">
                  <Link
                    to={`/training/${template.id}`}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center text-sm"
                  >
                    Detay
                  </Link>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
          {templates.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500">
              <p className="text-xl">Henüz antrenman şablonu yok</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          {plans.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <div key={plan.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{plan.template_name || 'Plan'}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📅 {new Date(plan.date).toLocaleDateString('tr-TR')}</span>
                        {plan.category && (
                          <span className={`px-2 py-1 rounded ${getCategoryColor(plan.category)}`}>
                            {plan.category}
                          </span>
                        )}
                        {plan.duration && <span>⏱️ {plan.duration} dk</span>}
                        <span className={plan.completed ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                          {plan.completed ? '✓ Tamamlandı' : '○ Bekliyor'}
                        </span>
                      </div>
                      {plan.notes && (
                        <p className="mt-2 text-sm text-gray-600">{plan.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">Henüz antrenman planı yok</p>
            </div>
          )}
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Yeni Antrenman Şablonu</h2>
            <form onSubmit={handleTemplateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şablon Adı *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={templateFormData.name}
                  onChange={(e) => setTemplateFormData({...templateFormData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={templateFormData.category}
                    onChange={(e) => setTemplateFormData({...templateFormData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Süre (dakika)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={templateFormData.duration}
                    onChange={(e) => setTemplateFormData({...templateFormData, duration: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zorluk</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={templateFormData.difficulty}
                    onChange={(e) => setTemplateFormData({...templateFormData, difficulty: e.target.value})}
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={templateFormData.description}
                  onChange={(e) => setTemplateFormData({...templateFormData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hedefler</label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={templateFormData.objectives}
                  onChange={(e) => setTemplateFormData({...templateFormData, objectives: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ekipman</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={templateFormData.equipment}
                  onChange={(e) => setTemplateFormData({...templateFormData, equipment: e.target.value})}
                  placeholder="Top, huni, eldiven, vb."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Egzersizler</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={templateFormData.exercises}
                  onChange={(e) => setTemplateFormData({...templateFormData, exercises: e.target.value})}
                  placeholder="Egzersiz detaylarını yazın..."
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowTemplateModal(false); resetTemplateForm(); }}
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

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Yeni Antrenman Planı</h2>
            <form onSubmit={handlePlanSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={planFormData.date}
                  onChange={(e) => setPlanFormData({...planFormData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şablon</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={planFormData.template_id}
                  onChange={(e) => setPlanFormData({...planFormData, template_id: e.target.value})}
                >
                  <option value="">Şablon Seçin (İsteğe Bağlı)</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={planFormData.notes}
                  onChange={(e) => setPlanFormData({...planFormData, notes: e.target.value})}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="completed"
                  className="mr-2"
                  checked={planFormData.completed === 1}
                  onChange={(e) => setPlanFormData({...planFormData, completed: e.target.checked ? 1 : 0})}
                />
                <label htmlFor="completed" className="text-sm text-gray-700">Tamamlandı olarak işaretle</label>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowPlanModal(false); resetPlanForm(); }}
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

export default Training;
