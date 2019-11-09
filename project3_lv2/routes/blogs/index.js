const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/:blogIdx/articles', require('./articles'));
router.use('/', require('./blogs'));

module.exports = router;