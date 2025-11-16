

import { adminApi } from "../../lib/apiClient";

export default async function FormsList() {
  const response = await adminApi.get("/forms");
  const forms = response.data; 

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">All Forms</h1>

      <div className="space-y-4">
        {forms.map((form: any) => (
          <div
            key={form._id}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">{form.title}</h2>
            <p className="text-gray-400">{form.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-gray-500">
                Fields: {form.fields.length}
              </p>

              <a
                href={`/admin/forms/${form._id}`}
                className="px-3 py-1 bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Manage
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
