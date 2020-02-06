const { createU3 } = require("./index")

let config = { 
    httpEndpoint:"http://ultrain.natapp1.cc",  
    httpEndpointHistory:"http://ultrain-history.natapp1.cc",
    chainId: "1f1155433d9097e0f67de63a48369916da91f19cb1feff6ba8eca2e5d978a2b2"
};
let u3 = createU3(config)
u3.connect().then(res=> {
    console.log({res})
})

// console.log({u3})