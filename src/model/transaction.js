/**
 * 块信息
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TxSchema = new Schema({
    trx_id : String,
    actions : Object
})

TxSchema.static('getActionsById',async function(trx_id){
    const res = await this.findOne({ trx_id });
    let actions = [];
    if(res){
        actions = res.actions;
    }
    return actions;
})

TxSchema.set('toJSON', {getters: true, virtuals: true})
TxSchema.set('toObject', {getters: true, virtuals: true})

let Txs = mongoose.model("transactions", TxSchema)
module.exports = Txs

