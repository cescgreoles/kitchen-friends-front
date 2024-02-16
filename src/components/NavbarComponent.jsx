import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import "../styles/NavbarComponent.scss";

const NavbarComponent = ({
  isLoggedIn = true,
  logoutEndpoint = "",
  logoutRedirectPath = "/login",
  title = "Les Receptes",
  createRecipePath = "/create",
  loginPath = "/login",
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (logoutEndpoint) {
        // Realizar la solicitud para cerrar sesión al backend
        await axios.post(logoutEndpoint);
      }
      // Actualizar el estado de isLoggedIn
      navigate(logoutRedirectPath); // Redireccionar al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to={createRecipePath} className="navbar__link">
          <FontAwesomeIcon icon={faPlus} className="navbar__icon" />
        </Link>
      </div>
      <div className="navbar__center">
        <h1 className="navbar__title">{title}</h1>
      </div>
      <div className="navbar__right">
        {isLoggedIn ? (
          <button className="navbar__logout" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        ) : (
          <Link to={loginPath} className="navbar__link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
