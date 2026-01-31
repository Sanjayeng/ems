import { useState, useRef, useEffect } from "react";

import { Send } from "lucide-react";

import Avatar from "../../components/manager/Avatar";
import MessageBubble from "../../components/manager/MessageBubble";

const members = [
    {
        id: 1,
        name: "John Williams",
        role: "Team Lead",
        avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 2,
        name: "Sophia Kim",
        role: "Intern",
        avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: 3,
        name: "Alex Turner",
        role: "Manager",
        avatar: "https://i.pravatar.cc/150?img=45",
    },
    {
        id: 4,
        name: "Emma Brown",
        role: "HR",
        avatar: "", // no image → fallback to initials
    },
];

const initialMessages = {
    1: [
        { from: "them", text: "Hey, did you complete the task?" },
        { from: "me", text: "Yes, I submitted it yesterday." },
    ],
    2: [
        { from: "me", text: "Hello!" },
        { from: "them", text: "Hi 👋" },
    ],
    3: [],
    4: [{ from: "them", text: "Welcome to the team!" }],
};

const ManagerDepartmentChat = () => {
    const [activeMember, setActiveMember] = useState(members[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeMember, messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages((prev) => ({
            ...prev,
            [activeMember.id]: [
                ...(prev[activeMember.id] || []),
                { from: "me", text: input },
            ],
        }));

        setInput("");
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {/* ---------------- MEMBERS PANEL ---------------- */}
            <div className="w-72 border-r border-slate-200">
                <div className="p-4 py-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Members
                    </h2>
                </div>

                <div className="divide-y divide-gray-300">
                    {members.map((member) => (
                        <button
                            key={member.id}
                            onClick={() => setActiveMember(member)}
                            className={`flex w-full items-center gap-3 p-4 text-left hover:bg-slate-100 transition ${
                                activeMember.id === member.id
                                    ? "bg-slate-100"
                                    : ""
                            }`}
                        >
                            <Avatar user={member} />

                            <div>
                                <p className="font-medium text-slate-900">
                                    {member.name}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {member.role}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------------- CHAT AREA ---------------- */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                    <Avatar user={activeMember} />

                    <div>
                        <p className="font-medium text-slate-900">
                            {activeMember.name}
                        </p>
                        <p className="text-sm text-slate-500">
                            {activeMember.role}
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-4">
                    {(messages[activeMember.id] || []).length === 0 ? (
                        <p className="text-center text-slate-400 text-sm">
                            No messages yet
                        </p>
                    ) : (
                        messages[activeMember.id].map((msg, idx) => (
                            <MessageBubble key={idx} msg={msg} />
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                        />
                        <button
                            onClick={handleSend}
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
