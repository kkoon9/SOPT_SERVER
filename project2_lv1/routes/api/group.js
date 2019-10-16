var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var csv = require('csvtojson');
var filePath = path.join("C:/Users/rndrn/Documents/sopt-server/project2_lv1/public/csvs/member.csv");

/* API page. */
router.get('/', function(req, res, next) {
    csv().fromFile(filePath).then((jsonArr) => {
        if(!jsonArr) {
            console.log(`file read err: ${err}`);
            res.send(err);
        }
        else{
            var names = ["1조"];
            var group = 1;
            for(var groupIdx in jsonArr){
                if(group == jsonArr[groupIdx].groupIdx){
                    names.push(jsonArr[groupIdx].name);
                }
                else{
                    names.push(jsonArr[groupIdx].name);
                    group += 1;
                    names.push(`${group}조`);
                }
            }
        }
        res.send(names);
        console.log("success printing member");
    }, (err) =>{
        console.log(`err with readCSV:${err}`);
    })
});

module.exports = router;
