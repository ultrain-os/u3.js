/** @namespace chain*/
/** @namespace token*/


/**
* Return net rate and cpu rate
* @param {name} account_name - 
* @memberOf chain
*/
function getSourcerate(){}

/**
* @param {name} code - 
* @param {name} account - 
* @param {optional<string>} symbol - 
* @memberOf chain
*/
function getCurrencyBalance(){}

/**
* @param {name} code - 
* @param {string} symbol - 
* @memberOf chain
*/
function getCurrencyStats(){}

/**
* @memberOf chain
*/
function getProducerSchedule(){}

/**
* @param {bool} json undefined 
* @param {string} lower_bound undefined 
* @param {uint32} limit undefined 
* @memberOf chain
*/
function getScheduledTransactions(){}

/**
* Return general network information.
* @memberOf chain
*/
function getChainInfo(){}

/**
* Fetch a block from the blockchain.
* @param {string} block_num_or_id blockNum or blockId 
* @memberOf chain
*/
function getBlockInfo(){}

/**
* Fetch the minimum state necessary to validate transaction headers.
* @param {string} block_num_or_id - 
* @memberOf chain
*/
function getBlockHeaderState(){}

/**
* Fetch a blockchain account
* @param {name} account_name - 
* @memberOf chain
*/
function getAccountInfo(){}

/**
* Fetch smart contract code
* @param {name} account_name - 
* @param {bool} code_as_wasm undefined 
* @memberOf chain
*/
function getContract(){}

/**
* @param {name} account_name - 
* @memberOf chain
*/
function getAbi(){}

/**
* @param {name} account_name - 
* @memberOf chain
*/
function getRawCodeAndAbi(){}

/**
* Fetch smart contract data from an account.
* @param {bool} json undefined 
* @param {name} code - 
* @param {string} scope - 
* @param {name} table - 
* @param {string} table_key - 
* @param {string} lower_bound undefined 
* @param {string} upper_bound undefined 
* @param {uint32} limit undefined 
* @param {string} key_type undefined 
* @param {string} index_position undefined 
* @memberOf chain
*/
function getTableRecords(){}

/**
* Manually serialize json into binary hex.  The binayargs is usually stored in Action.data.
* @param {name} code - 
* @param {name} action - 
* @param {bytes} args - 
* @memberOf chain
*/
function abiJson2bin(){}

/**
* Convert bin hex back into Abi json definition.
* @param {name} code - 
* @param {name} action - 
* @param {bytes} binargs - 
* @memberOf chain
*/
function abiBin2json(){}

/**
* @param {transaction} transaction - 
* @param {array} available_keys - 
* @memberOf chain
*/
function getRequiredKeys(){}

/**
* Append a block to the chain database.
* @param {signed_block} block - 
* @memberOf chain
*/
function pushBlock(){}

/**
* Attempts to push the transaction into the pending queue.
* @param {signed_transaction} signed_transaction - 
* @memberOf chain
*/
function pushTx(){}

/**
* Attempts to push transactions into the pending queue.
* @param {signed_transaction} signed_transaction[] - 
* @memberOf chain
*/
function pushTxs(){}

/**
* subscribe to ultrain chain event.
* @param {name} account - 
* @param {string} post_url - 
* @memberOf chain
*/
function registerEvent(){}

/**
* unsubscribe to ultrain chain event.
* @param {name} account - 
* @param {string} post_url - 
* @memberOf chain
*/
function unregisterEvent(){}

/**
* @param {asset} balance - 
* @memberOf token
*/
function account(){}

/**
* @memberOf token
*/
function accountName(){}

/**
* @param {account_name} issuer - 
* @param {asset} maximum_supply - 
* @memberOf token
*/
function create(){}

/**
* @param {asset} supply - 
* @param {asset} max_supply - 
* @param {account_name} issuer - 
* @memberOf token
*/
function currencyStats(){}

/**
* @param {account_name} to - 
* @param {asset} quantity - 
* @param {string} memo - 
* @memberOf token
*/
function issue(){}

/**
* @param {account_name} from - 
* @param {account_name} to - 
* @param {asset} quantity - 
* @param {string} memo - 
* @memberOf token
*/
function transfer(){}