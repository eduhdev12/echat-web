import { PropsWithoutRef, ReactNode } from "react";
import useSessionStore from "../../store/sessionStore";
import { NewMessage, UserMessage } from "../../types/Message.type";

interface MessageProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  sender: UserMessage;
  message: NewMessage;
  createdAt: Date;
}

const MessageContainer = ({ sender, message, createdAt, children }: MessageProps) => {
  const session = useSessionStore();

  return (
    <div className="message">
      {sender.email} - {message.text ? <span>{message.text}</span> : null}
    </div>
  );
};

export default MessageContainer;
