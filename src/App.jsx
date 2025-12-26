import { useState } from "react";
import RequestForm from "./components/RequestForm";
import Env from "./components/Env";
import Response from "./components/Response";
import CodeSnippet from "./components/CodeSnippet";
import History from "./components/History";

export default function App() {
  const [envs, setEnvs] = useState({});
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastRequest, setLastRequest] = useState(null);

  function addToHistory(req) {
    setHistory((prev) => [req, ...prev].slice(0, 10));
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Lightweight API Client
      </h1>

      <Env envs={envs} setEnvs={setEnvs} />

      <RequestForm
        envs={envs}
        setResponse={setResponse}
        addToHistory={addToHistory}
        setLastRequest={setLastRequest}
      />

      <Response response={response} />

      <CodeSnippet request={lastRequest} />

      <History history={history} />
    </div>
  );
}
