const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Recipe, validateRecipe } = require("../models/recipe");
const fileUpload = require("../middleware/file_upload");

const auth = require("../middleware/auth");

//  TODO: CRUD functionality for Recipes

//  POST a new recipe to users(COMPLETE)
// http://localhost:5000/api/recipes/62868c2bd071a220048e113d/recipes
router.post("/:userId/recipes", async (req, res) => {
  try {
    //  find a user's id
    const user = await User.findById(req.params.userId);
    // check if there is no user id
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    // create a recipe to be added.
    let recipe = new Recipe({
      // recipe fields
      author: user,
      // 'user' is getting the id from MongoDB when generated by the user
      name: req.body.name,
      ingredients: req.body.ingredients,
      preparation_time: req.body.preparation_time,
      serving_size: req.body.serving_size,
      cook_time: req.body.cook_time,
      yield: req.body.yield,
      image: "../uploads/images/recipe_placeholder.jpg",
    });
    //add recipe body data to the user
    user.recipes.push(recipe);
    await user.save();
    return res.send(user.recipes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT request to update the recipe inside of a user(COMPLETE)
// http://localhost:5000/api/recipes/:userId/recipes/:recipeId
router.put("/:userId/recipes/:recipeId", async (req, res) => {
  try {
    // validate for the recipe
    let { error } = validateRecipe(req.body);
    // if there is no recipe id
    if (error) {
      return res.status(400).send(`Recipe body is not valid ${error}`);
    }
    //  find a user's id
    const user = await User.findById(req.params.userId);
    // check if there is no user id
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    // check if recipe exists inside a user's subdocument
    const recipe = user.recipes.id(req.params.recipeId);
    if (!recipe) {
      return res
        .status(400)
        .send(`The recipe does not exist inside the recipes!`);
    }
    // Update the recipe fields
    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    recipe.preparation_time = req.body.preparation_time;
    recipe.serving_size = req.body.serving_size;
    recipe.cook_time = req.body.cook_time;
    recipe.yield = req.body.yield;
    // save the changes
    await user.save();
    // sends back updated recipe
    return res.send(user);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//  DELETE a recipe from a user (COMPLETE)
// http://localhost:5000/api/recipes/:userId/recipes/:recipeId
router.delete("/:userId/recipes/:recipeId", async (req, res) => {
  try {
    //  find a user's id
    const user = await User.findById(req.params.userId);
    // check if there is no user id
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    // find the recipe inside the user
    let recipe = user.recipes.id(req.params.recipeId);
    // if there is no recipe inside the user
    if (!recipe) {
      return res
        .status(400)
        .send(`The recipe does not exist inside the recipes!`);
    }
    // removes the recipe from the user
    recipe = await recipe.remove();
    await user.save();
    //  sends a response back with the removed recipe.
    return res.send(recipe);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Create a Route to upload the image to the recipe user.

//  Only for images PUT request
router.put(
  "/:userId/recipes/:recipeId/updateRecipeImage",
  [auth, fileUpload.single("image")],
  async (req, res) => {
    try {
      // find a user by their id
      let user = await User.findById(req.params.userId);
      if (!user)
        return res
          .status(400)
          .send(`User with ObjectId ${req.params.userId} does not exist.`);

      // console.log(user.recipes);
      // find the recipe ID
      // const recipe = user.recipes.find((foundRecipe) => {
      //   console.log(foundRecipe["_id"]);
      //   console.log(req.params.recipeId);
      //   console.log(foundRecipe["_id"] == req.params.recipeId);
      //   foundRecipe["_id"] == req.params.recipeId;
      // });
      let recipe;
      user.recipes.forEach((foundRecipe) => {
        if (foundRecipe["_id"] == req.params.recipeId) {
          recipe = foundRecipe;
        }
      });
      console.log(req.params.recipeId);

      // console.log(" the recipe value on line 135 is", recipe);
      // check if there was no recipe ID
      if (!recipe)
        return res
          .status(400)
          .send(`User with ObjectId ${req.params.recipeId} does not exist.`);
      //  Update the photo of the recipe ID
      recipe.image = req.file.path;
      console.log(req.file.path);
      // recipe.image.push(req.file.path);

      // console.log("the recipe image path is", recipe.image);

      await user.save();
      const token = user.generateAuthToken();

      return res
        .status(200)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  }
);

module.exports = router;
