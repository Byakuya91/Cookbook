import React, { useState, useEffect } from "react";
import EditRecipe from "../EditRecipe/EditRecipe";

const ProfileRecipeCardMapper = (props) => {
  // use effect triggered whenever the recipe changes

  // useEffect(() => {
  //   props.handleGetUserRecipes();
  // }, [props.userRecipe]);

  const [profileRecipeId, setProfileRecipeId] = useState();

  return (
    // Container for the Map
    <div classname="profile-Recipe-Card">
      {props.selectedRecipe && (
        <EditRecipe
          classname="Edit_Recipe_Container"
          recipeID={props.selectedRecipeId}
          handleGetUserRecipes={props.handleGetUserRecipes}
        />
      )}
      {/* Filtering properties for the recipe Card itself */}
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
          // Map for RecipeCard and properties.
          .map((profileRecipe, index) => {
            return (
              <div key={profileRecipe._id}>
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
                <button onClick={() => props.recipeDelete(profileRecipe._id)}>
                  Delete
                </button>

                <button
                  onClick={() => props.handleRecipeSelect(profileRecipe._id)}
                >
                  Edit
                </button>
                {/* {props.selectedRecipe && (
                  <EditRecipe
                    recipeID={profileRecipe._id}
                    handleGetUserRecipes={props.handleGetUserRecipes}
                  />
                )} */}
              </div>
            );
          })}
    </div>
  );
};

export default ProfileRecipeCardMapper;
