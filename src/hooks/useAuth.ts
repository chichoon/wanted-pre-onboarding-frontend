import { ChangeEvent, useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (!email.includes("@") || password.length < 8) setIsDisabled(true);
    else setIsDisabled(false);
  }, [email, password]);

  return {
    email,
    password,
    isDisabled,
    handleChangeEmail,
    handleChangePassword,
  };
}
