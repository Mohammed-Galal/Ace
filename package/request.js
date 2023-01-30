const { reqProto: req } = require("./constants");

const required = [
  "cookies",
  "signedCookies",
  //
  "isXhr",
  "body",
  "fresh",
  "secure",
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
