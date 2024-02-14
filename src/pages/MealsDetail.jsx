import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/MealsDetail.scss"; // Importa el archivo SCSS

const MealsDetail = () => {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();

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

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MealsDetailWrapper">
      <div className="MealCard">
        <h1 className="MealTitle">{meal.name}</h1>
        <img src={meal.img} alt="meal-img" className="MealImage" />
        <p className="MealType">{meal.type.map((t) => t.name).join(", ")}</p>
      </div>
      <div className="IngredientsCard">
        <h1 className="MealTitle">Llista de la compra</h1>
        <ul className="IngredientList">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index} className="IngredientItem">
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealsDetail;
