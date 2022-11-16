import { TextField } from "@mui/material";
import React, { useState } from "react";

const SearchUserRecipes = (props) => {
  return (
    <div>
      <TextField
        type="search"
        // placeholder="Search a recipe..."
        label="Search a Recipe"
        variant="outlined"
        size="normal"
        value={props.RecipeSearch}
        onChange={(event) => props.SetRecipeSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchUserRecipes;
