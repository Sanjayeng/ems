const Section = ({ title, children }) => {
    return (
        <div className="space-y-3">
            <h2 className="font-medium text-slate-700">{title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">{children}</div>
        </div>
    );
};

export default Section;
