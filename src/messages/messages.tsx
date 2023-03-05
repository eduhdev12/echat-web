import { Buffer } from "buffer/";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { decrypt } from "../encryption/encryption";
import useSecretStore from "../store/secretStore";
import "../style/ChannelMessages.css";
import {
  EncryptedMessage,
  Message,
  NewMessage,
  SetMessage,
  UserMessage,
} from "../types/Message.type";
import MessageContainer from "./message/message";
// @ts-ignore: No typescript support
import crypto from "crypto-browserify";

const Messages = () => {
  const { socket } = useContext(SocketContext);
  const secret = useSecretStore();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket?.on(
      "messageCreate",
      (msg: string, sender: EncryptedMessage, createdAt: Date, iv: any) => {
        let messageData: string = decrypt(
          { key: secret.sharedKey, iv: Buffer.from(iv) },
          msg
        );
        let messageSender = JSON.parse(
          decrypt(
            { key: secret.sharedKey, iv: Buffer.from(sender.iv) },
            sender.data
          )
        );
        let newMsg: Message = {
          message: { text: messageData, createdAt },
          sender: messageSender,
        };
        setMessages((messages) => [...messages, newMsg]);
      }
    );

    return () => {
      socket?.off("messageCreate");
    };
  }, [secret]);

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
