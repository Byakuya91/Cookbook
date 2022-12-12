const SearchRecipe = (props) => {
  console.log("The value for SearchRecipe is:", props.searchRecipe);

  return (
    //  create a basic searchBar

    // test the search and see if it is capturing the value
    <div>
      <input
        type="search"
        value={props.searchRecipe}
        placeholder="Search a recipe,ingredients,pre_time...."
        onChange={(event) => props.setSearchRecipe(event.target.value)}
      />
    </div>
  );
};

export default SearchRecipe;
