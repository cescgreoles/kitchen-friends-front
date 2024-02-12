import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DashboardPage.scss";
import NavbarComponent from "../components/NavbarComponent";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [editedMealData, setEditedMealData] = useState({
    name: "",
    description: "",
    duration: 0,
    ingredients: [],
    type: [],
  });

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/meals");
        setMeals(response.data);
      } catch (error) {
        console.error("Error al obtener las comidas:", error);
      }
    };

    fetchMeals();
  }, []);

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/meals/delete/${id}`);
      setMeals(meals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error("Error al eliminar la comida:", error);
    }
  };

  const editMeal = (meal) => {
    setEditingMeal(meal);
    setEditedMealData({ ...meal });
  };

  const cancelEdit = () => {
    setEditingMeal(null);
    setEditedMealData({
      name: "",
      description: "",
      duration: 0,
      ingredients: [],
      type: [],
    });
  };

  const saveEditedMeal = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/meals/edit/${editingMeal._id}`,
        editedMealData
      );
      const updatedMealIndex = meals.findIndex(
        (meal) => meal._id === editingMeal._id
      );
      const updatedMeals = [...meals];
      updatedMeals[updatedMealIndex] = response.data.mealModificado;
      setMeals(updatedMeals);
      setEditingMeal(null);
      setEditedMealData({
        name: "",
        description: "",
        duration: 0,
        ingredients: [],
        type: [],
      });
    } catch (error) {
      console.error("Error al editar la comida:", error);
    }
  };

  return (
    <div className="dashboard">
      <NavbarComponent />
      <div className="meals">
        {meals.map((meal) => (
          <div className="meal" key={meal._id}>
            <img src={meal.img} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p>{meal.description}</p>
            <p>Duración: {meal.duration} minutos</p>
            <h4>Ingredientes:</h4>
            <ul>
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
            <h4>Tipo:</h4>
            <ul>
              {meal.type.map((type, index) => (
                <li key={index}>{type.name}</li>
              ))}
            </ul>
            <button onClick={() => deleteMeal(meal._id)}>Eliminar</button>
            <button onClick={() => editMeal(meal)}>Editar</button>
          </div>
        ))}
      </div>
      {editingMeal && (
        <div className="edit-form">
          <h2>Editar Comida</h2>
          <label>Nombre:</label>
          <input
            type="text"
            value={editedMealData.name}
            onChange={(e) =>
              setEditedMealData({ ...editedMealData, name: e.target.value })
            }
          />
          <label>Descripción:</label>
          <textarea
            value={editedMealData.description}
            onChange={(e) =>
              setEditedMealData({
                ...editedMealData,
                description: e.target.value,
              })
            }
          />
          <label>Duración:</label>
          <input
            type="number"
            value={editedMealData.duration}
            onChange={(e) =>
              setEditedMealData({
                ...editedMealData,
                duration: parseInt(e.target.value),
              })
            }
          />
          <button onClick={saveEditedMeal}>Guardar</button>
          <button onClick={cancelEdit}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
