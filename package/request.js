const http = require("http"),
  req = (module.exports = http.IncomingMessage.prototype);

req.pathParams = {};
