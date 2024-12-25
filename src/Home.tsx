import {useNavigate, useSearchParams} from "react-router-dom"
import {useEffect, useState} from "react";

function decodeBase64(base64String: string) {
  try {
    return atob(base64String);
  } catch (e) {
    console.error(e);
    return "";
  }
}

function getEnvBackendApiUrl() {
  return import.meta.env.VITE_BACKEND_API_URL;
}

function fetchList(path: string) {
  return fetch(getEnvBackendApiUrl() + path).then(it => it.text());
}

function useRedirectPath() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  useEffect(() => {
    const base64String = searchParams.get("redirect_path") || "";
    const redirectPath = decodeBase64(base64String);
    console.log("redirectPath", redirectPath);

    if (redirectPath.length === 0) {
      return;
    }

    navigation(redirectPath, {
      replace: true,
    });
  }, [navigation, searchParams])
}

export default function Home() {
  const [pingMessages, setPingMessages] = useState<string[]>([]);
  const navigation = useNavigate();

  useRedirectPath();

  function onClickAboutButton() {
    navigation("/about?name=jay&groups=1&groups=2")
  }

  function fetchData(path: string) {
    void fetchList(path).then(response => setPingMessages([...pingMessages, response]));
  }

  console.log("import.meta.env", import.meta.env);

  return (
    <div>
      <h1>Home v7</h1>
      <div>import.meta.env.VITE_BACKEND_API_URL: {getEnvBackendApiUrl()}</div>
      <div style={{margin: "10px 0"}}>
        <button onClick={onClickAboutButton}>Go About</button>
      </div>
      <div>
        <button onClick={() => fetchData("/ping")}>FetchData</button>
      </div>
      <div>
        <div>ping message:</div>
        {pingMessages.map((each, index) => (
          <div key={index}>{each}</div>
        ))}
      </div>
    </div>
  )
}