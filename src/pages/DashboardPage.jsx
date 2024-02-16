import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/DashboardPage.scss";
import NavbarComponent from "../components/NavbarComponent";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [selectedIngredient1, setSelectedIngredient1] = useState("");
  const [selectedIngredient2, setSelectedIngredient2] = useState("");
  const [selectedIngredient3, setSelectedIngredient3] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

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

  useEffect(() => {
    const filtered = meals.filter((meal) => {
      return (
        (selectedIngredient1
          ? meal.ingredients.includes(selectedIngredient1)
          : true) &&
        (selectedIngredient2
          ? meal.ingredients.includes(selectedIngredient2)
          : true) &&
        (selectedIngredient3
          ? meal.ingredients.includes(selectedIngredient3)
          : true) &&
        (selectedType ? meal.type === selectedType : true) &&
        (selectedDuration ? meal.duration === selectedDuration : true)
      );
    });
    setFilteredMeals(filtered);
  }, [
    selectedIngredient1,
    selectedIngredient2,
    selectedIngredient3,
    selectedType,
    selectedDuration,
    meals,
  ]);

  const handleChangeIngredient1 = (e) => {
    setSelectedIngredient1(e.target.value);
  };

  const handleChangeIngredient2 = (e) => {
    setSelectedIngredient2(e.target.value);
  };

  const handleChangeIngredient3 = (e) => {
    setSelectedIngredient3(e.target.value);
  };

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
  };

  const handleChangeDuration = (e) => {
    setSelectedDuration(e.target.value);
  };

  return (
    <div className="dashboard">
      <NavbarComponent />
      <div className="filters">
        <div className="filter">
          <label htmlFor="ingredient1">Ingredient</label>
          <input
            type="text"
            id="ingredient1"
            placeholder="Seleciona el ingredient"
            value={selectedIngredient1}
            onChange={handleChangeIngredient1}
          />
        </div>
        <div className="filter">
          <label htmlFor="ingredient2">Ingredient</label>
          <input
            type="text"
            id="ingredient2"
            placeholder="Selecciona el ingredient"
            value={selectedIngredient2}
            onChange={handleChangeIngredient2}
          />
        </div>
        <div className="filter">
          <label htmlFor="ingredient3">Ingredient</label>
          <input
            type="text"
            id="ingredient3"
            placeholder="Selecciona el ingredient"
            value={selectedIngredient3}
            onChange={handleChangeIngredient3}
          />
        </div>
        <div className="filter">
          <label htmlFor="type">Tipo</label>
          <select id="type" value={selectedType} onChange={handleChangeType}>
            <option value="">Selecciona el tipus</option>
            {/* Replace options with your actual type list */}
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="duration">Preparació</label>
          <select
            id="duration"
            value={selectedDuration}
            onChange={handleChangeDuration}
          >
            <option value="">Temps de preparació</option>
            {/* Replace options with your actual duration list */}
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="90">90 minutes</option>
          </select>
        </div>
        <div>
          <Link to="/create" className="link">
            <button className="button-create">Nova Recepta</button>
          </Link>
        </div>
      </div>
      <div className="meals">
        {filteredMeals.map((meal) => (
          <div className="meal" key={meal._id}>
            <Link to={`/meals/detail/${meal._id}`} className="meal-link">
              <img src={meal.img} alt={meal.name} />
              <h3>{meal.name}</h3>
              <p>{meal.type}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
