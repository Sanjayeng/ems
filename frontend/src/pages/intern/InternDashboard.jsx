import { CheckSquare, Folder, Calendar, Timer, BarChart3 } from "lucide-react"; // Added BarChart3
import { useSelector } from "react-redux"; // To get the user's name

import StatCard from "../../components/intern/StatCard";
import RecentActivity from "../../components/intern/RecentActivity";

import { Link } from "react-router-dom";

const InternDashboard = () => {
    // Get user name from Redux to make the greeting dynamic
    const { name } = useSelector((state) => state.auth);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-slate-900">
                    Welcome back, {name || "User"}!
                </h1>
                <p className="mt-2 text-lg text-slate-500">
                    Here's your work summary for today and this week.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {/* 1. Assigned Tasks */}
                <Link to="/intern/my-tasks">
                    <StatCard
                        title="Assigned Tasks"
                        value="1"
                        subtitle="Active tasks pending"
                        icon={<CheckSquare />}
                        bg="bg-indigo-50"
                        iconBg="bg-indigo-100 text-indigo-600"
                        border="border-indigo-200"
                    />
                </Link>

                {/* 2. Pending Submissions */}
                <Link to="/intern/submissions">
                    <StatCard
                        title="Submissions"
                        value="03"
                        icon={<Folder />}
                        subtitle="Awaiting review"
                        bg="bg-sky-50"
                        iconBg="bg-sky-100 text-sky-600"
                        border="border-sky-200"
                    />
                </Link>

                {/* 3. Meetings */}
                <Link to="/intern/meetings">
                    <StatCard
                        title="Meetings"
                        value="02"
                        icon={<Calendar />}
                        subtitle="Scheduled for today"
                        bg="bg-emerald-50"
                        iconBg="bg-emerald-100 text-emerald-600"
                        border="border-emerald-200"
                    />
                </Link>

                {/* 4. DAILY WORK HOURS (The new addition 1) */}
                <div className="cursor-default">
                    <StatCard
                        title="Worked Today"
                        value="06h 30m"
                        subtitle="Daily Goal: 8h"
                        icon={<Timer />}
                        bg="bg-yellow-50"
                        iconBg="bg-yellow-100 text-yellow-600"
                        border="border-yellow-200"
                    />
                </div>

                {/* 5. WEEKLY WORK HOURS (The new addition 2) */}
                <div className="cursor-default">
                    <StatCard
                        title="Worked This Week"
                        value="32h 15m"
                        subtitle="Weekly Goal: 40h"
                        icon={<BarChart3 />}
                        bg="bg-purple-50"
                        iconBg="bg-purple-100 text-purple-600"
                        border="border-purple-200"
                    />
                </div>
            </div>

            {/* Optional: Visual Time Progress Bar Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Time Progress</h3>
                <div className="space-y-6">
                    {/* Daily Progress */}
                    <div>
                        <div className="flex justify-between mb-2 text-sm font-medium">
                            <span className="text-slate-600">Daily Progress</span>
                            <span className="text-indigo-600">81%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '81%' }}></div>
                        </div>
                    </div>

                    {/* Weekly Progress */}
                    <div>
                        <div className="flex justify-between mb-2 text-sm font-medium">
                            <span className="text-slate-600">Weekly Progress (Week 02)</span>
                            <span className="text-emerald-600">75%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="gap-6">
                <RecentActivity />
            </div>
        </div>
    );
};

export default InternDashboard;