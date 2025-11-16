export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-5 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <nav className="space-y-3">
          <a href="/admin/dashboard" className="block hover:text-indigo-400">
            Dashboard
          </a>

          <a href="/admin/forms" className="block hover:text-indigo-400">
            All Forms
          </a>

          <a href="/admin/forms/create" className="block hover:text-indigo-400">
            Create Form
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
