const express = require('express');
const { default: Stripe } = require('stripe');
const router = express.Router();

/* GET home page. */
router.post('/', (req, res, next) => {
 const amount = 2500;

console.log(req.body)
 stripe.customers.create({
     email: req.body.stripeEmail,
     source: req.body.stripeToken
 }).then(customer => stripe.charges.create({
     amount,
     description: 'Bureu de Change',
     currency: 'usd',
     customer: customer.id,
 })).then(charge => res.render('success'));
});

module.exports = router;