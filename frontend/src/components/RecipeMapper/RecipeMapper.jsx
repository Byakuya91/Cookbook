import RecipeCard from "../RecipeCard/RecipeCard";
import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import SearchRecipe from "../SearchRecipe/SearchRecipe";
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
  Collapse,
  CardContent,
  ListItem,
} from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import PropTypes from "prop-types";

// pass in the the user Data from props
// function handleRecipeRetrieval({
//    pass
// })

const RecipeMapper = (props) => {
  // state variables for the recipe.
  const [userRecipes, setUserRecipes] = useState([]);
  // Create a state variable to hold the search term
  const [searchRecipe, setSearchRecipe] = useState("");

  // Create a state variable to hold favorite recipes.
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // New approach: Create a context for recipes

  // UseEffect to trigger the retrival function(console log is showing values)
  useEffect(() => {
    makeRecipeGetRequest();
  }, []);
  // API call to the backend
  async function makeRecipeGetRequest() {
    try {
      // API call to my backend
      const jwt = localStorage.getItem("token");
      let recipeResponse = await axios.get(`http://localhost:5000/api/users`, {
        headers: {
          "x-auth-token": jwt,
        },
      });
      // setting the data equal to state variables
      // console.log("Recipe response data: ", recipeResponse.data);
      setUserRecipes(recipeResponse.data);
      // console.log(recipeResponse);
    } catch (error) {
      // console.log(error.message);
    }
  }

  // TODO: figure out a way to map out each recipe element
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "Center",
        width: "100%",
        height: 220,
      }}
    >
      <div>
        <Grid Item direction="column">
          {" "}
          <div>
            <SearchRecipe
              setSearchRecipe={setSearchRecipe}
              searchRecipe={searchRecipe}
            />
          </div>
        </Grid>
        <Grid Item xs={10}>
          <RecipeCard
            recipes={userRecipes}
            searchRecipe={searchRecipe}
            favoriteRecipes={favoriteRecipes}
            setFavoriteRecipes={setFavoriteRecipes}
            setRecipes={setUserRecipes}
            makeRecipeGetRequest={makeRecipeGetRequest}
          />
        </Grid>
      </div>
    </Container>
  );
};

export default RecipeMapper;
