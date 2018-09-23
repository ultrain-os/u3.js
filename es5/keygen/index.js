'use strict';

var Keygen = require('./keygen');

var ecc = require('../ecc');

module.exports = {
  Keygen: Keygen,
  modules: {
    ecc: ecc
  }
};