const url = require("url").parse,
  typeCheck = require("type-check").typeCheck,
  formatPath = require("./utils/formatPath"),
  extentionExp = /\.[^]+$/,
  { objFromEntries, SP, arrFrom } = require("./constants");

const openRoutes = [],
  data = {
    matched: [],
  };

module.exports = { route, data, resetRouteInfo };

function route(paths, $handler) {
  if (data.res.writableEnded)
    return console.error(
      "cannot handle ",
      paths,
      "because the response object has ended"
    );

  let isMatched = null;
  if (typeCheck("Object", paths)) {
    const routes = Object.keys(paths);
    routes.forEach(function (r) {
      if (isMatched === null) isMatched = route(r, paths[r]);
    });
    return isMatched;
  } else if (typeCheck("(String | Array, Function)", arrFrom(arguments))) {
    const path = formatPath(paths, true),
      regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"), "g");

    isMatched = regEx.exec(data.path);

    if (isMatched === null) return isMatched;
    data.matched.push(paths);
    const prevParams = data.params;
    data.params = isMatched.groups;
    openRoutes.push(path);
    const handlerResult = $handler(data.req, data.res, route);
    openRoutes.pop();
    data.params = prevParams;
    return handlerResult;
  }
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

const routeProps = {
  isFilePath: {
    enumerable: true,
    get() {
      return extentionExp.test(data.path);
    },
  },
};
[
  "registeredMethods",
  "matched",
  "path",
  "params",
  "port",
  "host",
  "hostName",
  "ip",
  "hash",
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
Object.freeze(route);
