const http = require("http"),
  req = (module.exports = http.IncomingMessage.prototype);

req.init;

req.pathParams = {};

const required = [
  "cookies",
  "signedCookies",
  //
  "isXhr",
  "body",
  "fresh",
  "secure",
  "route",
  "stale",
  //
  "accepts()",
  "acceptsCharsets()",
  "acceptsEncodings()",
  "acceptsLanguages()",
  "get()",
  "is()",
  "range()",
];
