const ADMIN_BASE = process.env.ADMIN_API_URL!;
const ADMIN_USER = process.env.ADMIN_USERNAME!;
const ADMIN_PASS = process.env.ADMIN_PASSWORD!;
import { adminApi } from '../../../lib/apiClient';

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

//Server Component
export default async function FormDetail({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  console.log(formId, ">>>>>>>>>> form id")
  
  // Validate formId
  if (!formId) {
    return <div className="text-red-500">Invalid Form ID</div>;
  }
  // Fetch form details
  let form: Form | null = null;
  try {
    const response = await adminApi.get(`/forms/${formId}`);
    form = response.data?.data ?? response.data;
  } catch (err: any) {
    console.log('Error fetching form:', err.message || err);
    return (
      <div className="text-red-500">
        Failed to fetch form. {err.response?.data?.message || ''}
      </div>
    );
  }

  // Handle not found
  if (!form) {
    return <div className="text-yellow-500">Form not found</div>;
  }

  return (
    <div className="text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      <p className="text-gray-400">{form.description}</p>

      <a
        href={`/admin/forms/${form._id}/fields/create`}
        className="inline-block mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Field
      </a>

      <h2 className="text-xl font-semibold mt-8 mb-4">Fields</h2>
      {form.fields && form.fields.length > 0 ? (
        <div className="space-y-4">
          {form.fields.map((field) => (
            <div
              key={field._id}
              className="p-4 bg-gray-800 rounded border border-gray-700"
            >
              <p className="font-semibold">{field.label}</p>
              <p className="text-gray-400 text-sm">{field.type}</p>

              <div className="mt-2 space-x-4">
                <a
                  href={`/admin/forms/${form._id}/fields/${field._id}`}
                  className="text-indigo-400 hover:underline"
                >
                  Edit
                </a>
                <a
                  href={`/admin/forms/${form._id}/fields/${field._id}/delete`}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </a>
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
