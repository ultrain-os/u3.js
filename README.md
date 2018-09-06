## Introduction

U3.js is a set of sdk for javascript.

## Precondition

* Install docker on your machine

* Config `--registry-mirror` as docker daemon process
    
        > docker --registry-mirror=https://registry.docker-cn.com daemon
    
        > killall Docker && open /Applications/Docker.app
    
* Start a ultrain-chain node

        > cd u3.js/docker && ./start.sh
        
Note: 

>  u3.js will interactive with api service using the default configuration on the below and you can custom them. 

>  httpEndpoint is the realtime data rest service serving by the ultrain-chain node. httpEndpoint_history is express api service just for history data query which you can launch it by yourself. the source code is here: `https://github.com/ultrain-os/ultrain-rest-api.git`

> * httpEndpoint: "http://127.0.0.1:8888",
> * httpEndpoint_history: "http://127.0.0.1:3000"

## Install

install width `npm install u3.js` or `yarn add u3.js`

## Enviroment

NodeJS or ES6 for browser

## Configuration

## Sign

#### send unsigned_transaction

Using `{ sign: false, broadcast: false }` to create a U3 instance and do some action.
And Then send the unsigned_transaction object to the ultrain-chain wallet.
      
    const u3_offline = createU3({ sign: false, broadcast: false });
    
    let unsigned_transaction = await u3_offline.transfer('ultrainio', 'ben', '1 SYS', 'uu');
              
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