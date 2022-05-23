const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Recipe, validateRecipe } = require("../models/recipe");

const auth = require("../middleware/auth");

// CRUD for favorite Recipes

// PUT  Add a recipe to the favorites list (COMPLETE!)
// http://localhost:5000/api/favoriteRecipes/:userId/recipes/:recipeId
router.post("/:userId/favoriteRecipes/:recipeId", async (req, res) => {
  try {
    //  STEP ONE:  find the user's id
    const user = await User.findById(req.params.userId);
    // check if there is no user id
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    // STEP TWO find the recipe Id for the user
    const favoriteRecipe = user.recipes.id(req.params.recipeId);
    //  checking if there is no user id.
    if (!favoriteRecipe) {
      return res
        .status(400)
        .send(`The recipe does not exist inside the recipes!`);
    }

    // STEP THREE add the user's recipe into 'favorites' array.
    user.favorites.push(favoriteRecipe);
    await user.save();
    return res.send(user.favorites);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a recipe from favorites (COMPLETE)
// http://localhost:5000/api/recipes/:userId/recipes/:recipeId
router.delete("/:userId/favoriteRecipes/:recipeId", async (req, res) => {
  try {
    //  find a user's id
    const user = await User.findById(req.params.userId);
    // check if there is no user id
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    // find the recipe inside the user
    // TEST CODE
    // let favoriteRecipe = user.favorites.find([
    //   { favorites: { $eq: req.params.recipeId } },
    // ]);
    let favoriteRecipe = await User.find({
      favorites: { $eq: req.params.recipeId },
    });
    // if there is no recipe inside the user
    if (!favoriteRecipe) {
      return res
        .status(400)
        .send(`The recipe does not exist inside the recipes!`);
    }
    // removes the favorite recipe from the user's favorites list.
    user.favorites.splice(user.recipes.indexOf(favoriteRecipe), 1);
    await user.save();
    //  sends a response back with the removed favorite recipe.
    return res.send(favoriteRecipe);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
