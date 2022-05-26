// import statements
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const RecipeCard = (props) => {
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  //   TODO:
  // Connect API to display all the recipes from a user.
  //   Figure out a way to map it.

  //   let recipePath = `http://localhost:5000/${props.user.recipes}`;

  return (
    <div id="userCard">
      {console.log(props.userRecipes)};
      {props.userRecipes &&
        props.userRecipes.map((userRecipe, index) => (
          <div key={index}>
            {/* STEP TWO: map over recipes array */}
            {userRecipe.map((recipe, index) => (
              <div key={index}>
                <label> Name:</label>
                <p>{recipe.name}</p>
                <label> Author:</label>
                <p>{recipe.author}</p>
                <label> Ingredients:</label>
                <p>{recipe.ingredients}</p>
                <label> Cook_Time:</label>
                <p>{recipe.cook_time}</p>
                <label> Preparation_Time:</label>
                <p>{recipe.preparation_time}</p>
                <label> Yield:</label>
                <p>{recipe.yield}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default RecipeCard;
