import { addFieldAction } from "./actions";

export default function AddField({ params }: any) {
  const { id } = params;

  return (
    <form action={addFieldAction.bind(null, id)} className="space-y-4">

      <input name="label" className="bg-gray-800 p-3 rounded w-full" />

      <select name="type" className="bg-gray-800 p-3 rounded w-full">
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
      </select>

      <button className="bg-indigo-600 px-4 py-2 rounded">Add</button>
    </form>
  );
}
