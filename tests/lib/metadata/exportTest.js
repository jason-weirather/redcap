'use strict';

const expect = require ('chai').expect;
const config = {
  host: 'redcap.uits.iu.edu',
  path: '/api/',
  token: process.env.REDCAP_API_KEY
};
const utils = require ('../../../lib/utils') (config);

const exportModule = require ('../../../lib/metadata/export.js');

describe ('metadata#export', function () {
  it ('should be a function', function () {
    expect (exportModule).to.be.a ('function');
  });

  var exportMetadata = exportModule (utils);

  it ('should return a function', function () {
    expect (exportMetadata).to.be.a ('function');
  });

  it ('should return metadata', function (done) {
    exportMetadata ({}, function (error, res) {
      expect (error).to.be.null;
      expect (res).to.not.be.null;
      expect (res).to.be.an ('array');
      done ();
    });
  });
});