let configDefaults = {
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
  chainId:'a74e19f12db3a7d13a1a0fdeb536266ff2ff78aeb6188946cc686caa2727b16a',
  binaryen: require('binaryen')
};
module.exports = configDefaults;
