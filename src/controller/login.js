const { validateLogin } = require("../middleware/validation");
const { createToken } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");

async function loginUser(body, callback) {
  const { email, password } = body;

  const { error, value } = await validateLogin({
    email,
    password,
  });

  if (error) {
    callback(error.details[0].message, null);
  }

  return await User.find({ email: value.email })
    .exec()
    .then(async (data) => {
      if (data.length < 1) {
        return callback("User not registered", null);
      }
      let token = createToken(data.email, data.name);
      return callback(null, token);
    })
    .catch((error) => {
      return callback(error, null);
    });
}

module.exports = loginUser;
