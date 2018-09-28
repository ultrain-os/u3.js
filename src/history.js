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
    search
  };
};

/**
 * get all blocks
 * @param { Number } page
 * @param { Number } pageSize
 * @param { Object } queryParams
 * @param { Object } sortParams
 * @memberOf history
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
 * @param { Number } page
 * @param { Number } pageSize
 * @param { Object } queryParams
 * @param { Object } sortParams
 * @memberOf history
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
 * @param {String} name
 * @memberOf history
 */
function getContractByName(name) {
  return fetchUrl(`${httpEndPoint}/contracts/${name}`);
}

/**
 * get all accounts
 * @param { Number } page
 * @param { Number } pageSize
 * @param { Object } queryParams
 * @param { Object } sortParams
 * @memberOf history
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
 * @param { Number } page
 * @param { Number } pageSize
 * @param { Object } queryParams
 * @param { Object } sortParams
 * @memberOf history
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
 */
function getTxByTxId(id) {
  return fetchUrl(`${httpEndPoint}/txs/${id}`);
}

/**
 * get actions by transaction's id
 * @param {String} id  transaction's id
 * @memberOf history
 */
function getActionsByTxid(id) {
  return fetchUrl(`${httpEndPoint}/actions/tx/${id}`);
}

/**
 * get actions by account name
 * @param {*} page
 * @param {*} pageSize
 * @param {*} queryParams e.g. {"account_name":"test1"}
 * @param {*} sortParams
 * @memberOf history
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
 * @param {*} page
 * @param {*} pageSize
 * @param {*} queryParams e.g. {block_num: 1}
 * @param {*} sortParams
 * @memberOf history
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
 * @param name account name
 * @returns {account|null}
 * @memberOf history
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
 * @param { String } id
 * @memberOf history
 */
function getTxTraceByTxid(id) {
  return fetchUrl(`${httpEndPoint}/txtraces/${id}`);
}

/**
 * search block/transaction/account by a query string
 * @param { String } param query string
 * @memberOf history
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
 * @param {String} name 
 * @memberOf history
 */
exports.getCreateAccountByName = function async (name){
  return fetchUrl(`${httpEndPoint}/getcreateaccount`,{ name });
}