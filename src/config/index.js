module.exports = {
  httpEndpoint: "http://127.0.0.1:8888",
  httpEndpointHistory: "http://127.0.0.1:3000",
  chainId: "baf8bb9d3636379e3cd6779d2a72e693494670f1040d45154bb61dc8852c8971",
  broadcast: true,
  sign: true,
  logger: {
    directory: "../../logs", // daily rotate file directory
    level: "info", // error->warn->info->verbose->debug->silly
    console: true, // print to console
    file: false // append to file
  },
  symbol: "UGAS",
  //keyProvider:[],
  //expireInSeconds:60

};