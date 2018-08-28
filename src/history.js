const Accounts = require('./model/account');
const Actions = require('./model/action');
const Blocks = require('./model/block');
const Txs = require('./model/transaction');
const dbHelper = require('./utils/dbHelper');

/**
 * getContractByName
 * @param { String } name name of contract，eg. utrio.system
 * @returns { Object }
 */
exports.getContractByName = function (name) {
    return Accounts.getContractByName(name);
}

/**
 * getContracts
 * @returns {Array}
 */
exports.getContracts = async function () {
    return Accounts.getContracts();
}

/**
 * getAllBlocks
 * @param {Number} page current page
 * @param {Number} pageSize pagesize
 * @param {Object} queryParams query param
 * @param {Object} sortParams sort param
 * @returns {Object}
 */
exports.getAllBlocks = async function (page, pageSize, queryParams, sortParams) {
    const rs = await dbHelper.pageQuery(page, pageSize, Blocks, queryParams, sortParams);
    return rs;
}

/**
 * getAllAccounts
 * @param {Number} page current page
 * @param {Number} pageSize pagesize
 * @param {Object} queryParams query param
 * @param {Object} sortParams sort param
 * @returns {Object}
 */
exports.getAllAccounts = async function (page, pageSize, queryParams, sortParams) {
    const rs = await dbHelper.pageQuery(page, pageSize, Accounts, queryParams, sortParams);
    return rs;
}

/**
 * getAllTxs
 * @param {Number} page current page
 * @param {Number} pageSize pagesize
 * @param {Object} queryParams query param
 * @param {Object} sortParams sort param
 * @returns {Object}
 */
exports.getAllTxs = async function (page, pageSize, queryParams, sortParams) {
    const rs = await dbHelper.pageQuery(page, pageSize, Txs, queryParams, sortParams);
    return rs;
}

/**
 * get actions by getActionsByTxid
 * @param {String} trx_id transaction_id
 * @returns {Object}
 */
exports.getActionsByTxid = function(trx_id){
    return Actions.getActionsByTxid(trx_id);
}

/**
 * getTxsByBlockId
 * @param {*} block_num 
 * @returns {Object}
 */
exports.getTxsByBlockId = function(block_num){
    return Blocks.getTxsByBlockId(block_num);
}