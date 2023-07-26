import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormTemplate.module.css";

const FormTemplate = () => {
  const { id } = useParams();
  const [formTemplate, setFormTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedQuestions, setUpdatedQuestions] = useState([]);
  const navigate = useNavigate();

  const goToForms = () =>{
    navigate("/forms")
  }

  useEffect(() => {
    // Fetch the specific form template from the backend
    const fetchFormTemplate = async () => {
      try {
        const response = await axios.get(
          `https://smoggy-mite-spacesuit.cyclic.app/api/form-templates/${id}`
        );
        console.log(response)
        setFormTemplate(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFormTemplate();
  }, [id]);

  useEffect(() => {
    if (formTemplate) {
      setUpdatedTitle(formTemplate.title);
      setUpdatedQuestions([...formTemplate.questions]);
    }
  }, [formTemplate]);

  const handleEditForm = () => {
    setIsEditing(true);
  };

  const handleSaveForm = async () => {
    try {
      const response = await fetch(
        `https://smoggy-mite-spacesuit.cyclic.app/api/form-templates/${formTemplate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: updatedTitle,
            questions: updatedQuestions,
          }),
        }
      );

      const updatedFormTemplate = await response.json();
      setFormTemplate(updatedFormTemplate);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteForm = async () => {
    try {
      await fetch(
        `https://smoggy-mite-spacesuit.cyclic.app/api/form-templates/${formTemplate._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Question Deleted")
      navigate("/forms");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Edit Form</h2>
          <label>Form Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <div>
            {updatedQuestions.map((q, index) => (
              <div key={index}>
                <label>{`Question ${index + 1}:`}</label>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    const newQuestions = [...updatedQuestions];
                    newQuestions[index] = e.target.value;
                    setUpdatedQuestions(newQuestions);
                  }}
                />
              </div>
            ))}
          </div>
          <button onClick={handleSaveForm}>Save Form</button>
        </div>
      ) : (
        <div>
          <h2>{formTemplate?.title}</h2>
          <ul>
            {formTemplate?.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <button onClick={handleEditForm}>Edit Form</button>
          <button onClick={handleDeleteForm}>Delete Form</button>
          <button onClick={goToForms}>Go To Forms</button>
        </div>
      )}
    </div>
  );
};

export default FormTemplate;
