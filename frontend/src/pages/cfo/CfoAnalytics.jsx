import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

/* ================= CFO DATA ================= */

/* Revenue Growth (in $ Millions) */
const revenueGrowthData = [
    { month: "Jan", value: 6.2 },
    { month: "Feb", value: 6.8 },
    { month: "Mar", value: 7.4 },
    { month: "Apr", value: 8.1 },
    { month: "May", value: 9.3 },
    { month: "Jun", value: 10.2 },
];

/* Financial Review Completion */
const financeMeetingData = [
    { name: "Completed Reviews", value: 88 },
    { name: "Pending Reviews", value: 12 },
];

/* Budget Utilization by Department (%) */
const budgetUtilizationData = [
    { name: "Engineering", value: 82 },
    { name: "Sales", value: 88 },
    { name: "Marketing", value: 75 },
    { name: "Operations", value: 80 },
];

const COLORS = ["#4f46e5", "#e5e7eb"];

const CfoAnalytics = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    CFO Analytics
                </h1>
                <p className="text-slate-500">
                    Financial performance & budget insights
                </p>
            </div>

            {/* TOP SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <p className="text-slate-500">Financial Health</p>
                    <h2 className="text-4xl font-bold">$10.2M</h2>
                    <p className="text-green-600 text-sm mt-1">
                        ↑ Revenue growth this quarter
                    </p>
                </div>

                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <p className="text-slate-500">Operating Expenses</p>
                    <h2 className="text-4xl font-bold">$6.8M</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Within approved budget
                    </p>
                </div>
            </div>

            {/* LINE CHART */}
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold">Revenue Growth Trend ($M)</h3>
                    <span className="font-semibold text-indigo-600">
                        $10.2M
                    </span>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueGrowthData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4f46e5"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DONUT CHART */}
                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">
                        Financial Review Completion
                    </h3>

                    <div className="flex justify-center">
                        <ResponsiveContainer width={250} height={250}>
                            <PieChart>
                                <Pie
                                    data={financeMeetingData}
                                    innerRadius={70}
                                    outerRadius={100}
                                    dataKey="value"
                                >
                                    {financeMeetingData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between text-sm mt-4 text-slate-600">
                        <span>Completed: 88%</span>
                        <span>Pending: 12%</span>
                    </div>
                </div>

                {/* BAR CHART */}
                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">
                        Department Budget Utilization (%)
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={budgetUtilizationData}
                            layout="vertical"
                        >
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill="#4f46e5"
                                radius={[0, 6, 6, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CfoAnalytics;
