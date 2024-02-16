import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import "../styles/MealsDetail.scss";

const MealsDetail = () => {
  const [meal, setMeal] = useState(null);
  const [editedMeal, setEditedMeal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/meals/${id}`);
        setMeal(response.data);
        setEditedMeal(response.data);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMeal();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedMeal.name);
      formData.append("type", editedMeal.type);
      formData.append("duration", editedMeal.duration);
      formData.append("cook", editedMeal.cook);
      formData.append("description", editedMeal.description);
      formData.append("ingredients", editedMeal.ingredients);
      if (imageFile) {
        formData.append("img", imageFile);
      }

      await axios.put(`http://localhost:3000/meals/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsEditing(false);
      setMeal(editedMeal); // Actualiza la receta mostrada después de editar
    } catch (error) {
      console.error("Error editing meal:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMeal(meal); // Revierte los cambios
    setImageFile(null); // Revierte la selección de la imagen
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMeal({ ...editedMeal, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/meals/delete/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MealsDetailWrapper">
      <div className="MealCard">
        <div className="MealContent">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedMeal.name}
                onChange={handleChange}
                placeholder="Nombre de la receta"
              />
              <input
                type="text"
                name="type"
                value={editedMeal.type}
                onChange={handleChange}
                placeholder="Tipo de receta"
              />
              <input
                type="text"
                name="duration"
                value={editedMeal.duration}
                onChange={handleChange}
                placeholder="Duración en minutos"
              />
              <input
                type="text"
                name="cook"
                value={editedMeal.cook}
                onChange={handleChange}
                placeholder="Cocina"
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </>
          ) : (
            <>
              <h1 className="MealTitle">{meal.name}</h1>
              <img src={meal.img} alt="meal-img" className="MealImage" />
              <div className="MealPack">
                <p className="MealType">{meal.type}</p>
                <p className="MealType">{meal.duration} minutos</p>
                <p className="MealType">{meal.cook}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="IngredientsCard">
        <div className="IngredientsContent">
          {isEditing ? (
            <>
              <textarea
                name="description"
                value={editedMeal.description}
                onChange={handleChange}
                placeholder="Descripción de la receta"
              ></textarea>
              <textarea
                name="ingredients"
                value={editedMeal.ingredients}
                onChange={handleChange}
                placeholder="Ingredientes"
              ></textarea>
            </>
          ) : (
            <>
              <h1 className="MealTitle">Preparació i ingredients</h1>
              <ul className="IngredientList">{meal.description}</ul>
              <ul className="IngredientList">
                Ingredients: {meal.ingredients}
              </ul>
            </>
          )}
        </div>
        <div className="ButtonsWrapper">
          {isEditing ? (
            <div>
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit} className="EditButton">
                <MdEdit /> Editar
              </button>
              <button onClick={handleDelete} className="DeleteButton">
                <MdDelete /> Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealsDetail;
