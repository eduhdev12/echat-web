import { useContext, useState } from "react";
import { SocketContext } from "../../context/socketContext";
import { decrypt, encrypt } from "../../encryption/encryption";
import useSecretStore from "../../store/secretStore";

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
    console.log(secret.sharedKey)
    let test = encrypt(secret.sharedKey, { content: message });
    console.log("encrypted text", test);
    let testDecrypt = decrypt({key: secret.sharedKey, iv: test.iv}, test.data);
    console.log("decrypted text", testDecrypt)

    socket.emit("messageCreate", { content: message });
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
