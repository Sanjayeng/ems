import { useState } from "react";

import UserModal from "../../components/admin/UserModal";

import { MoreVertical, Plus } from "lucide-react";

const initialUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@company.com",
        role: "INTERN",
        status: "active",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@company.com",
        role: "TL",
        status: "active",
    },
    {
        id: 3,
        name: "Carol Williams",
        email: "carol@company.com",
        role: "MANAGER",
        status: "active",
    },
    {
        id: 4,
        name: "David Brown",
        email: "david@company.com",
        role: "CXO",
        status: "inactive",
    },
];

const AdminUserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [showAdd, setShowAdd] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    const addUser = (user) => {
        setUsers([...users, { ...user, id: Date.now() }]);
    };

    const updateUser = (updated) => {
        setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
    };

    const deleteUser = (id) => {
        setUsers(users.filter((u) => u.id !== id));
        setOpenMenuId(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-slate-500">Manage system users</p>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 rounded bg-slate-900 px-4 py-2 text-white"
                >
                    <Plus size={16} />
                    Add User
                </button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-300 bg-white">
                <table className="w-full text-sm rounded-xl">
                    <thead className="text-left text-slate-500 overflow-hidden">
                        <tr>
                            <th className="p-4">User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="pr-6 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t border-gray-300">
                                <td className="p-4 font-medium">{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className="rounded-full border border-gray-300 bg- bg-slate-200 px-3 py-1 text-xs font-medium">
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            u.status === "active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                        {u.status}
                                    </span>
                                </td>

                                {/* Actions Dropdown */}
                                <td className="pr-6 text-right relative">
                                    <button
                                        onClick={() =>
                                            setOpenMenuId(
                                                openMenuId === u.id
                                                    ? null
                                                    : u.id,
                                            )
                                        }
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {openMenuId === u.id && (
                                        <div className="absolute right-6 mt-2 w-32 rounded-lg border border-gray-300 bg-white z-20 shadow">
                                            <button
                                                onClick={() => {
                                                    setEditUser(u);
                                                    setOpenMenuId(null);
                                                }}
                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteUser(u.id)}
                                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {showAdd && (
                <UserModal
                    title="Add User"
                    user={{
                        name: "",
                        email: "",
                        role: "INTERN",
                        status: "active",
                    }}
                    onClose={() => setShowAdd(false)}
                    onSave={addUser}
                />
            )}

            {editUser && (
                <UserModal
                    title="Edit User"
                    user={editUser}
                    onClose={() => setEditUser(null)}
                    onSave={updateUser}
                />
            )}
        </div>
    );
};

export default AdminUserManagement;
