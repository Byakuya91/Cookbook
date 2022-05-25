import RecipeCard from "../RecipeCard/RecipeCard";
import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

// pass in the the user Data from props
// function handleRecipeRetrieval({
//    pass
// })

const RecipeMapper = (props) => {
  // state variables for the recipe.
  const [recipe, setRecipe] = useState([]);
  //   check if we have the recipe data

  console.log(recipe);

  // UseEffect to trigger the retrival function
  useEffect(() => {
    makeRecipeGetRequest();
  }, []);
  // API call to the backend
  async function makeRecipeGetRequest() {
    try {
      // API call to my backend
      const jwt = localStorage.getItem("token");
      let recipeResponse = await axios.get(`http://localhost:5000/api/users`, {
        headers: {
          "x-auth-token": jwt,
        },
      });
      // setting the data equal to state variables
      setRecipe(recipeResponse.data);
      console.log(recipeResponse);
    } catch (error) {
      console.log(error.message);
    }
  }

  // TODO: figure out a way to map out each recipe element
  return (
    <>
      <h2>Recipe List</h2>
      <RecipeCard />
    </>
  );
};

export default RecipeMapper;
