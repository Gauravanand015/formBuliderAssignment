import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FomTemplates.module.css"

const FormTemplates = () => {
  const [formTemplates, setFormTemplates] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch all form templates from the backend
    const fetchFormTemplates = async () => {
      try {
        const response = await axios.get(
          "https://smoggy-mite-spacesuit.cyclic.app/api/form-templates"
        );
        setFormTemplates(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFormTemplates();
  }, []);

  const handleTemplateClick = (templateId) => {
    navigate(`/forms/${templateId}`);
  };

  return (
    <div>
      <h2>Form Templates</h2>
      <ul>
        {formTemplates.map((template) => (
          <li key={template._id}>
            <Link
              onClick={() => handleTemplateClick(template._id)}
              to={`/forms/${template._id}`}
            >
              {template.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormTemplates;
