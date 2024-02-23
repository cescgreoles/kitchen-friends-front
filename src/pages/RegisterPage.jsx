import React, { useState } from "react";
import axios from "axios";
import "../styles/RegisterPage.scss";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    code: "", // Cambiado de accessCode a code
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="container">
      <div className="registration-box">
        <h2>Registra't </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            <label htmlFor="password">Contrasenya</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Registrar-se</button>
        </form>
        <Link to="/login" className="textLink">
          <p className="textLink">Ja tens compte amb nosaltres?</p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
