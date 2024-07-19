import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const BestSellingCategoryChart = () => {
    const data = [
        { categoryName: "Peripherals", selling: ((0.2) * 100) },
        { categoryName: "Computers", selling: ((0.1) * 100) },
        { categoryName: "Notebooks", selling: ((0.1) * 100) },
        { categoryName: "Hardware", selling: ((0.4) * 100) },
        { categoryName: "Monitors", selling: ((0.2) * 100) },
    ];

    return (
        <div className="lg:h-[400px] lg:w-1/2">
            <h2 className="text-2xl font-medium text-center mb-5">Best Selling Categories</h2>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>
                    <Tooltip />
                    <Pie
                        data={data}
                        dataKey="selling"
                        nameKey="categoryName"
                        outerRadius={100} 
                        fill="#8884d8"
                        label
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BestSellingCategoryChart;