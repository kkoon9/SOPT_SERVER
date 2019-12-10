const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');

router.get('/', GroupController.readAll);
router.get('/mix', GroupController.mix);
router.get('/:groupIdx', GroupController.read);

module.exports = router;