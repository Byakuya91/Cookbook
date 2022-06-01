import React from "react";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import FavoriteRecipeMapper from "../../components/FavoritesRecipeMapper/FavoritesRecipeMapper";

export default function FavoriteRecipesPage() {
  // State variables to hold the API data for all the users
  const [userFavoriteRecipes, setUserFavoriteRecipes] = useState([]);
  //  checking the data
  console.log("This is all the user's data: ", userFavoriteRecipes);

  //   UseEffect to grab the usersFavoriteRecipes
  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  async function getFavoriteRecipes() {
    try {
      // API call to my backend
      const jwt = localStorage.getItem("token");
      let recipeResponse = await axios.get(`http://localhost:5000/api/users`, {
        headers: {
          "x-auth-token": jwt,
        },
      });
      // setting the data equal to state variables
      // console.log("Recipe response data: ", recipeResponse.data);
      setUserFavoriteRecipes(recipeResponse.data);
      // console.log(recipeResponse);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h2>Favorite Recipes List</h2>;
      <FavoriteRecipeMapper
        favoriteRecipes={userFavoriteRecipes}
        getFavoriteRecipes={getFavoriteRecipes}
      />
    </>
  );
}
