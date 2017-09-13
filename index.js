#!/usr/bin/env node
'use strict';

var fs = require('fs');

const storeFile = __dirname;

let args = process.argv.slice(2);

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
} else{
    //todo:  spit out some help.
    console.log("No commands provided.");
}

function loadValuesObject(success, error){
    fs.readFile(storeFile + "\_store.json", function (err, data) {  
        let storeObj = new Object(); 
        if (err) {            
            error(err);
        }
        
        if(data != undefined){     
            storeObj = JSON.parse(data); 
            success(storeObj);
        }
    });
}

function addValueToStore(key, value){
    loadValuesObject(function(storeObj){
        storeObj[key] = value;
        fs.writeFile(storeFile + "\_store.json", JSON.stringify(storeObj), function(err) {
            if(err) {
                return console.log(err);
            }
    
            console.log("The file was saved!");
            process.exit();
        }); 
    }, 
    
    
    (err)=>{console.log("error loading data")}
);
    
}

function listValuesInStore(){
    loadValuesObject(function(storeObj){
        for(var key in storeObj){
            if(storeObj.hasOwnProperty(key)){
                console.log(key + '\t' + storeObj[key]);
            }
        }
        process.exit();
        
    },   
    
    (err)=>{console.log("error loading data")}
);
}

function getValueFromStore(key){
    loadValuesObject(function(storeObj){
        console.log(storeObj[key]);
        process.exit();
        
    },   
    
    (err)=>{console.log("error loading data")}
);
}

function removeValueFromStore(key){
    loadValuesObject(function(storeObj){
        delete storeObj[key];
        fs.writeFile(storeFile + "\_store.json", JSON.stringify(storeObj), function(err) {
            if(err) {
                return console.log(err);
            }
    
            console.log("The file was saved!");
            process.exit();
        }); 
    }, 
    
    
    (err)=>{console.log("error loading data")}
);
}
