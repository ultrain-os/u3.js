const io = require("socket.io-client")

class U3Dapp {
    constructor(config,network) {
        this.isApp = false
        this.socket = null
        this.config = config
        this.network = network

        this.connect = this.connect.bind(this)
        this.getIdentity = this.getIdentity.bind(this)
        this.transfer = this.transfer.bind(this)

        this.init()
    }

    init() {
        if(typeof window !=="undefined") {
            window.document.addEventListener("message",(e)=> {
                this.isApp = true
            })
        }
    }

    connect() {
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
                this.socket = null
                this.socket = io("http://localhost:50001",{
                    reconnection:false
                })
                this.socket.on("connect",(error)=>{
                    resolve(true)
                })
                this.socket.on("ultrainapi",this.onMessage)
            } 
        })
    }

    getIdentity() {
        return new Promise((resolve,reject)=> {
            if(this.isApp) {
                window.postMessage(JSON.stringify({
                    type: "getIdentity",
                    data: null
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
                    method: "getIdentity"
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

    transfer(params) {
        let config = this.config
        let { contract,bizId,data } = params
        let { receiver,quantity,memo } = data
        if(this.isApp) {
            return new Promise((resolve,reject)=> {
                window.postMessage(JSON.stringify({
                    httpEndpoint:config.httpEndpoint || "",
                    httpEndpointHistory: config.httpEndpointHistory || "",
                    chainId: config.chainId || "",
                    'contract': contract || "utrio.token",
                    'action': 'transfer',
                    'type': 'transfer',
                    'bizId': bizId,
                    'data': {
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
                    }
                })
            })
        } else {
            // let { createU3 } = window.U3

            return new Promise((resolve,reject)=> {
                // let config = { 
                //     httpEndpoint:"http://ultrain.natapp1.cc",  
                //     httpEndpointHistory:"http://ultrain-history.natapp1.cc",
                // };
                // let u3 = createU3(config)
                this.socket.emit("ultrainapi", {
                    method: "transfer",
                    data: {
                        'contract': contract || "utrio.token",
                        'action': 'transfer',
                        'type': 'transfer',
                        'bizId': bizId,
                        'data': {
                            'receiver': receiver,
                            'quantity': quantity,
                            'memo': memo,
                        },
                    }
                },async (error, data)=> {
                    if(!error) {
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
                    } else {
                        reject(error)
                    }
                })
            })
        }
    }
}

module.exports = U3Dapp

// const U3Dapp = {
//     isApp: false,
//     socket: null,
//     config: {},
//     network: {},
//     init: function(config,network) {
//         this.config = config
//         this.network = network
//         if(typeof window !=="undefined") {
//             window.document.addEventListener("message",(e)=> {
//                 this.isApp = true
//             })
//         } else {
//             return this
//         }
//     },
//     connect: function() {
//         return new Promise((resolve,reject)=> {
//             if(this.isApp) {
//                 alert(this.isApp)
//                 window.postMessage(JSON.stringify({
//                     type: "connect",
//                     data: null
//                 }))
//                 alert("window.postMessage")
                
//                 window.document.addEventListener("message",function(msg){
//                     alert(msg.data)
//                     let data = msg.data
//                     let obj = JSON.parse(data)
//                     if(obj.type == "connect") {
//                         resolve(obj.data)
//                     }
//                 })
//             } else {
//                 this.socket = null
//                 this.socket = io("http://localhost:50001",{
//                     reconnection:false
//                 })
//                 this.socket.on("connect",(error)=>{
//                     resolve(true)
//                 })
//                 this.socket.on("ultrainapi",this.onMessage)
//             } 
//         })
//     },
//     getIdentity() {
//         return new Promise((resolve,reject)=> {
//             if(this.isApp) {
//                 window.postMessage(JSON.stringify({
//                     type: "getIdentity",
//                     data: null
//                 }))

//                 window.document.addEventListener("message",function(msg){
//                     let data = msg.data
//                     let obj = JSON.parse(data)
                    
//                     if(obj.type == "getIdentity") {
//                         let objData = obj.data
//                         let resData = {
//                             name: objData.accountName,
//                             publickKey: objData.publicKey,
//                             chainId: objData.network.chainId
//                         }
//                         resolve(resData)
//                     }
//                 })
//             } else {
//                 this.socket.emit("ultrainapi",{
//                     method: "getIdentity"
//                 },(error,data)=> {
//                     if(error) {
//                         reject(error)
//                     } else {
//                         resolve(data)
//                     }
//                 })
//             }
//         })
//     },
    // transfer(params) {
    //     let config = this.config
    //     let { contract,bizId,data } = params
    //     let { receiver,quantity,memo } = data
    //     if(this.isApp) {
    //         return new Promise((resolve,reject)=> {
    //             window.postMessage(JSON.stringify({
    //                 // httpEndpoint:"http://ultrain.natapp1.cc",
    //                 // httpEndpointHistory:"http://ultrain-history.natapp1.cc",
    //                 // chainId:"1f1155433d9097e0f67de63a48369916da91f19cb1feff6ba8eca2e5d978a2b2",
    //                 config,
    //                 'contract': contract || "utrio.token",
    //                 'action': 'transfer',
    //                 'type': 'transfer',
    //                 'bizId': bizId,
    //                 'data': {
    //                     'receiver': receiver,
    //                     'quantity': quantity,
    //                     'memo': memo,
    //                 },
    //             }))
    //             window.document.addEventListener("message",function(msg){
    //                 let data = msg.data
    //                 let obj = JSON.parse(data)
                    
    //                 if(obj.type == "transfer") {
    //                     resolve(obj)
    //                 }
    //             })
    //         })
    //     } else {
    //         // let { createU3 } = window.U3

    //         return new Promise((resolve,reject)=> {
    //             // let config = { 
    //             //     httpEndpoint:"http://ultrain.natapp1.cc",  
    //             //     httpEndpointHistory:"http://ultrain-history.natapp1.cc",
    //             // };
    //             // let u3 = createU3(config)
    //             this.socket.emit("ultrainapi", {
    //                 method: "transfer",
    //                 data: {
    //                     'contract': contract || "utrio.token",
    //                     'action': 'transfer',
    //                     'type': 'transfer',
    //                     'bizId': bizId,
    //                     'data': {
    //                         'receiver': receiver,
    //                         'quantity': quantity,
    //                         'memo': memo,
    //                     },
    //                 }
    //             },async (error, data)=> {
    //                 if(!error) {
    //                     let signedTransaction = data.message
    //                     let trxHash = await this.network.pushTx(signedTransaction)

    //                     let resData = {
    //                         success: true,
    //                         type: "transfer",
    //                         bizId: bizId,
    //                         transactionId: trxHash.transaction_id,
    //                         returnValue: trxHash.processed.action_traces[0].return_value || '',
    //                         timeConsuming: 0 + 's',
    //                         msg: '',
    //                     }
    //                     resolve(resData)
    //                 } else {
    //                     reject(error)
    //                 }
    //             })
    //         })
    //     }
    // }

// }




// module.exports = U3Dapp
