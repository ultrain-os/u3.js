
const Accounts = require('../model/account');
const Actions = require('../model/action');
const Blocks = require('../model/block');
const Txs = require('../model/transaction');
const TxTraces = require('../model/transaction_traces');
const dbHelper = require('../../utils/dbHelper');

/**
 * getContractByName
 * @param { String } name name of contract，eg. utrio.system
 * @returns { Object }
 */
exports.getContractByName = async function (name) {
    const rs = await Accounts.getContractByName(name);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * getContracts
 * @returns {Array}
 */
exports.getContracts = async function (page, pageSize, queryParams, sortParams) {
    queryParams = Object.assign(queryParams, { "abi": { $exists: true } });
    const rs = await dbHelper.pageQuery(page, pageSize, Accounts, queryParams, sortParams);
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
    let rs = await dbHelper.pageQuery(page, pageSize, 
        Blocks, 
        queryParams, 
        sortParams,
        {
            "block_id" : 1,
            "block_num": 1,
            "createdAt": 1,
            "irreversible": 1,
            "block.producer": 1,
            "block.proposer": 1
    });

    let pageInfo = JSON.parse(JSON.stringify(rs));
    let blocks = pageInfo.results;

    for(let i in blocks){
        // get tx_num by block_num
        let trx_num = await Blocks.getTrxNumByBlockNum(blocks[i].block_num);
        blocks[i].trx_num = trx_num;
    }

    return pageInfo;
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
    return JSON.parse(JSON.stringify(rs));
}

/**
 * getAllAccountsForClow
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} queryParams 
 * @param {*} sortParams 
 */
exports.getAllAccountsForClow = async function(page, pageSize, queryParams, sortParams){
    const excludeUser = ['ultrainio','utrio.code','ultrio.bpay','utrio.msig','utrio.names','utrio.ram','utrio.ramfee','utrio.saving','utrio.stake','utrio.token','utrio.vpay','exchange'];
    
    if(queryParams.name){
        queryParams = { name: queryParams.name };
    }else{
        queryParams = { name: {$nin: excludeUser }};
    }
    
    const rs = await dbHelper.pageQuery(page, pageSize, Accounts, queryParams, sortParams);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * get account by name
 * @param { String } name 
 */
exports.getAccountByName = async function (name){
    const rs = await Accounts.getAccountByName(name);
    return JSON.parse(JSON.stringify(rs));
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
    let pageInfo = JSON.parse(JSON.stringify(rs));
    let txs = pageInfo.results;

    for (let i in txs) {
        // get block_num by trx_id
        let block = await Blocks.findOne({ "block.transactions.trx.id": txs[i].trx_id });
        if (block) {
            txs[i].block_num = block.block_num;
        }

        // get status from transactions traces
        let trxTrace = await TxTraces.getTxTraceByTxid(txs[i].trx_id);
        txs[i].receipt = trxTrace.receipt || {};
    }

    return pageInfo;
}

/**
 * get tx by trx_id
 * @param {String} trx_id id of tx
 * @returns {Object}
 */
exports.getTxByTxId = async function (trx_id) {
    const rs = await Txs.getTxByTxId(trx_id);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * get actions by trx_id
 * @param {String} trx_id transaction_id
 * @returns {Object}
 */
exports.getActionsByTxid = async function (trx_id) {
    const rs = await Actions.getActionsByTxid(trx_id);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * get actions by account
 * @param {String} account name of account eg. test1
 */
exports.getActionsByAccount = async function (page, pageSize, queryParams, sortParams) {
    // const typeList = ['']
    queryParams = { $or: [ 
        { "data.to": queryParams.account_name }, 
        { "data.receiver": queryParams.account_name }, 
        { "authorization.actor": queryParams.account_name } ] };
    const rs = await dbHelper.pageQuery(page, pageSize, Actions, queryParams, sortParams);
    let pageInfo = JSON.parse(JSON.stringify(rs));
    let actions = pageInfo.results;
    // get trx createdtime / updatedtime
    for(let i in actions){
        let txInfo = await Txs.findOne({ trx_id: actions[i].trx_id},{updatedAt:1,createdAt:1});
        txInfo = JSON.parse(JSON.stringify(txInfo));
        actions[i].updatedAt = txInfo.updatedAt;
        actions[i].createdAt = txInfo.createdAt;
    }

    return pageInfo;
}

/**
 * getTxsByBlockNum
 * @param {*} block_num 
 * @returns {Object}
 */
exports.getTxsByBlockNum = async function (page, pageSize, queryParams, sortParams) {
    const rs = await dbHelper.pageQuery(page, pageSize, Txs, queryParams, sortParams);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * get blocks by block_num、account_name、contract_name、contract_method
 * @param { Number } block_num lasted block_num
 * @param { String } account account name 
 * @param { String } contract contract name eg. utrio.token
 * @param { String } contract_method contract method eg. transfer
 */
exports.getBlocksByContract = async function (block_num,account,contract,contract_name){
    const rs = await Blocks.getBlocksByContract(block_num,account,contract,contract_name);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * getTxTraceByTxid
 * @param { String } tx_id 
 * @returns { Object }
 */
exports.getTxTraceByTxid = async function (tx_id) {
    const rs = await TxTraces.getTxTraceByTxid(tx_id);
    return JSON.parse(JSON.stringify(rs));
}

/**
 * search api 
 * @param { String | Number} query eg. block_num,trx_hash,account
 * @param {Object} pageInfo 
 */
exports.search = async function(query){
    let type;
    let rs;
    if(query.length == 64){
        type = 'trx';
        rs = await TxTraces.getTxTraceByTxid(query);
    }else if(isNaN(query)){
        rs = await Accounts.getAccountByName(query);
        type = "account";
    }else{
        rs = await Blocks.getBlockByBlockNum(query);
        type = "block";
    }
    
    return {
        "data": rs,
        "type": type
    };
}

/**
 * 根据用户名查询用户创建者
 * @param {String} name 
 */
exports.getCreateAccountByName = async function(name){
    let rs = await Actions.findOne({"data.name":name,"name":"newaccount"});
    if(!rs){
        return {};
    }

    let infoObj = JSON.parse(JSON.stringify(rs));

    // 根据trx_id 获取创建日期
    let txInfo = await Txs.findOne({ trx_id: infoObj.trx_id},{updatedAt:1});

    txInfo = JSON.parse(JSON.stringify(txInfo));
    
    return {
        "account": infoObj.data.creator,
        "updatedAt": txInfo.updatedAt
    }
}
