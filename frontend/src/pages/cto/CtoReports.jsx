import { FileText, Download, Plus } from "lucide-react";

const reports = [
    {
        id: 1,
        name: "Engineering Velocity Report",
        description: "Sprint velocity, story points completed, backlog health",
        date: "June 15, 2024",
        author: "Engineering PM",
        action: "view",
    },
    {
        id: 2,
        name: "System Reliability & Uptime",
        description: "Uptime, incidents, MTTR, and SLA compliance",
        date: "June 14, 2024",
        author: "DevOps Team",
        action: "view",
    },
    {
        id: 3,
        name: "Technical Debt Assessment",
        description: "Code quality, refactor areas, legacy risks",
        date: "June 12, 2024",
        author: "Architecture Group",
        action: "view",
    },
    {
        id: 4,
        name: "Security & Compliance Audit",
        description: "Vulnerabilities, patches, compliance status",
        date: "June 10, 2024",
        author: "Security Team",
        action: "view",
    },
    {
        id: 5,
        name: "Infrastructure Cost Optimization",
        description: "Cloud usage, cost savings, scaling efficiency",
        date: "June 08, 2024",
        author: "Cloud Ops",
        action: "download",
    },
];

const CtoReports = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reports</h1>
                    <p className="text-slate-500">
                        Generate and manage reports
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white">
                        <Plus size={16} />
                        New Report
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white">
                        <Download size={16} />
                        Export All
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <select className="rounded-lg border border-gray-300 px-4 py-2">
                    <option>All</option>
                </select>

                <select className="rounded-lg border border-gray-300 px-4 py-2">
                    <option>This Month</option>
                </select>

                <input
                    type="text"
                    placeholder="Search Report Name..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                />
            </div>

            {/* Table Wrapper */}
            <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 border-b border-gray-300 bg-slate-50 px-6 py-4 text-sm font-semibold">
                    <div>Report Name</div>
                    <div>Last Updated</div>
                    <div>Author</div>
                    <div className="text-right">Actions</div>
                </div>

                {/* Rows */}
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className="grid grid-cols-4 gap-4 border-b border-gray-300 px-6 py-5 last:border-none"
                    >
                        {/* Report Info */}
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-slate-100 p-2">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="font-medium">{report.name}</p>
                                <p className="text-sm text-slate-500">
                                    {report.description}
                                </p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center">{report.date}</div>

                        {/* Author */}
                        <div className="flex items-center">{report.author}</div>

                        {/* Action Button (visual only) */}
                        <div className="flex items-center justify-end">
                            {report.action === "download" ? (
                                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                                    Download
                                </button>
                            ) : (
                                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CtoReports;
