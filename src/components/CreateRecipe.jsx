import React from "react";
import "../styles/CreateRecipe.scss";
import { Link } from "react-router-dom";

const CreateRecipe = () => {
  return (
    <div className="createRecipe">
      <Link to="/create" className="link">
        Nova recepta
      </Link>
    </div>
  );
};

export default CreateRecipe;
