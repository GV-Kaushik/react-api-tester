import { useState } from "react";

const methodColors = {
  GET: "bg-green-600",
  POST: "bg-orange-500",
  PUT: "bg-blue-600",
  PATCH: "bg-purple-600",
  DELETE: "bg-red-600",
};

export default function RequestForm({
  setResponse,
  addToHistory,
  setLastRequest,
  envs,
}) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  const showBody = ["POST", "PUT", "PATCH"].includes(method);

  const finalEnvUrl = (u) =>
    u.replace(/{{(.*?)}}/g, (_, k) => {
      if (!(k in envs)) {
        throw new Error(`Environment variable ${k} is not defined`);
      }
      return envs[k];
    });

  async function sendRequest() {
    if (!url.trim()) {
      setResponse({ error: "URL cannot be empty" });
      return;
    }

    try {
      const start = Date.now();
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (showBody && body.trim()) options.body = body;

      let finalUrl;
      try {
        finalUrl = finalEnvUrl(url).replace(/^["']|["']$/g, "");
      } catch (err) {
        setResponse({ error: err.message });
        return;
      }

      const res = await fetch(finalUrl, options);
      const time = Date.now() - start;

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      const result = { status: res.status, time, data };
      setResponse(result);

      const req = { method, url: finalUrl, body: showBody ? body : "" };
      setLastRequest(req);
      addToHistory(req);
    } catch (err) {
      setResponse({ error: err.message });
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <div className="relative w-full md:w-36">
          <button
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex justify-between items-center px-4 py-2 rounded-lg
              text-white font-bold transition-all duration-200
              hover:brightness-110 active:scale-95
              ${methodColors[method]}`}
          >
            {method}
            <span
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          {open && (
            <div className="absolute z-20 mt-2 w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden animate-dropdown">
              {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                <div
                  key={m}
                  onClick={() => {
                    setMethod(m);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-white cursor-pointer
                    hover:bg-gray-700 transition
                    ${method === m ? "bg-gray-700" : ""}`}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://api.example.com or {{BASE_URL}}/posts/1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={sendRequest}
          className="bg-black text-white px-6 py-2 rounded-lg font-semibold
            hover:bg-gray-800 hover:scale-[1.02] active:scale-95
            transition w-full md:w-auto"
        >
          Send
        </button>
      </div>

      {showBody && (
        <textarea
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="6"
          placeholder="Request JSON Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}
    </div>
  );
}
