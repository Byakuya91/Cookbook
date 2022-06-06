import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./HomePage.css";
import UserInfoDisplay from "../../components/UserInfoDisplay/UserInfoDisplay";
import PostForm from "../../components/PostForm/PostForm";
import PostList from "../../components/PostList/PostList";
import ProfileRecipeCardMapper from "../../components/ProfileRecipeCardMapper/ProfileRecipeCardMapper";
import SearchUserRecipes from "../../components/SearchUserRecipes/SearchUserRecipes";
import AddRecipe from "../../components/AddRecipe/AddRecipe";

const HomePage = () => {
  // TODOs
  // 1) Strip away all the friends code here (IN PROGRESS)
  // 2) repurpose the  the UseEffects and requests for the following:
  // 3)  grab the single user's information(DONE)
  // 4)  map that user's recipes in a table/ component(referencing work you've done before) (DONE)
  // 5) Add your ability to submit a recipe to the user.(DONE)
  // 6) Edit and delete a recipe functionality needs to be implemented in this area.(IN PROGRESS)

  //  state variables for comments
  const [posts, setPosts] = useState(null);
  const [friendsPosts, setFriendsPosts] = useState(null);
  // recipes for the profile user logged in.
  const [homeRecipes, setHomeRecipes] = useState([]);
  // recipe search state for the home page
  const [homeRecipeSearch, setHomeRecipeSearch] = useState("");
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  // a way to hold selectedRecipeId
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [rerender, setRerender] = useState(false);

  // a way to find the selectedRecipeID (WORKING)
  // console.log("the Search term is: ", homeRecipeSearch);

  const selectedRecipe = homeRecipes.find(
    (homeRecipe) => homeRecipe._id === selectedRecipeId
  );

  // checking selected recipe Id(WORKING)
  // console.log(selectedRecipe);

  // console.log("The search term is:", homeRecipeSearch);

  // console.log("the user's recipe ids are:", homeRecipes);

  // establish base URL
  const BASE = "http://localhost:5000/api";

  // Function take in a recipeID as a parameter
  //   When you map and create button OnClick to take in function

  //  COMPLETE
  const handleHomeRecipeDelete = async (id) => {
    let recipe = homeRecipes.map((homeRecipe) => homeRecipe._id);

    console.log(" the ids of recipe are:", recipe);

    try {
      //  Step one and step two
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
    <div>
      <h1 className="container">Home Page for {user.name}!</h1>
      <UserInfoDisplay user={user} />

      <div>
        <h1>
          {" "}
          There are {homeRecipes.length} recipes for the {user.name}
        </h1>
        {/* <PostForm setPosts={setPosts} /> */}
        <AddRecipe
          AddNewRecipe={setHomeRecipes}
          homeRecipes={homeRecipes}
          handleGetUserRecipes={handleGetUserRecipes}
        />
        <SearchUserRecipes
          RecipeSearch={homeRecipeSearch}
          SetRecipeSearch={setHomeRecipeSearch}
        />
        <div className="flex-row">
          <div className="width50">
            {/* <PostList posts={friendsPosts} friendsList={true} /> */}
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
          </div>
          <div className="width50">
            {/* <PostList posts={posts} friendsList={false} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
