const Row = ({ children }) => (
    <div className="flex items-center justify-between rounded-xl border border-gray-300 p-4">
        <div className="flex items-center gap-4">{children.slice(0, 3)}</div>
        <div className="flex items-center gap-10">{children.slice(3)}</div>
    </div>
);

export default Row;
