import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const data = [
  { time: '10:00', value: 12 },
  { time: '11:00', value: 18 },
  { time: '12:00', value: 25 },
  { time: '13:00', value: 22 },
  { time: '14:00', value: 28 },
]

export default function LinePerformanceChart() {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
