const http = require("http"),
  MapPolyfill = require("./utils/mapPolyfill");

module.exports = {
  fs: require("fs"),
  path: require("path"),
  http,
  reqProto: http.IncomingMessage.prototype,
  resProto: http.ServerResponse.prototype,

  Store: new MapPolyfill(),
  rootPath: process.cwd(),
  SP: URLSearchParams,
  objFromEntries: Object.fromEntries,
  freezeObj: Object.freeze,
  isArray: Array.isArray,
  arrFrom: Array.from,
  Num: Number.parseInt,
  isNaN: Number.isNaN,
  extentionExp: /\..+$/,
  emptyStr: "",
};
