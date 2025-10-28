import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Bar Chart Komponenti
 *
 * Kullanım:
 * <BarChart
 *   data={[
 *     { name: 'Ocak', goller: 12, asistler: 8 },
 *     { name: 'Şubat', goller: 15, asistler: 10 }
 *   ]}
 *   dataKeys={['goller', 'asistler']}
 * />
 */
const BarChart = ({ data = [], dataKeys = [], colors = ['#8884d8', '#82ca9d', '#ffc658'] }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 p-4">Veri yok</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
        <YAxis tick={{ fill: '#666', fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Legend />

        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[index % colors.length]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
