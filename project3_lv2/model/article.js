const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
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
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BLOGIDX)
                });
                return;
            }
            // article create 성공
            const result = await pool.queryParam_Parse(query, values);
            if(!result){
                resolve({
                    code: statusCode.INTERNAL_SERVER_ERROR,
                    json: authUtil.successFalse(responseMessage.ARTICLE_CREATE_FAIL)
                });
                return;
            }
            console.log(result);
            const articleId = result.insertId;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.ARTICLE_CREATE_SUCCESS, articleId)
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
            if(!idxResult){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.ARTICLE_READ_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(message, idxResult)
            });
        });
    },
    readAll: () => {
        const table = 'article';
        const query = `SELECT * FROM ${table}`;
        return new Promise(async (resolve, reject) => {
            const allResult = await pool.queryParam_None(query);
            if(!allResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.ARTICLE_READ_ALL_FAIL)
                });
                return;
            }
            if(allResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.ARTICLE_EMPTY)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.ARTICLE_READ_ALL_SUCCESS, allResult)
            });
        });
    },
    // update: ({
    //     blogIdx,
    //     phone,
    //     comment
    // }) => {
    //     const table = 'blog';
    //     const conditions = [];
    //     if (phone) conditions.push(`phone = '${phone}'`);
    //     if (comment) conditions.push(`comment = '${comment}'`);
    //     const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
    //     const query = `UPDATE ${table} ${setStr} WHERE blogIdx = ${blogIdx}`;
    //     return new Promise(async (resolve, reject) => {
    //         const result = await pool.queryParam_None(query);
    //         if(!result){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.BLOG_UPDATE_FAIL)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: authUtil.successTrue(responseMessage.BLOG_UPDATE_SUCCESS, result)
    //         });
    //     });
    // },
    // delete: ({blogIdx}) => {
    //     const table = 'blog';
    //     const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
    //     return new Promise(async (resolve, reject) => {
    //         const result = await pool.queryParam_None(query);
    //         if(!result){
    //             resolve({
    //                 code: statusCode.NOT_FOUND,
    //                 json: authUtil.successFalse(responseMessage.BLOG_DELETE_FAIL)
    //             });
    //             return;
    //         }
    //         resolve({
    //             code: statusCode.OK,
    //             json: authUtil.successTrue(responseMessage.BLOG_DELETE_SUCCESS, result)
    //         });
    //     });
    // },
};