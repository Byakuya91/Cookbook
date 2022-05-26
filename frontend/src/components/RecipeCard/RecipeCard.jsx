// import statements
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
          element.recipes
            .filter(
              (recipe) =>
                recipe.name
                  .toLowerCase()
                  .includes(props.searchRecipe.toLowerCase()) ||
                (recipe.ingredients &&
                  recipe.ingredients
                    .toLowerCase()
                    .includes(props.searchRecipe.toLowerCase())) ||
                (recipe.cook_time &&
                  recipe.cook_time
                    .toLowerCase()
                    .includes(props.searchRecipe.toLowerCase())) ||
                (recipe.preparation_time &&
                  recipe.preparation_time
                    .toLowerCase()
                    .includes(props.searchRecipe.toLowerCase())) ||
                (recipe.serving_size &&
                  recipe.serving_size === parseInt(props.searchRecipe)) ||
                (recipe.yield && recipe.yield === parseInt(props.searchRecipe))
            )
            .map((recipe, index) => {
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
                  <h2> Serving_Size:</h2>
                  <p>{recipe.serving_size}</p>
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
