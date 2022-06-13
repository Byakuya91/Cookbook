import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import RemoveFavoriteRecipeButton from "../RemoveFavoriteRecipeButton/RemoveFavoriteRecipeButton";
import FavoriteRecipeSearch from "../FavoriteRecipeSearch/FavoriteRecipeSearch";
import FavoriteIngredientsList from "../FavoriteIngredientsList/FavoriteIngredientsList";

const FavoriteRecipeMapper = (props) => {
  // test searchFavoriteRecipe

  // TODOS: Redo this entire MAPPER AS FOLLOWS:
  // 1)  Map through favoriteRecipes where favorite is equal to true
  // 2)  Filter through the recipes where favorite is equal to False(We have a toggle button)
  // 3) Map through the filteredArray to include the cards themselves
  // 4) Add the search critera to the mapper in the filter portion.

  useEffect(() => {
    props.getFavoriteRecipes();
  }, []);

  // console.log(" the favorite recipes are:", props.favoriteRecipes);

  return (
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
                  <div>
                    {recipe.image !== undefined && (
                      <img src={`http://localhost:5000/${recipe.image}`}></img>
                    )}
                  </div>
                  <h2> Author:</h2>
                  <p>{recipe.author}</p>
                  <h2> Ingredients:</h2>
                  {recipe.ingredients.map((ingredient) => (
                    // <div>
                    //   <p>
                    //     {ingredient.amount} {ingredient.unit} of{" "}
                    //     {ingredient.name}
                    //   </p>
                    // </div>
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
  );
};

export default FavoriteRecipeMapper;
