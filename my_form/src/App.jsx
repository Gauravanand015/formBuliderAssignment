import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import CreateForm from "./components/Createform/CreateForm";
import FormTemplates from "./components/FormTemplets/FormTemplates";
import FormTemplate from "./components/FormTemplate/FormTemplate";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/create" element={<CreateForm />} />
        <Route exact path="/forms" element={<FormTemplates />} />
        <Route exact path="/forms/:id" element={<FormTemplate />} />
      </Routes>
    </div>
  );
}

export default App;
