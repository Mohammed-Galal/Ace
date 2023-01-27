const cnfg = require("./package/index");

cnfg(9000, () => console.log("http://localhost:9000"));

// if the Config Object doesn't have the [port] property, it wont start listening automatically
// returns a function if hasn't recieved a port property

// http.createServer(cnfg); // optional: if the developer wants to handle it like this
