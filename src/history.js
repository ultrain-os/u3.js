const axios = require('axios');
let httpEndPoint = require('./config').httpEndpoint_history;

module.exports = function(config){
    httpEndPoint = config.httpEndpoint_history;
    console.log(httpEndPoint);
    return {
        getAllBlocks,
        getContracts,
        getContractByName,
        getAllAccounts,
        getAllTxs,
        getTxByTxId,
        getActionsByTxid,
        getActionsByAccount,
        getTxsByBlockId,
        getExistAccount
    }
}
/**
 * get all blocks
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams 
 */
function getAllBlocks (page, pageSize, queryParams, sortParams) {
    let data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    }

    return fetchUrl(`${httpEndPoint}/blocks`, data);
}

/**
 * get all contracts
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams
 */
function getContracts (page, pageSize, queryParams, sortParams) {
    let data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    }

    return fetchUrl(`${httpEndPoint}/contracts`, data);
}

/**
 * get contract by name
 * @param {String} name 
 */
function getContractByName (name) {
    return fetchUrl(`${httpEndPoint}/contracts/${name}`);
}

/**
 * get all accounts
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams
 */
async function getAllAccounts (page, pageSize, queryParams, sortParams) {
    let data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    }
    let response = await fetchUrl(`${httpEndPoint}/accounts`, data);
    if (response.error_msg) {
        return response.error_msg;
    }

    let pageInfo = Object.assign({},response);
    let accounts = pageInfo.results;
    const { createU3 } = require('./index');
    const u3 = createU3();

    for (let i in accounts) {
        // find tx count by name
        // let count = await Txs.getTxCountByName(accounts[i].name);
        // accounts[i].tx_count = count;
        let balance = await u3.getCurrencyBalance({
            code: "utrio.token",
            account: accounts[i].name,
            symbol: "SYS"
        })

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
 * get all txs
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { Object } queryParams 
 * @param { Object } sortParams
 */
function getAllTxs (page, pageSize, queryParams, sortParams) {
    let data = {
        "page": page || 1,
        "pageSize": pageSize || 10,
        "queryParams": queryParams || {},
        "sortParams": sortParams || { _id: -1 }
    }

    return fetchUrl(`${httpEndPoint}/txs`, data);
}

/**
 * get tx by id
 * @param {String} id tx_id
 */
function getTxByTxId (id) {
    return fetchUrl(`${httpEndPoint}/txs/${id}`);
}

/**
 * get actions by tx_id
 * @param {String} id  tx_id
 */
function getActionsByTxid (id){
    return fetchUrl(`${httpEndPoint}/actions/tx/${id}`);
}

/**
 * get actions by account
 * @param {String} account accoun name
 */
function getActionsByAccount (account){
    return fetchUrl(`${httpEndPoint}/actions/account/${account}`);
}

/**
 * get txs by block_id
 * @param {String} block_id 
 */
function getTxsByBlockId (block_id){
    return fetchUrl(`${httpEndPoint}/txs/block/${block_id}`);
}

/**
 * getExistAccount
 * @returns {account|null}
 */
function getExistAccount (name) {
  return fetchUrl(`${httpEndPoint}/accounts/${name}`);
};

function fetchUrl(url, data = {}) {
    return axios.post(url, data)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            let err = {
                error_msg: ""
            }
            if (error.response) {
                err.error_msg = error.response.statusText;
            } else {
                err.error_msg = error.message;
            }
            return err;
        });
}