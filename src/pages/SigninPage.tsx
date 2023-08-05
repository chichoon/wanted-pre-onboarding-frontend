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
      axios
        .post(
          "https://www.pre-onboarding-selection-task.shop/auth/signin",
          body
        )
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
        })
        .then(() => {
          alert("로그인에 성공하였습니다.");
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
    <main>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row px-5 py-4 mb-2 h-fit">
        <div className="flex flex-col mr-5">
          <input
            type="text"
            data-testid="email-input"
            required
            value={email}
            onChange={handleChangeEmail}
            placeholder="이메일"
            className="border-b border-b-slate-300 w-60 mb-2"
          />
          <input
            type="password"
            data-testid="password-input"
            required
            value={password}
            onChange={handleChangePassword}
            placeholder="비밀번호"
            className="border-b border-b-slate-300 w-60"
          />
        </div>
        <button
          data-testid="signin-button"
          disabled={isDisabled}
          className="disabled:bg-slate-300 bg-slate-400 px-3 rounded-md text-white">
          <span>로그인</span>
        </button>
      </form>
      <div className="flex flex-col px-5 ">
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <span className="text-slate-600">
          회원이 아니세요?{" "}
          <Link to="/signup" className="text-blue-400">
            회원가입 하러 가기
          </Link>
        </span>
      </div>
    </main>
  );
};
