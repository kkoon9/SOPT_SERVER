const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require('../module/PoolAsync');

module.exports = {
    create: ({
        host,
        address,
        comment,
        phone
    }) => {
        const table = 'blog';
        const fields = 'host, address, comment, phone';
        const questions = `?, ?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [host, address, comment, phone];
        return new Promise(async (resolve, reject) => {
            // host 중복 체크
            const hostDB = await pool.queryParam_None(`SELECT * FROM ${table} WHERE host='${host}'`);
            if(hostDB.length > 0) {
                resolve({
                    json: utils.successFalse(statusCode.BAD_REQUEST, responseMessage.ALREADY_HOST)
                });
                return;
            }
            // address 중복 체크
            const addressDB = await pool.queryParam_None(`SELECT * FROM ${table} WHERE address='${address}'`);
            if(addressDB.length > 0){
                resolve({
                    json: utils.successFalse(statusCode.BAD_REQUEST, responseMessage.ALREADY_ADDRESS)
                });
                return;
            }
            // blog create 성공
            const result = await pool.queryParam_Parse(query, values);
            if(!result){
                resolve({
                    json: utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BLOG_CREATE_FAIL)
                });
                return;
            }
            const hostId = result;
            resolve({
                json: utils.successTrue(statusCode.SUCCESS, responseMessage.BLOG_CREATE_SUCCESS, hostId)
            });
        });
    },
    read: ({
        blogIdx,
        host,
        address
    }) => {
        const table = 'blog';
        let idx = blogIdx;
        let query = `SELECT * FROM ${table} WHERE blogIdx='${idx}';`;
        let message = responseMessage.BLOG_READ_BLOGIDX_SUCCESS;
        return new Promise(async (resolve, reject) => {
            if(host){
                query = `SELECT * FROM ${table} WHERE host='${host}';`;
                message = responseMessage.BLOG_READ_HOST_SUCCESS;
            }
            else if(address){
                query = `SELECT * FROM ${table} WHERE address='${address}';`;
                message = responseMessage.BLOG_READ_ADDRESS_SUCCESS;
            }        
            const idxResult = await pool.queryParam_None(query);
            if(idxResult.length == 0){
                resolve({
                    json: utils.successFalse(statusCode.NO_CONTENT, responseMessage.BLOG_EMPTY)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.SUCCESS, message, idxResult)
            });
        });
    },
    readAll: () => {
        const table = 'blog';
        const query = `SELECT * FROM ${table}`;
        return new Promise(async (resolve, reject) => {
            const allResult = await pool.queryParam_None(query);
            if(allResult.length == 0){
                resolve({
                    json: utils.successFalse(statusCode.NO_CONTENT, responseMessage.BLOG_EMPTY)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.SUCCESS, responseMessage.BLOG_READ_ALL_SUCCESS, allResult)
            });
        });
    },
    update: ({
        blogIdx,
        phone,
        comment
    }) => {
        const table = 'blog';
        const conditions = [];
        if (phone) conditions.push(`phone = '${phone}'`);
        if (comment) conditions.push(`comment = '${comment}'`);
        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const query = `UPDATE ${table} ${setStr} WHERE blogIdx = ${blogIdx}`;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);
            if(!result){
                resolve({
                    json: utils.successFalse(statusCode.NOT_FOUND, responseMessage.BLOG_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.SUCCESS, responseMessage.BLOG_UPDATE_SUCCESS)
            });
        });
    },
    delete: ({blogIdx}) => {
        const table = 'blog';
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);
            if(!result){
                resolve({
                    json: utils.successFalse(statusCode.NOT_FOUND, responseMessage.BLOG_DELETE_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(statusCode.SUCCESS, responseMessage.BLOG_DELETE_SUCCESS, result)
            });
        });
    },
};