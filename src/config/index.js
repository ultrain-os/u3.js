module.exports = {
  httpEndpoint: 'http://139.217.83.22:8888',
  httpEndpointHistory: 'http://59.110.63.119:3111',
  chainId: '1a608a002d9191ecefb6a5072d7f547981749399945d1d291a74e43011206c0c',
  broadcast: true,
  sign: true,
  logger: {
    directory: '../../logs', // daily rotate file directory
    level: 'info', // error->warn->info->verbose->debug->silly
    console: true, // print to console
    file: false, // append to file
  },
  symbol: 'UGAS',
  cipherType: 'gm',
  //expireInSeconds:60

}
