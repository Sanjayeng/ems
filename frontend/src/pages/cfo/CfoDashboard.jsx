const stats = [
    { label: "Total Revenue (YTD)", value: "$12.4M", icon: "" },
    { label: "Operating Expenses", value: "$6.8M", icon: "" },
    { label: "Net Profit", value: "$5.6M", icon: "" },
    { label: "Cash Runway", value: "14 Months", icon: "" },
];

const activities = [
    { title: "Q3 Budget Allocation Completed", progress: 95 },
    { title: "Department Expense Audit", progress: 80 },
    { title: "Vendor Cost Optimization Initiative", progress: 65 },
    { title: "Payroll & Compensation Review", progress: 55 },
    { title: "Annual Financial Forecast Planning", progress: 40 },
];

const CfoDashboard = () => {
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

export default CfoDashboard;
