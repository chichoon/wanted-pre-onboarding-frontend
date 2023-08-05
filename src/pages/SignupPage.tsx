import axios from "axios";
import { useAuth } from "hooks";
import { FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = () => {
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
    [nav, email, password]
  );

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row px-5 py-4 mb-2 h-fit">
        <div className="flex flex-col mr-5">
          <input
            type="email"
            data-testid="email-input"
            required
            value={email}
            placeholder="이메일"
            onChange={handleChangeEmail}
            className="border-b border-b-slate-300 w-60 mb-2"
          />
          <input
            type="password"
            minLength={8}
            data-testid="password-input"
            value={password}
            onChange={handleChangePassword}
            placeholder="비밀번호"
            className="border-b border-b-slate-300 w-60"
          />
        </div>
        <button
          data-testid="signup-button"
          disabled={isDisabled}
          className="disabled:bg-slate-300 bg-slate-400 px-3 rounded-md text-white">
          회원가입
        </button>
      </form>
      <div className="flex flex-col px-5 ">
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <span className="text-slate-600">
          이미 회원이라면{" "}
          <Link to="/signin" className="text-blue-400">
            로그인 하러 가기
          </Link>
        </span>
      </div>
    </main>
  );
};
