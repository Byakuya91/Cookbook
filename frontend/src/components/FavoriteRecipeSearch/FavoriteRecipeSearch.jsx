import React, { useState, useEffect } from "react";

const FavoriteRecipeSearch = (props) => {
  return (
    <div>
      <input
        type="search"
        value={props.searchFavoriteRecipe}
        placeholder="Search favorite Recipe"
        onChange={(event) => props.setSearchFavoriteRecipe(event.target.value)}
      />
    </div>
  );
};

export default FavoriteRecipeSearch;
