let historyInstance, localStorageInstance

module.exports = {

  set history(h) {
    historyInstance = h
  },

  get history() {
    if(historyInstance) {
      return historyInstance
    }
    const createHistory = require('history').createMemoryHistory 
    historyInstance = createHistory()
    return historyInstance
  },

  set localStorage(ls) {
    localStorageInstance = ls
  },

  get localStorage() {
    if(localStorageInstance) {
      return localStorageInstance
    }
    localStorageInstance = require('localStorage')
    return localStorageInstance
  },
  
}

