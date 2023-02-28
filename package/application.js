const resetRouteInfo = require("./router"),
  { methodsInitialized, accessControlAllowMethods } = require("./constants");

module.exports = function (req, res) {
  res.setHeader("access-control-allow-methods", accessControlAllowMethods);

  const route = resetRouteInfo(req, res),
    targetMethod = methodsInitialized[req.method];

  if (targetMethod) targetMethod(req, res, route);
  else if (methodsInitialized.NOTFOUND)
    methodsInitialized.NOTFOUND(req, res, route);

  res.store.clear();
};
