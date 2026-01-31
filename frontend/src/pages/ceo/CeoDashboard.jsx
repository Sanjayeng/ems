import {
    DollarSign,
    Building2,
    Users,
    TrendingUp,
    Megaphone,
} from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$12.4M",
        change: "+18% from last week",
        icon: DollarSign,
    },
    {
        title: "Departments",
        value: "12",
        icon: Building2,
    },
    {
        title: "Total Employees",
        value: "512",
        change: "+12% from last week",
        icon: Users,
    },
    {
        title: "Company Growth",
        value: "32%",
        change: "+8% from last week",
        icon: TrendingUp,
    },
];

const performance = [
    { name: "Technical", value: 95 },
    { name: "Operations", value: 90 },
    { name: "Finance", value: 85 },
];

const announcements = [
    { title: "Q1 Results Published", time: "1 day ago" },
    { title: "New Policy Updates", time: "2 day ago" },
    { title: "Team Expansion", time: "3 day ago" },
];

const CeoDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold">CEO Dashboard</h1>
                <p className="text-slate-500">
                    Complete organization overview.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="rounded-xl border border-gray-300 bg-white p-6 flex justify-between items-start"
                        >
                            <div>
                                <p className="text-sm text-slate-500">
                                    {item.title}
                                </p>
                                <h2 className="mt-1 text-2xl font-bold">
                                    {item.value}
                                </h2>
                                {item.change && (
                                    <p className="mt-2 text-sm text-green-600">
                                        {item.change}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-lg bg-indigo-600 p-3 text-white">
                                <Icon size={22} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Department Performance */}
                <div className="lg:col-span-2 rounded-xl border border-gray-300 bg-white p-6">
                    <h2 className="mb-6 text-lg font-semibold">
                        Department Performance
                    </h2>

                    <div className="space-y-5">
                        {performance.map((dept) => (
                            <div key={dept.name}>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span>{dept.name}</span>
                                    <span className="text-slate-500">
                                        {dept.value}%
                                    </span>
                                </div>

                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div
                                        className="h-2 rounded-full bg-indigo-600"
                                        style={{ width: `${dept.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements */}
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <h2 className="mb-6 text-lg font-semibold">
                        Recent Announcements
                    </h2>

                    <div className="space-y-4">
                        {announcements.map((a, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-lg bg-slate-50 p-4"
                            >
                                <Megaphone
                                    size={18}
                                    className="mt-1 text-slate-500"
                                />
                                <div>
                                    <p className="font-medium">{a.title}</p>
                                    <p className="text-sm text-slate-500">
                                        {a.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CeoDashboard;
