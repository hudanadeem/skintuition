import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./RegisterForm.scss";

const baseURL = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skinType, setSkinType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.error || "Internal server error");
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Register</h1>
      {error && <p className="register__error">{error}</p>}
      <form className="register__form" onSubmit={handleRegister}>
        <div className="register__form--group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="register__form--group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="register__form--group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="register__form--group">
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
        <button type="submit" className="register__submit--button">
          Register
        </button>
      </form>
      <p className="register__login--link">
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
}

export default RegisterForm;
