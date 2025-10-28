import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tacticalAnalysisAPI } from '../services/api';

const RoleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [synergies, setSynergies] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoleData();
  }, [id]);

  const loadRoleData = async () => {
    try {
      const [roleRes, synergiesRes, partnershipsRes] = await Promise.all([
        tacticalAnalysisAPI.getRoleById(id),
        tacticalAnalysisAPI.getRoleSynergies(id),
        tacticalAnalysisAPI.getRolePartnerships(id)
      ]);

      setRole(roleRes.data.data);
      setSynergies(synergiesRes.data.data || []);
      setPartnerships(partnershipsRes.data.data || []);
    } catch (error) {
      console.error('Rol detayları yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPositionColor = (position) => {
    const colors = {
      'GK': 'bg-yellow-100 text-yellow-800',
      'DF': 'bg-blue-100 text-blue-800',
      'MF': 'bg-green-100 text-green-800',
      'FW': 'bg-red-100 text-red-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  const getRoleTypeColor = (type) => {
    const colors = {
      'Savunmacı': 'bg-blue-500 text-white',
      'Dengeli': 'bg-green-500 text-white',
      'Hücumcu': 'bg-red-500 text-white',
      'Destek': 'bg-purple-500 text-white',
      'Yaratıcı': 'bg-pink-500 text-white'
    };
    return colors[type] || 'bg-gray-500 text-white';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">Oyuncu rolü bulunamadı</p>
        <button
          onClick={() => navigate('/tactical-analysis')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Taktik Analize Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/tactical-analysis')}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            ← Geri
          </button>
          <div className="flex gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPositionColor(role.position)}`}>
              {role.position}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getRoleTypeColor(role.role_type)}`}>
              {role.role_type}
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3">{role.role_name}</h1>
        <p className="text-xl text-green-100">{role.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Temel Bilgiler */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rol Özellikleri */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">🎯 Temel Özellikler</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Kritik Yetenekler:</p>
                <div className="flex flex-wrap gap-2">
                  {role.key_attributes?.split(',').map((attr, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {attr.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {role.ideal_player_traits && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">İdeal Oyuncu Özellikleri:</p>
                  <p className="text-gray-600 text-sm">{role.ideal_player_traits}</p>
                </div>
              )}

              {role.height_requirement && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Fiziksel Profil:</p>
                  <p className="text-gray-600 text-sm">
                    Boy: {role.height_requirement} • Yaş: {role.age_profile}
                    {role.preferred_foot && role.preferred_foot !== 'either' && ` • Tercih Edilen Ayak: ${role.preferred_foot === 'right' ? 'Sağ' : 'Sol'}`}
                  </p>
                </div>
              )}

              {(role.vision_importance > 7 || role.decision_importance > 7 || role.concentration_importance > 7) && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Zihinsel Özellikler:</p>
                  <div className="flex flex-wrap gap-2">
                    {role.vision_importance > 7 && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        Vizyon ({role.vision_importance}/10)
                      </span>
                    )}
                    {role.decision_importance > 7 && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        Karar Verme ({role.decision_importance}/10)
                      </span>
                    )}
                    {role.concentration_importance > 7 && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        Konsantrasyon ({role.concentration_importance}/10)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Taktiksel Sorumluluklar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">⚡ Taktiksel Sorumluluklar</h2>
            <div className="space-y-4">
              {role.attacking_duties && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-green-800 mb-2">Hücum Görevleri:</p>
                  {(() => {
                    try {
                      const duties = JSON.parse(role.attacking_duties);
                      return (
                        <ul className="text-sm text-gray-700 space-y-1">
                          {duties.map((duty, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    } catch {
                      return <p className="text-sm text-gray-700">{role.attacking_duties}</p>;
                    }
                  })()}
                </div>
              )}

              {role.defensive_duties && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Savunma Görevleri:</p>
                  {(() => {
                    try {
                      const duties = JSON.parse(role.defensive_duties);
                      return (
                        <ul className="text-sm text-gray-700 space-y-1">
                          {duties.map((duty, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    } catch {
                      return <p className="text-sm text-gray-700">{role.defensive_duties}</p>;
                    }
                  })()}
                </div>
              )}

              {role.transition_role && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-purple-800 mb-2">Geçiş Görevleri:</p>
                  <p className="text-sm text-gray-700">{role.transition_role}</p>
                </div>
              )}

              {role.in_possession_role && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800 mb-2">Toplu Oyun:</p>
                  <p className="text-sm text-gray-700">{role.in_possession_role}</p>
                </div>
              )}

              {role.out_of_possession_role && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Topsuz Oyun:</p>
                  <p className="text-sm text-gray-700">{role.out_of_possession_role}</p>
                </div>
              )}
            </div>
          </div>

          {/* Oyuncu Örnekleri */}
          {role.example_players && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🌟 Örnek Oyuncular</h2>
              <p className="text-gray-700 italic">{role.example_players}</p>
            </div>
          )}

          {/* Rol Sinerjileri */}
          {synergies.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🔗 Rol Sinerjileri</h2>
              <div className="space-y-3">
                {synergies.slice(0, 5).map((synergy) => (
                  <div key={synergy.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800">
                        {synergy.role_1_name} ↔ {synergy.role_2_name}
                      </p>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {synergy.synergy_score}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{synergy.synergy_description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Taktik Ortaklıklar */}
          {partnerships.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🤝 Taktik Ortaklıklar</h2>
              <div className="space-y-3">
                {partnerships.slice(0, 5).map((partnership) => (
                  <div key={partnership.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-semibold text-gray-800 mb-1">
                      {partnership.partnership_name}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {partnership.role_1_name} • {partnership.role_2_name}
                      {partnership.role_3_name && ` • ${partnership.role_3_name}`}
                    </p>
                    <p className="text-sm text-gray-600">{partnership.partnership_description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sağ Kolon - İdeal Profil ve İstatistikler */}
        <div className="space-y-6">
          {/* İdeal Profil */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📊 İdeal Profil</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Boy Aralığı</p>
                <p className="text-2xl font-bold text-green-600">{role.ideal_height_range || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Yaş Aralığı</p>
                <p className="text-2xl font-bold text-blue-600">{role.ideal_age_range || 'Belirtilmemiş'}</p>
              </div>
              {role.ideal_foot && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Tercih Edilen Ayak</p>
                  <p className="text-lg font-semibold text-gray-800">{role.ideal_foot}</p>
                </div>
              )}
            </div>
          </div>

          {/* Uygun Sistemler */}
          {role.suitable_systems && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">🎯 Uygun Sistemler</h2>
              <div className="flex flex-wrap gap-2">
                {role.suitable_systems.split(',').map((system, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm">
                    {system.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Güçlü ve Zayıf Yönler */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">⚖️ Analiz</h2>
            {role.strengths && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-green-700 mb-2">✅ Güçlü Yönler:</p>
                <p className="text-sm text-gray-700">{role.strengths}</p>
              </div>
            )}
            {role.weaknesses && (
              <div>
                <p className="text-sm font-semibold text-red-700 mb-2">❌ Zayıf Yönler:</p>
                <p className="text-sm text-gray-700">{role.weaknesses}</p>
              </div>
            )}
          </div>

          {/* Gelişim Tavsiyeleri */}
          {role.training_focus && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800">💡 Antrenman Odağı</h2>
              <p className="text-sm text-gray-700">{role.training_focus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;
