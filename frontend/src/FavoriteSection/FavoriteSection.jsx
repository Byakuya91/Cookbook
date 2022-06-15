import { useState, useContext } from "react";
import EditRecipe from "../components/EditRecipe/EditRecipe";
import ProfileIngredientList from "../components/ProfileIngredientList/ProfileIngredientList";
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import AuthContext from "../context/AuthContext";
// import "../components/RecipeCard/RecipeCard.css";
import { maxHeight } from "@mui/system";

const FavoriteSection = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(AuthContext);
  // const [Ingredients, setIngredients] = useState([]);

  //   console.log("The current recipe ID is: ", props.profileRecipe._id);

  //   console.log("the profile recipe Id currently is: ", props.recipeID);

  return (
    <Container key={props.profileRecipe._id}>
      <Card elevation={11}>
        <Typography variant="h3" component="label">
          Name:
        </Typography>
        <CardHeader
          title={props.profileRecipe.name}
          titleTypographyProps={{ variant: "h4" }}
        />

        <CardMedia classname="recipe-card-img">
          {props.profileRecipe.image !== undefined && (
            <img
              src={`http://localhost:5000/${props.profileRecipe.image}`}
            ></img>
          )}
        </CardMedia>
        <CardContent>
          <h2> Ingredients:</h2>
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
          <h2> Preparation_Time:</h2>
          <p>{props.profileRecipe.preparation_time}</p>
          <h2> Serving_Size:</h2>
          <p>{props.profileRecipe.serving_size}</p>
          <h2> Yield:</h2>
          <p>{props.profileRecipe.yield}</p>
          <h2> Calories:</h2>
          <p>{props.profileRecipe.calories}</p>
          <h2> Directions:</h2>
          <p>{props.profileRecipe.directions}</p>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="contained" color="secondary" fullWidth>
            <Button
              variant="contained"
              color="success"
              disableRipple
              size="medium"
              onClick={() => props.recipeDelete(props.profileRecipe._id)}
            >
              Delete Recipe
            </Button>
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
            <Button onClick={() => setIsEdit(false)}>Close</Button>
          </ButtonGroup>
        </CardActions>
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
      </Card>
    </Container>
  );
};

export default FavoriteSection;
