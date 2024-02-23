import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en el localStorage
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            // Ruta corregida
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado de la solicitud
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Perfil de Usuario</h1>
      <div className="avatar">
        <img src={user.avatar} alt="Avatar" />
      </div>
      <div className="user-details">
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Correo Electrónico:</strong> {user.email}
        </p>
        <p>
          <strong>Ubicación:</strong> {user.location}
        </p>
        <p>
          <strong>Fecha de Registro:</strong> {user.createdAt}
        </p>
        {/* Agrega más detalles del perfil según sea necesario */}
      </div>
      {/* Otras secciones del perfil, como biografía, intereses, etc. */}
    </div>
  );
};

export default ProfilePage;
