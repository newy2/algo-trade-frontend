import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRedirectPath } from "../lib/useRedirectPath";
import { GET } from "../api/http";

export function HomePage() {
  const [pingMessages, setPingMessages] = useState<string[]>([]);
  const navigation = useNavigate();

  useRedirectPath();

  function onClickAboutButton() {
    navigation("/about?name=jay&groups=1&groups=2");
  }

  async function fetchData(path: string) {
    const response = await GET(path);
    setPingMessages([...pingMessages, response]);
  }

  console.log("import.meta.env", import.meta.env);

  return (
    <div>
      <h1 className="text-4xl text-blue-500">Home v7</h1>
      <div style={{ margin: "10px 0" }}>
        <button className="btn" onClick={onClickAboutButton}>
          Go About
        </button>
      </div>
      <div>
        <button className="btn" onClick={() => fetchData("/ping")}>
          FetchData
        </button>
      </div>
      <div>
        <div>ping message:</div>
        {pingMessages.map((each, index) => (
          <div key={index}>{each}</div>
        ))}
      </div>
      <button className="btn">헬로</button>
    </div>
  );
}
