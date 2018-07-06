const defaultConfig = require("../src/config");
const Ultrain = require("../src/index");
const fs = require("fs");
const camelCase = require("camel-case");
const path = require("path");

const v1 = Object.assign({}, require("../src/v1/chain"), require("../src/v1/contract"));

utr = Ultrain(defaultConfig);

function _generateSDK (content) {
  fs.writeFile(path.resolve(__dirname, "../src/apidoc.js"), content, "utf8", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

function generateFuncWidthDocs (definitions) {
  let source = "";
  let namespace = "";

  for (const apiGroup in definitions) {
    namespace += "/** @namespace " + apiGroup + "*/\n";
    console.log("----------- modules:  " + apiGroup + " ------------");

    for (const apiMethod in definitions[apiGroup]) {
      const methodName = camelCase(apiMethod);

      const content = definitions[apiGroup][apiMethod];

      // add brief
      var comment = "\n\n/**\n";
      if (content.brief) {
        comment += "* " + content.brief + "\n";
      }

      // add namespace
      // comment += "* @namespace " + apiGroup + "\n";
      // comment += "* @class ultrain\n";

      if (content.params) {
        Object.entries(content.params).forEach(function(k, v) {
          //console.log(k);
          if (isJson(k[1])) {
            comment += "* @param {" + k[1].type + "} " + k[0] + " - \n";
          } else {
            k[1] = k[1].replace("set[public_key]", "array");
            comment += "* @param {" + k[1] + "} " + k[0] + " - \n";
          }
        });
      } else if (content.fields) {
        Object.entries(content.fields).forEach(function(k, v) {
          //console.log(k);

          if (isJson(k[1])) {
            comment += "* @param {" + k[1].type + "} " + k[0] + " - \n";
          } else {
            k[1] = k[1].replace("set[public_key]", "array");
            comment += "* @param {" + k[1] + "} " + k[0] + " - \n";
          }
        });
      }
      comment += "* @memberOf " + apiGroup + "\n";
      comment += "*/\n";

      var func_ = "function " + methodName + "(){}";

      source += comment;
      source += func_;

      /* "* @param {string} str - The string containing two comma-separated numbers.\n" +
       "* @return {Point} A Point object.\n" +
       "*!/";*/
    }
  }
  source = namespace + source;
  // source += "}"

  _generateSDK(source);
}

generateFuncWidthDocs(v1);

/**
 * [isJson 判断是否是json对象]
 * @param  {[object]}  obj [对象]
 * @return {Boolean}
 */
function isJson (obj) {
  var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isJson;
}

/*
// All API methods print help when called with no-arguments.
utr.getBlock()

// Next, your going to need nodultraind running on localhost:8888 (see ./docker)

// If a callback is not provided, a Promise is returned
utr.getBlock(1).then(result => {console.log(result)})

// Parameters can be sequential or an object
utr.getBlock({block_num_or_id: 1}).then(result => console.log(result))

// Callbacks are similar
callback = (err, res) => {err ? console.error(err) : console.log(res)}
utr.getBlock(1, callback)
utr.getBlock({block_num_or_id: 1}, callback)

// Provide an empty object or a callback if an API call has no arguments
utr.getNodeSummary({}).then(result => {console.log(result)})



// Run with no arguments to print usage.
ultrain.transfer()

// Usage with options (options are always optional)
options = {broadcast: false}

ultrain.transfer({from: 'inita', to: 'initb', quantity: '1 SYS', memo: ''}, options)

// Object or ordered args may be used.
ultrain.transfer('inita', 'initb', '2 SYS', 'memo', options)

// A broadcast boolean may be provided as a shortcut for {broadcast: false}
ultrain.transfer('inita', 'initb', '1 SYS', '', false)

*/

//utr.transfer('inita', 'initb', '1 SYS', '', false)

/*utr.transaction({
  actions: [
    {
      account: 'ultrainio',
      name: 'transfer',
      authorization: [{
        actor: 'inita',
        permission: 'active'
      }],
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '7 SYS',
        memo: ''
      }
    }
  ]
})*/

//utr.getTransaction('955af2ef5cab81c7e2d6314c4cf100429a712447bd30606e610da07761307056').then(result => {console.log(result)})

// show api
//console.log(utr)

/*Keygen.generateMasterKeys().then(keys => {
  console.log(keys)
})*/

//utr.getBlock({block_num_or_id: 1}).then(result => console.log(result))
//utr.getAccount({ account_name: "ultrainio" }).then(result => console.log(result));

//生成一组私钥
//定义某次活动比如 Munich-20180601-n,  n是参会人数编号
/*for (var i = 1; i <= 100; i++) {
  var seed = 'Facebook-20180601-' + i;
  console.log(i + '    ' + ecc.seedPrivate(seed))
}*/
