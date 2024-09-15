import User from "../../components/User";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Для хранения поискового запроса

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

  // Функция для удаления пользователя
  const handleDeleteUser = (email) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
  };

  // Обработчик изменения поискового запроса
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Преобразуем введенный текст к нижнему регистру
  };

  // Фильтрация пользователей на основе поискового запроса
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const email = user.email.toLowerCase();
    const phone = user.phone.toLowerCase();
    const dobdate = new Date(user.dob.date).toLocaleDateString().toLowerCase();
    const location =
      `${user.location.city}, ${user.location.country}`.toLowerCase();

    // Проверяем, содержит ли любое из полей введенный поисковый запрос
    return (
      fullName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      dobdate.includes(searchTerm) ||
      location.includes(searchTerm)
    );
  });

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
          value={searchTerm}
          onChange={handleSearch} // Обработчик изменения поискового запроса
        />
        <button onClick={getUsers} className="refresh-button">
          Refresh Users
        </button>
      </div>
      <div className="container">
        {filteredUsers.map((user, index) => (
          <User
            key={index}
            name={`${user.name.first} ${user.name.last}`}
            email={user.email}
            phone={user.phone}
            picture={user.picture.medium}
            dobdate={new Date(user.dob.date).toLocaleDateString()}
            location={`${user.location.city}, ${user.location.country}`}
            onDelete={handleDeleteUser} // Передаем функцию удаления
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
