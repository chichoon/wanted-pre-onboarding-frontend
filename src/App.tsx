import { Route, Routes } from "react-router-dom";
import { SigninPage, SignupPage } from "pages";
import { Layout } from "components";
import { useCheckLogin } from "hooks";
import { TodoPage } from "pages/TodoPage";

function App() {
  useCheckLogin();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Route>
    </Routes>
  );
}

export default App;
