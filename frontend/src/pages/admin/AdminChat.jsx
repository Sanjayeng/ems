import { useState } from "react";
import { useSelector } from "react-redux";
import {
    Search,
    Send,
    Paperclip,
    ChevronDown,
    Users,
    Briefcase,
    ShieldCheck,
    UserCircle,
    LayoutDashboard,
    MessageSquare,
    MoreVertical
} from "lucide-react";

const people = {
    managers: [
        {
            id: 1,
            name: "Sarah Lee",
            role: "Product Manager",
            online: true,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 2,
            name: "Michael O'Connell",
            role: "Sales Lead",
            online: true,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Engineering Lead",
            online: true,
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    // Updated panels based on your request
    departments: [
        { id: 4, name: "CEO Panel", icon: ShieldCheck },
        { id: 5, name: "CXO Panel", icon: LayoutDashboard },
        { id: 6, name: "Managers", icon: Briefcase },
        { id: 7, name: "Team Lead", icon: UserCircle },
        { id: 8, name: "Intern Panel", icon: Users },
    ],
};

const initialMessages = {
    1: [
        {
            from: "Sarah Lee",
            text: "Hi Admin, I've updated the system access logs for the new interns.",
            time: "8:35 PM",
            mine: false,
        },
        {
            from: "You",
            text: "Thanks Sarah. I'll verify the permissions now.",
            time: "8:40 PM",
            mine: true,
        },
    ],
};

const AdminChat = () => {
    const { name } = useSelector((state) => state.auth);
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
        <div className="flex h-[calc(100vh-6.5rem)] rounded-xl border border-gray-300 bg-white overflow-hidden shadow-sm">
            
            {/* --- LEFT PANEL: NAVIGATION --- */}
            <div className="w-80 border-r border-gray-300 bg-slate-50 flex flex-col">
                <div className="p-4">
                    <h2 className="font-bold text-xl text-slate-800">Admin Chat</h2>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 ring-blue-500/20 transition-all">
                        <Search size={16} className="text-slate-400" />
                        <input
                            placeholder="Search people or panels..."
                            className="w-full text-sm outline-none border-none focus:ring-0 p-0 bg-transparent"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Managers Section (Direct Messages) */}
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                        <ChevronDown size={12} /> Direct Messages
                    </div>

                    <div className="mt-1 space-y-1 px-2">
                        {people.managers.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setActiveUser(m)}
                                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                                    activeUser.id === m.id
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                        : "hover:bg-slate-200 text-slate-700"
                                }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={m.avatar}
                                        alt=""
                                        className="h-9 w-9 rounded-full object-cover border border-white/20"
                                    />
                                    {m.online && (
                                        <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 ${activeUser.id === m.id ? 'bg-green-400 border-blue-600' : 'bg-green-500 border-white'}`} />
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-sm font-semibold truncate leading-tight">{m.name}</div>
                                    <div className={`text-[10px] truncate uppercase font-medium ${activeUser.id === m.id ? 'text-blue-100' : 'text-slate-500'}`}>
                                        {m.role}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Panels Section (Groups) */}
                    <div className="mt-6 px-4 py-2 text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                        <ChevronDown size={12} /> Organization Panels
                    </div>

                    <div className="mt-1 space-y-1 px-2 pb-6">
                        {people.departments.map((d) => {
                            const Icon = d.icon;
                            return (
                                <button
                                    key={d.id}
                                    onClick={() => setActiveUser({ ...d, role: "Official Group", avatar: null })}
                                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                                        activeUser.id === d.id 
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                                        : "text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${activeUser.id === d.id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="font-semibold truncate">{d.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL: CHAT INTERFACE --- */}
            <div className="flex flex-1 flex-col bg-white">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white z-10">
                    <div className="flex items-center gap-3">
                        {activeUser.avatar ? (
                            <img
                                src={activeUser.avatar}
                                className="h-10 w-10 rounded-full object-cover border border-gray-100"
                                alt=""
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                               <MessageSquare size={20} />
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-slate-800 leading-tight">{activeUser.name}</div>
                            <div className="text-[11px] text-green-600 font-bold flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                {activeUser.role}
                            </div>
                        </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-[#F9FBFE]">
                    {currentMessages.length > 0 ? (
                        currentMessages.map((m, i) => (
                            <div key={i} className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}>
                                {!m.mine && (
                                    <span className="text-[10px] font-bold text-slate-400 mb-1 ml-1 uppercase">{m.from}</span>
                                )}
                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                                    m.mine
                                        ? "bg-blue-600 text-white rounded-tr-none"
                                        : "bg-white border border-gray-200 text-slate-800 rounded-tl-none"
                                }`}>
                                    {m.text}
                                </div>
                                <div className="mt-1.5 text-[10px] text-slate-400 px-1 font-medium italic">
                                    {m.time}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <div className="bg-slate-100 p-4 rounded-full mb-3">
                                <MessageSquare size={32} className="opacity-20" />
                            </div>
                            <p className="text-sm font-medium italic">No messages in this panel yet.</p>
                        </div>
                    )}
                </div>

                {/* Message Input Area */}
                <div className="border-t border-gray-200 px-6 py-5 bg-white">
                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl border border-gray-200 p-2 focus-within:border-blue-400 focus-within:ring-4 ring-blue-500/5 transition-all">
                        <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Paperclip size={20} />
                        </button>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder={`Message ${activeUser.name}...`}
                            className="flex-1 bg-transparent px-2 py-2 text-sm outline-none border-none focus:ring-0"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className={`rounded-xl px-5 py-2.5 font-bold text-sm transition-all flex items-center gap-2 ${
                                input.trim() 
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" 
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                        >
                            <span>Send</span>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChat;