import { adminApi } from "../../lib/apiClient";

import FormsListClient from "./FormsListClient";

async function deleteFormOnServer(id: string) {
  "use server";
  await adminApi.delete(`/forms/${id}`);
}

export default async function FormsPage() {
  // const forms = await adminApi.get("/forms");
  const res = await adminApi.get("/forms");
  const forms = res.data; // ← FIX HERE

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Forms List</h1>

      <FormsListClient forms={forms} deleteFormAction={deleteFormOnServer} />
    </div>
  );
}
