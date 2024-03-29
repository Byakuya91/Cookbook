import { useState, useContext } from "react";
import EditRecipe from "../components/EditRecipe/EditRecipe";
import ProfileIngredientList from "../components/ProfileIngredientList/ProfileIngredientList";
import "../FavoriteSection/FavoriteSection.css";

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
    <Container key={props.profileRecipe._id} sx={{ margin: "2rem auto" }}>
      <Card elevation={11}>
        <Typography variant="h3" component="h2">
          Name:
        </Typography>
        <CardHeader
          title={props.profileRecipe.name}
          titleTypographyProps={{ variant: "h4" }}
        />

        <CardMedia
          sx={{
            width: "500px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {props.profileRecipe.image !== undefined && (
            <img
              src={`http://localhost:5000/${props.profileRecipe.image}`}
              className=" recipe-card-img"
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
          <ButtonGroup
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              justifyContent: "space-evenly",
              boxShadow: "none",
            }}
          >
            <Button
              variant="contained"
              color="success"
              disableRipple
              size="medium"
              onClick={() => props.recipeDelete(props.profileRecipe._id)}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, hsl(28deg 82% 48%), hsl(20deg 96% 28%))",
                borderColor: "none",
              }}
            >
              Delete Recipe
            </Button>
            <Button
              onClick={() => setIsEdit(true)}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, hsl(105deg 71% 40%), hsl(112deg 70% 20%))",
                borderColor: "none",
              }}
            >
              Edit
            </Button>

            <Button
              onClick={() => setIsEdit(false)}
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
