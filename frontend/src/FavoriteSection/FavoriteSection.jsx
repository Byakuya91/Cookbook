import { useState } from "react";
import EditRecipe from "../components/EditRecipe/EditRecipe";
import ProfileIngredientList from "../components/ProfileIngredientList/ProfileIngredientList";
import { Typography, Button, ButtonGroup, Container } from "@mui/material";

const FavoriteSection = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [Ingredients, setIngredients] = useState([]);

  //   console.log("The current recipe ID is: ", props.profileRecipe._id);

  //   console.log("the profile recipe Id currently is: ", props.recipeID);

  return (
    <Container key={props.profileRecipe._id}>
      <h2> Name:</h2>
      <p>{props.profileRecipe.name}</p>
      <h2> Image:</h2>
      <Container>
        {props.profileRecipe.image !== undefined && (
          <img src={`http://localhost:5000/${props.profileRecipe.image}`}></img>
        )}
      </Container>
      <h2> Author:</h2>
      <p>{props.profileRecipe.author}</p>
      <h2> Ingredients:</h2>
      {/* {console.log(
        "The ingredients inside the favorie section is",
        props.profileRecipe.ingredients
      )} */}
      {props.profileRecipe.ingredients.map((ingredient, index) => {
        return (
          <div key={index}>
            <ProfileIngredientList
              IngredientName={ingredient.name}
              IngredientAmount={ingredient.amount}
              IngredientUnit={ingredient.unit}
              IngredientID={ingredient._id}
            />
          </div>
        );
      })}
      <h2> Cook_Time:</h2>
      <p>{props.profileRecipe.cook_time}</p>
      <h2> Directions:</h2>
      <p>{props.profileRecipe.directions}</p>
      <h2> Preparation_Time:</h2>
      <p>{props.profileRecipe.preparation_time}</p>
      <h2> Serving_Size:</h2>
      <p>{props.profileRecipe.serving_size}</p>
      <h2> Yield:</h2>
      <p>{props.profileRecipe.yield}</p>
      <h2> Calories:</h2>
      <p>{props.profileRecipe.calories}</p>
      <Button
        variant="contained"
        color="success"
        disableRipple
        size="medium"
        onClick={() => props.recipeDelete(props.profileRecipe._id)}
      >
        Delete Recipe
      </Button>
      <ButtonGroup variant="contained" color="secondary" orientation="vertical">
        <Button onClick={() => setIsEdit(true)}>Edit</Button>
        <Button onClick={() => setIsEdit(false)}>Close</Button>
      </ButtonGroup>
      {isEdit ? (
        <EditRecipe
          editRecipe={props.profileRecipe}
          classname="Edit_Recipe_Container"
          recipeID={props.profileRecipe._id}
          setNewRecipe={props.setUserRecipes}
          newRecipe={props.userRecipes}
          handleGetUserRecipes={props.handleGetUserRecipes}
          handleRecipeSelect={props.handleRecipeSelect}
          rerender={props.rerender}
          recipeDelete={props.recipeDelete}
          recipeImage={props.profileRecipe.image}
        />
      ) : null}
    </Container>
  );
};

export default FavoriteSection;
