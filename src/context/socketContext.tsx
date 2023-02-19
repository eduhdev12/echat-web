import io, { Socket } from "socket.io-client";
import React, { useState } from "react";
import useSessionStore from "../store/sessionStore";

interface SocketContext {
  socket: Socket | null;
  // sessionToken: string | null;
  // setSessionToken: React.Dispatch<React.SetStateAction<string>>;
}

// export let [sessionToken, setSessionToken]= useState<string>("");
// const socket = sessionToken
//   ? io(import.meta.env.VITE_API_ENDPOINT, {
//       auth: { token: sessionToken },
//     })
//   : null;
export const SocketContext = React.createContext<SocketContext>(
  {} as SocketContext
);

const SocketProvider = (props: any) => {
  const session = useSessionStore();

  return (
    <SocketContext.Provider
      value={{
        socket: session.data.token
          ? io(import.meta.env.VITE_API_ENDPOINT, {
              auth: { token: session.data.token },
            })
          : null,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
