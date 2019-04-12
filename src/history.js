/** @namespace history*/
const defaultConfig = require("../src/config");
let httpEndpointHistory = require("./config").httpEndpointHistory;
let U3Config = {};
let fetchUrl = () => {
};

function historyGen(config) {
  U3Config = config;
  httpEndpointHistory = config.httpEndpointHistory;
  fetchUrl = require("../src/utils/dbHelper")(config).fetchUrl;

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
    getCreateAccountByName,
    getAllTokens,
    getTokenBySymbol,
    getBaseInfo,
    getBalanceByAccount,
    getHoldersBySymbol,
    getAllBlocksHeader,
    getProposerList
  };
};

/**
 * fetch all blocks
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for Blocks. Mongodb find({}) query condition
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getAllBlocks} from "u3.js";
 * const u3 = createU3(config)
 * u3.getAllBlocks({
    'page': 1,
    'pageSize': 10,
    'queryParams': {"block.producer":"ultrainio"},
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
        "producer_signature" : "SIG_K1_K2fughyG1DWU21kahiCa7MCrc14Kg37dnW4Ck9PSH9b1c1LjbSmp...", 
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
function getAllBlocks(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };

  return fetchUrl("getAllBlocks", `${httpEndpointHistory}/blocks`, data);
}

/**
 * get all contracts
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for Contracts. Mongodb find({}) query condition
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 *
 * @example
 * import {getContracts} from "u3.js";
 * const u3 = createU3(config)
 * u3.getContracts({
    'page': 1,
    'pageSize': 10,
    'queryParams': {},
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 {
    "_id" : ObjectId("5bd2e8347705c6005a6f4d12"),
    "name" : "ultrainio",
    "createdAt" : ISODate("2018-10-26T10:11:00.683+0000"),
    "abi" : {
        "version" : "ultrainio::abi/1.0",
        "types" : [...],
        "structs" : [...],
        "actions" : [...],
        "tables" : [...],
        "ricardian_clauses" : [],
        "error_messages" : [],
        "abi_extensions" : []
    },
    "updatedAt" : ISODate("2018-10-26T10:11:49.162+0000")
}
 */
function getContracts(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };

  return fetchUrl("getContracts", `${httpEndpointHistory}/contracts`, data);
}

/**
 * get contract by name
 * @param {String} name contract name eg. onblock
 * @memberOf history
 *
 * @example
 * import {getContractByName} from "u3.js";
 * const u3 = createU3(config)
 * u3.getContractByName({
    'name': 'utrio.code'
 * })
 *
 * json structure:
 *  {
    "_id" : ObjectId("5bd2e8347705c6005a6f4d12"),
    "name" : "utrio.code",
    "createdAt" : ISODate("2018-10-26T10:11:00.683+0000"),
    "abi" : {
        "version" : "ultrainio::abi/1.0",
        "types" : [...],
        "structs" : [...],
        "actions" : [...],
        "tables" : [...],
        "ricardian_clauses" : [],
        "error_messages" : [],
        "abi_extensions" : []
    },
    "updatedAt" : ISODate("2018-10-26T10:11:49.162+0000")
}
 */
function getContractByName(name) {
  return fetchUrl("getContractByName", `${httpEndpointHistory}/contracts/${name}`);
}

/**
 * get all accounts
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for Accounts. Mongodb find({}) query condition
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getAllAccounts} from "u3.js";
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
    "owner" : "UTR6uHKWW5tvmw6eQpbv92cVmkpDFhQ9q7xsee5Da2X2pVeYUNy4D",
    "active" : "UTR8uHKWW5tvmw6eQpbv92cVmkpDFhQ9q7xsee5Da2X2pVeYUNy4D",
    "createdAt" : ISODate("2018-08-22T07:33:32.092+0000")
}
 */
