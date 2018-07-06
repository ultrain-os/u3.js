module.exports = func => (
  (...args) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(func(...args))
        } catch(err) {
          reject(err)
        }
      })
    })
  )
)
