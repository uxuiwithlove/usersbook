import "./User.scss";

const User = (props) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={props.picture} alt="User Avatar" />
      </div>
      <div className="user-info">
        <h2 className="user-name">{props.name}</h2>
        <p className="user-email">{props.email}</p>
        <p className="user-phone">{props.phone}</p>
        <p className="user-location">{props.location}</p>
        <button className="follow-button">Delete</button>
      </div>
    </div>
  );
};

export default User;
