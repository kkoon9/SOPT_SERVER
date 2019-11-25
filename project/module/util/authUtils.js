// authUtil.js
// 미들웨어 구현

const jwt = require('../jwt');
const responseMessage = require('./responseMessage');
const statusCode = require('./statustatusCodeode');
const util = require('./utils');

const authUtil = {
    LoggedIn : async(req, res, next) => {
        const token = req.headers.token;
        if(!token) { // 토큰이 없다면
            res
            .status(statusCode.BAD_REQUEST)
            .send(util.successFalse(responseMessage.EMPTY_TOKEN));
            return;
        }

        const result = jwt.verify(token);   // token이 있다면 verify를 통해 검증

        if(result == -3) { // 만료된 토큰
            res.status(statusCode.UNAUTHORIZED).send(util.successFalse(responseMessage.EXPIRED_TOKEN));
            return;
        }


        if(result == -2) { // 유효하지 않은 토큰
            res.status(statusCode.UNAUTHORIZED).send(util.successFalse(responseMessage.INVALID_TOKEN));
            return;
        }

        const userIdx = result.idx;
        if(!userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(responseMessage.NULL_VALUE));
            return;
        }

        req.decoded = userIdx;
        next();
    }
}

module.exports = authUtil