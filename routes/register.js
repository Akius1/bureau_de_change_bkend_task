var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
    res.render('register', {layout: 'main'}) 
})

module.exports = router;