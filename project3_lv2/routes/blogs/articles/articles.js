const express = require('express');
const router = express.Router({mergeParams: true});
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const Article = require('../../../model/article');

router.get('/articleIdx', (req, res) => {
    console.log(req.params);
    const {
        articleIdx
    } = req.body;
    if (!articleIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.read({
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
router.get('/', (req, res) => {
    const {blogIdx} = req.params;
    Article.read({
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
// router.get('/', (req, res) => {
//     Article.readAll()
//         .then(({
//             code,
//             json
//         }) => {
//             res.status(code).send(json);
//         }).catch(err => {
//             res.status(statusCode.INTERNAL_SERVER_ERROR)
//                 .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
//         });
// });

router.post('/', (req, res) => {
    const {blogIdx} = req.params;
    const {
        title,
        writer,
        content
    } = req.body;
    if (!blogIdx || !title || !writer || !content) {
        const missParameters = Object.entries({
                blogIdx,
                title,
                writer,
                content
            })
            .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(`${responseMessage.NULL_VALUE}, ${missParameters}`));
        return;
    }
    Article.create({
            blogIdx,
            title,
            writer,
            content
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
        articleIdx,
        title,
        content
    } = req.body;
    if (!articleIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.update({
            articleIdx,
            content,
            title
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
        articleIdx
    } = req.body;
    if (!articleIdx) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.delete({
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

module.exports = router;
