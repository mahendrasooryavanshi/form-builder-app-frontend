"use client";

export default function FormsListClient({ forms, deleteFormAction }: any) {
  const handleDelete = async (id: string) => {
    if (!confirm("Delete form?")) return;

    await deleteFormAction(id); // call server action
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {forms.map((form: any, index: number) => (
        <div
          key={form._id}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all duration-200"
        >
          {/* Number + Title Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Tittle: {form.title}
            </h2>
          </div>

          {/* Description */}
          <div className="mt-3">
            <label className="text-sm text-gray-400">Description</label>
            <p className="text-gray-300 mt-1">
              {form.description || "No description provided"}
            </p>
          </div>

          {/* Fields Count */}
          <div className="mt-3">
            <label className="text-sm text-gray-400">Fields Count</label>
            <p className="text-gray-300 mt-1">{form.fields?.length || 0}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5 justify-end">
            <a
              href={`/admin/forms/${form._id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              View Form
            </a>

            <a
              href={`/admin/forms/${form._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </a>

            <button
              onClick={() => handleDelete(form._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
