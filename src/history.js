/** @namespace history*/


const defaultConfig = require('../src/config');
let httpEndPoint = require('./config').httpEndpoint_history;
const {fetchUrl} = require('../src/utils/dbHelper');
let U3Config = {};

module.exports = function(config) {
  U3Config = config;
  httpEndPoint = config.httpEndpoint_history;
  return {
    getAllBlocks,
    getContracts,
    getContractByName,
    getAllAccounts,
    getAllTxs,
    getTxByTxId,
    getActionsByTxid,
    getActionsByAccount,
    getTxsByBlockNum,
    getExistAccount,
    getBlocksByContract,
    getTxTraceByTxid,
    search,
    getCreateAccountByName
  };
};

/**
 * fetch all blocks
 * @param {Number} page page numbers
 * @param {Number} pageSize how many pieces are displayed per page
 * @param {Object} queryParams query parameter for Blocks
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getAllBlocks} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getAllBlocks({
    'page': 1,
    'pageSize': 10,
    'queryParams': {},
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 * {
    "_id" : ObjectId("5bc5e218a6659aa6c218cfa8"),
    "block_id" : "0000000280155952392ddaa5c4fb6611e74e3c93f61852c50f67f47c9c8b90ba",
    "block" : {
        "timestamp" : "2018-10-16T13:05:20.000",
        "proposer" : "genesis",
        "proposerProof" : "c71e700a8e90c767a7f0378cb33ac6e574b2a12815f4200ea2184...",
        "version" : NumberInt(0),
        "previous" : "00000001407532c91f75e45a8da21b4de763126d7819d50dbd660c32bd5946eb",
        "transaction_mroot" : "0000000000000000000000000000000000000000000000000000000000000000",
        "action_mroot" : "35ecb67176b6db41bdf93b6d9157bf8d9b2ee94b00edf1289febacc445f49f85",
        "new_producers" : null,
        "header_extensions" : [

        ],
        "signature" : "",
        "transactions" : [

        ],
        "block_extensions" : [

        ]
    },
    "block_num" : NumberInt(2),
    "createdAt" : ISODate("2018-10-16T13:05:28.930+0000"),
    "irreversible" : true,
    "in_current_chain" : true,
    "updatedAt" : ISODate("2018-10-16T13:05:41.015+0000"),
    "validated" : true
}
 */
function getAllBlocks(page, pageSize, queryParams, sortParams) {
  let data = {
    'page': page || 1,
    'pageSize': pageSize || 10,
    'queryParams': queryParams || {},
    'sortParams': sortParams || { _id: -1 }
  };

  return fetchUrl(`${httpEndPoint}/blocks`, data);
}

/**
 * get all contracts
 * @param {Number} page page numbers
 * @param {Number} pageSize how many pieces are displayed per page
 * @param {Object} queryParams query parameter for Contracts
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * 
 * @example
 * import {getContracts} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getContracts({
    'page': 1,
    'pageSize': 10,
    'queryParams': {},
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f3"), 
    "action_num" : NumberInt(0), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "cfa" : false, 
    "account" : "ultrainio", 
    "name" : "onblock", 
    "authorization" : [
        {
            "actor" : "ultrainio", 
            "permission" : "active"
        }
    ], 
    "hex_data" : "80e34745000000000000000001000000000000..."
}
 */
function getContracts(page, pageSize, queryParams, sortParams) {
  let data = {
    'page': page || 1,
    'pageSize': pageSize || 10,
    'queryParams': queryParams || {},
    'sortParams': sortParams || { _id: -1 }
  };

  return fetchUrl(`${httpEndPoint}/contracts`, data);
}

/**
 * get contract by name
 * @param {String} name contract name eg. onblock
 * @memberOf history
 * 
 * @example
 * import {getContractByName} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getContractByName({
    'name': 'onblock'
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f3"), 
    "action_num" : NumberInt(0), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "cfa" : false, 
    "account" : "ultrainio", 
    "name" : "onblock", 
    "authorization" : [
        {
            "actor" : "ultrainio", 
            "permission" : "active"
        }
    ], 
    "hex_data" : "80e34745000000000000000001000000000000..."
}
 */
function getContractByName(name) {
  return fetchUrl(`${httpEndPoint}/contracts/${name}`);
}

