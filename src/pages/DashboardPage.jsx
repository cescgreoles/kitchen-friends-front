import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/DashboardPage.scss";
import NavbarComponent from "../components/NavbarComponent";
import CreateRecipe from "../components/CreateRecipe";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);

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

  return (
    <div className="dashboard">
      <NavbarComponent />
      <CreateRecipe />
      <div className="meals">
        {meals.map((meal) => (
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
