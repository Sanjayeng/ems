const Stats = ({ managers, leads }) => (
    <div className="flex gap-10 text-sm">
        <div>
            Managers
            <p className="">{managers}</p>
        </div>
        <div>
            Team Leads
            <p className="">{leads}</p>
        </div>
    </div>
);

export default Stats;
