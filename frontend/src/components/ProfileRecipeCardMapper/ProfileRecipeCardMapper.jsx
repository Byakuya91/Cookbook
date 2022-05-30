import React, { useState } from "react";

const ProfileRecipeCardMapper = (props) => {
  return (
    // <h3>This is a mapper Test</h3>
    <div classname="profile-Recipe-Card">
      {props.profileRecipes &&
        props.profileRecipes
          .filter(
            (profileRecipe) =>
              profileRecipe.name
                .toLowerCase()
                .includes(props.searchRecipe.toLowerCase()) ||
              (profileRecipe.ingredients &&
                profileRecipe.ingredients
                  .toLowerCase()
                  .includes(props.searchRecipe.toLowerCase())) ||
              (profileRecipe.cook_time &&
                profileRecipe.cook_time
                  .toLowerCase()
                  .includes(props.searchRecipe.toLowerCase())) ||
              (profileRecipe.preparation_time &&
                profileRecipe.preparation_time
                  .toLowerCase()
                  .includes(props.searchRecipe.toLowerCase())) ||
              (profileRecipe.serving_size &&
                profileRecipe.serving_size === parseInt(props.searchRecipe)) ||
              (profileRecipe.yield &&
                profileRecipe.yield === parseInt(props.searchRecipe)) ||
              (profileRecipe.calories &&
                profileRecipe.calories === parseInt(props.searchRecipe))
          )

          .map((profileRecipe, index) => {
            return (
              <div key={index}>
                <h2> Name:</h2>
                <p>{profileRecipe.name}</p>
                <h2> Image:</h2>
                <div>
                  {profileRecipe.image !== undefined && (
                    <img
                      src={`http://localhost:5000/${profileRecipe.image}`}
                    ></img>
                  )}
                </div>
                <h2> Author:</h2>
                <p>{profileRecipe.author}</p>
                <h2> Ingredients:</h2>
                <p>{profileRecipe.ingredients}</p>
                <h2> Cook_Time:</h2>
                <p>{profileRecipe.cook_time}</p>
                <h2> Directions:</h2>
                <p>{profileRecipe.directions}</p>
                <h2> Preparation_Time:</h2>
                <p>{profileRecipe.preparation_time}</p>
                <h2> Serving_Size:</h2>
                <p>{profileRecipe.serving_size}</p>
                <h2> Yield:</h2>
                <p>{profileRecipe.yield}</p>
                <button onClick={() => props.recipeDelete(props.recipe)}>
                  Delete
                </button>
                <button>Edit</button>
              </div>
            );
          })}
    </div>
  );
};

export default ProfileRecipeCardMapper;
