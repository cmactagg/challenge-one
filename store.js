"use strict";
var fs = require("fs");

const keyValueFilePath = __dirname + "\\_store.json";

module.exports = {
  //loads the keyvalue object from file and into an object
  loadKeyValueObject: function loadKeyValueObject(success, error) {
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
            throw "storage file has become corrupt - " + keyValueFilePath;
          }
        }
        success(keyValueObj);
      }
    });
  },

  //saves the keyvalue object to file
  saveKeyValueObject: function saveKeyValueObject(keyValueObj, success, error) {
    fs.writeFile(keyValueFilePath, JSON.stringify(keyValueObj), function(err) {
      if (err) {
        error(err);
      }
      success();
    });
  },

  //loads keyvalue object, add the specified keyvalue, then saves the object to file
  addValueToStore: function addValueToStore(key, value, success, error) {
    if (key == undefined || value == undefined) {
      throw "invalid parameters";
    } else {
      this.loadKeyValueObject(
        function(keyValueObj) {
          keyValueObj[key] = value;

          this.saveKeyValueObject(
            keyValueObj,
            function() {
              success();
            },
            err => error(err)
            //err => console.log(err)
          );
        }.bind(this),
        //this.errorLoadingDataHandler
        error
      );
    }
  },

  //loads keyvalue object, removes the specified keyvalue, then saves the object to file
  removeValueFromStore: function removeValueFromStore(key, success, error) {
    if (key == undefined) {
      throw "invalid parameters";
    } else {
      this.loadKeyValueObject(
        function(keyValueObj) {
          delete keyValueObj[key];
          this.saveKeyValueObject(
            keyValueObj,
            function() {
              success();
            },
            error
            //err => console.log(err)
          );
        }.bind(this),
        //this.errorLoadingDataHandler
        error
      );
    }
  },

  //loads keyvalue object, outputs the keyvalues
  listValuesInStore: function listValuesInStore(success, error) {
    this.loadKeyValueObject(
      function(keyValueObj) {
        success(keyValueObj);
      }.bind(this),
      //this.errorLoadingDataHandler
      error
    );
  },

  //loads keyvalue object, outputs the specified value, based on the key
  getValueFromStore: function getValueFromStore(key, success, error) {
    if (key == undefined) {
      throw "invalid parameters";
    } else {
      this.loadKeyValueObject(
        function(keyValueObj) {
          success(keyValueObj[key]);
        }.bind(this),
        //this.errorLoadingDataHandler
        error
      );
    }
  }
};
