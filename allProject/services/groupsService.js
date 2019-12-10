const csvManager = require('../module/csvManager');
const groupMixer = require('../module/groupMixer');

const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

const memberFileName = 'member.csv';
const groupFileName = 'group.csv';
const newFileName = 'newMember.csv';

 module.exports = {
    mix: () => {
        return new Promise(async (resolve, reject) => {
            const members = await csvManager.read(memberFileName);
            const memberIdxs = await members.map(it=> it.groupIdx); 
            if(!members || !memberIdxs) {
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_READ_ALL_FAIL)
                });
                return;
            }
            let i = 0;
            /**
             * newMembers와 members는 객체이므로 이어져있다.
             */
            const newMembers = await groupMixer.mix(members);

            /**
             * await를 해주지 않으면 csvManager.write가 
             */
            await memberIdxs.forEach(element => {
                newMembers[i++].groupIdx= element;
            });
            csvManager.write(newFileName,members);
            if(!newMembers){
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_MIX_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS,rm.MEMBER_MIX_SUCCESS, newMembers)
            });

        });
    },
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const member = await csvManager.read(memberFileName);
            if(!member){
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_READ_ALL_FAIL)
                });
                return;
            }
            resolve({
                json: utils.successTrue(sc.SUCCESS,rm.MEMBER_READ_ALL_SUCCESS, member)
            });
        });
    },
    read: (groupIdx) => {
        return new Promise(async (resolve, reject) => {
            const member = await csvManager.read(memberFileName);
            const group = await csvManager.read(groupFileName);
            if(!member){
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_READ_ALL_FAIL)
                });
                return;
            }
            if(!group){
                resolve({
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.GROUP_READ_FAIL)
                });
                return;
            }
            const groupMember = member.filter(it => it.groupIdx === groupIdx).map(it => it.name);
            const groupName = group.filter(it => it.groupIdx === groupIdx).map(it=> it.name);
            const data = `${groupName} : ${groupMember}`
            resolve({  
                json : utils.successTrue(sc.SUCCESS, rm.MEMBER_READ_ALL_SUCCESS, data)
            });
        });
    },
};
