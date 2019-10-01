var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('블로그입니다.'); 
});

module.exports = router;
