import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRedirectPath } from "pages/home/lib/useRedirectPath";
import { fetchPingMessage } from "pages/home/api/fetchPingMessage";
import { useToast } from "shared/ui/toast";

export function HomePage() {
  const [pingMessages, setPingMessages] = useState<string[]>([]);
  const navigation = useNavigate();
  const { addToast } = useToast();

  useRedirectPath();

  function onClickAboutButton() {
    navigation("/about?name=jay&groups=1&groups=2");
  }

  async function fetchData(path: string) {
    const response = await fetchPingMessage(path);
    setPingMessages([...pingMessages, response.message]);
  }

  const handleSuccess = () => {
    addToast("success", "This is a success message!");
  };

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
      <button className="btn" onClick={handleSuccess}>
        토스트
      </button>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
      <div>H1111</div>
    </div>
  );
}
