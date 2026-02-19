import { useState } from "react";

// Real interns seeded in the database
const interns = [
    { id: 'intern-1', name: "Sarah Jones", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 'intern-2', name: "David Lee", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 'intern-3', name: "Emily Chen", avatar: "https://i.pravatar.cc/100?img=3" },
    { id: 'intern-4', name: "Michael Brown", avatar: "https://i.pravatar.cc/100?img=4" },
    { id: 'intern-5', name: "Jessica Wilson", avatar: "https://i.pravatar.cc/100?img=5" },
];

const AssignTaskModal = ({ onClose, onSubmit }) => {
    const [form, setForm] = useState({
        internId: "",
        task: "",
        priority: "medium",
        deadline: "",
        status: "pending",
    });

    const handleSubmit = () => {
        const intern = interns.find((i) => i.id === form.internId);
        if (!intern || !form.task || !form.deadline) {
            alert("Please fill in all fields");
            return;
        }

        onSubmit({
            intern,
            task: form.task,
            priority: form.priority,
            deadline: form.deadline,
            status: form.status,
        });

        setForm({
            internId: "",
            task: "",
            priority: "medium",
            deadline: "",
            status: "pending",
        });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 space-y-4">
                <h2 className="text-lg font-semibold">Assign New Task</h2>

                <select
                    className="w-full rounded border px-3 py-2"
                    onChange={(e) =>
                        setForm({ ...form, internId: e.target.value })
                    }
                >
                    <option value="">Select Intern</option>
                    {interns.map((i) => (
                        <option key={i.id} value={i.id}>
                            {i.name}
                        </option>
                    ))}
                </select>

                <input
                    placeholder="Task name"
                    className="w-full rounded border px-3 py-2"
                    onChange={(e) => setForm({ ...form, task: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                    <select
                        className="rounded border px-3 py-2"
                        value={form.priority}
                        onChange={(e) =>
                            setForm({ ...form, priority: e.target.value })
                        }
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <select
                        className="rounded border px-3 py-2"
                        value={form.status}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                    >
                        <option value="pending">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <input
                    type="date"
                    className="w-full rounded border px-3 py-2"
                    onChange={(e) =>
                        setForm({ ...form, deadline: e.target.value })
                    }
                />

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="rounded border px-4 py-2 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded bg-indigo-600 px-4 py-2 text-white cursor-pointer"
                    >
                        Assign Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignTaskModal;
