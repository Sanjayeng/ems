import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import AssignTaskModal from "../../components/tl-panel/AssignTaskModal";
import PriorityBadge from "../../components/tl-panel/PriorityBadge";
import StatusBadge from "../../components/tl-panel/StatusBadge";
import { tasksApi } from "../../utils/api";

const interns = [
    { id: 'intern-1', name: "Sarah Jones", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 'intern-2', name: "David Lee", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 'intern-3', name: "Emily Chen", avatar: "https://i.pravatar.cc/100?img=3" },
    { id: 'intern-4', name: "Michael Brown", avatar: "https://i.pravatar.cc/100?img=4" },
    { id: 'intern-5', name: "Jessica Wilson", avatar: "https://i.pravatar.cc/100?img=5" },
];

const TlInternTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    // Fetch tasks from backend on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await tasksApi.getAll();
            
            // Map API response to include intern info
            const mappedTasks = data.map(task => ({
                ...task,
                intern: interns.find(i => i.id === task.assignedToId) || { id: task.assignedToId, name: 'Unknown', avatar: 'https://i.pravatar.cc/100' },
                task: task.title,
                priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
                deadline: new Date(task.dueDate).toLocaleDateString(),
                status: task.status === 'pending' ? 'Not Started' : 
                        task.status === 'in_progress' ? 'In Progress' : 
                        'Completed',
            }));
            
            setTasks(mappedTasks);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (newTask) => {
        try {
            // Convert frontend format to backend format
            const taskData = {
                title: newTask.task,
                description: newTask.task, // Using task as description for now
                departmentId: "dept-engineering", // Engineering department from seed
                assignedToId: newTask.intern.id, // Uses real user IDs from seeded data
                assignedById: "admin-1", // Admin user from seed
                priority: newTask.priority.toLowerCase(),
                dueDate: new Date(newTask.deadline).toISOString(),
                status: newTask.status || "pending",
            };

            const createdTask = await tasksApi.create(taskData);
            
            // Add the created task to the state
            setTasks((prev) => [...prev, { 
                id: createdTask.id, 
                ...newTask,
                ...createdTask 
            }]);
            
            setError(null);
            setOpen(false); // Close modal after successful submission
        } catch (err) {
            setError(err.message);
            console.error("Failed to create task:", err);
            alert(`Error creating task: ${err.message}`);
        }
    };

    return (
        <div className="space-y-6">
            {/* Error message */}
            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                    {error}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Intern Tasks
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    disabled={loading}
                    className="cursor-pointer flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Plus size={16} />
                    Assign New Task
                </button>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="text-center py-8 text-slate-500">
                    Loading tasks...
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                    No tasks assigned yet
                </div>
            ) : (
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
            )}

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
