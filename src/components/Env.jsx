import { useState } from "react";

export default function EnvManager({ envs, setEnvs }) {
  const [envKey, setEnvKey] = useState("");
  const [envValue, setEnvValue] = useState("");
  const [editingKey, setEditingKey] = useState(null);

  function saveEnv() {
    if (!envKey.trim()) return;

    setEnvs((prev) => ({
      ...prev,
      [envKey]: envValue,
    }));

    setEnvKey("");
    setEnvValue("");
    setEditingKey(null);
  }

  function editEnv(key) {
    setEnvKey(key);
    setEnvValue(envs[key]);
    setEditingKey(key);
  }

  function deleteEnv(key) {
    setEnvs((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    if (editingKey === key) {
      setEnvKey("");
      setEnvValue("");
      setEditingKey(null);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      <h3 className="font-bold mb-3">Environment Variables</h3>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          className="border p-2 rounded md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="KEY"
          value={envKey}
          onChange={(e) => setEnvKey(e.target.value)}
          disabled={editingKey !== null}
        />

        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="VALUE"
          value={envValue}
          onChange={(e) => setEnvValue(e.target.value)}
        />

        <button
          onClick={saveEnv}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingKey ? "Update" : "Add"}
        </button>
      </div>

      {Object.keys(envs).length === 0 ? (
        <p className="text-sm text-gray-500">No environment variables added.</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(envs).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between bg-slate-100 p-2 rounded"
            >
              <div className="text-sm break-all">
                <strong>{key}</strong> = {value}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editEnv(key)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEnv(key)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
