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
  calories: { type: Number },
  directions: { type: String },
  favorite: { type: Boolean, default: false },
  image: {
    type: String,
    default: "http://localhost:5000/uploads/images/recipe_placeholder.jpg",
  },
});

function validateRecipe(post) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100),
    ingredients: Joi.string().min(2).max(100),
    directions: Joi.string().min(10).max(100),
    serving_size: Joi.number(),
    preparation_time: Joi.string().min(2).max(50),
    cook_time: Joi.string().min(2).max(100),
    yield: Joi.number(),
    image: Joi.string(),
    calories: Joi.number(),
    favorite: Joi.boolean(),
  });
  return schema.validate(post);
}

const Recipe = mongoose.model("Recipe", recipeSchema);

exports.recipeSchema = recipeSchema;
exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
