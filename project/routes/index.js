const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/blog', require('./blog'));
//router.use('/user', require('./user'));

module.exports = router;