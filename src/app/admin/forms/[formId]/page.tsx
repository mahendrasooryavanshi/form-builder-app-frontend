const ADMIN_BASE = process.env.ADMIN_API_URL!;
const ADMIN_USER = process.env.ADMIN_USERNAME!;
const ADMIN_PASS = process.env.ADMIN_PASSWORD!;
import { adminApi } from "../../../lib/apiClient";
import Link from "next/link";
interface FormField {
  _id: string;
  label: string;
  type: string;
}

interface Form {
  _id: string;
  title: string;
  description: string;
  fields?: FormField[];
}

export default async function FormDetail({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  if (!formId) return <p className="text-red-500 p-4">Invalid Form ID</p>;

  let form: Form | null = null;

  try {
    const response = await adminApi.get(`/forms/${formId}`);
    form = response.data?.data ?? response.data;
  } catch (err: any) {
    return (
      <p className="text-red-500 p-4">
        Failed to load form. {err?.response?.data?.message || ""}
      </p>
    );
  }

  if (!form) return <p className="text-yellow-500 p-4">Form not found</p>;

  return (
    <div className="text-white p-4">
      {/* FORM TITLE + ACTIONS */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{form.title}</h1>
          <p className="text-gray-400">{form.description}</p>
        </div>

        <div className="flex gap-3">
          {/* Edit Form */}
          <Link
            href={`/admin/forms/${formId}/edit`}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
          >
            ✏ Edit Form
          </Link>

          {/* Add Field */}
          <Link
            href={`/admin/forms/${formId}/fields/create`}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-medium"
          >
            ➕ Add Field
          </Link>
        </div>
      </div>

      {/* FIELDS LIST */}
      <h2 className="text-xl font-semibold mb-4">Fields</h2>

      {form.fields?.length ? (
        <div className="space-y-4">
          {form.fields.map((field) => (
            <div
              key={field._id}
              className="p-4 bg-gray-800 rounded border border-gray-700"
            >
              <p className="font-semibold">{field.label}</p>
              <p className="text-gray-400 text-sm">{field.type}</p>

              <div className="mt-2 space-x-4">
                {/* Edit Field */}
                <Link
                  href={`/admin/forms/${formId}/fields/${field._id}/edit`}
                  className="text-indigo-400 hover:underline"
                >
                  Edit Field
                </Link>

                {/* Delete Field */}
                <Link
                  href={`/admin/forms/${formId}/fields/${field._id}/delete`}
                  className="text-red-400 hover:underline"
                >
                  Delete Field
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No fields found.</p>
      )}
    </div>
  );
}
