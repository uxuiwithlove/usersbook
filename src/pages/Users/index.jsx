import User from "../../components/User";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  // отсюда делать удаление карточки

  // Функция для получения данных пользователей
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://randomuser.me/api/?results=500"
      );
      setUsers(response.data.results); // Сохранение данных в состояние
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  // Запрос выполняется при монтировании компонента
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
        />
        <button onClick={getUsers} className="refresh-button">
          Refresh Users
        </button>
      </div>
      <div className="container">
        {users.map((user, index) => (
          <User
            key={index}
            name={`${user.name.first} ${user.name.last}`}
            email={user.email}
            phone={user.phone}
            picture={user.picture.medium}
            dobdate={user.dob.date}
            location={`${user.location.city}, ${user.location.country}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
