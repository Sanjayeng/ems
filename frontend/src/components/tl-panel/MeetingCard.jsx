import MeetingStatusBadge from "./MeetingStatusBadge";

const MeetingCard = ({ meeting, joinOnly = false }) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <h3 className="font-medium text-slate-900">{meeting.title}</h3>

            <p className="text-sm text-slate-600">
                <strong>Date & Time:</strong> {meeting.datetime}
            </p>

            <p className="text-sm text-slate-600">
                <strong>Participants:</strong> {meeting.participants.join(", ")}
            </p>

            <div className="flex items-center justify-between pt-2">
                <MeetingStatusBadge value={meeting.status} />

                <button className="rounded bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700">
                    {joinOnly ? "Join" : "Start"}
                </button>
            </div>
        </div>
    );
};

export default MeetingCard;
