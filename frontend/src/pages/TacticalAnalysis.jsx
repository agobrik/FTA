import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tacticalAnalysisAPI } from '../services/api';

const TacticalAnalysis = () => {
  const [systems, setSystems] = useState([]);
  const [roles, setRoles] = useState([]);
  const [counterTactics, setCounterTactics] = useState([]);
  const [activeTab, setActiveTab] = useState('systems');
  const [loading, setLoading] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState(null);

  // Filtreleme state'leri - Taktik Sistemler
  const [formationCategories, setFormationCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);

  // Filtreleme state'leri - Oyuncu Rolleri
  const [roleCategories, setRoleCategories] = useState([]);
  const [selectedRoleCategory, setSelectedRoleCategory] = useState(null);
  const [roleTypes, setRoleTypes] = useState([]);
  const [selectedRoleType, setSelectedRoleType] = useState(null);

  useEffect(() => {
    loadData();
    loadFilterData();
  }, []);

  const loadData = async () => {
    try {
      // İlk yüklemede sadece counter tactics yükle
      // Sistemler ve roller filtreleme yapıldığında yüklenecek
      const counterRes = await tacticalAnalysisAPI.getAllCounterTactics();
      setCounterTactics(counterRes.data.data);
    } catch (error) {
      console.error('Veri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFilterData = async () => {
    try {
      const [formationsRes, rolesRes] = await Promise.all([
        tacticalAnalysisAPI.getFormationCategories(),
        tacticalAnalysisAPI.getRoleCategories()
      ]);
      setFormationCategories(formationsRes.data.data);
      setRoleCategories(rolesRes.data.data);
    } catch (error) {
      console.error('Filtre verileri yüklenemedi:', error);
    }
  };

  // Taktik Sistemler - Kategori seçildiğinde
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedFormation(null);
    setSystems([]); // Sistemleri temizle
  };

  // Taktik Sistemler - Formasyon seçildiğinde
  const handleFormationSelect = async (formation) => {
    setSelectedFormation(formation);
    setLoading(true);
    try {
      const res = await tacticalAnalysisAPI.getSystemsByFormation(formation);
      setSystems(res.data.data);
    } catch (error) {
      console.error('Sistemler yüklenemedi:', error);
      setSystems([]);
    } finally {
      setLoading(false);
    }
  };

  // Taktik Sistemler - Filtreyi sıfırla
  const resetSystemsFilter = async () => {
    setSelectedCategory(null);
    setSelectedFormation(null);
    setLoading(true);
    try {
      const res = await tacticalAnalysisAPI.getAllSystems();
      setSystems(res.data.data);
    } catch (error) {
      console.error('Sistemler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  // Oyuncu Rolleri - Pozisyon kategorisi seçildiğinde
  const handleRoleCategorySelect = async (category) => {
    setSelectedRoleCategory(category);
    setSelectedRoleType(null);
    setRoles([]); // Rolleri temizle

    // Role type'ları yükle
    try {
      const res = await tacticalAnalysisAPI.getRoleTypesByPosition(category.id);
      setRoleTypes(res.data.data);
    } catch (error) {
      console.error('Role type\'lar yüklenemedi:', error);
      setRoleTypes([]);
    }
  };

  // Oyuncu Rolleri - Role type seçildiğinde
  const handleRoleTypeSelect = async (roleType) => {
    setSelectedRoleType(roleType);
    setLoading(true);
    try {
      const res = await tacticalAnalysisAPI.getRolesByFilter(selectedRoleCategory.id, roleType);
      setRoles(res.data.data);
    } catch (error) {
      console.error('Roller yüklenemedi:', error);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  // Oyuncu Rolleri - Filtreyi sıfırla
  const resetRolesFilter = async () => {
    setSelectedRoleCategory(null);
    setSelectedRoleType(null);
    setRoleTypes([]);
    setLoading(true);
    try {
      const res = await tacticalAnalysisAPI.getAllRoles();
      setRoles(res.data.data);
    } catch (error) {
      console.error('Roller yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSystemTypeColor = (type) => {
    const colors = {
      'Top Hakimiyeti': 'bg-blue-100 text-blue-800',
      'Yüksek Yoğunluk': 'bg-red-100 text-red-800',
      'Kompakt Savunma': 'bg-green-100 text-green-800',
      'Pozisyonel Oyun': 'bg-purple-100 text-purple-800',
      'Hibrit (Savunma/Hücum)': 'bg-yellow-100 text-yellow-800',
      'Dengeli Sistem': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getPressingColor = (intensity) => {
    const colors = {
      'Maksimum': 'text-red-600',
      'Çok Yüksek': 'text-orange-600',
      'Yüksek': 'text-yellow-600',
      'Yüksek-Orta': 'text-yellow-500',
      'Orta': 'text-blue-600',
      'Orta (Seçici)': 'text-blue-500',
      'Düşük': 'text-green-600'
    };
    return colors[intensity] || 'text-gray-600';
  };

  if (loading && systems.length === 0 && roles.length === 0) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">Profesyonel Taktik Analiz Merkezi</h1>
        <p className="text-gray-600">Detaylı taktik sistemler, oyuncu rolleri ve anti-taktik stratejileri</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-white rounded-lg shadow p-2">
        <button
          onClick={() => setActiveTab('systems')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'systems'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Taktik Sistemler ({systems.length})
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'roles'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Oyuncu Rolleri ({roles.length})
        </button>
        <button
          onClick={() => setActiveTab('counter')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'counter'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Anti-Taktikler ({counterTactics.length})
        </button>
      </div>

      {/* Taktik Sistemler */}
      {activeTab === 'systems' && (
        <div className="space-y-6">
          {/* Filtreleme Paneli */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">🔍 Filtreleme</h2>
              {(selectedCategory || selectedFormation) && (
                <button
                  onClick={resetSystemsFilter}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                >
                  ✕ Filtreyi Sıfırla
                </button>
              )}
            </div>

            {/* 1. Adım: Savunma Hattı Seçimi */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">1️⃣ Savunma Hattı Sayısını Seçin:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {formationCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategory?.id === category.id
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-1">{category.name.split("'")[0]}</div>
                    <div className="text-xs text-gray-600">{category.formations.length} formasyon</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Adım: Formasyon Seçimi */}
            {selectedCategory && (
              <div className="mb-4 animate-fadeIn">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">2️⃣ Formasyon Seçin:</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {selectedCategory.formations.map((formation) => (
                    <button
                      key={formation}
                      onClick={() => handleFormationSelect(formation)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        selectedFormation === formation
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      {formation}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Seçili Filtre Özeti */}
            {selectedFormation && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Filtre Aktif:</span> {selectedCategory.name} → {selectedFormation} formatı
                  <span className="ml-2 font-bold">({systems.length} sistem bulundu)</span>
                </p>
              </div>
            )}
          </div>

          {/* Sistemler Listesi */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Sistemler yükleniyor...</div>
            </div>
          ) : systems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                {selectedFormation
                  ? `${selectedFormation} formasyonu için sistem bulunamadı.`
                  : 'Lütfen yukarıdan savunma hattı ve formasyon seçiniz.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systems.map((system) => (
                <div key={system.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{system.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            {system.formation}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSystemTypeColor(system.system_type)}`}>
                            {system.system_type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedSystem(system.id === selectedSystem ? null : system.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        {selectedSystem === system.id ? 'Kapat' : 'Detay'}
                      </button>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Felsefe:</p>
                      <p className="text-gray-600 text-sm">{system.philosophy}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Pressing Yoğunluğu</p>
                        <p className={`font-semibold ${getPressingColor(system.pressing_intensity)}`}>
                          {system.pressing_intensity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tempo</p>
                        <p className="font-semibold text-gray-800">{system.tempo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Pas Stili</p>
                        <p className="font-semibold text-gray-800">{system.passing_style}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Mentalite</p>
                        <p className="font-semibold text-gray-800">{system.team_mentality}</p>
                      </div>
                    </div>

                    {selectedSystem === system.id && (
                      <div className="mt-6 pt-6 border-t space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">⚡ Hücum Fazı:</p>
                          <p className="text-sm text-gray-600 bg-green-50 p-3 rounded">{system.attacking_phase}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">🛡️ Savunma Fazı:</p>
                          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">{system.defensive_phase}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">🔄 Hücum Geçişi:</p>
                          <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">{system.transition_attack}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">🔙 Savunma Geçişi:</p>
                          <p className="text-sm text-gray-600 bg-red-50 p-3 rounded">{system.transition_defense}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Build-up:</p>
                            <p className="text-sm text-gray-700">{system.build_up_play}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Şans Yaratma:</p>
                            <p className="text-sm text-gray-700">{system.chance_creation}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Savunma Çizgisi:</p>
                            <p className="text-sm text-gray-700">{system.defensive_line_height}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Hücumda Genişlik:</p>
                            <p className="text-sm text-gray-700">{system.width_in_attack}</p>
                          </div>
                        </div>
                        <Link
                          to={`/tactical-analysis/${system.id}`}
                          className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center font-semibold mt-4"
                        >
                          Tam Analiz ve Anti-Taktik →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Oyuncu Rolleri */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {/* Filtreleme Paneli */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">🔍 Filtreleme</h2>
              {(selectedRoleCategory || selectedRoleType) && (
                <button
                  onClick={resetRolesFilter}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                >
                  ✕ Filtreyi Sıfırla
                </button>
              )}
            </div>

            {/* 1. Adım: Pozisyon Kategorisi Seçimi */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">1️⃣ Pozisyon Kategorisi Seçin:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleRoleCategorySelect(category)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedRoleCategory?.id === category.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <div className="text-lg font-bold text-gray-800">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Adım: Rol Tipi Seçimi */}
            {selectedRoleCategory && roleTypes.length > 0 && (
              <div className="mb-4 animate-fadeIn">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">2️⃣ Rol Tipi Seçin:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {roleTypes.map((type) => (
                    <button
                      key={type.role_type}
                      onClick={() => handleRoleTypeSelect(type.role_type)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all text-sm ${
                        selectedRoleType === type.role_type
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      {type.role_type} ({type.count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Seçili Filtre Özeti */}
            {selectedRoleType && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Filtre Aktif:</span> {selectedRoleCategory.name} → {selectedRoleType}
                  <span className="ml-2 font-bold">({roles.length} rol bulundu)</span>
                </p>
              </div>
            )}
          </div>

          {/* Roller Listesi */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Roller yükleniyor...</div>
            </div>
          ) : roles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                {selectedRoleType
                  ? `${selectedRoleCategory.name} → ${selectedRoleType} için rol bulunamadı.`
                  : 'Lütfen yukarıdan pozisyon kategorisi ve rol tipi seçiniz.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{role.role_name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {role.position}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {role.role_type}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">Temel Özellikler:</p>
                        <p className="text-gray-600 text-xs">{role.key_attributes}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">İdeal Profil:</p>
                        <p className="text-gray-600 text-xs">Boy: {role.ideal_height_range} | Yaş: {role.ideal_age_range}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Örnek Oyuncular:</p>
                        <p className="text-gray-600 text-xs italic">{role.example_players}</p>
                      </div>
                    </div>

                    <Link
                      to={`/tactical-analysis/role/${role.id}`}
                      className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center text-sm font-semibold mt-4"
                    >
                      Detaylı Profil →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Anti-Taktikler */}
      {activeTab === 'counter' && (
        <div className="space-y-6">
          {counterTactics.map((counter) => (
            <div key={counter.id} className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-red-600 mb-1">
                      🎯 Hedef: {counter.target_system_name}
                    </h3>
                    <p className="text-gray-600">{counter.target_formation}</p>
                  </div>
                  {counter.counter_system_name && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Önerilen Sistem:</p>
                      <p className="text-lg font-bold text-green-600">{counter.counter_system_name}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-red-700 mb-2">❌ Zayıf Noktalar:</p>
                      <p className="text-sm text-gray-700 bg-red-50 p-3 rounded">{counter.key_weaknesses}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-2">✅ Uygulama Yöntemleri:</p>
                      <p className="text-sm text-gray-700 bg-green-50 p-3 rounded">{counter.exploitation_methods}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-blue-700 mb-2">📋 Önerilen Formasyon:</p>
                      <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded">{counter.recommended_formation}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-700 mb-2">👥 Önerilen Roller:</p>
                      <p className="text-sm text-gray-700 bg-purple-50 p-3 rounded">{counter.recommended_roles}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Baskı Bölgeleri:</p>
                    <p className="text-sm text-gray-600">{counter.pressing_zones}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Geçiş Odağı:</p>
                    <p className="text-sm text-gray-600">{counter.transition_focus}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Duran Top:</p>
                    <p className="text-sm text-gray-600">{counter.set_piece_strategy}</p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-2">📝 Oyuncu Talimatları:</p>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">{counter.player_instructions}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TacticalAnalysis;
