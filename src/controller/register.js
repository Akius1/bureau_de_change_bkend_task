const { validateUser } = require("../middleware/validation");
const { encrypt } = require("../middleware/auth");
const path = require("path");
const User = require("../models/user")

async function userRegistration(body) {
  const { name, email, password } = body;

  const { error, value } = await validateUser({
    name,
    email,
    password,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  const hashedPassword = await encrypt(value.password);

  if (hashedPassword) {
    const user = new User({
      name: value.name,
      email: value.email,
      password: hashedPassword,
    })

    return await user.save();
  }
}

module.exports = userRegistration;
