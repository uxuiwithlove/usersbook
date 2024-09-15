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

    return (
      fullName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      dobdate.includes(searchTerm) ||
      location.includes(searchTerm)
    );
  });

  // Подсчет статистики по возрастным группам и гендеру
  const ageGroups = {
    "11-20": 0,
    "21-30": 0,
    "31-40": 0,
    "41-50": 0,
    "50+": 0,
  };
  let maleCount = 0;
  let femaleCount = 0;

  filteredUsers.forEach((user) => {
    const birthDate = new Date(user.dob.date);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    if (age >= 11 && age <= 20) {
      ageGroups["11-20"]++;
    } else if (age >= 21 && age <= 30) {
      ageGroups["21-30"]++;
    } else if (age >= 31 && age <= 40) {
      ageGroups["31-40"]++;
    } else if (age >= 41 && age <= 50) {
      ageGroups["41-50"]++;
    } else if (age > 50) {
      ageGroups["50+"]++;
    }

    if (user.gender === "male") {
      maleCount++;
    } else if (user.gender === "female") {
      femaleCount++;
    }
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
        <div className="info-panel">
          <h2 className="user-name">{filteredUsers.length} Users</h2>
          <h3 className="group-title">Age groups</h3>
          <div className="user-info__row">
            <p className="subtitle">11 to 20</p>
            <span className="user-text">{ageGroups["11-20"]} users</span>
          </div>
          <div className="user-info__row">
            <p className="subtitle">21 to 30</p>
            <span className="user-text">{ageGroups["21-30"]} users</span>
          </div>
          <div className="user-info__row">
            <p className="subtitle">31 to 40</p>
            <span className="user-text">{ageGroups["31-40"]} users</span>
          </div>
          <div className="user-info__row">
            <p className="subtitle">41 to 50</p>
            <span className="user-text">{ageGroups["41-50"]} users</span>
          </div>
          <div className="user-info__row">
            <p className="subtitle">50+</p>
            <span className="user-text">{ageGroups["50+"]} users</span>
          </div>
          <h3 className="group-title">Gender groups</h3>
          <div className="user-info__row">
            <p className="subtitle">Male</p>
            <span className="user-text">{maleCount} users</span>
          </div>
          <div className="user-info__row">
            <p className="subtitle">Female</p>
            <span className="user-text">{femaleCount} users</span>
          </div>
        </div>
        <div className="cards-container">
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
    </div>
  );
};

export default Users;
