import { useState } from "react";

import { Plus } from "lucide-react";

import NewSubmissionModal from "../../components/intern/NewSubmissionModal";

import SummaryCard from "../../components/intern/SummaryCard";
import SubmissionRow from "../../components/intern/SubmissionRow";

const initialSubmissions = [
    {
        id: 1,
        task: "Design dashboard mockups",
        type: "file",
        submittedOn: "Feb 10, 2026",
        status: "approved",
        reviewer: "Team Lead",
    },
    {
        id: 2,
        task: "Create component library documentation",
        type: "link",
        submittedOn: "Feb 12, 2026",
        status: "pending",
        reviewer: "-",
    },
    {
        id: 3,
        task: "User onboarding flow",
        type: "file",
        submittedOn: "Feb 14, 2026",
        status: "rejected",
        reviewer: "Manager",
    },
];

const InternSubmissions = () => {
    const [open, setOpen] = useState(false);
    const [submissions, setSubmissions] = useState(initialSubmissions);

    const total = submissions.length;
    const approved = submissions.filter((s) => s.status === "approved").length;
    const pending = submissions.filter((s) => s.status === "pending").length;

    // Handler to add a new submission
    const handleNewSubmission = (submission) => {
        setSubmissions((prev) => [
            {
                ...submission,
                id: prev.length ? prev[0].id + 1 : 1,
                status: "pending",
                submittedOn: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
                reviewer: "-",
            },
            ...prev,
        ]);
        setOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        My Submissions
                    </h1>
                    <p className="mt-1 text-slate-500">
                        Submit and track your assigned work
                    </p>
                </div>

                {/* New Submission */}
                <button
                    onClick={() => setOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
                >
                    <Plus size={16} />
                    New Submission
                </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <SummaryCard title="Total" value={total} />
                <SummaryCard
                    title="Approved"
                    value={approved}
                    color="emerald"
                />
                <SummaryCard title="Pending" value={pending} color="indigo" />
            </div>

            {/* Submissions List */}
            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 p-5">
                    <h2 className="font-medium text-slate-900">
                        Submission History
                    </h2>
                </div>

                <div className="divide-y divide-gray-300">
                    {submissions.map((item) => (
                        <SubmissionRow key={item.id} item={item} />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {open && (
                <NewSubmissionModal
                    onClose={() => setOpen(false)}
                    onSubmit={handleNewSubmission}
                    pendingTasks={submissions
                        .filter((s) => s.status === "pending")
                        .map((s) => s.task)}
                />
            )}
        </div>
    );
};

export default InternSubmissions;
