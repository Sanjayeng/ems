import MeetingStatusBadge from "./MeetingStatusBadge";
import { useNavigate } from "react-router-dom";

const MeetingCard = ({ meeting, joinOnly = false }) => {
    const navigate = useNavigate();
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

                <button
                 onClick={() => navigate(`/team_lead/tl-meeting-room/${meeting.id}`)} 
                // disabled={meeting.status !== "Scheduled"}
                 className="rounded bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700">
                    {joinOnly ? "Join" : "Start"}
                </button>
            </div>
        </div>
    );
};

export default MeetingCard;
