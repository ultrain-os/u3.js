/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let AccountSchema = new Schema();

AccountSchema.set('toJSON', {getters: true, virtuals: true});
AccountSchema.set('toObject', {getters: true, virtuals: true});

AccountSchema.virtual('created_format').get(function () {
    return moment(this.created).format('YYYY-MM-DD HH:mm:ss')
});

AccountSchema.virtual('update_format').get(function () {
    return moment(this.last_code_update).format('YYYY-MM-DD HH:mm:ss')
});

let Accounts = mongoose.model("accounts", AccountSchema)
module.exports = Accounts

