const Keygen = require('./keygen')
const ecc = require('../ecc')

const createHistory = require('history').createBrowserHistory
const config = require('./config')

config.history = createHistory()
config.localStorage = localStorage

module.exports = {
  Keygen,
  modules: {
    ecc
  }
}
