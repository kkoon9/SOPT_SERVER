// authUtil.js

const jwt = require('../jwt');
const rM = require('./responseMessage');
const sC = require('./statusCode');
const util = require('./utils');

const authUtil = {
    LoggedIn : async(req, res, next) => {
        const token = req.headers.token;
        if(!token) {
            res.status(sC.BAD_REQUEST).send(util.successFalse(sC.BAD_REQUEST, rM.EMPTY_TOKEN));
            return;
        }

        const result = jwt.verify(token);   // token이 있다면 verify를 통해 검증
        if(result == -3) {
            res.status(sC.UNAUTHORIZED).send(util.successFalse(sC.UNAUTHORIZED, rM.EXPIRED_TOKEN));
            return;
        }

        if(result == -2) {
            res.status(sC.UNAUTHORIZED).send(util.successFalse(sC.UNAUTHORIZED, rM.INVALID_TOKEN));
            return;
        }

        const userIdx = result.idx;
        if(!userIdx) {
            res.status(sC.BAD_REQUEST).send(util.successFalse(sC.BAD_REQUEST, rM.NULL_VALUE));
            return;
        }

        req.decoded = userIdx;
        next();
    }
}

module.exports = authUtil