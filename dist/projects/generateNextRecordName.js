'use strict';

module.exports = function (utilRef) {
  var utils = utilRef;

  return function (callback) {

    var body = {
      format: 'json',
      content: 'generateNextRecordName'
    };

    utils.post(body, callback);
  };
};