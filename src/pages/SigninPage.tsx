import axios from "axios";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SigninPage = () => {
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
        .post("/auth/signin", body)
        .then((res) => {
          alert("로그인에 성공하였습니다.");
          localStorage.setItem("token", res.data.access_token);
          nav("/todo");
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
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" data-testid="email-input" required ref={emailRef} />
        <input
          type="text"
          data-testid="password-input"
          required
          ref={passwordRef}
        />
        <button data-testid="signin-button">회원가입</button>
      </form>
      <span>
        회원이 아니세요? <Link to="/signup">회원가입 하러 가기</Link>
      </span>
    </div>
  );
};
