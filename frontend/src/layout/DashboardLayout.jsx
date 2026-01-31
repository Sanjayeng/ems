import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const SIDEBAR_WIDTH = 256; // 64 * 4 (w-64)
const TOPBAR_HEIGHT = 56; // 14 * 4 (h-14)

const DashboardLayout = () => {
    return (
        <div>
            <Sidebar />
            <Topbar />
            <div
                className="main-content"
                style={{
                    marginLeft: SIDEBAR_WIDTH,
                    marginTop: TOPBAR_HEIGHT,
                    minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
                }}
            >
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
