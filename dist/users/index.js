
'use strict';

module.exports = function (utilRef) {
  var utils = utilRef;

  return {
    export: require('./export.js')(utils),
    import: require('./import.js')(utils)
  };
};