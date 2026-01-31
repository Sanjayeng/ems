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

import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChartIcon,
} from "lucide-react";

const metrics = [
    {
        title: "Revenue Growth",
        value: "+32%",
        icon: TrendingUp,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        title: "Cost Efficiency",
        value: "+15%",
        icon: TrendingDown,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        title: "Market Position",
        value: "#3",
        icon: BarChart3,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        title: "Customer Satisfaction",
        value: "94%",
        icon: PieChartIcon,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
];

const taskCompletionData = [
    { month: "Jan", value: 25 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 50 },
    { month: "Apr", value: 72 },
    { month: "May", value: 85 },
    { month: "Jun", value: 92 },
];

const meetingData = [
    { name: "Attended", value: 85 },
    { name: "Missed", value: 15 },
];

const departmentData = [
    { name: "Engineering", value: 95 },
    { name: "Marketing", value: 82 },
    { name: "Sales", value: 88 },
    { name: "Operations", value: 80 },
];

const COLORS = ["#4f46e5", "#e5e7eb"];

const CeoAnalytics = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">Analytics</h1>
                <p className="text-slate-500">Company wide Analytics</p>
            </div>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        {item.title}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                        {item.value}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
                                >
                                    <Icon
                                        className={`h-6 w-6 ${item.iconColor}`}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* LINE CHART */}
            <div className="rounded-xl border border-gray-300 bg-white p-6">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold">Task Completion Rate</h3>
                    <span className="font-semibold">92%</span>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={taskCompletionData}>
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
                {/* DONUT */}
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <h3 className="font-semibold mb-4">
                        Meeting Participation
                    </h3>

                    <div className="flex justify-center">
                        <ResponsiveContainer width={250} height={250}>
                            <PieChart>
                                <Pie
                                    data={meetingData}
                                    innerRadius={70}
                                    outerRadius={100}
                                    dataKey="value"
                                >
                                    {meetingData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between text-sm mt-4">
                        <span>Attended: 85%</span>
                        <span>Missed: 15%</span>
                    </div>
                </div>

                {/* BAR CHART */}
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <h3 className="font-semibold mb-4">
                        Department Productivity
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={departmentData} layout="vertical">
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

export default CeoAnalytics;
