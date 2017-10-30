'use strict';

module.exports = function (utilRef) {
  var utils = utilRef;

  var keySet = {
    optional: ['field']
  };

  return function (params, callback) {
    callback = callback || params;
    var body = {
      format: 'json',
      content: 'exportFieldNames'
    };

    if (typeof params != 'function') {
      var keys = utils.keyCheck(params, keySet);

      if (keys.valid === false) return callback(new Error(keys.errmsg));

      body = Object.assign(body, keys.keys);
    }

    utils.post(body, callback);
  };
};