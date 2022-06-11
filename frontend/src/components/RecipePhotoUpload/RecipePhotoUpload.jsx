import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

const RecipePhotoUpload = (props) => {
  const BASE = `http://localhost:5000/api`;

  //   State variables
  // preview the URL
  const [previewUrl, setPreviewUrl] = useState(props.recipeImage);
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  const [file, setFile] = useState();

  // referencing the URL
  const filePickerRef = useRef();

  const { user, setUser } = useContext(AuthContext);

  // console.log(
  //   "The recipe ID inside the RecipePhotoUpload component is: ",
  //   props.recipeID
  // );

  useEffect(() => {
    //   if there is no file put through the selector.
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // console.log(fileReader.result);
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  // useEffect(() => {
  //   props.handleGetUserRecipes();
  // }, [props.profileRecipes]);

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
    const form = new FormData();
    form.append("image", file);

    try {
      await axios
        .put(
          `${BASE}/recipes/${user._id}/recipes/${props.recipeID}/updateRecipeImage`,
          form,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        )
        .then((res) => {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          setUser(jwtDecode(localStorage.getItem("token")));
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
    // UPDATE the recipe profile and prompt the user photo has been changed.
    alert("Recipe photo has been updated!");
    props.handleGetUserRecipes();
  };

  return (
    <div id="imageUploadComponent">
      <form onSubmit={(event) => handleRecipePhotoSubmit(event)}>
        <h2>Edit Photo</h2>
        <input
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={(event) => pickedHandler(event)}
        />
        <button type="submit">Add Photo</button>
      </form>
    </div>
  );
};

export default RecipePhotoUpload;
