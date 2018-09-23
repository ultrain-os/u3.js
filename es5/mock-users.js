'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../src'),
    createU3 = _require.createU3,
    ecc = _require.ecc;

var Storage = require('node-localstorage');
var isEmpty = require('lodash.isempty');
var defaultConfig = require("../src/config");

var wif = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'; //ultrainio

//console.log(__dirname)
//console.log(__filename)
if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = Storage.LocalStorage;
  localStorage = new LocalStorage(__dirname + '/scratch');
}

var mockUsers = function _callee3(callback) {
  var mockedUsers, users, defaults, u3, checked, _loop, i;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mockedUsers = {};
          users = ['ben', 'john', 'tony', 'jack', 'bob', 'tom', 'jerry', 'alice'];
          defaults = {
            creator: 'ultrainio',
            updateable: 1,
            ram_bytes: 500000,
            stake_net_quantity: '100.0000 ' + defaultConfig.symbol,
            stake_cpu_quantity: '100.0000 ' + defaultConfig.symbol,
            transfer: 0
          };
          u3 = createU3({ keyProvider: wif });
          checked = 0;

          _loop = function _callee2(i) {
            var existUser, keys, param;
            return _regenerator2.default.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _regenerator2.default.awrap(u3.getExistAccount(users[i]));

                  case 2:
                    existUser = _context2.sent;

                    checked++;

                    if (isEmpty(existUser)) {
                      _context2.next = 8;
                      break;
                    }

                    mockedUsers[users[i]] = JSON.parse(localStorage.getItem(users[i]));
                    _context2.next = 14;
                    break;

                  case 8:
                    keys = ecc.generateKeyPairWithMnemonic();

                    mockedUsers[users[i]] = {
                      public_key: keys.public_key,
                      private_key: keys.private_key,
                      mnemonic: keys.mnemonic
                    };
                    localStorage.setItem(users[i], JSON.stringify(mockedUsers[users[i]]));
                    param = Object.assign({}, defaults, { name: users[i], owner: keys.public_key, active: keys.public_key });
                    _context2.next = 14;
                    return _regenerator2.default.awrap(u3.createUser(param).then(function _callee(tr) {
                      return _regenerator2.default.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return _regenerator2.default.awrap(u3.transfer('ultrainio', users[i], '1000.0000 ' + defaultConfig.symbol, 'mock user'));

                            case 2:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, null, undefined);
                    }));

                  case 14:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, null, undefined);
          };

          _context3.t0 = _regenerator2.default.keys(users);

        case 7:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 13;
            break;
          }

          i = _context3.t1.value;
          _context3.next = 11;
          return _regenerator2.default.awrap(_loop(i));

        case 11:
          _context3.next = 7;
          break;

        case 13:

          if (checked === users.length) {
            callback && callback(mockedUsers);
          }
          return _context3.abrupt('return', mockedUsers);

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};
module.exports = mockUsers;