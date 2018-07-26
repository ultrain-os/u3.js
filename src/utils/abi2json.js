const fs = require('fs');
const path = require('path');

module.exports = function (contract, account) {
    let abi = JSON.parse(fs.readFileSync(path.join(process.cwd(), `build/${contract}.abi`), 'utf8'));

    let actions = {};
    for ({ name, type } of abi.actions)
        actions[type] = name;

    let gen = {};
    for (let type of abi.types)
        gen[type.new_type_name] = type.type;

    for (let { name, fields, ...rest } of abi.structs) {
        let genFields = {};
        for (let { name, type } of fields)
            genFields[name] = type;

        if (actions[name]) {
            rest.action = {
                name: actions[name],
                account
            }
        }

        gen[name] = { ...rest, fields: genFields };
    }

    let sorted = {};
    for (let key of Object.keys(gen).sort())
        sorted[key] = gen[key];

    fs.writeFileSync(path.join(process.cwd(), `build/${contract}.json`), JSON.stringify(sorted, null, 2), 'utf8');
}