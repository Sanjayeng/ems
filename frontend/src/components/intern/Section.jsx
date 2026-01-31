const Section = ({ title, children }) => {
    return (
        <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {title}
            </h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
};

export default Section;
