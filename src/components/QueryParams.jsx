import { useState } from "react";

export default function QueryParams({ params, setParams }) {
  function addParam() {
    setParams((prev) => [...prev, { key: "", value: "" }]);
  }

  function updateParam(index, field, value) {
    setParams((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    );
  }

  function removeParam(index) {
    setParams((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      <h3 className="font-bold mb-3">Query Parameters</h3>

      {params.map((param, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="border p-2 rounded w-40"
            placeholder="Key"
            value={param.key}
            onChange={(e) =>
              updateParam(i, "key", e.target.value)
            }
          />
          <input
            className="border p-2 rounded flex-1"
            placeholder="Value"
            value={param.value}
            onChange={(e) =>
              updateParam(i, "value", e.target.value)
            }
          />
          <button
            onClick={() => removeParam(i)}
            className="text-red-600 font-bold px-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addParam}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        Add
      </button>
    </div>
  );
}
