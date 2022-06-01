import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import RemoveFavoriteRecipeButton from "../RemoveFavoriteRecipeButton/RemoveFavoriteRecipeButton";

const FavoriteRecipeMapper = (props) => {
  // State variables for the Favorites

  useEffect(() => {
    props.getFavoriteRecipes();
  }, [props.favoriteRecipes]);

  return (
    <div>
      {props.favoriteRecipes &&
        props.favoriteRecipes.map((element, index) => {
          return element.recipes
            .filter((recipe) => {
              // console.log(recipe.favorite);
              return recipe.favorite === true;
            })

            .map((recipe, index) => {
              // console.log(recipe.name);
              console.log(recipe.directions);
              return (
                <div key={index}>
                  <h2> Name:</h2>
                  <p>{recipe.name && recipe.name}</p>
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
                  <h2> favorite:</h2>
                  <p>{recipe.favorite ? "True" : "False"}</p>
                  <RemoveFavoriteRecipeButton recipeID={recipe._id} />
                </div>
              );
            });
        })}
    </div>
  );
};

export default FavoriteRecipeMapper;
