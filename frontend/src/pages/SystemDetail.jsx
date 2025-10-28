import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tacticalAnalysisAPI } from '../services/api';

const SystemDetail = () => {
  const { id } = useParams();
  const [system, setSystem] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [pressingZones, setPressingZones] = useState([]);
  const [possessionTactics, setPossessionTactics] = useState(null);
  const [nonPossessionTactics, setNonPossessionTactics] = useState(null);
  const [transitions, setTransitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadSystemData();
  }, [id]);

  const loadSystemData = async () => {
    try {
      const [systemRes, weakRes, pressRes, possRes, nonPossRes, transRes] = await Promise.all([
        tacticalAnalysisAPI.getSystemById(id),
        tacticalAnalysisAPI.getSystemWeaknesses(id),
        tacticalAnalysisAPI.getSystemPressingZones(id),
        tacticalAnalysisAPI.getSystemPossession(id),
        tacticalAnalysisAPI.getSystemNonPossession(id),
        tacticalAnalysisAPI.getTransitions()
      ]);

      setSystem(systemRes.data.data);
      setWeaknesses(weakRes.data.data || []);
      setPressingZones(pressRes.data.data || []);
      setPossessionTactics(possRes.data.data || null);
      setNonPossessionTactics(nonPossRes.data.data || null);

      // Filter transitions related to this system's formation
      const systemFormation = systemRes.data.data.formation;
      const relatedTransitions = (transRes.data.data || []).filter(t =>
        t.from_formation === systemFormation || t.to_formation === systemFormation
      );
      setTransitions(relatedTransitions);
    } catch (error) {
      console.error('Sistem detayları yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Kritik': 'bg-red-100 text-red-800 border-red-300',
      'Yüksek': 'bg-orange-100 text-orange-800 border-orange-300',
      'Orta': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Düşük': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  if (!system) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Sistem bulunamadı</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <Link to="/tactical-analysis" className="text-white/80 hover:text-white text-sm mb-2 inline-block">
              ← Taktik Analiz
            </Link>
            <h1 className="text-4xl font-bold mb-3">{system.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 bg-white/20 rounded-lg text-lg font-semibold">
                {system.formation}
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-lg">
                {system.system_type}
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-lg">
                Pressing: {system.pressing_intensity}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-green-100 text-lg leading-relaxed">{system.philosophy}</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📋 Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('weaknesses')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'weaknesses'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚠️ Zayıf Noktalar ({weaknesses.length})
          </button>
          <button
            onClick={() => setActiveTab('pressing')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'pressing'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔥 Pressing Bölgeleri ({pressingZones.length})
          </button>
          <button
            onClick={() => setActiveTab('possession')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'possession'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚽ Top Hakimiyeti {possessionTactics && Object.keys(possessionTactics).length > 0 ? '(✓)' : ''}
          </button>
          <button
            onClick={() => setActiveTab('nonpossession')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'nonpossession'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🛡️ Topsuz Faz {nonPossessionTactics && Object.keys(nonPossessionTactics).length > 0 ? '(✓)' : ''}
          </button>
          <button
            onClick={() => setActiveTab('transitions')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'transitions'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔄 Geçişler ({transitions.length})
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* System Characteristics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600 mb-1">Tempo</p>
              <p className="text-2xl font-bold text-gray-800">{system.tempo}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600 mb-1">Pas Stili</p>
              <p className="text-2xl font-bold text-gray-800">{system.passing_style}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600 mb-1">Mentalite</p>
              <p className="text-2xl font-bold text-gray-800">{system.team_mentality}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600 mb-1">Savunma Çizgisi</p>
              <p className="text-2xl font-bold text-gray-800">{system.defensive_line_height}</p>
            </div>
          </div>

          {/* Phases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-green-700">⚡ Hücum Fazı</h3>
              <p className="text-gray-700 leading-relaxed">{system.attacking_phase}</p>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-semibold text-gray-700 mb-2">Build-up Oyunu:</p>
                <p className="text-sm text-gray-600">{system.build_up_play}</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Şans Yaratma:</p>
                <p className="text-sm text-gray-600">{system.chance_creation}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-700">🛡️ Savunma Fazı</h3>
              <p className="text-gray-700 leading-relaxed">{system.defensive_phase}</p>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-semibold text-gray-700 mb-2">Hücumda Genişlik:</p>
                <p className="text-sm text-gray-600">{system.width_in_attack}</p>
              </div>
            </div>
          </div>

          {/* Transitions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 text-yellow-700">🔄 Hücum Geçişi</h3>
              <p className="text-gray-700 leading-relaxed">{system.transition_attack}</p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-bold mb-3 text-red-700">🔙 Savunma Geçişi</h3>
              <p className="text-gray-700 leading-relaxed">{system.transition_defense}</p>
            </div>
          </div>
        </div>
      )}

      {/* Weaknesses Tab */}
      {activeTab === 'weaknesses' && (
        <div className="space-y-4">
          {weaknesses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">Bu sistem için zayıf nokta analizi henüz eklenmemiş</p>
            </div>
          ) : (
            weaknesses.map((weakness, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{weakness.weakness_type}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getSeverityColor(weakness.severity)}`}>
                        Şiddet: {weakness.severity}/10
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Sıklık: {weakness.frequency}/10
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{weakness.weakness_description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weakness.how_to_exploit && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-red-700 mb-2">🎯 Nasıl İstismar Edilir:</p>
                      <p className="text-sm text-gray-700">{weakness.how_to_exploit}</p>
                    </div>
                  )}
                  {weakness.required_approach && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-blue-700 mb-2">📋 Gerekli Yaklaşım:</p>
                      {(() => {
                        try {
                          const approaches = JSON.parse(weakness.required_approach);
                          return (
                            <ul className="text-sm text-gray-700 space-y-1">
                              {approaches.map((approach, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  <span>{approach}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        } catch {
                          return <p className="text-sm text-gray-700">{weakness.required_approach}</p>;
                        }
                      })()}
                    </div>
                  )}
                </div>

                {weakness.examples && (
                  <div className="mt-4 bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-green-700 mb-2">💡 Örnekler:</p>
                    {(() => {
                      try {
                        const examples = JSON.parse(weakness.examples);
                        return (
                          <ul className="text-sm text-gray-700 space-y-1">
                            {examples.map((example, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-600 mr-2">→</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      } catch {
                        return <p className="text-sm text-gray-700">{weakness.examples}</p>;
                      }
                    })()}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Pressing Zones Tab */}
      {activeTab === 'pressing' && (
        <div className="space-y-4">
          {pressingZones.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">Bu sistem için pressing bölgesi analizi henüz eklenmemiş</p>
            </div>
          ) : (
            pressingZones.map((zone, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{zone.trap_name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {zone.trap_zone}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {zone.trap_trigger && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-yellow-700 mb-2">⚡ Tetikleme:</p>
                      <p className="text-sm text-gray-700">{zone.trap_trigger}</p>
                    </div>
                  )}

                  {zone.trap_setup && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-purple-700 mb-2">🎯 Kurulum:</p>
                      <p className="text-sm text-gray-700">{zone.trap_setup}</p>
                    </div>
                  )}

                  {zone.trap_execution && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-blue-700 mb-2">⚙️ Uygulama:</p>
                      <p className="text-sm text-gray-700">{zone.trap_execution}</p>
                    </div>
                  )}

                  {zone.player_roles_involved && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-green-700 mb-2">👥 İlgili Oyuncu Rolleri:</p>
                      <p className="text-sm text-gray-700">{zone.player_roles_involved}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {zone.success_rate_high_against && (
                      <div className="bg-green-100 p-4 rounded-lg">
                        <p className="text-sm font-bold text-green-800 mb-2">✅ Etkili Olduğu Sistemler:</p>
                        <p className="text-sm text-gray-700">{zone.success_rate_high_against}</p>
                      </div>
                    )}
                    {zone.success_rate_low_against && (
                      <div className="bg-red-100 p-4 rounded-lg">
                        <p className="text-sm font-bold text-red-800 mb-2">❌ Zorlandığı Sistemler:</p>
                        <p className="text-sm text-gray-700">{zone.success_rate_low_against}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Possession Tab */}
      {activeTab === 'possession' && (
        <div className="space-y-4">
          {!possessionTactics || Object.keys(possessionTactics).length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">Bu sistem için top hakimiyeti taktiği henüz eklenmemiş</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Top Hakimiyeti Taktiği</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {possessionTactics.possession_style}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Hedef: %{possessionTactics.possession_target_percentage}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {possessionTactics.in_possession_shape && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-blue-700 mb-2">📐 Toplu Şekil:</p>
                    <p className="text-sm text-gray-700">{possessionTactics.in_possession_shape}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {possessionTactics.passing_principles && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-green-700 mb-2">⚽ Pas Prensipleri:</p>
                      {(() => {
                        try {
                          const principles = JSON.parse(possessionTactics.passing_principles);
                          return (
                            <ul className="text-sm text-gray-700 space-y-1">
                              {principles.map((principle, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-600 mr-2">→</span>
                                  <span>{principle}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        } catch {
                          return <p className="text-sm text-gray-700">{possessionTactics.passing_principles}</p>;
                        }
                      })()}
                    </div>
                  )}
                  {possessionTactics.movement_principles && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-purple-700 mb-2">🏃 Hareket Prensipleri:</p>
                      {(() => {
                        try {
                          const movements = JSON.parse(possessionTactics.movement_principles);
                          return (
                            <ul className="text-sm text-gray-700 space-y-1">
                              {movements.map((movement, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-purple-600 mr-2">↗</span>
                                  <span>{movement}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        } catch {
                          return <p className="text-sm text-gray-700">{possessionTactics.movement_principles}</p>;
                        }
                      })()}
                    </div>
                  )}
                </div>

                {possessionTactics.progression_patterns && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-orange-700 mb-2">⚡ İlerleme Kalıpları:</p>
                    <p className="text-sm text-gray-700">{possessionTactics.progression_patterns}</p>
                  </div>
                )}

                {possessionTactics.circulation_patterns && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-yellow-700 mb-2">🔄 Dolaşım Kalıpları:</p>
                    <p className="text-sm text-gray-700">{possessionTactics.circulation_patterns}</p>
                  </div>
                )}

                {possessionTactics.overload_patterns && (
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-pink-700 mb-2">➕ Aşırı Yükleme Kalıpları:</p>
                    <p className="text-sm text-gray-700">{possessionTactics.overload_patterns}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Non-Possession Tab */}
      {activeTab === 'nonpossession' && (
        <div className="space-y-4">
          {!nonPossessionTactics || Object.keys(nonPossessionTactics).length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">Bu sistem için topsuz faz taktiği henüz eklenmemiş</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Topsuz Faz Taktiği</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {nonPossessionTactics.defensive_philosophy && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      {nonPossessionTactics.defensive_philosophy}
                    </span>
                  )}
                  {nonPossessionTactics.pressing_philosophy && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      Pressing: {nonPossessionTactics.pressing_philosophy}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {nonPossessionTactics.out_of_possession_shape && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-bold text-blue-700 mb-2">🛡️ Topsuz Şekil:</p>
                    <p className="text-sm text-gray-700">{nonPossessionTactics.out_of_possession_shape}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nonPossessionTactics.pressing_triggers && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-red-700 mb-2">⚡ Pressing Tetikleyicileri:</p>
                      {(() => {
                        try {
                          const triggers = JSON.parse(nonPossessionTactics.pressing_triggers);
                          return (
                            <ul className="text-sm text-gray-700 space-y-1">
                              {triggers.map((trigger, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-red-600 mr-2">→</span>
                                  <span>{trigger}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        } catch {
                          return <p className="text-sm text-gray-700">{nonPossessionTactics.pressing_triggers}</p>;
                        }
                      })()}
                    </div>
                  )}
                  {nonPossessionTactics.where_to_press && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-purple-700 mb-2">📍 Nerede Basılır:</p>
                      <p className="text-sm text-gray-700">{nonPossessionTactics.where_to_press}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {nonPossessionTactics.when_to_press && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-orange-700 mb-2">⏱️ Ne Zaman Basılır:</p>
                      <p className="text-sm text-gray-700">{nonPossessionTactics.when_to_press}</p>
                    </div>
                  )}
                  {nonPossessionTactics.how_to_press && (
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-pink-700 mb-2">🎯 Nasıl Basılır:</p>
                      <p className="text-sm text-gray-700">{nonPossessionTactics.how_to_press}</p>
                    </div>
                  )}
                </div>

                {nonPossessionTactics.counter_attack_philosophy && (
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-bold text-yellow-700 mb-2">⚡ Kontra Atak Felsefesi:</p>
                    <p className="text-sm text-gray-700">{nonPossessionTactics.counter_attack_philosophy}</p>
                  </div>
                )}

                {nonPossessionTactics.pressing_traps && (
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-bold text-green-700 mb-2">🪤 Pressing Tuzakları:</p>
                    <p className="text-sm text-gray-700">{nonPossessionTactics.pressing_traps}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transitions Tab */}
      {activeTab === 'transitions' && (
        <div className="space-y-4">
          {transitions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">Bu formasyon için geçiş analizi bulunamadı</p>
            </div>
          ) : (
            transitions.map((transition, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-bold text-lg">
                      {transition.from_formation}
                    </span>
                    <span className="text-3xl text-gray-400">→</span>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-lg">
                      {transition.to_formation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                      {transition.transition_context}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Zorluk: {transition.difficulty}/10
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{transition.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transition.key_player_movements && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-blue-700 mb-2">🏃 Oyuncu Hareketleri:</p>
                      <p className="text-sm text-gray-700">{transition.key_player_movements}</p>
                    </div>
                  )}
                  {transition.timing_triggers && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-bold text-green-700 mb-2">⏱️ Zamanlama Tetikleyicileri:</p>
                      <p className="text-sm text-gray-700">{transition.timing_triggers}</p>
                    </div>
                  )}
                </div>

                {transition.practice_drills && (
                  <div className="mt-4 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm font-bold text-orange-700 mb-2">💪 Antrenman Çalışmaları:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {JSON.parse(transition.practice_drills || '[]').map((drill, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-orange-600 mr-2">→</span>
                          <span>{drill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SystemDetail;
