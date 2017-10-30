'use strict';

var _require = require('string_decoder'),
    StringDecoder = _require.StringDecoder;

module.exports = function (utilRef) {
  var utils = utilRef;

  return function (callback) {
    var body = {
      content: 'version',
      format: 'json'
    };

    utils.post(body, function (err, res) {
      if (err) return callback(err);

      var decoder = new StringDecoder('utf8');
      return callback(null, decoder.write(res));
    });
  };
};