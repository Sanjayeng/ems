import { useState } from "react";
import {
    Search,
    Send,
    Paperclip,
    ChevronDown,
    Users,
    Briefcase,
} from "lucide-react";

const people = {
    managers: [
        {
            id: 1,
            name: "Sarah Lee",
            role: "Product",
            online: true,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 2,
            name: "Michael O'Connell",
            role: "Sales",
            online: true,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Engineering",
            online: true,
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    departments: [
        { id: 4, name: "Executive Leadership", icon: Users },
        { id: 5, name: "Product Strategy", icon: Briefcase },
        { id: 6, name: "Marketing Team", icon: Briefcase },
    ],
};

const initialMessages = {
    1: [
        {
            from: "Sarah Lee",
            text: "Hi David, I've updated the Q3 roadmap based on yesterday's sync.",
            time: "8:35 PM",
            mine: false,
        },
        {
            from: "You",
            text: "Thanks Sarah. The new prioritization looks good. Let’s review it with the board next week.",
            time: "8:40 PM",
            mine: true,
        },
    ],
};
const CxoDepartmentChat = () => {
    const [activeUser, setActiveUser] = useState(people.managers[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const currentMessages = messages[activeUser.id] || [];

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages((prev) => ({
            ...prev,
            [activeUser.id]: [
                ...(prev[activeUser.id] || []),
                {
                    from: "You",
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
            {/* LEFT PANEL */}
            <div className="w-80 border-r border-gray-300 bg-slate-50 flex flex-col">
                <div className="p-4 font-semibold text-lg">
                    Organization Chat
                </div>

                {/* Search */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
                        <Search size={16} className="text-slate-400" />
                        <input
                            placeholder="Search..."
                            className="w-full text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Managers */}
                <div className="px-4 text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <ChevronDown size={14} /> Managers
                </div>

                <div className="mt-2 space-y-1 px-2">
                    {people.managers.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setActiveUser(m)}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left ${
                                activeUser.id === m.id
                                    ? "bg-slate-200"
                                    : "hover:bg-slate-100"
                            }`}
                        >
                            <div className="relative">
                                <img
                                    src={m.avatar}
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                                {m.online && (
                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-white" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">
                                    {m.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {m.role}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Departments */}
                <div className="mt-4 px-4 text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <ChevronDown size={14} /> Departments
                </div>

                <div className="mt-2 space-y-1 px-2">
                    {people.departments.map((d) => {
                        const Icon = d.icon;
                        return (
                            <div
                                key={d.id}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                                <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center">
                                    <Icon size={16} />
                                </div>
                                {d.name}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-gray-300 px-6 py-4">
                    <img
                        src={activeUser.avatar}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">{activeUser.name}</div>
                        <div className="text-sm text-slate-500">
                            {activeUser.role}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50">
                    {currentMessages.map((m, i) => (
                        <div
                            key={i}
                            className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                                m.mine
                                    ? "ml-auto bg-blue-600 text-white"
                                    : "bg-slate-200 text-slate-800"
                            }`}
                        >
                            {m.text}
                            <div className="mt-1 text-xs opacity-70 text-right">
                                {m.time}
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
                            placeholder="Type a message..."
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CxoDepartmentChat;
