const stats = [
    { label: "Total Departments", value: 12, icon: "" },
    { label: "Total Managers", value: 25, icon: "" },
    { label: "Total Team Leads", value: 50, icon: "" },
    { label: "Total Interns", value: 120, icon: "" },
];

const activities = [
    { title: "Q3 Strategy Meeting Scheduled", progress: 90 },
    { title: 'New Department "AI Research" Created', progress: 80 },
    { title: "New Department Chat System Created", progress: 65 },
    { title: "Intern Program L&D Scheduled", progress: 50 },
    { title: "Intern Program Q4 Started", progress: 35 },
];

const CxoDashboard = () => {
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

export default CxoDashboard;
