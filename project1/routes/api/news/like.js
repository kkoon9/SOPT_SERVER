var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('좋아요입니다.'); 
});

module.exports = router;
