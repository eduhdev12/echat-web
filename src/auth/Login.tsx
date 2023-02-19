import axios from "axios";
import { useContext, useState } from "react";
import useSessionStore from "../store/sessionStore";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const session = useSessionStore();

  const loginHandler = async () => {
    if (!email || !password) return;

    let apiResponse = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    if (apiResponse.status === 201 && apiResponse.data) {
      session.setSession(apiResponse.data);
    }
  };

  return (
    <div className="auth-form">
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
