import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { MENU } from "../auth/menu";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();

    const role = useSelector((state) => state.auth.role);
    console.log(role);
    if (!role) return null;

    return (
        <aside
            className="w-64 bg-[#090E1A] text-white min-h-screen flex flex-col fixed left-0 top-0 h-screen z-40 shadow-lg"
            style={{ width: 256 }}
        >
            <div className="flex items-center gap-3 px-4 py-4 mb-2 text-left text-white border-b border-gray-300/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold">
                    UN
                </div>
                <div className="leading-tight">
                    <p className="text-sm font-semibold">User Name</p>
                    <p className="text-xs text-slate-300 capitalize">{role}</p>
                </div>
            </div>

            <div className="flex-1 px-3">
                {MENU[role]?.map((item) => (
                    <NavLink
                        key={item}
                        to={`/${role}/${item}`}
                        className={({ isActive }) =>
                            `block px-3 ps-5 py-2 my-2 font-semibold rounded-lg capitalize transition-colors duration-150 ${
                                isActive
                                    ? "bg-[#10192D] text-blue-500"
                                    : "hover:bg-[#10192D]"
                            }`
                        }
                        end
                    >
                        {item.replace("-", " ")}
                    </NavLink>
                ))}
            </div>

            <button
                onClick={() => dispatch(logout())}
                className="text-red-500 font-semibold py-2 w-full bg-transparent hover:bg-red-900/20 transition-colors duration-150 border-t border-[#2d3748] mt-auto cursor-pointer"
            >
                Log Out
            </button>
        </aside>
    );
};

export default Sidebar;
