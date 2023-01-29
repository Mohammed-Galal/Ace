const cnfg = require("./package/index");

cnfg(9000, "127.0.0.1", () => console.log("http://127.0.0.1:9000"));
