import { useContext, useState } from "react";
import { SocketContext } from "../context/socketContext";
import "../style/ChannelMessages.css";
import {
  Message,
  NewMessage,
  SetMessage,
  UserMessage,
} from "../types/Message.type";
import MessageContainer from "./message/message";

const Messages = () => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);

  socket?.on(
    "messageCreate",
    (msg: NewMessage, sender: UserMessage, createdAt: Date) => {
      let newMsg: Message = { message: msg, sender: sender };
      setMessages([...messages, newMsg]);
    }
  );

  socket?.on("setMessages", (msgs: SetMessage[]) => {
    let newMessages: Message[] = [];

    msgs.map((msg) => {
      let newMsg: Message = {
        message: { text: msg.content, createdAt: msg.createdAt },
        sender: msg.sender,
      };
      newMessages.push(newMsg);
    });

    setMessages(newMessages);
  });

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
