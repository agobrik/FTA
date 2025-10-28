import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Performans trend grafiği
 *
 * Kullanım:
 * <PerformanceTrendChart
 *   data={[
 *     { match: 'Maç 1', rating: 7.5, goals: 1, assists: 0 },
 *     { match: 'Maç 2', rating: 8.2, goals: 2, assists: 1 },
 *     { match: 'Maç 3', rating: 6.8, goals: 0, assists: 1 }
 *   ]}
 * />
 */
const PerformanceTrendChart = ({ data = [], metrics = ['rating', 'goals', 'assists'] }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 p-4">Veri yok</div>;
  }

  const colors = {
    rating: '#8884d8',
    goals: '#82ca9d',
    assists: '#ffc658',
    yellow_cards: '#ffbb28',
    red_cards: '#ff7c7c'
  };

  const labels = {
    rating: 'Rating',
    goals: 'Gol',
    assists: 'Asist',
    yellow_cards: 'Sarı Kart',
    red_cards: 'Kırmızı Kart'
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="match"
          tick={{ fill: '#666', fontSize: 12 }}
        />
        <YAxis
          tick={{ fill: '#666', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px'
          }}
        />
        <Legend />

        {metrics.map(metric => (
          <Line
            key={metric}
            type="monotone"
            dataKey={metric}
            name={labels[metric] || metric}
            stroke={colors[metric] || '#8884d8'}
            strokeWidth={2}
            dot={{ fill: colors[metric] || '#8884d8', r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceTrendChart;
