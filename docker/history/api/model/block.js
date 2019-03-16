/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');
const moment = require('moment');

let BlockSchema = new Schema({
    block_id: String,
    block_num: Number,
    block: Object
})

BlockSchema.static('getBlockByBlockNum', async function (block_num) {
    const res = await this.findOne({ block_num });
    if (!res) return {};
    return res;
})

BlockSchema.static('getBlocksByContract', async function (block_num, account, contract, contract_name) {
    const res = await this.find({
        "block_num": { $gt: parseInt(block_num) },
        "block.transactions.trx.transaction.actions.account": contract,
        "block.transactions.trx.transaction.actions.name": contract_name,
        "block.transactions.trx.transaction.actions.authorization.actor": account
    });

    return res;
})

BlockSchema.static('getTrxNumByBlockNum', async function (block_num) {
    let rs = await this.aggregate([{ "$match": { "block_num": parseInt(block_num) } }, { "$project": { "trx_num": { "$size": "$block.transactions" } } }]);
    return rs[0].trx_num;
})

BlockSchema.static('statisticalByHr', async function () {
    const currentDate = new Date();
    const start = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}T00:00:00Z`;
    let rs = await this.aggregate([
        {
            $match: {
                "block.proposer": { $ne: '' },
                createdAt: { $gte: new Date(start) }
            }
        },
        { $project: { yearMonthDayHr: { $dateToString: { format: "%Y-%m-%d %H", timezone: "+08", date: "$createdAt" } } } },
        { $group: { _id: "$yearMonthDayHr", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]);
    return rs;
})

BlockSchema.static('statisticalByDay', async function (start, end) {
    // const currentDate = new Date();
    // const start = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}T00:00:00Z`;
    let rs = await this.aggregate([
        {
            $match: {
                "block.proposer": { $ne: '' },
                createdAt: { $gte: new Date(start), $lt: new Date(moment(end, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')) }
            }
        },
        { $project: { yearMonthDayHr: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
        { $group: { _id: "$yearMonthDayHr", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]);
    return rs;
})

BlockSchema.static('statisticalAwardByProposer', async function (proposer) {
    const currentDate = new Date();
    const start = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate() - 6}T00:00:00Z`;
    let rs = await this.aggregate([
        {
            $match: {
                "block.proposer": proposer || { $ne: '' },
                createdAt: { $gte: new Date(start) }
            }
        },
        { $project: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
        { $group: { _id: "$yearMonthDay", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]);
    return rs;
})

BlockSchema.static('getProposerList', async function (page, pageSize) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    }
    return new Promise((resolve, reject) => {
        async.parallel({
            count: (done) => {

                this.aggregate([
                    { $match: { 'block.proposer': { $ne: '' } } },
                    { $group: { '_id': '$block.proposer' } },
                    { $count: "total_count" }
                ]
                ).exec(function (err, rs) {
                    done(err, rs[0].total_count);
                });
            },
            records: (done) => {
                this.aggregate([
                    { $match: { 'block.proposer': { $ne: '' } } },
                    { $group: { _id: '$block.proposer', 'count': { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $skip: start },
                    { $limit: Number.parseInt(pageSize) }]
                ).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            var count = results.count;
            $page.total = results.count;
            $page.pageCount = Math.floor((count - 1) / pageSize + 1);
            $page.results = results.records;

            if (err) reject(err);
            resolve($page);
        });
    })
})

BlockSchema.set('toJSON', { getters: true, virtuals: true });
BlockSchema.set('toObject', { getters: true, virtuals: true });

let Blocks = mongoose.model("blocks", BlockSchema);
module.exports = Blocks;

