import { CheckSquare, Folder, Calendar, Timer } from "lucide-react";

import StatCard from "../../components/intern/StatCard";
import RecentActivity from "../../components/intern/RecentActivity";

import { Link } from "react-router-dom";

const InternDashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-slate-900">
                    Welcome back, User!
                </h1>
                <p className="mt-2 text-lg text-slate-500">
                    Here's what's happening in your workspace today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Assigned Tasks */}
                <Link to="/intern/my-tasks">
                    <StatCard
                        title="Assigned Tasks"
                        value="1"
                        subtitle="Active tasks pending completion."
                        icon={<CheckSquare />}
                        bg="bg-indigo-50"
                        iconBg="bg-indigo-100 text-indigo-600"
                        border="border-indigo-200"
                    />
                </Link>

                {/* Pending Submissions */}
                <Link to="/intern/submissions">
                    <StatCard
                        title="Pending Submissions"
                        value="03"
                        icon={<Folder />}
                        subtitle="Documents awaiting review."
                        bg="bg-sky-50"
                        iconBg="bg-sky-100 text-sky-600"
                        border="border-sky-200"
                    />
                </Link>

                {/* Meetings */}
                <Link to="/intern/meetings">
                    <StatCard
                        title="Upcoming Meetings"
                        value="02"
                        icon={<Calendar />}
                        subtitle="Scheduled for today"
                        bg="bg-emerald-50"
                        iconBg="bg-emerald-100 text-emerald-600"
                        border="border-emerald-200"
                    />
                </Link>

                {/* Active Timings */}
                <Link>
                    <StatCard
                        title="Total Time Spent Today"
                        value="01:30"
                        subtitle="Tracked active hours"
                        icon={<Timer />}
                        bg="bg-yellow-50"
                        iconBg="bg-yellow-100 text-yellow-600"
                        border="border-yellow-200"
                    />
                </Link>
            </div>
            {/* Recent Activity */}
            <div className="gap-6">
                <RecentActivity />
            </div>
        </div>
    );
};

export default InternDashboard;
