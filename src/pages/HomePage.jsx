import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.scss";
import Logo from "../assets/El Sofregit.png";

const HomePage = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="logo-container">
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <div className="buttons-container">
          <Link to="/register" className="button">
            Registrar-se
          </Link>
          <Link to="/login" className="button">
            Inicia Sessió
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
