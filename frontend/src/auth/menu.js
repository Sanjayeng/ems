const MENU = {
    intern: [
        "dashboard",
        "my-tasks",
        "submissions",
        "meetings",
        "chat",
        "profile",
    ],
     team_lead: [
        { path: "dashboard", label: "Dashboard" },
        { path: "intern-tasks", label: "Intern Tasks" },
        { path: "submissions-review", label: "Submission Reviews" },
        { path: "meetings", label: "Meetings" },
        { path: "department-chat", label: "Department Chat" }
    ],
    manager: ["dashboard", "analytics", "reports", "meetings", "chat"],
    admin: ["dashboard", "users", "settings"],
    cto: [
        "dashboard",
        "organization",
        "analytics",
        "reports",
        "chat",
        "settings",
    ],
    cfo: [
        "dashboard",
        "organization",
        "analytics",
        "reports",
        "chat",
        "settings",
    ],
    coo: [
        "dashboard",
        "organization",
        "analytics",
        "reports",
        "chat",
        "settings",
    ],
    ceo: [
        "dashboard",
        "technical",
        "operations",
        "finance",
        "meetings",
        "analytics",
        "reports",
        "announcements",
        "chat",
        "settings",
    ],
};

export { MENU };
