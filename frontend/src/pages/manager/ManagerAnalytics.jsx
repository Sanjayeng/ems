import { TrendingUp, Users, BarChart3, Clock } from "lucide-react";

import MetricCard from "../../components/manager/MetricCard";

const ManagerAnalytics = () => {
    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
                <p className="text-slate-500 mt-1">
                    Department performance metrics
                </p>
            </div>

            {/* METRIC CARDS */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Productivity"
                    value="87%"
                    change="+5%"
                    icon={TrendingUp}
                />
                <MetricCard
                    title="Team Size"
                    value="45"
                    change="+2"
                    icon={Users}
                />
                <MetricCard
                    title="Projects Completed"
                    value="23"
                    change="+8"
                    icon={BarChart3}
                />
                <MetricCard
                    title="Avg Response Time"
                    value="2.4h"
                    change="-0.5h"
                    icon={Clock}
                    negative
                />
            </div>

            {/* PERFORMANCE OVERVIEW */}
            <div className="rounded-xl border border-gray-300 bg-white p-6">
                <h2 className="text-xl font-semibold mb-6">
                    Performance Overview
                </h2>

                <div className="flex h-72 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                    Charts will be displayed here
                </div>
            </div>
        </div>
    );
};

export default ManagerAnalytics;
