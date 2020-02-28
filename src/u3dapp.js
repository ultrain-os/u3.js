const io = require("socket.io-client")

class U3Dapp {
    constructor(config,network) {
        this.isApp = false
        this.socket = null
        this.config = config
        this.network = network
        this.dappName = null

        this.connect = this.connect.bind(this)
        this.disconnect = this.disconnect.bind(this)
        this.getIdentity = this.getIdentity.bind(this)
        this.transfer = this.transfer.bind(this)
        this.pushTransaction = this.pushTransaction.bind(this)

        this.init()
    }

    init() {
        if(typeof window !=="undefined") {
            window.document.addEventListener("message",(e)=> {
                this.isApp = true
            })
        }
    }

    connect(dappName) {
        this.dappName = dappName ? dappName : window.location.host
        return new Promise((resolve,reject)=> {
            if(this.isApp) {
                window.postMessage(JSON.stringify({
                    type: "connect",
                    data: null
                }))
                
                window.document.addEventListener("message",function(msg){
                    let data = msg.data
                    let obj = JSON.parse(data)
                    if(obj.type == "connect") {
                        resolve(obj.data)
                    }
                })
            } else {
                if(this.socket) {
                    this.socket.close()
                    this.socket = null
                }
                
                this.socket = io("http://localhost:50001",{
                    reconnection:false
                })
                this.socket.on("connect",(error)=>{
                    resolve(true)
                })
                this.socket.on('connect_failed', (error) => {
                    reject('connection attempts failed, please  try again')
                })
                this.socket.on('connect_error', (error) => {
                    reject('the server is offline, please restart the wallet application')
                })
                this.socket.on("ultrainapi",this.onMessage)
            } 
        })
    }

    disconnect() {
        if(this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    getIdentity() {
        return new Promise((resolve,reject)=> {
            if(this.isApp) {
                window.postMessage(JSON.stringify({
                    type: "getIdentity",
                    data: {
                        dappName: this.dappName,
                        icon: window.location.host + "/favicon.ico"
                    }
                }))

                window.document.addEventListener("message",function(msg){
                    let data = msg.data
                    let obj = JSON.parse(data)
                    
                    if(obj.type == "getIdentity") {
                        let objData = obj.data
                        let resData = {
                            name: objData.accountName,
                            publickKey: objData.publicKey,
                            chainId: objData.network.chainId
                        }
                        resolve(resData)
                    }
                })
            } else {
                this.socket.emit("ultrainapi",{
                    method: "getIdentity",
                    data: {
                        dappName: this.dappName,
                        icon: window.location.host + "/favicon.ico"
                    }
                },(error,data)=> {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(data)
                    }
                })
            }
        })
    }

    transfer(sender,receiver,quantity,memo) {
        let config = this.config
        let bizId = new Date().getMilliseconds()
        if(this.isApp) {
            return new Promise((resolve,reject)=> {
                window.postMessage(JSON.stringify({
                    httpEndpoint:config.httpEndpoint,
                    httpEndpointHistory: config.httpEndpointHistory,
                    chainId: config.chainId,
                    'contract': "utrio.token",
                    'action': 'transfer',
                    'type': 'transfer',
                    'bizId': bizId,
                    'data': {
                        'sender': sender,
                        'receiver': receiver,
                        'quantity': quantity,
                        'memo': memo,
                    },
                }))
                window.document.addEventListener("message",function(msg){
                    let data = msg.data
                    let obj = JSON.parse(data)
                    if(obj.type == "transfer") {
                        resolve(obj)
                    } else {
                        reject(msg)
                    }
                })
            })
        } else {
            return new Promise((resolve,reject)=> {
                this.socket.emit("ultrainapi", {
                    method: "transfer",
                    data: {
                        chainId: config.chainId,
                        'contract': "utrio.token",
                        'action': 'transfer',
                        'type': 'transfer',
                        'bizId': new Date().getMilliseconds(),
                        'data': {
                            'sender': sender,
                            'receiver': receiver,
                            'quantity': quantity,
                            'memo': memo,
                        },
                    }
                },async (error, data)=> {
                    if(!error) {
                        try {
                            let signedTransaction = data.message
                            let trxHash = await this.network.pushTx(signedTransaction)

                            let resData = {
                                success: true,
                                type: "transfer",
                                bizId: bizId,
                                transactionId: trxHash.transaction_id,
                                returnValue: trxHash.processed.action_traces[0].return_value || '',
                                timeConsuming: 0 + 's',
                                msg: '',
                            }
                            resolve(resData)
                        } catch (error) {
                            reject(error)
                        }
                    } else {
                        reject(error)
                    }
                })
            })
        }
    }

    pushTransaction (params) {
        if(this.isApp) {
            let newParams = Object.assign({},this.config,params)
            return new Promise((resolve,reject)=> {
                window.postMessage(JSON.stringify(newParams))
                window.document.addEventListener("message",function(msg){
                    let data = msg.data
                    let obj = JSON.parse(data)
                    
                    if(obj.type == "transfer") {
                        resolve(obj)
                    } else {
                        reject(msg)
                    }
                })
            })
        } else {
            return new Promise((resolve,reject)=> {
                this.socket.emit("ultrainapi",{
                    method: "transfer",
                    data: params
                }, async (error,data)=> {
                    if(error) {
                        reject(error)
                    } else {
                        try {
                            console.log({data})
                            let signedTransaction = data.message
                            let trxHash = await this.network.pushTx(signedTransaction)

                            let resData = {
                                success: true,
                                type: params.type,
                                bizId: params.bizId,
                                transactionId: trxHash.transaction_id,
                                returnValue: trxHash.processed.action_traces[0].return_value || '',
                                timeConsuming: 0 + 's',
                                msg: '',
                            }
                            resolve(resData)
                        } catch (error) {
                            reject(error)
                        }
                    }
                })
            })
        }
    }
}

module.exports = U3Dapp
