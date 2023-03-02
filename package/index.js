const {
    http,
    arrFrom,
    freezeObj,
    extentionExp,
    emptyStr,
  } = require("./constants"),
  fs = require("fs"),
  path = require("path"),
  rootPath = process.cwd(),
  CONTAINER = require("./Container");
("use strict");
require("./request.js");
require("./response.js");

module.exports = function () {
  if (arguments.length === 0) return mainHandler;
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};

const methodsInitialized = {},
  resolvePath = path.resolve,
  methodsPath = resolvePath(rootPath + "/server"),
  methods = (CONTAINER.prototype.method = freezeObj(
    fs
      .readdirSync(methodsPath)
      .map(initMethod)
      .filter((m) => m !== "INDEX")
  )),
  accessControlAllowMethods = methods.toString();

function mainHandler(req, res) {
  res.setHeader("access-control-allow-methods", accessControlAllowMethods);

  const CN = freezeObj(new CONTAINER(req, res)),
    targetMethod = methodsInitialized[req.method];

  // const CN = freezeObj(new CONTAINER(req, res, targetMethod)) then you begin routing from inside

  if (targetMethod !== undefined) CN.route(targetMethod);
  else {
    if (methodsInitialized.NOTFOUND) CN.route(methodsInitialized.NOTFOUND);
    else {
    }
  }

  CN.data.clear();
}

function initMethod(method) {
  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  const M = method.toUpperCase().replace(extentionExp, emptyStr),
    methodPath = methodsPath + "/" + method;
  methodsInitialized[M] = require(methodPath);
  return M;
}
