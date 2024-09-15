import "./User.scss";
import icon from "../../img/icon.svg";

const onDelete = () => {};

const User = (props) => {
  return (
    <div className="user-card">
      <div className="user-card-title">
        <div className="user-avatar">
          <img src={props.picture} alt="User Avatar" />
        </div>
        <div className="user-main">
          <h2 className="user-name">{props.name}</h2>
          <p className="user-text">{props.email}</p>
        </div>
        <a onClick={onDelete} className="delete-button" href="#">
          <img
            src={icon}
            alt="Delete"
            style={{ width: "24px", height: "24px" }}
          />
        </a>
      </div>
      <div className="user-info">
        <div className="user-info__row">
          <p className="subtitle">Phone No</p>
          <p className="user-text">{props.phone}</p>
        </div>
        <div className="user-info__row">
          <p className="subtitle">Birthday</p>
          <p className="user-text">{props.dobdate}</p>
        </div>
        <div className="user-info__row">
          <p className="subtitle">Address</p>
          <p className="user-text">{props.location}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
