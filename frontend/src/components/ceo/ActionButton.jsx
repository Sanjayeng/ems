// eslint-disable-next-line no-unused-vars
const ActionButton = ({ icon: Icon, label }) => (
    <button className="flex items-center gap-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 px-4 py-2">
        <Icon size={16} />
        {label}
    </button>
);

export default ActionButton;
