export default async function Submissions({ params }: any) {
  const { id } = params;

  const res = await fetch(
    `https://api.yourdomain.com/forms/${id}/submissions`,
    { cache: "no-store" }
  );

  const submissions = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>

      {submissions.map((s: any) => (
        <div className="bg-gray-800 p-4 rounded mb-4" key={s.id}>
          {Object.entries(s).map(([key, value]) => (
            <p key={key}>
              <strong>{key}: </strong> {String(value)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
