import { useState } from "react";

const interns = [
    { id: 1, name: "Sarah Jones" },
    { id: 2, name: "David Lee" },
    { id: 3, name: "Emily Chen" },
];

const CreateMeetingModal = ({ onClose, onCreate }) => {
    const [form, setForm] = useState({
        title: "",
        interns: [],
        date: "",
        time: "",
        description: "",
    });

    const toggleIntern = (name) => {
        setForm((prev) => ({
            ...prev,
            interns: prev.interns.includes(name)
                ? prev.interns.filter((i) => i !== name)
                : [...prev.interns, name],
        }));
    };

    const formatTime12 = (time24) => {
        if (!time24) return "";
        const [h, m] = time24.split(":");
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12}:${m} ${ampm}`;
    };

    const handleCreate = () => {
        if (!form.title || !form.date || !form.time) return;

        onCreate({
            id: Date.now(),
            title: form.title,
            datetime: `${form.date} at ${formatTime12(form.time)}`,
            participants: form.interns,
            status: "Scheduled",
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 space-y-4">
                <h2 className="text-lg font-semibold">Create New Meeting</h2>

                <input
                    placeholder="Meeting Title"
                    className="w-full rounded border px-3 py-2"
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />

                {/* Select Interns */}
                <div className="space-y-2">
                    <p className="text-sm font-medium">Select Interns</p>
                    <div className="flex flex-wrap gap-2">
                        {interns.map((i) => (
                            <button
                                key={i.id}
                                type="button"
                                onClick={() => toggleIntern(i.name)}
                                className={`rounded-full border px-3 py-1 text-sm ${
                                    form.interns.includes(i.name)
                                        ? "bg-indigo-100 border-indigo-500 text-indigo-600"
                                        : "border-slate-300"
                                }`}
                            >
                                {i.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="date"
                        className="rounded border px-3 py-2"
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                    />
                    <input
                        type="time"
                        className="rounded border px-3 py-2"
                        onChange={(e) =>
                            setForm({ ...form, time: e.target.value })
                        }
                    />
                </div>

                <textarea
                    placeholder="Description (optional)"
                    rows={3}
                    className="w-full rounded border px-3 py-2"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="rounded border px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="rounded bg-indigo-600 px-4 py-2 text-white"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingModal;
