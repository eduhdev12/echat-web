import { useContext, useEffect } from "react";
import "./App.css";
import Login from "./auth/Login";
import User from "./auth/User";
import Channels from "./channels/Channels";
import { SocketContext } from "./context/socketContext";
import SendMessage from "./messages/components/SendMessage";
import Messages from "./messages/messages";
import useSessionStore from "./store/sessionStore";
// @ts-ignore: caca
import crypto from "crypto-browserify";
import { Buffer } from "buffer/"; // <-- no typo here ("/")

function App() {
  const session = useSessionStore();
  const { socket } = useContext(SocketContext);
  const ecdh = crypto.createECDH("secp256k1");

  useEffect(() => {
    setTimeout(() => {
      if (!socket) return;
      socket.emit("joinRoom");

      ecdh.generateKeys("base64");
      let publicKey = ecdh.generateKeys("base64"); // ecdh.getPublicKey("hex");
      socket.emit("publicKey", publicKey);

    }, 1500);
  }, []);

  socket?.on("publicKey", (keyy: any, clientKey: any, sharedKey: any) => {
    try {
      const shared = ecdh.computeSecret(keyy, "base64", "base64");

      console.log(shared);
      console.log(sharedKey)
      console.log(shared === sharedKey)
    } catch (error) {
      // console.error("Eroare", error)
    }
  });

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
