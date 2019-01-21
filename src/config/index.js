var config = {
  httpEndpoint: 'http://127.0.0.1:8888',
  httpEndpoint_history: 'http://127.0.0.1:3000',
  broadcast: true,
  debug: false,
  verbose: false,
  sign: true,
  logger: {
    log: console.log,
    error: console.error,
    debug: console.log
  },
  chainId:'baf8bb9d3636379e3cd6779d2a72e693494670f1040d45154bb61dc8852c8971',
  binaryen: require('binaryen'),
  symbol: 'UGAS'
};

module.exports = config;
