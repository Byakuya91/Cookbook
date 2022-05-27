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
  // 1) Strip away all the friends code here
  // 2) repurpose the  the UseEffects and requests for the following:
  // 3)  grab the single user's information.
  // 4)  map that user's recipes in a table/ component(referencing work you've done before)
  // 5) Add your ability to submit a recipe to the user.
  // 6) Edit and delete a recipe functionality needs to be implemented in this area.

  //  state variables for comments
  const [posts, setPosts] = useState(null);
  const [friendsPosts, setFriendsPosts] = useState(null);
  const [homeRecipes, setHomeRecipes] = useState([]);
  const [homeRecipeSearch, setHomeRecipeSearch] = useState("");
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");

  console.log(homeRecipeSearch);

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
      `http://localhost:5000/api/users/${user._id}/getOneUser`,
      { headers: { "x-auth-token": decodedUser } }
    );
    setHomeRecipes(userRecipeResponse.data.recipes);
  };

  // Get user's friend's posts.
  // const handleGetFriendsPosts = async () => {
  //   let response = await axios.get(
  //     `http://localhost:3011/api/posts/${user._id}/friendsPosts`,
  //     { headers: { "x-auth-token": decodedUser } }
  //   );
  //   setFriendsPosts(response.data);
  // };

  // TODO: Add functions to handle RecipeAdd and Delete

  useEffect(() => {
    // handleGetPosts();
    // handleGetFriendsPosts();
    handleGetUserRecipes();
  }, []);

  return (
    <div>
      <h1 className="container">Home Page for {user.name}!</h1>
      {/* <UserInfoDisplay user={user} /> */}

      <div>
        {/* <PostForm setPosts={setPosts} /> */}
        <AddRecipe />
        <SearchUserRecipes
          RecipeSearch={homeRecipeSearch}
          SetRecipeSearch={setHomeRecipeSearch}
        />
        <div className="flex-row">
          <div className="width50">
            {/* <PostList posts={friendsPosts} friendsList={true} /> */}
            <ProfileRecipeCardMapper
              profileRecipes={homeRecipes}
              searchRecipe={homeRecipeSearch}
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
