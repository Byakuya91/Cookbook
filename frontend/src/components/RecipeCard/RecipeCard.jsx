// import statements
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import React, { useState, useEffect } from "react";
import RemoveFavoriteRecipeButton from "../RemoveFavoriteRecipeButton/RemoveFavoriteRecipeButton";
import IngredientList from "../IngredientList/IngredientList";
import "../RecipeCard/RecipeCard.css";
import {
  Typography,
  Button,
  ButtonGroup,
  Icon,
  Paper,
  Grid,
  Container,
} from "@mui/material";
import { grid } from "@mui/system";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/material";

const RecipeCard = (props) => {
  //const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  const [favoriteRecipe, setFavoriteRecipe] = useState();
  //  styles from Material UI

  // TODO: Figure out a way to re-render the page whenever the favorites is changed.
  // [props.recipes] removed from UseEffect

  useEffect(() => {
    props.makeRecipeGetRequest();
  }, []);

  //  a way to count for case sensitivity

  // const searchRecipeLowerCased = props.searchRecipe.toLowerCase();

  console.log(props.searchRecipe);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="row"
        spacing={2}
        id="userCard"
      >
        {/* STEP ONE: map over recipes array */}
        {props.recipes &&
          props.recipes.map((element, index) =>
            element.recipes
              .filter(
                (recipe) =>
                  recipe.name
                    ?.toLowerCase()
                    .includes(props.searchRecipe.toLowerCase()) ||
                  // .toLowerCase()
                  // (recipe.ingredients &&
                  //   recipe.ingredients
                  //     ?.toLowerCase()
                  //     .includes(props.searchRecipe.toLowerCase())) ||
                  // .toLowerCase()
                  (recipe.cook_time &&
                    recipe.cook_time?.includes(
                      props.searchRecipe.toLowerCase()
                    )) ||
                  // .toLowerCase()
                  (recipe.preparation_time &&
                    recipe.preparation_time?.includes(
                      props.searchRecipe.toLowerCase()
                    )) ||
                  // .toLowerCase()
                  (recipe.serving_size &&
                    recipe.serving_size === parseInt(props.searchRecipe)) ||
                  (recipe.yield &&
                    recipe.yield === parseInt(props.searchRecipe)) ||
                  (recipe.calories &&
                    recipe.calories === parseInt(props.searchRecipe))
              )
              // STEP TWO: MAP OVER RECIPES

              .map((recipe, index) => {
                return (
                  // Abstract this in a new component: UserRecipeCard/ change this to AllRecipesMapper.
                  <Grid spacing={3} item key={recipe._id}>
                    <Paper variant="elevation" elevation={8}>
                      <h2> Name:</h2>
                      <p>{recipe.name}</p>
                      <div>
                        {recipe.image !== undefined && (
                          <img
                            src={`http://localhost:5000/${recipe.image}`}
                            className="recipe-card-img"
                          ></img>
                        )}
                      </div>
                      <h2> Author:</h2>
                      <p>{recipe.author}</p>
                      <h2> Ingredients:</h2>
                      {recipe.ingredients.map((ingredient, index) => (
                        <IngredientList
                          key={ingredient._id}
                          IngredientAmount={ingredient.amount}
                          IngredientName={ingredient.name}
                          IngredientUnit={ingredient.unit}
                        />
                      ))}
                      <h2> Calories:</h2>
                      <p>{recipe.calories}</p>
                      <h2> Cook_Time:</h2>
                      <p>{recipe.cook_time}</p>
                      <h2> Directions:</h2>
                      <p>{recipe.directions}</p>
                      <h2> Preparation_Time:</h2>
                      <p>{recipe.preparation_time}</p>
                      <h2>Recipe ID</h2>
                      <p>{recipe._id}</p>
                      <h2> Serving_Size:</h2>
                      <p>{recipe.serving_size}</p>
                      <h2> Yield:</h2>
                      <p>{recipe.yield}</p>
                      <span>
                        <FavoritesButton recipeID={recipe._id} />
                        <RemoveFavoriteRecipeButton recipeID={recipe._id} />
                        {/* {recipe.favorite ? (
                          <RemoveFavoriteRecipeButton recipeID={recipe._id} />
                        ) : (
                          <FavoritesButton recipeID={recipe._id} />
                        )} */}
                      </span>
                    </Paper>
                  </Grid>
                );
              })
          )}
      </Grid>
    </Box>
  );
};

export default RecipeCard;
