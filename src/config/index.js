module.exports = {
  httpEndpoint: "http://127.0.0.1:8888",
  httpEndpointHistory: "http://127.0.0.1:3000",
  chainId: "80a5d6aa3e0c2e2052c3df1cc6b591b90b8307fb102bd174805e06c8b8b16ec1",
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