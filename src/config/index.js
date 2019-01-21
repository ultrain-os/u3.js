var devNet = {
  httpEndpoint: 'http://172.16.10.3:8899',
  httpEndpoint_history: 'http://172.16.10.3:8899',
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

var testNet = {
  httpEndpoint: 'http://benyasin.s1.natapp.cc',
  httpEndpoint_history: 'http://history.natapp1.cc',
  broadcast: true,
  debug: false,
  verbose: false,
  sign: true,
  logger: {
    log: console.log,
    error: console.error,
    debug: console.log
  },
  chainId:'262ba309c51d91e8c13a7b4bb1b8d25906135317b09805f61fcdf4e044cd71e8',
  binaryen: require('binaryen'),
  symbol: 'UGAS'
};

module.exports = devNet;