"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  status: number;
  message: string;
  data: {
    totalFroms: number;
    totalSubmission: number;
  };
}

export default function DashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
        const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
        const token = btoa(`${username}:${password}`);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!stats) return <p className="text-red-500">Failed to load data</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Welcome Admin</h1>

      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold text-gray-300">Total Forms</h2>
          <p className="text-4xl mt-4 font-semibold text-white">
            {stats.data.totalFroms}
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold text-gray-300">Total Submissions</h2>
          <p className="text-4xl mt-4 font-semibold text-white">
            {stats.data.totalSubmission}
          </p>
        </div>
      </div>
    </div>
  );
}
