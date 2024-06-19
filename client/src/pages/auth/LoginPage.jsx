// LoginPage.js
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import './LoginPage.css';
import './Notify.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [notification, setNotification] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setNotification("Login successful");
      setUser(data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setNotification("Invalid email or password");
      } else {
        setNotification("Login failed");
      }
    }
    setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  // ... rest of your code

  return (
    <div className="parent">
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={loginUser}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button className="form-btn">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <span className="sign-up-link">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
        <div className="buttons-container">
          <div className="apple-login-button">
            {/* Apple login button */}
            {/* SVG for Apple logo */}
            <span>Log in with Apple</span>
          </div>
          <div className="google-login-button">
            {/* Google login button */}
            {/* SVG for Google logo */}
            <span>Log in with Google</span>
          </div>
          {notification && <div className="notification">{notification}</div>}
        </div>
      </div>
    </div>
  );
}
