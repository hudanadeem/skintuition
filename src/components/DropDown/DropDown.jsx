import { useEffect, useState } from "react";
import axios from "axios";
import profileImage from "../../assets/icons/logged-in.png";
import "./DropDown.scss";

const baseURL = import.meta.env.VITE_API_URL;

function DropDown({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  const toggleDropdown = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axios.get(`${baseURL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email } = response.data;
        setUserData({ name, email });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="profile" onClick={toggleDropdown}>
      <div className="profile__info">
        <div className="profile__user">
          <h3>{userData.name || "Loading..."}</h3>
          <p>{userData.email || " "}</p>
        </div>
        <div className="profile__img">
          <img src={profileImage} alt="user" />
        </div>
      </div>

      <div className={`profile__menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>Profile</li>
          <li>Help</li>
          <li>Settings</li>
          <li>
            <button onClick={handleLogout}>Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropDown;
