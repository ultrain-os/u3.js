module.exports = {

  // Under "api:" all functions must take api as their 1st parameter
  api: {
    createTransaction
  }
};

function createTransaction (api, expireInSeconds = 60, callback) {
  if (!callback) {
    throw new TypeError("callback parameter is required");
  }
  api.getInfo(checkError(callback, info => {
    const chainDate = new Date(info.head_block_time + "Z");

    api.getBlock(info.last_irreversible_block_num, checkError(callback, block => {
      const expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);

      const ref_block_num = info.last_irreversible_block_num & 0xFFFF;

      const headers = {
        expiration: expiration.toISOString().split(".")[0],
        ref_block_num,
        ref_block_prefix: block.ref_block_prefix,
        net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        context_free_actions: [],
        actions: [],
        signatures: [],
        transaction_extensions: []
      };
      callback(null, headers);
    }));
  }));
}

const checkError = (parentErr, parrentRes) => (error, result) => {
  if (error) {
    parentErr(error);
  } else {
    parrentRes(result);
  }
};