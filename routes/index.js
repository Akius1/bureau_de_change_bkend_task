var express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripePublishableKey);
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    stripePublishableKey: keys.stripePublishableKey 
   });
});

module.exports = router;
