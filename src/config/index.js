let configDefaults = {
  httpEndpoint: "http://127.0.0.1:8888",
  httpEndpoint_history: "http://127.0.0.1:3000",
  broadcast: true,
  debug: false,
  verbose: false,
  sign: true,
  logger: {
    log: console.log,
    error: console.error,
    debug: console.log
  }
};
module.exports = configDefaults
