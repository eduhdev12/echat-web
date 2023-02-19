import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SocketProvider from "./context/socketContext";
// import { sessionToken, setSessionToken, socket, SocketContext } from "./context/socketContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={{socket, sessionToken, setSessionToken}}>
      <App />
    </SocketContext.Provider> */}
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
