const { http, arrFrom } = require("./constants"),
  mainHandler = require("./application");
require("./request.js");
require("./response.js");

("use strict");

module.exports = function () {
  if (arguments.length === 0) return mainHandler;
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};
