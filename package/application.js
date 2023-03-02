const parseURL = require("url").parse,
  { methodsInitialized, methods } = require("./constants"),
  proto = require("./proto"),
  router = require("./router"),
  accessControlAllowMethods = methods.toString();

module.exports = function (req, res) {
  res.setHeader("access-control-allow-methods", accessControlAllowMethods);

  const CN = new CONNECTION(req, res),
    targetMethod = methodsInitialized[req.method];

  if (targetMethod) CN.route(targetMethod);
  else if (methodsInitialized.NOTFOUND) CN.route(methodsInitialized.NOTFOUND);

  res.store.clear();
};

function CONNECTION(req, res) {
  this.req = req;
  this.res = res;
  this.headers = req.headers;
  this.url = parseURL(req.url);
  this.params = {};
  this.matchedRoutes = [];
  this.openRoutes = [];
  this.route = router.bind(this);
}

Object.defineProperties(CONNECTION.prototype, proto);
Object.freeze(CONNECTION.prototype);
