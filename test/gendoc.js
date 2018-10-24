const fs = require('fs');
const camelCase = require('camel-case');
const path = require('path');
const v1 = Object.assign({}, { chain: require('../src/v1/chain.json') }, require('../src/v1/contract'));

function _generateSDK(content) {
  fs.writeFile(path.resolve(__dirname, '../src/apidoc.js'), content, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}

function generateFuncWidthDocs(definitions) {
  let source = '';
  let namespace = '';

  for (const apiGroup in definitions) {
    namespace += '/** @namespace ' + apiGroup + '*/\n';
    console.log('----------- modules:  ' + apiGroup + ' ------------');

    for (const apiMethod in definitions[apiGroup]) {
      const methodName = camelCase(apiMethod);

      const content = definitions[apiGroup][apiMethod];

      // add brief
      var comment = '\n\n/**\n';
      if (content.brief) {
        comment += '* ' + content.brief + '\n';
      }

      // add namespace
      // comment += "* @namespace " + apiGroup + "\n";
      // comment += "* @class ultrain\n";

      if (content.params) {
        Object.entries(content.params).forEach(function(k, v) {
          // console.log(k[1]);
          if (isJson(k[1])) {
            comment += '* @param {' + k[1].type + '} ' + k[0] +  ' ' +  k[1].description + ' \n';
          } else {
            k[1] = k[1].replace('set[public_key]', 'array');
            comment += '* @param {' + k[1] + '} ' + k[0] +  ' ' +  '-' + ' \n';
          }
        });
      } else if (content.fields) {
        Object.entries(content.fields).forEach(function(k, v) {
          //console.log(k);

          if (isJson(k[1])) {
            comment += '* @param {' + k[1].type + '} ' + k[0] + ' ' + k[1].description + ' \n';
          } else {
            k[1] = k[1].replace('set[public_key]', 'array');
            comment += '* @param {' + k[1] + '} ' + k[0] + ' - \n';
          }
        });
      }
      comment += '* @memberOf ' + apiGroup + '\n';

      if (content.example) {
        comment += `* @example
        * import {${methodName}} from "u3.js/src/apidoc";
        `
        if (content.example.func_parameter) {
          comment += `* const u3 = createU3(config)
          * u3.${methodName}(${JSON.stringify(content.example.func_parameter,null,2)})
          `
        }
      }
      
      
      comment += '*/\n';

      var func_ = 'function ' + methodName + '(){}';

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
function isJson(obj) {
  var isJson = typeof(obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
  return isJson;
}

//生成一组私钥
//定义某次活动比如 Munich-20180601-n,  n是参会人数编号
/*for (var i = 1; i <= 100; i++) {
  var seed = 'Facebook-20180601-' + i;
  console.log(i + '    ' + ecc.seedPrivate(seed))
}*/
