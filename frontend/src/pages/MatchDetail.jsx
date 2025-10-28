import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { matchesAPI } from '../services/api';

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatchData();
  }, [id]);

  const loadMatchData = async () => {
    try {
      const [matchRes, perfRes, playersRes] = await Promise.all([
        matchesAPI.getById(id),
        matchesAPI.getPerformance(id),
        matchesAPI.getPlayers(id)
      ]);
      setMatch(matchRes.data.data);
      setPerformance(perfRes.data.data);
      setPlayers(playersRes.data.data);
    } catch (error) {
      console.error('Maç verileri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu maçı silmek istediğinizden emin misiniz?')) {
      try {
        await matchesAPI.delete(id);
        navigate('/matches');
      } catch (error) {
        console.error('Maç silinemedi:', error);
        alert('Silme sırasında bir hata oluştu');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  if (!match) {
    return <div className="text-center py-12">
      <p className="text-xl text-gray-600">Maç bulunamadı</p>
      <Link to="/matches" className="text-green-600 hover:underline mt-4 inline-block">
        Maçlara dön
      </Link>
    </div>;
  }

  const getResultColor = (result) => {
    const colors = {
      'Galibiyet': 'bg-green-100 text-green-800',
      'Beraberlik': 'bg-yellow-100 text-yellow-800',
      'Mağlubiyet': 'bg-red-100 text-red-800'
    };
    return colors[result] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/matches" className="text-green-600 hover:text-green-700 flex items-center">
          ← Geri
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sil
        </button>
      </div>

      {/* Match Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{match.opponent}</h1>
            <p className="text-gray-600">
              📅 {new Date(match.match_date).toLocaleDateString('tr-TR', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
            {match.location && <p className="text-gray-600 mt-1">📍 {match.location}</p>}
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800 mb-2">
              {match.score_home} - {match.score_away}
            </div>
            <span className={`px-4 py-2 rounded-lg text-lg font-semibold ${getResultColor(match.result)}`}>
              {match.result}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div>
            <p className="text-sm text-gray-500">Saha</p>
            <p className="text-lg font-semibold">{match.home_away}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Formasyon</p>
            <p className="text-lg font-semibold">{match.formation}</p>
          </div>
        </div>
        {match.notes && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Notlar:</p>
            <p className="text-gray-600">{match.notes}</p>
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      {performance && Object.keys(performance).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Maç Performansı</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatBox label="Top Hakimiyeti" value={`%${performance.possession || 0}`} />
            <StatBox label="Şut" value={performance.shots || 0} />
            <StatBox label="İsabetli Şut" value={performance.shots_on_target || 0} />
            <StatBox label="Korner" value={performance.corners || 0} />
            <StatBox label="Faul" value={performance.fouls || 0} />
            <StatBox label="Ofsayt" value={performance.offsides || 0} />
            <StatBox label="Pas" value={performance.passes || 0} />
            <StatBox label="Pas İsabeti" value={`%${performance.pass_accuracy || 0}`} />
            <StatBox label="Top Kesme" value={performance.tackles || 0} />
            <StatBox label="Kurtarış" value={performance.saves || 0} />
          </div>
        </div>
      )}

      {/* Player Performances */}
      {players.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Oyuncu Performansları</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Oyuncu</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Pozisyon</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Dakika</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Gol</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Asist</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Sarı</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Kırmızı</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {players.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">
                      {player.name} #{player.jersey_number}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">{player.position}</td>
                    <td className="px-4 py-3 text-sm text-center">{player.minutes_played}'</td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-green-600">{player.goals}</td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-blue-600">{player.assists}</td>
                    <td className="px-4 py-3 text-sm text-center">{player.yellow_card ? '🟨' : '-'}</td>
                    <td className="px-4 py-3 text-sm text-center">{player.red_card ? '🟥' : '-'}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className="font-semibold text-purple-600">{player.rating || '-'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 text-center">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default MatchDetail;
