import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const ActiveUsersChart = () => {
    const data = [
      { days: 1, activeUsers: 20 },
      { days: 2, activeUsers: 12 },
      { days: 3, activeUsers: 51 },
      { days: 4, activeUsers: 33 },
      { days: 5, activeUsers: 57 },
      { days: 6, activeUsers: 5 },
      { days: 7, activeUsers: 88 },
    ];
    
    return (
      <div className="w-1/2">
        <h2 className="text-xl font-medium text-center mb-5">Active Users (Last 7 Days)</h2>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={data}>
            <Tooltip />
            <XAxis dataKey="activeUsers" />
            <YAxis />
            <Bar dataKey="activeUsers" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
}

export default ActiveUsersChart;