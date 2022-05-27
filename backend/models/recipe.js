const mongoose = require("mongoose");
const Joi = require("joi");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  author: { type: mongoose.Types.ObjectId },
  ingredients: { type: String, required: true, minlength: 2, maxlength: 100 },
  preparation_time: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  serving_size: { type: Number, required: true },
  cook_time: { type: String, required: true, minlength: 2, maxlength: 100 },
  yield: { type: Number, required: true },
  directions: { type: String },
  image: { type: String, default: "../uploads/images/recipe_placeholder.jpg" },
});

function validateRecipe(post) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    ingredients: Joi.string().min(2).max(100).required(),
    directions: Joi.string().min(10).max(100).required(),
    serving_size: Joi.number().required(),
    preparation_time: Joi.string().min(2).max(50).required(),
    cook_time: Joi.string().min(2).max(100).required(),
    yield: Joi.number().required(),
    image: Joi.string(),
  });
  return schema.validate(post);
}

const Recipe = mongoose.model("Recipe", recipeSchema);

exports.recipeSchema = recipeSchema;
exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
