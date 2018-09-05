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


## Contracts

#### deploy

#### call

## Call Actions