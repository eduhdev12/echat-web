import { useContext, useState } from "react";
import { SocketContext } from "../../context/socketContext";

const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState<string>();
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

  socket?.on("joinRoom", () => {
    setJoinedRoom(true);
  });

  const sendHandler = () => {
    if (!socket) return;

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
