import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

/**
 * Pie Chart Komponenti
 *
 * Kullanım:
 * <PieChart
 *   data={[
 *     { name: 'Galibiyet', value: 15 },
 *     { name: 'Beraberlik', value: 8 },
 *     { name: 'Mağlubiyet', value: 5 }
 *   ]}
 * />
 */
const PieChart = ({
  data = [],
  colors = ['#22c55e', '#fbbf24', '#ef4444', '#3b82f6', '#8b5cf6'],
  showLabels = true
}) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 p-4">Veri yok</div>;
  }

  const renderLabel = (entry) => {
    if (!showLabels) return null;
    return `${entry.name}: ${entry.value}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={showLabels}
          label={showLabels ? renderLabel : false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
