const url = require("url").parse,
  { isArray } = require("./constants");

const app = (module.exports = function (req, res) {
  const parsedURL = url(req.url),
    targetMethod = app.methodsInitialized[req.method];

  app.req = req;
  app.res = res;
  app.reqPath = parsedURL.pathname;
  app.pathParams = req.pathParams;
  app.queryParams = {};

  if (targetMethod) targetMethod(req, res, app.route);
  // else {
  // //set 404 error
  // }

  if (res.writableEnded === false) res.end();
});

const matchedRoutes = [],
  openRoutes = [],
  route = (app.route = function (paths, $handler) {
    if (arguments.length < 2) throw errors.route.missingArgs;
    else if (typeof paths !== "string" && !isArray(paths))
      throw errors.route.path;
    else if (typeof $handler !== "function") throw errors.route.handler;

    const path = formatPath(paths),
      regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"), "g"),
      isMatched = regEx.exec(app.reqPath);

    if (isMatched === null) return false;
    else if (isMatched.groups) Object.assign(app.pathParams, isMatched.groups);

    matchedRoutes.push(paths);
    openRoutes.push(path);
    $handler(app.req, app.res, route);
    openRoutes.pop();

    return true;
  });

route.matchedRoutes = matchedRoutes;

function formatPath(paths) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";
  return paths
    .replace(/^\/|\/$/g, "")
    .replace(/\:[^/]+/g, (m) => "(?<" + m.slice(1) + ">[^/]+)");
}
