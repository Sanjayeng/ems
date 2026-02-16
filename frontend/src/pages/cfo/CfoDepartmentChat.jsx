import { useState, useRef } from "react";
import { Send, Paperclip, File } from "lucide-react";

const members = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Team Lead",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
        id: 2,
        name: "Olivia Smith",
        role: "Senior Executive",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
        id: 3,
        name: "William Brown",
        role: "Coordinator",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 4,
        name: "Sophia Davis",
        role: "Associate",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
];

const groupChat = {
    id: 100,
    name: "Department Group",
    role: "Group Chat",
    avatar: "https://ui-avatars.com/api/?name=DG",
};

const initialMessages = {
    100: [],
};

const CfoDepartmentChat = () => {
    const [activeChat, setActiveChat] = useState(members[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const [groupMembers, setGroupMembers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const fileInputRef = useRef(null);

    const currentMessages = messages[activeChat.id] || [];

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            from: "You",
            text: input,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
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

        const newMessage = {
            from: "You",
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            mine: true,
            type: "file",
        };

        setMessages((prev) => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
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
                    Department Chat
                </div>

                {/* Individual Members */}
                <div className="px-4 text-xs font-semibold text-slate-500">
                    Members
                </div>

                <div className="mt-2 space-y-1 px-2">
                    {members.map((person) => (
                        <button
                            key={person.id}
                            onClick={() => setActiveChat(person)}
                            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left ${
                                activeChat.id === person.id
                                    ? "bg-slate-200"
                                    : "hover:bg-slate-100"
                            }`}
                        >
                            <img
                                src={person.avatar}
                                className="h-9 w-9 rounded-full"
                            />
                            <div>
                                <div className="text-sm font-medium">
                                    {person.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {person.role}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Group Chat */}
                <div className="mt-6 px-4 text-xs font-semibold text-slate-500">
                    Group Chat
                </div>

                <div className="mt-2 px-2">
                    <button
                        onClick={() => setActiveChat(groupChat)}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left ${
                            activeChat.id === groupChat.id
                                ? "bg-slate-200"
                                : "hover:bg-slate-100"
                        }`}
                    >
                        <img
                            src={groupChat.avatar}
                            className="h-9 w-9 rounded-full"
                        />
                        <div>
                            <div className="text-sm font-medium">
                                {groupChat.name}
                            </div>
                            <div className="text-xs text-slate-500">
                                {groupChat.role}
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-1 flex-col">

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-gray-300 px-6 py-4">
                    <img
                        src={activeChat.avatar}
                        className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="font-semibold">
                            {activeChat.name}
                        </div>
                        <div className="text-sm text-slate-500">
                            {activeChat.role}
                            {activeChat.id === groupChat.id && (
                                <span className="ml-2">
                                    • {groupMembers.length} Members
                                </span>
                            )}
                        </div>
                    </div>

                    {activeChat.id === groupChat.id && (
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
                            onClick={() => fileInputRef.current.click()}
                            className="p-2 text-slate-400 hover:text-slate-600"
                        >
                            <Paperclip size={18} />
                        </button>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
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
                            Add Members to Group
                        </h2>

                        <div className="space-y-3">
                            {members.map((person) => {
                                const alreadyAdded = groupMembers.some(
                                    (m) => m.id === person.id
                                );

                                return (
                                    <div
                                        key={person.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={person.avatar}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            {person.name}
                                        </div>

                                        {!alreadyAdded ? (
                                            <button
                                                onClick={() =>
                                                    addToGroup(person)
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
                                onClick={() => setShowAddModal(false)}
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

export default CfoDepartmentChat;
