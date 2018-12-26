const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProducerSchema = new Schema(
  {
    owner: String,
    producer_key: String,
    total_cons_staked: String,
    is_active: Number,
    is_enabled: Number,
    hasactived: Number,
    url: String,
    unpaid_blocks: Number,
    total_produce_block: Number,
    last_claim_time: Number,
    location: Number
  },
  {
    timestamps: true
  }
);

ProducerSchema.set('toJSON', { getters: true, virtuals: true });
ProducerSchema.set('toObject', { getters: true, virtuals: true });

let Producers = mongoose.model('producers', ProducerSchema);
module.exports = Producers;
