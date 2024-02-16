import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      console.log(response.data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 2000); // Close modal after 2 seconds and navigate to dashboard
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="container">
      <div className={`login-box ${showModal ? "hidden" : ""}`}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <Link to="/register" className="textLink">
          <p className="textLink">No estás registrado?</p>
        </Link>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