/**
 * get all accounts
 * @param {Number} page page numbers
 * @param {Number} pageSize how many pieces are displayed per page
 * @param {Object} queryParams query parameter for Accounts
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getAllAccounts} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getAllAccounts({
    'page': 1,
    'pageSize': 10,
    'queryParams': {},
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 *{ 
    "_id" : ObjectId("5b7d11cc59bd97fab30ba86b"), 
    "name" : "utrio.code", 
    "createdAt" : ISODate("2018-08-22T07:33:32.092+0000")
}
 */
async function getAllAccounts(page, pageSize, queryParams, sortParams) {
  let data = {
    'page': page || 1,
    'pageSize': pageSize || 10,
    'queryParams': queryParams || {},
    'sortParams': sortParams || { _id: -1 }
  };
  let response = await fetchUrl(`${httpEndPoint}/accounts`, data);
  if (response.error_msg) {
    return response.error_msg;
  }

  let pageInfo = Object.assign({}, response);
  let accounts = pageInfo.results;
  const { createU3 } = require('./index');
  const u3 = createU3(U3Config);

  for (let i in accounts) {
    // find tx count by name
    // let count = await Txs.getTxCountByName(accounts[i].name);
    // accounts[i].tx_count = count;
    let balance = await u3.getCurrencyBalance({
      code: 'utrio.token',
      account: accounts[i].name,
      symbol: defaultConfig.symbol
    });

    // get net_weight cpu_weight ram_bytes
    let accountInfo = await u3.getAccountInfo({
      account_name: accounts[i].name
    });

    accounts[i].balance = balance[0];
    accounts[i].total_resources = accountInfo.total_resources;
  }

  return pageInfo;
}

/**
 * get all transactions
 * @param {Number} page page numbers
 * @param {Number} pageSize how many pieces are displayed per page
 * @param {Object} queryParams query parameter for transactions
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getAllTxs} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getAllTxs({
    'page': 1,
    'pageSize': 10,
    'queryParams': {},
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f4"), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "irreversible" : false, 
    "transaction_header" : {
        "expiration" : "2018-08-22T07:33:13", 
        "ref_block_num" : NumberInt(1), 
        "ref_block_prefix" : NumberLong(2517196066), 
        "max_net_usage_words" : NumberInt(0), 
        "max_cpu_usage_ms" : NumberInt(0), 
        "delay_sec" : NumberInt(0)
    }, 
    "actions" : [
        {
            "action_num" : NumberInt(0), 
            "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
            "cfa" : false, 
            "account" : "ultrainio", 
            "name" : "onblock", 
            "authorization" : [
                {
                    "actor" : "ultrainio", 
                    "permission" : "active"
                }
            ], 
            "hex_data" : "80e34745000000000000000001000000000000000000000000000..."
        }
    ], 
    "transaction_extensions" : {

    }, 
    "signatures" : {

    }, 
    "context_free_data" : {

    }, 
    "createdAt" : ISODate("2018-08-22T07:33:12.469+0000")
}
 */
function getAllTxs(page, pageSize, queryParams, sortParams) {
  let data = {
    'page': page || 1,
    'pageSize': pageSize || 10,
    'queryParams': queryParams || {},
    'sortParams': sortParams || { _id: -1 }
  };

  return fetchUrl(`${httpEndPoint}/txs`, data);
}

/**
 * get transaction by its id
 * @param {String} id transaction's id
 * @memberOf history
 * @example
 * import {getTxByTxId} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getTxByTxId({
    'id': '40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9',
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f4"), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "irreversible" : false, 
    "transaction_header" : {
        "expiration" : "2018-08-22T07:33:13", 
        "ref_block_num" : NumberInt(1), 
        "ref_block_prefix" : NumberLong(2517196066), 
        "max_net_usage_words" : NumberInt(0), 
        "max_cpu_usage_ms" : NumberInt(0), 
        "delay_sec" : NumberInt(0)
    }, 
    "actions" : [
        {
            "action_num" : NumberInt(0), 
            "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
            "cfa" : false, 
            "account" : "ultrainio", 
            "name" : "onblock", 
            "authorization" : [
                {
                    "actor" : "ultrainio", 
                    "permission" : "active"
                }
            ], 
            "hex_data" : "80e34745000000000000000001000000000000000000000000000..."
        }
    ], 
    "transaction_extensions" : {

    }, 
    "signatures" : {

    }, 
    "context_free_data" : {

    }, 
    "createdAt" : ISODate("2018-08-22T07:33:12.469+0000")
}
 */
function getTxByTxId(id) {
  return fetchUrl(`${httpEndPoint}/txs/${id}`);
}

