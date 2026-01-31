// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, trend, icon: Icon }) => {
    return (
        <div className="rounded-xl border border-gray-300 bg-white p-6 flex justify-between">
            <div>
                <p className="text-slate-500">{title}</p>
                <p className="text-3xl font-bold mt-2">{value}</p>
                {trend && (
                    <p className="text-green-600 text-sm mt-2">{trend}</p>
                )}
            </div>

            <div className="h-12 w-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Icon size={22} />
            </div>
        </div>
    );
};

export default StatCard;
