import React, { useState, useEffect } from 'react';
import { tacticalAnalysisAPI } from '../services/api';

const RoleSynergies = () => {
  const [synergies, setSynergies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    loadSynergies();
  }, []);

  const loadSynergies = async () => {
    try {
      const res = await tacticalAnalysisAPI.getSynergies();
      setSynergies(res.data.data || []);
    } catch (error) {
      console.error('Sinerjiler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const types = ['all', ...new Set(synergies.map(s => s.synergy_type))];

  const filteredSynergies = synergies.filter(s => {
    if (selectedType !== 'all' && s.synergy_type !== selectedType) return false;
    if (s.synergy_score < minScore) return false;
    return true;
  });

  const getScoreColor = (score) => {
    if (score >= 9) return 'text-green-600 bg-green-100';
    if (score >= 7) return 'text-blue-600 bg-blue-100';
    if (score >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getScoreEmoji = (score) => {
    if (score >= 9) return '🔥';
    if (score >= 7) return '⭐';
    if (score >= 5) return '✓';
    return '○';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">🤝 Rol Sinerjileri</h1>
        <p className="text-purple-100 text-lg">Hangi oyuncu rolleri birlikte mükemmel çalışır?</p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            {filteredSynergies.length} Sinerji Analizi
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            {synergies.filter(s => s.synergy_score >= 9).length} Mükemmel Uyum
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        {/* Type Filter */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Sinerji Tipi:</p>
          <div className="flex gap-2 flex-wrap">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'Tümü' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Score Filter */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Minimum Sinerji Skoru: {minScore}/10
          </p>
          <input
            type="range"
            min="0"
            max="10"
            value={minScore}
            onChange={(e) => setMinScore(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Synergies List */}
      <div className="space-y-4">
        {filteredSynergies.map((synergy) => (
          <div
            key={synergy.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getScoreEmoji(synergy.synergy_score)}</span>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {synergy.role_1_name} + {synergy.role_2_name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                      {synergy.synergy_type}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {synergy.role_1_position}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {synergy.role_2_position}
                    </span>
                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${getScoreColor(synergy.synergy_score)}`}>
                      {synergy.synergy_score}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed bg-gray-50 p-3 rounded-lg">
                {synergy.synergy_description}
              </p>

              {/* Compatibility Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-bold text-green-700 mb-2">✓ Taktiksel Uyum</p>
                  <p className="text-sm text-gray-700">{synergy.tactical_compatibility}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-bold text-blue-700 mb-2">📍 Uzamsal Uyum</p>
                  <p className="text-sm text-gray-700">{synergy.spatial_compatibility}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-bold text-purple-700 mb-2">⚙️ Fonksiyonel Uyum</p>
                  <p className="text-sm text-gray-700">{synergy.functional_compatibility}</p>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Combined Strengths */}
                {synergy.combined_strengths && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-green-700 mb-2">💪 Güçlü Yönler:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {JSON.parse(synergy.combined_strengths || '[]').map((strength, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-600 mr-2">+</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Combined Weaknesses */}
                {synergy.combined_weaknesses && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-red-700 mb-2">⚠️ Zayıf Yönler:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {JSON.parse(synergy.combined_weaknesses || '[]').map((weakness, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-600 mr-2">-</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tactical Details */}
              <div className="space-y-3">
                {/* Ideal Positioning */}
                {synergy.ideal_positioning && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-blue-700 mb-1">📍 İdeal Konumlanma:</p>
                    <p className="text-sm text-gray-700">{synergy.ideal_positioning}</p>
                  </div>
                )}

                {/* Movement Coordination */}
                {synergy.movement_coordination && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-purple-700 mb-1">🔄 Hareket Koordinasyonu:</p>
                    <p className="text-sm text-gray-700">{synergy.movement_coordination}</p>
                  </div>
                )}

                {/* Passing Relationships */}
                {synergy.passing_relationships && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-orange-700 mb-1">⚽ Pas İlişkileri:</p>
                    <p className="text-sm text-gray-700">{synergy.passing_relationships}</p>
                  </div>
                )}
              </div>

              {/* Famous Partnerships */}
              {synergy.famous_partnerships && (
                <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm font-bold text-yellow-700 mb-2">🌟 Ünlü Ortaklıklar:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {JSON.parse(synergy.famous_partnerships || '[]').map((partnership, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-yellow-600 mr-2">→</span>
                        <span className="font-medium">{partnership}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSynergies.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">Filtrelerinize uygun sinerji bulunamadı</p>
          <button
            onClick={() => { setSelectedType('all'); setMinScore(0); }}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleSynergies;
