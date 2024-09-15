import "./User.scss";
import icon from "../../img/icon.svg";

const User = (props) => {
  const { name, email, phone, picture, dobdate, location, onDelete } = props;

  const handleDelete = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    onDelete(email); // Передаем email пользователя в функцию удаления
  };

  return (
    <div className="user-card">
      <div className="user-card-title">
        <div className="user-avatar">
          <img src={picture} alt="User Avatar" />
        </div>
        <div className="user-main">
          <h2 className="user-name">{name}</h2>
          <p className="user-text">{email}</p>
        </div>
        <a onClick={handleDelete} className="delete-button" href="#">
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
          <p className="user-text">{phone}</p>
        </div>
        <div className="user-info__row">
          <p className="subtitle">Birthday</p>
          <p className="user-text">{dobdate}</p>
        </div>
        <div className="user-info__row">
          <p className="subtitle">Address</p>
          <p className="user-text">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
