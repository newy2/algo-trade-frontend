import { AppRouter } from "app/AppRouter";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "shared/ui/toast";

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
