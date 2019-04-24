<img src="https://user-images.githubusercontent.com/1866848/53072742-06747880-3521-11e9-9fec-81ac10da89ba.png" width="250" align=center />

A general library wrapped in javascript for interacting with Ultrain.

### 中文文档看[这里](https://github.com/ultrain-os/u3.js/blob/master/README_Zh.md)


## Apply Environment

Browser（ES6）or NodeJS

If you want to integrate u3.js into a react native environment, there is a workable way to do this with rn-nodeify, see the example [U3RNDemo](https://github.com/benyasin/U3RNDemo)

## Usage

        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>test</title>
                <script src="../dist/u3.js"></script>
                <script>
                let func = async () => {
                  let u3 = U3.createU3({
                    httpEndpoint: "http://127.0.0.1:8888",
                    httpEndpointHistory: "http://127.0.0.1:3000"
                  });
          
                  await u3.getChainInfo();
          
                  const keyProvider = () => {
                    return ["5JbedY3jGfNK7HcLXcqGqSYrmX2n8wQWqZAuq6K7Gcf4Dj62UfL"];
                  };
                  const c = await u3.contract("utrio.token");
                  await c.transfer("ben", "bob", "1.0000 UGAS", "", { keyProvider });
                };
                func();
                </script>
            </head>
            <body>
            </body>
        </html>



* #### Installation

 `npm install u3.js` 或 `yarn add u3.js`

* #### Initialization

```
const { createU3 } = require('u3.js');
let config = {
    httpEndpoint: "http://127.0.0.1:8888",
    httpEndpointHistory: "http://127.0.0.1:3000",
    chainId: "baf8bb9d3636379e3cd6779d2a72e693494670f1040d45154bb61dc8852c8971",
    broadcast: true,
    sign: true,
    logger: {
      directory: "../../logs", // daily rotate file directory
      level: "info", // error->warn->info->verbose->debug->silly
      console: true, // print to console
      file: false // append to file
    },
    symbol: "UGAS",
    //keyProvider:[],
    //expireInSeconds:60
}
let u3 = createU3(config);

u3.getChainInfo((err, info) => {
  if (err) {throw err;}
  console.log(info);
});

```


* #### Local environment running

Running u3 locally requires relying on docker. 

1.Download docker [from here](https://docs.docker.com/docker-for-mac/install/) and install it;

2.Then add the Chinese mirror address：https://registry.docker-cn.com;

3.Click on "Apply & Restart";

<img src="https://user-images.githubusercontent.com/1866848/46121838-3d7f8000-c248-11e8-933a-fbcf30cfc443.png" width="500" hegiht="700" align=center />            
    
4.Go to u3.js/docker && ./start.sh

## Configuration

#### Global configuration

* <b>httpEndpoint</b> string - http or https location of a ultrain providing a chain API. When using u3.js from a browser remember to configure the same origin policy in nodultrain or proxy server. For testing, nodultrain configuration access-control-allow-origin = * could be used.
* <b>httpEndpointHistory</b> string - http or https location of a ultrain providing a chain history API. When using u3.js from a browser remember to configure the same origin policy in nodultrain or proxy server. .
* <b>chainId</b> Unique ID for the blockchain you're connecting to. This is required for valid transaction signing. The chainId is provided via the get_chain_info API call.
* <b>keyProvider</b> [array<string>|string|function] - Provides private keys used to sign transactions. If multiple private keys are found, the API get_required_keys is called to discover which signing keys to use. If a function is provided, this function is called for each transaction.
If a keyProvider is not provided here, you should provided on a per-action or per-transaction basis in Options.
* <b>expireInSeconds</b> number - number of seconds before the transaction will expire. The time is based on the nodultrain's clock. An unexpired transaction that may have had an error is a liability until the expiration is reached, this time should be brief.
* <b>broadcast</b> [boolean=true] - post the transaction to the blockchain. Use false to obtain a fully signed transaction and it will not push to the blockchain.
* <b>sign</b> [boolean=true] - sign the transaction with a private key. Leaving a transaction unsigned avoids the need to provide a private key.
* <b>logger</b> - default logging configuration.
```
logger: {
  directory: "../../logs", // daily rotate file directory
  level: "info", // error->warn->info->verbose->debug->silly
  console: true, // print to console
  file: false // append to file
}
```

#### Options configuration

Options may be provided after parameters. Authorization is for individual actions.eg:
```
options = {
  authorization: 'alice@active',
  broadcast: true,
  sign: true
}

```
```
u3.transfer('alice', 'bob', '1.0000 UGAS', '', options)
```

* <b>authorization</b> [array<auth>|auth] - identifies the signing account and permission typically in a multisig configuration. Authorization may be a string formatted as account@permission.
* <b>broadcast</b> [boolean=true] - post the transaction to the blockchain. Use false to obtain a fully signed transaction.
* <b>sign</b> [boolean=true] - sign the transaction with a private key. Leaving a transaction unsigned avoids the need to provide a private key.
* <b>keyProvider</b> [array<string>|string|function] - just like the global keyProvider except this provides a temporary key for a single action or transaction.


```
await u3.anyAction('args', {keyProvider})
await u3.transaction(tr => { tr.anyAction() }, {keyProvider})
```

## create Account

   create accounts will need some staked tokens for RAM and bandwidth.
   
  ```
 const u3 = createU3(config);
 const name = 'abcdefg12345'; //common account should satisfy rule: Must be 12 bit in 12345abcdefghijklmnopqrstuvwxyz
 let params = {
     creator: 'ben',
     name: name,
     owner: pubkey,
     active: pubkey,
     updateable: 1,//[optional]whether the account can be updated( update contract)
  };
  await u3.createUser(params);
   
  ```
 
 
## Transfer(UGAS)

transfer functions are used more frequently. 

* transfer(from,to,content,memo)  the content param should be using strict format with right decimal and symbol, eg '1.0000 UGAS'

```
const u3 = createU3(config);
const c = await u3.contract('utrio.token')

// with positional parameters
const result = await c.transfer('ben', 'bob', '1.2000 UGAS', '')
// or with named parameters
const result = await c.transfer({from: 'bob', to: 'ben', quantity: '1.3000 UGAS', memo: ''})
```
  
* If you want to confirm that the transfer logic has been really done, please follow these steps:
  
```
// first check whether the transaction was failed
if (!result || result.processed.receipt.status !== "executed") {
  console.log("the transaction was failed");
  return;
}

// then check whether the transaction was irreversible when it was not expired
let timeout = new Date(result.transaction.transaction.expiration + "Z") - new Date();
await U3Utils.test.waitUntil(async () => {
  let tx = await u3.getTxByTxId(result.transaction_id);
  return tx && tx.irreversible;
}, timeout, 1000);
```
    
        
## Sign

#### send unsigned_transaction

Using `{ sign: false, broadcast: false }` to create a U3 instance and do some action.
And Then send the unsigned_transaction object to the ultrain-chain wallet.

  
```
  const u3_offline = createU3({ sign: false, broadcast: false });
  const c = u3_offline.contract('utrio.token');
  let unsigned_transaction = await c.transfer('ultrainio', 'ben', '1 UGAS', 'uu');
```
           
#### sign and push signed_transaction

In the wallet you can provide your privateKey or mnemonic to make a signature. 
And then push the signedTransaction to the ultrain-chain.
```
  const u3_online = createU3();
  let signature = await u3_online.sign(unsigned_transaction, privateKeyOrMnemonic, chainId);
  if (signature) {
     let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
     let processedTransaction = await u3_online.pushTx(signedTransaction);
  }

```

## Resource

Calling a contract will only spend the contract owner's resource. So if your want to deploy
a contract, buy some resource before. 

* resourcelease(payer,receiver,slot,days,location) 

```
const u3 = createU3(config);
const c = await u3.contract('ultrainio')

await c.resourcelease('ben', 'bob', 1, 10, "ultrainio");// 1 slot for 10 days on the side chain named ultrainio

```

And querying resource detail through the method below.

```
const account = await u3.getAccountInfo({ account_name: 'abcdefg12345' });
console.log(account.chain_resource[0].lease_num)

```

    
## Contracts

#### deploy

Deploy and call smart contracts. Before you deploy the smart contract, you need to compile the typescript source files
to webassembly targets, which are *.abi,*.wast,*.wasm.
* deploy(contracts_files_path, deploy_account)  the contracts_files_path param is the absolute path of *.abi,*.wast,*.wasm.
and the deploy_account is the one who will deploy the smart contract.

```
  const u3 = createU3(config);
  await u3.deploy(path.resolve(__dirname, '../contracts/token/token'), 'bob');

```


#### call actions

```
const u3 = createU3(config);
const tr = await u3.contract('ben');
await tr.transfer('bob', 'ben', '1.0000 UGAS','');

//or maybe like this
await u3.contract('ben').then(sm => sm.transfer('bob', 'ben', '1.0000 UGAS',''))

// Transaction with multiple contracts
await u3.transaction(['ben', 'bob'], ({sm1, sm2}) => {
   sm1.myaction(..)
   sm2.myaction(..)
})
```

#### custom Token


```
const u3 = createU3(config);
const account = 'bob';
await u3.transaction(account, token => {
    token.create(account, '10000000.0000 DDD');
    token.issue(account, '10000000.0000 DDD', 'issue');
});

const balance = await u3.getCurrencyBalance(account, account, 'DDD')
console.log('currency balance', balance)
```


## Event

Ultrain provides an event registration and listening mechanism for asynchronous scenarios that trigger another action in the contract.The client needs to first register a listener address to the ultrain, then trigger the event via the emit method in the contract, and Ultrain will push the message to the registered listener address.

#### register/unregister

* registerEvent(deployer, listen_url)
* unregisterEvent(deployer, listen_url)

**deployer** : the account who deploy the contract

**listen_url** : the listening url which will receive the message

note: If you are testing in a docker envirnment, make sure the listening address is a local IP and can be access from docker.

```
const u3 = createU3(config);
const subscribe = await u3.registerEvent('ben', 'http://192.168.1.5:3002');

//or
const unsubscribe = await u3.unregisterEvent('ben', 'http://192.168.1.5:3002');
```

#### listen

```
const { createU3 listener } = require('u3.js');
listener(function(data) {
   // do callback logic
   console.log(data);
});

U3Utils.test.wait(2000);

//must call listener function before emit event
const contract = await u3.contract(account);
contract.hi('ben', 30, 'It is a test', { authorization: [`ben@active`] });

```

