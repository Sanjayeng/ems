import { useState } from "react";
import { Search, Send, Paperclip, Hash } from "lucide-react";

/* MANAGER GROUP CHANNELS */
const channels = [
    {
        id: "team-updates",
        name: "Team Updates",
        description: "Daily standups & progress updates",
    },
    {
        id: "intern-coordination",
        name: "Intern Coordination",
        description: "Assign tasks & review submissions",
    },
    {
        id: "project-escalations",
        name: "Project Escalations",
        description: "Issues needing higher attention",
    },
    {
        id: "announcements",
        name: "Announcements",
        description: "Important leadership updates",
    },
];

/* INITIAL GROUP MESSAGES */
const initialMessages = {
    "team-updates": [
        {
            user: "John Williams",
            text: "Frontend module completed. Moving to API integration.",
            time: "9:15 AM",
        },
        {
            user: "You",
            text: "Great work. Please update the sprint board.",
            time: "9:20 AM",
            mine: true,
        },
    ],
    "intern-coordination": [
        {
            user: "Sophia Kim",
            text: "I’ve submitted the dashboard task for review.",
            time: "Yesterday",
        },
    ],
    "project-escalations": [],
    announcements: [
        {
            user: "CTO Office",
            text: "Quarterly review meeting scheduled for Friday.",
            time: "2 days ago",
        },
    ],
};

const ManagerDepartmentChat = () => {
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
        <div className="flex h-[calc(100vh-6rem)] rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {/* ---------------- LEFT SIDEBAR ---------------- */}
            <div className="w-72 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-5 text-lg font-semibold text-slate-900">
                    Manager Groups
                </div>

                {/* Search */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
                        <Search size={16} className="text-slate-400" />
                        <input
                            placeholder="Search channel..."
                            className="w-full text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Channel List */}
                <div className="px-2 space-y-1">
                    {channels.map((channel) => (
                        <button
                            key={channel.id}
                            onClick={() => setActiveChannel(channel)}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                                activeChannel.id === channel.id
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "hover:bg-slate-100"
                            }`}
                        >
                            <Hash size={16} />
                            <div>
                                <div className="text-sm font-medium">
                                    {channel.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {channel.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------------- RIGHT CHAT AREA ---------------- */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                    <Hash className="text-indigo-600" size={18} />
                    <div>
                        <div className="font-semibold text-slate-900">
                            {activeChannel.name}
                        </div>
                        <div className="text-sm text-slate-500">
                            {activeChannel.description}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-4 space-y-4">
                    {currentMessages.length === 0 && (
                        <div className="text-sm text-slate-400">
                            No messages yet
                        </div>
                    )}

                    {currentMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                                msg.mine
                                    ? "ml-auto bg-indigo-600 text-white"
                                    : "bg-slate-200 text-slate-800"
                            }`}
                        >
                            {!msg.mine && (
                                <div className="text-xs font-semibold mb-1">
                                    {msg.user}
                                </div>
                            )}
                            {msg.text}
                            <div className="mt-1 text-xs opacity-70 text-right">
                                {msg.time}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="border-t border-slate-200 px-4 py-3">
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
                            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
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

export default ManagerDepartmentChat;
