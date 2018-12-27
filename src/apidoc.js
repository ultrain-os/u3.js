/** @namespace chain*/


/**
* @param {name} code account which deployed the contract 
* @param {name} account account to get balance of 
* @param {optional<string>} symbol symbol to query 
* @memberOf chain
* @example
        * import {getCurrencyBalance} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getCurrencyBalance({
  "code": "account",
  "account": "account",
  "symbol": "UGAS"
});
                        */
function getCurrencyBalance(){}

/**
* @param {name} code account which deployed the contract 
* @param {string} symbol currency symbol to get the stats for 
* @memberOf chain
* @example
        * import {getCurrencyStats} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getCurrencyStats({
  "code": "account",
  "symbol": "UGAS"
});
                        */
function getCurrencyStats(){}

/**
* @param {bool} json Provide true or false 
* @param {string} lower_bound timestamp OR transaction ID 
* @param {uint32} limit  
* @memberOf chain
* @example
        * import {getScheduledTransactions} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getScheduledTransactions({
  "json": false,
  "lower_bound": "2a57d0f636625abc9f63656e3b8ada8b8b7a4fdf7a7663e4db27bc88be730b51",
  "limit": "50"
});
                        */
function getScheduledTransactions(){}

/**
* Return general network information.
* @memberOf chain
*/
function getChainInfo(){}

/**
* Fetch a block from the blockchain.
* @param {string} block_num_or_id Provide a block number or a block id 
* @memberOf chain
* @example
        * import {getBlockInfo} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getBlockInfo({
  "block_id": "0000000280155952392ddaa5c4fb6611e74e3c93f61852c50f67f47c9c8b90ba"
});
                        */
function getBlockInfo(){}

/**
* Fetch the minimum state necessary to validate transaction headers.
* @param {string} block_num_or_id Provide a block number or a block id 
* @memberOf chain
* @example
        * import {getBlockHeaderState} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getBlockHeaderState({
  "block_id": "0000000280155952392ddaa5c4fb6611e74e3c93f61852c50f67f47c9c8b90ba"
});
                        */
function getBlockHeaderState(){}

/**
* Fetch a blockchain account
* @param {name} account_name Provide an account name 
* @memberOf chain
* @example
        * import {getAccountInfo} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getAccountInfo({
  "account_name": "account"
});
                        */
function getAccountInfo(){}

/**
* Fetch smart contract code
* @param {name} account_name Provide a smart contract account name 
* @param {bool} code_as_wasm was deprecated 
* @memberOf chain
* @example
        * import {getContract} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getContract({
  "account_name": "account"
});
                        */
function getContract(){}

/**
* @param {name} account_name name of account to retrieve ABI for 
* @memberOf chain
* @example
        * import {getAbi} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getAbi({
  "account_name": "account"
});
                        */
function getAbi(){}

/**
* @param {name} account_name Account name to get code and abi for 
* @memberOf chain
* @example
        * import {getRawCodeAndAbi} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getRawCodeAndAbi({
  "account_name": "account"
});
                        */
function getRawCodeAndAbi(){}

/**
* Fetch smart contract data from an account.
* @param {bool} json Provide true or false 
* @param {name} code Provide the smart contract name 
* @param {string} scope Provide the account name 
* @param {name} table Provide the table name 
* @param {string} table_key - 
* @param {string} lower_bound  
* @param {string} upper_bound  
* @param {uint32} limit  
* @param {string} key_type The key type of --index,<br/> primary only supports (i64),<br/> all others support (i64, i128, i256, float64, float128).<br/> Special type 'name' indicates an account name. 
* @param {string} index_position 1 - primary (first),<br/> 2 - secondary index (in order defined by multi_index),<br/> 3 - third index, etc 
* @memberOf chain
* @example
        * import {getTableRecords} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getTableRecords({
  "json": false,
  "code": "account1",
  "scope": "account2",
  "table": "table",
  "table_key": "",
  "lower_bound": "0",
  "upper_bound": "-1",
  "limit": "10",
  "key_type": "i64",
  "index_position": ""
});
                        */
function getTableRecords(){}

/**
* Fetch smart contract data from an account.
* @param {name} code Provide the smart contract name 
* @param {name} table Provide the table name 
* @param {string} lower_bound  
* @param {string} upper_bound  
* @param {uint32} limit  
* @memberOf chain
* @example
        * import {getTableByScope} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getTableByScope({
  "code": "account1",
  "table": "table",
  "lower_bound": "0",
  "upper_bound": "-1",
  "limit": "10"
});
                        */
function getTableByScope(){}

/**
* Manually serialize json into binary hex.  The binayargs is usually stored in Action.data.
* @param {name} code Provide the account name. 
* @param {name} action Provide the action arguments 
* @param {bytes} args Provide the json arguments 
* @memberOf chain
* @example
        * import {abiJson2bin} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.abiJson2bin({
  "code": "account1",
  "action": "account2",
  "args": {
    "from": "initb",
    "to": "initc",
    "quantity": 1000
  }
});
                        */
