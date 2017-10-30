'use strict';

var _require = require('string_decoder'),
    StringDecoder = _require.StringDecoder;

module.exports = function (utilRef) {
  var utils = utilRef;

  var keySet = {
    required: ['record', 'instrument', 'event'],
    optional: ['repeat_instance']
  };

  return function (params, callback) {
    var keys = utils.keyCheck(params, keySet);

    if (keys.valid === false) return callback(new Error(keys.errmsg));

    var body = Object.assign({
      content: 'surveyLink',
      repeat_instance: 1
    }, keys.keys);

    utils.post(body, function (err, res) {
      if (err) return callback(err);

      var decoder = new StringDecoder('utf8');
      callback(null, decoder.write(res));
    });
  };
};