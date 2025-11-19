"use client";

import { useState } from "react";
import { createFormAction } from "../formActions";

interface Validation {
  min?: number;
  max?: number;
  regex?: string;
}

interface FieldOption {
  label: string;
  value: string;
  conditionalFields?: Field[];
}

interface Field {
  label: string;
  name: string;
  type: string;
  required: boolean;
  options?: FieldOption[];
  validation?: Validation;
  order: number;
}

export default function CreateFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Add a new empty field */
  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        label: "",
        name: "",
        type: "text",
        required: false,
        order: prev.length + 1,
        validation: {},
      },
    ]);
  };

  const updateField = <K extends keyof Field>(
    index: number,
    key: K,
    value: Field[K]
  ) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  /** Remove a field */
  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  /** Handle form submission */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.");
      return;
    }

    // Validate fields
    for (const field of fields) {
      if (!field.label.trim()) return alert("Each field needs a label.");
      if (!field.name.trim()) return alert("Each field needs a unique name.");
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("fields", JSON.stringify(fields));

      const res = await createFormAction(formData);

      if (!res.success) {
        alert("Failed: " + res.message);
        return;
      }

      alert("🎉 Form created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setFields([]);
    } catch (error) {
      console.error("Form creation error:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-white text-center">
        Create New Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-2 text-white font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter form title"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-2 text-white font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter form description"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 bg-gray-800 space-y-3 relative"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-white">
                  Field {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-red-400 hover:text-red-600 font-bold"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Label"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  required
                  className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  placeholder="Name (unique)"
                  value={field.name}
                  onChange={(e) => updateField(index, "name", e.target.value)}
                  required
                  className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="date">Date</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="select">Select</option>
                </select>

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(index, "required", e.target.checked)
                    }
                    className="accent-indigo-500 w-5 h-5"
                  />
                  Required
                </label>
              </div>

              <div>
                <input
                  type="text"
                  placeholder='Validation JSON (e.g. {"min":1,"max":100,"regex":"^\\S+$"})'
                  value={JSON.stringify(field.validation)}
                  onChange={(e) => {
                    try {
                      updateField(
                        index,
                        "validation",
                        JSON.parse(e.target.value)
                      );
                    } catch {}
                  }}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Field Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addField}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all hover:scale-105"
          >
            + Add Field
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg text-white font-bold shadow-lg transition-all hover:scale-105 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Form"}
          </button>
        </div>
      </form>
    </div>
  );
}
