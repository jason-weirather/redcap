'use strict';

module.exports = function (utilRef) {
  var utils = utilRef;

  return {
    export: require('./exportList.js')(utils)
  };
};