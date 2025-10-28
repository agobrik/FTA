import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

/**
 * Oyuncu karşılaştırma için Radar Chart
 *
 * Kullanım:
 * <PlayerRadarChart
 *   players={[
 *     { name: 'Oyuncu 1', data: { shooting: 85, passing: 90, pace: 75, defending: 60, physicality: 80 } },
 *     { name: 'Oyuncu 2', data: { shooting: 78, passing: 82, pace: 88, defending: 70, physicality: 72 } }
 *   ]}
 * />
 */
const PlayerRadarChart = ({ players = [] }) => {
  if (!players || players.length === 0) {
    return <div className="text-center text-gray-500 p-4">Veri yok</div>;
  }

  // Transform data for recharts
  const attributes = ['shooting', 'passing', 'pace', 'defending', 'physicality', 'dribbling'];
  const attributeLabels = {
    shooting: 'Şut',
    passing: 'Pas',
    pace: 'Hız',
    defending: 'Savunma',
    physicality: 'Fizik',
    dribbling: 'Dribling'
  };

  const chartData = attributes.map(attr => {
    const dataPoint = {
      attribute: attributeLabels[attr] || attr,
      fullMark: 100
    };

    players.forEach((player, index) => {
      dataPoint[`player${index}`] = player.data[attr] || 0;
    });

    return dataPoint;
  });

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="#e0e0e0" />
        <PolarAngleAxis
          dataKey="attribute"
          tick={{ fill: '#666', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: '#666', fontSize: 10 }}
        />

        {players.map((player, index) => (
          <Radar
            key={`player${index}`}
            name={player.name}
            dataKey={`player${index}`}
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            fillOpacity={0.3}
          />
        ))}

        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px'
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: '20px'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PlayerRadarChart;
