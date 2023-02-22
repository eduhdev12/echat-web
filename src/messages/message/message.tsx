import { PropsWithoutRef } from "react";
import useSessionStore from "../../store/sessionStore";
import "../../style/ChannelMessages.css";
import { NewMessage, UserMessage } from "../../types/Message.type";

interface MessageProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  sender: UserMessage;
  message: NewMessage;
  createdAt: Date;
}

const MessageContainer = ({
  sender,
  message,
  createdAt,
  children,
}: MessageProps) => {
  const session = useSessionStore();

  return (
    <div className={`message ${session.data.id === sender.id ? "self" : ""}`}>
      <p className="message_content">
        <p className="message_content_author">{sender.email}</p>
        {message.text && <p className="message_content_text">{message.text}</p>}
      </p>
    </div>
  );
};

export default MessageContainer;
