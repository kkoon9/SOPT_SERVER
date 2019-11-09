var express = require('express');
const router = express.Router({mergeParams: true});

/* GET home page. */
router.use('/blogs', require('./blogs'));

module.exports = router;
