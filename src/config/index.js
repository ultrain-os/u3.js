module.exports = configDefaults = {
  httpEndpoint: "http://127.0.0.1:8888",
  dbUrl:"mongodb://127.0.0.1:27018/ultrain",
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
