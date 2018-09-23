'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  require('babel-polyfill');
} catch (e) {
  if (e.message.indexOf('only one instance of babel-polyfill is allowed') === -1) {
    console.error(e);
  }
}

var fs = require('fs');
var path = require('path');
var configDefaults = require('./config');
var ecc = require('./ecc');
var Fcbuffer = require('fcbuffer');
var apiGen = require('./utils/apigen');
var api = require('./v1/chain');
var assert = require('assert');
var Structs = require('./structs');
var AbiCache = require('./abi-cache');
var AssetCache = require('./asset-cache');
var writeApiGen = require('./write-api');
var format = require('./format');
var schema = require('./v1/schema');
var pkg = require('../package.json');
var defaultConfig = require("../src/config");

var version = pkg.version;

var defaultSignProvider = function defaultSignProvider(u3, config) {
  return function _callee(_ref) {
    var sign = _ref.sign,
        buf = _ref.buf,
        transaction = _ref.transaction;

    var keyProvider, keys, pvt, keyMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, isPrivate, isPublic, pubkeys;

    return _regenerator2.default.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            keyProvider = config.keyProvider;

            if (keyProvider) {
              _context.next = 3;
              break;
            }

            throw new TypeError('This transaction requires a config.keyProvider for signing');

          case 3:
            keys = keyProvider;

            if (typeof keyProvider === 'function') {
              keys = keyProvider({ transaction: transaction });
            }

            // keyProvider may return keys or Promise<keys>
            _context.next = 7;
            return _regenerator2.default.awrap(Promise.resolve(keys));

          case 7:
            keys = _context.sent;


            if (!Array.isArray(keys)) {
              keys = [keys];
            }

            keys = keys.map(function (key) {
              try {
                // normalize format (WIF => PVT_K1_base58privateKey)
                return { private: ecc.PrivateKey(key).toString() };
              } catch (e) {
                // normalize format (UTRKey => PUB_K1_base58publicKey)
                return { public: ecc.PublicKey(key).toString() };
              }
              assert(false, 'expecting public or private keys from keyProvider');
            });

            if (keys.length) {
              _context.next = 12;
              break;
            }

            throw new Error('missing key, check your keyProvider');

          case 12:
            if (!(keys.length === 1 && keys[0].private)) {
              _context.next = 15;
              break;
            }

            pvt = keys[0].private;
            return _context.abrupt('return', sign(buf, pvt));

          case 15:
            keyMap = new Map();

            // keys are either public or private keys

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 19;
            for (_iterator = keys[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              key = _step.value;
              isPrivate = key.private != null;
              isPublic = key.public != null;


              if (isPrivate) {
                keyMap.set(ecc.privateToPublic(key.private), key.private);
              } else {
                keyMap.set(key.public, null);
              }
            }

            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](19);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            pubkeys = Array.from(keyMap.keys());
            return _context.abrupt('return', u3.getRequiredKeys(transaction, pubkeys).then(function (_ref2) {
              var required_keys = _ref2.required_keys;

              if (!required_keys.length) {
                throw new Error('missing required keys for ' + JSON.stringify(transaction));
              }

              var pvts = [],
                  missingKeys = [];

              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = required_keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var requiredKey = _step2.value;

                  // normalize (UTRKey.. => PUB_K1_Key..)
                  requiredKey = ecc.PublicKey(requiredKey).toString();

                  var wif = keyMap.get(requiredKey);
                  if (wif) {
                    pvts.push(wif);
                  } else {
                    missingKeys.push(requiredKey);
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

              if (missingKeys.length !== 0) {
                assert(typeof keyProvider === 'function', 'keyProvider function is needed for private key lookup');

                // const pubkeys = missingKeys.map(key => ecc.PublicKey(key).toStringLegacy())
                keyProvider({ pubkeys: missingKeys }).forEach(function (pvt) {
                  pvts.push(pvt);
                });
              }

              var sigs = [];
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = pvts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var _pvt = _step3.value;

                  sigs.push(sign(buf, _pvt));
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              return sigs;
            }));

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this, [[19, 23, 27, 35], [28,, 30, 34]]);
  };
};

/**
 * create U3 instance
 * @param config configuration information
 * @returns {Object} instance of U3
 */
var createU3 = function createU3() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  config = Object.assign({}, configDefaults, config);
  var history = require('./history')(config);
  var defaultLogger = {
    log: config.verbose ? console.log : null,
    error: console.error
  };
  config.logger = Object.assign({}, defaultLogger, config.logger);

  var network = config.httpEndpoint != null ? apiGen('v1', api, config) : null;
  config.network = network;

  config.assetCache = AssetCache(network);
  config.abiCache = AbiCache(network, config);

  if (!config.chainId) {
    config.chainId = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';
  }

  _checkChainId(network, config.chainId);

  if (config.mockTransactions != null) {
    if (typeof config.mockTransactions === 'string') {
      var mock = config.mockTransactions;
      config.mockTransactions = function () {
        return mock;
      };
    }
    assert.equal((0, _typeof3.default)(config.mockTransactions), 'function', 'config.mockTransactions');
  }

  var _Structs = Structs(config),
      structs = _Structs.structs,
      types = _Structs.types,
      fromBuffer = _Structs.fromBuffer,
      toBuffer = _Structs.toBuffer;

  var u3 = _mergeWriteFunctions(config, network, structs);

  Object.assign(u3, {
    config: safeConfig(config),
    fc: {
      structs: structs,
      types: types,
      fromBuffer: fromBuffer,
      toBuffer: toBuffer
    },
    deploy: deploy,
    createUser: createUser,
    sign: sign,
    getRamrate: getRamrate
  }, history);

  if (!config.signProvider) {
    config.signProvider = defaultSignProvider(u3, config);
  }

  return u3;
};

/**
 * deploy contract
 * @param contract name of contract，eg. utrio.UGAStem
 * @param account name of owner account，eg. ultrainio
 * @returns {Promise<*>}
 */
function deploy(contract, account) {
  var wasm, abi, code_tr, abi_tr;
  return _regenerator2.default.async(function deploy$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          wasm = fs.readFileSync(path.resolve(process.cwd(), contract + '.wasm'));
          abi = fs.readFileSync(path.resolve(process.cwd(), contract + '.abi'));
          _context2.next = 5;
          return _regenerator2.default.awrap(this.setcode(account, 0, 0, wasm));

        case 5:
          code_tr = _context2.sent;
          _context2.next = 8;
          return _regenerator2.default.awrap(this.setabi(account, JSON.parse(abi)));

        case 8:
          abi_tr = _context2.sent;
          return _context2.abrupt('return', [code_tr, abi_tr]);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2['catch'](0);

          console.log(_context2.t0);
          return _context2.abrupt('return', {
            'error_msg': _context2.t0
          });

        case 16:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this, [[0, 12]]);
}

/**
 * get ram rate
 * 计算出需要nKB的RAM的价格：
 * 如果是1KB，下面的n=1,得到的价格为uGas/KB
 * 如果需要换成uGas/byte，结果在除以1024即可
 * RAM价格 = (n * quote.balance) / (n + base.balance / 1024)
 * @returns {Promise<*>}
 */
function getRamrate() {
  var rs, quote_balance, base_balance, ramrate;
  return _regenerator2.default.async(function getRamrate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(this.getTableRecords({
            code: 'ultrainio',
            scope: 'ultrainio',
            table: 'rammarket',
            json: true
          }));

        case 2:
          rs = _context3.sent;

          if (!rs.rows) {
            _context3.next = 10;
            break;
          }

          quote_balance = rs.rows[0].quote.balance.split(' ')[0];
          base_balance = rs.rows[0].base.balance.split(' ')[0];
          ramrate = 1 * quote_balance / (1 + base_balance / 1024);
          return _context3.abrupt('return', ramrate + ' UGAS/KB');

        case 10:
          return _context3.abrupt('return', rs);

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
}

/**
 * create a new user account by chain, and buy some ram, net, cpu
 * @param params
 * eg format:
 * {
    creator: "ultrainio",
    name: "test123",
    owner: "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    active: "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    updateable: 0,
    ram_bytes: 8912,
    stake_net_quantity: "1.0000 " + defaultConfig.symbol,
    stake_cpu_quantity: "1.0000 " + defaultConfig.symbol,
    transfer: 0
  }
 * @returns {Promise<*>}
 */
function createUser(params) {
  var defaults, data;
  return _regenerator2.default.async(function createUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          defaults = {
            updateable: 0,
            ram_bytes: 8912,
            stake_net_quantity: '1.0000 ' + defaultConfig.symbol,
            stake_cpu_quantity: '1.0000 ' + defaultConfig.symbol,
            transfer: 0
          };
          data = Object.assign({}, defaults, params);
          return _context4.abrupt('return', this.transaction(function (tr) {
            tr.newaccount({
              creator: data.creator,
              name: data.name,
              owner: data.owner,
              active: data.active,
              updateable: data.updateable
            });
            tr.buyrambytes({
              payer: data.creator,
              receiver: data.name,
              bytes: data.ram_bytes
            });
            //optional
            tr.delegatebw({
              from: data.creator,
              receiver: data.name,
              stake_net_quantity: data.stake_net_quantity,
              stake_cpu_quantity: data.stake_cpu_quantity,
              transfer: data.transfer
            });
          }));

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this);
}

/**
 * offline sign
 * @param unsigned_transaction
 * @param privateKeyOrMnemonic
 * @param chainId
 * @returns {Promise<*>}
 */
function sign(unsigned_transaction, privateKeyOrMnemonic) {
  var chainId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';
  var privateKey, isValidPrivateKey, result, txObject, buf, chainIdBuf, signBuf;
  return _regenerator2.default.async(function sign$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          assert(unsigned_transaction, 'unsigned transaction required');
          assert(privateKeyOrMnemonic, 'privateKeyOrMnemonic required');

          privateKey = privateKeyOrMnemonic;
          isValidPrivateKey = ecc.isValidPrivate(privateKeyOrMnemonic);

          if (!isValidPrivateKey) {
            result = ecc.generateKeyPairByMnemonic(privateKeyOrMnemonic);

            privateKey = result.private_key;
          }

          txObject = unsigned_transaction.transaction.transaction;

          delete txObject.context_free_actions;
          delete txObject.transaction_extensions;

          buf = Fcbuffer.toBuffer(this.fc.structs.transaction, txObject);
          chainIdBuf = new Buffer(chainId, 'hex');
          signBuf = Buffer.concat([chainIdBuf, buf, new Buffer(new Uint8Array(32))]);
          return _context5.abrupt('return', ecc.sign(signBuf, privateKey));

        case 12:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, this);
}

/**
 Set each property as read-only, read-write, no-access.  This is shallow
 in that it applies only to the root object and does not limit access
 to properties under a given object.
 */
function safeConfig(config) {
  // access control is shallow references only
  var readOnly = new Set(['httpEndpoint', 'abiCache']);
  var readWrite = new Set(['verbose', 'debug', 'broadcast', 'logger', 'sign']);
  var protectedConfig = {};

  Object.keys(config).forEach(function (key) {
    Object.defineProperty(protectedConfig, key, {
      set: function set(value) {
        if (readWrite.has(key)) {
          config[key] = value;
          return;
        }
        throw new Error('Access denied');
      },

      get: function get() {
        if (readOnly.has(key) || readWrite.has(key)) {
          return config[key];
        }
        throw new Error('Access denied');
      }
    });
  });
  return protectedConfig;
}

/**
 * merge chain function and contract function
 * @param config
 * @param api
 * @param structs
 * @returns {*}
 * @private
 */
function _mergeWriteFunctions(config, api, structs) {
  assert(config, 'network instance required');
  var network = config.network;

  // block api

  var merge = Object.assign({}, network);

  // contract abi
  var writeApi = writeApiGen(api, network, structs, config, schema);

  _throwOnDuplicate(merge, writeApi, 'Conflicting methods in UltrainApi and Transaction Api');
  Object.assign(merge, writeApi);

  return merge;
}

/**
 * throw if duplicate
 * @param o1
 * @param o2
 * @param msg
 * @private
 */
function _throwOnDuplicate(o1, o2, msg) {
  for (var key in o1) {
    if (o2[key]) {
      throw new TypeError(msg + ': ' + key);
    }
  }
}

/**
 * check chainId
 * @param api
 * @param chainId
 * @private
 */
function _checkChainId(api, chainId) {

  api.getChainInfo({}).then(function (info) {
    if (info.chain_id !== chainId) {
      console.warn('WARN: chainId mismatch, signatures will not match transaction authority. ' + ('expected ' + chainId + ' !== actual ' + info.chain_id));
    }
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = {
  createU3: createU3,
  format: format,
  ecc: ecc,
  Fcbuffer: Fcbuffer,
  version: version
};