function abiJson2bin(){}

/**
* Convert bin hex back into Abi json definition.
* @param {name} code Provide the smart contract account name 
* @param {name} action Provide the action name 
* @param {bytes} binargs Provide the binary arguments 
* @memberOf chain
* @example
        * import {abiBin2json} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.abiBin2json({
  "code": "account1",
  "action": "account2",
  "binargs": "000000008093dd74000000000094dd74e803000000000000"
});
                        */
function abiBin2json(){}

/**
* @param {transaction} transaction Provide the transaction object 
* @param {Array} available_keys Provide the available keys 
* @memberOf chain
* @example
        * import {getRequiredKeys} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.getRequiredKeys({
  "transaction": {
    "ref_block_num": "100",
    "ref_block_prefix": "137469861",
    "expiration": "2017-09-25T06:28:49",
    "scope": [
      "initb",
      "initc"
    ],
    "actions": [
      {
        "code": "currency",
        "type": "transfer",
        "recipients": [
          "initb",
          "initc"
        ],
        "authorization": [
          {
            "account": "initb",
            "permission": "active"
          }
        ],
        "data": "000000000041934b000000008041934be803000000000000"
      }
    ],
    "signatures": [],
    "authorizations": []
  },
  "available_keys": [
    "EOS4toFS3YXEQCkuuw1aqDLrtHim86Gz9u3hBdcBw5KNPZcursVHq",
    "EOS7d9A3uLe6As66jzN8j44TXJUqJSK3bFjjEEqR4oTvNAB3iM9SA",
    "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
  ]
});
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
* @param {signed_transaction} signed_transaction Provide the authorizations for the transaction 
* @memberOf chain
*/
function pushTx(){}

/**
* Attempts to push transactions into the pending queue.
* @param {signed_transaction} signed_transaction[] Provide the authorizations for the transaction 
* @memberOf chain
*/
function pushTxs(){}

/**
* subscribe to ultrain chain event.
* @param {name} account Provide the action name 
* @param {string} post_url - 
* @memberOf chain
* @example
        * import {registerEvent} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.registerEvent({
  "account": "name",
  "post_url": "http://10.10.10.114:3002"
});
                        */
function registerEvent(){}

/**
* unsubscribe to ultrain chain event.
* @param {name} account Provide the action name 
* @param {string} post_url - 
* @memberOf chain
* @example
        * import {unregisterEvent} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.unregisterEvent({
  "account": "name",
  "post_url": "http://10.10.10.114:3002"
});
                        */
function unregisterEvent(){}

/**
* Return producer info
* @param {account_name} owner account of producer 
* @memberOf chain
*/
function getProducerInfo(){}

/**
* create an account
* @param {account_name} creator account of creator 
* @param {account_name} name account to be created 
* @param {string} owner owner public key to be bind 
* @param {string} active active public key to be bind 
* @param {uint32?} updateable whether the account can be updated 
* @memberOf chain
* @example
        * import {createUser} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.createUser({
  "creator": "ben",
  "name": "abcdefg12345",
  "owner": "UTR1uHKWW5tvmw6eQpbv92cVmkpDFhQ9q7xsee5Da2X2pVeYUNy4D",
  "active": "UTR1uHKWW5tvmw6eQpbv92cVmkpDFhQ9q7xsee5Da2X2pVeYUNy4D",
  "updateable": 1
});
                        */
function createUser(){}

/**
* deploy a contract to ultrain
* @param {string} contract contract file name 
* @param {account_name} account contract owner account 
* @memberOf chain
* @example
        * import {deploy} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.deploy({
  "contract": "MyContract",
  "account": "ben"
});
                        */
function deploy(){}

/**
* sign an unsigned transaction offline and in a separate
* @param {object} unsigned_transaction an unsigned transaction returned when an action called by a offline u3 instance 
* @param {string} privateKeyOrMnemonic private key or mnemonic 
* @param {string} chainId chainId 
* @memberOf chain
* @example
        * import {sign} from "u3.js/src";
        * const u3_offline = createU3({ sign: false, broadcast: false });
                        * const unsigned_transaction = await u3_offline.anyAction('args', {keyProvider});
                        * let signature = await u3_offline.sign(unsigned_transaction, '5KWW3MQbqibqmC...','baf8bb9d3636...');
                        */
function sign(){}

/**
* Return resource detail of an account
* @param {account_name} name account to query 
* @memberOf chain
* @example
        * import {queryResource} from "u3.js/src";
        * const u3 = createU3(config);
                        * await u3.queryResource({
  "name": "du3kwow2bkay"
});
                        */
function queryResource(){}