const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Blog = require('../model/blog');
router.get('/', (req, res) => {
    Blog.readAll()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:BlogIdx', (req, res) => {
    const BlogIdx = req.params.BlogIdx;
    if(!BlogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({BlogIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/', (req, res) => {
    const {host, address, comment, phone} = req.body;
    console.log({host, address, comment, phone});
    if(!host || !address){
        const missParameters = Object.entries({host, address})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE}, ${missParameters}`));
        return;
    }
    Blog.create({host, address, comment, phone})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log("error : ", err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.put('/', (req, res) => {
    const {BlogIdx, comment, phone} = req.body;
    if(!BlogIdx || !comment || !phone){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.update({BlogIdx, comment, phone})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/', (req, res) => {
    const {BlogIdx} = req.body;
    if(!BlogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.delete({BlogIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;