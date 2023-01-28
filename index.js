const cnfg = require("./package/index"),
  server = cnfg();

server.listen(9000, () => console.log("http://localhost:9000"));
