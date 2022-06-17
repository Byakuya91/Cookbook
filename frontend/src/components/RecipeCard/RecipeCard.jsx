// import statements
import AuthContext from "../../context/AuthContext";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import React, { useState, useEffect, useContext } from "react";
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
  makeStyles,
  Box,
} from "@mui/material";
import { grid } from "@mui/system";
import { experimentalStyled as styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = (props) => {
  //const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  const [favoriteRecipe, setFavoriteRecipe] = useState();

  const { user } = useContext(AuthContext);
  //  styles from Material UI

  // TODO: Figure out a way to re-render the page whenever the favorites is changed.
  // [props.recipes] removed from UseEffect

  useEffect(() => {
    props.makeRecipeGetRequest();
  }, []);

  console.log(props.searchRecipe);

  // Material UI styling for Paper
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // Material UI expanding card

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-around"
      direction="row-reverse"
      spacing={1}
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
                <Grid
                  container
                  direction="column-reverse"
                  justifyContent="center"
                  alignItems="center"
                  rowGap={4}
                  key={recipe._id}
                >
                  <Grid item xs={6} md={6}>
                    <Item>
                      <Paper variant="elevation" elevation={10}>
                        <Card elevation={3}>
                          <h2>Name:</h2>
                          <CardHeader title={recipe.name} />
                          <h2>Author:</h2>
                          <CardHeader
                            className="author-text"
                            subheader={user.name}
                          />
                          {/* <h2> Name:</h2>
                        <p>{recipe.name}</p> */}
                          <CardMedia alt="recipe Image">
                            <div>
                              {recipe.image !== undefined && (
                                <img
                                  src={`http://localhost:5000/${recipe.image}`}
                                  className="recipe-card-img"
                                ></img>
                              )}
                            </div>
                          </CardMedia>
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
                          <h2> Serving_Size:</h2>
                          <p>{recipe.serving_size}</p>
                          <h2> Yield:</h2>
                          <p>{recipe.yield}</p>
                          <ButtonGroup
                            sx={{
                              padding: "1rem",
                            }}
                          >
                            <FavoritesButton recipeID={recipe._id} />
                            <RemoveFavoriteRecipeButton recipeID={recipe._id} />
                            {/* {recipe.favorite ? (
                          <RemoveFavoriteRecipeButton recipeID={recipe._id} />
                          ) : (
                            <FavoritesButton recipeID={recipe._id} />
                          )} */}
                          </ButtonGroup>
                        </Card>
                      </Paper>
                    </Item>
                  </Grid>
                </Grid>
              );
            })
        )}
    </Grid>
  );
};

export default RecipeCard;
