import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import "../styles/MealsDetail.scss";

const MealsDetail = () => {
  const [meal, setMeal] = useState(null);
  const [allIngrediets, setAllIngrediets] = useState([]);
  const [editedMeal, setEditedMeal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const [mealsResponse, ingredientsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/meals/${id}`),
          axios.get(`http://localhost:3000/ingredients`),
        ]);

        setMeal(mealsResponse.data);
        setEditedMeal(mealsResponse.data);
        setAllIngrediets(ingredientsResponse.data);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMeal();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/meals/edit/${id}`,
        {
          name: editedMeal.name,
          type: editedMeal.type,
          duration: editedMeal.duration,
          cook: editedMeal.cook,
          description: editedMeal.description,
          ingredients: editedMeal.ingredients.map(
            (ingredient) => ingredient._id
          ),
          img: imageFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditing(false);
      setMeal(editedMeal); // Actualiza la receta mostrada después de editar
    } catch (error) {
      console.error("Error editing meal:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMeal(meal); // Revierte los cambios
    setImageFile(null); // Revierte la selección de la imagen
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMeal({ ...editedMeal, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/meals/delete/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleDeleteIngredientFromMeal = async (ingredientId) => {
    const updatedMeal = {
      ...editedMeal,
      ingredients: editedMeal.ingredients.filter(
        (ingredient) => ingredient._id !== ingredientId
      ),
    };

    setEditedMeal(updatedMeal);
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MealsDetailWrapper">
      <div className="MealCard">
        <div className="MealContent">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedMeal.name}
                onChange={handleChange}
                placeholder="Nombre de la receta"
              />
              <input
                type="text"
                name="type"
                value={editedMeal.type}
                onChange={handleChange}
                placeholder="Tipo de receta"
              />
              <input
                type="text"
                name="duration"
                value={editedMeal.duration}
                onChange={handleChange}
                placeholder="Duración en minutos"
              />
              <input
                type="text"
                name="cook"
                value={editedMeal.cook}
                onChange={handleChange}
                placeholder="Cocina"
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </>
          ) : (
            <>
              <h1 className="MealTitle">{meal.name}</h1>
              <img src={meal.img} alt="meal-img" className="MealImage" />
              <div className="MealPack">
                <p className="MealType">{meal.type}</p>
                <p className="MealType">{meal.duration} minutos</p>
                <p className="MealType">{meal.cook}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="IngredientsCard">
        <div className="IngredientsContent">
          {isEditing ? (
            <>
              <textarea
                name="description"
                value={editedMeal.description}
                onChange={handleChange}
                placeholder="Descripción de la receta"
              ></textarea>

              {editedMeal.ingredients.map((ingredient, index) => (
                <div className="delete-edit" key={ingredient._id}>
                  <p>{ingredient.name}</p>
                  <button
                    onClick={() =>
                      handleDeleteIngredientFromMeal(ingredient._id)
                    }
                    className="delete-paper"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}

              <select
                defaultValue={"none"}
                onChange={(e) => {
                  const selectedIngredient = allIngrediets.find(
                    (ingredient) => ingredient._id === e.target.value
                  );
                  setEditedMeal({
                    ...editedMeal,
                    ingredients: [
                      ...editedMeal.ingredients,
                      selectedIngredient,
                    ],
                  });
                }}
              >
                <option disabled value="none">
                  Afegir ingredient
                </option>
                {allIngrediets
                  .filter(
                    (ingredient) =>
                      !editedMeal.ingredients.some(
                        (selectedIngredient) =>
                          selectedIngredient._id === ingredient._id
                      )
                  )
                  .map((ingredient) => (
                    <option key={ingredient._id} value={ingredient._id}>
                      {ingredient.name}
                    </option>
                  ))}
              </select>

              {/* Create a new ingredient */}
            </>
          ) : (
            <>
              <h1 className="MealTitle">Preparació i ingredients</h1>
              <ul className="IngredientList">{meal.description}</ul>
              <ul className="IngredientList">
                Ingredients:{" "}
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient._id}>{ingredient.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="ButtonsWrapper">
          {isEditing ? (
            <div>
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit} className="EditButton">
                <MdEdit /> Editar
              </button>
              <button onClick={handleDelete} className="DeleteButton">
                <MdDelete /> Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealsDetail;
