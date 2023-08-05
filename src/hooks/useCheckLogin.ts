import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {
  const nav = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") ? nav("/todo") : nav("/signin");
  });
}
