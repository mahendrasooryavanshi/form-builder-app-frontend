"use client";

import { useEffect, useState } from "react";
import { updateFormAction } from "../../formActions";

type EditFormClientProps = {
  formId: string;
};
export default function EditFormClient({ formId }: EditFormClientProps) {
  // const { formId } = params; // THIS FIXES THE ERROR
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  console.log("inside edit form page");
  /** Load Existing Form */
  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch(`/api/admin/forms/${formId}`);
        const data = await res.json();
        console.log("data", res);
        setTitle(data.title);
        setDescription(data.description || "");
      } catch (err) {
        console.error("Failed to load form details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadForm();
  }, [formId]);

  /** Submit Update */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    const res = await updateFormAction(formId, formData);

    setSaving(false);

    if (res.success) {
      alert("Form updated successfully!");
    } else {
      alert(res.message || "Failed to update");
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;
  console.log(title, description, ">>>>>>>>> old data");
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl">
      <h1 className="text-3xl text-white font-bold mb-6">Edit Form</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-white">Title</label>
          <input
            className="p-3 w-full bg-gray-800 border border-gray-700 rounded text-white"
            value={title}
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white">Description</label>
          <textarea
            className="p-3 w-full bg-gray-800 border border-gray-700 rounded text-white"
            value={description}
            placeholder={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded text-white"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <hr className="my-6 border-gray-700" />

      <a
        href={`/admin/forms/${formId}`}
        className="text-indigo-400 hover:underline"
      >
        ← Back to Form Details
      </a>
    </div>
  );
}