/**
 * get actions by transaction's id
 * @param {String} id  transaction's id
 * @memberOf history
 * @example
 * import {getActionsByTxid} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getActionsByTxid({
 *   'id': "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9"
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f4"), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "irreversible" : false, 
    "transaction_header" : {
        "expiration" : "2018-08-22T07:33:13", 
        "ref_block_num" : NumberInt(1), 
        "ref_block_prefix" : NumberLong(2517196066), 
        "max_net_usage_words" : NumberInt(0), 
        "max_cpu_usage_ms" : NumberInt(0), 
        "delay_sec" : NumberInt(0)
    }, 
    "actions" : [
        {
            "action_num" : NumberInt(0), 
            "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
            "cfa" : false, 
            "account" : "ultrainio", 
            "name" : "onblock", 
            "authorization" : [
                {
                    "actor" : "ultrainio", 
                    "permission" : "active"
                }
            ], 
            "hex_data" : "80e34745000000000000000001000000000000000..."
        }
    ], 
    "transaction_extensions" : {

    }, 
    "signatures" : {

    }, 
    "context_free_data" : {

    }, 
    "createdAt" : ISODate("2018-08-22T07:33:12.469+0000")
}
 */
function getActionsByTxid(id) {
  return fetchUrl(`${httpEndPoint}/actions/tx/${id}`);
}

/**
 * get actions by account name
 * @param {Number} page page numbers
 * @param {Number} pageSize how many pieces are displayed per page
 * @param {Object} queryParams query parameter for Account
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getActionsByAccount} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getActionsByAccount({
     'page': 1,
     'pageSize': 10,
     'queryParams': {account:'ultrainio'},
     'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f3"), 
    "action_num" : NumberInt(0), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "cfa" : false, 
    "account" : "ultrainio", 
    "name" : "onblock", 
    "authorization" : [
        {
            "actor" : "ultrainio", 
            "permission" : "active"
        }
    ], 
    "hex_data" : "80e34745000000000000000001000000000000..."
}
 */
function getActionsByAccount(page, pageSize, queryParams, sortParams) {
  let data = {
    'page': page || 1,
    'pageSize': pageSize || 10,
    'queryParams': queryParams || {},
    'sortParams': sortParams || { _id: -1 }
  };
  return fetchUrl(`${httpEndPoint}/actions/by/account`, data);
}

/**
 * get transactions by block_num
 * @param {Number} page page numbers
 * @param {Number} pageSize how many pieces are displayed per page
 * @param {Object} queryParams query parameter for Blocks
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getTxsByBlockNum} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getTxsByBlockNum({
    'page': 1,
    'pageSize': 10,
    'queryParams': {
      'block_num': 1
    },
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b90fae3a7948ccc241"), 
    "block_id" : "00000002d99f33473ee5553e0993f6b821f68ce12787c7d5e8ba90393eb1f6e6", 
    "block" : {
        "timestamp" : "2018-08-22T07:33:13.000", 
        "producer" : "ultrainio", 
        "confirmed" : NumberInt(0), 
        "previous" : "00000001bcf2f448225d099685f14da76803028926af04d2607eafcf609c265c", 
        "transaction_mroot" : "0000000000000000000000000000000000000000000000000000000000000000", 
        "action_mroot" : "62c9c892ea1f9f7000a22c05d4aa6f2664637838536da3a7d3c16db447addaa8", 
        "schedule_version" : NumberInt(0), 
        "new_producers" : null, 
        "header_extensions" : [

        ], 
        "producer_signature" : "SIG_K1_K2fughyG1DWU21kahiCa7MCrc14Kg37...", 
        "transactions" : [

        ], 
        "block_extensions" : [

        ]
    }, 
    "block_num" : NumberInt(2), 
    "createdAt" : ISODate("2018-08-22T07:33:13.005+0000"), 
    "irreversible" : false
}
 */
function getTxsByBlockNum(page, pageSize, queryParams, sortParams) {
  let data = {
    'page': page || 1,
    'pageSize': pageSize || 10,
    'queryParams': queryParams || {},
    'sortParams': sortParams || { _id: -1 }
  };
  return fetchUrl(`${httpEndPoint}/txs/by/blocknum`, data);
}

/**
 * get account's info  by its name if it is existed
 * @param {string} name account name
 * @returns {account|null}
 * @memberOf history
 * @example
 * import {getExistAccount} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getExistAccount({
     'name': 'onblock'
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f3"), 
    "action_num" : NumberInt(0), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "cfa" : false, 
    "account" : "ultrainio", 
    "name" : "onblock", 
    "authorization" : [
        {
            "actor" : "ultrainio", 
            "permission" : "active"
        }
    ], 
    "hex_data" : "80e34745000000000000000001000000000000..."
}
 */
