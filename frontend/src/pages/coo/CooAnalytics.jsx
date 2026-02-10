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

const CooAnalytics = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">Analytics</h1>
                <p className="text-slate-500">Department performance metrics</p>
            </div>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <p className="text-slate-500">Overall Score</p>
                    <h2 className="text-4xl font-bold">88%</h2>
                    <p className="text-green-600 text-sm mt-1">
                        ↑ +4% from last month
                    </p>
                </div>

                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <p className="text-slate-500">Active Projects</p>
                    <h2 className="text-4xl font-bold">142</h2>
                    <p className="text-slate-500 text-sm mt-1">15 on track</p>
                </div>
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

export default CooAnalytics;
