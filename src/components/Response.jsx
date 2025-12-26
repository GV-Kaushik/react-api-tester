export default function Response({ response }) {
  if (!response) return null;

  if (response.error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 shadow">
        Error: {response.error}
      </div>
    );
  }

  let timeColor = "bg-green-100 text-green-700";
  if (response.time > 300) timeColor = "bg-yellow-100 text-yellow-700";
  if (response.time > 1000) timeColor = "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
            ${
              response.status < 400
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          Status: {response.status}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${timeColor}`}
        >
          Time: {response.time} ms
        </span>
      </div>

      <pre className="bg-slate-900 text-green-300 p-4 rounded-xl text-sm overflow-x-auto shadow-inner">
        {typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)}
      </pre>
    </div>
  );
}
