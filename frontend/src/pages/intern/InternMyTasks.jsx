import { useState } from "react";

import TaskCard from "../../components/intern/TaskCard";

const TABS = [
    { key: "all", label: "All Tasks" },
    { key: "pending", label: "Pending", count: 2 },
    { key: "in-progress", label: "In Progress", count: 2 },
    { key: "review", label: "Review" },
    { key: "completed", label: "Completed" },
];

const TASKS = [
    {
        id: 1,
        title: "Implement user authentication flow",
        status: "in-progress",
        priority: "high",
        due: "Feb 1",
        overdue: true,
        time: "12/24h",
        tags: ["authentication", "security", "frontend"],
        assignee: "AT",
    },
    {
        id: 2,
        title: "Design dashboard mockups",
        status: "completed",
        priority: "medium",
        due: "Jan 20",
        overdue: false,
        time: "14/16h",
        tags: ["design", "ui", "dashboard"],
        assignee: "JW",
    },
    {
        id: 3,
        title: "Set up CI/CD pipeline",
        status: "review",
        priority: "high",
        due: "Jan 25",
        overdue: true,
        time: "10/12h",
        tags: ["devops", "automation", "backend"],
        assignee: "RG",
    },
    {
        id: 4,
        title: "Create component library documentation",
        status: "pending",
        priority: "medium",
        due: "Feb 10",
        overdue: true,
        time: "0/20h",
        tags: ["documentation", "frontend"],
        assignee: "SK",
    },
    {
        id: 5,
        title: "User onboarding flow",
        status: "pending",
        priority: "high",
        due: "Feb 15",
        overdue: true,
        time: "0/28h",
        tags: ["frontend", "ux", "onboarding"],
        assignee: "AT",
    },
];

const InternMyTasks = () => {
    const [activeTab, setActiveTab] = useState("all");

    const filteredTasks =
        activeTab === "all"
            ? TASKS
            : TASKS.filter((t) => t.status === activeTab);

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-2">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
              ${
                  activeTab === tab.key
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-500 hover:text-slate-700"
              }`}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700">
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold capitalize text-slate-900 mb-6">
                    {activeTab === "all"
                        ? "All Tasks"
                        : `${activeTab.replace("-", " ")} Tasks`}
                </h2>

                <div className="space-y-4">
                    {filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternMyTasks;
