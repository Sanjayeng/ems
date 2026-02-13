import { useState, useRef } from "react";
import {
    Search,
    Send,
    Paperclip,
    Hash,
    ChevronDown,
    Users,
    Briefcase,
    File,
    UserCircle
} from "lucide-react";

/* OPERATIONS DATA */
const opsData = {
    managers: [
        { id: 1, name: "Sarah Lee", role: "Ops Manager", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 2, name: "Michael O'Connell", role: "Logistics Head", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, name: "Emily Davis", role: "Supply Chain", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    ],
    channels: [
        { id: "ops-general", name: "Operations General", description: "General operations discussion", type: "channel" },
        { id: "daily-updates", name: "Daily Ops Updates", description: "Execution & status updates", type: "channel" },
        { id: "incidents", name: "Incidents & Escalations", description: "Urgent operational issues", type: "channel" },
    ],
    group: {
        id: "ops-team-group",
        name: "Operations Core Group",
        role: "Team Chat",
        avatar: "https://ui-avatars.com/api/?name=OC&background=4f46e5&color=fff",
        type: "group"
    },
};

const initialMessages = {
    "ops-general": [
        { from: "System", text: "Welcome to Operations General.", time: "9:00 AM", mine: false },
    ],
    1: [{ from: "Sarah Lee", text: "Did you review the logistics report?", time: "10:15 AM", mine: false }],
    "ops-team-group": []
};

const CooDepartmentChat = () => {
    const [activeChat, setActiveChat] = useState(opsData.channels[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const [groupMembers, setGroupMembers] = useState(opsData.managers); 
    const [showAddModal, setShowAddModal] = useState(false);
    const fileInputRef = useRef(null);

    const currentMessages = messages[activeChat.id] || [];

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            from: "You",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            mine: true,
            type: "text",
        };

        setMessages((prev) => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
        }));
        setInput("");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newFileMessage = {
            from: "You",
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            mine: true,
            type: "file",
        };

        setMessages((prev) => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newFileMessage],
        }));
        e.target.value = null;
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-xl border border-gray-300 bg-white overflow-hidden font-sans">
            {/* LEFT PANEL: NAVIGATION */}
            <div className="w-80 border-r border-gray-300 bg-slate-50 flex flex-col overflow-y-auto">
                <div className="p-4 font-bold text-xl text-slate-800 border-b border-gray-200">
                    Operations Hub
                </div>

                {/* SEARCH */}
                <div className="p-4">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm">
                        <Search size={16} className="text-slate-400" />
                        <input placeholder="Search chat..." className="w-full text-sm outline-none" />
                    </div>
                </div>

                {/* CHANNELS */}
                <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Hash size={14} /> Channels
                </div>
                <div className="mt-2 space-y-1 px-2">
                    {opsData.channels.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveChat(c)}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                                activeChat.id === c.id ? "bg-indigo-600 text-white" : "hover:bg-slate-200 text-slate-700"
                            }`}
                        >
                            <Hash size={18} className={activeChat.id === c.id ? "text-white" : "text-slate-400"} />
                            <span className="text-sm font-medium">{c.name}</span>
                        </button>
                    ))}
                </div>

                {/* GROUP CHAT */}
                <div className="mt-6 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Team Groups</div>
                <div className="mt-2 px-2">
                    <button
                        onClick={() => setActiveChat(opsData.group)}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                            activeChat.id === opsData.group.id ? "bg-indigo-600 text-white" : "hover:bg-slate-200"
                        }`}
                    >
                        <img src={opsData.group.avatar} className="h-9 w-9 rounded-full border border-gray-200" alt="group" />
                        <div>
                            <div className="text-sm font-medium">{opsData.group.name}</div>
                            <div className={`text-xs ${activeChat.id === opsData.group.id ? "text-indigo-100" : "text-slate-500"}`}>
                                {opsData.group.role}
                            </div>
                        </div>
                    </button>
                </div>

                {/* INDIVIDUAL MANAGERS */}
                <div className="mt-6 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <ChevronDown size={14} /> Ops Managers
                </div>
                <div className="mt-2 space-y-1 px-2 mb-4">
                    {opsData.managers.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setActiveChat({ ...m, type: "individual" })}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                                activeChat.id === m.id ? "bg-indigo-600 text-white" : "hover:bg-slate-200"
                            }`}
                        >
                            <img src={m.avatar} className="h-9 w-9 rounded-full border border-gray-200" alt="user" />
                            <div>
                                <div className="text-sm font-medium">{m.name}</div>
                                <div className={`text-xs ${activeChat.id === m.id ? "text-indigo-100" : "text-slate-500"}`}>
                                    {m.role}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL: CHAT WINDOW */}
            <div className="flex flex-1 flex-col bg-white">
                {/* CHAT HEADER */}
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4 bg-white">
                    <div className="flex items-center gap-3">
                        {activeChat.avatar ? (
                            <img src={activeChat.avatar} className="h-10 w-10 rounded-full" alt="avatar" />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <Hash size={20} />
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-slate-800">{activeChat.name}</div>
                            <div className="text-xs text-slate-500">
                                {activeChat.description || activeChat.role} 
                                {activeChat.type === "group" && ` • ${groupMembers.length} Members`}
                            </div>
                        </div>
                    </div>
                    
                    {activeChat.type === "group" && (
                        <button 
                            onClick={() => setShowAddModal(true)}
                            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
                        >
                            + Add Members
                        </button>
                    )}
                </div>

                {/* MESSAGE AREA */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50/50">
                    {currentMessages.map((m, i) => (
                        <div key={i} className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                m.mine ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-slate-800"
                            }`}>
                                {!m.mine && (activeChat.type === "group" || activeChat.type === "channel") && (
                                    <div className="text-[10px] font-bold uppercase mb-1 opacity-60">
                                        {m.from}
                                    </div>
                                )}
                                
                                {m.type === "file" ? (
                                    <a href={m.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium underline decoration-indigo-200">
                                        <File size={16} /> {m.fileName}
                                    </a>
                                ) : (
                                    m.text
                                )}
                                <div className={`text-[10px] mt-1 text-right opacity-70 ${m.mine ? "text-indigo-100" : "text-slate-400"}`}>
                                    {m.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CHAT INPUT */}
                <div className="border-t border-gray-200 px-4 py-4 bg-white">
                    <div className="flex items-center gap-3">
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <Paperclip size={20} />
                        </button>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder={`Message ${activeChat.name}...`}
                            className="flex-1 bg-slate-100 border-none rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 shadow-md transition-all active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ADD MEMBERS MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-[400px] p-6 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4 text-slate-800">Add to Operations Group</h2>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {opsData.managers.map((person) => (
                                <div key={person.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <img src={person.avatar} className="h-10 w-10 rounded-full" alt="user" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-700">{person.name}</div>
                                            <div className="text-xs text-slate-500">{person.role}</div>
                                        </div>
                                    </div>
                                    <button className="bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-bold hover:bg-emerald-600 transition-colors">
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowAddModal(false)} className="w-full mt-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CooDepartmentChat;