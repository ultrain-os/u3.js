module.exports = processArgs

function processArgs (args, defParams, methodName = 'method', optionsFormatter = null) {
  let params = {}
  let options = {}

  const expectedArgCount = defParams.length

  // Extra callback argument?  Last per promisifyAll standard.
  let callbackArg
  if (typeof args[args.length - 1] === 'function') {
    callbackArg = args[args.length - 1]
    args = args.slice(0, args.length - 1)
  }

  let callback
  let returnPromise
  if(callbackArg) {
    callback = function(err, result) {
      if(err) {
        callbackArg(err)
      } else {
        callbackArg(null, result)
      }
    }
  } else {
    returnPromise = new Promise((resolve, reject) => {
      callback = function(err, result) {
        if(err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
    })
  }

  // Look for the options parameter (after potential callback was removed)
  if(typeof optionsFormatter === 'function' && args.length > 0 &&
    ((typeof args[0] === 'object' && args.length === 2) || args.length === expectedArgCount + 1)
  ) {
    //An extra options argument
    options = optionsFormatter(args[args.length - 1])
    if(options != null) {
      // It is valid, remove it to avoid parameter count an error below
      args = args.slice(0, args.length - 1)
    }
  }

  // Parameteters (args) can be ordered or an object
  if (args.length === 1 && typeof args[0] === 'object') {
    params = args[0]
  } else {
    // give ordered paramaters names

    if (args.length > expectedArgCount) {
      // console.log('typeof defParams[expectedArgCount]', args)
      throw new TypeError(`${methodName} is expecting ${
        expectedArgCount} parameters but ${
        args.length} where provided`)
    }

    // convert ordered parameters into a value object by parameter name
    let pos = 0
    for (const defParam of defParams) {
      params[defParam] = args[pos]
      pos++
    }
  }
  return {params, options, callback, returnPromise}
}
