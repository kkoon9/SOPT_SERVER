var express = require('express');
var router = express.Router();

// base : localhost:3000/

router.use('/api', require('./api'));

router.get('/', (req, res) => {
  res.send('Home Page');
})
// 폴더로 경로가 지정되면 그 폴더에 있는 index.js를 실행한다.
// 즉, index.js를 생략할 수 있다.

module.exports = router;
