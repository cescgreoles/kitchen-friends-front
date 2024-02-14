import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/MealsDetail.scss"; // Importa el archivo SCSS
import { MdDelete, MdEdit } from "react-icons/md";

const MealsDetail = () => {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/meals/${id}`);
        setMeal(response.data);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMeal();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/meals/delete/${id}`);
      // Redirect to the dashboard or any other page after deletion
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page with the meal id
    navigate(`/meals/edit/${id}`);
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MealsDetailWrapper">
      <div className="MealCard">
        <h1 className="MealTitle">{meal.name}</h1>
        <img src={meal.img} alt="meal-img" className="MealImage" />
        <div className="MealPack">
          <p className="MealType">{meal.type}</p>
          <p className="MealType">{meal.duration} minutos</p>
          <p className="MealType">{meal.cook}</p>
        </div>
      </div>
      <div className="IngredientsCard">
        <h1 className="MealTitle">Lista de la compra</h1>
        <ul className="IngredientList">{meal.description}</ul>
        <ul className="IngredientList">{meal.ingredients}</ul>
        <div>
          <button onClick={handleEdit} className="button-edit">
            <MdEdit />
          </button>
          <button onClick={handleDelete} className="button-delete">
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealsDetail;
