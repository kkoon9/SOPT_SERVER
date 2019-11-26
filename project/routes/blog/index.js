const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/:blogIdx/article', require('./article'));
router.use('/', require('./blogs'));

module.exports = router;