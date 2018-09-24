const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TxTracesSchema = new Schema({
    id : String,
    action_traces : Object,
    receipt : Object
})

TxTracesSchema.static('getTxTraceByTxid',async function(id){
    const res = await this.findOne({ id });
    if(!res) return {};
    return res;
})

TxTracesSchema.set('toJSON', {getters: true, virtuals: true})
TxTracesSchema.set('toObject', {getters: true, virtuals: true})

let TxTraces = mongoose.model("transaction_traces", TxTracesSchema)
module.exports = TxTraces

