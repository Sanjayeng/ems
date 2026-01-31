const TeamProgressRow = ({ label, value }) => {
    return (
        <div className="mb-5">
            <div className="flex justify-between mb-1">
                <span className="font-medium">{label}</span>
                <span className="text-slate-500">{value}%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

export default TeamProgressRow;
