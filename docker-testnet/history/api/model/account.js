/**
 * 用户相关
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema();

/**
 * 获取合约列表
 */
AccountSchema.static('getContracts',async function(){
    const res = await this.find({ "abi": { $exists: true } });
    return res;
})

AccountSchema.static('getContractByName',async function(name){
    const res = await this.findOne({ "abi": { $exists: true },name });
    if(!res) return {};
    return res;
})

AccountSchema.static('getAccountByName',async function(name){
    const res = await this.findOne({ name });
    if(!res) return {};
    return res;
})

AccountSchema.set('toJSON', {getters: true, virtuals: true});
AccountSchema.set('toObject', {getters: true, virtuals: true});


let Accounts = mongoose.model("accounts", AccountSchema)
module.exports = Accounts

