/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let BlockSchema = new Schema({
    _id: {
        type: String,
        'default': '1'
    },
    id: String,
    date: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm:ss') },
    pending: String,
    producer: String,
    tx_num: Number
},
{
    timestamps: true
});

BlockSchema.set('toJSON', {getters: true, virtuals: true});
BlockSchema.set('toObject', {getters: true, virtuals: true});

BlockSchema.virtual('date_format').get(function () {
    return moment(this.date).format('YYYY-MM-DD HH:mm:ss')
});

let Blocks = mongoose.model("blocks", BlockSchema)
module.exports = Blocks

