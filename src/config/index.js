module.exports = {
  httpEndpoint: "http://127.0.0.1:8888",
  httpEndpointHistory: "http://127.0.0.1:3000",
  chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  broadcast: true,
  sign: true,
  logger: {
    directory: "../../logs", // daily rotate file directory
    level: "info", // error->warn->info->verbose->debug->silly
    console: true, // print to console
    file: false // append to file
  },
  symbol: "UGAS",
  cipherType: "ecc",
  //keyProvider:[],
  //expireInSeconds:60

};