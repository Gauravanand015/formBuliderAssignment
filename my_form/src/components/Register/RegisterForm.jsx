import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.module.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://smoggy-mite-spacesuit.cyclic.app/api/register", {
        username,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <button onClick={goToLogin}>Go to Login</button>
      </form>
    </div>
  );
};

export default RegisterForm;
