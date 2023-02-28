import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import useSessionStore from "../store/sessionStore";
import "../style/Channels.css";

const Channels = () => {
  const session = useSessionStore();
  const { socket } = useContext(SocketContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    console.log("Updating channels");
    if (!session.data.token) return;

    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/channels/testadmin`, {
        headers: { Authorization: `Bearer ${session.data.token}` },
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data || res.data.length === 0) return;

        setChannels(res.data);
      })
      .catch((error) => console.log("Error while getting channels", error));
  }, [session.data]);

  const handleChannels = (id: number) => {
    if (!socket || !id) return;

    socket.emit("joinRoom", id);
  };

  if (session.data.token) {
    return (
      <>
        {channels.map((channel: any) => (
          <div
            className="channel"
            key={channel.id}
            onClick={() => handleChannels(channel.id)}
          >
            <a>
              {channel.id}{" "}
              <span>{channel.name ?? channel.targetUser.email}</span>
            </a>
          </div>
        ))}
      </>
    );
  } else return <></>;
};

export default Channels;
