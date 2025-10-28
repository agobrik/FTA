import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { opponentsAPI } from '../services/api';

const OpponentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOpponentData();
  }, [id]);

  const loadOpponentData = async () => {
    try {
      const [opponentRes, matchesRes] = await Promise.all([
        opponentsAPI.getById(id),
        opponentsAPI.getMatches(id)
      ]);
      setOpponent(opponentRes.data.data);
      setMatches(matchesRes.data.data);
    } catch (error) {
      console.error('Rakip verileri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu rakibi silmek istediğinizden emin misiniz?')) {
      try {
        await opponentsAPI.delete(id);
        navigate('/opponents');
      } catch (error) {
        console.error('Rakip silinemedi:', error);
        alert('Silme sırasında bir hata oluştu');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-xl text-gray-600">Yükleniyor...</div>
    </div>;
  }

  if (!opponent) {
    return <div className="text-center py-12">
      <p className="text-xl text-gray-600">Rakip bulunamadı</p>
      <Link to="/opponents" className="text-green-600 hover:underline mt-4 inline-block">
        Rakiplere dön
      </Link>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/opponents" className="text-green-600 hover:text-green-700 flex items-center">
          ← Geri
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sil
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-2">{opponent.name}</h1>
        {opponent.league && (
          <p className="text-xl text-gray-600 mb-6">🏆 {opponent.league}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Takım Bilgileri</h3>
            <div className="space-y-2">
              <InfoRow label="Tipik Formasyon" value={opponent.typical_formation} />
              <InfoRow label="Oyun Stili" value={opponent.playing_style} />
            </div>
          </div>

          {opponent.key_players && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Anahtar Oyuncular</h3>
              <p className="text-gray-700">{opponent.key_players}</p>
            </div>
          )}
        </div>

        {opponent.strengths && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Güçlü Yönler</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-700">{opponent.strengths}</p>
            </div>
          </div>
        )}

        {opponent.weaknesses && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-red-700">Zayıf Yönler</h3>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-700">{opponent.weaknesses}</p>
            </div>
          </div>
        )}

        {opponent.notes && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Notlar</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{opponent.notes}</p>
            </div>
          </div>
        )}
      </div>

      {matches.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Maç Geçmişi</h2>
          <div className="space-y-3">
            {matches.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{new Date(match.match_date).toLocaleDateString('tr-TR')}</p>
                  <p className="text-sm text-gray-500">{match.location || match.home_away}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{match.score_home} - {match.score_away}</p>
                  <span className={`text-sm px-3 py-1 rounded ${
                    match.result === 'Galibiyet' ? 'bg-green-100 text-green-800' :
                    match.result === 'Beraberlik' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {match.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold">{value || '-'}</span>
  </div>
);

export default OpponentDetail;
