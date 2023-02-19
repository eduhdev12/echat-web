import "./App.css";
import Login from "./auth/Login";
import User from "./auth/User";
import Channels from "./channels/Channels";
import useSessionStore from "./store/sessionStore";
import io from "socket.io-client";
import { useContext, useEffect } from "react";
import { SocketContext } from "./context/socketContext";
// import { SocketContext } from "./context/socketContext";

// const socketClient = io("http://localhost:3000");

function App() {
  const session = useSessionStore();
  const { socket } = useContext(SocketContext);
  // const socket = useSocketStore();

  // useEffect(() => {
  //   // Starting the socket connection
  //   if (!session.data.id || socket.client.connected) return;

  //   const socketClient = io(import.meta.env.VITE_API_ENDPOINT, {
  //     auth: { token: session.data.token },
  //   });

  //   socketClient.on("connect", () => {
  //     console.log("Socket connected");

  //     socketClient.on("newMessage", (msg) => console.log("new message", msg));

  //     socket.setSocket(socketClient);
  //   });

  //   // socketClient.on("connect", () => {
  //   //   console.log("connected");

  //   //   socketClient.on("newMessage", (msg) => console.log("new message", msg));

  //   //   socketClient.emit("message", (data) => console.log("returned data", data));

  //   //   // setTimeout(() => {
  //   //   //   socket.emit("trigger");
  //   //   // }, 5000);
  //   // });

  //   return () => {
  //     socket.client.off("connect");
  //     // if (!socket.client.connected) return;
  //     // console.log("Socket disconnected");
  //     // socket.client.disconnect();
  //     // socket.disconnect();
  //   };
  // }, []);

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
