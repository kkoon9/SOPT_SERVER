const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/PoolAsync');

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
        const values = [articleIdx, name, password, '', comment];
        return new Promise(async (resolve, reject) => {
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
    // read: ({
    //     articleIdx,
    //     blogIdx
    // }) => {
    //     const table = 'commnet';
    //     let idx = articleIdx;
    //     let query = `SELECT * FROM ${table} WHERE articleIdx='${idx}';`;
    //     let message = responseMessage.ARTICLE_READ_ARTICLEIDX_SUCCESS;
    //     return new Promise(async (resolve, reject) => {
    //         if(blogIdx){
    //             query = `SELECT * FROM ${table} WHERE blogIdx='${blogIdx}';`;
    //             message = responseMessage.ARTICLE_READ_BLOGIDX_SUCCESS;
    //         }
    //         const idxResult = await pool.queryParam_None(query);
    //         console.log(idxResult);
    //         if(!idxResult){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.ARTICLE_READ_FAIL)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: authUtil.successTrue(message, idxResult)
    //         });
    //     });
    // },
    // readAll: () => {
    //     const table = 'commnet';
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
    // update: ({
    //     articleIdx,
    //     title,
    //     content
    // }) => {
    //     const table = 'commnet';
    //     const conditions = [];
    //     if (title) conditions.push(`title = '${title}'`);
    //     if (content) conditions.push(`content = '${content}'`);
    //     const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
    //     const query = `UPDATE ${table} ${setStr} WHERE articleIdx = ${articleIdx}`;
    //     return new Promise(async (resolve, reject) => {
    //         const result = await pool.queryParam_None(query);
    //         if(!result){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.ARTICLE_UPDATE_FAIL)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: authUtil.successTrue(responseMessage.ARTICLE_UPDATE_SUCCESS, result)
    //         });
    //     });
    // },
    // delete: ({articleIdx}) => {
    //     const table = 'commnet';
    //     const query = `DELETE FROM ${table} WHERE articleIdx = ${articleIdx}`;
    //     return new Promise(async (resolve, reject) => {
    //         const result = await pool.queryParam_None(query);
    //         if(!result){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.ARTICLE_DELETE_FAIL)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: authUtil.successTrue(responseMessage.ARTICLE_DELETE_SUCCESS, result)
    //         });
    //     });
    // },
};