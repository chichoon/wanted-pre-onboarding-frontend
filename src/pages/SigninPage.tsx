import axios from "axios";
import { useAuth } from "hooks";
import { FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SigninPage = () => {
  const {
    email,
    password,
    isDisabled,
    handleChangeEmail,
    handleChangePassword,
  } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nav = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const body = {
        email,
        password,
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
    [nav, email, password]
  );

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-testid="email-input"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="text"
          data-testid="password-input"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <button data-testid="signin-button" disabled={isDisabled}>
          로그인
        </button>
        {errorMessage && <span>{errorMessage}</span>}
      </form>
      <span>
        회원이 아니세요? <Link to="/signup">회원가입 하러 가기</Link>
      </span>
    </div>
  );
};
