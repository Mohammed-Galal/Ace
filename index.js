const cnfg = require("./package/index");

const server = cnfg("/assetsFolder");

server.listen(9000);
