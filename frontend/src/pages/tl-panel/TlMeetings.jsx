import { useState } from "react";

import { Plus } from "lucide-react";

import MeetingCard from "../../components/tl-panel/MeetingCard";
import Section from "../../components/tl-panel/Section";
import CreateMeetingModal from "../../components/tl-panel/CreateMeetingModal";

const TlMeetings = () => {
    const [myMeetings, setMyMeetings] = useState([
        {
            id: 1,
            title: "Weekly Sync - Interns Group A",
            datetime: "Mon, Dec 29, 2025 at 10:00 AM",
            participants: ["John S.", "Sarah L.", "Emily C."],
            status: "Scheduled",
        },
        {
            id: 2,
            title: "1-on-1 with David Lee",
            datetime: "Mon, Dec 29, 2025 at 1:30 PM",
            participants: ["David Lee"],
            status: "Ongoing",
        },
    ]);

    const managerMeetings = [
        {
            id: 3,
            title: "Team Lead Monthly Sync",
            datetime: "Tue, Dec 30, 2025 at 11:00 AM",
            participants: ["All Team Leads", "Michael B. (Manager)"],
            status: "Scheduled",
        },
    ];

    const [open, setOpen] = useState(false);

    const addMeeting = (meeting) => {
        setMyMeetings((prev) => [...prev, { id: Date.now(), ...meeting }]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Meetings
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    Create Meeting
                </button>
            </div>

            {/* Meetings Created by Me */}
            <Section title="Meetings Created by Me">
                {myMeetings.map((m) => (
                    <MeetingCard key={m.id} meeting={m} />
                ))}
            </Section>

            {/* Meetings Scheduled by Manager */}
            <Section title="Meetings Scheduled by Manager">
                {managerMeetings.map((m) => (
                    <MeetingCard key={m.id} meeting={m} joinOnly />
                ))}
            </Section>

            {open && (
                <CreateMeetingModal
                    onClose={() => setOpen(false)}
                    onCreate={addMeeting}
                />
            )}
        </div>
    );
};

export default TlMeetings;
