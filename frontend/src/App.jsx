import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import PlayerDetail from './pages/PlayerDetail';
import Matches from './pages/Matches';
import MatchDetail from './pages/MatchDetail';
import Tactics from './pages/Tactics';
import TacticDetail from './pages/TacticDetail';
import Opponents from './pages/Opponents';
import OpponentDetail from './pages/OpponentDetail';
import Training from './pages/Training';
import TrainingDetail from './pages/TrainingDetail';
import TacticalAnalysis from './pages/TacticalAnalysis';
import TacticalConcepts from './pages/TacticalConcepts';
import TacticalTrends from './pages/TacticalTrends';
import RoleSynergies from './pages/RoleSynergies';
import Partnerships from './pages/Partnerships';
import SystemDetail from './pages/SystemDetail';
import RoleDetail from './pages/RoleDetail';

function App() {
  return (
    <Router>
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:id" element={<MatchDetail />} />
          <Route path="/tactics" element={<Tactics />} />
          <Route path="/tactics/:id" element={<TacticDetail />} />
          <Route path="/opponents" element={<Opponents />} />
          <Route path="/opponents/:id" element={<OpponentDetail />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:id" element={<TrainingDetail />} />
          <Route path="/tactical-analysis/:id" element={<SystemDetail />} />
          <Route path="/tactical-analysis/role/:id" element={<RoleDetail />} />
          <Route path="/tactical-analysis" element={<TacticalAnalysis />} />
          <Route path="/tactical-concepts" element={<TacticalConcepts />} />
          <Route path="/tactical-trends" element={<TacticalTrends />} />
          <Route path="/role-synergies" element={<RoleSynergies />} />
          <Route path="/partnerships" element={<Partnerships />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
