import EditFormClient from "./EditFormClient";

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params; // <-- FIX

  console.log("SERVER PARAMS >>>", formId);

  return <EditFormClient formId={formId} />;
}
