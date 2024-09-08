import "./User.scss";

const User = (props) => {
  return (
    <div className="user-card">
      <div className="user-card-title">
        <div className="user-avatar">
          <img src={props.picture} alt="User Avatar" />
        </div>
        <div className="user-main">
          <h2 className="user-name">{props.name}</h2>
          <p className="user-email">{props.email}</p>
        </div>
        <button className="follow-button">D</button>
      </div>
      <div className="user-info">
        <div className="user-info__row">
          <p className="subtitle">Phone No</p>
          <p className="user-phone">{props.phone}</p>
        </div>
        <div className="user-info__row">
          <p className="subtitle">Birthday</p>
          <p className="user-location">{props.dobdate}</p>
        </div>
        <div className="user-info__row">
          <p className="subtitle">Address</p>
          <p className="user-location">{props.location}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
