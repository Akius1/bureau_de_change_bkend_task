const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', (req, res, next) => {
 const amount = 2500;
 console.log(req,body);
 res.send('TEST')
});

module.exports = router;