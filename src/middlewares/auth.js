const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

async function compare(password, userpassword) {
  //fetch user from db
  const compare = await bcrypt.compare(password, userpassword);
  return compare;
}

function createToken(useremail, username) {
  const secret = process.env.secret_id;
  //  console.log(secret + '  ' + useremail)
  const object = { email: useremail, name: username };
  const dataToTokenise = jwt.sign(object, secret, { expiresIn: "7d" });
  return dataToTokenise;
}

function checkToken(header) {
  // console.log(header);
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    return token;
  } else {
    //If header is undefined return Forbidden (403)
    return res
      .status(403)
      .json("ERROR: Could not connect to the protected route");
  }
  
}

module.exports = {
  encrypt,
  compare,
  createToken,
  checkToken,
};
