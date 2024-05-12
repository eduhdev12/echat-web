import { useContext, useState } from "react";
import { SocketContext } from "../../context/socketContext";
import { encrypt } from "../../encryption/encryption";
import useSecretStore from "../../store/secretStore";
// @ts-ignore: No typescript support

const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const secret = useSecretStore();
  const [message, setMessage] = useState<string>();
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

  socket?.on("joinRoom", () => {
    setJoinedRoom(true);
  });

  const sendHandler = () => {
    if (!socket) return;
    let encryptedMsg = encrypt(secret.sharedKey, message);
    secret.setIV(encryptedMsg.iv);

    socket.emit("messageCreate", encryptedMsg);
    setMessage("");
  };

  if (!joinedRoom) return <></>;

  return (
    <input
      className="messages_input"
      placeholder="Send message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "enter") sendHandler();
      }}
    />
  );
};

export default SendMessage;
