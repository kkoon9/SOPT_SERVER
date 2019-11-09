var express = require('express');
const router = express.Router({mergeParams: true});

/* GET home page. */
router.use('/', require('./articles'));
router.use('/:articleIdx/comments', require('./comments'));

module.exports = router;
