import { AppRouter } from "app/AppRouter";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "shared/ui/toast";
import { ModalProvider } from "shared/ui/dialog";
import { LogicErrorBoundary } from "shared/ui/error";

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <ModalProvider>
          <ToastProvider>
            <LogicErrorBoundary>
              <AppRouter />
            </LogicErrorBoundary>
          </ToastProvider>
        </ModalProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
