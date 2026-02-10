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

/* Operational Task Completion Trend (%) */
const operationalCompletionData = [
    { month: "Jan", value: 58 },
    { month: "Feb", value: 64 },
    { month: "Mar", value: 70 },
    { month: "Apr", value: 78 },
    { month: "May", value: 85 },
    { month: "Jun", value: 91 },
];

/* Operations & Review Meeting Attendance */
const meetingEfficiencyData = [
    { name: "Completed", value: 90 },
    { name: "Delayed / Missed", value: 10 },
];

/* Department Execution Efficiency (%) */
const departmentEfficiencyData = [
    { name: "Operations", value: 92 },
    { name: "Customer Support", value: 88 },
    { name: "HR", value: 80 },
    { name: "Administration", value: 85 },
];

const COLORS = ["#4f46e5", "#e5e7eb"];

const CooAnalytics = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    COO Analytics
                </h1>
                <p className="text-slate-500">
                    Operational performance & execution insights
                </p>
            </div>

            {/* TOP SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <p className="text-slate-500">Operational Efficiency</p>
                    <h2 className="text-4xl font-bold">91%</h2>
                    <p className="text-green-600 text-sm mt-1">
                        ↑ Execution improved this quarter
                    </p>
                </div>

                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <p className="text-slate-500">
                        Active Operational Initiatives
                    </p>
                    <h2 className="text-4xl font-bold">68</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        52 on track · 16 delayed
                    </p>
                </div>
            </div>

            {/* LINE CHART */}
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold">
                        Operational Task Completion Rate
                    </h3>
                    <span className="font-semibold text-indigo-600">91%</span>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={operationalCompletionData}>
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
                        Operations Review Completion
                    </h3>

                    <div className="flex justify-center">
                        <ResponsiveContainer width={250} height={250}>
                            <PieChart>
                                <Pie
                                    data={meetingEfficiencyData}
                                    innerRadius={70}
                                    outerRadius={100}
                                    dataKey="value"
                                >
                                    {meetingEfficiencyData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between text-sm mt-4 text-slate-600">
                        <span>Completed: 90%</span>
                        <span>Delayed: 10%</span>
                    </div>
                </div>

                {/* BAR CHART */}
                <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">
                        Department Execution Efficiency (%)
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={departmentEfficiencyData}
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

export default CooAnalytics;
