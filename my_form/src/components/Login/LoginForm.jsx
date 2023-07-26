import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
import "./Login.module.css"
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goToRegister = () =>{
    navigate("/register")
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://smoggy-mite-spacesuit.cyclic.app/user/login',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body : JSON.stringify({username,password})
      });
      console.log(response)
      
      let data = await response.json()
      console.log(data)
      if(data.message === "Login successful."){
        localStorage.setItem("token",data.token)
        alert("Login Successful")
         navigate('/create'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <button onClick={goToRegister}>Go to Register</button>
      </form>
    </div>
  );
};

export default LoginForm;
