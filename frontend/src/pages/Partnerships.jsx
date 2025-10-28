import React, { useState, useEffect } from 'react';
import { tacticalAnalysisAPI } from '../services/api';

const Partnerships = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    loadPartnerships();
  }, []);

  const loadPartnerships = async () => {
    try {
      const res = await tacticalAnalysisAPI.getPartnerships();
      setPartnerships(res.data.data || []);
    } catch (error) {
      console.error('Ortaklıklar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const types = ['all', ...new Set(partnerships.map(p => p.partnership_type))];

  const filteredPartnerships = selectedType === 'all'
    ? partnerships
    : partnerships.filter(p => p.partnership_type === selectedType);

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">👥 Taktik Ortaklıklar</h1>
        <p className="text-orange-100 text-lg">
          İkili ve üçlü oyuncu kombinasyonları - Sahada birlikte nasıl çalışırlar?
        </p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            {filteredPartnerships.length} Ortaklık
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
            {types.length - 1} Farklı Tip
          </span>
        </div>
      </div>

      {/* Type Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Ortaklık Tipi:</p>
        <div className="flex gap-2 flex-wrap">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedType === type
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'Tümü' : type}
              {type !== 'all' && ` (${partnerships.filter(p => p.partnership_type === type).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Partnerships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartnerships.map((partnership) => (
          <div
            key={partnership.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                    {partnership.partnership_type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {partnership.partnership_name}
                </h3>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {partnership.role_1_name}
                  </span>
                  <span className="text-gray-400">+</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {partnership.role_2_name}
                  </span>
                  {partnership.role_3_name && (
                    <>
                      <span className="text-gray-400">+</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {partnership.role_3_name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Function Description */}
              <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg leading-relaxed">
                {partnership.function_description}
              </p>

              {/* Spatial & Zone */}
              <div className="space-y-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-blue-700 mb-1">📍 Uzamsal Düzenleme:</p>
                  <p className="text-sm text-gray-700">{partnership.spatial_arrangement}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-green-700 mb-1">🗺️ Bölge Kapsamı:</p>
                  <p className="text-sm text-gray-700">{partnership.zone_coverage}</p>
                </div>
              </div>

              {/* Key Principles */}
              {partnership.key_principles && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-700 mb-2">⚙️ Temel Prensipler:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {JSON.parse(partnership.key_principles || '[]').map((principle, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Movement & Passing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {partnership.movement_patterns && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-purple-700 mb-1">🏃 Hareket Kalıpları:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {JSON.parse(partnership.movement_patterns || '[]').slice(0, 3).map((pattern, i) => (
                        <li key={i}>• {pattern}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {partnership.passing_patterns && (
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-indigo-700 mb-1">⚽ Pas Kalıpları:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {JSON.parse(partnership.passing_patterns || '[]').slice(0, 3).map((pattern, i) => (
                        <li key={i}>• {pattern}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Best/Weak Against */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {partnership.best_against && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-green-700 mb-1">✓ Etkili Olduğu:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {JSON.parse(partnership.best_against || '[]').map((item, i) => (
                        <li key={i}>+ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {partnership.weak_against && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-red-700 mb-1">⚠️ Zayıf Olduğu:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {JSON.parse(partnership.weak_against || '[]').map((item, i) => (
                        <li key={i}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Famous Examples */}
              {partnership.famous_examples && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-xs font-bold text-yellow-700 mb-2">🌟 Ünlü Örnekler:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {JSON.parse(partnership.famous_examples || '[]').map((example, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-yellow-600 mr-2">→</span>
                        <span className="font-medium">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPartnerships.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">Bu tipte ortaklık bulunamadı</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Ortaklık İstatistikleri</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {types.slice(1, 5).map(type => (
            <div key={type} className="bg-white p-4 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">{type}</p>
              <p className="text-2xl font-bold text-orange-600">
                {partnerships.filter(p => p.partnership_type === type).length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
