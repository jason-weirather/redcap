'use strict';

module.exports = function (utilRef) {
  var utils = utilRef;

  return function (callback) {
    var body = {
      format: 'json',
      content: 'instrument'
    };

    utils.post(body, callback);
  };
};