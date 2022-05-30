import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import RecipePhotoUpload from "../RecipePhotoUpload/RecipePhotoUpload";

// TO DO:
//   1) Establish a form to submit the data (DONE)
//   1) Establish a state variables for handling recipe data(DONE)
//   2) Create a function that does the following:
//   A) Creates a recipe object(DONE)
//   B) Makes a Post request to Axios (DONE)
//   C)  add the obj as a second parameter in the Post request(DONE)

const AddRecipe = (props) => {
  const { user } = useContext(AuthContext);
  // State variables to be affected
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cook_Time, setCook_Time] = useState("");
  const [preparation_Time, setPreparation_Time] = useState("");
  const [serving_Size, setServing_Size] = useState();
  const [recipe_Yield, setRecipe_Yield] = useState();
  const [recipe_Directions, setRecipe_Directions] = useState();

  // Create a BASE URL
  const BASE = "http://localhost:5000/api";

  //  TODO: Hook up all variable names(DONE)

  // TODO: Create a submit function to take in the recipe object and submit the data
  async function handleNewRecipeSubmit(event) {
    // STEP ONE prevent the page from re-rendering
    event.preventDefault();

    // STEP TWO:  Create an obj to be passed into the new Recipe.
    let newRecipe = {
      name: name,
      ingredients: ingredients,
      cook_time: cook_Time,
      preparation_time: preparation_Time,
      directions: recipe_Directions,
      serving_size: serving_Size,
      yield: recipe_Yield,
    };

    // STEP THREE: Axios request
    await axios
      .post(`${BASE}/recipes/${user._id}/recipes`, newRecipe)
      .then((res) => props.AddNewRecipe(res.data));
    alert("Recipe Added");
  }

  return (
    //   Form template and data that will need to be sent.
    <form onSubmit={handleNewRecipeSubmit}>
      <div>
        <span>Recipe Name:</span> <br></br>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br></br>
        <span> Ingredients:</span> <br></br>
        <input
          type="text"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
        <br></br>
        <span>Cook_Time:</span> <br></br>
        <input
          type="text"
          value={cook_Time}
          onChange={(event) => setCook_Time(event.target.value)}
        />
        <br />
        <span>Preparation_Time:</span> <br></br>
        <input
          type="text"
          value={preparation_Time}
          onChange={(event) => setPreparation_Time(event.target.value)}
        />
        <br />
        <span>Directions:</span> <br></br>
        <input
          type="text"
          value={recipe_Directions}
          onChange={(event) => setRecipe_Directions(event.target.value)}
        />
        <br />
        <span>Serving_Size:</span> <br></br>
        <input
          type="number"
          value={serving_Size}
          onChange={(event) => setServing_Size(event.target.value)}
        />
        <br />
        <span>Yield:</span> <br></br>
        <input
          type="number"
          value={recipe_Yield}
          onChange={(event) => setRecipe_Yield(event.target.value)}
        />
      </div>
      <span>
        {" "}
        <button type="submit"> Submit Recipe</button>
      </span>
      {/* Add AddRecipePhoto component */}
      <RecipePhotoUpload RecipeImage={props.homeRecipes} />
    </form>
  );
};

export default AddRecipe;
