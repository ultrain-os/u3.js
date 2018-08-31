# **u3.js**

## Introduction

U3.js is a set of sdk for javascript.

## Precondition

* Install docker on your machine
* Config `--registry-mirror` as docker daemon process
    
        > docker --registry-mirror=https://registry.docker-cn.com daemon
    
        > killall Docker && open /Applications/Docker.app
    
* Start a ultrain-chain node

        > cd u3.js/docker && ./start.sh
        
Note: u3.js will connect to the running ultrain-chain node using the default configuration on the below and you can custom them

> * httpEndpoint: "http://127.0.0.1:8888",
> * dbUrl:"mongodb://127.0.0.1:27018/ultrain"

## Install

install width `npm install u3.js` or `yarn add u3.js`

## Enviroment

NodeJS or ES6 for browser

## Configuration


## Contracts

#### deploy

#### call

## Call Actions