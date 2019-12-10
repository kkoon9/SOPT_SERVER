const express = require('express');
const router = express.Router();

router.use('/groups', require('./groups'));
router.use('/users', require('./users'));

module.exports = router;