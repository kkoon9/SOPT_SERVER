const express = require('express');
const router = express.Router({mergeParams: true});
const authUtil = require('../../../../module/authUtil');
const statusCode = require('../../../../module/statusCode');
const responseMessage = require('../../../../module/responseMessage');
const Comment = require('../../../../model/comment');

router.get('/commentIdx', (req, res) => {
    const {
        commentIdx
    } = req.body;
    if (!commentIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Comment.read({
            commentIdx
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
    const {articleIdx} = req.params;
    Comment.read({
            articleIdx
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
router.post('/', (req, res) => {
    const {articleIdx} = req.params;
    const {
        name,
        password,
        comment
    } = req.body;
    if (!articleIdx || !name || !password || !comment) {
        const missParameters = Object.entries({
                articleIdx,
                name,
                password,
                comment
            })
            .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(`${responseMessage.NULL_VALUE}, ${missParameters}`));
        return;
    }
    Comment.create({
            articleIdx,
            name,
            password,
            comment
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
        commentIdx,
        password,
        comment
    } = req.body;
    if (!commentIdx || !password || !comment) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Comment.update({
            commentIdx,
            password,
            comment
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
        commentIdx,
        password
    } = req.body;
    if (!commentIdx || ! password) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Comment.delete({
            commentIdx,
            password
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