async function getAllAccounts(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };
  let response = await fetchUrl("getAllAccounts", `${httpEndpointHistory}/accounts`, data);
  if (response.error_msg) {
    return response.error_msg;
  }

  let pageInfo = Object.assign({}, response);
  let accounts = pageInfo.results;
  const { createU3 } = require("../");
  const u3 = createU3(U3Config);

  for (let i in accounts) {
    // find tx count by name
    // let count = await Txs.getTxCountByName(accounts[i].name);
    // accounts[i].tx_count = count;
    let balance = await u3.getCurrencyBalance({
      code: "utrio.token",
      account: accounts[i].name,
      symbol: defaultConfig.symbol
    });

    accounts[i].balance = balance[0];
  }

  return pageInfo;
}

/**
 * get all transactions
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for transactions. Mongodb find({}) query condition
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getAllTxs} from "u3.js";
 * const u3 = createU3(config)
 * let query = { $and: [{ "actions.0.account": "user.11.111" }, { $or: [{ "actions.0.data.id": 1257 }, { "actions.0.data.id": "1257" }] }] };
 * u3.getAllTxs({
    'page': 1,
    'pageSize': 10,
    'queryParams': query,
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
            "hex_data" : "80e34745000000000000000001000000000000000000000000000...",
            "data":{"id":1257}
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
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };

  return fetchUrl("getAllTxs", `${httpEndpointHistory}/txs`, data);
}

/**
 * get transaction by its id
 * @param {String} id transaction's id
 * @memberOf history
 * @example
 * import {getTxByTxId} from "u3.js";
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
  return fetchUrl("getTxByTxId", `${httpEndpointHistory}/txs/${id}`);
}

/**
 * get actions by transaction's id
 * @param {String} id  transaction's id
 * @memberOf history
 * @example
 * import {getActionsByTxid} from "u3.js";
 * const u3 = createU3(config)
 * u3.getActionsByTxid({
 *   'trx_id': "40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9"
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
    "hex_data" : "80e3474500000000000000000100000000000..."
}
 */
function getActionsByTxid(id) {
  return fetchUrl("getActionsByTxid", `${httpEndpointHistory}/actions/tx/${id}`);
}

/**
 * get actions by account name
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for Account
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getActionsByAccount} from "u3.js";
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
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };
  return fetchUrl("getActionsByAccount", `${httpEndpointHistory}/actions/by/account`, data);
}

/**
 * get transactions by block_num
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for Blocks. Mongodb find({}) query condition
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {getTxsByBlockNum} from "u3.js";
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
            "hex_data" : "80e347450000000000000000010000000000000000000000..."
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
function getTxsByBlockNum(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };
  return fetchUrl("getTxsByBlockNum", `${httpEndpointHistory}/txs/by/blocknum`, data);
}

/**
 * get account's info  by its name if it is existed
 * @param {string} name account name
 * @returns {account|null}
 * @memberOf history
 * @example
 * import {getExistAccount} from "u3.js";
 * const u3 = createU3(config)
 * u3.getExistAccount({
     'name': 'utrio.code'
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11cc59bd97fab30ba86b"), 
    "name" : "utrio.code", 
    "createdAt" : ISODate("2018-08-22T07:33:32.092+0000")
}
 */
function getExistAccount(name) {
  return fetchUrl("getExistAccount", `${httpEndpointHistory}/accounts/${name}`);
}

/**
 * get blocks by block_num、account_name、contract_name、contract_method
 * @param { Number } block_num lasted block_num
 * @param { String } account account name
 * @param { String } contract contract name eg. utrio.token
 * @param { String } contract_method contract method eg. transfer
 * @memberOf history
 * @example
 * import {getBlocksByContract} from "u3.js";
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
        "producer_signature" : "SIG_K1_K2fughyG1DWU21kahiCa7MCrc14Kg37dnW4Ck9PSH9b1c1LjbSmp...", 
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
function getBlocksByContract(block_num, account, contract, contract_method) {
  const data = {
    block_num,
    account,
    contract,
    contract_method
  };
  return fetchUrl("getBlocksByContract", `${httpEndpointHistory}/blocks/contract`, data);
}

/**
 * get transaction trace by transaction's id
 * @param { String } id transaction's id
 * @memberOf history
 *
 * @example
 * import {getTxTraceByTxid} from "u3.js";
 * const u3 = createU3(config)
 * u3.getTxTraceByTxid({
    'id': '40ed51618da80804373fd84015548c8343da8c7ade8af00548ada4952d3e38b9'
 * })
 *
 * json structure:
 *
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
            "hex_data" : "80e347450000000000000000010000000000000000000000..."
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
  return fetchUrl("getTxTraceByTxid", `${httpEndpointHistory}/txtraces/${id}`);
}

/**
 * search block/transaction/account by a query string
 * @param { String } param Account/Block Height/Txhash/Contract account
 * @memberOf history
 *
 * @example
 * import {search} from "u3.js";
 * const u3 = createU3(config)
 * u3.search(5b7d11b859bd97fab30ba7f5)
 */
