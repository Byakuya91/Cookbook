// Import statements
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../models/user");
const { Recipe, validateRecipe } = require("../models/recipe");
const fileUpload = require("../middleware/file_upload");
const { Ingredient, validateIngredient } = require("../models/ingredients");

const auth = require("../middleware/auth");
const { Mongoose } = require("mongoose");
const e = require("express");

// CRUD functionality for all Ingredients

// ADD an Ingredient
router.post(
  "/:userId/recipes/:recipeId/ingredients/",
  [auth],
  async (req, res) => {
    try {
      //  find a user's id
      const user = await User.findById(req.params.userId);
      // console.log("the user is: ", user);

      //   console.log("The user id is: ", user);
      // console.log("the user is", user);

      // check if there is no user id
      if (!user)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);
      // create a recipe to be added.

      // Step TWO, FIND the recipe ID

      // find the recipe inside the user
      let recipe = user.recipes.id(req.params.recipeId);
      // if there is no recipe inside the user
      // console.log("The recipe id is: ", recipe);
      if (!recipe) {
        return res
          .status(400)
          .send(`The recipe does not exist inside the recipes!`);
      }

      //   Step THREE: create a a way to add an ingredient
      // let ingredientsArr = recipe.ingredients;

      // console.log("The Ingredients inside the array are: ", ingredientsArr);

      let newIngredient = {
        name: req.body.name,
        amount: req.body.amount,
        unit: req.body.unit,
      };

      recipe.ingredients.push(newIngredient);

      const token = user.generateAuthToken();
      await user.save();
      console.log(user.recipes);
      return res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(user.recipes);
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
);

// TODO:  DELETE an ingredient

//  DELETE an ingredient from a user (COMPLETE)
// http://localhost:5000/api/recipes/:userId/recipes/:recipeId
router.delete(
  "/:userId/selectedRecipe/:recipeId/selectedIngredient/:ingredientId",
  async (req, res) => {
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

      // find the ingredient inside the user
      let selectedIngredient = recipe.ingredients.id(req.params.ingredientId);
      if (!selectedIngredient) {
        return res
          .status(400)
          .send(
            `The selected ingredient: ${selectedIngredient} does not exist inside the ingredients!`
          );
      }

      //   find an ingredient and delete

      removedIngredient = await selectedIngredient.remove();

      await user.save();
      //  sends a response back with the removed recipe.
      return res.send(recipe);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
);

// UPDATE an INGREDIENT

router.put(
  "/:userId/selectedRecipe/:recipeId/selectedIngredient/:IngredientId",
  [auth, fileUpload.single("image")],
  async (req, res) => {
    try {
      // validate for the recipe
      let { error } = validateIngredient(req.body);
      // if there is no recipe id
      if (error) {
        return res.status(400).send(`Recipe body is not valid ${error}`);
      }
      //  find a user's id
      const user = await User.findById(req.params.userId);
      console.log("the user ID is: ", user);
      // check if there is no user id
      if (!user)
        return res
          .status(400)
          .send(`User with id ${req.params.userId} does not exist!`);
      // check if recipe exists inside a user's subdocument
      const recipe = user.recipes.id(req.params.recipeId);
      console.log("The recipe is ", recipe);
      if (!recipe) {
        return res
          .status(400)
          .send(`The recipe does not exist inside the recipes!`);
      }

      //  update the ingredients
      let selectedIngredientsArr = recipe.ingredients;
      console.log("the selected Ingredients are: ", selectedIngredientsArr);

      //    try updating through indexes

      let ingredientIndex = selectedIngredientsArr.find(
        (ingredient) => ingredient._id === req.params.ingredientId
      );

      console.log("Before update", selectedIngredientsArr[ingredientIndex]);

      //   let updatedIngredient = selectedIngredientsArr.map((ingredient) => {
      //     ingredient._id === req.params.ingredientId
      //       ? {
      //           ...ingredient,
      //           name: req.body.name,
      //           amount: req.body.amount,
      //           unit: req.body.unit,
      //         }
      //       : ingredient;
      //   });

      //   DIDN"T WORK
      //   for (const obj of selectedIngredients) {
      //     if (obj._id === req.params.ingredientId) {
      //       (obj.name = req.body.name),
      //         (obj.amount = req.body.amount),
      //         (obj.unit = req.body.unit);

      //       break;
      //     }
      //   }
      //   recipe.ingredients.push({
      //     name: req.body.name,
      //     amount: req.body.amount,
      //     unit: req.body.unit,
      //   });

      //   recipe.ingredients.update(
      //     { _id: req.params.ingredientId },
      //     {
      //       $set: {
      //         name: req.body.name,
      //         amount: req.body.amount,
      //         unit: req.body.unit,
      //       },
      //     }
      //   );

      // save the changes
      //console.log("the user   is:", user.recipes);
      const token = user.generateAuthToken();
      await user.save();
      // sends back updated recipe
      return res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
);

module.exports = router;
