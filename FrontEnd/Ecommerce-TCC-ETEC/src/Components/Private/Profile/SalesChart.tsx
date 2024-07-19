import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const SalesChart = () => {
    const currentUrl = new URL(window.location.toString());
    const currentOption = currentUrl.searchParams.get('option') ?? 'dashboard';
    
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
        <div className={`w-full ${currentOption === "dashboard" ? "h-[300px]" : "h-[250px] lg:h-[400px]"}`}>
            <h2 className="text-2xl font-medium text-center mb-5">Sales Value (Last 7 Days)</h2>
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