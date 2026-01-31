const StatCard = ({ title, value, subtitle, icon, bg, iconBg, border }) => {
    return (
        <div className={`relative rounded-2xl border ${border} ${bg} p-6`}>
            {/* Icon */}
            <div
                className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
            >
                {icon}
            </div>

            {/* Content */}
            <p className="text-lg font-medium text-slate-600">{title}</p>

            <p className="mt-2 text-4xl font-bold text-slate-900">{value}</p>

            {subtitle && (
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
        </div>
    );
};

export default StatCard;
