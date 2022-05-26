// import statements
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const RecipeCard = (props) => {
  //const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  //   TODO:
  // Connect API to display all the recipes from a user.
  //   Figure out a way to map it.

  //   let recipePath = `http://localhost:5000/${props.user.recipes}`;

  return (
    <div id="userCard">
      {/* STEP TWO: map over recipes array */}
      {props.recipes &&
        props.recipes.map((element, index) =>
          element.recipes.map((recipe, index) => {
            return (
              <div key={index}>
                <h2> Name:</h2>
                <p>{recipe.name}</p>
                <h2> Author:</h2>
                <p>{recipe.author}</p>
                <h2> Ingredients:</h2>
                <p>{recipe.ingredients}</p>
                <h2> Cook_Time:</h2>
                <p>{recipe.cook_time}</p>
                <h2> Preparation_Time:</h2>
                <p>{recipe.preparation_time}</p>
                <h2> Yield:</h2>
                <p>{recipe.yield}</p>
              </div>
            );
          })
        )}
    </div>
  );
};

export default RecipeCard;
