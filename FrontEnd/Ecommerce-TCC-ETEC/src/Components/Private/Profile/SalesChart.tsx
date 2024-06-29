import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const SalesChart = () => {
    const data = [
        { day: 1, sales: 100 },
        { day: 2, sales: 120 },
        { day: 3, sales: 90 },
        { day: 4, sales: 200 },
        { day: 5, sales: 240 },
        { day: 6, sales: 190 },
        { day: 7, sales: 160 },
    ];
  
    return (
        <div className="h-[400px] w-full">
            <h2 className="text-2xl font-medium text-center mb-5">Sales Value (Last Month)</h2>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart data={data}>
                    <Tooltip />
                    <XAxis dataKey="day"/>
                    <YAxis dataKey="sales"/>
                    <CartesianGrid stroke="#eee" />
                    <Line dataKey="sales" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesChart;