import React, { useState, useEffect } from 'react';
import { tacticalAnalysisAPI } from '../services/api';

const TacticalConcepts = () => {
  const [concepts, setConcepts] = useState([]);
  const [filteredConcepts, setFilteredConcepts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState(null);

  useEffect(() => {
    loadConcepts();
  }, []);

  useEffect(() => {
    filterConcepts();
  }, [selectedCategory, concepts]);

  const loadConcepts = async () => {
    try {
      const res = await tacticalAnalysisAPI.getConcepts();
      setConcepts(res.data.data || []);
    } catch (error) {
      console.error('Konseptler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterConcepts = () => {
    if (selectedCategory === 'all') {
      setFilteredConcepts(concepts);
    } else {
      setFilteredConcepts(concepts.filter(c => c.category === selectedCategory));
    }
  };

  const categories = ['all', ...new Set(concepts.map(c => c.category))];

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">Taktik Konseptler</h1>
        <p className="text-gray-600">Modern futbolun temel taktik kavramları ve prensipleri</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">
            Toplam {filteredConcepts.length} konsept
          </span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Tümü' : cat}
              {cat !== 'all' && ` (${concepts.filter(c => c.category === cat).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcepts.map(concept => (
          <div
            key={concept.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedConcept(concept.id === selectedConcept ? null : concept.id)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{concept.concept_name}</h3>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                    {concept.importance}/10
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                {concept.category}
              </span>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-4 leading-relaxed">{concept.description}</p>

              {/* Principles */}
              {concept.principles && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-700 mb-2">✓ Temel Prensipler:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {JSON.parse(concept.principles || '[]').slice(0, 3).map((p, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expanded Content */}
              {selectedConcept === concept.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  {/* Full Principles */}
                  {concept.principles && JSON.parse(concept.principles || '[]').length > 3 && (
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-2">Tüm Prensipler:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {JSON.parse(concept.principles || '[]').slice(3).map((p, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Application */}
                  {concept.application && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-blue-700 mb-1">📋 Uygulama:</p>
                      <p className="text-xs text-gray-700">{concept.application}</p>
                    </div>
                  )}

                  {/* Examples */}
                  {concept.real_world_examples && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-green-700 mb-2">🌟 Gerçek Örnekler:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {JSON.parse(concept.real_world_examples || '[]').map((ex, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-600 mr-2">→</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {concept.common_mistakes && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-red-700 mb-2">⚠️ Yaygın Hatalar:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {JSON.parse(concept.common_mistakes || '[]').map((mistake, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-600 mr-2">✗</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Players */}
                  {concept.key_players_for_concept && (
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-purple-700 mb-2">👤 Anahtar Oyuncular:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {JSON.parse(concept.key_players_for_concept || '[]').map((player, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>{player}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Expand Button */}
              <button
                className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConcept(concept.id === selectedConcept ? null : concept.id);
                }}
              >
                {selectedConcept === concept.id ? '▲ Daralt' : '▼ Detayları Göster'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredConcepts.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">Bu kategoride konsept bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default TacticalConcepts;
