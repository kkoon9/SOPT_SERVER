const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
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
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.ALREADY_HOST)
                });
                return;
            }
            // address 중복 체크
            const addressDB = await pool.queryParam_None(`SELECT * FROM ${table} WHERE address='${address}'`);
            if(addressDB.length > 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.ALREADY_ADDRESS)
                });
                return;
            }
            // blog create 성공
            const result = await pool.queryParam_Parse(query, values);
            if(!result){
                resolve({
                    code: statusCode.INTERNAL_SERVER_ERROR,
                    json: authUtil.successFalse(responseMessage.BLOG_DELETE_FAIL)
                });
                return;
            }
            console.log(result);
            const hostId = result.insertId;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BLOG_CREATE_SUCCESS,hostId)
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
            console.log(idxResult);
            if(!idxResult){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.BLOG_READ_FAIL)
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
        const table = 'blog';
        const query = `SELECT * FROM ${table}`;
        return new Promise(async (resolve, reject) => {
            const allResult = await pool.queryParam_None(query);
            if(!allResult) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.BLOG_READ_ALL_FAIL)
                });
                return;
            }
            if(allResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.BLOG_EMPTY)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BLOG_READ_ALL_SUCCESS, allResult)
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
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.BLOG_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BLOG_UPDATE_SUCCESS, result)
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
                    code: statusCode.NOT_FOUND,
                    json: authUtil.successFalse(responseMessage.BLOG_DELETE_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BLOG_DELETE_SUCCESS, result)
            });
        });
    },
};