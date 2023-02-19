import { useContext } from "react";
import "./App.css";
import Login from "./auth/Login";
import User from "./auth/User";
import Channels from "./channels/Channels";
import { SocketContext } from "./context/socketContext";
import useSessionStore from "./store/sessionStore";

function App() {
  const session = useSessionStore();
  const { socket } = useContext(SocketContext);

  return (
    <div className="App">
      {socket && (
        <>
          <button onClick={() => socket.emit("joinRoom")}>JOin ROom</button>
          <button onClick={() => socket.emit("trigger")}>Trigger</button>
        </>
      )}

      <div className="auth-components">
        {session.data.id ? <User /> : <Login />}
      </div>

      <div className="channels">
        <Channels />
      </div>
    </div>
  );
}

export default App;
