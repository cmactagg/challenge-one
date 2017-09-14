#!/usr/bin/env node
"use strict";

var fs = require("fs");
var store = require("./store.js");

let args = process.argv.slice(2);

//determine command
if (args.length > 0) {
  let commandName = args[0];
  let params = args.slice(1);
  switch (commandName) {
    case "add":
      store.addValueToStore(
        ...params,
        () => console.log("changes were saved"),//success
        err => console.log("error loading data " + err)//error
      );
      break;
    case "list":
      store.listValuesInStore(
        keyValueObj => { 
          let counter = 0;
          for (var key in keyValueObj) {
            if (keyValueObj.hasOwnProperty(key)) {
              console.log(key + "\t" + keyValueObj[key]);
              counter++;
            }
          }
          console.log("# of keys: " + counter);
        },//success
        err => console.log("error loading data " + err)//error
      );
      break;
    case "get":
      store.getValueFromStore(
        ...params,
        value => console.log(value),//success
        err => console.log("error loading data " + err)//error
      );
      break;
    case "remove":
      store.removeValueFromStore(
        ...params,
        () => console.log("changes were saved"),//success
        err => console.log("error loading data " + err)//error
      );
      break;
    default:
      console.log("unknown command");
  }
} else {
  console.log(
    "No valid command provided.  Refer to README.md for valid commands and usage."
  );
}

function errorLoadingDataHandler(err) {
  console.log("error loading data - " + err);
}
