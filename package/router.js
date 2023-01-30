const url = require("url").parse,
  { data, route, resetRouteInfo } = require("./router"),
  { formatPath } = require("./utils"),
  { objFromEntries, SP } = require("./constants");

const openRoutes = [],
  data = {
    matched: [],
  };

module.exports = { route, data, resetRouteInfo };

function route(paths, $handler) {
  const pathsType = paths.constructor.name;
  let isMatched = false;

  if (pathsType === "Object") {
    const routes = Object.keys(paths);
    routes.forEach(function (r) {
      if (isMatched) return;
      isMatched = route(r, paths[r]);
    });
    return isMatched;
  }

  if (data.res.writableEnded)
    return console.error(
      "cannot handle ",
      paths,
      "because the response object has ended"
    );
  else if (arguments.length < 2) throw errors.route.missingArgs;
  else if (!/String|Array/i.test(pathsType)) throw errors.route.path;
  else if (typeof $handler !== "function") throw errors.route.handler;

  const path = formatPath(paths, true),
    regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"), "g");

  isMatched = regEx.exec(data.path);

  if (!Boolean(isMatched)) return false;
  data.matched.push(paths);
  const prevParams = data.params;
  data.params = isMatched.groups;
  openRoutes.push(path);
  $handler(data.req, data.res, route);
  openRoutes.pop();
  data.params = prevParams;
  return true;
}

function resetRouteInfo(req) {
  const host = (data.host = req.headers.host),
    parsedURL = url("http://" + host + req.url);

  data.matched.length = 0;
  data.path = formatPath(parsedURL.pathname);
  data.queryParams = objFromEntries(new SP(parsedURL.query));
  data.params = {};
  data.port = parsedURL.port;
  data.hostName = parsedURL.hostname;
  data.hash = parsedURL.hash;
  data.ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  data.subdomains = data.host.split(".").slice(0, -1);

  // data.protocol = null;

  return data.path;
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
      return data[prop];
    },
    enumerable: true,
  };
});

Object.defineProperties(route, routeProps);
