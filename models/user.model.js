const mongoose = require("mongoose");

const userSchemas = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean,
});

const userModel = mongoose.model("users",userSchemas)

module.exports = userModel
