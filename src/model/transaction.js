/**
 * 块信息
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TxSchema = new Schema({
    trx_id : String,
    actions : Object
})

TxSchema.static('getTxsByUsername',async function(username){
    const res = await this.find({ $or: [ { "actions.data.to": username }, { "actions.data.from": username } ] });
    return res;
})

TxSchema.set('toJSON', {getters: true, virtuals: true})
TxSchema.set('toObject', {getters: true, virtuals: true})

let Txs = mongoose.model("transactions", TxSchema)
module.exports = Txs

