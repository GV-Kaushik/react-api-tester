import { useState } from "react";

export default function Env({ envs, setEnvs }) {
  const [envKey, setEnvKey] = useState("");
  const [envValue, setEnvValue] = useState("");

  function addEnv() {
    if (!envKey.trim()) return;

    setEnvs((prev) => ({ ...prev, [envKey]: envValue }));
    setEnvKey("");
    setEnvValue("");
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      <h3 className="font-bold mb-3">Environment Variables</h3>

      <div className="flex flex-col md:flex-row gap-2 mb-3">
        <input
          className="border p-2 rounded w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="KEY"
          value={envKey}
          onChange={(e) => setEnvKey(e.target.value)}
        />
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="VALUE"
          value={envValue}
          onChange={(e) => setEnvValue(e.target.value)}
        />
        <button
          onClick={addEnv}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <pre className="bg-slate-100 p-3 rounded text-sm overflow-x-auto break-all">
        {JSON.stringify(envs, null, 2)}
      </pre>
    </div>
  );
}
