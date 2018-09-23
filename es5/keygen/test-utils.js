'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');

var accountPermissions = [{
  perm_name: 'active',
  parent: 'owner',
  required_auth: {
    threshold: 1,
    keys: [{
      key: 'UTR7vgT3ZsuUxWH1tWyqw6cyKqKhPjUFbonZjyrrXqDauty61SrYe',
      weight: 1
    }],
    accounts: []
  }
}, {
  perm_name: 'mypermission',
  parent: 'active',
  required_auth: {
    threshold: 1,
    keys: [{
      key: 'UTR5MiUJEXxjJw6wUcE6yUjxpATaWetubAGUJ1nYLRSHYPpGCJ8ZU',
      weight: 1
    }],
    accounts: []
  }
}, {
  perm_name: 'owner',
  parent: '',
  required_auth: {
    threshold: 1,
    keys: [{
      key: 'UTR8jJUMo67w6tYBhzjZqyzq5QyL7pH7jVTmv1xoakXmkkgLrfTTx',
      weight: 1
    }],
    accounts: []
  }
}];

function checkKeySet(keys) {
  assert.equal((0, _typeof3.default)(keys.masterPrivateKey), 'string', 'keys.masterPrivateKey');

  assert.equal((0, _typeof3.default)(keys.privateKeys), 'object', 'keys.privateKeys');
  assert.equal((0, _typeof3.default)(keys.privateKeys.owner), 'string', 'keys.privateKeys.owner');
  assert.equal((0, _typeof3.default)(keys.privateKeys.active), 'string', 'keys.privateKeys.active');

  assert.equal((0, _typeof3.default)(keys.publicKeys), 'object', 'keys.publicKeys');
  assert.equal((0, _typeof3.default)(keys.publicKeys.owner), 'string', 'keys.publicKeys.owner');
  assert.equal((0, _typeof3.default)(keys.publicKeys.active), 'string', 'keys.publicKeys.active');
}

module.exports = {
  accountPermissions: accountPermissions,
  checkKeySet: checkKeySet
};