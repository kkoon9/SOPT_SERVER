var express = require('express');
var router = express.Router();

// base : localhost:3000/api/news

router.use('/likes', require('./like.js'));


router.get('/', (req,res) => {
    res.send('News Page');
});

module.exports = router;
