import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSignOutAlt } from "react-icons/fa";

import axios from "axios";
import "../styles/NavbarComponent.scss";

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Supongamos que el usuario está inicialmente logeado
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Realizar la solicitud para cerrar sesión al backend
      await axios.post("http://localhost:3000/users/logout");
      setIsLoggedIn(false); // Actualizar el estado de isLoggedIn
      navigate("/login"); // Redireccionar al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/create" className="navbar__link">
          <FontAwesomeIcon icon={faPlus} className="navbar__icon" />
        </Link>
      </div>
      <div className="navbar__center">
        <h1 className="navbar__title">Les Receptes</h1>
      </div>
      <div className="navbar__right">
        {isLoggedIn ? (
          <button className="navbar__logout" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        ) : (
          <Link to="/login" className="navbar__link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
