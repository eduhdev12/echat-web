import useSessionStore from "../store/sessionStore";

const User = () => {
  const session = useSessionStore();

  if (session.data && session.data.id) {
    return (
      <div className="user-details">
        <p>Welcome, {session.data.username}</p>
        <button onClick={() => session.logOut()}>Log out</button>
      </div>
    );
  } else return <></>;
};

export default User;
