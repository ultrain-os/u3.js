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
  chainId:'3c253932643e8d6c59871c26e64abcea3c02be9a6fe76c3dd6fd5097134ff533',
  binaryen: require('binaryen'),
  symbol: 'UGAS'
};

module.exports = config;
