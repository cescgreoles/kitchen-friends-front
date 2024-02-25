import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import "../styles/DashboardPage.scss";
import NavbarComponent from "../components/NavbarComponent";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredMeals = meals.filter((meal) => {
    return (
      (selectedType ? meal.type === selectedType : true) &&
      (selectedDuration ? meal.duration === selectedDuration : true) &&
      selectedIngredients.every((ingredient) =>
        meal.ingredients.map((ing) => ing.name).includes(ingredient)
      )
    );
  });

  const allIngredients =
    meals.length > 0
      ? meals.flatMap((meal) => meal.ingredients.map((ing) => ing.name))
      : [];
  const uniqueIngredients = [...new Set(allIngredients)];

  const ingredientOptions = uniqueIngredients.map((ingredient) => ({
    value: ingredient,
    label: ingredient,
  }));

  const allIngredientsOption = {
    value: "all",
    label: "Todos los ingredientes",
  };

  const handleIngredientChange = (selectedOptions) => {
    if (selectedOptions.some((option) => option.value === "all")) {
      setSelectedIngredients(uniqueIngredients);
    } else {
      setSelectedIngredients(selectedOptions.map((option) => option.value));
    }
  };

  return (
    <div className="dashboard">
      <NavbarComponent />
      <div>
        <div className="filters">
          <button className="toggle-filters-button" onClick={toggleFilters}>
            Filtros
          </button>
          {showFilters && (
            <div className="filter-options">
              <div className="filter">
                <label htmlFor="type">Tipo</label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option value="">Selecciona el tipo</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
              <div className="filter">
                <label htmlFor="duration">Preparación</label>
                <select
                  id="duration"
                  value={selectedDuration}
                  onChange={handleDurationChange}
                >
                  <option value="">Duración de preparación</option>
                  <option value="30">30 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                </select>
              </div>
              <div className="filter">
                <label>Ingredientes</label>
                <Select
                  value={ingredientOptions.filter((option) =>
                    selectedIngredients.includes(option.value)
                  )}
                  isMulti
                  options={[allIngredientsOption, ...ingredientOptions]}
                  onChange={handleIngredientChange}
                />
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Dashboard;
