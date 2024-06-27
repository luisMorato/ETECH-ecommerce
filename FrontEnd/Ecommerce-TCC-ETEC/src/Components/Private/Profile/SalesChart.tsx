import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const SalesChart = () => {
    const data = [
        { date: new Date(Date.now()).getDay(), activeUsers: 100 },
        { date: new Date(Date.now()).getDay() + 1, activeUsers: 120 },
        { date: new Date(Date.now()).getDay() + 2, activeUsers: 90 },
        { date: new Date(Date.now()).getDay() + 3, activeUsers: 200 },
        { date: new Date(Date.now()).getDay() + 4, activeUsers: 240 },
        { date: new Date(Date.now()).getDay() + 5, activeUsers: 190 },
        { date: new Date(Date.now()).getDay() + 6, activeUsers: 160 },
    ];
  
    return (
        <div className="h-[400px] w-[700px]">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart width={500} height={300} data={data}>
                    <Tooltip />
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="activeUsers"/>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line  dataKey="activeUsers" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesChart;