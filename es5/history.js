'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');
var httpEndPoint = require('./config').httpEndpoint_history;
var U3Config = {};

module.exports = function (config) {
    U3Config = config;
    httpEndPoint = config.httpEndpoint_history;
    console.log(httpEndPoint);
    return {
        getAllBlocks: getAllBlocks,
        getContracts: getContracts,
        getContractByName: getContractByName,
        getAllAccounts: getAllAccounts,
        getAllTxs: getAllTxs,
        getTxByTxId: getTxByTxId,
        getActionsByTxid: getActionsByTxid,
        getActionsByAccount: getActionsByAccount,
        getTxsByBlockId: getTxsByBlockId,
        getExistAccount: getExistAccount,
        getBlocksByContract: getBlocksByContract,
        getTxTraceByTxid: getTxTraceByTxid,
        search: search
    };
};
/**
 * get all blocks
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams 
 */
function getAllBlocks(page, pageSize, queryParams, sortParams) {
    var data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    };

    return fetchUrl(httpEndPoint + '/blocks', data);
}

/**
 * get all contracts
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams
 */
function getContracts(page, pageSize, queryParams, sortParams) {
    var data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    };

    return fetchUrl(httpEndPoint + '/contracts', data);
}

/**
 * get contract by name
 * @param {String} name 
 */
function getContractByName(name) {
    return fetchUrl(httpEndPoint + '/contracts/' + name);
}

/**
 * get all accounts
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams
 */
function getAllAccounts(page, pageSize, queryParams, sortParams) {
    var data, response, pageInfo, accounts, _require, createU3, u3, i, balance, accountInfo;

    return _regenerator2.default.async(function getAllAccounts$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    data = {
                        "page": page || 1,
                        "pageSize": pageSize || 10,
                        "queryParams": queryParams || {},
                        "sortParams": sortParams || { _id: -1 }
                    };
                    _context.next = 3;
                    return _regenerator2.default.awrap(fetchUrl(httpEndPoint + '/accounts', data));

                case 3:
                    response = _context.sent;

                    if (!response.error_msg) {
                        _context.next = 6;
                        break;
                    }

                    return _context.abrupt('return', response.error_msg);

                case 6:
                    pageInfo = Object.assign({}, response);
                    accounts = pageInfo.results;
                    _require = require('./index'), createU3 = _require.createU3;
                    u3 = createU3(U3Config);
                    _context.t0 = _regenerator2.default.keys(accounts);

                case 11:
                    if ((_context.t1 = _context.t0()).done) {
                        _context.next = 23;
                        break;
                    }

                    i = _context.t1.value;
                    _context.next = 15;
                    return _regenerator2.default.awrap(u3.getCurrencyBalance({
                        code: "utrio.token",
                        account: accounts[i].name,
                        symbol: defaultConfig.symbol
                    }));

                case 15:
                    balance = _context.sent;
                    _context.next = 18;
                    return _regenerator2.default.awrap(u3.getAccountInfo({
                        account_name: accounts[i].name
                    }));

                case 18:
                    accountInfo = _context.sent;


                    accounts[i].balance = balance[0];
                    accounts[i].total_resources = accountInfo.total_resources;
                    _context.next = 11;
                    break;

                case 23:
                    return _context.abrupt('return', pageInfo);

                case 24:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, this);
}

/**
 * get all txs
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams
 */
function getAllTxs(page, pageSize, queryParams, sortParams) {
    var data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    };

    return fetchUrl(httpEndPoint + '/txs', data);
}

/**
 * get tx by id
 * @param {String} id tx_id
 */
function getTxByTxId(id) {
    return fetchUrl(httpEndPoint + '/txs/' + id);
}

/**
 * get actions by tx_id
 * @param {String} id  tx_id
 */
function getActionsByTxid(id) {
    return fetchUrl(httpEndPoint + '/actions/tx/' + id);
}

/**
 * get actions by account
 * @param {String} account accoun name
 */
function getActionsByAccount(account) {
    return fetchUrl(httpEndPoint + '/actions/account/' + account);
}

/**
 * get txs by block_id
 * @param {String} block_id 
 */
function getTxsByBlockId(block_id) {
    return fetchUrl(httpEndPoint + '/txs/block/' + block_id);
}

/**
 * getExistAccount
 * @returns {account|null}
 */
function getExistAccount(name) {
    return fetchUrl(httpEndPoint + '/accounts/' + name);
}

/**
 * get blocks by block_num、account_name、contract_name、contract_method
 * @param { Number } block_num lasted block_num
 * @param { String } account account name 
 * @param { String } contract contract name eg. utrio.token
 * @param { String } contract_method contract method eg. transfer
 */
function getBlocksByContract(block_num, account, contract, contract_method) {
    var data = {
        block_num: block_num,
        account: account,
        contract: contract,
        contract_method: contract_method
    };
    return fetchUrl(httpEndPoint + '/blocks/contract', data);
}

/**
 * get txtrace by tx_id
 * @param { String } id 
 */
function getTxTraceByTxid(id) {
    return fetchUrl(httpEndPoint + '/txtraces/' + id);
}

/**
 * search block/trx/account by param
 * @param { String } param 
 */
function search(param) {
    var rs, _require2, createU3, u3, balance, accountInfo;

    return _regenerator2.default.async(function search$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return _regenerator2.default.awrap(fetchUrl(httpEndPoint + '/search/' + param));

                case 2:
                    rs = _context2.sent;

                    console.log(rs);

                    if (!(rs.type == 'account' && rs.data.name)) {
                        _context2.next = 15;
                        break;
                    }

                    _require2 = require('./index'), createU3 = _require2.createU3;
                    u3 = createU3(U3Config);
                    _context2.next = 9;
                    return _regenerator2.default.awrap(u3.getCurrencyBalance({
                        code: "utrio.token",
                        account: param,
                        symbol: defaultConfig.symbol
                    }));

                case 9:
                    balance = _context2.sent;
                    _context2.next = 12;
                    return _regenerator2.default.awrap(u3.getAccountInfo({
                        account_name: param
                    }));

                case 12:
                    accountInfo = _context2.sent;


                    rs.data.balance = balance;
                    rs.data.total_resources = accountInfo.total_resources;

                case 15:
                    return _context2.abrupt('return', rs);

                case 16:
                case 'end':
                    return _context2.stop();
            }
        }
    }, null, this);
}

function fetchUrl(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return axios.post(url, data).then(function (response) {
        return response.data;
    }).catch(function (error) {
        var err = {
            error_msg: ""
        };
        if (error.response) {
            err.error_msg = error.response.statusText;
        } else {
            err.error_msg = error.message;
        }
        return err;
    });
}