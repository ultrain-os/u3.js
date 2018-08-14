/**
 * 块信息
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

let TxSchema = new Schema({
    _id: {
        type: String,
        'default': '1'
    },
    id: String,
    b_id: String,
    create_time: { type: Date, default: Date.now },
    expiration: { type: Date, default: Date.now },
    actions: Number
},
{
    timestamps: true
});

TxSchema.set('toJSON', {getters: true, virtuals: true})
TxSchema.set('toObject', {getters: true, virtuals: true})

TxSchema.virtual('create_time_format').get(function () {
    return moment(this.create_time).format('YYYY-MM-DD HH:mm:ss')
})

TxSchema.virtual('expiration_format').get(function () {
    return moment(this.expiration).format('YYYY-MM-DD HH:mm:ss')
})

let Txs = mongoose.model("transactions", TxSchema)
module.exports = Txs

