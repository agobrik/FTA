import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tacticalAnalysisAPI } from '../services/api';

const Dashboard = () => {
  const [systems, setSystems] = useState([]);
  const [roles, setRoles] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [trends, setTrends] = useState([]);
  const [synergies, setSynergies] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTacticalData();
  }, []);

  const loadTacticalData = async () => {
    try {
      const [systemsRes, rolesRes, conceptsRes, trendsRes, synergiesRes, partnershipsRes] = await Promise.all([
        tacticalAnalysisAPI.getAllSystems(),
        tacticalAnalysisAPI.getAllRoles(),
        tacticalAnalysisAPI.getConcepts(),
        tacticalAnalysisAPI.getTrends(),
        tacticalAnalysisAPI.getSynergies(),
        tacticalAnalysisAPI.getPartnerships()
      ]);

      setSystems(systemsRes.data.data || []);
      setRoles(rolesRes.data.data || []);
      setConcepts(conceptsRes.data.data || []);
      setTrends(trendsRes.data.data || []);
      setSynergies(synergiesRes.data.data || []);
      setPartnerships(partnershipsRes.data.data || []);
    } catch (error) {
      console.error('Taktik verileri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  // İstatistikler
  const topSynergies = synergies.sort((a, b) => b.synergy_score - a.synergy_score).slice(0, 5);
  const latestTrends = trends.sort((a, b) => b.prevalence - a.prevalence).slice(0, 5);
  const topConcepts = concepts.sort((a, b) => b.importance - a.importance).slice(0, 6);
  const featuredSystems = systems.slice(0, 4);
  const rolesByPosition = roles.reduce((acc, role) => {
    acc[role.position] = (acc[role.position] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">⚽ Futbol Taktik Analiz Ultra</h1>
        <p className="text-green-100 text-lg">
          Modern futbolun en kapsamlı taktik analiz platformu - 436+ profesyonel taktik verisi
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-3xl font-bold">{systems.length}</p>
            <p className="text-sm text-green-100">Taktik Sistem</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-3xl font-bold">{roles.length}</p>
            <p className="text-sm text-green-100">Oyuncu Rolü</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-3xl font-bold">{concepts.length}</p>
            <p className="text-sm text-green-100">Taktik Konsept</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-3xl font-bold">{synergies.length}</p>
            <p className="text-sm text-green-100">Rol Sinerjisi</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/tactical-analysis" className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎓</div>
          <h3 className="text-lg font-bold text-gray-800">Taktik Analiz</h3>
          <p className="text-sm text-gray-600 mt-1">Sistemler & Roller</p>
        </Link>
        <Link to="/tactical-concepts" className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💡</div>
          <h3 className="text-lg font-bold text-gray-800">Konseptler</h3>
          <p className="text-sm text-gray-600 mt-1">{concepts.length} Taktik Kavram</p>
        </Link>
        <Link to="/tactical-trends" className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📈</div>
          <h3 className="text-lg font-bold text-gray-800">Trendler</h3>
          <p className="text-sm text-gray-600 mt-1">2015-2025</p>
        </Link>
        <Link to="/role-synergies" className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🤝</div>
          <h3 className="text-lg font-bold text-gray-800">Sinerjiler</h3>
          <p className="text-sm text-gray-600 mt-1">{synergies.length} Analiz</p>
        </Link>
      </div>

      {/* Öne Çıkan Sistemler */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">🎯 Öne Çıkan Taktik Sistemler</h3>
          <Link to="/tactical-analysis" className="text-green-600 hover:text-green-700 text-sm font-medium">
            Tümünü Gör ({systems.length}) →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredSystems.map((system) => (
            <Link
              key={system.id}
              to={`/tactical-analysis/${system.id}`}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow hover:border-green-500"
            >
              <div className="mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                  {system.formation}
                </span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{system.name}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{system.philosophy}</p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {system.system_type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Oyuncu Rolleri Dağılımı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">📊 Oyuncu Rolleri Dağılımı</h3>
            <Link to="/tactical-analysis" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Detaylar →
            </Link>
          </div>
          <div className="space-y-3">
            {Object.entries(rolesByPosition).map(([position, count]) => {
              const positionNames = {
                'GK': 'Kaleci',
                'DF': 'Defans',
                'MF': 'Orta Saha',
                'FW': 'Forvet'
              };
              const colors = {
                'GK': 'bg-yellow-500',
                'DF': 'bg-blue-500',
                'MF': 'bg-green-500',
                'FW': 'bg-red-500'
              };
              const percentage = ((count / roles.length) * 100).toFixed(1);

              return (
                <div key={position}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-700">
                      {positionNames[position] || position}
                    </span>
                    <span className="text-sm text-gray-600">{count} rol (%{percentage})</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${colors[position]} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* En Yüksek Sinerji Skorları */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">🔥 En Yüksek Sinerji Skorları</h3>
            <Link to="/role-synergies" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Tümünü Gör →
            </Link>
          </div>
          <div className="space-y-3">
            {topSynergies.map((synergy, index) => (
              <div key={synergy.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-purple-600">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {synergy.role_1_name} + {synergy.role_2_name}
                    </p>
                    <p className="text-xs text-gray-600">{synergy.synergy_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{synergy.synergy_score >= 9 ? '🔥' : synergy.synergy_score >= 7 ? '⭐' : '✓'}</span>
                  <span className="font-bold text-lg text-purple-700">{synergy.synergy_score}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* En Önemli Taktik Konseptler */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">💡 Temel Taktik Konseptler</h3>
          <Link to="/tactical-concepts" className="text-green-600 hover:text-green-700 text-sm font-medium">
            Tümünü Gör ({concepts.length}) →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topConcepts.map((concept) => (
            <div key={concept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-800 flex-1">{concept.concept_name}</h4>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">
                  {concept.importance}/10
                </span>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                {concept.category}
              </span>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{concept.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Son Taktik Trendler */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">📈 En Yaygın Taktik Trendler</h3>
          <Link to="/tactical-trends" className="text-green-600 hover:text-green-700 text-sm font-medium">
            Tümünü Gör ({trends.length}) →
          </Link>
        </div>
        <div className="space-y-3">
          {latestTrends.map((trend, index) => {
            const getPrevalenceColor = (prevalence) => {
              if (prevalence >= 9) return 'bg-red-100 text-red-800 border-red-300';
              if (prevalence >= 7) return 'bg-orange-100 text-orange-800 border-orange-300';
              if (prevalence >= 5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
              return 'bg-green-100 text-green-800 border-green-300';
            };

            return (
              <div key={trend.id} className="bg-white p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-lg text-gray-400">#{index + 1}</span>
                      <h4 className="font-bold text-gray-800">{trend.trend_name}</h4>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                        {trend.season}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {trend.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getPrevalenceColor(trend.prevalence)}`}>
                      Yaygınlık {trend.prevalence}/10
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Taktik Ortaklıklar Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">👥 Taktik Ortaklıklar</h3>
          <Link to="/partnerships" className="text-green-600 hover:text-green-700 text-sm font-medium">
            Tümünü Gör ({partnerships.length}) →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
            <div className="text-3xl mb-2">⚽</div>
            <p className="text-2xl font-bold text-orange-700">{partnerships.length}</p>
            <p className="text-sm text-gray-600">Toplam Ortaklık</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-blue-700">
              {partnerships.filter(p => !p.role_3_id).length}
            </p>
            <p className="text-sm text-gray-600">İkili Ortaklık</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <div className="text-3xl mb-2">🔺</div>
            <p className="text-2xl font-bold text-purple-700">
              {partnerships.filter(p => p.role_3_id).length}
            </p>
            <p className="text-sm text-gray-600">Üçlü Ortaklık</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-lg mb-2">🎯 Platform Özellikleri</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ 14 Profesyonel Taktik Sistem</li>
              <li>✓ 71 Detaylı Oyuncu Rolü</li>
              <li>✓ 42 Karşı Taktik Stratejisi</li>
              <li>✓ 31 Taktik Konsept Analizi</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">📊 Analiz Derinliği</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ {synergies.length} Rol Sinerji Analizi</li>
              <li>✓ {partnerships.length} Taktik Ortaklık</li>
              <li>✓ {trends.length} Taktik Trend (2015-2025)</li>
              <li>✓ Pressing, Possession, Transition Taktikleri</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">🚀 Gelişmiş Özellikler</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ Sistem Zayıflık Analizi</li>
              <li>✓ Formasyon Geçiş Stratejileri</li>
              <li>✓ Gerçek Dünya Örnekleri</li>
              <li>✓ Pressing Bölgesi Haritaları</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
