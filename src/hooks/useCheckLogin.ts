import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {
  const nav = useNavigate();
  const { pathname } = window.location;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (
        pathname === "/signin" ||
        pathname === "/signup" ||
        pathname === "/"
      ) {
        nav("/todo");
      }
    } else if (pathname === "/todo" || pathname === "/") {
      nav("/signin");
    }
  }, [pathname, nav]);
}
