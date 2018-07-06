const schema = Object.assign(
  {},
  require('./chain_types.json'),
  require('./ultrainio_system.json'),
  require('./ultrainio_token.json')
)

module.exports = schema