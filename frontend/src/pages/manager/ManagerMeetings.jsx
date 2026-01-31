import { useState } from "react";
import MeetingCard from "../../components/manager/MeetingCard";
import CreateMeetingModal from "../../components/manager/CreateMeetingModal";

const Meetings = () => {
    const [showModal, setShowModal] = useState(false);

    const [myMeetings, setMyMeetings] = useState([
        {
            title: "Weekly Sync - Interns Group A",
            datetime: "Mon, Dec 29, 2025 at 10:00 AM",
            participants: ["John S.", "Sarah L.", "Emily C."],
            status: "Scheduled",
        },
        {
            title: "1-on-1 with David Lee",
            datetime: "Mon, Dec 29, 2025 at 1:30 PM",
            participants: ["David Lee"],
            status: "Ongoing",
        },
    ]);

    const managerMeetings = [
        {
            title: "Team Lead Monthly Sync",
            datetime: "Tue, Dec 30, 2025 at 11:00 AM",
            participants: ["All Team Leads", "Michael B. (Manager)"],
            status: "Scheduled",
        },
    ];

    const handleCreateMeeting = (newMeeting) => {
        setMyMeetings((prev) => [newMeeting, ...prev]);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Meetings</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white flex items-center gap-2"
                >
                    + Create Meeting
                </button>
            </div>

            {/* Created by Me */}
            <section className="space-y-4">
                <h2 className="font-medium text-lg">Meetings Created by Me</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myMeetings.map((m, i) => (
                        <MeetingCard key={i} meeting={m} />
                    ))}
                </div>
            </section>

            {/* Scheduled by Manager */}
            <section className="space-y-4">
                <h2 className="font-medium text-lg">
                    Meetings Scheduled by Manager
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {managerMeetings.map((m, i) => (
                        <MeetingCard key={i} meeting={m} />
                    ))}
                </div>
            </section>

            {/* Modal */}
            {showModal && (
                <CreateMeetingModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateMeeting}
                />
            )}
        </div>
    );
};

export default Meetings;
