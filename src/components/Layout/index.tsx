import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="px-5 py-2 border-b-2 border-b-slate-300 text-slate-600">
        투두 페이지
      </header>
      <Outlet />
    </>
  );
};
