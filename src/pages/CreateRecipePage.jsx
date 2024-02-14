import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateRecipePage.scss";

const CreateRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    img: "",
    duration: "",
    ingredients: "",
    cook: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.post(
        "http://localhost:3000/meals/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Receta creada:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear receta:", error);
    }
  };

  return (
    <div className="create-recipe-page">
      <div className="titleCreate">
        <h2>Nova Recepta</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Nom de la recepta"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="type"
            placeholder="Tipus de menjar: vegetaria, carn, pasta, etc.."
            value={formData.type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <textarea
            name="description"
            placeholder="Com ho has fet?"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input type="file" name="img" onChange={handleFileChange} required />
        </label>
        <label>
          <input
            type="number"
            name="duration"
            placeholder="Preparació en minuts"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="cook"
            placeholder="Cuiner"
            value={formData.cook}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Guardar Nova Recepta</button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
