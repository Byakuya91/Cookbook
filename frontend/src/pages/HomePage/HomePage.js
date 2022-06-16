import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
// import "./HomePage.css";
import UserInfoDisplay from "../../components/UserInfoDisplay/UserInfoDisplay";
import PostForm from "../../components/PostForm/PostForm";
import PostList from "../../components/PostList/PostList";
import ProfileRecipeCardMapper from "../../components/ProfileRecipeCardMapper/ProfileRecipeCardMapper";
import SearchUserRecipes from "../../components/SearchUserRecipes/SearchUserRecipes";
import AddRecipe from "../../components/AddRecipe/AddRecipe";
// Material UI imports
import { Typography, Grid, Box, Button, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const HomePage = () => {
  //  Material UI styles
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //  state variables for comments
  const [posts, setPosts] = useState(null);
  const [friendsPosts, setFriendsPosts] = useState(null);
  // recipes for the profile user logged in.
  const [homeRecipes, setHomeRecipes] = useState([]);
  // get Ingredients for one user
  const [homeIngredients, setHomeIngredients] = useState([]);
  // recipe search state for the home page
  const [homeRecipeSearch, setHomeRecipeSearch] = useState("");
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  // a way to hold selectedRecipeId
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  // a way to handle rendering pages
  const [rerender, setRerender] = useState(false);

  // TODO: Create a modal for addRecipe
  // State variables
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Styles for the Modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const selectedRecipe = homeRecipes.find(
    (homeRecipe) => homeRecipe._id === selectedRecipeId
  );

  // establish base URL
  const BASE = "http://localhost:5000/api";

  //  COMPLETE
  const handleHomeRecipeDelete = async (id) => {
    let recipe = homeRecipes.map((homeRecipe) => homeRecipe._id);

    console.log(" the ids of recipe are:", recipe);

    try {
      //  Step one and step two: AXIOS call
      await axios
        .delete(`${BASE}/recipes/${user._id}/recipes/${id}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      //  Step three: removing the user recipe
      const userRecipes = homeRecipes.filter((homeRecipe) => {
        return homeRecipe._id !== id;
      });

      // step four: update the state
      setHomeRecipes(userRecipes);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  //  a function designed to select a recipe Id.
  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  // Get user's posts.
  // const handleGetPosts = async () => {
  //   let response = await axios.get(
  //     `http://localhost:3011/api/posts/${user._id}/allPosts`,
  //     { headers: { "x-auth-token": decodedUser } }
  //   );
  //   setPosts(response.data);
  // };

  // Get user's recipes by id
  const handleGetUserRecipes = async () => {
    let userRecipeResponse = await axios.get(
      `${BASE}/users/${user._id}/getOneUser`,
      { headers: { "x-auth-token": decodedUser } }
    );
    setHomeRecipes(userRecipeResponse.data.recipes);
  };
  // Get User's ingredients inside recipes
  const handleGetUserIngredients = async () => {
    let userIngredientResponse = await axios.get(
      `${BASE}/users/${user._id}/getOneUser`,
      { headers: { "x-auth-token": decodedUser } }
    );
    setHomeRecipes(userIngredientResponse.data.recipes.ingredients);
  };

  //   Create a function to submit the recipes
  // function AddNewRecipe(recipe) {
  //   // Using state setter to set the recipes
  //   setHomeRecipes(recipe);
  // }

  // Get user's friend's posts.
  // const handleGetFriendsPosts = async () => {
  //   let response = await axios.get(
  //     `http://localhost:3011/api/posts/${user._id}/friendsPosts`,
  //     { headers: { "x-auth-token": decodedUser } }
  //   );
  //   setFriendsPosts(response.data);
  // };

  // TODO: Add functions to handle RecipeAdd and Delete
  const rerenderFunction = () => {
    setRerender(!rerender);
  };
  useEffect(() => {
    // handleGetPosts();
    // handleGetFriendsPosts();
    handleGetUserRecipes();
  }, [rerender]);

  // useEffect(() => {
  //   if(homeRecipes.length > 0){
  //     let selectedRecipe = homeRecipes.find(
  //       (homeRecipe) => homeRecipe._id === selectedRecipeId
  //     );

  //   }

  // }, [homeRecipes]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            <UserInfoDisplay user={user} />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <div>
              <Typography
                variant="h2"
                className="container"
                color=" green"
                align="center"
                display="block"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem",
                  display: "inline",
                }}
              >
                Home Page for {user.name}!
              </Typography>
            </div>
          </Item>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
              display: "inline",
            }}
          >
            <Item>
              <Typography
                variant="h2"
                component="h3"
                className="container"
                color="green"
                align="center"
                display="block"
                gutterBottom={true}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem",
                  display: "inline",
                }}
              >
                There are {homeRecipes.length} recipes for the {user.name}
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Item
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
              display: "inline",
            }}
          >
            <SearchUserRecipes
              RecipeSearch={homeRecipeSearch}
              SetRecipeSearch={setHomeRecipeSearch}
            />
          </Item>
          <Item>
            <ProfileRecipeCardMapper
              rerender={rerenderFunction}
              profileRecipes={homeRecipes}
              searchRecipe={homeRecipeSearch}
              recipeDelete={handleHomeRecipeDelete}
              handleGetUserRecipes={handleGetUserRecipes}
              userRecipes={homeRecipes}
              setUserRecipes={setHomeRecipes}
              handleRecipeSelect={handleRecipeSelect}
              selectedRecipeId={selectedRecipeId}
              selectedRecipe={selectedRecipe}
            />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
              display: "inline",
            }}
          >
            <AddRecipe
              AddNewRecipe={setHomeRecipes}
              homeRecipes={homeRecipes}
              handleGetUserRecipes={handleGetUserRecipes}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
