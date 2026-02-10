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

/* Sprint completion trend */
const sprintCompletionData = [
    { month: "Jan", value: 62 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 72 },
    { month: "Apr", value: 80 },
    { month: "May", value: 88 },
    { month: "Jun", value: 92 },
];

/* Engineering meeting efficiency */
const meetingEfficiencyData = [
    { name: "Effective", value: 82 },
    { name: "Ineffective", value: 18 },
];

/* Technical team productivity */
const technicalTeamData = [
    { name: "Frontend", value: 90 },
    { name: "Backend", value: 88 },
    { name: "DevOps", value: 85 },
    { name: "QA", value: 80 },
];

const COLORS = ["#4f46e5", "#e5e7eb"];

const CtoAnalytics = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    CTO Analytics
                </h1>
                <p className="text-slate-500">
                    Engineering performance & delivery metrics
                </p>
            </div>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <p className="text-slate-500">Engineering Health Score</p>
                    <h2 className="text-4xl font-bold text-slate-900">88%</h2>
                    <p className="text-green-600 text-sm mt-1">
                        ↑ +4% from last sprint
                    </p>
                </div>

                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <p className="text-slate-500">Active Technical Projects</p>
                    <h2 className="text-4xl font-bold text-slate-900">142</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        118 on track · 24 at risk
                    </p>
                </div>
            </div>

            {/* LINE CHART */}
            <div className="rounded-xl border border-gray-300 bg-white p-6">
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">
                        Sprint Completion Rate
                    </h3>
                    <span className="font-semibold text-indigo-600">92%</span>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={sprintCompletionData}>
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
                    <h3 className="font-semibold mb-4 text-slate-900">
                        Engineering Meeting Effectiveness
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
                        <span>Effective: 82%</span>
                        <span>Ineffective: 18%</span>
                    </div>
                </div>

                {/* BAR CHART */}
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <h3 className="font-semibold mb-4 text-slate-900">
                        Technical Team Productivity
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={technicalTeamData} layout="vertical">
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

export default CtoAnalytics;
