module.exports = {
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
  chainId:'0eaaff4003d4e08a541332c62827c0ac5d96766c712316afe7ade6f99b8d70fe',
  binaryen: require('binaryen'),
  symbol: 'UGAS'
};
