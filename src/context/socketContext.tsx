import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import useSessionStore from "../store/sessionStore";
// @ts-ignore: No typescript support
import crypto from "crypto-browserify";

interface SocketContext {
  socket: Socket | null;
  sharedKey: {
    value: string | undefined;
    set: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
  ecdhInstance: any;
}
export const SocketContext = React.createContext<SocketContext>(
  {} as SocketContext
);

const SocketProvider = (props: any) => {
  const session = useSessionStore();
  const [publicKey, setPublicKey] = useState<string>();
  const [sharedKey, setSharedKey] = useState<string>();
  const [ecdhInstance, setECDH] = useState<any>();

  useEffect(() => {
    const ecdh = crypto.createECDH("secp256k1");
    let clientKeys = ecdh.generateKeys("base64");
    setECDH(ecdh);
    setPublicKey(clientKeys);
    console.log("console public key is", clientKeys);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket:
          session.data.token && publicKey
            ? io(import.meta.env.VITE_API_ENDPOINT, {
                auth: { token: session.data.token, publicKey },
                reconnection: false,
              })
            : null,
        sharedKey: { value: sharedKey, set: setSharedKey },
        ecdhInstance,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
