import React, { useState, useEffect } from "react";
import FavoriteSection from "../../FavoriteSection/FavoriteSection";
// import EditRecipe from "../EditRecipe/EditRecipe";

const ProfileRecipeCardMapper = (props) => {
  // use effect triggered whenever the recipe changes

  // useEffect(() => {
  //   props.handleGetUserRecipes();
  // }, [props.userRecipe]);

  const [profileRecipeId, setProfileRecipeId] = useState();

  return (
    // Container for the Map
    <div className="profile-Recipe-Card">
      {console.log("The recipe names are as follows: ", props.profileRecipes)}

      {/* Filtering properties for the recipe Card itself */}
      {props.profileRecipes &&
        props.profileRecipes
          .filter(
            (profileRecipe) =>
              profileRecipe.name
                ?.toLowerCase()
                .includes(props.searchRecipe.toLowerCase()) ||
              // profileRecipe.ingredients
              //   ?.toLowerCase()
              //   .includes(props.searchRecipe.toLowerCase()) ||
              profileRecipe.cook_time
                ?.toLowerCase()
                .includes(props.searchRecipe.toLowerCase()) ||
              profileRecipe.preparation_time
                ?.toLowerCase()
                .includes(props.searchRecipe.toLowerCase()) ||
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
              <FavoriteSection
                key={index}
                rerender={props.rerender}
                profileRecipe={profileRecipe}
                handleRecipeSelect={props.handleRecipeSelect}
                recipeDelete={props.recipeDelete}
                handleGetUserRecipes={props.handleGetUserRecipes}
              />
            );
          })}
    </div>
  );
};

export default ProfileRecipeCardMapper;
