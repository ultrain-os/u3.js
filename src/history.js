
const Accounts = require('./model/account');
const Actions = require('./model/action');
const Blocks = require('./model/block');
const Txs = require('./model/transaction');
const dbHelper = require('./utils/dbHelper');
const MongoConnect = require('./model');

/**
 * connect to mongodb
 * @param {*} param 
 */
exports.connectMongo = function(param){
    MongoConnect.init(param);
}

/**
 * getContractByName
 * @param { String } name name of contract，eg. utrio.system
 * @returns { Object }
 */
exports.getContractByName = function (name) {
    const rs = Accounts.getContractByName(name);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * getContracts
 * @returns {Array}
 */
exports.getContracts = async function () {
    const rs = Accounts.getContracts();
    return JSON.parse(JSON.stringify(rs));
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
    return JSON.parse(JSON.stringify(rs));
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
    let pageInfo = JSON.parse(JSON.stringify(rs));
    let accounts = pageInfo.results;
    const { createU3 } = require('./index');
    const u3 = createU3();
    for(let i in accounts){
        // find tx count by name
        let count = await Txs.getTxCountByName(accounts[i].name);
        accounts[i].tx_count = count;

        let balance = await u3.getCurrencyBalance({
            code: "utrio.token",
            account: accounts[i].name,
            symbol: "SYS"
        })
        accounts[i].balance = balance[0];
    }

    return pageInfo;
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
    return JSON.parse(JSON.stringify(rs));
}

/**
 * get tx by trx_id
 * @param {String} trx_id id of tx
 * @returns {Object}
 */
exports.getTxByTxId = async function(trx_id){
    const rs = await Txs.getTxByTxId(trx_id);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * get actions by trx_id
 * @param {String} trx_id transaction_id
 * @returns {Object}
 */
exports.getActionsByTxid = function(trx_id){
    const rs= Actions.getActionsByTxid(trx_id);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * getTxsByBlockId
 * @param {*} block_num 
 * @returns {Object}
 */
exports.getTxsByBlockId = function(block_num){
    const rs = Blocks.getTxsByBlockId(block_num);
    return JSON.parse(JSON.stringify(rs));
}