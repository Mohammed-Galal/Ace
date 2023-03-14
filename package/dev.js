const {
    http,
    arrFrom,
    freezeObj,
    extentionExp,
    emptyStr,
  } = require("./constants"),
  fs = require("fs"),
  path = require("path"),
  root = process.cwd(),
  CONTAINER = require("./Container");

const reqProto = path.resolve(root, "addons/request/index.js"),
  resProto = path.resolve(root, "addons/response/index.js");

Object.assign(http.IncomingMessage.prototype, require(reqProto));
Object.assign(http.ServerResponse.prototype, require(resProto));

module.exports = function () {
  if (arguments.length === 0) return mainHandler;
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};

const methodsInitialized = {},
  methodsPath = path.resolve(root, "app/server"),
  methods = (CONTAINER.prototype.method = freezeObj(
    fs
      .readdirSync(methodsPath)
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
  methodsInitialized[M] = require(methodsPath + "/" + method);
  return M;
}
