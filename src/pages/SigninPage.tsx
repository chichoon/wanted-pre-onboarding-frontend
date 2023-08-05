import { FormEvent, useCallback } from "react";

export const SigninPage = () => {
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <input type="text" data-testid="email-input" />
        <input type="text" data-testid="password-input" />
        <button data-testid="signup-button">로그인</button>
      </form>
    </div>
  );
};
