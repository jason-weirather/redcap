'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var request = require('request');
var querystring = require('querystring');
var fs = require('fs');

module.exports = function (apiData) {
  if (apiData == undefined) {
    throw "No API configuration";
  }
  if (!("token" in apiData) || apiData.token === "") {
    throw "No API token specified";
  }
  if (!("host" in apiData) || apiData.host === "") {
    throw "No host specified";
  }

  var apiData = apiData;
  return function (postData, callback) {
    postData.token = apiData.token;
    postData.format = 'json';

    postData.file = fs.createReadStream(postData.directory + postData.file);

    var options = {
      uri: 'https://' + apiData.host + apiData.path,
      formData: postData
    };

    var dataBuffers = [];

    var postreq = request.post(options).on('error', function (e) {
      callback(e, null);
    }).on('data', function (data) {
      dataBuffers.push(data);
    }).on('end', function () {
      var data = Buffer.concat(dataBuffers);

      try {
        var ret = JSON.parse(data);
        // We want to treat API errors the same as HTTP errors
        if ((typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) === 'object' && 'error' in ret) {
          return callback(ret, null);
        } else {
          return callback(null, ret);
        }
      } catch (err) {
        // Send raw data in the case of JSON parse failure
        return callback(null, data);
      }
    });
  };
};