import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRedirectPath } from "pages/home/lib/useRedirectPath";
import { fetchPingMessage } from "pages/home/api/fetchPingMessage";
import { useToast } from "shared/ui/toast";
import { AlertModal, ConfirmModal, useModal } from "shared/ui/dialog";

function AlertModalExampleComponent() {
  const { pushModal } = useModal();

  const openModal = () => {
    pushModal(
      <AlertModal onConfirm={() => console.log("onConfirm")}>
        <div>
          <h3 className="text-lg font-bold">Welcome!</h3>
          <p className="py-4">
            This is a dynamic dialog managed by DialogManager.
          </p>
        </div>
      </AlertModal>,
    );
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Alert 모달
      </button>
    </div>
  );
}

function ConfirmModalExampleComponent() {
  const { pushModal } = useModal();

  const openModal = () => {
    pushModal(
      <ConfirmModal
        onCancel={() => console.log("onCancel")}
        onConfirm={() => console.log("onConfirm")}
      >
        <div>
          <h3 className="text-lg font-bold">Welcome!</h3>
          <p className="py-4">
            This is a dynamic dialog managed by DialogManager.
          </p>
        </div>
      </ConfirmModal>,
    );
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Confirm 모달
      </button>
    </div>
  );
}

function ConfirmModalExampleComponent2() {
  const { pushModal } = useModal();

  const openModal = (count: number) => {
    pushModal(
      <ConfirmModal
        onCancel={() => console.log("onCancel")}
        onConfirm={() => console.log("onConfirm")}
      >
        <div>
          <h3 className="text-lg font-bold">Welcome! Modal {count}</h3>
          <p className="py-4">
            This is a dynamic dialog managed by DialogManager.
          </p>
          <div>
            <button className="btn" onClick={() => openModal(++count)}>
              New Confirm 모달
            </button>
          </div>
        </div>
      </ConfirmModal>,
    );
  };

  return (
    <div>
      <button className="btn" onClick={() => openModal(1)}>
        모달에서 모달 띄우기
      </button>
    </div>
  );
}

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

  const throwError = () => {
    throw new Error("Simple Error");
  };

  const throwErrorAsyncFunction = async () => {
    throw new Error("Simple Error");
  };

  console.log("render HomePage");

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
      <AlertModalExampleComponent />
      <ConfirmModalExampleComponent />
      <ConfirmModalExampleComponent2 />
      <button className="btn" onClick={handleSuccess}>
        토스트
      </button>

      <div>
        <button className="btn" onClick={throwError}>
          에러 발생
        </button>
      </div>

      <div>
        <button className="btn" onClick={throwErrorAsyncFunction}>
          async 함수 에러 발생
        </button>
      </div>
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
