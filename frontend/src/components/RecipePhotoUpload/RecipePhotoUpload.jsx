import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

const RecipePhotoUpload = (props) => {
  const BASE = `http://localhost:5000/api`;

  //   State variables
  // preview the URL
  const [previewUrl, setPreviewUrl] = useState();
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  const [file, setFile] = useState();

  // referencing the URL
  const filePickerRef = useRef();

  const { user, setUser } = useContext(AuthContext);

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
    const form = new FormData();
    form.append("image", file);

    try {
      await axios
        .put(
          `${BASE}/recipes/${user._id}/recipes/${props.RecipeImage._id}/updateRecipeImage`,
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
  };

  return (
    <div id="imageUploadComponent">
      <form onSubmit={(event) => handleRecipePhotoSubmit(event)}>
        <label>Photo</label>
        <input
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={(event) => pickedHandler(event)}
        />
        <button type="submit">Submit button</button>
      </form>
    </div>
  );
};

export default RecipePhotoUpload;
