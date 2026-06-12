import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../styles/auth.css";

function Login() {

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
        "login/",
        {
          username: loginData.username,
          password: loginData.password,
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );
     

      alert("Login Successful");

      navigate("/hotels");

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.error ||
        "Invalid Credentials"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Luxury Stays</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={loginData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;