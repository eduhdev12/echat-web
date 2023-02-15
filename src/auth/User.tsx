import useSessionStore from "../store/sessionStore";
import "../style/User.css";

const User = () => {
  const session = useSessionStore();

  if (session.data && session.data.id) {
    return (
      <div className="user-details">
        <p className="zero-margin">
          Welcome, {session.data.username} ({session.data.email}) (
          {session.data.id})
        </p>
        <p className="zero-margin">Role: {session.data.role}</p>
        <button onClick={() => session.logOut()}>Log out</button>
      </div>
    );
  } else return <></>;
};

export default User;
