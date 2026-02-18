import { useState, useRef } from "react";
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
  MoreVertical,
  File,
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
    {
      id: 4,
      name: "Lebron James",
      role: "Product",
      online: false,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 5,
      name: "Morcus",
      role: "Engineering",
      online: false,
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
  const [groupMembers, setGroupMembers] = useState([]);
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
    <div className="flex h-[calc(100vh-6.5rem)] rounded-xl border border-gray-300 bg-white overflow-hidden shadow-sm">
      {/* --- LEFT PANEL: NAVIGATION --- */}
      <div className="w-80 border-r border-gray-300 bg-slate-50 flex flex-col">
        <div className="p-4">
          <h2 className="font-bold text-xl text-slate-800">
            Organization Chat
          </h2>
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
                    <span
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 ${activeUser.id === m.id ? "bg-green-400 border-blue-600" : "bg-green-500 border-white"}`}
                    />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold truncate leading-tight">
                    {m.name}
                  </div>
                  <div
                    className={`text-[10px] truncate uppercase font-medium ${activeUser.id === m.id ? "text-blue-100" : "text-slate-500"}`}
                  >
                    {m.role}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Group Chat Section */}
          <div className="mt-6 px-4 py-2 text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
            <ChevronDown size={12} /> Groups
          </div>
          <div className="mt-1 space-y-1 px-2">
            <button
              onClick={() => setActiveUser(people.group)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                activeUser.id === people.group.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "hover:bg-slate-200 text-slate-700"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={people.group.avatar}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover border border-white/20"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-semibold truncate leading-tight">
                  {people.group.name}
                </div>
                <div
                  className={`text-[10px] truncate uppercase font-medium ${activeUser.id === people.group.id ? "text-blue-100" : "text-slate-500"}`}
                >
                  {people.group.role}
                </div>
              </div>
            </button>
          </div>

          {/* Panels Section (Departments) */}
          <div className="mt-6 px-4 py-2 text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
            <ChevronDown size={12} /> Departments
          </div>

          <div className="mt-1 space-y-1 px-2 pb-6">
            {people.departments.map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() =>
                    setActiveUser({ ...d, role: "Department", avatar: null })
                  }
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                    activeUser.id === d.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${activeUser.id === d.id ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500"}`}
                  >
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
              <div className="font-bold text-slate-800 leading-tight">
                {activeUser.name}
              </div>
              <div className="text-[11px] text-green-600 font-bold flex items-center gap-1">
                {activeUser.online && (
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                )}
                {activeUser.role}
                {activeUser.id === people.group.id && (
                  <span className="ml-2 text-slate-400 font-normal">
                    • {groupMembers.length} Members
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeUser.id === people.group.id && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-200 text-xs font-bold transition-colors"
              >
                + Add People
              </button>
            )}
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-[#F9FBFE]">
          {currentMessages.length > 0 ? (
            currentMessages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}
              >
                {!m.mine && (
                  <span className="text-[10px] font-bold text-slate-400 mb-1 ml-1 uppercase">
                    {m.from}
                  </span>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                    m.mine
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 text-slate-800 rounded-tl-none"
                  }`}
                >
                  {m.type === "file" ? (
                    <a
                      href={m.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 underline hover:text-blue-100 transition-colors"
                    >
                      <File size={16} />
                      {m.fileName}
                    </a>
                  ) : (
                    m.text
                  )}
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
              <p className="text-sm font-medium italic">
                No messages in this chat yet.
              </p>
            </div>
          )}
        </div>

        {/* Message Input Area */}
        <div className="border-t border-gray-200 px-6 py-5 bg-white">
          <div className="flex items-center gap-3 bg-slate-50 rounded-2xl border border-gray-200 p-2 focus-within:border-blue-400 focus-within:ring-4 ring-blue-500/5 transition-all">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
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

      {/* Add People Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-96 p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Add People to Group
            </h2>

            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {people.managers.map((person) => {
                const alreadyAdded = groupMembers.some(
                  (m) => m.id === person.id,
                );

                return (
                  <div
                    key={person.id}
                    className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={person.avatar}
                        className="h-9 w-9 rounded-full object-cover shadow-sm"
                        alt=""
                      />
                      <span className="font-semibold text-slate-700 text-sm">
                        {person.name}
                      </span>
                    </div>

                    {!alreadyAdded ? (
                      <button
                        onClick={() => addToGroup(person)}
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      >
                        Add
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        Added
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-lg text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeoOrganizationChat;
