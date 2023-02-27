import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { Message, NewMessage, UserMessage } from "../types/Message.type";
import MessageContainer from "./message/message";
import "../style/ChannelMessages.css";

const Messages = () => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);

  socket?.on(
    "newMessage",
    (msg: NewMessage, sender: UserMessage, createdAt: Date) => {
      let newMsg: Message = { message: msg, sender: sender };
      setMessages([...messages, newMsg]);
    }
  );

  return (
    <div className="channel_messages">
      {messages.map((message) => (
        <MessageContainer
          message={message.message}
          sender={message.sender}
          createdAt={message.message.createdAt}
        />
      ))}
    </div>
  );
};

export default Messages;
