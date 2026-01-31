import { useState } from "react";
import { Plus } from "lucide-react";

import AssignTaskModal from "../../components/tl-panel/AssignTaskModal";
import PriorityBadge from "../../components/tl-panel/PriorityBadge";
import StatusBadge from "../../components/tl-panel/StatusBadge";

const interns = [
    { id: 1, name: "Sarah Jones", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "David Lee", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 3, name: "Emily Chen", avatar: "https://i.pravatar.cc/100?img=3" },
    { id: 4, name: "Michael Brown", avatar: "https://i.pravatar.cc/100?img=4" },
    {
        id: 5,
        name: "Jessica Wilson",
        avatar: "https://i.pravatar.cc/100?img=5",
    },
];

const TlInternTask = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            intern: interns[0],
            task: "Research Q4 Market Trends",
            priority: "High",
            deadline: "Oct 15, 2024",
            status: "In Progress",
        },
        {
            id: 2,
            intern: interns[1],
            task: "Develop API Integration Draft",
            priority: "Medium",
            deadline: "Oct 18, 2024",
            status: "Not Started",
        },
    ]);

    const [open, setOpen] = useState(false);

    const addTask = (newTask) => {
        setTasks((prev) => [...prev, { id: Date.now(), ...newTask }]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Intern Tasks
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    Assign New Task
                </button>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Intern Name</th>
                            <th className="px-4 py-3 text-left">Task Name</th>
                            <th className="px-4 py-3 text-left">Priority</th>
                            <th className="px-4 py-3 text-left">Deadline</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {tasks.map((t) => (
                            <tr key={t.id}>
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img
                                        src={t.intern.avatar}
                                        className="h-8 w-8 rounded-full"
                                    />
                                    {t.intern.name}
                                </td>

                                <td className="px-4 py-3">{t.task}</td>

                                <td className="px-4 py-3">
                                    <PriorityBadge value={t.priority} />
                                </td>

                                <td className="px-4 py-3">{t.deadline}</td>

                                <td className="px-4 py-3">
                                    <StatusBadge value={t.status} />
                                </td>

                                <td className="px-4 py-3 space-x-2">
                                    <button className="rounded border px-3 py-1 text-indigo-600 border-indigo-300 cursor-pointer">
                                        View
                                    </button>
                                    <button className="rounded border px-3 py-1 bg-slate-300 border-slate-300 cursor-pointer">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-500">
                    Showing 1–{tasks.length} of {tasks.length} tasks
                    <div className="space-x-2">
                        <button className="rounded border px-3 py-1">
                            Previous
                        </button>
                        <button className="rounded border px-3 py-1">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <AssignTaskModal
                    onClose={() => setOpen(false)}
                    onSubmit={addTask}
                />
            )}
        </div>
    );
};

export default TlInternTask;
