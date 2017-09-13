#!/usr/bin/env node
"use strict";

var fs = require("fs");

const keyValueFilePath = __dirname + "\\_store.json";

let args = process.argv.slice(2);

//determine command
if (args.length > 0) {
  let commandName = args[0];
  let params = args.slice(1);
  switch (commandName) {
    case "add":
      addValueToStore(...params);
      break;
    case "list":
      listValuesInStore();
      break;
    case "get":
      getValueFromStore(...params);
      break;
    case "remove":
      removeValueFromStore(...params);
      break;
    default:
      console.log("unknown command");
  }
} else {
  console.log(
    "No valid command provided.  Refer to README.md for valid commands and usage."
  );
}

//loads the keyvalue object from file and into an object
function loadKeyValueObject(success, error) {
  fs.readFile(keyValueFilePath, function(err, data) {
    let keyValueObj = undefined;
    if (err != undefined && err.code !== "ENOENT") {
      //error other than file/directory doesnt exist
      error(err);
    } else {
      keyValueObj = new Object();
      if (data != undefined) {
        try {
          keyValueObj = JSON.parse(data);
        } catch (e) {
          console.log("storage file has become corrupt - " + keyValueFilePath);
        }
      }
      success(keyValueObj);
    }
  });
}

//saves the keyvalue object to file
function saveKeyValueObject(keyValueObj, success, error) {
  fs.writeFile(keyValueFilePath, JSON.stringify(keyValueObj), function(err) {
    if (err) {
      error(err);
    }
    success();
  });
}

//loads keyvalue object, add the specified keyvalue, then saves the object to file
function addValueToStore(key, value) {
  if (key == undefined || value == undefined) {
    invalidParametersHandler();
  } else {
    loadKeyValueObject(function(keyValueObj) {
      keyValueObj[key] = value;

      saveKeyValueObject(
        keyValueObj,
        function() {
          console.log("changes were saved");
        },
        err => console.log(err)
      );
    }, errorLoadingDataHandler);
  }
}

//loads keyvalue object, removes the specified keyvalue, then saves the object to file
function removeValueFromStore(key) {
  if (key == undefined) {
    invalidParametersHandler();
  } else {
    loadKeyValueObject(function(keyValueObj) {
      delete keyValueObj[key];
      saveKeyValueObject(
        keyValueObj,
        function() {
          console.log("changes were saved");
        },
        err => console.log(err)
      );
    }, errorLoadingDataHandler);
  }
}

//loads keyvalue object, outputs the keyvalues to the console log
function listValuesInStore() {
  loadKeyValueObject(function(keyValueObj) {
    let counter = 0;
    for (var key in keyValueObj) {
      if (keyValueObj.hasOwnProperty(key)) {
        console.log(key + "\t" + keyValueObj[key]);
        counter++;
      }
    }
    console.log("# of keys: " + counter);
  }, errorLoadingDataHandler);
}

//loads keyvalue object, outputs the specified value, based on the key, to the console log
function getValueFromStore(key) {
  if (key == undefined) {
    invalidParametersHandler();
  } else {
    loadKeyValueObject(function(keyValueObj) {
      console.log(keyValueObj[key]);
    }, errorLoadingDataHandler);
  }
}

function errorLoadingDataHandler(err) {
  console.log("error loading data - " + err);
}

function invalidParametersHandler() {
  console.log("invalid parameters");
}
