const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Blog = require('../model/blog');

router.get('/Idx', (req, res) => {
    const {
        blogIdx
    } = req.body;
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({
            blogIdx
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/host', (req, res) => {
    const {
        host
     } = req.body;
    if (!host) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({
            host
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/address', (req, res) => {
    const {
        address
    } = req.body;
    if (!address) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({
            address
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/', (req, res) => {
    Blog.readAll()
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});

router.post('/', (req, res) => {
    const {
        host,
        address,
        comment,
        phone
    } = req.body;
    console.log({
        host,
        address,
        comment,
        phone
    });
    if (!host || !address) {
        const missParameters = Object.entries({
                host,
                address
            })
            .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(`${responseMessage.NULL_VALUE}, ${missParameters}`));
        return;
    }
    Blog.create({
            host,
            address,
            comment,
            phone
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            console.log("error : ", err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});

router.put('/', (req, res) => {
    const {
        blogIdx,
        comment,
        phone
    } = req.body;
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.update({
            blogIdx,
            comment,
            phone
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});

router.delete('/', (req, res) => {
    const {
        blogIdx
    } = req.body;
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.delete({
            blogIdx
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});

module.exports = router;
