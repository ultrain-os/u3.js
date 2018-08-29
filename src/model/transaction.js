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

TxSchema.static('getTxByTxId',async function(trx_id){
    const res = await this.findOne({trx_id});
    if(!res) return {};
    return res;
})

TxSchema.static('getTxCountByName',async function(name){
    const count = await this.count({ "actions.authorization.actor": name });
    return count;
})

TxSchema.set('toJSON', {getters: true, virtuals: true})
TxSchema.set('toObject', {getters: true, virtuals: true})

let Txs = mongoose.model("transactions", TxSchema)
module.exports = Txs

