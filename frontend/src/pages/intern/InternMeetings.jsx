import MeetingRow from "../../components/intern/MeetingRow";

const meetings = [
    {
        id: 1,
        title: "Daily Standup",
        date: "Feb 18, 2026",
        time: "10:00 AM",
        duration: "15 min",
        platform: "Google Meet",
        link: "#",
    },
    {
        id: 2,
        title: "UI Review with Team Lead",
        date: "Feb 18, 2026",
        time: "2:00 PM",
        duration: "30 min",
        platform: "Zoom",
        link: "#",
    },
    {
        id: 3,
        title: "Weekly Sync",
        date: "Feb 19, 2026",
        time: "11:00 AM",
        duration: "1 hr",
        platform: "Microsoft Teams",
        link: "#",
    },
];

const InternMeetings = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    Meetings
                </h1>
                <p className="mt-1 text-slate-500">
                    View and join your upcoming meetings
                </p>
            </div>

            {/* Meetings Card */}
            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 p-5">
                    <h2 className="font-medium text-slate-900">
                        Upcoming Meetings
                    </h2>
                </div>

                <div className="divide-y divide-gray-300">
                    {meetings.map((meeting) => (
                        <MeetingRow key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternMeetings;
