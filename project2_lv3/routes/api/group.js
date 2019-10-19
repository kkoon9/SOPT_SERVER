var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var csv = require('csvtojson');
var filePath = path.join("C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv1/public/csvs/member.csv");
var filePath2 = path.join("C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv1/public/csvs/group.csv"); // 문제 없음.

/* API page. */
router.get('/', function(req, res, next) {
    csv().fromFile(filePath).then((jsonArr) => {
        if(!jsonArr) {
            console.log(`file read err: ${err}`);
            res.send(err);
        }
        else{
            res.send(jsonArr);
            console.log("success printing member");   
        }
    });
});
router.get('/:gId', function(req, res, next) {
    var names = [];
    var gId = req.params.gId;
    console.log(`gId : ${gId}`);
    csv().fromFile(filePath2).then((json) => {
        names.push(json[gId-1].name);
    });
    csv().fromFile(filePath).then((jsonArr) => {
        if(!jsonArr) {
            console.log(`file read err: ${err}`);
            res.send(err);
        }
        else{
            //names.push(gId+"조");
            for(var GIdx in jsonArr){
                if(gId != jsonArr[GIdx].groupIdx) {
                    console.log(jsonArr[GIdx].name);
                    names.push(jsonArr[GIdx].name);
                }
            }
        }
        res.send(names);
        console.log("success printing member");       
    });
});
module.exports = router;
