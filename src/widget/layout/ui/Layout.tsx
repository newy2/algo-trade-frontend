import { Header } from "./Header.tsx";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Header />
      <main className="mt-2.5">
        <Outlet />
      </main>
    </>
  );
}
