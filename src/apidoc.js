/** @namespace chain*/
/** @namespace history*/
/** @namespace token*/


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
* Fetch smart contract data from producer.
* @param {bool} json - 
* @param {string} lower_bound - 
* @param {uint32} limit - 
* @memberOf chain
*/
function getProducers(){}

/**
* Return general network information.
* @memberOf chain
*/
function getInfo(){}

/**
* Fetch a block from the blockchain.
* @param {string} block_num_or_id - 
* @memberOf chain
*/
function getBlock(){}

/**
* Fetch a blockchain account
* @param {name} account_name - 
* @memberOf chain
*/
function getAccount(){}

/**
* Fetch smart contract code
* @param {name} account_name - 
* @memberOf chain
*/
function getCode(){}

/**
* Fetch smart contract data from an account.
* @param {bool} json - 
* @param {name} code - 
* @param {name} scope - 
* @param {name} table - 
* @param {string} table_key - 
* @param {string} lower_bound - 
* @param {string} upper_bound - 
* @param {uint32} limit - 
* @memberOf chain
*/
function getTableRows(){}

/**
* Manually serialize json into binary hex.  The binayargs is usually stored in Action.data.
* @param {name} code - 
* @param {name} action - 
* @param {bytes} args - 
* @memberOf chain
*/
function abiJsonToBin(){}

/**
* Convert bin hex back into Abi json definition.
* @param {name} code - 
* @param {name} action - 
* @param {bytes} binargs - 
* @memberOf chain
*/
function abiBinToJson(){}

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
function pushTransaction(){}

/**
* Attempts to push transactions into the pending queue.
* @param {signed_transaction} signed_transaction[] - 
* @memberOf chain
*/
function pushTransactions(){}

/**
* @param {account_name} account_name - 
* @param {int32?} pos - 
* @param {int32?} offset - 
* @memberOf history
*/
function getActions(){}

/**
* @param {account_name} controlling_account - 
* @memberOf history
*/
function getControlledAccounts(){}

/**
* @param {public_key_type} public_key - 
* @memberOf history
*/
function getKeyAccounts(){}

/**
* Retrieve a transaction from the blockchain.
* @param {transaction_id_type} id - 
* @memberOf history
*/
function getTransaction(){}

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