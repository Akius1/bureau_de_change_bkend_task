const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
//   updated: { type: Date, default: Date.now() },
//   age: { type: Number, min: 18, max: 65, required: true },
});

module.exports = mongoose.model("User", UserSchema);
