export default function CodeSnippet({ request }) {
  if (!request) return null;

  const { method, url, body } = request;
  const hasBody = body && body.trim();

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      <h3 className="font-bold mb-4">Code Snippets</h3>

      <pre className="bg-slate-100 p-3 rounded mb-3 overflow-x-auto">
        {`curl -X ${method} "${url}"${
          hasBody ? ` -H "Content-Type: application/json" -d '${body}'` : ""
        }`}
      </pre>

      <pre className="bg-slate-100 p-3 rounded mb-3 overflow-x-auto">
        {`fetch("${url}", {
  method: "${method}",
  headers: { "Content-Type": "application/json" }${
    hasBody ? `,\n  body: ${body}` : ""
  }
});`}
      </pre>

      <pre className="bg-slate-100 p-3 rounded overflow-x-auto">
        {`import requests

requests.${method.toLowerCase()}(
  "${url}"${hasBody ? `,\n  json=${body}` : ""}
)`}
      </pre>
    </div>
  );
}
