const http = require("http");

module.exports = {
  fs: require("fs"),
  path: require("path"),
  http,
  reqProto: http.IncomingMessage.prototype,
  resProto: http.ServerResponse.prototype,

  rootPath: process.cwd(),
  SP: URLSearchParams,
  objFromEntries: Object.fromEntries,
  freezeObj: Object.freeze,
  isArray: Array.isArray,
  arrFrom: Array.from,
  Num: Number.parseInt,
  isNaN: Number.isNaN,
  emptyStr: "",
};
