import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './CreateForm.module.css'
const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);
  const navigate = useNavigate(); 

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend API to create the form template
      var res = await fetch("https://smoggy-mite-spacesuit.cyclic.app/api/form-templates", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, questions }),
      });

      var data = await res.json();
      console.log(data);
      navigate("/forms"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Form</h2>
      <form onSubmit={handleSubmitForm}>
        <label>Form Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          {questions.map((q, index) => (
            <div key={index}>
              <label>{`Question ${index + 1}:`}</label>
              <input
                type="text"
                value={q}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default CreateForm;
