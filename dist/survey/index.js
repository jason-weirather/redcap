'use strict';

module.exports = function (utilRef) {
  var utils = utilRef;

  return {
    exportLink: require('./exportLink.js')(utils),
    exportParticipants: require('./exportParticipants.js')(utils),
    exportQueueLink: require('./exportQueueLink.js')(utils),
    exportReturnCode: require('./exportReturnCode.js')(utils)
  };
};