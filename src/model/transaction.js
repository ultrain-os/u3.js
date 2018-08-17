/**
 * 块信息
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TxSchema = new Schema()

TxSchema.set('toJSON', {getters: true, virtuals: true})
TxSchema.set('toObject', {getters: true, virtuals: true})


let Txs = mongoose.model("transactions", TxSchema)
module.exports = Txs

