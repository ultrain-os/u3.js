## Introduction

sets of sdk wrapped in javascript for common purpose.

## Precondition

* Install docker on your machine

* Config `--registry-mirror` as docker daemon process
    
        > docker --registry-mirror=https://registry.docker-cn.com daemon
    
        > killall Docker && open /Applications/Docker.app
    
* Start building a local ultrain-chain consensus net

        > cd u3.js/docker-testnet && ./start.sh
        
Note: 

>  u3.js will interactive with api service using the default configuration on the below and you can custom them. 

>  httpEndpoint is the realtime data rest service serving by the ultrain-chain node. httpEndpoint_history is express api service just for history data query which you can launch it by yourself. the source code is here: `https://github.com/ultrain-os/ultrain-rest-api.git`

> * httpEndpoint: "http://127.0.0.1:8888",
> * httpEndpoint_history: "http://127.0.0.1:3000"

## Install

install width `npm install u3.js` or `yarn add u3.js`

## Enviroment

NodeJS or ES6 for browser

## Usage

if you use u3.js in browser environment, reference the example below.

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>test</title>
            <script src="../dist/u3.js"></script>
            <script>
        
              let u3 = U3.createU3({
                httpEndpoint: 'http://127.0.0.1:8888',
                httpEndpoint_history: 'http://127.0.0.1:3000',
                broadcast: true,
                debug: false,
                sign: true,
                logger: {
                  log: console.log,
                  error: console.error,
                  debug: console.log
                },
                chainId:'2616bfbc21e11d60d10cb798f00893c2befba10e2338b7277bb3865d2e658f58',
                symbol: 'UGAS'
              });
        
              u3.getChainInfo((err, info) => {
                if (err) {
                  throw err;
                }
                console.log(info);
              });
            </script>
        </head>
        <body>
        </body>
        </html>

## Configuration

```
const { createU3 } = require('u3.js');
let config = {
  httpEndpoint: 'http://127.0.0.1:8888',
  chainId: null, // 32 byte (64 char) hex string
  keyProvider: ['PrivateKeys...'], // WIF string or array of keys..
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
let u3 = createU3(config);

```

* <b>httpEndpoint</b> string - http or https location of a ultrain-chain providing a chain API. When using u3.js from a browser remember to configure the same origin policy in nodultrain or proxy server. For testing, nodultrain configuration access-control-allow-origin = * could be used.
* <b>chainId</b> Unique ID for the blockchain you're connecting to. This is required for valid transaction signing. The chainId is provided via the get_chain_info API call.
* <b>keyProvider</b> [array<string>|string|function] - Provides private keys used to sign transactions. If multiple private keys are found, the API get_required_keys is called to discover which signing keys to use. If a function is provided, this function is called for each transaction.
If a keyProvider is not provided here, you should provided on a per-action or per-transaction basis in Options.
* <b>expireInSeconds</b> number - number of seconds before the transaction will expire. The time is based on the nodultrain's clock. An unexpired transaction that may have had an error is a liability until the expiration is reached, this time should be brief.
* <b>broadcast</b> [boolean=true] - post the transaction to the blockchain. Use false to obtain a fully signed transaction and it will not push to the blockchain.
* <b>verbose</b> [boolean=false] - verbose logging such as API activity.
* <b>debug</b> [boolean=false] - low level debug logging (serialization).
* <b>sign</b> [boolean=true] - sign the transaction with a private key. Leaving a transaction unsigned avoids the need to provide a private key.
* <b>logger</b> - default logging configuration.
```
logger: {
  log: config.verbose ? console.log : null,  // null to disable
  error: config.verbose ? console.error : null,
}

```

For example, redirect error logs: config.logger = {error: (...args) => ..}
* <b>authorization</b> - replace the default u3.js authorization on actions. An authorization provided here may still be over-written by specifying an authorization for each individual action.

For example, if most actions in an dapp are based on the posting key, this would replace the default active authorization with a posting authorization:

{authorization: 'xxx@active'}

#### Options

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


## Sign

#### send unsigned_transaction

Using `{ sign: false, broadcast: false }` to create a U3 instance and do some action.
And Then send the unsigned_transaction object to the ultrain-chain wallet.
      
    const u3_offline = createU3({ sign: false, broadcast: false });
    
    let unsigned_transaction = await u3_offline.transfer('ultrainio', 'ben', '1 UGAS', 'uu');
              
#### sign and push signed_transaction

In the wallet you can provide your privateKey or mnemonic to make a signature. 
And then push the signedTransaction to the ultrain-chain.

    const u3_online = createU3();
    let signature = await u3_online.sign(unsigned_transaction, privateKeyOrMnemonic);
    if (signature) {
     let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
     let processedTransaction = await u3_online.pushTx(signedTransaction);
    }

## Contracts

#### deploy

#### call

## Call Actions