import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import RecipePhotoUpload from "../RecipePhotoUpload/RecipePhotoUpload";
import jwtDecode from "jwt-decode";

// TO DO:
//   1) Establish a form to submit the data (DONE)
//   1) Establish a state variables for handling recipe data(DONE)
//   2) Create a function that does the following:
//   A) Creates a recipe object(DONE)
//   B) Makes a Post request to Axios (DONE)
//   C)  add the obj as a second parameter in the Post request(DONE)

const AddRecipe = (props) => {
  const { user } = useContext(AuthContext);
  // State variables to create a new recipe
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cook_Time, setCook_Time] = useState("");
  const [preparation_Time, setPreparation_Time] = useState("");
  const [serving_Size, setServing_Size] = useState();
  const [recipe_Yield, setRecipe_Yield] = useState();
  const [recipe_Directions, setRecipe_Directions] = useState();
  const [calories, setCalories] = useState();

  // State variables for photo upload
  const [previewUrl, setPreviewUrl] = useState();
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  // setting a file.
  const [file, setFile] = useState();
  //  setting the user
  const [setUser] = useState();

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
    // new form object created to submit the file
    let form = new FormData();
    form.append("name", name);
    form.append("ingredients", ingredients);
    form.append("cook_time", cook_Time);
    form.append("preparation_time", preparation_Time);
    form.append("directions", recipe_Directions);
    form.append("serving_size", serving_Size);
    form.append("yield", recipe_Yield);
    form.append("calories", calories);
    form.append("image", file);

    console.log(form.getAll("image"));

    try {
      console.log(form);
      await axios
        .post(`${BASE}/recipes/${user._id}/recipes`, form, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((res) => {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          setUser(jwtDecode(localStorage.getItem("token")));
          console.log(res.data);
          alert("Recipe Posted!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //   Form template and data that will need to be sent.
    <form onSubmit={(e) => handleRecipePhotoSubmit(e)}>
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
        <br />
        <span>Calories:</span> <br></br>
        <input
          type="number"
          value={calories}
          min={100}
          onChange={(event) => setCalories(event.target.value)}
        />
        <label>Photo</label>
        <input
          name="file"
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </div>
      <span>
        {" "}
        <button type="submit"> Submit Recipe</button>
      </span>
      {/* <RecipePhotoUpload RecipeImage={props.homeRecipes} /> */}
      {/* Combine the photo upload with the recipe Component. */}
      {/* <div id="imageUploadComponent">
        <form onSubmit={(event) => handleRecipePhotoSubmit(event)}>
          <button type="submit">Submit button</button>
        </form>
      </div> */}
    </form>
  );
};

export default AddRecipe;
