import { useContext } from "react";
import "./App.css";
import Login from "./auth/Login";
import User from "./auth/User";
import Channels from "./channels/Channels";
import { SocketContext } from "./context/socketContext";
import SendMessage from "./messages/components/SendMessage";
import Messages from "./messages/messages";
import useSessionStore from "./store/sessionStore";

function App() {
  const session = useSessionStore();
  const { socket, ecdhInstance } = useContext(SocketContext);

  socket?.on(
    "publicKey",
    (serverKey: string, clientKey: string, sharedKey: string) => {
      try {
        const shared = ecdhInstance.computeSecret(
          serverKey,
          "base64",
          "base64"
        );

        console.table([serverKey, clientKey, sharedKey]);
        console.log(shared === sharedKey);
      } catch (error) {
        console.error("Eroare", error);
      }
    }
  );

  return (
    <div className="App">
      {/* {socket && (
        <>
          <button onClick={() => socket.emit("joinRoom")}>JOin ROom</button>
          <button onClick={() => socket.emit("trigger")}>Trigger</button>
        </>
      )} */}

      <div className="auth-components">
        {session.data.id ? <User /> : <Login />}
      </div>

      <div className="channels">
        <Channels />
      </div>

      <div className="messages">
        <Messages />
        <SendMessage />
      </div>
    </div>
  );
}

export default App;
