import { PropsWithoutRef, useEffect, useRef } from "react";
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

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messageRef.current || !messageRef.current.parentElement) return;

    let shouldScroll =
      messageRef.current.parentElement.scrollHeight -
      (messageRef.current.parentElement.scrollTop +
        messageRef.current.parentElement.clientHeight);

    if (shouldScroll < 150)
      messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className={`message ${session.data.id === sender.id ? "self" : ""}`}
      ref={messageRef}
    >
      <p className="message_content">
        <p className="message_content_author">{sender.email}</p>
        {message.text && <p className="message_content_text">{message.text}</p>}
      </p>
    </div>
  );
};

export default MessageContainer;
