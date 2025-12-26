export default function History({ history }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-bold mb-3">Request History (Last 10)</h3>
      {history.map((h, i) => (
        <div key={i} className="text-sm mb-1">
          {h.method} — {h.url}
        </div>
      ))}
    </div>
  );
}
