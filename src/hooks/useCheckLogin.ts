import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {
  const nav = useNavigate();
  const { pathname } = window.location;

  useEffect(() => {
    if (pathname === "/todo" && !localStorage.getItem("token")) {
      nav("/signin");
    }
    if (
      pathname === "/signin" ||
      (pathname === "signup" && localStorage.getItem("token"))
    ) {
      nav("/todo");
    }
  }, []);
}
