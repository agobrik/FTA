import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Oyuncular', path: '/players', icon: '👤' },
    { name: 'Maçlar', path: '/matches', icon: '⚽' },
    { name: 'Taktikler', path: '/tactics', icon: '📋' },
    { name: 'Taktik Analiz', path: '/tactical-analysis', icon: '🎓' },
    { name: 'Taktik Konseptler', path: '/tactical-concepts', icon: '💡' },
    { name: 'Taktik Trendler', path: '/tactical-trends', icon: '📈' },
    { name: 'Rol Sinerjileri', path: '/role-synergies', icon: '🤝' },
    { name: 'Ortaklıklar', path: '/partnerships', icon: '👥' },
    { name: 'Rakipler', path: '/opponents', icon: '🎯' },
    { name: 'Antrenmanlar', path: '/training', icon: '💪' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold">⚽ Futbol Taktik</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded hover:bg-green-700"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-green-600 text-white'
                  : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {isSidebarOpen && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-green-700">
          {isSidebarOpen && (
            <div className="text-sm text-green-200">
              <p>Futbol Koçluk Sistemi</p>
              <p className="text-xs mt-1">v1.0.0</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {navigation.find(item => isActive(item.path))?.name || 'Dashboard'}
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
