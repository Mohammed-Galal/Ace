const fs = require("fs"),
  resolvePath = require("path").resolve,
  getMimeType = require("mime-types").lookup,
  url = require("url").parse,
  { formatPath } = require("./utils"),
  {
    isArray,
    extentionExp,
    rootPath,
    objFromEntries,
    SP,
  } = require("./constants");

const data = (module.exports.data = {
  methodsInitialized: {},
  matchedRoutes: (route.matchedRoutes = []),
  route: new (function RouteInfo() {
    this.params =
      this.ip =
      this.host =
      this.isXhr =
      this.hostName =
      this.baseUrl =
      this.protocol =
      this.path =
      this.originalUrl =
      this.queryParams =
      this.subdomains =
        null;
  })(),
});

route.registeredMethods = Object.keys(data.methodsInitialized);
Object.defineProperty(route, "info", {
  get() {
    return data.route;
  },
});

module.exports.app = function (req, res) {
  const parsedURL = url(req.url),
    targetMethod = data.methodsInitialized[req.method],
    pathname = (data.route.pathname = formatPath(parsedURL.pathname));

  data.req = req;
  data.res = res;
  data.route.queryParams = objFromEntries(new SP(parsedURL.query));
  data.matchedRoutes.length = 0;

  if (extentionExp.test(pathname)) {
    const filePath = resolvePath(rootPath + "/assets/" + pathname),
      mime = getMimeType(pathname);
    res.setHeader("Content-type", mime);

    if (fs.existsSync(filePath)) {
      res.statusCode = 200;
      res.write(fs.readFileSync(filePath));
    } else res.statusCode = 404;
  } else if (targetMethod) targetMethod(req, res, route);

  if (res.writableEnded === false) res.end();
};

const openRoutes = [];
function route(paths, $handler) {
  if (data.res.writableEnded)
    return console.error(
      "cannot handle ",
      paths,
      "because the response object has ended"
    );
  else if (arguments.length < 2) throw errors.route.missingArgs;
  else if (typeof paths !== "string" && !isArray(paths))
    throw errors.route.path;
  else if (typeof $handler !== "function") throw errors.route.handler;

  const path = formatPath(paths, true),
    regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"), "g"),
    isMatched = regEx.exec(data.route.pathname);

  if (isMatched === null) return false;
  data.matchedRoutes.push(paths);
  const prevParams = data.route.params;
  data.route.params = isMatched.groups;
  openRoutes.push(path);
  $handler(data.req, data.res, route);
  openRoutes.pop();
  data.route.params = prevParams;
  return true;
}
