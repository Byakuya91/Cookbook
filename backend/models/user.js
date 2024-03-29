const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { recipeSchema } = require("./recipe");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    default: "../uploads/images/placeholder_avatar.jpg",
  },
  recipes: {
    type: [{ type: recipeSchema }],
  },
  favorites: {
    type: [{ type: mongoose.Types.ObjectId }],
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      image: this.image,
      recipes: this.reciepe,
      favorites: this.favorites,
    },
    process.env.JWT_SECRET
  );
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024),
    isAdmin: Joi.bool(),
    image: Joi.string(),
    favorites: Joi.array(),
    recipes: Joi.array(),
  });

  return schema.validate(user);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
