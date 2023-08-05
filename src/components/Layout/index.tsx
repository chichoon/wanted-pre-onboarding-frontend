import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>투두 페이지</header>
      <Outlet />
    </>
  );
};
