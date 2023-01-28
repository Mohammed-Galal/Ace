const cnfg = require("./package/index");

const server = cnfg({
  assetsPath: "",
  onEnd(req, res) {
    // this function gets called after all handlers get finished
  },
});

server.listen(9000);
