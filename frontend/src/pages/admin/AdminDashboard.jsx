import { Users, ShieldCheck, Activity, Settings } from "lucide-react";

const stats = [
    {
        title: "Total Users",
        value: 156,
        change: "+12% from last week",
        icon: Users,
    },
    {
        title: "Active Roles",
        value: 6,
        icon: ShieldCheck,
    },
    {
        title: "System Health",
        value: "98%",
        icon: Activity,
    },
    {
        title: "Configurations",
        value: 24,
        icon: Settings,
    },
];

const recentActivity = [
    {
        text: "User alice@company.com logged in",
        time: "1h ago",
    },
    {
        text: "Role updated for bob@company.com",
        time: "3h ago",
    },
    {
        text: "New user created: carol@company.com",
        time: "5h ago",
    },
];

const systemStatus = [
    { label: "Database", status: "Healthy" },
    { label: "Authentication", status: "Healthy" },
    { label: "Storage", status: "Healthy" },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-slate-500">
                    System overview and management.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-xl border border-gray-300 bg-white p-6 flex justify-between items-start"
                    >
                        <div>
                            <p className="text-sm text-slate-500">
                                {item.title}
                            </p>
                            <h2 className="text-3xl font-bold mt-1">
                                {item.value}
                            </h2>
                            {item.change && (
                                <p className="text-green-600 text-sm mt-1">
                                    {item.change}
                                </p>
                            )}
                        </div>

                        <div className="rounded-lg bg-indigo-600 p-3 text-white">
                            <item.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent User Activity */}
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Recent User Activity
                    </h2>

                    <div className="space-y-3">
                        {recentActivity.map((a, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center rounded-lg bg-slate-50 px-4 py-3"
                            >
                                <span className="text-sm">{a.text}</span>
                                <span className="text-xs text-slate-500">
                                    {a.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="rounded-xl border border-gray-300 bg-white p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        System Status
                    </h2>

                    <div className="space-y-4">
                        {systemStatus.map((s) => (
                            <div
                                key={s.label}
                                className="flex justify-between items-center rounded-lg bg-slate-50 px-4 py-3"
                            >
                                <span className="font-medium">{s.label}</span>

                                <span className="flex items-center gap-2 text-green-600 text-sm">
                                    <span className="h-2 w-2 rounded-full bg-green-600" />
                                    {s.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
