import { cookies } from "next/headers";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function Dashboard() {
  const cookieStore = await cookies();
  const username = cookieStore.get("admin_user")?.value;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">
        Welcome, {username || "Admin"}
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* Cards */}
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold">Total Forms</h2>
          <p className="text-4xl mt-4 font-semibold">12</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold">Total Fields</h2>
          <p className="text-4xl mt-4 font-semibold">75</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold">Submissions</h2>
          <p className="text-4xl mt-4 font-semibold">350</p>
        </div>
      </div>
    </div>
  );
}
