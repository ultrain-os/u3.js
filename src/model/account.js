/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema();

AccountSchema.set('toJSON', {getters: true, virtuals: true});
AccountSchema.set('toObject', {getters: true, virtuals: true});


let Accounts = mongoose.model("accounts", AccountSchema)
module.exports = Accounts

