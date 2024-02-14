import React, { useState } from "react";
import axios from "axios";

const CreateRecipeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 0,
    ingredients: "",
    type: "",
    img: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("duration", formData.duration);
    formDataWithImage.append("ingredients", formData.ingredients);
    formDataWithImage.append("type", formData.type);
    formDataWithImage.append("img", formData.img);

    try {
      const response = await axios.post(
        "http://localhost:3000/meals/create",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Receta creada:", response.data);
    } catch (error) {
      console.error("Error al crear la receta:", error);
    }
  };

  return (
    <div>
      <h2>Crea una nueva receta</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        {/* Descripción */}
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        {/* Duración */}
        <label htmlFor="duration">Duración (minutos):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />

        {/* Ingredientes */}
        <label htmlFor="ingredients">Ingredientes:</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />

        {/* Tipo */}
        <label htmlFor="type">Tipo:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        />

        {/* Imagen */}
        <label htmlFor="img">Imagen:</label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit">Crear receta</button>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
