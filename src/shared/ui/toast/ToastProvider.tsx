import { ReactNode, useMemo, useState } from "react";
import { ToastContext, ToastType } from "./ToastContext";

type ToastMessageType = {
  id: number;
  type: ToastType;
  message: string;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessageType[]>([]);
  const actualContextAction = useMemo(() => {
    return {
      addToast: (type: "success" | "error", message: string) => {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
      },
    };
  }, []);

  return (
    <ToastContext.Provider value={actualContextAction}>
      {children}
      <ToastMessageStack toasts={toasts} />
    </ToastContext.Provider>
  );
}

function ToastMessageStack({ toasts }: { toasts: ToastMessageType[] }) {
  return (
    <div className="toast z-20">
      {toasts.map(({ id, type, message }) => (
        <div key={id} className={`alert shadow-lg alert-${type}`}>
          <div>
            <span>{message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
