const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require('../module/PoolAsync');

module.exports = {
    create: ({
        blogIdx,
        title,
        writer,
        content
    }) => {
        const table = 'article';
        const fields = 'blogIdx, title, writer, content';
        const questions = `?, ?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [blogIdx, title, writer, content];
        return new Promise(async (resolve, reject) => {
            // blogIdx 여부 체크
            const blogIdxDB = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx='${blogIdx}'`);
            if(!blogIdxDB) {
                resolve({
                    json: utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NO_BLOGIDX)
                });
                return;
            }
            // article create 성공
            const result = await pool.queryParam_Parse(query, values);
            if(!result){
                resolve({
                    json: utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ARTICLE_CREATE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.OK, responseMessage.ARTICLE_CREATE_SUCCESS)
            });
        });
    },
    read: ({
        articleIdx,
        blogIdx
    }) => {
        const table = 'article';
        let idx = articleIdx;
        let query = `SELECT * FROM ${table} WHERE articleIdx='${idx}';`;
        let message = responseMessage.ARTICLE_READ_ARTICLEIDX_SUCCESS;
        return new Promise(async (resolve, reject) => {
            if(blogIdx){
                query = `SELECT * FROM ${table} WHERE blogIdx='${blogIdx}';`;
                message = responseMessage.ARTICLE_READ_BLOGIDX_SUCCESS;
            }
            const idxResult = await pool.queryParam_None(query);
            console.log(idxResult);
            if(idxResult.length == 0){
                resolve({
                    json: utils.successFalse(statusCode.NO_CONTENT, responseMessage.ARTICLE_EMPTY)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.OK, message, idxResult)
            });
        });
    },
    // readAll: () => {
    //     const table = 'article';
    //     const query = `SELECT * FROM ${table}`;
    //     return new Promise(async (resolve, reject) => {
    //         const allResult = await pool.queryParam_None(query);
    //         if(!allResult) {
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: utils.successFalse(responseMessage.ARTICLE_READ_ALL_FAIL)
    //             });
    //             return;
    //         }
    //         if(allResult.length == 0){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: utils.successFalse(responseMessage.ARTICLE_EMPTY)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: utils.successTrue(responseMessage.ARTICLE_READ_ALL_SUCCESS, allResult)
    //         });
    //     });
    // },
    update: ({
        articleIdx,
        title,
        content
    }) => {
        const table = 'article';
        const conditions = [];
        if (title) conditions.push(`title = '${title}'`);
        if (content) conditions.push(`content = '${content}'`);
        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const query = `UPDATE ${table} ${setStr} WHERE articleIdx = ${articleIdx}`;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);
            if(!result){
                resolve({
                    json: utils.successFalse(statusCode.NOT_FOUND, responseMessage.ARTICLE_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.OK, responseMessage.ARTICLE_UPDATE_SUCCESS)
            });
        });
    },
    delete: ({articleIdx}) => {
        const table = 'article';
        const query = `DELETE FROM ${table} WHERE articleIdx = ${articleIdx}`;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);
            if(!result){
                resolve({
                    json: utils.successFalse(statusCode.NOT_FOUND, responseMessage.ARTICLE_DELETE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.OK, responseMessage.ARTICLE_DELETE_SUCCESS)
            });
        });
    },
};