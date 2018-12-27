const { createU3, format } = require('u3.js/src');
// const u3 = createU3({
//   httpEndpoint: 'http://40.76.66.113:8888'
// });
const u3 = createU3();
const Producer = require('../model/producer');

let restoreProducers = async function () {
  // get producers from rpc
  let producers = await u3.getProducers(true, '', 1000);

  if (producers.rows && producers.rows.length > 0) {
    for (let i in producers.rows) {
      producers.rows[i].unpaid_blocks = producers.rows[i].unpaid_blocks[0];
    }
    // 删除producers集合
    await Producer.deleteMany();
    await Producer.insertMany(producers.rows);
  }
};

module.exports = restoreProducers;
