import { useState } from "react";
import EditRecipe from "../components/EditRecipe/EditRecipe";
import ProfileIngredientList from "../components/ProfileIngredientList/ProfileIngredientList";

const FavoriteSection = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [Ingredients, setIngredients] = useState([]);

  //   console.log("The current recipe ID is: ", props.profileRecipe._id);

  //   console.log("the profile recipe Id currently is: ", props.recipeID);

  return (
    <div key={props.profileRecipe._id}>
      <h2> Name:</h2>
      <p>{props.profileRecipe.name}</p>
      <h2> Image:</h2>
      <div>
        {props.profileRecipe.image !== undefined && (
          <img src={`http://localhost:5000/${props.profileRecipe.image}`}></img>
        )}
      </div>
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
      <button onClick={() => props.recipeDelete(props.profileRecipe._id)}>
        Delete
      </button>

      <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={() => setIsEdit(false)}>&times;</button>
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
    </div>
  );
};

export default FavoriteSection;
