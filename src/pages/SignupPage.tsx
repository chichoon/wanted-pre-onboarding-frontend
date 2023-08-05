export const SignupPage = () => {
  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <input type="text" data-testid="email-input" />
        <input type="text" data-testid="password-input" />
        <button data-testid="signup-button">회원가입</button>
      </form>
    </div>
  );
};
