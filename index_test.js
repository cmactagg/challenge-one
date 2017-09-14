"use strict";

var store = require("./store.js");

function didPass(didTestPass, testDesc){
    if (didTestPass)
        console.log(testDesc + " test passed");
    else
    console.log(testDesc + " test failed");
}


var keyValObj = new Object();
keyValObj.dog = 2;
keyValObj.cat = 4;

store.saveKeyValueObject(keyValObj, function(){}, function(err){});
store.loadKeyValueObject(function(successObj){
    didPass(Object.keys(successObj).length == 2, "length");
}, function(err){});

store.getValueFromStore("dog")


