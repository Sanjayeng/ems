import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { mockUsers } from "../auth/mockUsers";
import { login } from "../redux/authSlice";

import { Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (user) => {
        dispatch(login(user));
        navigate(`/${user.role}/dashboard`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                {/* Header */}
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome back
                </h1>
                <p className="mt-1 text-slate-500">
                    Sign in to access your dashboard
                </p>

                {/* Form */}
                <div className="mt-6 space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Sign in */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition cursor-pointer">
                        Sign in <ArrowRight size={16} />
                    </button>
                </div>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-medium text-slate-400">
                        DEMO ACCOUNTS
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Demo buttons */}
                <div className="grid grid-cols-2 gap-3">
                    {mockUsers.map((u) => (
                        <button
                            key={u.email}
                            onClick={() => handleLogin(u)}
                            className="rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                        >
                            Login as {u.role}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Login;
