"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Shield, Lock, User, ArrowRight } from "lucide-react";

export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            username,
            password,
            callbackUrl: "/importer",
            redirect: true,
        });
        if (result?.error) {
            setError("Invalid credentials. Try admin / password");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                    <Shield size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Authentication</h1>
                <p className="text-slate-500 font-medium">Secure access to bulk management tools</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg text-center">{error}</p>}

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <User size={16} className="text-indigo-500" />
                        Username
                    </label>
                    <input
                        type="text"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Lock size={16} className="text-indigo-500" />
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
                >
                    <span>Sign In</span>
                    <ArrowRight size={20} />
                </button>
            </form>

            <p className="text-center text-xs text-slate-400 font-medium">
                Use <span className="text-slate-600 font-bold">admin</span> / <span className="text-slate-600 font-bold">password</span> to access the importer
            </p>
        </div>
    );
}