async function search(param) {
  let rs = await fetchUrl("search", `${httpEndpointHistory}/search/${param}`);
  if (rs.type === "account" && rs.data.name) {
    const { createU3 } = require("../");
    const u3 = createU3(U3Config);

    let balance = await u3.getCurrencyBalance({
      code: "utrio.token",
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
 * import {getCreateAccountByName} from "u3.js";
 * const u3 = createU3(config)
 * u3.getCreateAccountByName({
     'name': 'utrio.code'
 * })
 *
 * json structure:
 * { 
    "_id" : ObjectId("5b7d11cc59bd97fab30ba86b"), 
    "name" : "utrio.code", 
    "createdAt" : ISODate("2018-08-22T07:33:32.092+0000")
}
 */
function getCreateAccountByName(name) {
  return fetchUrl("getCreateAccountByName", `${httpEndpointHistory}/getcreateaccount`, { name });
}

/**
 * get all tokens
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for transactions. Mongodb find({}) query condition
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getAllTokens({
    'page': 1,
    'pageSize': 10,
    'queryParams': {},
    'sortParams': { _id: -1 }
 * })
 *
 * json structure:
 * {
      "_id": "5be2ccfe44ed468a4c33150c",
      "account": "user.11.111",
      "symbol": "BJMZ",
      "__v": 0,
      "createdAt": "2018-11-07T11:31:10.065Z",
      "decimals": 4,
      "issue_time": "2018-11-07T11:30:57.654Z",
      "issuer": "user.11.111",
      "max_supply": "10000000.0000",
      "supply": "10000000.0000",
      "updatedAt": "2018-11-08T01:51:10.074Z",
      "id": "5be2ccfe44ed468a4c33150c",
      "holders": 2
   }
 */
function getAllTokens(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };

  return fetchUrl("getAllTokens", `${httpEndpointHistory}/tokens`, data);
}

/**
 * get token by symbol and creator
 * @param { String } symbol symbol of token
 * @param { String } creator creator of symbol
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getTokenBySymbol("ZTPJ","user.11.111")
 *
 * json structure:
 * {
    "_id": "5be2ccc244ed468a4c331487",
    "account": "user.11.111",
    "symbol": "ZTPJ",
    "__v": 0,
    "createdAt": "2018-11-07T11:30:10.057Z",
    "decimals": 4,
    "issue_time": "2018-11-07T11:29:57.777Z",
    "issuer": "user.11.111",
    "max_supply": "10000000.0000",
    "supply": "10000000.0000",
    "updatedAt": "2018-11-08T01:51:10.049Z",
    "id": "5be2ccc244ed468a4c331487"
    }
 */
function getTokenBySymbol(symbol, creator) {
  return fetchUrl("getTokenBySymbol", `${httpEndpointHistory}/token/${symbol}/${creator}`);
}

/**
 * get base info
 * @param { String } symbol symbol of token
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getBaseInfo()
 *
 * json structure:
 * {
    "head_block_num": 1559,
    "tx_num": 37,
    "tps": 0,
    "token_num": 0,
    "account_num": 17,
    "contract_num": 3
    }
 */
function getBaseInfo() {
  return fetchUrl("getBaseInfo", `${httpEndpointHistory}/base`);
}

/**
 * get balance by account
 * @param {String} account
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getBalanceByAccount()
 *
 * json structure:
 * [
 {
        "_id": "5be2ccfe44ed468a4c331510",
        "holder_account": "user.11.111",
        "token_account": "user.11.111",
        "token_symbol": "BJMZ",
        "__v": 0,
        "createdAt": "2018-11-07T11:31:10.070Z",
        "current_balance": "9999998.0000",
        "updatedAt": "2018-11-08T01:51:10.080Z",
        "id": "5be2ccfe44ed468a4c331510"
      }
 * ]
 */
function getBalanceByAccount(account) {
  return fetchUrl("getBalanceByAccount", `${httpEndpointHistory}/balance/${account}`);
}

/**
 * get holders by symbol and creator
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for transactions
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getHoldersBySymbol({
    'page': 1,
    'pageSize': 10,
    'queryParams': {"token_account":"user.11.111","token_symbol":"BJMZ"},
    'sortParams': { current_balance: -1 }
 * })
 *
 * json structure:
 * {
      "_id": "5be2ccfe44ed468a4c331510",
      "holder_account": "user.11.111",
      "token_account": "user.11.111",
      "token_symbol": "BJMZ",
      "__v": 0,
      "createdAt": "2018-11-07T11:31:10.070Z",
      "current_balance": "9999998.0000",
      "updatedAt": "2018-11-08T01:51:10.080Z",
      "id": "5be2ccfe44ed468a4c331510"
    }
 */
function getHoldersBySymbol(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { current_balance: -1 }
  };

  return fetchUrl("getHoldersBySymbol", `${httpEndpointHistory}/holders/by/symbol`, data);
}

/**
 * get holders by symbol and creator
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @param {Object} queryParams query parameter for transactions
 * @param {Object} sortParams sorting parameter
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getHoldersBySymbol({
    'page': 1,
    'pageSize': 10,
    'queryParams': {"token_account":"user.11.111","token_symbol":"BJMZ"},
    'sortParams': { current_balance: -1 }
 * })
 *
 * json structure:
 * {
      "_id": "5be8fb7144ed468a4c348078",
      "block_id": "00002a69fd784315971f971571684d01dffd612efb791dabf12dff8b56dc2eb1",
      "block": {
          "timestamp": "2018-11-12T04:31:20.000",
          "proposer": "genesis",
          "proposerProof": "28bd727f9b9771cda08241fefab6426500e4d99a3083defef26d6860d02230abb2788a8a94aa009c05cee3fa05e82d57953008880de9fb74e31b31970a0c1c03",
          "version": 0,
          "previous": "00002a684784f9c27c0c22b749ec396aee458db7d4bb4aae9b2547ca1bfa6d22",
          "transaction_mroot": "0000000000000000000000000000000000000000000000000000000000000000",
          "action_mroot": "bfc55c5a4cbf78b7bd5cfb3ab67dde8f3c048d1a95ad85e1e869fb8a5f6d5ad5",
          "committee_mroot": "0000000000000000000000000000000000000000000000000000000000000000",
          "header_extensions": [],
          "signature": "",
          "block_extensions": []
      },
      "block_num": 10857,
      "createdAt": "2018-11-12T04:02:58.011Z",
      "irreversible": false,
      "id": "5be8fb7144ed468a4c348078"
    }
 */
function getAllBlocksHeader(page, pageSize, queryParams, sortParams) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10,
    "queryParams": queryParams || {},
    "sortParams": sortParams || { _id: -1 }
  };

  return fetchUrl("getAllBlocksHeader", `${httpEndpointHistory}/blocksheader`, data);
}

/**
 * get proposer list
 * @param {Number} page page numbers
 * @param {Number} pageSize how many records are displayed per page
 * @memberOf history
 * @example
 * import {createU3} from "u3.js";
 * const u3 = createU3(config)
 * u3.getProposerList({
    'page': 1,
    'pageSize': 10
 * })
 *
 * json structure:
 * {
      "_id": "genesis",
      "count": 972
    }
 */
function getProposerList(page, pageSize) {
  let data = {
    "page": page || 1,
    "pageSize": pageSize || 10
  };

  return fetchUrl("getProposerList", `${httpEndpointHistory}/proposers`, data);
}

module.exports = historyGen;
