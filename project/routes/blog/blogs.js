const express = require('express');
const router = express.Router({mergeParams: true});
const utils = require('../../module/util/utils');
const statusCode = require('../../module/util/statusCode');
const responseMessage = require('../../module/util/responseMessage');
const Blog = require('../../model/blog');

router.get('/blogIdx', (req, res) => {
    const {
        blogIdx
    } = req.body;
    if (!blogIdx) {
        res.send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({
            blogIdx
        })
        .then(({
            json
        }) => {
            res.send(json);
        }).catch(err => {
            res.send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/host', (req, res) => {
    const {
        host
     } = req.body;
    if (!host) {
        res.send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({
            host
        })
        .then(({
            json
        }) => {
            res.send(json);
        }).catch(err => {
            res.send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/address', (req, res) => {
    const {
        address
    } = req.body;
    if (!address) {
        res.send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    Blog.read({
            address
        })
        .then(({
            json
        }) => {
            res.send(json);
        }).catch(err => {
            res.send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        });
});
router.get('/', (req, res) => {
    Blog.readAll()
        .then(({
            json
        }) => {
            res.send(json);
        }).catch(err => {
            res.send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
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
        res.send(utils.successFalse(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
        return;
    }
    Blog.create({
            host,
            address,
            comment,
            phone
        })
        .then(({
            json
        }) => {
            res.send(json);
        }).catch(err => {
            console.log("error : ", err);
            res.send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        });
});

router.put('/', (req, res) => {
    const {
        blogIdx,
        comment,
        phone
    } = req.body;
    if (!blogIdx) {
        res.send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    Blog.update({
            blogIdx,
            comment,
            phone
        })
        .then(({
            json
        }) => {
            res.send(json);
        }).catch(err => {
            res.send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        });
});

router.delete('/', (req, res) => {
    const {
        blogIdx
    } = req.body;
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(utils.successFalse(responseMessage.NULL_VALUE));
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
                .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});

module.exports = router;