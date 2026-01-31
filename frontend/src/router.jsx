import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import { ROLES } from "./auth/roles";

/* Intern Pages */
import InternDashboard from "./pages/intern/InternDashboard";
import InternMyTasks from "./pages/intern/InternMyTasks";
import InternSubmissions from "./pages/intern/InternSubmissions";
import InternMeetings from "./pages/intern/InternMeetings";
import InternDepartmentChat from "./pages/intern/InternDepartmentChat";
import InternProfile from "./pages/intern/InternProfile";

/* Team Lead Pages */
import TlDashboard from "./pages/tl-panel/TlDashboard";
import TlInternTask from "./pages/tl-panel/TlInternTask";
import TlSubmissionsReview from "./pages/tl-panel/TlSubmissionsReview";
import TlMeetings from "./pages/tl-panel/TlMeetings";
import TlDepartmentChat from "./pages/tl-panel/TlDepartmentChat";

/* Manager Pages */
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerAnalytics from "./pages/manager/ManagerAnalytics";
import ManagerReports from "./pages/manager/ManagerReports";
import ManagerMeetings from "./pages/manager/ManagerMeetings";
import ManagerDepartmentChat from "./pages/manager/ManagerDepartmentChat";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminSettings from "./pages/admin/AdminSettings";

/* CRO Pages */
import CxoDashboard from "./pages/cxo/CxoDashboard";
import CxoOrganization from "./pages/cxo/CxoOrganization";
import CxoAnalytics from "./pages/cxo/CxoAnalytics";
import CxoReports from "./pages/cxo/CxoReports";
import CxoDepartmentChat from "./pages/cxo/CxoDepartmentChat";
import CxoSettings from "./pages/cxo/CxoSettings";

/* CEO Pages */
import CeoDashboard from "./pages/ceo/CeoDashboard";
import CeoTechnical from "./pages/ceo/CeoTechnical";
import CeoOperations from "./pages/ceo/CeoOperations";
import CeoFinance from "./pages/ceo/CeoFinance";
import CeoMeetings from "./pages/ceo/CeoMeetings";
import CeoAnalytics from "./pages/ceo/CeoAnalytics";
import CeoReports from "./pages/ceo/CeoReports";
import CeoAnnouncements from "./pages/ceo/CeoAnnouncements";
import CeoOrganizationChat from "./pages/ceo/CeoOrganizationChat";
import CeoSettings from "./pages/ceo/CeoSettings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },

    /* ================= INTERN ================= */
    {
        path: "/intern",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.INTERN]}>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <InternDashboard /> },
            { path: "my-tasks", element: <InternMyTasks /> },
            { path: "submissions", element: <InternSubmissions /> },
            { path: "meetings", element: <InternMeetings /> },
            { path: "chat", element: <InternDepartmentChat /> },
            { path: "profile", element: <InternProfile /> },
        ],
    },

    /* ================= TEAM LEAD ================= */
    {
        path: "/team_lead",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.TL]}>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <TlDashboard /> },
            { path: "intern-tasks", element: <TlInternTask /> },
            { path: "reviews", element: <TlSubmissionsReview /> },
            { path: "meetings", element: <TlMeetings /> },
            { path: "chat", element: <TlDepartmentChat /> },
        ],
    },

    /* ================= MANAGER ================= */
    {
        path: "/manager",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <ManagerDashboard /> },
            { path: "analytics", element: <ManagerAnalytics /> },
            { path: "reports", element: <ManagerReports /> },
            { path: "meetings", element: <ManagerMeetings /> },
            { path: "chat", element: <ManagerDepartmentChat /> },
        ],
    },

    /* ================= ADMIN ================= */
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "users", element: <AdminUserManagement /> },
            { path: "settings", element: <AdminSettings /> },
        ],
    },

    /* ================= CXO ================= */
    {
        path: "/cxo",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.CXO]}>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <CxoDashboard /> },
            { path: "organization", element: <CxoOrganization /> },
            { path: "analytics", element: <CxoAnalytics /> },
            { path: "reports", element: <CxoReports /> },
            { path: "chat", element: <CxoDepartmentChat /> },
            { path: "settings", element: <CxoSettings /> },
        ],
    },

    /* ================= CEO ================= */
    {
        path: "/ceo",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.CEO]}>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <CeoDashboard /> },
            { path: "technical", element: <CeoTechnical /> },
            { path: "operations", element: <CeoOperations /> },
            { path: "finance", element: <CeoFinance /> },
            { path: "meetings", element: <CeoMeetings /> },
            { path: "analytics", element: <CeoAnalytics /> },
            { path: "reports", element: <CeoReports /> },
            { path: "announcements", element: <CeoAnnouncements /> },
            { path: "chat", element: <CeoOrganizationChat /> },
            { path: "settings", element: <CeoSettings /> },
        ],
    },
]);
