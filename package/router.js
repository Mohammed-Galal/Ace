const url = require("url").parse,
  typeCheck = require("type-check").typeCheck,
  formatPath = require("./utils/formatPath"),
  extentionExp = /\.[^]+$/,
  { objFromEntries, SP, arrFrom } = require("./constants");

const openRoutes = [],
  data = {
    params: {},
    matched: [],
  };

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
      regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"));
    isMatched = regEx.exec(route.path);
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

module.exports = function (req, res, methods) {
  data.req = req;
  data.res = res;
  data.methods = methods;
  data.params = {};
  data.matched.length = 0;
  const host = (data.host = req.headers.host);
  data.reqURL = url("http://" + host + req.url);
  return route;
};

Object.defineProperties(route, {
  methods: {
    enumerable: true,
    get() {
      return data.methods;
    },
  },
  matched: {
    enumerable: true,
    get() {
      return data.matched;
    },
  },
  path: {
    enumerable: true,
    get() {
      return formatPath(data.reqURL.pathname);
    },
  },
  queryParams: {
    enumerable: true,
    get() {
      return objFromEntries(new SP(data.reqURL.query));
    },
  },
  port: {
    enumerable: true,
    get() {
      return data.reqURL.port;
    },
  },
  hostName: {
    enumerable: true,
    get() {
      return data.reqURL.hostname;
    },
  },
  ip: {
    enumerable: true,
    get() {
      const req = data.req;
      return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    },
  },
  subdomains: {
    enumerable: true,
    get() {
      return data.host.split(".").slice(0, -1);
    },
  },
  hash: {
    enumerable: true,
    get() {
      return data.reqURL.hash;
    },
  },
  isFilePath: {
    enumerable: true,
    get() {
      return extentionExp.test(data.reqURL.pathname);
    },
  },
});
Object.freeze(route);
