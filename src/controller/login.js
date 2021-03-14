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

  // const inputPath = path.join(__dirname, `../data.json`);
  // console.log(__dirname);
  // fs.readFile(inputPath, "utf8", (err, data) => {
  //   if (err) return callback(err,null);

  //   let newData = JSON.parse(data);

  //   let response = newData.filter((val) => {
  //     return val.email === value.email;
  //   });
  //   if (response.length < 1) {
  //     return callback("please enter a valid user", null);
  //   }

  //   let token = createToken(response[0].email, response[0].name);
  //   callback(null, token);
  // });

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
