const express = require('express');
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripePublishableKey);
const router = express.Router();
const authorization = require("../middleware/authorijation");


/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { 
    stripePublishableKey: keys.stripePublishableKey 
   });
});

module.exports = router;
