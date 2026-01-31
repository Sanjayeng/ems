import { X, Upload } from "lucide-react";
import { useState } from "react";

const NewSubmissionModal = ({ onClose, onSubmit, pendingTasks = [] }) => {
    const [type, setType] = useState("file");
    const [task, setTask] = useState("");
    const [file, setFile] = useState(null);
    const [link, setLink] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task || (type === "file" && !file) || (type === "link" && !link))
            return;
        onSubmit({
            task,
            type,
            file,
            link,
            comment,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">
                        New Submission
                    </h2>
                    <button onClick={onClose}>
                        <X className="text-slate-500 hover:text-slate-700 cursor-pointer" />
                    </button>
                </div>

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {/* Task */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Task
                        </label>
                        <select
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm cursor-pointer"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                        >
                            <option value="">Select task</option>
                            {pendingTasks.length === 0 ? (
                                <option value="" disabled>
                                    No pending tasks
                                </option>
                            ) : (
                                pendingTasks.map((t, idx) => (
                                    <option key={idx} value={t}>
                                        {t}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    {/* Submission Type */}
                    <div className="flex gap-4">
                        {["file", "link"].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium cursor-pointer ${
                                    type === t
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                                        : "border-slate-300 text-slate-600"
                                }`}
                            >
                                {t === "file" ? "Upload File" : "Submit Link"}
                            </button>
                        ))}
                    </div>

                    {/* File / Link */}
                    {type === "file" ? (
                        <>
                            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 p-6 text-slate-500 hover:border-indigo-500">
                                <Upload />
                                <span className="text-sm">
                                    Click to upload or drag & drop
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required={type === "file"}
                                />
                            </label>
                            {file && (
                                <div className="flex items-center gap-2 mt-2 bg-slate-100 rounded px-3 py-2">
                                    <span
                                        className="text-sm text-slate-700 truncate max-w-xs"
                                        title={file.name}
                                    >
                                        {file.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="text-slate-400 hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <input
                            type="url"
                            placeholder="https://github.com/..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required={type === "link"}
                        />
                    )}

                    {/* Comment */}
                    <textarea
                        placeholder="Optional comment..."
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewSubmissionModal;
