import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import RecipePhotoUpload from "../RecipePhotoUpload/RecipePhotoUpload";
import jwtDecode from "jwt-decode";
import AddIngredient from "./AddIngredient";
import "../AddRecipe/AddRecipe.css";
import {
  Typography,
  Button,
  Container,
  TextField,
  makeStyles,
  TextareaAutosize,
  Grid,
} from "@mui/material";

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

  const handleRecipeSubmit = async (event) => {
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

  return (
    //   Form template and data that will need to be sent.
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      // sx={{
      //   display: "flex",
      //   alignItems: "flex-start",
      // }}
      classname="form-field-container"
    >
      <Grid item>
        <form onSubmit={(e) => handleRecipeSubmit(e)}>
          <Typography
            variant="h4"
            component="h4"
            gutterBottom={true}
            className="container"
            color="primary"
            align="center"
            sx={{
              display: "flex",
              paddingBottom: "20px",
            }}
          >
            Add a new Recipe
          </Typography>
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="recipe_name"
            className="add-recipe-label"
            sx={{
              marginBottom: "2rem",
              display: "flex",
            }}
          >
            Recipe name:
          </Typography>
          <br></br>
          <span
            style={{
              display: "flex",
              marginTop: "--42px",
            }}
          >
            <TextField
              type="text"
              id="recipe_name"
              variant="outlined"
              size="small"
              required
              fullWidth
              placeholder="Enter a Recipe..."
              value={name}
              sx={{
                direction: "flex",
                marginTop: "-33px",
              }}
              onChange={(event) => setName(event.target.value)}
            />
          </span>
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <AddIngredient setIngredients={setIngredients} />
          </span>
          <Typography
            variant="h5"
            component="label"
            htmlFor="Cook_Time"
            className="add-recipe-label"
            color="secondary"
            sx={{
              display: "flex",
            }}
          >
            Cook_Time:
          </Typography>
          <br></br>
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <TextField
              type="text"
              id="Cook_Time"
              variant="outlined"
              size="small"
              required
              placeholder="Enter cook_time..."
              value={cook_Time}
              onChange={(event) => setCook_Time(event.target.value)}
            />
          </span>
          <br />
          <Typography
            variant="h5"
            component="label"
            htmlFor="Preparation_Time"
            className="add-recipe-label"
            color="secondary"
            sx={{
              display: "flex",
            }}
          >
            Preparation_Time:
          </Typography>{" "}
          <br></br>
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <TextField
              type="text"
              required
              placeholder="Enter prep_time..."
              size="small"
              id="Preparation_Time"
              value={preparation_Time}
              onChange={(event) => setPreparation_Time(event.target.value)}
            />
          </span>
          <br />
          <Typography
            variant="h5"
            component="label"
            htmlFor="Directions"
            className="add-recipe-label"
            color="secondary"
            sx={{
              display: "flex",
              marginTop: "17px",
            }}
          >
            Directions:
          </Typography>
          <br></br>
          <TextField
            type="text"
            id="Directions"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            sx={{
              width: 600,
              fontSize: 10,
              marginTop: "-6px",
            }}
            placeholder="Enter Recipe Directions"
            value={recipe_Directions}
            onChange={(event) => setRecipe_Directions(event.target.value)}
          />
          <br />
          <Typography
            variant="h5"
            component="label"
            htmlFor="serving_size"
            color="secondary"
            sx={{
              display: "flex",
            }}
          >
            Serving_Size:
          </Typography>{" "}
          <br></br>
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <TextField
              type="number"
              required
              id="serving_size"
              variant="outlined"
              size="small"
              placeholder="Select a serving size..."
              value={serving_Size}
              onChange={(event) => setServing_Size(event.target.value)}
              color="secondary"
            />
          </span>
          <br />
          <Typography
            variant="h5"
            component="label"
            htmlFor="yield"
            color="secondary"
            sx={{
              display: "flex",
            }}
          >
            Yield:
          </Typography>
          <br></br>
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <TextField
              type="number"
              required
              placeholder="Select a yield count..."
              variant="outlined"
              size="small"
              min={1}
              id="yield"
              value={recipe_Yield}
              onChange={(event) => setRecipe_Yield(event.target.value)}
            />
          </span>
          <br />
          <Typography
            variant="h5"
            component="label"
            htmlFor="calories"
            color="secondary"
            sx={{
              display: "flex",
            }}
          >
            Calories:
          </Typography>
          <br></br>
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <TextField
              type="number"
              id="calories"
              required
              variant="outlined"
              size="small"
              placeholder="Select calorie count..."
              value={calories}
              min={100}
              onChange={(event) => setCalories(event.target.value)}
              color="secondary"
            />
          </span>
          <br />
          <Typography
            variant="h5"
            component="label"
            htmlFor="image"
            color="secondary"
            sx={{
              display: "flex",
            }}
          >
            Photo
          </Typography>
          <br />
          <span
            style={{
              display: "flex",
              marginTop: "-10px",
            }}
          >
            <input
              name="file"
              required
              id="image"
              ref={filePickerRef}
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </span>
          <div>
            <Button
              variant="contained"
              disableElevation
              type="submit"
              endIcon={<SendIcon />}
              gutterBottom={true}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, hsl(150deg 80% 40%), hsl(180deg 80% 20%))",
                margin: 2.5,
                borderColor: "none",
                display: "flex",
              }}
            >
              Add Recipe
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddRecipe;
