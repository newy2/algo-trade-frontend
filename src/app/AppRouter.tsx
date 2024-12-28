import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "pages/home";
import { AboutPage } from "pages/about";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      {/** 찾을 수 없는 URL인 경우 Home 으로 이동 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
