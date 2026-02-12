import { useState, useRef } from "react";
import {
    Send,
    Paperclip,
    ChevronDown,
    Users,
    Briefcase,
    File,
} from "lucide-react";

const people = {
    managers: [
        {
            id: 1,
            name: "Sarah Lee",
            role: "Product",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 2,
            name: "Michael O'Connell",
            role: "Sales",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Engineering",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            id: 4,
            name: "Lebron James",
            role: "Product",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 5,
            name: "Morcus",
            role: "Engineering",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ],
    departments: [
        { id: 4, name: "Executive Leadership", icon: Users },
        { id: 5, name: "Product Strategy", icon: Briefcase },
        { id: 6, name: "Marketing Team", icon: Briefcase },
    ],
    group: {
        id: 100,
        name: "Executive Group",
        role: "Group Chat",
        avatar: "https://ui-avatars.com/api/?name=EG",
    },
};

const initialMessages = {
    1: [
        {
            from: "Sarah Lee",
            text: "Hi David, I've updated the roadmap.",
            time: "8:35 PM",
            mine: false,
            type: "text",
        },
    ],
    100: [],
};

const CeoOrganizationChat = () => {
    const [activeUser, setActiveUser] = useState(people.managers[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const [groupMembers, setGroupMembers] = useState([]); // ✅ EMPTY INIT
    const [showAddModal, setShowAddModal] = useState(false);
    const fileInputRef = useRef(null);

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
                    type: "text",
                },
            ],
        }));

        setInput("");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMessages((prev) => ({
            ...prev,
            [activeUser.id]: [
                ...(prev[activeUser.id] || []),
                {
                    from: "You",
                    fileName: file.name,
                    fileUrl: URL.createObjectURL(file),
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    mine: true,
                    type: "file",
                },
            ],
        }));

        e.target.value = null;
    };

    const addToGroup = (person) => {
        if (!groupMembers.some((m) => m.id === person.id)) {
            setGroupMembers([...groupMembers, person]);
        }
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-xl border border-gray-300 bg-white overflow-hidden">
            {/* LEFT PANEL */}
            <div className="w-80 border-r border-gray-300 bg-slate-50 flex flex-col overflow-y-auto">
                <div className="p-4 font-semibold text-lg">
                    Organization Chat
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
                            <img
                                src={m.avatar}
                                className="h-9 w-9 rounded-full"
                            />
                            <div>
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

                {/* Group Chat */}
                <div className="mt-4 px-4 text-xs font-semibold text-slate-500">
                    Group Chat
                </div>

                <div className="mt-2 px-2">
                    <button
                        onClick={() => setActiveUser(people.group)}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left ${
                            activeUser.id === people.group.id
                                ? "bg-slate-200"
                                : "hover:bg-slate-100"
                        }`}
                    >
                        <img
                            src={people.group.avatar}
                            className="h-9 w-9 rounded-full"
                        />
                        <div>
                            <div className="text-sm font-medium">
                                {people.group.name}
                            </div>
                            <div className="text-xs text-slate-500">
                                {people.group.role}
                            </div>
                        </div>
                    </button>
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
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer"
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
                        className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">
                            {activeUser.name}
                        </div>
                        <div className="text-sm text-slate-500">
                            {activeUser.role}
                            {activeUser.id === people.group.id && (
                                <span className="ml-2">
                                    • {groupMembers.length} Members
                                </span>
                            )}
                        </div>
                    </div>

                    {activeUser.id === people.group.id && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                        >
                            + Add People
                        </button>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50">
                    {currentMessages.map((m, i) => (
                        <div
                            key={i}
                            className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${
                                m.mine
                                    ? "ml-auto bg-blue-600 text-white"
                                    : "bg-slate-200"
                            }`}
                        >
                            {!m.mine &&
                                activeUser.id === people.group.id && (
                                    <div className="text-xs font-semibold mb-1">
                                        {m.from}
                                    </div>
                                )}

                            {m.type === "file" ? (
                                <a
                                    href={m.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 underline"
                                >
                                    <File size={16} />
                                    {m.fileName}
                                </a>
                            ) : (
                                m.text
                            )}

                            <div className="text-xs mt-1 text-right opacity-70">
                                {m.time}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="border-t border-gray-300 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                        />

                        <button
                            onClick={() =>
                                fileInputRef.current.click()
                            }
                            className="p-2 text-slate-400 hover:text-slate-600"
                        >
                            <Paperclip size={18} />
                        </button>

                        <input
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                sendMessage()
                            }
                            placeholder="Type a message..."
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add People Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-96 p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Add People to Group
                        </h2>

                        <div className="space-y-3">
                            {people.managers.map((person) => {
                                const alreadyAdded =
                                    groupMembers.some(
                                        (m) =>
                                            m.id === person.id
                                    );

                                return (
                                    <div
                                        key={person.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={
                                                    person.avatar
                                                }
                                                className="h-8 w-8 rounded-full"
                                            />
                                            {person.name}
                                        </div>

                                        {!alreadyAdded ? (
                                            <button
                                                onClick={() =>
                                                    addToGroup(
                                                        person
                                                    )
                                                }
                                                className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Add
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                Added
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() =>
                                    setShowAddModal(false)
                                }
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CeoOrganizationChat;
