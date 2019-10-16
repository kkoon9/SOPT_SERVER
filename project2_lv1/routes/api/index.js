var express = require('express');
var router = express.Router();

/* API page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API' });
});
router.use('/group', require('./group.js'));
  
module.exports = router;
