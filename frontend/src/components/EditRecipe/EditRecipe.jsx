import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import RecipePhotoUpload from "../RecipePhotoUpload/RecipePhotoUpload";

const EditRecipe = (props) => {
  const { user, setUser } = useContext(AuthContext);
  // Recipe Edit state variables
  const [editName, setEditName] = useState("");
  const [editIngredients, setEditIngredients] = useState("");
  const [editCook_Time, setEditCook_Time] = useState("");
  const [editPreparation_Time, setEditPreparation_Time] = useState("");
  const [editServing_Size, setEditServing_Size] = useState();
  const [editRecipe_Yield, setEditRecipe_Yield] = useState();
  const [editRecipe_Directions, setEditRecipe_Directions] = useState();
  const [editCalories, setEditCalories] = useState();

  //   console log tests for state variables

  // console.log(editName);

  // State variables for photo upload
  const [previewUrl, setPreviewUrl] = useState();
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  // setting a file.
  const [file, setFile] = useState();

  // console.log(file);

  // referencing the URL
  const filePickerRef = useRef();

  // BASE URL for API
  const BASE = "http://localhost:5000/api";

  useEffect(() => {
    //   if there is no file put through the selector.
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  // Checking the file is the right size and even a file.
  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length == 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setisValid(true);
    } else {
      setisValid(false);
    }
  };

  // Create a function that will allow the user to update a recipe
  const handleRecipeEdit = async (event) => {
    // Step ONE: prevent the page from reloading
    event.preventDefault();

    // STEP TWO: create object to modify the contents
    let recipeEditForm = new FormData();
    recipeEditForm.append("name", editName);
    recipeEditForm.append("ingredients", editIngredients);
    recipeEditForm.append("cook_time", editCook_Time);
    recipeEditForm.append("preparation_time", editPreparation_Time);
    recipeEditForm.append("directions", editRecipe_Directions);
    recipeEditForm.append("serving_size", editServing_Size);
    recipeEditForm.append("yield", editRecipe_Yield);
    recipeEditForm.append("calories", editCalories);
    recipeEditForm.append("image", file);

    //  STEP THREE AXIOS call: PUT request
    try {
      let updatedRecipe;

      updatedRecipe = await axios
        .put(
          `${BASE}/recipes/${user._id}/recipes/${props.recipeID}`,
          recipeEditForm
        )
        .then((res) => {
          console.log(res.data);
        });
      // Update the state
      // props.setNewRecipe(...props.newRecipe, updatedRecipe);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      console.log(`Error: ${error.request}`);
      console.log(`Error: ${error.res.data}`);
    }
    // Update the data through an API call
    alert("Recipe has been updated!");
    props.handleGetUserRecipes();
  };

  return (
    //   Form template and data that will need to be sent.

    <>
      <form onSubmit={(e) => handleRecipeEdit(e)}>
        <div>
          <button onClick={() => props.handleRecipeSelect(undefined)}>
            &times;
          </button>
          <h2>Edit Recipe </h2>
          <span>Recipe Name:</span> <br></br>
          <input
            type="text"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
          <br></br>
          <span> Ingredients:</span> <br></br>
          <input
            type="text"
            value={editIngredients}
            onChange={(event) => setEditIngredients(event.target.value)}
          />
          <br></br>
          <span>Cook_Time:</span> <br></br>
          <input
            type="text"
            value={editCook_Time}
            onChange={(event) => setEditCook_Time(event.target.value)}
          />
          <br />
          <span>Preparation_Time:</span> <br></br>
          <input
            type="text"
            value={editPreparation_Time}
            onChange={(event) => setEditPreparation_Time(event.target.value)}
          />
          <br />
          <span>Directions:</span> <br></br>
          <input
            type="text"
            value={editRecipe_Directions}
            onChange={(event) => setEditRecipe_Directions(event.target.value)}
          />
          <br />
          <span>Serving_Size:</span> <br></br>
          <input
            type="number"
            value={editServing_Size}
            onChange={(event) => setEditServing_Size(event.target.value)}
          />
          <br />
          <span>Yield:</span> <br></br>
          <input
            type="number"
            value={editRecipe_Yield}
            onChange={(event) => setEditRecipe_Yield(event.target.value)}
          />
          <br />
          <span>Calories:</span> <br></br>
          <input
            type="number"
            min={100}
            value={editCalories}
            onChange={(event) => setEditCalories(event.target.value)}
          />
          {/* <label>Photo</label>
        <input
          type="file"
          ref={filePickerRef}
          accept=".jpg,.png,.jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        /> */}
        </div>
        <span>
          {" "}
          <button type="submit"> Submit Recipe</button>
        </span>
      </form>
      <RecipePhotoUpload
        recipeID={props.recipeID}
        handleGetUserRecipes={props.handleGetUserRecipes}
        profileRecipes={props.newRecipe}
      />
    </>
  );
};

export default EditRecipe;
