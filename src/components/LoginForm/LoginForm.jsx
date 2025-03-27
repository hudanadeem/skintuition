import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./LoginForm.scss";

const baseURL = import.meta.env.VITE_API_URL;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      {error && <p className="login__error">{error}</p>}
      <form className="login__form" onSubmit={handleLogin}>
        <div className="login__form--group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="login__form--group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login__submit--button">
          Login
        </button>
      </form>
      <p className="login__register--link">
        Don't have an account?{" "}
        <Link
          to="/register"
          state={{ from: location.state?.from }} 
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
