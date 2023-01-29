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
  route: {
    matched: [],
  },
});
data.route.registeredMethods = Object.keys(data.methodsInitialized);

module.exports.app = function (req, res) {
  const pathname = resetRouteInfo(req),
    targetMethod = data.methodsInitialized[req.method];

  data.req = req;
  data.res = res;

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

function resetRouteInfo(req) {
  const R = data.route,
    host = (R.host = req.headers.host),
    parsedURL = url("http://" + host + req.url);

  R.matched.length = 0;
  R.path = formatPath(parsedURL.pathname);
  R.queryParams = objFromEntries(new SP(parsedURL.query));
  R.params = {};
  R.port = parsedURL.port;
  R.hostName = parsedURL.hostname;
  R.hash = parsedURL.hash;
  R.ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  R.subdomains = R.host.split(".").slice(0, -1);

  // R.protocol = null;

  return R.path;
}

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
    isMatched = regEx.exec(data.route.path);

  if (isMatched === null) return false;
  data.route.matched.push(paths);
  const prevParams = data.route.params;
  data.route.params = isMatched.groups;
  openRoutes.push(path);
  $handler(data.req, data.res, route);
  openRoutes.pop();
  data.route.params = prevParams;
  return true;
}

const routeProps = {};
[
  "matched",
  "registeredMethods",
  "params",
  "ip",
  "port",
  "host",
  "hostName",
  "hash",
  "path",
  "queryParams",
  "subdomains",
  // "baseUrl",
  // "protocol",
  // "originalUrl",
].forEach(function (prop) {
  routeProps[prop] = {
    get() {
      return data.route[prop];
    },
    enumerable: true,
  };
});

Object.defineProperties(route, routeProps);
