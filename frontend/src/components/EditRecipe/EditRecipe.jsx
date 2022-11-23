import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import RecipePhotoUpload from "../RecipePhotoUpload/RecipePhotoUpload";
import AddMoreIngredients from "../AddMoreIngredients/AddMoreIngredients";
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  Grid,
} from "@mui/material";
import { TextField } from "@mui/material";

const EditRecipe = (props) => {
  const { user, setUser } = useContext(AuthContext);
  // Recipe Edit state variables
  const [editName, setEditName] = useState(props.editRecipe?.name);
  const [editIngredients, setEditIngredients] = useState(
    props.editRecipe?.ingredients
  );
  const [editCook_Time, setEditCook_Time] = useState(
    props.editRecipe?.cook_time
  );
  const [editPreparation_Time, setEditPreparation_Time] = useState(
    props.editRecipe?.preparation_time
  );
  const [editServing_Size, setEditServing_Size] = useState(
    props.editRecipe?.serving_size
  );
  const [editRecipe_Yield, setEditRecipe_Yield] = useState(
    props.editRecipe?.yield
  );
  const [editRecipe_Directions, setEditRecipe_Directions] = useState(
    props.editRecipe?.directions
  );
  const [editCalories, setEditCalories] = useState(props.editRecipe?.calories);

  //   console log tests for state variables
  console.log("The ingredient inside EditIngredients are:", editIngredients);

  // console.log("The editRecipe ID  is: ", props.editRecipe?._id);

  // STEPS FOR ADDING an ingredient
  // 1) Console logs of Ingredient to see what fields are existing inside an object
  // 2) Copying the dynamic form from add Ingredient and linking the route to add an Ingredient
  //   3) Figuring out how to

  // State variables for photo upload
  const [previewUrl, setPreviewUrl] = useState();
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  // setting a file.
  const [file, setFile] = useState();

  // state variable for opening Ingredients Edit Component and photos
  const [isAddIngredient, setIsAddIngredient] = useState(false);
  const [isEditPhoto, setIsEditPhoto] = useState(false);

  // referencing the URL
  const filePickerRef = useRef();

  // console.log("the edit recipe ID is:", props.editRecipe?._id);
  console.log("The name of the current recipe selected is:", editName);
  console.log(
    "The name of the current recipe selected is:",
    JSON.stringify(editName)
  );

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
    console.log("Before Sending", editName);

    // STEP TWO: create object to modify the contents
    let recipeEditForm = new FormData();
    recipeEditForm.append("name", editName);
    editIngredients.forEach((item) => {
      recipeEditForm.append("ingredients[]", JSON.stringify(item));
    });
    recipeEditForm.append("cook_time", editCook_Time);
    recipeEditForm.append("preparation_time", editPreparation_Time);
    recipeEditForm.append("directions", editRecipe_Directions);
    recipeEditForm.append("serving_size", editServing_Size);
    recipeEditForm.append("yield", editRecipe_Yield);
    recipeEditForm.append("calories", editCalories);
    recipeEditForm.append("image", file);
    recipeEditForm.append("author", props.editRecipe.author);

    console.log(
      "The name inside the RecipeEditForm",
      recipeEditForm.getAll("name")
    );
    console.log(recipeEditForm.getAll("ingredients[]"));
    console.log(recipeEditForm.getAll("name"));

    //  STEP THREE AXIOS call: PUT request
    try {
      let updatedRecipe;
      updatedRecipe = await axios.put(
        `${BASE}/recipes/${user._id}/recipes/${props.editRecipe._id}`,
        recipeEditForm,
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );

      // Update the state
      // props.setNewRecipe(...props.newRecipe, updatedRecipe);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      console.log(`Error: ${error.request}`);
      console.log(`Error: ${error.res.data}`);
    }
    // Update the data through an API call
    props.rerender();
    console.log("Updating");
    // props.handleGetUserRecipes();   Handle this differently
  };

  return (
    //   Form template and data that will need to be sent.

    <Grid container direction="column">
      <form onSubmit={(e) => handleRecipeEdit(e)}>
        <Container
          sx={{
            display: "block",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            gutterBottom={true}
            className="container"
            color="primary"
            align="center"
          >
            Edit Recipe
          </Typography>
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            className="add-recipe-label"
            htmlFor="recipe_name_edit"
          >
            Recipe Name:
          </Typography>
          <br></br>
          <input
            type="text"
            name="recipe"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
            id="recipe_name_edit"
          />
          <br></br>
          {/* <AddMoreIngredients
            ingredients={props.editRecipe.ingredients}
            recipeID={props.editRecipe?._id}
            setEditIngredients={setEditIngredients}
            EditIngredients={editIngredients}
          /> */}
          <ButtonGroup
            color="primary"
            variant="contained"
            size="small"
            fullWidth
            sx={{
              justifyContent: "space-evenly",
              boxShadow: "none",
            }}
          >
            <Button
              onClick={() => setIsAddIngredient(true)}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, hsl(105deg 71% 40%),hsl(112deg 70% 20%))",
                boxShadow: "0px 3px 8px hsl(181deg 80% 20% / 30%)",
                marginTop: "8px",
              }}
            >
              {" "}
              Edit Ingredient
            </Button>

            <Button
              onClick={() => setIsAddIngredient(false)}
              sx={[
                {
                  background: "none",
                  color: "hsl(162deg 7% 48%)",
                  borderColor: "#fefefe",
                  border: "solid",
                  fontSize: "14px",
                },
                {
                  "&:hover": {
                    color: "white",
                    backgroundColor: "hsl(162deg 7% 48%)",
                  },
                },
              ]}
            >
              Close
            </Button>
          </ButtonGroup>
          {isAddIngredient ? (
            <AddMoreIngredients
              ingredients={props.editRecipe.ingredients}
              recipeID={props.editRecipe?._id}
              setEditIngredients={setEditIngredients}
              EditIngredients={editIngredients}
            />
          ) : null}
          <br></br>
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="editCook_Time "
          >
            Cook_Time:
          </Typography>
          <br></br>
          <input
            type="text"
            id="editCook_Time"
            value={editCook_Time}
            onChange={(event) => setEditCook_Time(event.target.value)}
          />
          <br />
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="recipe_preparation_time"
          >
            Preparation_Time:
          </Typography>{" "}
          <br></br>
          <input
            type="text"
            id="recipe_preparation_time"
            value={editPreparation_Time}
            onChange={(event) => setEditPreparation_Time(event.target.value)}
          />
          <br />
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="recipe_directions"
          >
            Directions:
          </Typography>{" "}
          <br></br>
          <TextField
            type="text"
            id="recipe_directions"
            value={editRecipe_Directions}
            onChange={(event) => setEditRecipe_Directions(event.target.value)}
            sx={{
              width: 500,
              fontSize: 10,
            }}
            fullWidth
            multiline
            rows={8}
          />
          <br />
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="recipe_serving_size"
          >
            Serving_Size:
          </Typography>
          <br></br>
          <input
            type="number"
            id="recipe_serving_size"
            value={editServing_Size}
            onChange={(event) => setEditServing_Size(event.target.value)}
          />
          <br />
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="recipe_yield"
          >
            Yield:
          </Typography>
          <br></br>
          <input
            type="number"
            id="recipe_yield"
            value={editRecipe_Yield}
            onChange={(event) => setEditRecipe_Yield(event.target.value)}
          />
          <br />
          <Typography
            variant="h5"
            component="label"
            gutterBottom={true}
            color="secondary"
            htmlFor="recipe_calories"
          >
            Calories:
          </Typography>{" "}
          <br></br>
          <input
            type="number"
            id="recipe_calories"
            min={100}
            value={editCalories}
            onChange={(event) => setEditCalories(event.target.value)}
          />
        </Container>
        <span>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disableElevation
            sx={{
              backgroundImage:
                "linear-gradient(to right, hsl(150deg, 80%, 40%), hsl(181deg, 80%, 20%))",
              marginTop: "8px",
            }}
          >
            Update Recipe
          </Button>
        </span>
      </form>
      <br></br>

      <ButtonGroup
        color="primary"
        variant="contained"
        sx={{
          justifyContent: "space-evenly",
          boxShadow: "none",
        }}
      >
        <Button
          onClick={() => setIsEditPhoto(true)}
          sx={{
            backgroundImage:
              "linear-gradient(to right, hsl(105deg 71% 40%),hsl(112deg 70% 20%))",
            boxShadow: "0px 3px 8px hsl(181deg 80% 20% / 30%)",
            marginTop: "8px",
            borderColor: "none",
          }}
        >
          {" "}
          Edit Photo
        </Button>

        <Button
          onClick={() => setIsEditPhoto(false)}
          sx={[
            {
              background: "none",
              color: "hsl(162deg 7% 48%)",
              borderColor: "#fefefe",
              border: "solid",
              fontSize: "14px",
            },
            {
              "&:hover": {
                color: "white",
                backgroundColor: "hsl(162deg 7% 48%)",
              },
            },
          ]}
        >
          {" "}
          Close
        </Button>
      </ButtonGroup>

      {isEditPhoto ? (
        <RecipePhotoUpload
          recipeID={props.recipeID}
          handleGetUserRecipes={props.handleGetUserRecipes}
          profileRecipes={props.newRecipe}
          recipeImage={props.recipeImage}
        />
      ) : null}
    </Grid>
  );
};

export default EditRecipe;
