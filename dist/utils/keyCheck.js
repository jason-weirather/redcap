'use strict';

function checkIsArray(sets, property) {
  if (!Array.isArray(sets[property])) {
    return {
      valid: false,
      errmsg: 'Expected ' + property + ' to be an array'
    };
  } else {
    return {
      valid: true
    };
  }
}

// Key Check utility
// Expects params to contain either a 'required' or 'optional' property, or both
// Each should be an array of property names
module.exports = function (params, keySets) {
  var body = {
    valid: true,
    errmsg: '',
    keys: {}
  };

  var key;

  if (keySets == undefined || keySets.required == undefined && keySets.optional == undefined) {
    body.valid = false;
    body.errmsg = 'No keys defined';
    return body;
  }

  // Ensure every required key exists
  if (keySets.hasOwnProperty('required')) {
    var arrayCheck = checkIsArray(keySets, 'required');
    if (arrayCheck.valid == false) {
      return arrayCheck;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keySets.required[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        key = _step.value;

        if (!params.hasOwnProperty(key)) {
          body.valid = false;
          body.errmsg = 'Required parameter missing: ' + key;
          return body;
        } else {
          body.keys[key] = params[key];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  // Ensure any present optional property exists
  if (keySets.hasOwnProperty('optional')) {
    var arrayCheck = checkIsArray(keySets, 'optional');
    if (arrayCheck.valid == false) {
      return arrayCheck;
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = keySets.optional[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        key = _step2.value;

        if (params.hasOwnProperty(key)) {
          body.keys[key] = params[key];
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return body;
};