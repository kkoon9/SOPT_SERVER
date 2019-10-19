const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const csv = require('csvtojson');
const json2csv = require('json2csv');
const filePath = path.join("C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv3/public/csvs/member.csv");
const newfilePath = 'C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv3/public/csvs/';
const fileName = 'newMember.csv';

/* API page. */
router.get('/', function(req, res, next) {
    var Newarr = [];
    csv().fromFile(filePath).then((jsonArr) => {
        if(!jsonArr) {
            console.log(`file read err: ${err}`);
            res.send(err);
        }
        else{
            const buffer = jsonArr;
            const jsonSize = Object.keys(jsonArr).length;
            console.log(`jsonSize : ${jsonSize}`);
            for(let i =0; i< jsonSize; i++){
                var result = Math.floor(Math.random() * jsonSize);
                for(let j=0;j<i;j++){
                    if(result == Newarr[j]){
                        result = Math.floor(Math.random() * jsonSize);
                        j = -1;
                    }
                }
                Newarr.push(result);
            }
            console.log(Newarr);
            for(var member in jsonArr){
                var newIdx = Newarr[member];
                buffer[member].name = jsonArr[newIdx].name;
            }
            //res.send(buffer);
            const resultCsv = json2csv.parse(buffer);
            console.log(resultCsv);
            fs.writeFile(path.join(newfilePath, fileName), resultCsv, (err) => {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                res.send("success");
            });
        }
    });
});
module.exports = router;
