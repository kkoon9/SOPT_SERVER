var express = require('express');
const router = express.Router({mergeParams: true});

/* GET home page. */
router.use('/', require('./articles'));

module.exports = router;
