import { Megaphone, Plus, Pencil, Trash2 } from "lucide-react";

import { useState } from "react";

import AnnouncementModal from "../../components/ceo/AnnouncementModal";

const initialAnnouncements = [
    {
        id: 1,
        title: "Q1 Results Published",
        date: "2024-01-14",
        description: "We are pleased to announce our Q1 results...",
    },
    {
        id: 2,
        title: "New Policy Updates",
        date: "2024-01-12",
        description: "Important updates to company policies...",
    },
    {
        id: 3,
        title: "Team Expansion",
        date: "2024-01-10",
        description: "We are expanding our team across all departments...",
    },
];

const CeoAnnouncements = () => {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [modal, setModal] = useState(null);

    const handleCreate = (data) => {
        setAnnouncements([
            {
                id: Date.now(),
                ...data,
            },
            ...announcements,
        ]);
    };

    const handleUpdate = (updated) => {
        setAnnouncements((prev) =>
            prev.map((a) =>
                a.id === modal.data.id ? { ...a, ...updated } : a,
            ),
        );
    };

    const handleDelete = (id) => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Announcements</h1>
                    <p className="text-slate-500">Company-wide announcements</p>
                </div>

                <button
                    onClick={() => setModal({ mode: "create" })}
                    className="flex items-center cursor-pointer gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white"
                >
                    <Plus size={16} />
                    New Announcement
                </button>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {announcements.map((a) => (
                    <div
                        key={a.id}
                        className="rounded-xl border border-gray-300 bg-white p-5 flex justify-between gap-4"
                    >
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <Megaphone size={18} />
                            </div>

                            <div>
                                <h3 className="font-semibold">{a.title}</h3>
                                <p className="text-sm text-slate-500">
                                    {a.date}
                                </p>
                                <p className="mt-1 text-slate-700">
                                    {a.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    setModal({ mode: "edit", data: a })
                                }
                                className="rounded border border-gray-300 text-gray-500 p-2 h-8 w-8 cursor-pointer hover:bg-slate-100"
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(a.id)}
                                className="rounded border border-red-300 p-2 h-8 w-8 cursor-pointer text-red-600 hover:bg-red-50"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {modal && (
                <AnnouncementModal
                    mode={modal.mode}
                    data={modal.data}
                    onClose={() => setModal(null)}
                    onSave={modal.mode === "edit" ? handleUpdate : handleCreate}
                />
            )}
        </div>
    );
};

export default CeoAnnouncements;
