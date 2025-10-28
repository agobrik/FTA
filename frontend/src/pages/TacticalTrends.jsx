import React, { useState, useEffect } from 'react';
import { tacticalAnalysisAPI } from '../services/api';

const TacticalTrends = () => {
  const [trends, setTrends] = useState([]);
  const [filteredTrends, setFilteredTrends] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    loadTrends();
  }, []);

  useEffect(() => {
    filterTrends();
  }, [selectedCategory, trends]);

  const loadTrends = async () => {
    try {
      const res = await tacticalAnalysisAPI.getTrends();
      setTrends(res.data.data || []);
    } catch (error) {
      console.error('Trendler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTrends = () => {
    if (selectedCategory === 'all') {
      setFilteredTrends(trends);
    } else {
      setFilteredTrends(trends.filter(t => t.category === selectedCategory));
    }
  };

  const categories = ['all', ...new Set(trends.map(t => t.category))];

  const getPrevalenceColor = (prevalence) => {
    if (prevalence >= 9) return 'bg-red-100 text-red-800 border-red-300';
    if (prevalence >= 7) return 'bg-orange-100 text-orange-800 border-orange-300';
    if (prevalence >= 5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const getPrevalenceLabel = (prevalence) => {
    if (prevalence >= 9) return 'Çok Yaygın';
    if (prevalence >= 7) return 'Yaygın';
    if (prevalence >= 5) return 'Orta';
    return 'Yeni Başlayan';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">📈 Taktik Trendler (2015-2025)</h1>
        <p className="text-blue-100 text-lg">Modern futbolun evrimi ve gelecek projeksiyonları</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            {filteredTrends.length} Trend Analizi
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            10 Yıllık Periyot
          </span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Kategori Filtrele:</p>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Tüm Trendler' : cat}
              {cat !== 'all' && ` (${trends.filter(t => t.category === cat).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="space-y-4">
        {filteredTrends.map((trend, index) => (
          <div
            key={trend.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="p-6">
              {/* Trend Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{index + 1}</span>
                    <h3 className="text-2xl font-bold text-gray-800">{trend.trend_name}</h3>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                      {trend.season}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {trend.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getPrevalenceColor(trend.prevalence)}`}>
                      {getPrevalenceLabel(trend.prevalence)} ({trend.prevalence}/10)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">{trend.description}</p>

              {/* Key Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Key Teams */}
                {trend.key_teams && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-green-700 mb-2">🏆 Öncü Takımlar:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {JSON.parse(trend.key_teams || '[]').map((team, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>{team}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Coaches */}
                {trend.key_coaches && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-blue-700 mb-2">👨‍💼 Öncü Teknik Direktörler:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {JSON.parse(trend.key_coaches || '[]').map((coach, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{coach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Toggle Details Button */}
              <button
                onClick={() => setSelectedTrend(trend.id === selectedTrend ? null : trend.id)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
              >
                {selectedTrend === trend.id ? '▲ Detayları Gizle' : '▼ İstatistikler ve Projeksiyonlar'}
              </button>

              {/* Expanded Details */}
              {selectedTrend === trend.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Statistical Evidence */}
                  {trend.statistical_evidence && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-purple-700 mb-3">📊 İstatistiksel Kanıtlar:</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        {JSON.parse(trend.statistical_evidence || '[]').map((stat, i) => (
                          <li key={i} className="flex items-start bg-white p-2 rounded">
                            <span className="text-purple-600 mr-2 font-bold">→</span>
                            <span>{stat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Future Projection */}
                  {trend.future_projection && (
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm font-bold text-orange-700 mb-2">🔮 Gelecek Projeksiyonu:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{trend.future_projection}</p>
                    </div>
                  )}

                  {/* Impact Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-blue-600 font-semibold mb-1">Yaygınlık</p>
                      <p className="text-2xl font-bold text-blue-700">{trend.prevalence}/10</p>
                      <div className="mt-2 bg-blue-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full transition-all"
                          style={{ width: `${trend.prevalence * 10}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-green-600 font-semibold mb-1">Öncü Takımlar</p>
                      <p className="text-2xl font-bold text-green-700">
                        {JSON.parse(trend.key_teams || '[]').length}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Büyük kulüp</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-purple-600 font-semibold mb-1">Dönem</p>
                      <p className="text-lg font-bold text-purple-700">{trend.season}</p>
                      <p className="text-xs text-gray-600 mt-1">Aktif periyot</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTrends.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">Bu kategoride trend bulunamadı</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Trend Özeti</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Toplam Trend</p>
            <p className="text-3xl font-bold text-gray-800">{trends.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Çok Yaygın (9-10)</p>
            <p className="text-3xl font-bold text-red-600">
              {trends.filter(t => t.prevalence >= 9).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Yaygın (7-8)</p>
            <p className="text-3xl font-bold text-orange-600">
              {trends.filter(t => t.prevalence >= 7 && t.prevalence < 9).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Gelişmekte</p>
            <p className="text-3xl font-bold text-yellow-600">
              {trends.filter(t => t.prevalence < 7).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalTrends;
