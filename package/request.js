const http = require("http"),
  req = (module.exports = http.IncomingMessage.prototype);

req.pathParams = {};

const required = [
  "baseUrl",
  "body",
  "cookies",
  "fresh",
  "host",
  "hostname",
  "ip",
  "ips",
  "method",
  "originalUrl",
  "params",
  "path",
  "protocol",
  "query",
  "route",
  "secure",
  "signedCookies",
  "stale",
  "subdomains",
  "xhr",
  "accepts()",
  "acceptsCharsets()",
  "acceptsEncodings()",
  "acceptsLanguages()",
  "get()",
  "is()",
  "range()",
];
