const http = require("http");

const extentionExp = /\..+$/,
  emptyStr = "";

module.exports = {
  http,
  reqProto: http.IncomingMessage.prototype,
  resProto: http.ServerResponse.prototype,

  extentionExp,
  emptyStr,

  SP: URLSearchParams,
  objFromEntries: Object.fromEntries,
  freezeObj: Object.freeze,
  isArray: Array.isArray,
  arrFrom: Array.from,
  Num: Number.parseInt,
  isNaN: Number.isNaN,
};
