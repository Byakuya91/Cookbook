const SearchRecipe = (props) => {
  return (
    //  create a basic searchBar
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
