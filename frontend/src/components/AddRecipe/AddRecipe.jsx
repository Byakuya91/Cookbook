import React, { useState } from "react";
import axios from "axios";
// TO DO:
//   1) Establish a form to submit the data (DONE)
//   1) Establish a state variables for handling recipe data(DONE)
//   2) Create a function that does the following:
//   A) Creates a recipe object
//   B) Makes a Post request to Axios
//   C)  add the obj as a second parameter in the Post request

const AddRecipe = (props) => {
  // State variables to be affected
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cook_Time, setCook_Time] = useState("");
  const [preparation_Time, setPreparation_Time] = useState("");
  const [serving_Size, setServing_Size] = useState(Number);
  const [recipetYield, setRecipeYield] = useState(Number);

  return (
    //   Form template and data that will need to be sent.
    <form>
      <div>
        <span>Recipe Name:</span> <br></br>
        <input type="text"></input>
        <br></br>
        <span> Ingredients:</span> <br></br>
        <input type="text"></input>
        <br></br>
        <span>Cook_Time:</span> <br></br>
        <input type="text"></input>
        <br></br>
        <span>Preparation_Time:</span> <br></br>
        <input type="text"></input>
        <br></br>
        <span>Serving_Size:</span> <br></br>
        <input type="number"></input>
        <br></br>
        <span>Yield:</span> <br></br>
        <input type="number"></input>
      </div>
      <span>
        {" "}
        <button type="submit"> Submit Recipe</button>
      </span>
    </form>
  );
};

export default AddRecipe;
