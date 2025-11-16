import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(formData) {
    "use server";

    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "admin@123") {

        const cookieStore = await cookies();

        cookieStore.set("admin_auth", "true", {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24,  // 1 day
        });

        cookieStore.set("admin_user", username, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24,
        });

        redirect("/admin/dashboard");
    }

    return { error: "Invalid credentials" };
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black px-4 py-10">
            <div className="relative w-full max-w-md rounded-2xl shadow-2xl">

                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"></div>

                <div className="relative bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-2xl border border-white/20 shadow-lg">

                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 border border-white/40 shadow-xl backdrop-blur-xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-9 w-9 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M12 11c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2zM18 20c0-3.866-3.582-7-8-7s-8 3.134-8 7"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-center text-white tracking-wide mb-6 drop-shadow">
                        Admin Login
                    </h1>

                    <form action={loginAction} className="space-y-6">

                        <div>
                            <label className="block text-white/90 font-medium mb-2 text-sm">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-white/40"
                                placeholder="Enter Admin Username"
                            />
                        </div>

                        <div>
                            <label className="block text-white/90 font-medium mb-2 text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-white/40"
                                placeholder="Enter Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/40 transition-all active:scale-95 tracking-wide"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-white/70 text-xs mt-6">
                        Secure Admin Access Only
                    </p>
                </div>
            </div>
        </div>
    );
}
