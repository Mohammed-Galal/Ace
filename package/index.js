const {
    http,
    arrFrom,
    freezeObj,
    extentionExp,
    emptyStr,
  } = require("./constants"),
  fs = require("fs"),
  CONTAINER = require("./Container");

Object.assign(http.IncomingMessage.prototype, require("reqProto"));
Object.assign(http.ServerResponse.prototype, require("resProto"));

module.exports = function () {
  if (arguments.length === 0) return mainHandler;
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};

const methodsInitialized = {},
  methodsPath = "server",
  methods = (CONTAINER.prototype.method = freezeObj(
    fs
      .readdirSync(__dirname + "/" + methodsPath)
      .map(initMethod)
      .filter((m) => m !== "INDEX")
  )),
  accessControlAllowMethods = methods.toString();

function mainHandler(req, res) {
  res.setHeader("access-control-allow-methods", accessControlAllowMethods);

  const targetMethod = methodsInitialized[req.method],
    CN = freezeObj(new CONTAINER(req, res));

  if (targetMethod !== undefined) targetMethod(CN);
  else {
    if (methodsInitialized.NOTFOUND) methodsInitialized.NOTFOUND(CN);
    else {
    }
  }
}

function initMethod(method) {
  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  const M = method.toUpperCase().replace(extentionExp, emptyStr);
  methodsInitialized[M] = __non_webpack_require__("./server/" + method);
  return M;
}
