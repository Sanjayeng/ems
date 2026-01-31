import { useState } from "react";
import { Plus, Calendar, Users, Clock, X } from "lucide-react";

const initialMeetings = [
    {
        id: 1,
        title: "Board Meeting",
        datetime: "Mon, Apr 15, 2025 at 10:00 AM",
        participants: "Board Members, CEO, CFO",
        status: "Scheduled",
    },
    {
        id: 2,
        title: "Investor Call",
        datetime: "Thu, Apr 18, 2025 at 2:30 PM",
        participants: "Investors, CEO, Finance Team",
        status: "Scheduled",
    },
    {
        id: 3,
        title: "Strategy Review",
        datetime: "Mon, Apr 22, 2025 at 11:00 AM",
        participants: "CEO, Department Heads",
        status: "Scheduled",
    },
];

const CeoMeetings = () => {
    const [meetings, setMeetings] = useState(initialMeetings);
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        title: "",
        date: "",
        time: "",
        participants: "",
        description: "",
    });

    const formatTime = (time) => {
        const [h, m] = time.split(":");
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12}:${m} ${ampm}`;
    };

    const handleCreate = () => {
        if (!form.title || !form.date || !form.time) return;

        const newMeeting = {
            id: Date.now(),
            title: form.title,
            datetime: `${new Date(form.date).toDateString()} at ${formatTime(
                form.time,
            )}`,
            participants: form.participants || "—",
            status: "Scheduled",
        };

        setMeetings([newMeeting, ...meetings]);
        setOpen(false);
        setForm({
            title: "",
            date: "",
            time: "",
            participants: "",
            description: "",
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Meetings</h1>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                    <Plus size={18} />
                    Schedule Meeting
                </button>
            </div>

            {/* Meetings List */}
            <div className="grid gap-4 md:grid-cols-2">
                {meetings.map((m) => (
                    <div
                        key={m.id}
                        className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold">{m.title}</h3>

                        <div className="mt-2 space-y-1 text-sm text-slate-600">
                            <p className="flex items-center gap-2">
                                <Calendar size={16} /> {m.datetime}
                            </p>
                            <p className="flex items-center gap-2">
                                <Users size={16} /> {m.participants}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                                {m.status}
                            </span>

                            <button className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm text-white">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                Schedule Meeting
                            </h2>
                            <button
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                <X />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium">
                                    Title
                                </label>
                                <input
                                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                                        value={form.date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                date: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                                        value={form.time}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                time: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Participants
                                </label>
                                <input
                                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                                    value={form.participants}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            participants: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded border cursor-pointer border-gray-300 hover:bg-slate-50 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="rounded cursor-pointer bg-indigo-600 px-4 py-2 text-white"
                            >
                                Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CeoMeetings;
