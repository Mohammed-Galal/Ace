const http = require("http"),
  MapPolyfill = require("./utils/mapPolyfill"),
  fs = require("fs"),
  path = require("path"),
  rootPath = process.cwd();

const extentionExp = /\..+$/,
  emptyStr = "";

const methodsInitialized = {},
  resolvePath = path.resolve,
  methodsPath = resolvePath(rootPath + "/server"),
  methods = fs
    .readdirSync(methodsPath)
    .map(initMethod)
    .filter((m) => m !== "INDEX");

module.exports = {
  http,
  reqProto: http.IncomingMessage.prototype,
  resProto: http.ServerResponse.prototype,

  methodsInitialized,
  methods,

  Store: new MapPolyfill(),
  SP: URLSearchParams,
  objFromEntries: Object.fromEntries,
  freezeObj: Object.freeze,
  isArray: Array.isArray,
  arrFrom: Array.from,
  Num: Number.parseInt,
  isNaN: Number.isNaN,
  extentionExp,
  emptyStr,
};

function initMethod(method) {
  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  const M = method.toUpperCase().replace(extentionExp, emptyStr),
    methodPath = methodsPath + "/" + method;
  methodsInitialized[M] = require(methodPath);
  return M;
}
