import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.scss";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import NavBar from "../../components/NavBar/NavBar";

const baseURL = import.meta.env.VITE_API_URL;

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skinType, setSkinType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        name,
        email,
        password,
        skinType,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.error || "Internal server error");
    }
  };

  return (
    <>
      <div className="page__container">
        <NavBar />
        <div className="register-page">
          <h1 className="register-page__title">Register</h1>
          {error && <p className="register-page__error">{error}</p>}
          <form className="register-page__form" onSubmit={handleRegister}>
            <div className="register-page__form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="skinType">Skin Type (Optional)</label>
              <select
                id="skinType"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
              >
                <option value="">Select your skin type</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">Combination</option>
                <option value="normal">Normal</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>
            <button type="submit" className="register-page__submit-button">
              Register
            </button>
          </form>
          <p className="register-page__login-link">
            Already have an account? <a href="/login">Login here</a>.
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
