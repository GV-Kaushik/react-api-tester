import { useState } from "react";
import QueryParams from "./QueryParams";

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
  const [queryParams, setQueryParams] = useState([]);

  const showBody = ["POST", "PUT", "PATCH"].includes(method);

  const resolveEnv = (u) =>
    u.replace(/{{(.*?)}}/g, (_, k) => {
      if (!envs[k]) throw new Error(`Env variable ${k} not defined`);
      return envs[k];
    });

  function bulidStringAfterQuery() {
    const validParams = queryParams.filter((p) => p.key.trim());

    if (validParams.length === 0) return "";

    const search = new URLSearchParams();
    validParams.forEach((p) => search.append(p.key, p.value));

    return `?${search.toString()}`;
  }

  async function sendRequest() {
    if (!url.trim()) {
      setResponse({ error: "URL cannot be empty" });
      return;
    }

    try {
      const start = Date.now();

      const finalUrl =
        resolveEnv(url).replace(/^["']|["']$/g, "") + bulidStringAfterQuery();

      if (!finalUrl.startsWith("http")) {
        setResponse({ error: "Invalid URL" });
        return;
      }

      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (showBody && body.trim()) {
        options.body = body;
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

      setLastRequest({
        method,
        url: finalUrl,
        body: showBody ? body : "",
      });

      addToHistory({ method, url: finalUrl });
    } catch (err) {
      setResponse({ error: err.message });
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
          <div className="relative w-full md:w-36">
            <button
              onClick={() => setOpen((o) => !o)}
              className={`w-full flex justify-between items-center px-4 py-2 rounded-lg
                text-white font-bold transition-all
                hover:brightness-110 active:scale-95
                ${methodColors[method]}`}
            >
              {method} ▾
            </button>

            {open && (
              <div className="absolute z-20 mt-2 w-full bg-gray-900 rounded-xl shadow-2xl">
                {Object.keys(methodColors).map((m) => (
                  <div
                    key={m}
                    onClick={() => {
                      setMethod(m);
                      setOpen(false);
                    }}
                    className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="https://api.example.com or {{BASE_URL}}/posts"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={sendRequest}
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold
              hover:bg-gray-800 hover:scale-[1.02] transition"
          >
            Send
          </button>
        </div>

        {showBody && (
          <textarea
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400"
            rows="6"
            placeholder="Request JSON Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        )}
      </div>
      <QueryParams params={queryParams} setParams={setQueryParams} />
    </>
  );
}
