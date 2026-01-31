const SummaryCard = ({ title, value, color = "slate" }) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">{title}</p>
            <p className={`mt-1 text-2xl font-semibold text-${color}-600`}>
                {value}
            </p>
        </div>
    );
};

export default SummaryCard;
