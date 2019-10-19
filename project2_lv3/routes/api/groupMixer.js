const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const csv = require('csvtojson');
const json2csv = require('json2csv');
const filePath = path.join("C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv3/public/csvs/member.csv");
const newfilePath = 'C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv3/public/csvs/';
const fileName = 'newMember.csv';

router.get('/', async function(req, res, next) {
    var Newarr = [];
    const jsonArr = await csv().fromFile(filePath)
    if(!jsonArr) {
        console.log(`file read err: ${err}`);
        res.send(err);
    }
    else {
        let bufferArray = [];
        const jsonSize = Object.keys(jsonArr).length;
        console.log(`jsonSize : ${jsonSize}`);
        for(let i =0; i< jsonSize; i++){
            let result = Math.floor(Math.random() * jsonSize);
            for(let j=0;j<i;j++){
                if(result == Newarr[j]){
                    result = Math.floor(Math.random() * jsonSize);
                    j = -1;
                }
            }
            Newarr.push(result);
        }
        for(let member in jsonArr){
            let buffer = new Object();
            let newIdx = Newarr[member];
            buffer.name = jsonArr[newIdx].name;
            buffer.groupIdx = jsonArr[member].groupIdx;
            bufferArray.push(buffer);
        }
        const resultCsv = json2csv.parse(bufferArray);
        console.log(resultCsv);
        fs.writeFile(path.join(newfilePath, fileName), resultCsv, (err) => {
            if(err){
                console.log(err);
                res.send(err);
            } else {
                res.send("success");
            }
        });
    }
});
module.exports = router;
