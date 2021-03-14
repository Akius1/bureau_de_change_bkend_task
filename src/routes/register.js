var express = require("express");
var router = express.Router();
const userRegistration = require("../controller/register");
const keys = require("../../config/keys");
const stripe = require("stripe")(keys.stripePublishableKey);

/* GET home page. */
router.get("/", async (req, res) => {
  res.render("register", { layout: "main" });
});

/* GET users listing. */
router.post("/", (req, res, next)=> {
  const body = req.body;
  console.log(body);

   userRegistration(body).then((resp) => {
      console.log(resp)
    res.render("login");
  });
});

module.exports = router;
