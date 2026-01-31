const StatusBadge = ({ value }) => {
    const map = {
        "In Progress": "bg-blue-100 text-blue-600",
        "Not Started": "bg-slate-100 text-slate-600",
        Completed: "bg-green-100 text-green-600",
    };
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${map[value]}`}
        >
            {value}
        </span>
    );
};

export default StatusBadge;
