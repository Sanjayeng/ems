import { FileText, Link as LinkIcon } from "lucide-react";

import StatusBadge from "./StatusBadge";

const SubmissionRow = ({ item }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            {/* Left */}
            <div className="space-y-1">
                <p className="font-medium text-slate-900">{item.task}</p>
                <p className="text-sm text-slate-500">
                    Submitted on {item.submittedOn}
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Type */}
                <div className="flex items-center gap-1 text-slate-500">
                    {item.type === "file" ? (
                        <FileText size={16} />
                    ) : (
                        <LinkIcon size={16} />
                    )}
                    <span className="text-sm capitalize">{item.type}</span>
                </div>

                {/* Status */}
                <StatusBadge status={item.status} />

                {/* Action */}
                <button className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">
                    View
                </button>
            </div>
        </div>
    );
};

export default SubmissionRow;
