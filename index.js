#!/usr/bin/env node
'use strict';

var fs = require('fs');

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

function addValueToStore(key, value){
    console.log('adding' + key + value);

    console.log(__dirname);
}

function listValuesInStore(){
    console.log('listing');
}

function getValueFromStore(){
    console.log('getting');
}

function removeValueFromStore(){
    console.log('removing');
}


// fs.writeFile("/tmp/test", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