function getExistAccount(name) {
  return fetchUrl(`${httpEndPoint}/accounts/${name}`);
}

/**
 * get blocks by block_num、account_name、contract_name、contract_method
 * @param { Number } block_num lasted block_num
 * @param { String } account account name
 * @param { String } contract contract name eg. utrio.token
 * @param { String } contract_method contract method eg. transfer
 * @memberOf history
 * @example
 * import {getBlocksByContract} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getBlocksByContract({
    'block_num': 1,
    'account': "ultrainio",
    'contract': "utrio.token",
    'contract_method': "transfer"
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f3"), 
    "action_num" : NumberInt(0), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "cfa" : false, 
    "account" : "ultrainio", 
    "name" : "onblock", 
    "authorization" : [
        {
            "actor" : "ultrainio", 
            "permission" : "active"
        }
    ], 
    "hex_data" : "80e34745000000000000000001000000000000..."
}
 */
function getBlocksByContract(block_num, account, contract, contract_method) {
  const data = {
    block_num,
    account,
    contract,
    contract_method
  };
  return fetchUrl(`${httpEndPoint}/blocks/contract`, data);
}

/**
 * get transaction trace by transaction's id
 * @param { String } id transaction's id
 * @memberOf history
 * 
 * @example
 * import {getTxTraceByTxid} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getTxTraceByTxid({
    'id': '5b7d11b859bd97fab30ba7f4'
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f4"), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "irreversible" : false, 
    "transaction_header" : {
        "expiration" : "2018-08-22T07:33:13", 
        "ref_block_num" : NumberInt(1), 
        "ref_block_prefix" : NumberLong(2517196066), 
        "max_net_usage_words" : NumberInt(0), 
        "max_cpu_usage_ms" : NumberInt(0), 
        "delay_sec" : NumberInt(0)
    }, 
    "actions" : [
        {
            "action_num" : NumberInt(0), 
            "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
            "cfa" : false, 
            "account" : "ultrainio", 
            "name" : "onblock", 
            "authorization" : [
                {
                    "actor" : "ultrainio", 
                    "permission" : "active"
                }
            ], 
            "hex_data" : "80e3474500000000000000000100000000000000000000..."
        }
    ], 
    "transaction_extensions" : {

    }, 
    "signatures" : {

    }, 
    "context_free_data" : {

    }, 
    "createdAt" : ISODate("2018-08-22T07:33:12.469+0000")
}
 */
function getTxTraceByTxid(id) {
  return fetchUrl(`${httpEndPoint}/txtraces/${id}`);
}

/**
 * search block/transaction/account by a query string
 * @param { String } param query string
 * @memberOf history
 * 
 * @example
 * import {search} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.search(5b7d11b859bd97fab30ba7f5)
 */
async function search(param) {
  let rs = await fetchUrl(`${httpEndPoint}/search/${param}`);
  console.log(rs);
  if (rs.type === 'account' && rs.data.name) {
    const { createU3 } = require('./index');
    const u3 = createU3(U3Config);

    let balance = await u3.getCurrencyBalance({
      code: 'utrio.token',
      account: param,
      symbol: defaultConfig.symbol
    });

    // get net_weight cpu_weight ram_bytes
    let accountInfo = await u3.getAccountInfo({
      account_name: param
    });

    rs.data.balance = balance;
    rs.data.total_resources = accountInfo.total_resources;
  }

  return rs;
}

/**
 * get createaccountbyname 
 * @param {String} name account name
 * @memberOf history
 * @example
 * import {getCreateAccountByName} from "u3.js/src";
 * const u3 = createU3(config)
 * u3.getCreateAccountByName({
     'name': 'onblock'
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11b859bd97fab30ba7f3"), 
    "action_num" : NumberInt(0), 
    "trx_id" : "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9", 
    "cfa" : false, 
    "account" : "ultrainio", 
    "name" : "onblock", 
    "authorization" : [
        {
            "actor" : "ultrainio", 
            "permission" : "active"
        }
    ], 
    "hex_data" : "80e34745000000000000000001000000000000..."
}
 */
function getCreateAccountByName(name){
  return fetchUrl(`${httpEndPoint}/getcreateaccount`,{ name });
}