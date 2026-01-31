import { useState } from "react";

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

const AssignTaskModal = ({ onClose, onSubmit }) => {
    const [form, setForm] = useState({
        internId: "",
        task: "",
        priority: "Medium",
        deadline: "",
        status: "Not Started",
    });

    const handleSubmit = () => {
        const intern = interns.find((i) => i.id === Number(form.internId));
        if (!intern || !form.task || !form.deadline) return;

        onSubmit({
            intern,
            task: form.task,
            priority: form.priority,
            deadline: form.deadline,
            status: form.status,
        });

        onClose();
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
                        onChange={(e) =>
                            setForm({ ...form, priority: e.target.value })
                        }
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <select
                        className="rounded border px-3 py-2"
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                    >
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
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
