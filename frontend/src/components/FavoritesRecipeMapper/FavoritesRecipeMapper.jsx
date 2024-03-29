import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import RemoveFavoriteRecipeButton from "../RemoveFavoriteRecipeButton/RemoveFavoriteRecipeButton";
import FavoriteRecipeSearch from "../FavoriteRecipeSearch/FavoriteRecipeSearch";
import FavoriteIngredientsList from "../FavoriteIngredientsList/FavoriteIngredientsList";
import CardMedia from "@mui/material/CardMedia";
import AuthContext from "../../context/AuthContext";
import { Paper } from "@mui/material";

const FavoriteRecipeMapper = (props) => {
  // test searchFavoriteRecipe

  // TODOS: Redo this entire MAPPER AS FOLLOWS:
  // 1)  Map through favoriteRecipes where favorite is equal to true
  // 2)  Filter through the recipes where favorite is equal to False(We have a toggle button)
  // 3) Map through the filteredArray to include the cards themselves
  // 4) Add the search critera to the mapper in the filter portion.
  // SEARCH BAR complete if you have time
  useEffect(() => {
    props.getFavoriteRecipes();
  }, []);

  const { user } = useContext(AuthContext);

  // console.log(" the favorite recipes are:", props.favoriteRecipes);

  return (
    <Paper elevation={20}>
      <div>
        {props.favoriteRecipes &&
          props.favoriteRecipes.map((element, index) => {
            return element.recipes
              .filter(
                (recipe) =>
                  // console.log(recipe.favorite);
                  recipe.favorite === true || console.log(recipe.ingredients)
              )

              .map((recipe, index) => {
                // console.log(recipe.name);
                return (
                  <div key={index}>
                    <h2> Name:</h2>
                    <p>{recipe.name && recipe.name}</p>
                    <h2> Image:</h2>
                    <CardMedia
                      sx={{
                        width: "500px",
                        display: "inline-block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "1rem",
                      }}
                    >
                      {recipe.image !== undefined && (
                        <img
                          src={`http://localhost:5000/${recipe.image}`}
                        ></img>
                      )}
                    </CardMedia>
                    <h2> Author:</h2>
                    <p>{user.name}</p>
                    <h2> Ingredients:</h2>
                    {recipe.ingredients.map((ingredient) => (
                      <FavoriteIngredientsList
                        IngredientName={ingredient.name}
                        IngredientAmount={ingredient.amount}
                        IngredientUnit={ingredient.unit}
                      />
                    ))}
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
                    <h2> favorite:</h2>
                    <p>{recipe.favorite ? "True" : "False"}</p>
                    <RemoveFavoriteRecipeButton
                      recipeID={recipe._id}
                      getFavoriteRecipes={props.getFavoriteRecipes}
                    />
                  </div>
                );
              });
          })}
      </div>
    </Paper>
  );
};

export default FavoriteRecipeMapper;
