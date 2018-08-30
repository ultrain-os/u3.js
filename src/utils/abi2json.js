const fs = require('fs');
const path = require('path');

module.exports = function (contract, account) {
    let abi = JSON.parse(fs.readFileSync(path.join(process.cwd(), `build/${contract}.abi`), 'utf8'));
    // let abi = JSON.parse(fs.readFileSync('/Users/liuff/Desktop/ultrainio.token.abi', 'utf8'));

    let actions = {};
    for ({ name, type } of abi.actions)
        actions[type] = name;

    let gen = {};
    for (let type of abi.types)
        gen[type.new_type_name] = type.type;

    for(let structs of abi.structs){
        let rest = {}
        for(let key in structs){
            if(key != 'name' && key != 'fields'){
                rest[key] = structs[key];
            }
        }

        let genFields = {};
        for (let { name, type } of structs.fields)
            genFields[name] = type;
        
        if (actions[structs.name]) {
            rest.action = {
                name: actions[structs.name],
                account
            }
        }

        gen[structs.name] = Object.assign({},rest,{ fields: genFields });
    }

    let sorted = {};
    for (let key of Object.keys(gen).sort())
        sorted[key] = gen[key];

    fs.writeFileSync(path.join(process.cwd(), `build/${contract}2.json`), JSON.stringify(sorted, null, 2), 'utf8');
}