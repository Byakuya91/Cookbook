const mongoose = require("mongoose");
const Joi = require("joi");

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, maxlength: 100 },
  amount: { type: Number },
  unit: { type: String, minlength: 2, maxlength: 100 },
});

function validateIngredient(post) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100),
    amount: Joi.number(),
    unit: Joi.string().min(5).max(100),
  });
  return schema.validate(post);
}

const Ingredient = mongoose.model("Ingredient", ingredientsSchema);

exports.ingredientsSchema = ingredientsSchema;
exports.Ingredient = Ingredient;
exports.validateIngredient = validateIngredient;
