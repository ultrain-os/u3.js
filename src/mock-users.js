const { createU3, ecc } = require('../src');
//const { connectMongo } = require('./history');
const path = require('path');
const Storage = require('node-localstorage');
const wif = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'; //ultrainio

if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = Storage.LocalStorage;
  localStorage = new LocalStorage(path.join('u3.js', '../scratch'));
}

const mockUsers = async (callback) => {
  let mockedUsers = {};
  let users = ['ben', 'john', 'tony', 'jack', 'bob', 'tom', 'jerry', 'alice'];
  let defaults = {
    creator: 'ultrainio',
    updateable: 0,
    ram_bytes: 8912,
    stake_net_quantity: '100.0000 SYS',
    stake_cpu_quantity: '100.0000 SYS',
    transfer: 0
  };
  //connectMongo();
  const u3 = createU3({ keyProvider: wif });
  let checked = 0;

  for (let i in users) {
    let existUser = await u3.getExistAccount(users[i]);
    checked++;
    if (existUser) {
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
        await u3.transfer('ultrainio', users[i], '1000 SYS', 'mock user');
      });
    }
  }

  if (checked === users.length) {
    callback && callback(mockedUsers);
  }
  return mockedUsers;
};
module.exports = mockUsers;