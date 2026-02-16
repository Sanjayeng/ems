import { useState, useRef } from "react";
import { Send, Paperclip, File } from "lucide-react";

const teamLeadGroup = {
    id: "tl-group",
    name: "Team Lead Department",
    role: "Internal Team Communication",
    avatar: "https://ui-avatars.com/api/?name=TL",
};

const initialMessages = {
    "tl-group": [
        {
            from: "System",
            text: "Welcome to the Team Lead Department chat.",
            time: "09:00 AM",
            mine: false,
            type: "text",
        },
    ],
};

const TlDepartmentChat = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const fileInputRef = useRef(null);

    const currentMessages = messages[teamLeadGroup.id] || [];

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
            [teamLeadGroup.id]: [
                ...prev[teamLeadGroup.id],
                newMessage,
            ],
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
            [teamLeadGroup.id]: [
                ...prev[teamLeadGroup.id],
                newMessage,
            ],
        }));

        e.target.value = null;
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            
            {/* LEFT PANEL */}
            <div className="w-80 border-r border-gray-200 bg-slate-50">
                <div className="p-5 text-lg font-semibold">
                    Team Lead Chat
                </div>

                <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Department
                </div>

                <div className="mt-3 px-2">
                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-slate-200">
                        <img
                            src={teamLeadGroup.avatar}
                            className="h-10 w-10 rounded-full"
                            alt={teamLeadGroup.name}
                        />
                        <div>
                            <div className="text-sm font-medium">
                                {teamLeadGroup.name}
                            </div>
                            <div className="text-xs text-slate-500">
                                {teamLeadGroup.role}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-1 flex-col">
                
                {/* HEADER */}
                <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4 bg-white">
                    <img
                        src={teamLeadGroup.avatar}
                        className="h-10 w-10 rounded-full"
                        alt={teamLeadGroup.name}
                    />
                    <div>
                        <div className="font-semibold text-base">
                            {teamLeadGroup.name}
                        </div>
                        <div className="text-sm text-slate-500">
                            {teamLeadGroup.role}
                        </div>
                    </div>
                </div>

                {/* MESSAGE AREA */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-slate-50">
                    {currentMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                                msg.mine
                                    ? "ml-auto bg-blue-600 text-white"
                                    : "bg-white border border-gray-200"
                            }`}
                        >
                            {!msg.mine && (
                                <div className="text-xs font-semibold mb-1 text-slate-500">
                                    {msg.from}
                                </div>
                            )}

                            {msg.type === "file" ? (
                                <a
                                    href={msg.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 underline"
                                >
                                    <File size={16} />
                                    {msg.fileName}
                                </a>
                            ) : (
                                msg.text
                            )}

                            <div className="text-xs mt-2 text-right opacity-60">
                                {msg.time}
                            </div>
                        </div>
                    ))}
                </div>

                {/* INPUT AREA */}
                <div className="border-t border-gray-200 px-4 py-4 bg-white">
                    <div className="flex items-center gap-3">
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
                            placeholder="Write a message..."
                            className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TlDepartmentChat;
