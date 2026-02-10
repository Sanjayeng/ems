const stats = [
    {
        label: "Engineering Employees",
        value: 86,
        icon: "",
    },
    {
        label: "Technical Managers",
        value: 12,
        icon: "",
    },
    {
        label: "Team Leads",
        value: 18,
        icon: "",
    },
    {
        label: "Engineering Interns",
        value: 34,
        icon: "",
    },
];

const activities = [
    {
        title: "System Architecture Revamp (Microservices)",
        progress: 85,
    },
    {
        title: "Cloud Cost Optimization Initiative",
        progress: 72,
    },
    {
        title: "DevOps CI/CD Pipeline Upgrade",
        progress: 65,
    },
    {
        title: "Engineering Intern Onboarding Program",
        progress: 55,
    },
    {
        title: "Legacy System Migration to AWS",
        progress: 40,
    },
];

const CtoDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">{s.label}</p>
                            {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg">
                                {s.icon}
                            </div> */}
                        </div>
                        <p className="mt-3 text-2xl text-[#2B7FFF] font-semibold">
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Organization Activity Overview */}
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    Organization Activity Overview
                </h2>

                <div className="space-y-4">
                    {activities.map((a) => (
                        <div key={a.title}>
                            <div className="mb-1 flex justify-between text-sm">
                                <span className="text-slate-700">
                                    {a.title}
                                </span>
                                <span className="text-slate-500">
                                    {a.progress}%
                                </span>
                            </div>

                            <div className="h-2 w-full rounded-full bg-slate-200">
                                <div
                                    className="h-2 rounded-full bg-blue-500 transition-all"
                                    style={{ width: `${a.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CtoDashboard;
