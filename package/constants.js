const http = require("http"),
  extentionExp = /\..+$/,
  emptyStr = "";

module.exports = {
  http,
  reqProto: http.IncomingMessage.prototype,
  resProto: http.ServerResponse.prototype,

  seperator: "/",
  enumerable: true,
  extentionExp,
  emptyStr,

  objFromEntries: Object.fromEntries,
  freezeObj: Object.freeze,
  isArray: Array.isArray,
  arrFrom: Array.from,
  Num: Number.parseInt,
  isNaN: Number.isNaN,
};
