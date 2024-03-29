import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Button } from "@mui/material";

const RemoveFavoriteRecipeButton = (props) => {
  // BASE URL
  const BASE = "http://localhost:5000/api";
  // Contextfor the user
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");

  // STEPS
  // 1) Create function to add a recipe to favorites with an axos call.
  // 2) Do the same for deleting a favorite recipe
  // 3) console.log the information/ give an alert.

  // function to add a recipe

  // console.log(
  //   "The recipe ID before the handleRFR function is:",
  //   props.recipeID
  // );

  const handleRemoveFavoriteRecipe = async (id) => {
    // Step One: create a field for the recipe

    // let favoriteRecipeValue = {
    //    "favorite": true

    // };

    //   Step two: AXIOS request
    console.log("the RecipeID is:", props.recipeID);

    try {
      await axios
        .patch(
          `http://localhost:5000/api/recipes/${user._id}/favoriteRecipes/${id}`,
          {},
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log(props.recipeID);
        });

      alert("Favorite recipe removed from Favorites");
      props.getFavoriteRecipes();
    } catch (error) {
      console.log(`Error: ${error.message}`);
      console.log(`Error: ${error.request}`);
      console.log(`Error: ${error.response.data}`);
    }
  };

  // useEffect(() => {
  //   handleAddFavoriteRecipe();
  // }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleRemoveFavoriteRecipe(props.recipeID)}
      >
        Remove from Favorites
      </Button>
    </div>
  );
};

export default RemoveFavoriteRecipeButton;
