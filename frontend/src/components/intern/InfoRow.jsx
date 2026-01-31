const InfoRow = ({ label, value }) => {
    return (
        <div className="flex justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-900">{value}</span>
        </div>
    );
};

export default InfoRow;
