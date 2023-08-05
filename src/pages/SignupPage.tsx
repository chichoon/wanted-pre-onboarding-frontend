import axios from "axios";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nav = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const body = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      console.log(body);
      axios
        .post("/auth/signup", body)
        .then(() => {
          alert("회원가입에 성공하였습니다.");
          nav("/signin");
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message)
            setErrorMessage(err.response.data.message);
          else setErrorMessage(err.message);
        });
    },
    [nav]
  );

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" data-testid="email-input" required ref={emailRef} />
        <input
          type="password"
          minLength={8}
          data-testid="password-input"
          ref={passwordRef}
        />
        <button data-testid="signup-button">회원가입</button>
        {errorMessage && <span>{errorMessage}</span>}
      </form>
      <span>
        이미 회원이라면 <Link to="/signin">로그인 하러 가기</Link>
      </span>
    </div>
  );
};
