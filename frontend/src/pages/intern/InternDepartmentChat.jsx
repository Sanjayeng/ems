import { useState, useRef, useEffect } from "react";
import { Send, Hash, Users } from "lucide-react"; // Hash icon for channels

import MessageBubble from "../../components/intern/MessageBubble";
import Avatar from "../../components/intern/Avatar";

/* ---------------- MOCK GROUPS ---------------- */
const groups = [
    { id: "general", name: "General Chat", description: "Main department discussion" },
    { id: "announcements", name: "Announcements", description: "Important updates only" },
    { id: "tech-support", name: "Tech Support", description: "Help with intern tools" },
    { id: "random", name: "Random", description: "Coffee breaks and fun" },
];

/* ---------------- INITIAL GROUP DATA ---------------- */
const initialGroupMessages = {
    general: [
        { from: "them", senderName: "John Williams", text: "Welcome to the General group!" },
        { from: "me", senderName: "You", text: "Happy to be here." },
    ],
    announcements: [
        { from: "them", senderName: "HR", text: "Meeting at 2 PM today." },
    ],
    "tech-support": [],
    random: [],
};

const InternDepartmentChat = () => {
    // Track which group is currently selected
    const [activeGroup, setActiveGroup] = useState(groups[0]);
    const [messages, setMessages] = useState(initialGroupMessages);
    const [input, setInput] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeGroup, messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages((prev) => ({
            ...prev,
            [activeGroup.id]: [
                ...(prev[activeGroup.id] || []),
                { from: "me", senderName: "You", text: input },
            ],
        }));

        setInput("");
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-2xl border border-slate-200 bg-white overflow-hidden">
            
            {/* ---------------- GROUPS SIDEBAR ---------------- */}
            <div className="w-72 border-r border-slate-200 bg-slate-50/30">
                <div className="p-4 py-6 border-b border-slate-200 bg-white">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Users size={20} className="text-indigo-600" />
                        Department Groups
                    </h2>
                </div>

                <div className="p-2 space-y-1">
                    {groups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => setActiveGroup(group)}
                            className={`flex w-full items-center gap-3 p-3 rounded-lg text-left transition ${
                                activeGroup.id === group.id
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            <Hash size={18} className={activeGroup.id === group.id ? "text-indigo-600" : "text-slate-400"} />
                            <div>
                                <p className="font-semibold text-sm">{group.name}</p>
                                <p className="text-[11px] opacity-70 truncate w-40">{group.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------------- CHAT AREA ---------------- */}
            <div className="flex flex-1 flex-col">
                {/* Group Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-4 bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                            <Hash size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">{activeGroup.name}</p>
                            <p className="text-xs text-slate-500">{activeGroup.description}</p>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-4">
                    {(messages[activeGroup.id] || []).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Hash size={40} className="mb-2 opacity-20" />
                            <p className="text-sm italic">No messages in #{activeGroup.id} yet.</p>
                        </div>
                    ) : (
                        messages[activeGroup.id].map((msg, idx) => (
                            <div key={idx} className="flex flex-col">
                                {msg.from === "them" && (
                                    <span className="text-[10px] font-bold text-indigo-600 ml-1 mb-1">
                                        {msg.senderName}
                                    </span>
                                )}
                                <MessageBubble msg={msg} />
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-200 p-4 bg-white">
                    <div className="flex items-center gap-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder={`Message #${activeGroup.name}`}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 shadow-md transition-all active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternDepartmentChat;