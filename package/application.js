const resetRouteInfo = require("./router"),
  { rootPath, fs, path, emptyStr, extentionExp } = require("./constants"),
  resolvePath = path.resolve,
  methodsPath = resolvePath(rootPath + "/server"),
  methodsInitialized = {},
  methods = fs.readdirSync(methodsPath).map(initMethod),
  accessControlAllowMethods = methods.filter((m) => m !== "INDEX").toString();

module.exports = function (req, res) {
  res.setHeader("access-control-allow-methods", accessControlAllowMethods);

  const route = resetRouteInfo(req, res, accessControlAllowMethods),
    targetMethod = methodsInitialized[req.method];

  if (targetMethod) targetMethod(req, res, route);
  else if (methodsInitialized.NOTFOUND)
    methodsInitialized.NOTFOUND(req, res, route);

  res.store.clear();
};

function initMethod(method) {
  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  const M = method.toUpperCase().replace(extentionExp, emptyStr),
    methodPath = methodsPath + "/" + method;
  methodsInitialized[M] = require(methodPath);
  return M;
}
