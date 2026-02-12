import { useState } from "react";
import { Search, Send, Paperclip, Hash } from "lucide-react";

const groups = [
    {
        id: "finance-general",
        name: "Finance General",
        description: "Company-wide finance discussion",
    },
    {
        id: "budget-planning",
        name: "Budget Planning",
        description: "Annual & quarterly budgets",
    },
    {
        id: "payroll-compliance",
        name: "Payroll & Compliance",
        description: "Payroll, tax & statutory updates",
    },
    {
        id: "investor-updates",
        name: "Investor Updates",
        description: "Board & investor communication",
    },
    {
        id: "expense-approvals",
        name: "Expense Approvals",
        description: "High-value expense reviews",
    },
];

const initialMessages = {
    "finance-general": [
        {
            sender: "Finance Ops",
            text: "Welcome to Finance General channel.",
            time: "9:00 AM",
            mine: false,
        },
    ],
    "budget-planning": [
        {
            sender: "CFO Office",
            text: "Q4 budget planning starts next week.",
            time: "10:15 AM",
            mine: false,
        },
    ],
};

const CfoDepartmentChat = () => {
    const [activeGroup, setActiveGroup] = useState(groups[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const currentMessages = messages[activeGroup.id] || [];

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages((prev) => ({
            ...prev,
            [activeGroup.id]: [
                ...(prev[activeGroup.id] || []),
                {
                    sender: "You",
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
            <div className="w-80 border-r border-gray-300 bg-slate-50 flex flex-col">
                <div className="p-4 text-lg font-semibold">
                    Finance Channels
                </div>

                {/* Search */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
                        <Search size={16} className="text-slate-400" />
                        <input
                            placeholder="Search channels..."
                            className="w-full text-sm outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Channel List */}
                <div className="flex-1 space-y-1 px-2">
                    {groups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => setActiveGroup(group)}
                            className={`w-full flex items-start gap-3 rounded-lg px-3 py-2 text-left ${
                                activeGroup.id === group.id
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "hover:bg-slate-100"
                            }`}
                        >
                            <div className="mt-1">
                                <Hash size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-medium">
                                    {group.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {group.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* CHAT PANEL */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="border-b border-gray-300 px-6 py-4">
                    <div className="font-semibold text-lg">
                        #{activeGroup.name}
                    </div>
                    <div className="text-sm text-slate-500">
                        {activeGroup.description}
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50">
                    {currentMessages.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                                msg.mine
                                    ? "ml-auto bg-indigo-600 text-white"
                                    : "bg-slate-200 text-slate-800"
                            }`}
                        >
                            {!msg.mine && (
                                <div className="text-xs font-semibold mb-1">
                                    {msg.sender}
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
                            placeholder={`Message #${activeGroup.name}`}
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

export default CfoDepartmentChat;
