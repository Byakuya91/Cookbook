// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import AddIngredient from "./components/AddRecipe/AddIngredient";

import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage/FavoriteRecipesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { Button } from "@mui/material";

// Material UI
// import Button from "@babel/core";

function App() {
  //   state variables
  // setting the user's photo
  const [user, setUser] = useState({});
  const [file, setFile] = useState();

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "120px" }}>
        {/* <Button
          sx={[
            {
              "&:hover": {
                color: "red",
                backgroundColor: "white",
              },
            },
          ]}
        /> */}
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favoriteRecipes" element={<FavoriteRecipesPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
