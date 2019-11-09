var express = require('express');
const router = express.Router({mergeParams: true});

/* GET home page. */
router.use('/', require('./comments'));

module.exports = router;
