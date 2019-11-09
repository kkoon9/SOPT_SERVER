const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/PoolAsync');
const encrypt = require('../module/encryption');

module.exports = {
    create: ({
        articleIdx,
        name,
        password,
        comment
    }) => {
        const table = 'comment';
        const fields = 'articleIdx, name, password, salt, comment';
        const questions = `?, ?, ?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        return new Promise(async (resolve, reject) => {
            // hashed 생성
            const {
                hashed,
                salt
            } = await encrypt.encrypt(password);
            const values = [articleIdx, name, hashed, salt, comment];
            // comment create 성공
            const result = await pool.queryParam_Parse(query, values);
            if(!result){
                resolve({
                    code: statusCode.INTERNAL_SERVER_ERROR,
                    json: authUtil.successFalse(responseMessage.COMMENT_CREATE_FAIL)
                });
                return;
            }
            console.log(result);
            const commentId = result.insertId;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.COMMENT_CREATE_SUCCESS, commentId)
            });
        });
    },
    read: ({
        articleIdx,
        commentIdx
    }) => {
        const table = 'comment';
        let idx = commentIdx;
        let query = `SELECT * FROM ${table} WHERE commentIdx='${idx}';`;
        let message = responseMessage.COMMENT_READ_COMMENTIDX_SUCCESS;
        return new Promise(async (resolve, reject) => {
            if(articleIdx){
                query = `SELECT * FROM ${table} WHERE articleIdx='${articleIdx}';`;
                message = responseMessage.ARTICLE_READ_ARTICLEIDX_SUCCESS;
            }
            const idxResult = await pool.queryParam_None(query);
            console.log(idxResult);
            if(!idxResult){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.COMMENT_READ_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(message, idxResult)
            });
        });
    },
    // readAll: () => {
    //     const table = 'comment';
    //     const query = `SELECT * FROM ${table}`;
    //     return new Promise(async (resolve, reject) => {
    //         const allResult = await pool.queryParam_None(query);
    //         if(!allResult) {
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.ARTICLE_READ_ALL_FAIL)
    //             });
    //             return;
    //         }
    //         if(allResult.length == 0){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.ARTICLE_EMPTY)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: authUtil.successTrue(responseMessage.ARTICLE_READ_ALL_SUCCESS, allResult)
    //         });
    //     });
    // },
    update: ({
        commentIdx,
        password,
        comment
    }) => {
        const table = 'comment';
        const conditions = [];
        if (comment) conditions.push(`comment = '${comment}'`);
        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const query = `UPDATE ${table} ${setStr} WHERE commentIdx = ${commentIdx}`;
        return new Promise(async (resolve, reject) => {
            const commentResult = await pool.queryParam_None(`SELECT * FROM ${table} WHERE commentIdx = '${commentIdx}'`);
            if(commentResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.COMMENT_UPDATE_FAIL)
                 });
                 return;
            }
            const comment = commentResult[0];
            const {
                hashed
            } = await encrypt.encryptWithSalt(password, comment.salt);
            if(comment.password != hashed){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(query);
            if(!result){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.COMMENT_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.COMMENT_UPDATE_SUCCESS, result)
            });
        });
    },
    delete: ({
        commentIdx,
        password
    }) => {
        const table = 'comment';
        const query = `DELETE FROM ${table} WHERE commentIdx = ${commentIdx}`;
        return new Promise(async (resolve, reject) => {
            const commentResult = await pool.queryParam_None(`SELECT * FROM ${table} WHERE commentIdx = '${commentIdx}'`);
            if(commentResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.COMMENT_UPDATE_FAIL)
                 });
                 return;
            }
            const comment = commentResult[0];
            const {
                hashed
            } = await encrypt.encryptWithSalt(password, comment.salt);
            if(comment.password != hashed){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(query);
            if(!result){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.COMMENT_DELETE_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.COMMENT_DELETE_SUCCESS, result)
            });
        });
    },
};