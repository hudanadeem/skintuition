import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        navigate("/"); 
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page__title">Login</h1>
      {error && <p className="login-page__error">{error}</p>}
      <form className="login-page__form" onSubmit={handleLogin}>
        <div className="login-page__form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="login-page__form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-page__submit-button">
          Login
        </button>
      </form>
      <p className="login-page__register-link">
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
}

export default LoginPage;
