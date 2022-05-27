import React, { useState } from "react";

const SearchUserRecipes = (props) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Search a recipe..."
        value={props.RecipeSearch}
        onChange={(event) => props.SetRecipeSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchUserRecipes;
