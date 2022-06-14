import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import RecipePhotoUpload from "../RecipePhotoUpload/RecipePhotoUpload";
import jwtDecode from "jwt-decode";
import AddIngredient from "./AddIngredient";
import { Typography, Button, Container } from "@mui/material";
import "../AddRecipe/AddRecipe.css";

import SendIcon from "@mui/icons-material/Send";

// TO DO:
//   1) Establish a form to submit the data (DONE)
//   1) Establish a state variables for handling recipe data(DONE)
//   2) Create a function that does the following:
//   A) Creates a recipe object(DONE)
//   B) Makes a Post request to Axios (DONE)
//   C)  add the obj as a second parameter in the Post request(DONE)

const AddRecipe = (props) => {
  const { user, setUser } = useContext(AuthContext);
  // State variables to create a new recipe
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([{}]);
  const [cook_Time, setCook_Time] = useState("");
  const [preparation_Time, setPreparation_Time] = useState("");
  const [serving_Size, setServing_Size] = useState();
  const [recipe_Yield, setRecipe_Yield] = useState();
  const [recipe_Directions, setRecipe_Directions] = useState();
  const [calories, setCalories] = useState();

  console.log("the selected Ingredients are as follow: ", ingredients);

  // convert the state variable from object to string
  // let IngredientsJSON = JSON.stringify(ingredients);
  // console.log(IngredientsJSON);

  // State variables for photo upload
  const [previewUrl, setPreviewUrl] = useState();
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  // setting a file.
  const [file, setFile] = useState();
  //  setting the user
  // const [setUser] = useState();

  // referencing the URL
  const filePickerRef = useRef();

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
      calories: calories,
    };

    // STEP THREE: Axios request
    await axios
      .post(`${BASE}/recipes/${user._id}/recipes`, newRecipe)
      .then((res) => props.AddNewRecipe(res.data));
    alert("Recipe Added");
  }

  // UseEffect for photos

  useEffect(() => {
    //   if there is no file put through the selector.
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    console.log(fileReader.result);
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

  //   submitting the recipe photo function.

  const handleRecipePhotoSubmit = async (event) => {
    // prevents page from loading when submit button is clicked.
    event.preventDefault();
    console.log("the ingredients are", ingredients);
    // new form object created to submit the file
    let form = new FormData();
    form.append("name", name);
    // append ingredient objects to form data
    ingredients.forEach((item) => {
      form.append("ingredients[]", JSON.stringify(item));
    });

    // form.append("ingredients", IngredientsJSON);
    form.append("cook_time", cook_Time);
    form.append("preparation_time", preparation_Time);
    form.append("directions", recipe_Directions);
    form.append("serving_size", serving_Size);
    form.append("yield", recipe_Yield);
    form.append("calories", calories);
    form.append("image", file);

    console.log(
      "the Ingredients inside for the form is",
      form.getAll("ingredients[]")
    );

    try {
      console.log(form);
      await axios
        .post(`${BASE}/recipes/${user._id}/recipes`, form, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          setUser(jwtDecode(localStorage.getItem("token")));
          console.log(res.data);
        });

      alert("Recipe was added!");
      // console.log(form.getAll("ingredients"));
      props.handleGetUserRecipes();
    } catch (error) {
      console.log(error);
    }
  };

  // const ingredientsFields=()=>{
  //   let inputBoxes = [];
  //   for(let i = 0; i< numberOfIngredients; i++){
  //     inputBoxes.push(
  //       <label>

  //         <input name={'name'} onChange={(e)=> setIngredients(
  //           [...ingredients, {e.target.name: e.target.value}])}/>

  //       </label>
  //     )
  //   }
  // }

  return (
    //   Form template and data that will need to be sent.
    <form onSubmit={(e) => handleRecipePhotoSubmit(e)}>
      <div classname="form-field-container">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom={true}
          color="black"
          className="container"
        >
          Add a new Recipe
        </Typography>
        <label htmlFor="recipe_name">Recipe Name:</label> <br></br>
        <input
          type="text"
          id="recipe_name"
          required
          placeholder="Enter a Recipe..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br></br>
        <AddIngredient setIngredients={setIngredients} />
        <br></br>
        <label htmlFor="Cook_Time">Cook_Time:</label> <br></br>
        <input
          type="text"
          id="Cook_Time"
          required
          placeholder="Enter cook_time..."
          value={cook_Time}
          onChange={(event) => setCook_Time(event.target.value)}
        />
        <br />
        <label htmlFor="Preparation_Time">Preparation_Time:</label> <br></br>
        <input
          type="text"
          required
          placeholder="Enter prep_time..."
          id="Preparation_Time"
          value={preparation_Time}
          onChange={(event) => setPreparation_Time(event.target.value)}
        />
        <br />
        <label htmlFor="Directions">Directions:</label> <br></br>
        <input
          type="text"
          required
          id="Directions"
          placeholder="Enter Recipe Directions"
          value={recipe_Directions}
          onChange={(event) => setRecipe_Directions(event.target.value)}
        />
        <br />
        <label htmlFor="serving_size">Serving_Size:</label> <br></br>
        <input
          type="number"
          required
          id="serving_size"
          placeholder="Select a serving size..."
          value={serving_Size}
          onChange={(event) => setServing_Size(event.target.value)}
        />
        <br />
        <label htmlFor="yield">Yield:</label> <br></br>
        <input
          type="number"
          required
          placeholder="Select a calorie count..."
          min={1}
          id="yield"
          value={recipe_Yield}
          onChange={(event) => setRecipe_Yield(event.target.value)}
        />
        <br />
        <label htmlFor="calories">Calories:</label> <br></br>
        <input
          type="number"
          id="calories"
          required
          placeholder="Select calorie count..."
          value={calories}
          min={100}
          onChange={(event) => setCalories(event.target.value)}
        />
        <br />
        <label htmlFor="image">Photo</label>
        <br />
        <input
          name="file"
          required
          id="image"
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </div>
      <div>
        <Button
          variant="contained"
          disableElevation
          type="submit"
          endIcon={<SendIcon />}
        >
          Add Recipe
        </Button>
      </div>
    </form>
  );
};

export default AddRecipe;
