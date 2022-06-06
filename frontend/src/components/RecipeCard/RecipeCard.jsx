// import statements
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import React, { useState, useEffect } from "react";
import RemoveFavoriteRecipeButton from "../RemoveFavoriteRecipeButton/RemoveFavoriteRecipeButton";

const RecipeCard = (props) => {
  //const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  const [favoriteRecipe, setFavoriteRecipe] = useState();

  // TODO: Figure out a way to re-render the page whenever the favorites is changed.
  // [props.recipes] removed from UseEffect

  useEffect(() => {
    props.makeRecipeGetRequest();
  }, []);

  //  a way to count for case sensitivity

  // const searchRecipeLowerCased = props.searchRecipe.toLowerCase();

  console.log(props.searchRecipe);

  return (
    <div id="userCard">
      {/* STEP ONE: map over recipes array */}
      {props.recipes &&
        props.recipes.map((element, index) =>
          element.recipes
            .filter(
              (recipe) =>
                recipe.name
                  ?.toLowerCase()
                  .includes(props.searchRecipe.toLowerCase()) ||
                // .toLowerCase()
                (recipe.ingredients &&
                  recipe.ingredients
                    ?.toLowerCase()
                    .includes(props.searchRecipe.toLowerCase())) ||
                // .toLowerCase()
                (recipe.cook_time &&
                  recipe.cook_time?.includes(
                    props.searchRecipe.toLowerCase()
                  )) ||
                // .toLowerCase()
                (recipe.preparation_time &&
                  recipe.preparation_time?.includes(
                    props.searchRecipe.toLowerCase()
                  )) ||
                // .toLowerCase()
                (recipe.serving_size &&
                  recipe.serving_size === parseInt(props.searchRecipe)) ||
                (recipe.yield &&
                  recipe.yield === parseInt(props.searchRecipe)) ||
                (recipe.calories &&
                  recipe.calories === parseInt(props.searchRecipe))
            )
            // STEP TWO: MAP OVER RECIPES
            .map((recipe, index) => {
              return (
                // Abstract this in a new component: UserRecipeCard/ change this to AllRecipesMapper.
                <div key={recipe._id}>
                  <h2> Name:</h2>
                  <p>{recipe.name}</p>
                  <h2> Image:</h2>
                  <div>
                    {recipe.image !== undefined && (
                      <img src={`http://localhost:5000/${recipe.image}`}></img>
                    )}
                  </div>
                  <h2> Author:</h2>
                  <p>{recipe.author}</p>
                  <h2> Ingredients:</h2>
                  <p>{recipe.ingredients}</p>
                  <h2> Calories:</h2>
                  <p>{recipe.calories}</p>
                  <h2> Cook_Time:</h2>
                  <p>{recipe.cook_time}</p>
                  <h2> Directions:</h2>
                  <p>{recipe.directions}</p>
                  <h2> Preparation_Time:</h2>
                  <p>{recipe.preparation_time}</p>
                  <h2> Serving_Size:</h2>
                  <p>{recipe.serving_size}</p>
                  <h2> Yield:</h2>
                  <p>{recipe.yield}</p>
                  <span>
                    {" "}
                    {recipe.favorite ? (
                      <RemoveFavoriteRecipeButton recipeID={recipe._id} />
                    ) : (
                      <FavoritesButton recipeID={recipe._id} />
                    )}
                  </span>
                </div>
              );
            })
        )}
    </div>
  );
};

export default RecipeCard;
