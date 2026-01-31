import { Video, Calendar, Clock } from "lucide-react";

import { Link } from "react-router-dom";

const MeetingRow = ({ meeting }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            {/* Left */}
            <div className="space-y-1">
                <p className="font-medium text-slate-900">{meeting.title}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {meeting.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {meeting.time} ({meeting.duration})
                    </span>
                </div>

                <p className="text-sm text-slate-500">
                    Platform: {meeting.platform}
                </p>
            </div>

            {/* Right */}
            <Link
                href={meeting.link}
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
                <Video size={16} />
                Join
            </Link>
        </div>
    );
};

export default MeetingRow;
