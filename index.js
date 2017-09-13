#!/usr/bin/env node
'use strict';

var fs = require('fs');

const keyValueFilePath = __dirname + "\\_store.json";

let args = process.argv.slice(2);

//determine command
if(args.length > 0){
    let commandName = args[0];
    let params = args.slice(1);
    switch(commandName){
        case 'add':
            addValueToStore(...params);
            break;
        case 'list':
            listValuesInStore();
            break;
        case 'get':
            getValueFromStore(...params);
            break;
        case 'remove':
            removeValueFromStore(...params);
            break;
    }
} else {
    //todo:  spit out some help.
    console.log("No commands provided.");
}

//loads the keyvalue object from file and into an object
function loadKeyValueObject(success, error){
    fs.readFile(keyValueFilePath, function (err, data) {  
        let keyValueObj = undefined;
        if (err != undefined && err.code !== "ENOENT") {  
            //error other than file/directory doesnt exist
            error(err);
        } else {
            keyValueObj = new Object();
            if(data != undefined){   
                //todo:  check correupt file  
                keyValueObj = JSON.parse(data);                
            }
            success(keyValueObj);
        }        
    });
}

function saveKeyValueObject(keyValueObj, success, error){
    fs.writeFile(keyValueFilePath, JSON.stringify(keyValueObj), function(err){
        if(err) {
            error(err);
        }
        success();
    });
}

function addValueToStore(key, value){
    loadKeyValueObject(function(keyValueObj){
            keyValueObj[key] = value;

            saveKeyValueObject(keyValueObj, function(){
                //todo:  better message
                console.log("The file was saved!");
                process.exit();
            },
            (err)=> console.log(err)
        );

    }, 
        //todo:  better error message
        (err)=>{console.log("error loading data")}
    );
    
}

function removeValueFromStore(key){
    loadKeyValueObject(function(keyValueObj){
        delete keyValueObj[key];
        saveKeyValueObject(keyValueObj, function(){
            //todo:  better message
            console.log("The file was saved!");
            process.exit();
        },
        (err)=> console.log(err)
    );

    }, 
        //todo:  better error message
    (err)=>{console.log("error loading data")}
);
}




function listValuesInStore(){
    loadKeyValueObject(function(keyValueObj){
        for(var key in keyValueObj){
            if(keyValueObj.hasOwnProperty(key)){
                console.log(key + '\t' + keyValueObj[key]);
            }
        }
        process.exit();
        
    },   
    //todo:  better error message
    (err)=>{console.log("error loading data")}
);
}

function getValueFromStore(key){
    loadKeyValueObject(function(keyValueObj){
        console.log(keyValueObj[key]);
        process.exit();
        
    },   
    //todo:  better error message
    (err)=>{console.log("error loading data")}
);
}

