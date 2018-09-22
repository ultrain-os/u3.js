const { createU3, ecc } = require('../src');
const Storage = require('node-localstorage');
const isEmpty = require('lodash.isempty');
const defaultConfig = require("../src/config");

const wif = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'; //ultrainio

//console.log(__dirname)
//console.log(__filename)
if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = Storage.LocalStorage;
  localStorage = new LocalStorage(__dirname + '/scratch');
}

const mockUsers = async (callback) => {
  let mockedUsers = {};
  let users = ['ben', 'john', 'tony', 'jack', 'bob', 'tom', 'jerry', 'alice'];
  let defaults = {
    creator: 'ultrainio',
    updateable: 1,
    ram_bytes: 500000,
    stake_net_quantity: '100.0000 ' + defaultConfig.symbol,
    stake_cpu_quantity: '100.0000 ' + defaultConfig.symbol,
    transfer: 0
  };
  const u3 = createU3({ keyProvider: wif });
  let checked = 0;

  for (let i in users) {
    let existUser = await u3.getExistAccount(users[i]);
    checked++;
    if (!isEmpty(existUser)) {
      mockedUsers[users[i]] = JSON.parse(localStorage.getItem(users[i]));
    } else {
      let keys = ecc.generateKeyPairWithMnemonic();
      mockedUsers[users[i]] = {
        public_key: keys.public_key,
        private_key: keys.private_key,
        mnemonic: keys.mnemonic
      };
      localStorage.setItem(users[i], JSON.stringify(mockedUsers[users[i]]));
      let param = Object.assign({}, defaults, { name: users[i], owner: keys.public_key, active: keys.public_key });
      await u3.createUser(param).then(async tr => {
        await u3.transfer('ultrainio', users[i], '1000.0000 ' + defaultConfig.symbol, 'mock user');
      });
    }
  }

  if (checked === users.length) {
    callback && callback(mockedUsers);
  }
  return mockedUsers;
};
module.exports = mockUsers;