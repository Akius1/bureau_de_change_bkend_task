const { validateUser } = require("../middleware/validation");
const { encrypt } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const User = require("../models/user")

const users = [];
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


  //Reading to a json file
  // const outputPath = path.join(__dirname, `../data.json`);
  // const outputData = {
  //   name: value.name,
  //   email: value.email,
  //   password: hashedPassword,
  // };

  // users.push(outputData);

  // const jsonFile = JSON.stringify(users, null, 2);

  // const newUser = fs.writeFile(outputPath, jsonFile, (err) => {
  //   if (err) console.log(err);
  // });

  // console.log(newUser);
  // return outputData;

  //Reading to mondodb

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
