const { data, route, resetRouteInfo } = require("./router");

const methodsInitialized = {};
module.exports = {
  app,
  methodsInitialized,
};

data.registeredMethods = Object.keys(methodsInitialized);

function app(req, res) {
  const targetMethod = methodsInitialized[req.method];
  data.req = req;
  data.res = res;
  resetRouteInfo(req);

  if (targetMethod) targetMethod(req, res, route);
  else if (methodsInitialized.NOTFOUND)
    methodsInitialized.NOTFOUND(req, res, route);
}
