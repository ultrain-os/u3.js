<img src="https://user-images.githubusercontent.com/1866848/53072742-06747880-3521-11e9-9fec-81ac10da89ba.png" width="250" align=center />

Javascript封装的负责与链交互的通用库


## 应用环境

浏览器（ES6）或 NodeJS

如果你想集成u3.js到react native环境中，有一个可行的方法,借助rn-nodeify实现，参考示例[U3RNDemo](https://github.com/benyasin/U3RNDemo)

## 使用方法

一、如果是在浏览器中使用u3，请参考以下用法：

        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>test</title>
                <script src="../dist/u3.js"></script>
                <script>
                  let func = async () => {
                      let u3 = U3.createU3({
                        httpEndpoint: "http://127.0.0.1:8888",
                        httpEndpointHistory: "http://127.0.0.1:3000"
                      });
              
                      await u3.getChainInfo();
              
                      const keyProvider = () => {
                        return ["5JbedY3jGfNK7HcLXcqGqSYrmX2n8wQWqZAuq6K7Gcf4Dj62UfL"];
                      };
                      const c = await u3.contract("utrio.token");
                      await c.transfer("ben", "bob", "1.0000 UGAS", "", { keyProvider });
                    };
                    func();
                </script>
            </head>
            <body>
            </body>
        </html>

二、 如果是在NodeJS环境中使用u3，请参照以下用法：


* #### 安装u3

 `npm install u3.js` 或 `yarn add u3.js`

* #### 初始化

```
const { createU3 } = require('u3.js');
let config = {
    httpEndpoint: "http://127.0.0.1:8888",
    httpEndpointHistory: "http://127.0.0.1:3000",
    chainId: "baf8bb9d3636379e3cd6779d2a72e693494670f1040d45154bb61dc8852c8971",
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
}
let u3 = createU3(config);

u3.getChainInfo((err, info) => {
  if (err) {throw err;}
  console.log(info);
});

```

* #### 本地环境运行

本地运行u3，需要依赖docker. 

1.从这里 [下载docker](https://docs.docker.com/docker-for-mac/install/)并安装;

2.然后添加中国区镜像地址：https://registry.docker-cn.com;

3.点击"Apply & Restart"；

<img src="https://user-images.githubusercontent.com/1866848/46121838-3d7f8000-c248-11e8-933a-fbcf30cfc443.png" width="500" hegiht="700" align=center />            
    
4.进入u3.js/docker && ./start.sh


## 配置

#### 全局配置

* <b>httpEndpoint</b> string - 链实时API的http或https地址.如果是在浏览器环境中使用u3，请注意配置相同的域名.
* <b>httpEndpointHistory</b> string - 链历史API的http或https地址.如果是在浏览器环境中使用u3，请注意配置相同的域名.
* <b>chainId</b> 链唯一的ID. 链ID可以通过 [httpEndpoint]/v1/chain/get_chain_info获得.
* <b>keyProvider</b> [array<string>|string|function] - 提供私钥用来签名交易. 提供用于签名事务的私钥。
如果提供了多个私钥，不能确定使用哪个私钥，可以使用调用get_required_keysAPI 获取要使用签名的密钥. 如果是函数，那么每一个交易都将会使用该函数.
如果这里不提供keyProvider,那么它可能会Options配置项提供在每一个action或每一个transaction中
* <b>expireInSeconds</b> number - 事务到期前的秒数，时间基于nodultrain的时间.
* <b>broadcast</b> [boolean=true] - 默认是true。使用true将交易发布到区块链，使用false将获取签名的事务.
* <b>sign</b> [boolean=true] - 默认是true。使用私钥签名交易。保留未签名的交易避免了提供私钥的需要.
* <b>logger</b> - 默认日志配置.
```
logger: {
  directory: "../../logs", // 每天日志的目录
  level: "info", // error->warn->info->verbose->debug->silly
  console: true, // 打印到控制台
  file: false // 输出到文件
}
```

#### Options配置项

Options可以在方法参数之后添加. Authorization应用于单独的actions.比如:
```
options = {
  authorization: 'alice@active',
  broadcast: true,
  sign: true
}

```
```
u3.transfer('alice', 'bob', '1.0000 UGAS', '', options)
```

* <b>authorization</b> [array<auth>|auth] - 指明账号和权限，典型地应用于多重签名的配置中. Authorization必须是一个字符串格式，形如account@permission.
* <b>broadcast</b> [boolean=true] - 默认是true。使用true将交易发布到区块链，使用false将获取签名的事务.
* <b>sign</b> [boolean=true] - 默认是true。使用私钥签名交易。保留未签名的交易避免了提供私钥的需要.
* <b>keyProvider</b> [array<string>|string|function] - 就像global配置项中的keyProvider一样，这里的配置可以以覆盖全局配置的形式为每一个action或每一个transaction提供单独的私钥.

```
await u3.anyAction('args', {keyProvider})
await u3.transaction(tr => { tr.anyAction() }, {keyProvider})
```

## 创建账号

   创建账号需要花费creator账号的一些代币，为新账号抵押部分RAM和带宽
   
  ```
 const u3 = createU3(config);
 const name = 'abcdefg12345';//普通账号需要满足规则：必须为12345abcdefghijklmnopqrstuvwxyz中的12位
 let params = {
     creator: 'ben',
     name: name,
     owner: pubkey,
     active: pubkey,
     updateable: 1,//可选，账号是否可以更新（更新合约）
  };
  await u3.createUser(params);
   
  ```
 
 
## 转账（UGAS）

转账方法使用非常频繁，UGAS的转账需要调用系统合约utrio.token.

* transfer(from,to,content,memo)  其中content这个字段必须严格为金额与符号拼接的字符串, 如 '1.0000 UGAS'

```
const u3 = createU3(config);
const c = await u3.contract('utrio.token')

// 使用位置参数
const result = await c.transfer('ben', 'bob', '1.2000 UGAS', '')
// 使用名称参数
const result = await c.transfer({from: 'bob', to: 'ben', quantity: '1.3000 UGAS', memo: ''})
```

* 如果要确认这笔转账正确被执行了，可以遵循以下步骤:

```
// first check whether the transaction was failed
if (!result || result.processed.receipt.status !== "executed") {
console.log("the transaction was failed");
return;
}

// then check whether the transaction was irreversible when it was not expired
let timeout = new Date(result.transaction.transaction.expiration + "Z") - new Date();
await U3Utils.test.waitUntil(async () => {
let tx = await u3.getTxByTxId(result.transaction_id);
return tx && tx.irreversible;
}, timeout, 1000);
```
   
## 签名

使用 `{ sign: false, broadcast: false }` 创建一个u3实例并且做一些action, 然后将未签名的交易发送到钱包中.
  
```
  const u3_offline = createU3({ sign: false, broadcast: false });
  const c = u3_offline.contract('utrio.token');
  let unsigned_transaction = await c.transfer('ultrainio', 'ben', '1 UGAS', 'uu');
```
在钱包中你可以提供私钥或助记词来签名，并将签名后的交易发送到链上.

```
  const u3_online = createU3();
  let signature = await u3_online.sign(unsigned_transaction, privateKeyOrMnemonic, chainId);
  if (signature) {
     let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
     let processedTransaction = await u3_online.pushTx(signedTransaction);
  }

```
  
## 资源

调用合约只会消耗合约Owner的资源，所以如果你想部署一个合约，请先购买一些资源. 

* resourcelease(payer,receiver,slot,days,location) 

```
const u3 = createU3(config);
const c = await u3.contract('ultrainio')

await c.resourcelease('ben', 'bob', 1, 10, "ultrainio");// 1 slot for 10 days on the side chain named ultrainio

```

通过以下方法查询资源详情.

```
const account = await u3.getAccountInfo({ account_name: 'abcdefg12345' });
console.log(account.chain_resource[0].lease_num)

```
    
## 合约

#### 部署合约

部署合约需要提供包含目标文件为 *.abi,*.wast,*.wasm 的三个文件的文件夹.

* deploy(contracts_files_path, deploy_account) 第一个参数为合约目标文件的绝对路径，第二个合约部署者账号.

```
  const u3 = createU3(config);
  await u3.deploy(path.resolve(__dirname, '../contracts/token/token'), 'bob');

```

#### 调用合约

```
const u3 = createU3(config);
const c = await u3.contract('ben');
await c.transfer('bob', 'ben', '1.0000 UGAS','');

//或者像这样调用
await u3.contract('ben').then(sm => sm.transfer('bob', 'ben', '1.0000 UGAS',''))

// 一笔交易也可以包含多个合约中的多个action
await u3.transaction(['ben', 'bob'], ({sm1, sm2}) => {
   sm1.myaction(..)
   sm2.myaction(..)
})
```

#### 发行代币


```
const u3 = createU3(config);
const account = 'bob';
await u3.transaction(account, token => {
    token.create(account, '10000000.0000 DDD');
    token.issue(account, '10000000.0000 DDD', 'issue');
});

const balance = await u3.getCurrencyBalance(account, account, 'DDD')
console.log('currency balance', balance)
```


## 事件

Ultrain提供了一个事件注册监听机制用来解决异步场景下业务需求.客户端首先订阅一个事件，提供一个用来接收消息的地址，
当合约中的某个方法触发时，该地址会收到来自链的推送消息.

#### 订阅/取消订阅

* registerEvent(deployer, listen_url)
* unregisterEvent(deployer, listen_url)

**deployer** : 合约的部署者账号

**listen_url** : 接收消息的地址

注意: 如果你是在本地docker环境中使用改机制，请确认接收地址是一个可以从docker访问到的本地宿主地址.

```
const u3 = createU3(config);
const subscribe = await u3.registerEvent('ben', 'http://192.168.1.5:3002');

//or
const unsubscribe = await u3.unregisterEvent('ben', 'http://192.168.1.5:3002');
```

#### 监听

```
const { createU3, listener } = require('u3.js');
listener(function(data) {
   // do callback logic
   console.log(data);
});

U3Utils.test.wait(2000);

//must call listener function before emit event
const contract = await u3.contract(account);
contract.hi('ben', 30, 'It is a test', { authorization: [`ben@active`] });

```

