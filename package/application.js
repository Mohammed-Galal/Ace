const resetRouteInfo = require("./router");

const methodsInitialized = {};
module.exports = {
  app,
  methodsInitialized,
};

function app(req, res) {
  const route = resetRouteInfo(req, res, methodsInitialized),
    targetMethod = methodsInitialized[req.method];

  if (targetMethod) targetMethod(req, res, route);
  else if (methodsInitialized.NOTFOUND)
    methodsInitialized.NOTFOUND(req, res, route);

  res.store.clear();
}
