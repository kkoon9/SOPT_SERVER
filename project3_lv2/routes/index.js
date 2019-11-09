var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SOPT week 3' });
});
router.use('/blogs', require('./blogs'));
router.use('/articles', require('./articles'));

module.exports = router;
