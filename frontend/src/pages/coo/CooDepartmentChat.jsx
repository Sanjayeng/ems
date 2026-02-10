import { useState } from "react";
import { Search, Send, Paperclip, Hash } from "lucide-react";

/* COO GROUP CHANNELS */
const channels = [
    {
        id: "ops-general",
        name: "Operations General",
        description: "General operations discussion",
    },
    {
        id: "daily-updates",
        name: "Daily Ops Updates",
        description: "Daily execution & status updates",
    },
    {
        id: "process",
        name: "Process Improvements",
        description: "Workflow & efficiency improvements",
    },
    {
        id: "incidents",
        name: "Incidents & Escalations",
        description: "Operational issues & escalations",
    },
    {
        id: "coordination",
        name: "Cross-Team Coordination",
        description: "Inter-department coordination",
    },
];

/* INITIAL GROUP MESSAGES */
const initialMessages = {
    "ops-general": [
        {
            user: "COO Office",
            text: "Welcome to Operations General.",
            time: "9:00 AM",
        },
        {
            user: "You",
            text: "Let’s keep operations aligned here.",
            time: "9:03 AM",
            mine: true,
        },
    ],
    "daily-updates": [
        {
            user: "Operations Team",
            text: "Daily ops report will be shared by EOD.",
            time: "Yesterday",
        },
    ],
    process: [],
    incidents: [],
    coordination: [],
};

const CooDepartmentChat = () => {
    const [activeChannel, setActiveChannel] = useState(channels[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const currentMessages = messages[activeChannel.id] || [];

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages((prev) => ({
            ...prev,
            [activeChannel.id]: [
                ...(prev[activeChannel.id] || []),
                {
                    user: "You",
                    text: input,
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    mine: true,
                },
            ],
        }));

        setInput("");
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-xl border border-gray-300 bg-white overflow-hidden">
            {/* LEFT SIDEBAR */}
            <div className="w-72 border-r border-gray-300 bg-slate-50 flex flex-col">
                <div className="p-4 text-lg font-semibold">
                    Operations Groups
                </div>

                {/* Search */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
                        <Search size={16} className="text-slate-400" />
                        <input
                            placeholder="Search channel..."
                            className="w-full text-sm outline-none"
                        />
                    </div>
                </div>

                {/* CHANNEL LIST */}
                <div className="px-2 space-y-1">
                    {channels.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveChannel(c)}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left ${
                                activeChannel.id === c.id
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "hover:bg-slate-100"
                            }`}
                        >
                            <Hash size={16} />
                            <div>
                                <div className="text-sm font-medium">
                                    {c.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {c.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex flex-1 flex-col">
                {/* HEADER */}
                <div className="border-b border-gray-300 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Hash className="text-indigo-600" />
                        <div>
                            <div className="font-semibold">
                                {activeChannel.name}
                            </div>
                            <div className="text-sm text-slate-500">
                                {activeChannel.description}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-4 space-y-4">
                    {currentMessages.length === 0 && (
                        <div className="text-sm text-slate-400">
                            No messages yet
                        </div>
                    )}

                    {currentMessages.map((m, i) => (
                        <div
                            key={i}
                            className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                                m.mine
                                    ? "ml-auto bg-indigo-600 text-white"
                                    : "bg-slate-200 text-slate-800"
                            }`}
                        >
                            {!m.mine && (
                                <div className="text-xs font-semibold mb-1">
                                    {m.user}
                                </div>
                            )}
                            {m.text}
                            <div className="mt-1 text-xs opacity-70 text-right">
                                {m.time}
                            </div>
                        </div>
                    ))}
                </div>

                {/* INPUT */}
                <div className="border-t border-gray-300 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600">
                            <Paperclip size={18} />
                        </button>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder={`Message #${activeChannel.name}`}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CooDepartmentChat;
