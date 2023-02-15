import "./App.css";
import Login from "./auth/Login";
import User from "./auth/User";
import useSessionStore from "./store/sessionStore";

function App() {
  const session = useSessionStore();

  return (
    <div className="App">
      <div className="auth-components">
        {session.data.id ? <User /> : <Login />}
      </div>
    </div>
  );
}

export default App;
