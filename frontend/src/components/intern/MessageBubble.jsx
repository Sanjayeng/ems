const MessageBubble = ({ msg }) => {
    const isMe = msg.from === "me";

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-xs rounded-xl px-4 py-2 text-sm ${
                    isMe
                        ? "bg-indigo-600 text-white"
                        : "bg-white border border-slate-200 text-slate-900"
                }`}
            >
                {msg.text}
            </div>
        </div>
    );
};

export default MessageBubble;
