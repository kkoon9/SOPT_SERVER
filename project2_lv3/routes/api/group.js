const express = require('express');
const path = require('path');
const router = express.Router();
const csv = require('csvtojson');
const filePath = path.join("C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv3/public/csvs/member.csv");
const filePath2 = path.join("C:/Users/rndrn/Documents/SOPT_SERVER/project2_lv3/public/csvs/group.csv");

router.get('/', async function(req, res, next) {
    const jsonArr = await csv().fromFile(filePath);
    if(!jsonArr) {
        console.log(`file read err: ${err}`);
        res.send(err);
    }
    else {
        res.send(jsonArr);
        console.log("success printing member");   
    }
});

router.get('/:gId', async function(req, res, next) {
    var names = [];
    var gId = req.params.gId;
    console.log(`gId : ${gId}`);
    const json = await csv().fromFile(filePath2);
    names.push(json[gId-1].name);
    const jsonArr = await csv().fromFile(filePath);
    if(!jsonArr) {
        console.log(`file read err: ${err}`);
        res.send(err);
    } else{
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
module.exports = router;
