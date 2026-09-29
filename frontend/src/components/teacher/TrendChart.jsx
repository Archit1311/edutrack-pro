import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function TrendChart({ data }) {
  // Fallback demo data if not provided
  const chartData = data || [
    { week: 'W1', cs: 94, me: 89, ee: 85 },
    { week: 'W2', cs: 91, me: 87, ee: 82 },
    { week: 'W3', cs: 88, me: 84, ee: 79 },
    { week: 'W4', cs: 92, me: 86, ee: 83 },
    { week: 'W5', cs: 89, me: 83, ee: 81 },
    { week: 'W6', cs: 87, me: 82, ee: 78 },
  ];

  return (
    <div style={{ width: '100%', height: 340 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontFamily: 'var(--font-mono)', fontSize: 12, fill: 'var(--color-on-surface-variant)' }}
            axisLine={{ stroke: 'var(--color-outline-variant)' }}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontFamily: 'var(--font-mono)', fontSize: 12, fill: 'var(--color-on-surface-variant)' }}
            axisLine={{ stroke: 'var(--color-outline-variant)' }}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-card)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            name="Computer Science (CS)"
            dataKey="cs"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: 'var(--color-primary)' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            name="Mechanical Eng. (ME)"
            dataKey="me"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            name="Electrical Eng. (EE)"
            dataKey="ee"
            stroke="#6366f1"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 4, fill: '#6366f1' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
